"""
Pydantic models for type-safe API request/response handling.
Provides validation, serialization, and documentation for all API endpoints.
"""

from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Optional, List, Literal, Dict, Any
from enum import Enum
from datetime import datetime


# =====================================================
# ENUMERATIONS
# =====================================================

class SurfaceFinish(str, Enum):
    HASL = "HASL"
    HASL_LF = "HASL-LF"
    ENIG = "ENIG"
    OSP = "OSP"
    IMMERSION_TIN = "Immersion Tin"
    IMMERSION_SILVER = "Immersion Silver"
    HARD_GOLD = "Hard Gold"


class SolderMaskColor(str, Enum):
    GREEN = "green"
    RED = "red"
    BLUE = "blue"
    BLACK = "black"
    WHITE = "white"
    YELLOW = "yellow"
    PURPLE = "purple"
    MATTE_BLACK = "matte_black"
    MATTE_GREEN = "matte_green"


class SilkscreenOption(str, Enum):
    NONE = "none"
    TOP = "top"
    BOTTOM = "bottom"
    BOTH = "both"


class LeadTime(str, Enum):
    FAST = "fast"
    STANDARD = "standard"
    ECONOMY = "economy"


class AssemblySide(str, Enum):
    SINGLE = "single"
    DOUBLE = "double"


class StencilType(str, Enum):
    NONE = "none"
    FRAMELESS = "frameless"
    FRAMED = "framed"


class SourcingType(str, Enum):
    TURNKEY = "turnkey"
    CONSIGNED = "consigned"
    PARTIAL = "partial"


class PanelizationMode(str, Enum):
    NONE = "none"
    ARRAY = "array"


# =====================================================
# CONFIGURATION MODELS
# =====================================================

class PCBPricingConfig(BaseModel):
    """PCB pricing configuration with type-safe defaults"""
    setup_fee: float = Field(default=250.0, ge=0, description="One-time setup fee in TRY")
    base_per_cm2: float = Field(default=0.18, ge=0, description="Base price per cm²")
    tight_tolerance_factor: float = Field(default=1.15, ge=1.0, description="Multiplier for ≤0.10mm track/space")
    waste_rate: float = Field(default=0.08, ge=0, le=0.5, description="Panel waste rate")
    etest_per_cm2_per_board: float = Field(default=0.05, ge=0, description="E-test cost per cm² per board")
    minimum_order_value: float = Field(default=500.0, ge=0, description="Minimum order value in TRY")

    # Layer factors
    layer_factors: Dict[str, float] = Field(
        default={
            "1": 0.85, "2": 1.0, "4": 1.4, "6": 1.9, "8": 2.5, "10": 3.2, "12": 4.0
        },
        description="Price multipliers by layer count"
    )

    # Finish factors
    finish_factors: Dict[str, float] = Field(
        default={
            "HASL": 1.0, "HASL-LF": 1.05, "ENIG": 1.25, "OSP": 1.0,
            "Immersion Tin": 1.15, "Immersion Silver": 1.2, "Hard Gold": 1.8
        },
        description="Price multipliers by surface finish"
    )

    # Copper factors
    copper_factors: Dict[str, float] = Field(
        default={"0.5": 0.9, "1": 1.0, "2": 1.15, "3": 1.35},
        description="Price multipliers by copper weight (oz)"
    )

    # Lead time factors
    lead_time_factors: Dict[str, float] = Field(
        default={"fast": 1.5, "standard": 1.0, "economy": 0.85},
        description="Price multipliers by lead time"
    )

    # Impedance control
    impedance_flat_fee: float = Field(default=200.0, ge=0)
    impedance_factor: float = Field(default=1.10, ge=1.0)


class SMTPricingConfig(BaseModel):
    """SMT/Assembly pricing configuration"""
    setup_fee_single: float = Field(default=350.0, ge=0)
    setup_fee_double: float = Field(default=550.0, ge=0)
    placement_per_component: float = Field(default=0.22, ge=0)
    unique_part_fee: float = Field(default=0.8, ge=0)
    bga_premium_per_unit: float = Field(default=0.6, ge=0)
    aoi_per_component: float = Field(default=0.03, ge=0)
    xray_per_bga: float = Field(default=0.35, ge=0)
    uses_01005_factor: float = Field(default=1.2, ge=1.0)

    stencil_costs: Dict[str, float] = Field(
        default={"none": 0, "frameless": 150, "framed": 350},
        description="Stencil costs by type"
    )

    lead_time_factors: Dict[str, float] = Field(
        default={"fast": 1.4, "standard": 1.0, "economy": 0.9}
    )


class ShippingConfig(BaseModel):
    """Shipping configuration"""
    flat_rate: float = Field(default=0.0, ge=0)
    per_kg: float = Field(default=25.0, ge=0)
    free_shipping_threshold: float = Field(default=5000.0, ge=0, description="Free shipping above this amount")


class PricingConfig(BaseModel):
    """Complete pricing configuration"""
    pcb: PCBPricingConfig = Field(default_factory=PCBPricingConfig)
    smt: SMTPricingConfig = Field(default_factory=SMTPricingConfig)
    shipping: ShippingConfig = Field(default_factory=ShippingConfig)
    currency: str = Field(default="TRY")


# =====================================================
# REQUEST MODELS
# =====================================================

class BoardSize(BaseModel):
    """Board dimensions in mm"""
    w: float = Field(..., ge=5, le=500, description="Width in mm")
    h: float = Field(..., ge=5, le=500, description="Height in mm")

    @property
    def area_cm2(self) -> float:
        """Calculate board area in cm²"""
        return (self.w * self.h) / 100.0

    @property
    def area_mm2(self) -> float:
        """Calculate board area in mm²"""
        return self.w * self.h


class PanelNxM(BaseModel):
    """Panel array configuration"""
    n: int = Field(default=2, ge=1, le=20, description="Number of boards horizontally")
    m: int = Field(default=2, ge=1, le=20, description="Number of boards vertically")

    @property
    def total_boards(self) -> int:
        return self.n * self.m


class PanelizationConfig(BaseModel):
    """Panelization configuration"""
    mode: PanelizationMode = Field(default=PanelizationMode.NONE)
    nxm: Optional[PanelNxM] = Field(default=None)
    break_method: Literal["vcut", "mousebite", "tab"] = Field(default="vcut")
    rail_width_mm: float = Field(default=5.0, ge=2, le=15, description="Edge rail width")
    kerf_width_mm: float = Field(default=2.0, ge=0.5, le=5, description="Cutting kerf width")


class PCBOptions(BaseModel):
    """PCB manufacturing options"""
    quantity: int = Field(..., ge=1, le=100000, description="Number of boards")
    layers: int = Field(..., description="Number of copper layers")
    thickness_mm: float = Field(default=1.6, ge=0.4, le=3.2)
    copper_oz: int = Field(default=1, ge=1, le=3)
    finish: SurfaceFinish = Field(default=SurfaceFinish.HASL)
    solder_mask_color: SolderMaskColor = Field(default=SolderMaskColor.GREEN)
    silkscreen: SilkscreenOption = Field(default=SilkscreenOption.BOTH)
    min_track_space_mm: float = Field(default=0.15, ge=0.075, le=1.0)
    impedance_controlled: bool = Field(default=False)
    e_test: bool = Field(default=True)
    board_size_mm: BoardSize
    panelization: Optional[PanelizationConfig] = Field(default=None)

    @field_validator('layers')
    @classmethod
    def validate_layers(cls, v):
        valid_layers = [1, 2, 4, 6, 8, 10, 12]
        if v not in valid_layers:
            raise ValueError(f"Layer count must be one of {valid_layers}")
        return v


class SMTOptions(BaseModel):
    """SMT/Assembly options"""
    assembly_required: bool = Field(default=False)
    sides: AssemblySide = Field(default=AssemblySide.SINGLE)
    component_count: int = Field(default=0, ge=0, le=10000)
    unique_parts: int = Field(default=0, ge=0, le=1000)
    bga_count: int = Field(default=0, ge=0, le=500)
    uses_01005: bool = Field(default=False)
    stencil: StencilType = Field(default=StencilType.FRAMELESS)
    inspection: List[Literal["AOI", "Xray"]] = Field(default_factory=list)
    sourcing: SourcingType = Field(default=SourcingType.TURNKEY)

    @model_validator(mode='after')
    def validate_unique_parts(self):
        if self.unique_parts > self.component_count:
            raise ValueError("Unique parts cannot exceed total component count")
        return self


class QuoteRequest(BaseModel):
    """Complete quote request"""
    pcb: PCBOptions
    smt: Optional[SMTOptions] = Field(default=None)
    lead_time: LeadTime = Field(default=LeadTime.STANDARD)
    notes: Optional[str] = Field(default=None, max_length=1000)


# =====================================================
# RESPONSE MODELS
# =====================================================

class PCBBreakdown(BaseModel):
    """Detailed PCB cost breakdown"""
    setup_fee: float
    base_cost: float
    impedance_cost: float = 0.0
    etest_cost: float = 0.0
    leadtime_factor: float = 1.0
    tight_tolerance_applied: bool = False
    area_cm2: float
    unit_price: float


class SMTBreakdown(BaseModel):
    """Detailed SMT cost breakdown"""
    setup_fee: float
    placement_cost: float
    unique_cost: float
    bga_cost: float = 0.0
    stencil_cost: float
    aoi_cost: float = 0.0
    xray_cost: float = 0.0
    uses_01005_factor: float = 1.0
    leadtime_factor: float = 1.0


class PanelInfo(BaseModel):
    """Panelization calculation results"""
    mode: str
    boards_per_panel: int
    panel_count: int
    total_boards: int
    panel_size_mm: Dict[str, float]
    utilization_percent: float
    waste_area_cm2: float


class QuoteSummary(BaseModel):
    """Summary of quote calculation"""
    total: float
    unit_price: float
    dfm_score: Optional[int] = None
    dfm_grade: Optional[str] = None
    potential_savings: Optional[float] = None


class QuoteResponse(BaseModel):
    """Complete quote response"""
    currency: str = "TRY"
    breakdown: Dict[str, float]
    total: float
    warnings: List[str] = Field(default_factory=list)
    details: Dict[str, Any] = Field(default_factory=dict)
    summary: Optional[QuoteSummary] = None
    panel_info: Optional[PanelInfo] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    quote_id: Optional[str] = None
    valid_until: Optional[datetime] = None


# =====================================================
# FILE UPLOAD MODELS
# =====================================================

class PresignedUrlRequest(BaseModel):
    """Request for presigned upload URL"""
    file_name: str = Field(..., min_length=1, max_length=255)
    content_type: str = Field(default="application/octet-stream")


class PresignedUrlResponse(BaseModel):
    """Response with presigned upload URL"""
    upload_url: str
    file_key: str
    expires_in: int = 3600


class FileAnalysisResult(BaseModel):
    """Result of Gerber file analysis"""
    file_key: str
    layers: Optional[int] = None
    board_size: Optional[Dict[str, float]] = None
    component_count: Optional[int] = None
    unique_parts: Optional[int] = None
    file_count: int
    file_types: List[str]
    warnings: List[str] = Field(default_factory=list)
    analyzed_at: datetime = Field(default_factory=datetime.utcnow)


# =====================================================
# CONFIGURATION API MODELS
# =====================================================

class ConfigOption(BaseModel):
    """Single configuration option"""
    value: str
    label: str
    description: Optional[str] = None
    price_factor: Optional[float] = None


class FormConfigResponse(BaseModel):
    """Dynamic form configuration for frontend"""
    finishes: List[ConfigOption]
    colors: List[ConfigOption]
    layers: List[ConfigOption]
    thicknesses: List[ConfigOption]
    copper_weights: List[ConfigOption]
    stencils: List[ConfigOption]
    sourcing_options: List[ConfigOption]
    limits: Dict[str, Dict[str, Any]]
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# =====================================================
# ERROR MODELS
# =====================================================

class ErrorDetail(BaseModel):
    """Detailed error information"""
    field: Optional[str] = None
    message: str
    code: str


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: bool = True
    message: str
    details: List[ErrorDetail] = Field(default_factory=list)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
