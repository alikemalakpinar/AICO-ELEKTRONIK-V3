"""
Pydantic models for type-safe API request/response handling.
Provides validation, serialization, and documentation for all API endpoints.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


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


# =====================================================
# SUCCESS RESPONSE MODELS
# =====================================================

class SuccessResponse(BaseModel):
    """Standard success response"""
    success: bool = True
    message: str
    data: Optional[dict] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class PaginatedResponse(BaseModel):
    """Paginated list response"""
    items: List[dict]
    total: int
    page: int
    per_page: int
    pages: int
