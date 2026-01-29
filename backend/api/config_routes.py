"""
Dynamic configuration API endpoints.
Allows frontend to fetch form options dynamically without redeployment.
"""

from fastapi import APIRouter, Depends, Request
from typing import Dict, Any, List
from datetime import datetime
from models.schemas import (
    ConfigOption, FormConfigResponse,
    SurfaceFinish, SolderMaskColor, StencilType, SourcingType,
    PCB_LIMITS if hasattr(__import__('models.schemas'), 'PCB_LIMITS') else None
)


router = APIRouter(prefix="/api/v1/config", tags=["Configuration"])


# =====================================================
# STATIC CONFIGURATION DATA
# Updated centrally - frontend fetches dynamically
# =====================================================

SURFACE_FINISHES = [
    ConfigOption(
        value="HASL",
        label="HASL (Hot Air Solder Leveling)",
        description="Standart lehim kaplaması, ekonomik",
        price_factor=1.0
    ),
    ConfigOption(
        value="HASL-LF",
        label="HASL Lead-Free",
        description="Kurşunsuz HASL, RoHS uyumlu",
        price_factor=1.05
    ),
    ConfigOption(
        value="ENIG",
        label="ENIG (Electroless Nickel Immersion Gold)",
        description="Altın kaplama, uzun raf ömrü, düz yüzey",
        price_factor=1.25
    ),
    ConfigOption(
        value="OSP",
        label="OSP (Organic Solderability Preservative)",
        description="Organik kaplama, çevre dostu, düz yüzey",
        price_factor=1.0
    ),
    ConfigOption(
        value="Immersion Tin",
        label="Immersion Tin",
        description="Kalay daldırma, press-fit bağlantılar için ideal",
        price_factor=1.15
    ),
    ConfigOption(
        value="Immersion Silver",
        label="Immersion Silver",
        description="Gümüş daldırma, yüksek frekans uygulamaları",
        price_factor=1.20
    ),
    ConfigOption(
        value="Hard Gold",
        label="Hard Gold",
        description="Sert altın, edge connector'lar için",
        price_factor=1.80
    )
]

SOLDER_MASK_COLORS = [
    ConfigOption(value="green", label="Yeşil", description="Standart renk", price_factor=1.0),
    ConfigOption(value="red", label="Kırmızı", description="Profesyonel görünüm", price_factor=1.0),
    ConfigOption(value="blue", label="Mavi", description="Arduino tarzı", price_factor=1.0),
    ConfigOption(value="black", label="Siyah", description="Premium görünüm", price_factor=1.05),
    ConfigOption(value="white", label="Beyaz", description="LED uygulamaları için", price_factor=1.05),
    ConfigOption(value="yellow", label="Sarı", description="Yüksek kontrast", price_factor=1.0),
    ConfigOption(value="purple", label="Mor", description="Özel tasarımlar", price_factor=1.05),
    ConfigOption(value="matte_black", label="Mat Siyah", description="Lüks görünüm", price_factor=1.10),
    ConfigOption(value="matte_green", label="Mat Yeşil", description="Profesyonel mat", price_factor=1.05)
]

LAYER_OPTIONS = [
    ConfigOption(value="1", label="1 Katman", description="Tek taraflı basit devreler", price_factor=0.85),
    ConfigOption(value="2", label="2 Katman", description="Standart çift taraflı", price_factor=1.0),
    ConfigOption(value="4", label="4 Katman", description="Orta karmaşıklık", price_factor=1.4),
    ConfigOption(value="6", label="6 Katman", description="Yüksek yoğunluk", price_factor=1.9),
    ConfigOption(value="8", label="8 Katman", description="Çok katmanlı", price_factor=2.5),
    ConfigOption(value="10", label="10 Katman", description="İleri seviye", price_factor=3.2),
    ConfigOption(value="12", label="12 Katman", description="Profesyonel", price_factor=4.0)
]

THICKNESS_OPTIONS = [
    ConfigOption(value="0.4", label="0.4mm", description="Ultra ince"),
    ConfigOption(value="0.6", label="0.6mm", description="İnce"),
    ConfigOption(value="0.8", label="0.8mm", description="İnce"),
    ConfigOption(value="1.0", label="1.0mm", description="Standart ince"),
    ConfigOption(value="1.2", label="1.2mm", description="Orta"),
    ConfigOption(value="1.6", label="1.6mm (Standart)", description="En yaygın kalınlık"),
    ConfigOption(value="2.0", label="2.0mm", description="Kalın"),
    ConfigOption(value="2.4", label="2.4mm", description="Ekstra kalın")
]

COPPER_WEIGHT_OPTIONS = [
    ConfigOption(value="0.5", label="0.5 oz (17µm)", description="İnce bakır, düşük akım"),
    ConfigOption(value="1", label="1 oz (35µm)", description="Standart"),
    ConfigOption(value="2", label="2 oz (70µm)", description="Yüksek akım uygulamaları"),
    ConfigOption(value="3", label="3 oz (105µm)", description="Güç elektroniği")
]

STENCIL_OPTIONS = [
    ConfigOption(value="none", label="Stencil Yok", description="Manuel lehimleme", price_factor=0),
    ConfigOption(value="frameless", label="Çerçevesiz", description="Düşük maliyetli prototip", price_factor=150),
    ConfigOption(value="framed", label="Çerçeveli", description="Seri üretim için", price_factor=350)
]

SOURCING_OPTIONS = [
    ConfigOption(value="turnkey", label="Turnkey", description="Tüm malzemeler bize ait"),
    ConfigOption(value="consigned", label="Consigned", description="Müşteri malzemeleri"),
    ConfigOption(value="partial", label="Partial", description="Karma tedarik")
]

FORM_LIMITS = {
    "quantity": {"min": 1, "max": 100000, "default": 50},
    "board_width_mm": {"min": 5, "max": 500, "default": 100},
    "board_height_mm": {"min": 5, "max": 500, "default": 80},
    "min_track_space_mm": {"min": 0.075, "max": 1.0, "default": 0.15, "step": 0.01},
    "component_count": {"min": 0, "max": 10000, "default": 0},
    "unique_parts": {"min": 0, "max": 1000, "default": 0},
    "bga_count": {"min": 0, "max": 500, "default": 0}
}


# =====================================================
# API ENDPOINTS
# =====================================================

@router.get("/form-options", response_model=FormConfigResponse)
async def get_form_options():
    """
    Get all form configuration options.
    Frontend should cache this response and refresh periodically.
    """
    return FormConfigResponse(
        finishes=SURFACE_FINISHES,
        colors=SOLDER_MASK_COLORS,
        layers=LAYER_OPTIONS,
        thicknesses=THICKNESS_OPTIONS,
        copper_weights=COPPER_WEIGHT_OPTIONS,
        stencils=STENCIL_OPTIONS,
        sourcing_options=SOURCING_OPTIONS,
        limits=FORM_LIMITS,
        updated_at=datetime.utcnow()
    )


@router.get("/finishes")
async def get_surface_finishes() -> List[Dict[str, Any]]:
    """Get available surface finish options."""
    return [f.model_dump() for f in SURFACE_FINISHES]


@router.get("/colors")
async def get_solder_mask_colors() -> List[Dict[str, Any]]:
    """Get available solder mask colors."""
    return [c.model_dump() for c in SOLDER_MASK_COLORS]


@router.get("/layers")
async def get_layer_options() -> List[Dict[str, Any]]:
    """Get available layer count options."""
    return [l.model_dump() for l in LAYER_OPTIONS]


@router.get("/limits")
async def get_form_limits() -> Dict[str, Any]:
    """Get form field limits for validation."""
    return FORM_LIMITS


@router.get("/pricing-factors")
async def get_pricing_factors() -> Dict[str, Any]:
    """
    Get all pricing factor information.
    Useful for showing price impact of different options.
    """
    return {
        "finishes": {f.value: f.price_factor for f in SURFACE_FINISHES},
        "colors": {c.value: c.price_factor for c in SOLDER_MASK_COLORS if c.price_factor},
        "layers": {l.value: l.price_factor for l in LAYER_OPTIONS},
        "lead_times": {
            "fast": {"factor": 1.5, "days": "3-5"},
            "standard": {"factor": 1.0, "days": "7-10"},
            "economy": {"factor": 0.85, "days": "12-15"}
        },
        "tolerances": {
            "standard": {"min_mm": 0.15, "factor": 1.0},
            "tight": {"min_mm": 0.10, "factor": 1.15},
            "ultra_fine": {"min_mm": 0.075, "factor": 1.44}
        }
    }


@router.get("/health")
async def config_health():
    """Health check for configuration service."""
    return {
        "status": "healthy",
        "service": "config",
        "timestamp": datetime.utcnow().isoformat()
    }
