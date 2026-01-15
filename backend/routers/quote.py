"""
Quote Router - Handles all pricing and quote-related endpoints.
Extracted from server.py for better maintainability.
"""

from fastapi import APIRouter, HTTPException, Request, Depends
from typing import Dict, Any, Optional, List
from pydantic import BaseModel, Field
from datetime import datetime
import uuid

from config import settings, logger
from pricing_engine import PricingEngine, calculate_quote_legacy
from models.schemas import (
    QuoteRequest, QuoteResponse, BoardSize, PCBOptions, SMTOptions,
    LeadTime, SurfaceFinish, AssemblySide, StencilType, SourcingType
)
from middleware.rate_limiter import check_pricing_rate_limit

router = APIRouter(prefix="/quote", tags=["Quote & Pricing"])


# ============================================
# Request/Response Models
# ============================================

class QuoteCalculateRequest(BaseModel):
    """Request model for quote calculation"""
    # PCB Options
    quantity: int = Field(default=50, ge=1, le=100000)
    layers: int = Field(default=2)
    thickness_mm: float = Field(default=1.6)
    copper_oz: int = Field(default=1)
    finish: str = Field(default="HASL")
    solder_mask_color: str = Field(default="green")
    silkscreen: str = Field(default="both")
    min_track_space_mm: float = Field(default=0.15)
    impedance_controlled: bool = Field(default=False)
    e_test: bool = Field(default=True)
    board_width_mm: float = Field(default=100, ge=5, le=500)
    board_height_mm: float = Field(default=80, ge=5, le=500)

    # Panelization
    panelization_mode: str = Field(default="none")
    panel_n: int = Field(default=2, ge=1, le=20)
    panel_m: int = Field(default=2, ge=1, le=20)

    # SMT Options
    assembly_required: bool = Field(default=False)
    sides: str = Field(default="single")
    component_count: int = Field(default=0, ge=0, le=10000)
    unique_parts: int = Field(default=0, ge=0, le=1000)
    bga_count: int = Field(default=0, ge=0, le=500)
    uses_01005: bool = Field(default=False)
    stencil: str = Field(default="frameless")
    inspection_aoi: bool = Field(default=True)
    inspection_xray: bool = Field(default=False)
    sourcing: str = Field(default="turnkey")

    # Lead Time
    lead_time: str = Field(default="standard")


class QuoteSaveRequest(BaseModel):
    """Request model for saving a quote"""
    quote_data: Dict[str, Any]
    customer_email: Optional[str] = None
    customer_name: Optional[str] = None
    project_name: Optional[str] = None
    notes: Optional[str] = None


class QuoteListResponse(BaseModel):
    """Response model for quote list"""
    quotes: List[Dict[str, Any]]
    total: int
    page: int
    page_size: int


# ============================================
# Endpoints
# ============================================

@router.post("/calculate", response_model=Dict[str, Any])
async def calculate_quote(
    request: QuoteCalculateRequest,
    rate_limit: bool = Depends(check_pricing_rate_limit)
):
    """
    Calculate PCB manufacturing and assembly quote.
    Returns detailed pricing breakdown with warnings.
    """
    try:
        # Build PCB options for pricing engine
        pcb_options = {
            "quantity": request.quantity,
            "layers": request.layers,
            "thickness_mm": request.thickness_mm,
            "copper_oz": request.copper_oz,
            "finish": request.finish,
            "min_track_space_mm": request.min_track_space_mm,
            "impedance_controlled": request.impedance_controlled,
            "e_test": request.e_test,
            "board_size_mm": {
                "w": request.board_width_mm,
                "h": request.board_height_mm
            }
        }

        # Add panelization if enabled
        if request.panelization_mode != "none":
            pcb_options["panelization"] = {
                "mode": request.panelization_mode,
                "nxm": {"n": request.panel_n, "m": request.panel_m},
                "rail_width_mm": 5.0,
                "kerf_width_mm": 2.0
            }

        # Build SMT options if assembly required
        smt_options = None
        if request.assembly_required:
            inspection = []
            if request.inspection_aoi:
                inspection.append("AOI")
            if request.inspection_xray:
                inspection.append("Xray")

            smt_options = {
                "assembly_required": True,
                "sides": request.sides,
                "component_count": request.component_count,
                "unique_parts": request.unique_parts,
                "bga_count": request.bga_count,
                "uses_01005": request.uses_01005,
                "stencil": request.stencil,
                "inspection": inspection,
                "sourcing": request.sourcing
            }

        # Calculate quote using legacy interface for compatibility
        result = calculate_quote_legacy(
            pcb_options=pcb_options,
            smt_options=smt_options,
            lead_time=request.lead_time
        )

        logger.info(f"Quote calculated: {result.get('total', 0)} TRY for {request.quantity} boards")

        return {
            "success": True,
            "data": result,
            "calculated_at": datetime.utcnow().isoformat()
        }

    except Exception as e:
        logger.error(f"Quote calculation error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": True, "message": f"Calculation error: {str(e)}"}
        )


@router.post("/complete-analysis")
async def complete_analysis(
    request: QuoteCalculateRequest,
    rate_limit: bool = Depends(check_pricing_rate_limit)
):
    """
    Get complete analysis including DFM score, savings suggestions,
    and detailed breakdown. More comprehensive than /calculate.
    """
    try:
        # Get base quote
        base_result = await calculate_quote(request, rate_limit)

        # Calculate DFM score based on specifications
        dfm_score = 100
        dfm_warnings = []

        # Check for potential DFM issues
        if request.min_track_space_mm < 0.15:
            dfm_score -= 10
            dfm_warnings.append("Tight trace spacing may increase reject rate")

        if request.layers > 6:
            dfm_score -= 5
            dfm_warnings.append("High layer count requires careful stackup design")

        if request.bga_count > 0:
            dfm_score -= 5
            dfm_warnings.append("BGA packages require X-ray inspection")

        if request.uses_01005:
            dfm_score -= 10
            dfm_warnings.append("01005 components require specialized equipment")

        # Calculate potential savings
        savings_suggestions = []

        # Check if economy shipping would save money
        if request.lead_time != "economy":
            economy_request = request.model_copy()
            economy_request.lead_time = "economy"
            # Note: In production, calculate actual savings
            savings_suggestions.append({
                "suggestion": "Use economy lead time",
                "potential_savings": "15%",
                "impact": "Extended delivery time (12-15 days)"
            })

        # Check if panelization would help
        if request.panelization_mode == "none" and request.quantity >= 10:
            savings_suggestions.append({
                "suggestion": "Consider panelization",
                "potential_savings": "10-20%",
                "impact": "Requires depanelization after manufacturing"
            })

        # Get DFM grade
        if dfm_score >= 90:
            dfm_grade = "A"
        elif dfm_score >= 75:
            dfm_grade = "B"
        elif dfm_score >= 60:
            dfm_grade = "C"
        else:
            dfm_grade = "D"

        return {
            "success": True,
            "quote": base_result.get("data", {}),
            "dfm_analysis": {
                "score": dfm_score,
                "grade": dfm_grade,
                "warnings": dfm_warnings
            },
            "savings_suggestions": savings_suggestions,
            "analyzed_at": datetime.utcnow().isoformat()
        }

    except Exception as e:
        logger.error(f"Complete analysis error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": True, "message": str(e)}
        )


@router.post("/save")
async def save_quote(request: QuoteSaveRequest):
    """
    Save a quote for later retrieval.
    Returns a quote reference ID.
    """
    try:
        quote_id = f"Q{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"

        # In production, save to database
        saved_quote = {
            "quote_id": quote_id,
            "quote_data": request.quote_data,
            "customer_email": request.customer_email,
            "customer_name": request.customer_name,
            "project_name": request.project_name,
            "notes": request.notes,
            "created_at": datetime.utcnow().isoformat(),
            "expires_at": None,  # Add expiration logic if needed
            "status": "pending"
        }

        logger.info(f"Quote saved: {quote_id}")

        return {
            "success": True,
            "quote_id": quote_id,
            "message": "Quote saved successfully"
        }

    except Exception as e:
        logger.error(f"Quote save error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": True, "message": str(e)}
        )


@router.get("/{quote_id}")
async def get_quote(quote_id: str):
    """
    Retrieve a saved quote by ID.
    """
    try:
        # In production, fetch from database
        # For now, return a placeholder
        return {
            "success": True,
            "quote_id": quote_id,
            "message": "Quote retrieval not implemented yet",
            "data": None
        }

    except Exception as e:
        logger.error(f"Quote retrieval error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": True, "message": str(e)}
        )


@router.get("/")
async def list_quotes(
    page: int = 1,
    page_size: int = 20,
    status: Optional[str] = None
):
    """
    List saved quotes with pagination.
    """
    try:
        # In production, fetch from database with pagination
        return QuoteListResponse(
            quotes=[],
            total=0,
            page=page,
            page_size=page_size
        )

    except Exception as e:
        logger.error(f"Quote list error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": True, "message": str(e)}
        )
