"""
Pydantic models for type-safe API request/response handling.
Provides validation, serialization, and documentation for all API endpoints.

Schema Evolution Strategy:
  - All models carry a `schema_version` field (default: 1)
  - Breaking changes increment the version and create a new model class
  - API v1 always returns schema_version=1; v2 will return schema_version=2
  - Backward compatibility: old clients ignore unknown fields via ConfigDict(extra="ignore")
  - Forward compatibility: new optional fields have defaults
  - Migration: seed_data and DB migrations must handle version transitions

Naming Convention:
  - V1ProjectDetail, V1InfoRequest — version-pinned models for API v1
  - ProjectDetail, InfoRequest — aliases to the current version (latest)
"""

from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import Optional, List, Any, Generic, TypeVar
from datetime import datetime, timezone
from enum import Enum


# =====================================================
# SCHEMA VERSION TRACKING
# =====================================================

CURRENT_SCHEMA_VERSION = 1


class SchemaVersionMixin(BaseModel):
    """
    Mixin that stamps every response with the schema version.
    Clients can use this to detect and adapt to schema changes.
    """
    schema_version: int = Field(
        default=CURRENT_SCHEMA_VERSION,
        description="Schema version for this response object"
    )


# =====================================================
# ERROR MODELS
# =====================================================

class ApiErrorCode(str, Enum):
    """Exhaustive error codes matching frontend type system."""
    VALIDATION_ERROR = "VALIDATION_ERROR"
    NOT_FOUND = "NOT_FOUND"
    RATE_LIMITED = "RATE_LIMITED"
    UNAUTHORIZED = "UNAUTHORIZED"
    FORBIDDEN = "FORBIDDEN"
    INTERNAL_ERROR = "INTERNAL_ERROR"
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"
    TIMEOUT = "TIMEOUT"


class ErrorDetail(BaseModel):
    """Detailed error information"""
    field: Optional[str] = None
    message: str
    code: ApiErrorCode


class ErrorResponse(SchemaVersionMixin):
    """Standard error response envelope"""
    success: bool = False
    error: bool = True
    message: str
    details: List[ErrorDetail] = Field(default_factory=list)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# =====================================================
# SUCCESS RESPONSE MODELS
# =====================================================

T = TypeVar("T")


class SuccessResponse(SchemaVersionMixin):
    """Standard success response envelope"""
    success: bool = True
    message: str
    data: Optional[Any] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PaginatedResponse(SchemaVersionMixin):
    """Paginated list response envelope"""
    success: bool = True
    items: List[Any]
    total: int
    page: int
    per_page: int
    pages: int
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# =====================================================
# CONFIGURATION MODELS
# =====================================================

class ConfigOption(BaseModel):
    """A selectable configuration option (e.g., surface finish, color)"""
    model_config = ConfigDict(extra="ignore")

    value: str
    label: str
    description: Optional[str] = None
    price_factor: Optional[float] = None


class FormConfigResponse(SchemaVersionMixin):
    """Complete form configuration response"""
    finishes: List[ConfigOption]
    colors: List[ConfigOption]
    layers: List[ConfigOption]
    thicknesses: List[ConfigOption]
    copper_weights: List[ConfigOption]
    stencils: List[ConfigOption]
    sourcing_options: List[ConfigOption]
    limits: dict
    updated_at: datetime


# Type aliases used by config_routes.py imports
SurfaceFinish = ConfigOption
SolderMaskColor = ConfigOption
StencilType = ConfigOption
SourcingType = ConfigOption


# =====================================================
# V1 DOMAIN MODELS — Pinned to schema version 1
# =====================================================

class V1ProjectPhase(BaseModel):
    """A phase in the project development process (v1)"""
    model_config = ConfigDict(extra="ignore")

    title: str
    description: str
    image_url: Optional[str] = None
    icon: Optional[str] = None


class V1ProjectDetail(SchemaVersionMixin):
    """Project/case study model for portfolio (v1)"""
    model_config = ConfigDict(extra="ignore")

    id: str
    slug: str
    title: str
    subtitle: str
    hero_image: Optional[str] = None
    client_industry: str

    challenge_text: str
    solution_text: str
    approach_text: Optional[str] = None
    results_text: str

    technologies: List[str] = Field(default_factory=list)
    phases: List[V1ProjectPhase] = Field(default_factory=list)

    metrics: Optional[dict] = None
    gallery_images: List[str] = Field(default_factory=list)
    pcb_layers: Optional[List[str]] = None

    featured: bool = False
    order: int = 0

    created_at: Optional[str] = None
    updated_at: Optional[str] = None


class V1InfoRequest(SchemaVersionMixin):
    """Consultation request response (v1)"""
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    project_type: str
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    message: Optional[str] = None
    created_at: Optional[str] = None


class V1StatusCheck(SchemaVersionMixin):
    """Status check response (v1)"""
    model_config = ConfigDict(extra="ignore")

    id: str
    client_name: str
    timestamp: Optional[str] = None


# =====================================================
# CURRENT VERSION ALIASES
# When schema v2 is needed, create V2* classes and
# update these aliases. v1 API routes keep using V1*.
# =====================================================

ProjectPhase = V1ProjectPhase
ProjectDetail = V1ProjectDetail
InfoRequest = V1InfoRequest
StatusCheck = V1StatusCheck
