from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any, Literal
from datetime import datetime, timezone
import uuid


# Base model configuration
class MongoBaseModel(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field


# ============= Config Collection =============
class ConfigModel(MongoBaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    key: str
    enabled: bool = True
    data: Dict[str, Any]
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ============= User Collection =============
class UserModel(MongoBaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    company: Optional[str] = None
    locale: Literal["tr", "en"] = "tr"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class UserCreate(BaseModel):
    email: str
    company: Optional[str] = None
    locale: Literal["tr", "en"] = "tr"


# ============= Project/Case Study Models =============
class ProjectPhase(BaseModel):
    """A phase in the project development process"""
    title: str
    title_en: Optional[str] = None
    description: str
    description_en: Optional[str] = None
    image_url: Optional[str] = None
    icon: Optional[str] = None


class TechSpec(BaseModel):
    """Technical specification for a project"""
    category: str  # e.g., "PCB", "Components", "Software"
    items: List[Dict[str, str]]  # e.g., [{"label": "Layers", "value": "6"}]


class ProjectMetrics(BaseModel):
    """Measurable results from a project"""
    size_reduction: Optional[str] = None
    cost_savings: Optional[str] = None
    performance_improvement: Optional[str] = None
    time_to_market: Optional[str] = None
    custom: Optional[Dict[str, str]] = None


class ProjectDetail(MongoBaseModel):
    """Detailed project/case study model for portfolio"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str = Field(..., description="URL-friendly identifier")

    # Basic info
    title: str
    title_en: Optional[str] = None
    subtitle: str
    subtitle_en: Optional[str] = None

    # Media
    hero_image: str
    hero_video: Optional[str] = None
    thumbnail: Optional[str] = None

    # Classification
    client_industry: str
    client_industry_en: Optional[str] = None
    project_type: str  # "pcb-design", "iot-solution", "embedded-system", etc.

    # Story content (Turkish)
    challenge_text: str
    solution_text: str
    approach_text: Optional[str] = None
    results_text: str

    # Story content (English)
    challenge_text_en: Optional[str] = None
    solution_text_en: Optional[str] = None
    approach_text_en: Optional[str] = None
    results_text_en: Optional[str] = None

    # Technical details
    technologies: List[str] = []
    tech_specs: Optional[List[TechSpec]] = None

    # Development process
    phases: List[ProjectPhase] = []

    # Results and metrics
    metrics: Optional[ProjectMetrics] = None
    testimonial: Optional[str] = None
    testimonial_author: Optional[str] = None

    # Gallery
    gallery_images: List[str] = []
    pcb_layers: Optional[List[str]] = None  # For interactive layer viewer
    schematic_images: Optional[List[str]] = None

    # Display settings
    featured: bool = False
    order: int = 0
    visible: bool = True

    # Metadata
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ProjectCreate(BaseModel):
    """Model for creating a new project"""
    slug: str
    title: str
    title_en: Optional[str] = None
    subtitle: str
    subtitle_en: Optional[str] = None
    hero_image: str
    client_industry: str
    project_type: str
    challenge_text: str
    solution_text: str
    results_text: str
    technologies: List[str] = []


class ProjectListItem(BaseModel):
    """Lightweight project item for list views"""
    id: str
    slug: str
    title: str
    title_en: Optional[str] = None
    subtitle: str
    subtitle_en: Optional[str] = None
    thumbnail: Optional[str] = None
    hero_image: str
    client_industry: str
    client_industry_en: Optional[str] = None
    technologies: List[str] = []
    featured: bool = False
    order: int = 0


# ============= Consultation Request Collection =============
class ConsultationRequest(MongoBaseModel):
    """Model for project consultation requests"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    project_type: str
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    message: Optional[str] = None
    status: Literal["new", "contacted", "in_progress", "completed", "archived"] = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ConsultationRequestCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    project_type: str
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    message: Optional[str] = None


# ============= Industry/Technology Categories =============
class Industry(BaseModel):
    """Industry category for filtering"""
    slug: str
    name: str
    name_en: str
    icon: Optional[str] = None
    description: Optional[str] = None


class Technology(BaseModel):
    """Technology tag for projects"""
    slug: str
    name: str
    category: str  # "software", "hardware", "component", "tool"
    logo_url: Optional[str] = None
