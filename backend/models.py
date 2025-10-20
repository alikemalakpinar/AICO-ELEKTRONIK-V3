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


# ============= File Collection =============
class FileModel(MongoBaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: Literal["GERBER", "BOM", "PNP"]
    path: str
    size: int  # bytes
    rev: Optional[str] = None
    order_id: Optional[str] = None
    hash: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    meta: Dict[str, Any] = {}


# ============= Quote Collection =============
class PanelizationOptions(BaseModel):
    mode: Literal["none", "inline", "array"] = "none"
    nxm: Optional[Dict[str, int]] = None  # {"n": 3, "m": 2}
    break_method: Optional[Literal["vcut", "tabRoute"]] = None
    rails_mm: Optional[Dict[str, int]] = None  # {"left": 5, "right": 5, "top": 5, "bottom": 5}


class PCBOptions(BaseModel):
    quantity: int
    layers: Literal[2, 4, 6, 8, 10]
    thickness_mm: float = 1.6
    copper_oz: Literal[1, 2] = 1
    finish: Literal["HASL", "ENIG", "OSP"]
    solder_mask_color: str = "green"
    silkscreen: Literal["top", "bottom", "both", "none"] = "both"
    min_track_space_mm: float
    impedance_controlled: bool = False
    e_test: bool = True
    board_size_mm: Dict[str, float]  # {"w": 100, "h": 80}
    panelization: Optional[PanelizationOptions] = None


class SMTOptions(BaseModel):
    assembly_required: bool = False
    sides: Optional[Literal["single", "double"]] = None
    component_count: Optional[int] = None
    unique_parts: Optional[int] = None
    bga_count: Optional[int] = 0
    uses_01005: Optional[bool] = False
    stencil: Optional[Literal["none", "framed", "frameless"]] = None
    inspection: Optional[List[str]] = []  # ["AOI", "Xray"]
    sourcing: Optional[Literal["turnkey", "consigned", "partial"]] = None


class QuoteInputs(BaseModel):
    pcb: PCBOptions
    smt: Optional[SMTOptions] = None
    lead_time: Literal["fast", "standard", "economy"] = "standard"


class PricingBreakdown(BaseModel):
    pcb: float
    smt: float
    shipping: float


class QuotePricing(BaseModel):
    breakdown: PricingBreakdown
    total: float
    currency: str = "TRY"
    warnings: List[str] = []


class QuoteModel(MongoBaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    inputs: QuoteInputs
    pricing: QuotePricing
    status: Literal["DRAFT", "SENT", "ACCEPTED", "EXPIRED"] = "DRAFT"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class QuoteCalculateRequest(BaseModel):
    pcb: PCBOptions
    smt: Optional[SMTOptions] = None
    lead_time: Literal["fast", "standard", "economy"] = "standard"


class QuoteSaveRequest(BaseModel):
    user_id: Optional[str] = None
    inputs: QuoteInputs
    pricing: QuotePricing


# ============= Order Collection =============
class TrackingEntry(BaseModel):
    status: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    note: Optional[str] = None


class OrderModel(MongoBaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quote_id: str
    payment_status: Literal["PENDING", "PAID", "FAILED", "REFUNDED"] = "PENDING"
    tracking: List[TrackingEntry] = []
    invoice_no: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class OrderCreate(BaseModel):
    quote_id: str
