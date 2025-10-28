#!/usr/bin/env python3
"""
Backend API Testing for JLCPCB-like Instant Quote System
Tests all backend APIs with comprehensive scenarios and validation
"""

import requests
import json
import sys
from typing import Dict, Any, Optional
import uuid

# Backend URL from environment
BACKEND_URL = "https://bu-web-enhanced.preview.emergentagent.com"

class BackendTester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.test_results = []
        self.saved_quote_id = None
        self.saved_order_id = None
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")
        print()
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "response": response_data if not success else None
        })
    
    def make_request(self, method: str, endpoint: str, data: Dict = None) -> tuple[bool, Any, int]:
        """Make HTTP request and return success, response data, status code"""
        url = f"{self.base_url}{endpoint}"
        try:
            if method.upper() == "GET":
                response = self.session.get(url)
            elif method.upper() == "POST":
                response = self.session.post(url, json=data)
            else:
                return False, f"Unsupported method: {method}", 0
            
            return True, response.json() if response.content else {}, response.status_code
        except requests.exceptions.RequestException as e:
            return False, f"Request failed: {str(e)}", 0
        except json.JSONDecodeError as e:
            return False, f"JSON decode error: {str(e)}", response.status_code if 'response' in locals() else 0
    
    def test_config_pricing(self):
        """Test GET /api/config/pricing.v0_1"""
        print("🔍 Testing Config API - Pricing Configuration")
        
        success, data, status_code = self.make_request("GET", "/api/config/pricing.v0_1")
        
        if not success:
            self.log_test("Config API - pricing.v0_1", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Config API - pricing.v0_1", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate required fields
        required_fields = ["key", "enabled", "data"]
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            self.log_test("Config API - pricing.v0_1", False, f"Missing fields: {missing_fields}", data)
            return
        
        # Validate pricing data structure
        pricing_data = data.get("data", {})
        required_sections = ["pcb", "smt", "shipping", "currency"]
        missing_sections = [section for section in required_sections if section not in pricing_data]
        
        if missing_sections:
            self.log_test("Config API - pricing.v0_1", False, f"Missing pricing sections: {missing_sections}", pricing_data)
            return
        
        # Check PCB coefficients
        pcb_config = pricing_data.get("pcb", {})
        pcb_required = ["setupFee", "basePerCm2", "layerFactor", "finishFactor"]
        pcb_missing = [field for field in pcb_required if field not in pcb_config]
        
        if pcb_missing:
            self.log_test("Config API - pricing.v0_1", False, f"Missing PCB config: {pcb_missing}", pcb_config)
            return
        
        # Check SMT coefficients
        smt_config = pricing_data.get("smt", {})
        smt_required = ["setupFeeSingle", "setupFeeDouble", "placementPerComponent"]
        smt_missing = [field for field in smt_required if field not in smt_config]
        
        if smt_missing:
            self.log_test("Config API - pricing.v0_1", False, f"Missing SMT config: {smt_missing}", smt_config)
            return
        
        self.log_test("Config API - pricing.v0_1", True, f"All required fields present, currency: {pricing_data.get('currency')}")
    
    def test_quote_calculate_scenario_a(self):
        """Test Scenario A: Simple 2-layer PCB (no assembly)"""
        print("🔍 Testing Quote Calculate - Scenario A: Simple 2-layer PCB")
        
        payload = {
            "pcb": {
                "quantity": 10,
                "layers": 2,
                "thickness_mm": 1.6,
                "copper_oz": 1,
                "finish": "HASL",
                "solder_mask_color": "green",
                "silkscreen": "both",
                "min_track_space_mm": 0.15,
                "impedance_controlled": False,
                "e_test": True,
                "board_size_mm": {"w": 50, "h": 50}
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/calculate", payload)
        
        if not success:
            self.log_test("Quote Calculate - Scenario A", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Quote Calculate - Scenario A", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate response structure
        required_fields = ["currency", "breakdown", "total", "warnings"]
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            self.log_test("Quote Calculate - Scenario A", False, f"Missing fields: {missing_fields}", data)
            return
        
        # Check breakdown structure
        breakdown = data.get("breakdown", {})
        if "pcb" not in breakdown or "smt" not in breakdown or "shipping" not in breakdown:
            self.log_test("Quote Calculate - Scenario A", False, "Missing breakdown components", breakdown)
            return
        
        # Validate no SMT cost (assembly not required)
        smt_cost = breakdown.get("smt", 0)
        if smt_cost != 0:
            self.log_test("Quote Calculate - Scenario A", False, f"Expected SMT cost 0, got {smt_cost}")
            return
        
        # Validate PCB cost is positive
        pcb_cost = breakdown.get("pcb", 0)
        if pcb_cost <= 0:
            self.log_test("Quote Calculate - Scenario A", False, f"PCB cost should be positive, got {pcb_cost}")
            return
        
        # Check total calculation
        expected_total = pcb_cost + smt_cost + breakdown.get("shipping", 0)
        actual_total = data.get("total", 0)
        if abs(expected_total - actual_total) > 0.01:
            self.log_test("Quote Calculate - Scenario A", False, f"Total mismatch: expected {expected_total}, got {actual_total}")
            return
        
        self.log_test("Quote Calculate - Scenario A", True, f"PCB: {pcb_cost} {data.get('currency')}, Total: {actual_total} {data.get('currency')}")
    
    def test_quote_calculate_scenario_b(self):
        """Test Scenario B: 4-layer PCB with impedance control (tight tolerance)"""
        print("🔍 Testing Quote Calculate - Scenario B: 4-layer with impedance control")
        
        payload = {
            "pcb": {
                "quantity": 50,
                "layers": 4,
                "thickness_mm": 1.6,
                "copper_oz": 1,
                "finish": "ENIG",
                "solder_mask_color": "green",
                "silkscreen": "both",
                "min_track_space_mm": 0.10,  # Tight tolerance
                "impedance_controlled": True,
                "e_test": True,
                "board_size_mm": {"w": 100, "h": 80}
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/calculate", payload)
        
        if not success:
            self.log_test("Quote Calculate - Scenario B", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Quote Calculate - Scenario B", False, f"Expected 200, got {status_code}", data)
            return
        
        # Check for warnings about tight tolerance and impedance control
        warnings = data.get("warnings", [])
        
        has_tight_tolerance_warning = any("tight tolerance" in warning.lower() for warning in warnings)
        has_impedance_warning = any("impedance" in warning.lower() for warning in warnings)
        
        if not has_tight_tolerance_warning:
            self.log_test("Quote Calculate - Scenario B", False, "Missing tight tolerance warning for ≤0.10mm", warnings)
            return
        
        if not has_impedance_warning:
            self.log_test("Quote Calculate - Scenario B", False, "Missing impedance control warning", warnings)
            return
        
        # Validate higher cost due to 4 layers and premiums
        pcb_cost = data.get("breakdown", {}).get("pcb", 0)
        if pcb_cost <= 0:
            self.log_test("Quote Calculate - Scenario B", False, f"PCB cost should be positive, got {pcb_cost}")
            return
        
        self.log_test("Quote Calculate - Scenario B", True, f"Warnings present: {len(warnings)}, PCB cost: {pcb_cost} {data.get('currency')}")
    
    def test_quote_calculate_scenario_c(self):
        """Test Scenario C: PCB + SMT Assembly with BGA"""
        print("🔍 Testing Quote Calculate - Scenario C: PCB + SMT with BGA")
        
        payload = {
            "pcb": {
                "quantity": 100,
                "layers": 6,
                "thickness_mm": 1.6,
                "copper_oz": 2,
                "finish": "ENIG",
                "solder_mask_color": "black",
                "silkscreen": "both",
                "min_track_space_mm": 0.12,
                "impedance_controlled": False,
                "e_test": True,
                "board_size_mm": {"w": 150, "h": 120}
            },
            "smt": {
                "assembly_required": True,
                "sides": "double",
                "component_count": 500,
                "unique_parts": 120,
                "bga_count": 5,
                "uses_01005": False,
                "stencil": "frameless",
                "inspection": ["AOI", "Xray"],
                "sourcing": "turnkey"
            },
            "lead_time": "fast"
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/calculate", payload)
        
        if not success:
            self.log_test("Quote Calculate - Scenario C", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Quote Calculate - Scenario C", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate both PCB and SMT costs are present
        breakdown = data.get("breakdown", {})
        pcb_cost = breakdown.get("pcb", 0)
        smt_cost = breakdown.get("smt", 0)
        
        if pcb_cost <= 0:
            self.log_test("Quote Calculate - Scenario C", False, f"PCB cost should be positive, got {pcb_cost}")
            return
        
        if smt_cost <= 0:
            self.log_test("Quote Calculate - Scenario C", False, f"SMT cost should be positive, got {smt_cost}")
            return
        
        # Check for BGA warning
        warnings = data.get("warnings", [])
        has_bga_warning = any("bga" in warning.lower() for warning in warnings)
        
        if not has_bga_warning:
            self.log_test("Quote Calculate - Scenario C", False, "Missing BGA components warning", warnings)
            return
        
        # Validate total cost calculation includes shipping
        total_cost = data.get("total", 0)
        shipping_cost = breakdown.get("shipping", 0)
        expected_total = pcb_cost + smt_cost + shipping_cost
        
        if abs(total_cost - expected_total) > 0.01:
            self.log_test("Quote Calculate - Scenario C", False, f"Total cost calculation error: {total_cost} vs expected {expected_total}")
            return
        
        self.log_test("Quote Calculate - Scenario C", True, f"PCB: {pcb_cost}, SMT: {smt_cost}, Total: {total_cost} {data.get('currency')}")
        
        # Store this quote data for save test
        self.test_quote_data = {
            "inputs": {
                "pcb": payload["pcb"],
                "smt": payload["smt"],
                "lead_time": payload["lead_time"]
            },
            "pricing": {
                "breakdown": breakdown,
                "total": data.get("total"),
                "currency": data.get("currency"),
                "warnings": warnings
            }
        }
    
    def test_quote_save(self):
        """Test POST /api/quote/save"""
        print("🔍 Testing Quote Save")
        
        if not hasattr(self, 'test_quote_data'):
            self.log_test("Quote Save", False, "No quote data available from previous test")
            return
        
        # Generate a test user ID
        test_user_id = str(uuid.uuid4())
        
        payload = {
            "user_id": test_user_id,
            "inputs": self.test_quote_data["inputs"],
            "pricing": self.test_quote_data["pricing"]
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/save", payload)
        
        if not success:
            self.log_test("Quote Save", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Quote Save", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate response has quote ID
        quote_id = data.get("id")
        if not quote_id:
            self.log_test("Quote Save", False, "No quote ID returned", data)
            return
        
        # Validate UUID format
        try:
            uuid.UUID(quote_id)
        except ValueError:
            self.log_test("Quote Save", False, f"Invalid UUID format: {quote_id}")
            return
        
        # Store for later tests
        self.saved_quote_id = quote_id
        
        # Validate other fields
        if data.get("status") != "DRAFT":
            self.log_test("Quote Save", False, f"Expected status DRAFT, got {data.get('status')}")
            return
        
        if data.get("user_id") != test_user_id:
            self.log_test("Quote Save", False, f"User ID mismatch: expected {test_user_id}, got {data.get('user_id')}")
            return
        
        self.log_test("Quote Save", True, f"Quote saved with ID: {quote_id}")
    
    def test_quote_retrieve(self):
        """Test GET /api/quote/{id}"""
        print("🔍 Testing Quote Retrieve")
        
        if not self.saved_quote_id:
            self.log_test("Quote Retrieve", False, "No saved quote ID available")
            return
        
        success, data, status_code = self.make_request("GET", f"/api/quote/{self.saved_quote_id}")
        
        if not success:
            self.log_test("Quote Retrieve", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Quote Retrieve", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate quote ID matches
        if data.get("id") != self.saved_quote_id:
            self.log_test("Quote Retrieve", False, f"Quote ID mismatch: expected {self.saved_quote_id}, got {data.get('id')}")
            return
        
        # Validate required fields are present
        required_fields = ["id", "inputs", "pricing", "status", "created_at"]
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            self.log_test("Quote Retrieve", False, f"Missing fields: {missing_fields}", data)
            return
        
        self.log_test("Quote Retrieve", True, f"Quote retrieved successfully, status: {data.get('status')}")
    
    def test_quote_accept(self):
        """Test POST /api/quote/{id}/accept"""
        print("🔍 Testing Quote Accept")
        
        if not self.saved_quote_id:
            self.log_test("Quote Accept", False, "No saved quote ID available")
            return
        
        success, data, status_code = self.make_request("POST", f"/api/quote/{self.saved_quote_id}/accept")
        
        if not success:
            self.log_test("Quote Accept", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Quote Accept", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate status changed to ACCEPTED
        if data.get("status") != "ACCEPTED":
            self.log_test("Quote Accept", False, f"Expected status ACCEPTED, got {data.get('status')}")
            return
        
        # Validate quote ID matches
        if data.get("id") != self.saved_quote_id:
            self.log_test("Quote Accept", False, f"Quote ID mismatch: expected {self.saved_quote_id}, got {data.get('id')}")
            return
        
        self.log_test("Quote Accept", True, f"Quote accepted successfully")
    
    def test_order_create(self):
        """Test POST /api/order/create"""
        print("🔍 Testing Order Create")
        
        if not self.saved_quote_id:
            self.log_test("Order Create", False, "No accepted quote ID available")
            return
        
        payload = {
            "quote_id": self.saved_quote_id
        }
        
        success, data, status_code = self.make_request("POST", "/api/order/create", payload)
        
        if not success:
            self.log_test("Order Create", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Order Create", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate order ID
        order_id = data.get("id")
        if not order_id:
            self.log_test("Order Create", False, "No order ID returned", data)
            return
        
        # Validate UUID format
        try:
            uuid.UUID(order_id)
        except ValueError:
            self.log_test("Order Create", False, f"Invalid UUID format: {order_id}")
            return
        
        # Store for later test
        self.saved_order_id = order_id
        
        # Validate payment status
        if data.get("payment_status") != "PENDING":
            self.log_test("Order Create", False, f"Expected payment_status PENDING, got {data.get('payment_status')}")
            return
        
        # Validate quote ID reference
        if data.get("quote_id") != self.saved_quote_id:
            self.log_test("Order Create", False, f"Quote ID mismatch: expected {self.saved_quote_id}, got {data.get('quote_id')}")
            return
        
        # Validate tracking history
        tracking = data.get("tracking", [])
        if not tracking or len(tracking) == 0:
            self.log_test("Order Create", False, "No tracking history found", data)
            return
        
        first_entry = tracking[0]
        if first_entry.get("status") != "RECEIVED":
            self.log_test("Order Create", False, f"Expected first tracking status RECEIVED, got {first_entry.get('status')}")
            return
        
        self.log_test("Order Create", True, f"Order created with ID: {order_id}")
    
    def test_order_retrieve(self):
        """Test GET /api/order/{id}"""
        print("🔍 Testing Order Retrieve")
        
        if not self.saved_order_id:
            self.log_test("Order Retrieve", False, "No saved order ID available")
            return
        
        success, data, status_code = self.make_request("GET", f"/api/order/{self.saved_order_id}")
        
        if not success:
            self.log_test("Order Retrieve", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Order Retrieve", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate order ID matches
        if data.get("id") != self.saved_order_id:
            self.log_test("Order Retrieve", False, f"Order ID mismatch: expected {self.saved_order_id}, got {data.get('id')}")
            return
        
        # Validate required fields
        required_fields = ["id", "quote_id", "payment_status", "tracking", "created_at"]
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            self.log_test("Order Retrieve", False, f"Missing fields: {missing_fields}", data)
            return
        
        # Validate tracking history
        tracking = data.get("tracking", [])
        if not tracking:
            self.log_test("Order Retrieve", False, "No tracking history found")
            return
        
        self.log_test("Order Retrieve", True, f"Order retrieved successfully, tracking entries: {len(tracking)}")
    
    def test_edge_cases(self):
        """Test edge cases and validation"""
        print("🔍 Testing Edge Cases")
        
        # Test invalid layer count (3L should fail)
        print("   Testing invalid layer count (3L)...")
        payload = {
            "pcb": {
                "quantity": 10,
                "layers": 3,  # Invalid
                "thickness_mm": 1.6,
                "copper_oz": 1,
                "finish": "HASL",
                "solder_mask_color": "green",
                "silkscreen": "both",
                "min_track_space_mm": 0.15,
                "impedance_controlled": False,
                "e_test": True,
                "board_size_mm": {"w": 50, "h": 50}
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/calculate", payload)
        
        if success and status_code == 200:
            self.log_test("Edge Case - Invalid Layer Count", False, "Should have failed for 3 layers", data)
        else:
            self.log_test("Edge Case - Invalid Layer Count", True, f"Correctly rejected 3-layer PCB (status: {status_code})")
        
        # Test negative quantity
        print("   Testing negative quantity...")
        payload["pcb"]["layers"] = 2  # Fix layer count
        payload["pcb"]["quantity"] = -5  # Invalid
        
        success, data, status_code = self.make_request("POST", "/api/quote/calculate", payload)
        
        if success and status_code == 200:
            self.log_test("Edge Case - Negative Quantity", False, "Should have failed for negative quantity", data)
        else:
            self.log_test("Edge Case - Negative Quantity", True, f"Correctly rejected negative quantity (status: {status_code})")
        
        # Test missing required fields
        print("   Testing missing required fields...")
        incomplete_payload = {
            "pcb": {
                "quantity": 10,
                "layers": 2
                # Missing other required fields
            }
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/calculate", incomplete_payload)
        
        if success and status_code == 200:
            self.log_test("Edge Case - Missing Fields", False, "Should have failed for missing fields", data)
        else:
            self.log_test("Edge Case - Missing Fields", True, f"Correctly rejected incomplete data (status: {status_code})")
    
    def test_01005_premium(self):
        """Test 01005 component premium"""
        print("🔍 Testing 01005 Component Premium")
        
        # Test with 01005 components
        payload = {
            "pcb": {
                "quantity": 50,
                "layers": 4,
                "thickness_mm": 1.6,
                "copper_oz": 1,
                "finish": "ENIG",
                "solder_mask_color": "green",
                "silkscreen": "both",
                "min_track_space_mm": 0.15,
                "impedance_controlled": False,
                "e_test": True,
                "board_size_mm": {"w": 80, "h": 60}
            },
            "smt": {
                "assembly_required": True,
                "sides": "single",
                "component_count": 200,
                "unique_parts": 50,
                "bga_count": 0,
                "uses_01005": True,  # Should add 20% premium
                "stencil": "frameless",
                "inspection": ["AOI"],
                "sourcing": "turnkey"
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/calculate", payload)
        
        if not success:
            self.log_test("01005 Premium Test", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("01005 Premium Test", False, f"Expected 200, got {status_code}", data)
            return
        
        # Check for 01005 warning
        warnings = data.get("warnings", [])
        has_01005_warning = any("01005" in warning for warning in warnings)
        
        if not has_01005_warning:
            self.log_test("01005 Premium Test", False, "Missing 01005 components warning", warnings)
            return
        
        # Validate SMT cost is present and positive
        smt_cost = data.get("breakdown", {}).get("smt", 0)
        if smt_cost <= 0:
            self.log_test("01005 Premium Test", False, f"SMT cost should be positive, got {smt_cost}")
            return
        
        self.log_test("01005 Premium Test", True, f"01005 premium applied, SMT cost: {smt_cost} {data.get('currency')}")
    
    def test_advanced_pricing(self):
        """Test POST /api/quote/calculate-advanced"""
        print("🔍 Testing Advanced Pricing API")
        
        payload = {
            "pcb": {
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
                "board_size_mm": {"w": 100, "h": 80}
            },
            "smt": {
                "assembly_required": True,
                "sides": "single",
                "component_count": 50,
                "unique_parts": 20,
                "bga_count": 2,
                "uses_01005": False,
                "stencil": "frameless",
                "inspection": ["AOI"],
                "sourcing": "turnkey"
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/calculate-advanced", payload)
        
        if not success:
            self.log_test("Advanced Pricing API", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Advanced Pricing API", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate detailed_costs structure
        if "detailed_costs" not in data:
            self.log_test("Advanced Pricing API", False, "Missing detailed_costs field", data)
            return
        
        detailed_costs = data.get("detailed_costs", {})
        
        # Check PCB detailed costs
        if "pcb" not in detailed_costs:
            self.log_test("Advanced Pricing API", False, "Missing detailed_costs.pcb", detailed_costs)
            return
        
        pcb_details = detailed_costs["pcb"]
        required_pcb_fields = ["material", "labor", "overhead", "complexity_score"]
        missing_pcb = [f for f in required_pcb_fields if f not in pcb_details]
        
        if missing_pcb:
            self.log_test("Advanced Pricing API", False, f"Missing PCB detail fields: {missing_pcb}", pcb_details)
            return
        
        # Check SMT detailed costs
        if "smt" not in detailed_costs:
            self.log_test("Advanced Pricing API", False, "Missing detailed_costs.smt", detailed_costs)
            return
        
        smt_details = detailed_costs["smt"]
        required_smt_fields = ["material", "labor", "overhead"]
        missing_smt = [f for f in required_smt_fields if f not in smt_details]
        
        if missing_smt:
            self.log_test("Advanced Pricing API", False, f"Missing SMT detail fields: {missing_smt}", smt_details)
            return
        
        # Check pricing strategy
        if "pricing_strategy" not in data:
            self.log_test("Advanced Pricing API", False, "Missing pricing_strategy field", data)
            return
        
        # Check volume discount
        if "volume_discount" not in data:
            self.log_test("Advanced Pricing API", False, "Missing volume_discount field", data)
            return
        
        self.log_test("Advanced Pricing API", True, 
                     f"Detailed breakdown present: material, labor, overhead. Complexity: {pcb_details.get('complexity_score')}")
    
    def test_dfm_check(self):
        """Test POST /api/dfm/check"""
        print("🔍 Testing DFM Check API")
        
        # Test with problematic design
        payload = {
            "pcb": {
                "quantity": 50,
                "layers": 10,  # High layer count
                "thickness_mm": 1.6,
                "copper_oz": 2,
                "finish": "ENIG",
                "solder_mask_color": "green",
                "silkscreen": "both",
                "min_track_space_mm": 0.08,  # Tight tolerance
                "impedance_controlled": True,
                "e_test": True,
                "board_size_mm": {"w": 150, "h": 120}
            },
            "smt": {
                "assembly_required": True,
                "sides": "double",
                "component_count": 300,
                "unique_parts": 80,
                "bga_count": 5,
                "uses_01005": True,  # Problematic
                "stencil": "frameless",
                "inspection": ["AOI", "Xray"],
                "sourcing": "turnkey"
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/dfm/check", payload)
        
        if not success:
            self.log_test("DFM Check API", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("DFM Check API", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate required fields
        required_fields = ["dfm_score", "grade", "errors", "warnings", "manufacturability"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            self.log_test("DFM Check API", False, f"Missing fields: {missing_fields}", data)
            return
        
        # Validate dfm_score is a number
        dfm_score = data.get("dfm_score")
        if not isinstance(dfm_score, (int, float)) or dfm_score < 0 or dfm_score > 100:
            self.log_test("DFM Check API", False, f"Invalid dfm_score: {dfm_score}")
            return
        
        # Check for errors/warnings (should have some for problematic design)
        errors = data.get("errors", [])
        warnings = data.get("warnings", [])
        
        if len(errors) == 0 and len(warnings) == 0:
            self.log_test("DFM Check API", False, "Expected errors/warnings for problematic design (01005, 10L, tight tolerance)")
            return
        
        self.log_test("DFM Check API", True, 
                     f"DFM Score: {dfm_score}, Grade: {data.get('grade')}, Errors: {len(errors)}, Warnings: {len(warnings)}")
    
    def test_bom_analyze(self):
        """Test POST /api/bom/analyze"""
        print("🔍 Testing BOM Analysis API")
        
        payload = {
            "pcb": {
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
                "board_size_mm": {"w": 100, "h": 80}
            },
            "smt": {
                "assembly_required": True,
                "sides": "single",
                "component_count": 50,
                "unique_parts": 20,
                "bga_count": 2,
                "uses_01005": False,
                "stencil": "frameless",
                "inspection": ["AOI"],
                "sourcing": "turnkey"
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/bom/analyze", payload)
        
        if not success:
            self.log_test("BOM Analysis API", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("BOM Analysis API", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate required fields
        required_fields = ["component_breakdown", "cost_analysis", "availability", "risk_assessment"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            self.log_test("BOM Analysis API", False, f"Missing fields: {missing_fields}", data)
            return
        
        # Check component_breakdown
        component_breakdown = data.get("component_breakdown", {})
        if "resistors" not in component_breakdown or "capacitors" not in component_breakdown:
            self.log_test("BOM Analysis API", False, "Missing component breakdown details", component_breakdown)
            return
        
        # Check cost_analysis
        cost_analysis = data.get("cost_analysis", {})
        if "total_estimated_cost" not in cost_analysis:
            self.log_test("BOM Analysis API", False, "Missing total_estimated_cost", cost_analysis)
            return
        
        # Check availability
        availability = data.get("availability", {})
        if "overall_status" not in availability:
            self.log_test("BOM Analysis API", False, "Missing overall_status in availability", availability)
            return
        
        # Check risk_assessment
        risk_assessment = data.get("risk_assessment", {})
        if "risk_level" not in risk_assessment:
            self.log_test("BOM Analysis API", False, "Missing risk_level", risk_assessment)
            return
        
        self.log_test("BOM Analysis API", True, 
                     f"BOM Cost: {cost_analysis.get('total_estimated_cost')}, Risk: {risk_assessment.get('risk_level')}")
    
    def test_bom_optimize(self):
        """Test POST /api/bom/optimize"""
        print("🔍 Testing BOM Optimization API")
        
        payload = {
            "pcb": {
                "quantity": 50,
                "layers": 8,  # High layer count for optimization
                "thickness_mm": 1.6,
                "copper_oz": 1,
                "finish": "ImAg",  # Exotic finish
                "solder_mask_color": "green",
                "silkscreen": "both",
                "min_track_space_mm": 0.15,
                "impedance_controlled": False,
                "e_test": True,
                "board_size_mm": {"w": 100, "h": 80}
            },
            "smt": {
                "assembly_required": True,
                "sides": "single",
                "component_count": 200,
                "unique_parts": 60,  # High unique parts
                "bga_count": 4,
                "uses_01005": True,  # Should suggest optimization
                "stencil": "frameless",
                "inspection": ["AOI"],
                "sourcing": "turnkey"
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/bom/optimize", payload)
        
        if not success:
            self.log_test("BOM Optimization API", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("BOM Optimization API", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate required fields
        required_fields = ["optimization_suggestions", "total_potential_savings_percent", "priority_actions"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            self.log_test("BOM Optimization API", False, f"Missing fields: {missing_fields}", data)
            return
        
        # Check optimization_suggestions
        suggestions = data.get("optimization_suggestions", [])
        if len(suggestions) == 0:
            self.log_test("BOM Optimization API", False, "Expected optimization suggestions for 01005, high layers, exotic finish")
            return
        
        # Check potential_savings_percent
        savings = data.get("total_potential_savings_percent", 0)
        if not isinstance(savings, (int, float)):
            self.log_test("BOM Optimization API", False, f"Invalid savings format: {savings}")
            return
        
        # Check priority_actions
        priority_actions = data.get("priority_actions", [])
        if not isinstance(priority_actions, list):
            self.log_test("BOM Optimization API", False, "priority_actions should be a list")
            return
        
        self.log_test("BOM Optimization API", True, 
                     f"Suggestions: {len(suggestions)}, Potential Savings: {savings}%")
    
    def test_complete_analysis(self):
        """Test POST /api/quote/complete-analysis"""
        print("🔍 Testing Complete Analysis API")
        
        payload = {
            "pcb": {
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
                "board_size_mm": {"w": 100, "h": 80}
            },
            "smt": {
                "assembly_required": True,
                "sides": "single",
                "component_count": 50,
                "unique_parts": 20,
                "bga_count": 2,
                "uses_01005": False,
                "stencil": "frameless",
                "inspection": ["AOI"],
                "sourcing": "turnkey"
            },
            "lead_time": "standard"
        }
        
        success, data, status_code = self.make_request("POST", "/api/quote/complete-analysis", payload)
        
        if not success:
            self.log_test("Complete Analysis API", False, f"Request failed: {data}")
            return
        
        if status_code != 200:
            self.log_test("Complete Analysis API", False, f"Expected 200, got {status_code}", data)
            return
        
        # Validate all sections are present
        required_sections = ["pricing", "dfm", "bom_analysis", "optimization", "summary"]
        missing_sections = [s for s in required_sections if s not in data]
        
        if missing_sections:
            self.log_test("Complete Analysis API", False, f"Missing sections: {missing_sections}", data)
            return
        
        # Validate summary
        summary = data.get("summary", {})
        required_summary_fields = ["total_cost", "dfm_score", "dfm_grade", "potential_savings"]
        missing_summary = [f for f in required_summary_fields if f not in summary]
        
        if missing_summary:
            self.log_test("Complete Analysis API", False, f"Missing summary fields: {missing_summary}", summary)
            return
        
        # Validate pricing section
        pricing = data.get("pricing", {})
        if "detailed_costs" not in pricing:
            self.log_test("Complete Analysis API", False, "Missing detailed_costs in pricing", pricing)
            return
        
        # Validate DFM section
        dfm = data.get("dfm", {})
        if "dfm_score" not in dfm:
            self.log_test("Complete Analysis API", False, "Missing dfm_score in dfm", dfm)
            return
        
        # Validate BOM analysis section
        bom_analysis = data.get("bom_analysis", {})
        if bom_analysis is None:
            self.log_test("Complete Analysis API", False, "bom_analysis should not be None when assembly is required")
            return
        
        # Validate optimization section
        optimization = data.get("optimization", {})
        if optimization is None:
            self.log_test("Complete Analysis API", False, "optimization should not be None when assembly is required")
            return
        
        self.log_test("Complete Analysis API", True, 
                     f"Complete analysis: Cost={summary.get('total_cost')}, DFM={summary.get('dfm_score')}, Grade={summary.get('dfm_grade')}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("🚀 Starting Backend API Tests")
        print("=" * 60)
        
        # Test sequence - Original tests
        self.test_config_pricing()
        self.test_quote_calculate_scenario_a()
        self.test_quote_calculate_scenario_b()
        self.test_quote_calculate_scenario_c()
        self.test_quote_save()
        self.test_quote_retrieve()
        self.test_quote_accept()
        self.test_order_create()
        self.test_order_retrieve()
        self.test_edge_cases()
        self.test_01005_premium()
        
        # New advanced API tests
        print("\n" + "=" * 60)
        print("🔬 Testing Advanced APIs")
        print("=" * 60)
        self.test_advanced_pricing()
        self.test_dfm_check()
        self.test_bom_analyze()
        self.test_bom_optimize()
        self.test_complete_analysis()
        
        # Summary
        print("=" * 60)
        print("📊 Test Results Summary")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 Failed Tests:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   ❌ {result['test']}: {result['details']}")
        
        print("\n" + "=" * 60)
        return failed_tests == 0


def main():
    """Main test execution"""
    tester = BackendTester(BACKEND_URL)
    
    print(f"Testing backend at: {BACKEND_URL}")
    print(f"API Base URL: {BACKEND_URL}/api")
    print()
    
    success = tester.run_all_tests()
    
    if success:
        print("🎉 All tests passed!")
        sys.exit(0)
    else:
        print("💥 Some tests failed!")
        sys.exit(1)


if __name__ == "__main__":
    main()