"""Detailed cost calculation modules"""

from typing import Dict, Any, List
import math
from .base import CostComponent


class MaterialCostCalculator:
    """Calculate material costs with detailed breakdown"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.material_prices = config.get("material_prices", {})
    
    def calculate_pcb_material(self, 
                              area_cm2: float,
                              layers: int,
                              copper_oz: int,
                              quantity: int) -> CostComponent:
        """Calculate PCB raw material cost"""
        
        # Base substrate cost (FR4)
        substrate_per_cm2 = self.material_prices.get("fr4_per_cm2", 0.12)
        substrate_cost = area_cm2 * substrate_per_cm2 * quantity
        
        # Copper cost (based on layers and weight)
        copper_per_layer_cm2 = self.material_prices.get("copper_per_layer_cm2", 0.03)
        copper_factor = copper_oz  # 1oz or 2oz
        copper_cost = area_cm2 * layers * copper_per_layer_cm2 * copper_factor * quantity
        
        # Solder mask and silkscreen
        mask_per_cm2 = self.material_prices.get("solder_mask_per_cm2", 0.02)
        silkscreen_per_cm2 = self.material_prices.get("silkscreen_per_cm2", 0.01)
        coating_cost = (mask_per_cm2 + silkscreen_per_cm2) * area_cm2 * quantity
        
        total_material = substrate_cost + copper_cost + coating_cost
        
        breakdown = {
            "substrate": round(substrate_cost, 2),
            "copper": round(copper_cost, 2),
            "coating": round(coating_cost, 2)
        }
        
        return CostComponent("Material", total_material, "TRY", breakdown)
    
    def calculate_finish_material(self, 
                                 finish: str,
                                 area_cm2: float,
                                 quantity: int) -> CostComponent:
        """Calculate surface finish material cost"""
        
        finish_costs = {
            "HASL": 0.08,
            "ENIG": 0.25,
            "OSP": 0.05,
            "ImAg": 0.18,
            "ImSn": 0.15
        }
        
        cost_per_cm2 = finish_costs.get(finish, 0.08)
        total_cost = area_cm2 * cost_per_cm2 * quantity
        
        return CostComponent(f"Surface Finish ({finish})", total_cost, "TRY")
    
    def calculate_smt_material(self,
                              component_count: int,
                              uses_01005: bool) -> CostComponent:
        """Calculate SMT material costs (solder paste, flux, etc.)"""
        
        solder_per_component = self.material_prices.get("solder_per_component", 0.02)
        flux_per_component = self.material_prices.get("flux_per_component", 0.01)
        
        if uses_01005:
            solder_per_component *= 0.5  # Smaller components use less
            flux_per_component *= 0.5
        
        total_cost = (solder_per_component + flux_per_component) * component_count
        
        breakdown = {
            "solder_paste": round(solder_per_component * component_count, 2),
            "flux": round(flux_per_component * component_count, 2)
        }
        
        return CostComponent("SMT Materials", total_cost, "TRY", breakdown)


class LaborCostCalculator:
    """Calculate labor costs with detailed breakdown"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.labor_rates = config.get("labor_rates", {})
    
    def calculate_pcb_labor(self,
                           layers: int,
                           area_cm2: float,
                           complexity_score: float,
                           quantity: int) -> CostComponent:
        """Calculate PCB manufacturing labor cost"""
        
        # Base labor time per board (minutes)
        base_time_per_board = 5
        
        # Layer complexity factor
        layer_time_factor = 1 + (layers - 2) * 0.15
        
        # Size factor
        size_factor = 1 + (area_cm2 / 100) * 0.05
        
        # Complexity adjustment
        complexity_factor = 1 + complexity_score
        
        total_time_minutes = base_time_per_board * layer_time_factor * size_factor * complexity_factor * quantity
        
        # Setup time (independent of quantity)
        setup_time_minutes = 30 + (layers * 5)
        
        total_time_hours = (total_time_minutes + setup_time_minutes) / 60
        
        # Labor rate per hour
        hourly_rate = self.labor_rates.get("pcb_technician", 150)
        
        total_cost = total_time_hours * hourly_rate
        
        breakdown = {
            "total_hours": round(total_time_hours, 2),
            "hourly_rate": hourly_rate,
            "setup_time_hours": round(setup_time_minutes / 60, 2),
            "production_time_hours": round(total_time_minutes / 60, 2)
        }
        
        return CostComponent("PCB Labor", total_cost, "TRY", breakdown)
    
    def calculate_smt_labor(self,
                           component_count: int,
                           unique_parts: int,
                           sides: str,
                           bga_count: int) -> CostComponent:
        """Calculate SMT assembly labor cost"""
        
        # Programming time for pick-and-place
        programming_time = unique_parts * 2  # 2 minutes per unique part
        
        # Placement time
        placement_rate = 2000  # components per hour
        placement_time_hours = component_count / placement_rate
        
        # BGA placement (slower, more careful)
        bga_time_hours = bga_count * 0.05  # 3 minutes per BGA
        
        # Inspection time
        inspection_time_hours = (component_count / 500) * 0.5
        
        # Double sided adds setup
        side_factor = 1.8 if sides == "double" else 1.0
        
        total_hours = (programming_time / 60 + placement_time_hours + bga_time_hours + inspection_time_hours) * side_factor
        
        hourly_rate = self.labor_rates.get("smt_operator", 180)
        total_cost = total_hours * hourly_rate
        
        breakdown = {
            "total_hours": round(total_hours, 2),
            "hourly_rate": hourly_rate,
            "programming_hours": round(programming_time / 60, 2),
            "placement_hours": round(placement_time_hours, 2),
            "bga_hours": round(bga_time_hours, 2),
            "inspection_hours": round(inspection_time_hours, 2)
        }
        
        return CostComponent("SMT Labor", total_cost, "TRY", breakdown)


class OverheadCalculator:
    """Calculate overhead costs (energy, facilities, depreciation)"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.overhead_rates = config.get("overhead_rates", {})
    
    def calculate_overhead(self,
                          material_cost: float,
                          labor_cost: float,
                          production_hours: float) -> CostComponent:
        """Calculate total overhead"""
        
        # Energy cost (based on production hours)
        energy_per_hour = self.overhead_rates.get("energy_per_hour", 45)
        energy_cost = production_hours * energy_per_hour
        
        # Facility overhead (percentage of labor)
        facility_rate = self.overhead_rates.get("facility_rate", 0.25)
        facility_cost = labor_cost * facility_rate
        
        # Equipment depreciation (percentage of material + labor)
        depreciation_rate = self.overhead_rates.get("depreciation_rate", 0.15)
        depreciation_cost = (material_cost + labor_cost) * depreciation_rate
        
        # Quality control overhead
        qc_cost = self.overhead_rates.get("qc_base", 50)
        
        total_overhead = energy_cost + facility_cost + depreciation_cost + qc_cost
        
        breakdown = {
            "energy": round(energy_cost, 2),
            "facility": round(facility_cost, 2),
            "depreciation": round(depreciation_cost, 2),
            "quality_control": qc_cost
        }
        
        return CostComponent("Overhead", total_overhead, "TRY", breakdown)


class VolumeDiscountCalculator:
    """Calculate volume-based discounts"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.discount_tiers = config.get("volume_discounts", {})
    
    def calculate_discount(self, quantity: int, base_price: float) -> Dict[str, Any]:
        """Calculate volume discount"""
        
        # Default tiers if not in config
        tiers = self.discount_tiers or {
            "50": 0.0,
            "100": 0.05,
            "250": 0.10,
            "500": 0.15,
            "1000": 0.20,
            "2500": 0.25
        }
        
        # Find applicable discount
        discount_rate = 0.0
        applicable_tier = 0
        
        for tier_qty_str, rate in sorted(tiers.items(), key=lambda x: int(x[0])):
            tier_qty = int(tier_qty_str)
            if quantity >= tier_qty:
                discount_rate = rate
                applicable_tier = tier_qty
        
        discount_amount = base_price * discount_rate
        final_price = base_price - discount_amount
        
        return {
            "original_price": round(base_price, 2),
            "discount_rate": discount_rate,
            "discount_amount": round(discount_amount, 2),
            "final_price": round(final_price, 2),
            "tier": applicable_tier,
            "next_tier": self._get_next_tier(quantity, tiers),
            "savings_percentage": round(discount_rate * 100, 1)
        }
    
    def _get_next_tier(self, current_qty: int, tiers: Dict[str, float]) -> Dict[str, Any]:
        """Get information about next discount tier"""
        for tier_qty_str in sorted(tiers.keys(), key=lambda x: int(x)):
            tier_qty = int(tier_qty_str)
            if tier_qty > current_qty:
                return {
                    "quantity": tier_qty,
                    "discount_rate": tiers[tier_qty_str],
                    "additional_units_needed": tier_qty - current_qty
                }
        return None
