from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

# Import custom models and pricing engine
from models import (
    QuoteCalculateRequest,
    QuoteSaveRequest,
    QuoteModel,
    QuotePricing,
    PricingBreakdown,
    OrderModel,
    OrderCreate,
    ConfigModel
)
from pricing_engine import PricingEngine
from pricing.advanced_engine import AdvancedPricingEngine
from dfm.dfm_checker import DFMChecker
from bom.analyzer import BOMAnalyzer
from bom.optimizer import BOMOptimizer
from seed_data import seed_config


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models (for backward compatibility)
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ============= Config Routes =============
@api_router.get("/config/{key}")
async def get_config(key: str):
    """Get a specific config by key"""
    config = await db.config.find_one({"key": key}, {"_id": 0})
    if not config:
        raise HTTPException(status_code=404, detail=f"Config '{key}' not found")
    return config


@api_router.get("/config")
async def get_all_configs():
    """Get all configs"""
    configs = await db.config.find({}, {"_id": 0}).to_list(100)
    return configs


# ============= Quote Routes =============
@api_router.post("/quote/calculate")
async def calculate_quote(request: QuoteCalculateRequest):
    """
    Calculate pricing for a quote without saving it
    Returns live pricing breakdown
    """
    try:
        # Get pricing config
        config_doc = await db.config.find_one({"key": "pricing.v0_1", "enabled": True})
        if not config_doc:
            raise HTTPException(status_code=500, detail="Pricing configuration not found")
        
        # Initialize pricing engine
        engine = PricingEngine(config_doc["data"])
        
        # Convert Pydantic models to dicts
        pcb_options = request.pcb.model_dump()
        smt_options = request.smt.model_dump() if request.smt else None
        
        # Calculate pricing
        result = engine.calculate_quote(
            pcb_options=pcb_options,
            smt_options=smt_options,
            lead_time=request.lead_time
        )
        
        return result
        
    except Exception as e:
        logging.error(f"Quote calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")


@api_router.post("/quote/save", response_model=QuoteModel)
async def save_quote(request: QuoteSaveRequest):
    """
    Save a quote to database
    Returns the saved quote with ID
    """
    try:
        quote_obj = QuoteModel(
            user_id=request.user_id,
            inputs=request.inputs,
            pricing=request.pricing,
            status="DRAFT"
        )
        
        # Convert to dict for MongoDB
        quote_dict = quote_obj.model_dump()
        
        # Insert into database
        await db.quotes.insert_one(quote_dict)
        
        return quote_obj
        
    except Exception as e:
        logging.error(f"Quote save error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Save error: {str(e)}")


@api_router.get("/quote/{quote_id}", response_model=QuoteModel)
async def get_quote(quote_id: str):
    """Get a quote by ID"""
    quote = await db.quotes.find_one({"id": quote_id}, {"_id": 0})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote


@api_router.post("/quote/{quote_id}/accept", response_model=QuoteModel)
async def accept_quote(quote_id: str):
    """Accept a quote and change status to ACCEPTED"""
    quote = await db.quotes.find_one({"id": quote_id})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    # Update status
    await db.quotes.update_one(
        {"id": quote_id},
        {
            "$set": {
                "status": "ACCEPTED",
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
        }
    )
    
    # Return updated quote
    updated_quote = await db.quotes.find_one({"id": quote_id}, {"_id": 0})
    return updated_quote


# ============= Order Routes =============
@api_router.post("/order/create", response_model=OrderModel)
async def create_order(request: OrderCreate):
    """Create an order from an accepted quote"""
    # Verify quote exists and is accepted
    quote = await db.quotes.find_one({"id": request.quote_id})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    if quote.get("status") != "ACCEPTED":
        raise HTTPException(status_code=400, detail="Quote must be accepted first")
    
    # Create order
    order_obj = OrderModel(
        quote_id=request.quote_id,
        payment_status="PENDING",
        tracking=[{
            "status": "RECEIVED",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "note": "Order created"
        }]
    )
    
    # Convert to dict for MongoDB
    order_dict = order_obj.model_dump()
    
    # Insert into database
    await db.orders.insert_one(order_dict)
    
    return order_obj


@api_router.get("/order/{order_id}", response_model=OrderModel)
async def get_order(order_id: str):
    """Get order details and tracking"""
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


# ============= Advanced Pricing Routes =============
@api_router.post("/quote/calculate-advanced")
async def calculate_quote_advanced(request: QuoteCalculateRequest):
    """
    Calculate pricing with ADVANCED engine
    Returns detailed cost breakdown with material, labor, overhead analysis
    """
    try:
        # Get pricing config
        config_doc = await db.config.find_one({"key": "pricing.v0_1", "enabled": True})
        if not config_doc:
            raise HTTPException(status_code=500, detail="Pricing configuration not found")
        
        # Initialize advanced pricing engine
        engine = AdvancedPricingEngine(config_doc["data"])
        
        # Convert Pydantic models to dicts
        pcb_options = request.pcb.model_dump()
        smt_options = request.smt.model_dump() if request.smt else None
        
        # Calculate pricing with advanced engine
        result = engine.calculate_quote(
            pcb_options=pcb_options,
            smt_options=smt_options,
            lead_time=request.lead_time
        )
        
        return result
        
    except Exception as e:
        logging.error(f"Advanced quote calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")


# ============= DFM (Design for Manufacturing) Routes =============
@api_router.post("/dfm/check")
async def check_dfm(request: QuoteCalculateRequest):
    """
    Run DFM checks on PCB design
    Returns manufacturability score and recommendations
    """
    try:
        # Initialize DFM checker
        dfm_checker = DFMChecker()
        
        # Prepare design data
        design_data = {
            "pcb": request.pcb.model_dump(),
            "smt": request.smt.model_dump() if request.smt else {}
        }
        
        # Run DFM checks
        dfm_result = dfm_checker.check_design(design_data)
        
        return dfm_result
        
    except Exception as e:
        logging.error(f"DFM check error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"DFM check error: {str(e)}")


# ============= BOM Analysis Routes =============
@api_router.post("/bom/analyze")
async def analyze_bom(request: QuoteCalculateRequest):
    """
    Analyze BOM for cost, availability, and risks
    """
    try:
        # Initialize BOM analyzer
        bom_analyzer = BOMAnalyzer()
        
        # Prepare BOM data
        bom_data = request.smt.model_dump() if request.smt else {}
        
        # Analyze BOM
        analysis_result = bom_analyzer.analyze_bom(bom_data)
        
        return analysis_result
        
    except Exception as e:
        logging.error(f"BOM analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"BOM analysis error: {str(e)}")


@api_router.post("/bom/optimize")
async def optimize_bom(request: QuoteCalculateRequest):
    """
    Get BOM optimization suggestions
    Returns recommendations for cost and manufacturability improvements
    """
    try:
        # Initialize BOM optimizer
        bom_optimizer = BOMOptimizer()
        
        # Prepare data
        bom_data = request.smt.model_dump() if request.smt else {}
        pcb_data = request.pcb.model_dump()
        
        # Get optimization suggestions
        optimization_result = bom_optimizer.optimize(bom_data, pcb_data)
        
        return optimization_result
        
    except Exception as e:
        logging.error(f"BOM optimization error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"BOM optimization error: {str(e)}")


# ============= Complete Analysis Route (All-in-One) =============
@api_router.post("/quote/complete-analysis")
async def complete_analysis(request: QuoteCalculateRequest):
    """
    Complete quote analysis including:
    - Advanced pricing with detailed breakdown
    - DFM manufacturability check
    - BOM analysis
    - Optimization suggestions
    """
    try:
        # Get pricing config
        config_doc = await db.config.find_one({"key": "pricing.v0_1", "enabled": True})
        if not config_doc:
            raise HTTPException(status_code=500, detail="Pricing configuration not found")
        
        # Prepare data
        pcb_options = request.pcb.model_dump()
        smt_options = request.smt.model_dump() if request.smt else None
        design_data = {
            "pcb": pcb_options,
            "smt": smt_options or {}
        }
        
        # 1. Advanced Pricing
        pricing_engine = AdvancedPricingEngine(config_doc["data"])
        pricing_result = pricing_engine.calculate_quote(
            pcb_options=pcb_options,
            smt_options=smt_options,
            lead_time=request.lead_time
        )
        
        # 2. DFM Check
        dfm_checker = DFMChecker()
        dfm_result = dfm_checker.check_design(design_data)
        
        # 3. BOM Analysis (if assembly required)
        bom_result = None
        optimization_result = None
        if smt_options and smt_options.get("assembly_required"):
            bom_analyzer = BOMAnalyzer()
            bom_result = bom_analyzer.analyze_bom(smt_options)
            
            # 4. BOM Optimization
            bom_optimizer = BOMOptimizer()
            optimization_result = bom_optimizer.optimize(smt_options, pcb_options)
        
        # Combine all results
        return {
            "pricing": pricing_result,
            "dfm": dfm_result,
            "bom_analysis": bom_result,
            "optimization": optimization_result,
            "summary": {
                "total_cost": pricing_result["summary"]["total"],
                "dfm_score": dfm_result["dfm_score"],
                "dfm_grade": dfm_result["grade"],
                "manufacturability": dfm_result["manufacturability"],
                "potential_savings": optimization_result["total_potential_savings_percent"] if optimization_result else 0
            }
        }
        
    except Exception as e:
        logging.error(f"Complete analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@app.on_event("startup")
async def startup_db():
    """Initialize database with seed data"""
    await seed_config(db)