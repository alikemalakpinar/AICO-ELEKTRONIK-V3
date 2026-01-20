from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends, Header
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import secrets

# Import seed data for projects
from seed_data import seed_config

# Import custom rate limiter middleware
from middleware.rate_limiter import RateLimitMiddleware, RateLimitConfig

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Rate limiter setup
limiter = Limiter(key_func=get_remote_address)

# Admin API key authentication
API_KEY_HEADER = APIKeyHeader(name="X-API-Key", auto_error=False)
ADMIN_API_KEY = os.environ.get('ADMIN_API_KEY', None)

async def verify_admin_key(api_key: str = Depends(API_KEY_HEADER)) -> bool:
    """
    Verify admin API key for protected endpoints.
    Returns True if valid, raises HTTPException otherwise.
    """
    if ADMIN_API_KEY is None:
        logging.warning("ADMIN_API_KEY not set - admin endpoints are disabled")
        raise HTTPException(
            status_code=503,
            detail="Admin endpoints are disabled. Configure ADMIN_API_KEY to enable."
        )

    if api_key is None:
        raise HTTPException(
            status_code=401,
            detail="Missing API key. Provide X-API-Key header."
        )

    # Use constant-time comparison to prevent timing attacks
    if not secrets.compare_digest(api_key, ADMIN_API_KEY):
        raise HTTPException(
            status_code=403,
            detail="Invalid API key"
        )

    return True

# Create the main app without a prefix
app = FastAPI(
    title="AICO Elektronik Engineering Portfolio API",
    description="Muhendislik ve Ar-Ge Danismanlik Portfolyosu API",
    version="2.0.0"
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============= Contact/Info Request Model =============
class InfoRequest(BaseModel):
    """Model for project consultation requests"""
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    project_type: str = Field(..., description="Type of engineering project")
    budget_range: Optional[str] = Field(None, description="Budget range for the project")
    timeline: Optional[str] = Field(None, description="Expected project timeline")
    message: Optional[str] = Field(None, max_length=2000)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class InfoRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., min_length=5, max_length=100)
    phone: Optional[str] = None
    company: Optional[str] = None
    project_type: str
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    message: Optional[str] = None


# ============= Project/Case Study Models =============
class ProjectPhase(BaseModel):
    """A phase in the project development process"""
    title: str
    description: str
    image_url: Optional[str] = None


class ProjectDetail(BaseModel):
    """Detailed project/case study model for portfolio"""
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str = Field(..., description="URL-friendly identifier")
    title: str
    subtitle: str
    hero_image: str
    client_industry: str

    challenge_text: str
    solution_text: str
    approach_text: Optional[str] = None

    technologies: List[str] = []
    phases: List[ProjectPhase] = []

    results_text: str
    metrics: Optional[dict] = None  # e.g., {"size_reduction": "40%", "cost_savings": "25%"}

    gallery_images: List[str] = []
    pcb_layers: Optional[List[str]] = None  # For interactive layer viewer

    featured: bool = False
    order: int = 0

    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Define Models (for backward compatibility)
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ============= Root Routes =============
@api_router.get("/")
async def root():
    return {
        "message": "AICO Elektronik Engineering Portfolio API",
        "version": "2.0.0",
        "status": "operational"
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

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


# ============= Project/Case Study Routes =============
@api_router.get("/projects")
async def get_projects(featured: Optional[bool] = None, industry: Optional[str] = None):
    """
    Get all projects/case studies
    Optionally filter by featured status or industry
    """
    query = {}
    if featured is not None:
        query["featured"] = featured
    if industry:
        query["client_industry"] = industry

    projects = await db.projects.find(query, {"_id": 0}).sort("order", 1).to_list(100)
    return projects


@api_router.get("/projects/{slug}")
async def get_project_by_slug(slug: str):
    """Get a single project by its slug"""
    project = await db.projects.find_one({"slug": slug}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@api_router.get("/projects/industry/{industry}")
async def get_projects_by_industry(industry: str):
    """Get projects filtered by industry"""
    projects = await db.projects.find(
        {"client_industry": industry},
        {"_id": 0}
    ).sort("order", 1).to_list(100)
    return projects


# ============= Contact/Consultation Request Routes =============
@api_router.post("/contact/consultation", response_model=InfoRequest)
@limiter.limit("5/minute")
async def create_consultation_request(request: Request, info_request: InfoRequestCreate):
    """
    Submit a project consultation request
    Rate limited: 5 requests per minute
    """
    try:
        info_obj = InfoRequest(
            name=info_request.name,
            email=info_request.email,
            phone=info_request.phone,
            company=info_request.company,
            project_type=info_request.project_type,
            budget_range=info_request.budget_range,
            timeline=info_request.timeline,
            message=info_request.message
        )

        info_dict = info_obj.model_dump()
        info_dict['created_at'] = info_dict['created_at'].isoformat()

        await db.consultation_requests.insert_one(info_dict)

        logging.info(f"New consultation request for {info_request.project_type} from {info_request.email}")
        return info_obj

    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Consultation request error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error submitting request: {str(e)}")


@api_router.get("/contact/consultations")
async def get_consultation_requests(
    project_type: Optional[str] = None,
    _: bool = Depends(verify_admin_key)
):
    """
    Get all consultation requests (admin only - requires X-API-Key header)
    Optionally filter by project type
    """
    query = {}
    if project_type:
        query["project_type"] = project_type

    requests = await db.consultation_requests.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return requests


# Legacy contact endpoint for backward compatibility
@api_router.post("/contact/request-info", response_model=InfoRequest)
@limiter.limit("5/minute")
async def create_info_request(request: Request, info_request: InfoRequestCreate):
    """
    Legacy endpoint - redirects to consultation request
    """
    return await create_consultation_request(request, info_request)


# ============= Technologies/Capabilities Routes =============
@api_router.get("/technologies")
async def get_technologies():
    """Get all technologies used across projects"""
    projects = await db.projects.find({}, {"technologies": 1, "_id": 0}).to_list(100)

    # Aggregate unique technologies
    all_techs = set()
    for project in projects:
        if project.get("technologies"):
            all_techs.update(project["technologies"])

    return sorted(list(all_techs))


@api_router.get("/industries")
async def get_industries():
    """Get all industries served"""
    projects = await db.projects.find({}, {"client_industry": 1, "_id": 0}).to_list(100)

    industries = set()
    for project in projects:
        if project.get("client_industry"):
            industries.add(project["client_industry"])

    return sorted(list(industries))


# Include the router in the main app
app.include_router(api_router)

# ============= CORS Configuration =============
# Production: Require explicit CORS_ORIGINS whitelist
# Development: Allow localhost origins
ENVIRONMENT = os.environ.get('ENVIRONMENT', 'development').lower()
CORS_ORIGINS_RAW = os.environ.get('CORS_ORIGINS', '')

if ENVIRONMENT == 'production':
    if not CORS_ORIGINS_RAW or CORS_ORIGINS_RAW == '*':
        logging.warning(
            "SECURITY WARNING: CORS_ORIGINS not properly configured for production. "
            "Set explicit origins (e.g., 'https://aicoelektronik.com,https://www.aicoelektronik.com')"
        )
        # Default to main domain in production if not set
        cors_origins = ['https://aicoelektronik.com', 'https://www.aicoelektronik.com']
    else:
        cors_origins = [origin.strip() for origin in CORS_ORIGINS_RAW.split(',') if origin.strip()]
else:
    # Development: allow common local origins
    if CORS_ORIGINS_RAW and CORS_ORIGINS_RAW != '*':
        cors_origins = [origin.strip() for origin in CORS_ORIGINS_RAW.split(',') if origin.strip()]
    else:
        cors_origins = [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:3001',
        ]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ============= Global Rate Limiting =============
# Apply global rate limiting middleware (in addition to per-endpoint limits)
global_rate_config = RateLimitConfig(
    requests_per_minute=int(os.environ.get('RATE_LIMIT_REQUESTS_PER_MINUTE', 60)),
    requests_per_hour=int(os.environ.get('RATE_LIMIT_REQUESTS_PER_HOUR', 500)),
    burst_limit=15,
    burst_window_seconds=10,
)
app.add_middleware(
    RateLimitMiddleware,
    config=global_rate_config,
    exclude_paths=["/health", "/docs", "/redoc", "/openapi.json", "/api/", "/favicon.ico"]
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
