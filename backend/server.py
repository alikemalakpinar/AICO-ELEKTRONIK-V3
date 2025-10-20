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