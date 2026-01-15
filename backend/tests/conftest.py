"""
Pytest Configuration and Fixtures
"""

import pytest
from fastapi.testclient import TestClient
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set test environment
os.environ["ENVIRONMENT"] = "testing"
os.environ["MONGO_URL"] = "mongodb://localhost:27017"
os.environ["DB_NAME"] = "aico_test_db"


@pytest.fixture(scope="module")
def test_client():
    """
    Create a test client for the FastAPI application.
    """
    # Import here to ensure env vars are set first
    from server import app

    with TestClient(app) as client:
        yield client


@pytest.fixture
def sample_pcb_options():
    """Sample PCB options for testing"""
    return {
        "quantity": 50,
        "layers": 4,
        "thickness_mm": 1.6,
        "copper_oz": 1,
        "finish": "HASL",
        "solder_mask_color": "green",
        "silkscreen": "both",
        "min_track_space_mm": 0.15,
        "impedance_controlled": False,
        "e_test": True,
        "board_width_mm": 100,
        "board_height_mm": 80,
        "panelization_mode": "none",
        "panel_n": 2,
        "panel_m": 2,
        "assembly_required": False,
        "sides": "single",
        "component_count": 0,
        "unique_parts": 0,
        "bga_count": 0,
        "uses_01005": False,
        "stencil": "frameless",
        "inspection_aoi": True,
        "inspection_xray": False,
        "sourcing": "turnkey",
        "lead_time": "standard"
    }


@pytest.fixture
def sample_smt_options():
    """Sample SMT options for testing"""
    return {
        "quantity": 50,
        "layers": 2,
        "thickness_mm": 1.6,
        "copper_oz": 1,
        "finish": "ENIG",
        "solder_mask_color": "black",
        "silkscreen": "both",
        "min_track_space_mm": 0.15,
        "impedance_controlled": False,
        "e_test": True,
        "board_width_mm": 80,
        "board_height_mm": 60,
        "panelization_mode": "none",
        "panel_n": 2,
        "panel_m": 2,
        "assembly_required": True,
        "sides": "double",
        "component_count": 150,
        "unique_parts": 35,
        "bga_count": 2,
        "uses_01005": False,
        "stencil": "framed",
        "inspection_aoi": True,
        "inspection_xray": True,
        "sourcing": "turnkey",
        "lead_time": "fast"
    }


@pytest.fixture
def extreme_pcb_options():
    """Extreme PCB options for edge case testing"""
    return {
        "quantity": 1,
        "layers": 12,
        "thickness_mm": 2.0,
        "copper_oz": 3,
        "finish": "Hard Gold",
        "solder_mask_color": "matte_black",
        "silkscreen": "both",
        "min_track_space_mm": 0.075,  # Ultra-fine
        "impedance_controlled": True,
        "e_test": True,
        "board_width_mm": 10,  # Very small
        "board_height_mm": 10,
        "panelization_mode": "none",
        "panel_n": 2,
        "panel_m": 2,
        "assembly_required": True,
        "sides": "double",
        "component_count": 500,
        "unique_parts": 100,
        "bga_count": 10,
        "uses_01005": True,
        "stencil": "framed",
        "inspection_aoi": True,
        "inspection_xray": True,
        "sourcing": "turnkey",
        "lead_time": "fast"
    }
