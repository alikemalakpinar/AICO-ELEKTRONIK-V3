"""Advanced Pricing Engine with detailed cost breakdown"""

from typing import Dict, Any, List, Optional
import math
from .base import PricingStrategy, CostComponent
from .cost_calculators import (
    MaterialCostCalculator,
    LaborCostCalculator,
    OverheadCalculator,
    VolumeDiscountCalculator
)
from .strategies import StandardStrategy, VolumeStrategy, ExpressStrategy


class AdvancedPricingEngine:
    """
    Advanced pricing engine with:
    - Detailed cost breakdown (material, labor, overhead)
    - Multiple pricing strategies
    - Volume discounts
    - Complexity scoring
    """
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize with pricing config from database"""
        self.config = config
        self.currency = config.get("currency", "TRY")
        
        # Initialize calculators
        self.material_calc = MaterialCostCalculator(config)
        self.labor_calc = LaborCostCalculator(config)
        self.overhead_calc = OverheadCalculator(config)
        self.volume_calc = VolumeDiscountCalculator(config)
        
        # Initialize strategies
        self.strategies = {
            "standard": StandardStrategy(config),
            "volume": VolumeStrategy(config),
            "express": ExpressStrategy(config)
        }
    
    def calculate_complexity_score(self, pcb_options: Dict[str, Any]) -> float:
        """Calculate PCB complexity score (0.0 to 1.0)"""
        score = 0.0
        
        # Layer complexity
        layers = pcb_options.get("layers", 2)
        if layers > 6:
            score += 0.3
        elif layers > 4:
            score += 0.2
        elif layers > 2:
            score += 0.1
        
        # Track/space complexity
        min_track = pcb_options.get("min_track_space_mm", 0.15)
        if min_track <= 0.10:
            score += 0.3
        elif min_track <= 0.127:
            score += 0.2
        elif min_track <= 0.15:
            score += 0.1
        
        # Impedance control
        if pcb_options.get("impedance_controlled", False):
            score += 0.2
        
        # Copper weight
        copper_oz = pcb_options.get("copper_oz", 1)
        if copper_oz >= 2:
            score += 0.1
        
        # Advanced finish
        finish = pcb_options.get("finish", "HASL")
        if finish in ["ENIG", "ImAg", "ImSn"]:
            score += 0.1
        
        return min(score, 1.0)
    
    def calculate_pcb_costs(self, pcb_options: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate detailed PCB manufacturing costs"""
        
        # Extract parameters
        quantity = pcb_options.get("quantity", 1)
        layers = pcb_options.get("layers", 2)
        board_size = pcb_options.get("board_size_mm", {})
        width_mm = board_size.get("w", 100)
        height_mm = board_size.get("h", 80)
        area_cm2 = (width_mm * height_mm) / 100.0
        copper_oz = pcb_options.get("copper_oz", 1)
        finish = pcb_options.get("finish", "HASL")
        
        # Calculate complexity
        complexity_score = self.calculate_complexity_score(pcb_options)
        
        # Material costs
        pcb_material = self.material_calc.calculate_pcb_material(
            area_cm2=area_cm2,
            layers=layers,
            copper_oz=copper_oz,
            quantity=quantity
        )
        
        finish_material = self.material_calc.calculate_finish_material(
            finish=finish,
            area_cm2=area_cm2,
            quantity=quantity
        )
        
        total_material = pcb_material.amount + finish_material.amount
        
        # Labor costs
        labor = self.labor_calc.calculate_pcb_labor(
            layers=layers,
            area_cm2=area_cm2,
            complexity_score=complexity_score,
            quantity=quantity
        )
        
        # Overhead costs
        production_hours = labor.breakdown.get("total_hours", 1)
        overhead = self.overhead_calc.calculate_overhead(
            material_cost=total_material,
            labor_cost=labor.amount,
            production_hours=production_hours
        )
        
        # Additional costs (E-test, impedance, etc.)
        additional_costs = self._calculate_pcb_additional_costs(pcb_options, area_cm2, quantity)
        
        # Total base cost
        base_cost = total_material + labor.amount + overhead.amount + additional_costs["total"]
        
        return {
            "base_cost": round(base_cost, 2),
            "material": pcb_material.to_dict(),
            "finish": finish_material.to_dict(),
            "labor": labor.to_dict(),
            "overhead": overhead.to_dict(),
            "additional": additional_costs,
            "complexity_score": round(complexity_score, 2),
            "area_cm2": round(area_cm2, 2),
            "cost_per_unit": round(base_cost / quantity, 2)
        }
    
    def _calculate_pcb_additional_costs(self, 
                                       pcb_options: Dict[str, Any],
                                       area_cm2: float,
                                       quantity: int) -> Dict[str, Any]:
        """Calculate additional PCB costs (impedance, e-test, panelization)"""
        
        costs = {}
        total = 0
        
        # Impedance control
        if pcb_options.get("impedance_controlled", False):
            impedance_flat = self.config.get("pcb", {}).get("impedance", {}).get("flat", 200)
            costs["impedance_control"] = impedance_flat
            total += impedance_flat
        
        # E-Test
        if pcb_options.get("e_test", True):
            etest_per_cm2 = self.config.get("pcb", {}).get("etestPerCm2PerBoard", 0.05)
            etest_cost = etest_per_cm2 * area_cm2 * quantity
            costs["e_test"] = round(etest_cost, 2)
            total += etest_cost
        
        # Panelization
        panelization = pcb_options.get("panelization")
        if panelization and panelization.get("mode") == "array":
            nxm = panelization.get("nxm", {})
            n = nxm.get("n", 1)
            m = nxm.get("m", 1)
            panel_setup = 100  # Base panelization setup
            costs["panelization"] = panel_setup
            costs["panel_info"] = f"{n}×{m} array"
            total += panel_setup
        
        costs["total"] = round(total, 2)
        return costs
    
    def calculate_smt_costs(self, smt_options: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate detailed SMT assembly costs"""
        
        if not smt_options or not smt_options.get("assembly_required", False):
            return {
                "base_cost": 0,
                "material": None,
                "labor": None,
                "overhead": None,
                "additional": {"total": 0}
            }
        
        # Extract parameters
        component_count = smt_options.get("component_count", 0)
        unique_parts = smt_options.get("unique_parts", 0)
        sides = smt_options.get("sides", "single")
        bga_count = smt_options.get("bga_count", 0)
        uses_01005 = smt_options.get("uses_01005", False)
        
        # Material costs
        smt_material = self.material_calc.calculate_smt_material(
            component_count=component_count,
            uses_01005=uses_01005
        )
        
        # Labor costs
        labor = self.labor_calc.calculate_smt_labor(
            component_count=component_count,
            unique_parts=unique_parts,
            sides=sides,
            bga_count=bga_count
        )
        
        # Overhead
        production_hours = labor.breakdown.get("total_hours", 1)
        overhead = self.overhead_calc.calculate_overhead(
            material_cost=smt_material.amount,
            labor_cost=labor.amount,
            production_hours=production_hours
        )
        
        # Additional costs (stencil, inspection)
        additional_costs = self._calculate_smt_additional_costs(smt_options, component_count, bga_count)
        
        # Setup fee
        setup_fee = 350 if sides == "single" else 550
        additional_costs["setup_fee"] = setup_fee
        additional_costs["total"] += setup_fee
        
        # Total base cost
        base_cost = smt_material.amount + labor.amount + overhead.amount + additional_costs["total"]
        
        return {
            "base_cost": round(base_cost, 2),
            "material": smt_material.to_dict(),
            "labor": labor.to_dict(),
            "overhead": overhead.to_dict(),
            "additional": additional_costs
        }
    
    def _calculate_smt_additional_costs(self,
                                       smt_options: Dict[str, Any],
                                       component_count: int,
                                       bga_count: int) -> Dict[str, Any]:
        """Calculate additional SMT costs (stencil, AOI, X-ray)"""
        
        costs = {}
        total = 0
        
        # Stencil
        stencil = smt_options.get("stencil", "frameless")
        stencil_costs = self.config.get("smt", {}).get("stencil", {})
        if stencil != "none":
            stencil_cost = stencil_costs.get(stencil, 150)
            costs["stencil"] = stencil_cost
            total += stencil_cost
        
        # AOI inspection
        inspection = smt_options.get("inspection", [])
        if "AOI" in inspection:
            aoi_per_comp = self.config.get("smt", {}).get("aoiPerComponent", 0.03)
            aoi_cost = component_count * aoi_per_comp
            costs["aoi_inspection"] = round(aoi_cost, 2)
            total += aoi_cost
        
        # X-ray inspection
        if "Xray" in inspection and bga_count > 0:
            xray_per_bga = self.config.get("smt", {}).get("xrayPerBga", 0.35)
            xray_cost = bga_count * xray_per_bga
            costs["xray_inspection"] = round(xray_cost, 2)
            total += xray_cost
        
        costs["total"] = round(total, 2)
        return costs
    
    def apply_pricing_strategy(self,
                               base_cost: float,
                               quantity: int,
                               lead_time: str = "standard") -> Dict[str, Any]:
        """Apply pricing strategy based on quantity and lead time"""
        
        # Choose strategy
        if quantity >= 100:
            strategy = self.strategies["volume"]
            strategy_result = strategy.calculate({
                "base_cost": base_cost,
                "quantity": quantity
            })
        else:
            strategy = self.strategies["standard"]
            strategy_result = strategy.calculate({
                "base_cost": base_cost
            })
        
        # Apply lead time adjustments using express strategy
        express_strategy = self.strategies["express"]
        express_result = express_strategy.calculate({
            "base_cost": strategy_result["final_price"],
            "lead_time": lead_time
        })
        
        return {
            "margin_strategy": strategy_result,
            "leadtime_adjustment": express_result,
            "final_price": express_result["final_price"]
        }
    
    def calculate_quote(self,
                       pcb_options: Dict[str, Any],
                       smt_options: Dict[str, Any] = None,
                       lead_time: str = "standard") -> Dict[str, Any]:
        """
        Calculate complete quote with advanced pricing
        
        Returns:
            Complete pricing breakdown with detailed cost analysis
        """
        
        warnings = []
        
        # Calculate PCB costs
        pcb_costs = self.calculate_pcb_costs(pcb_options)
        
        # Calculate SMT costs
        smt_costs = self.calculate_smt_costs(smt_options or {})
        
        # Total base cost before margin
        total_base_cost = pcb_costs["base_cost"] + smt_costs["base_cost"]
        
        # Apply pricing strategy
        quantity = pcb_options.get("quantity", 1)
        pricing_strategy = self.apply_pricing_strategy(
            base_cost=total_base_cost,
            quantity=quantity,
            lead_time=lead_time
        )
        
        # Calculate volume discounts
        volume_discount = self.volume_calc.calculate_discount(
            quantity=quantity,
            base_price=pricing_strategy["final_price"]
        )
        
        # Shipping
        shipping_cost = self.config.get("shipping", {}).get("flat", 0)
        
        # Grand total
        grand_total = volume_discount["final_price"] + shipping_cost
        
        # Generate warnings
        if pcb_costs["complexity_score"] > 0.7:
            warnings.append(f"High complexity PCB (score: {pcb_costs['complexity_score']}) - extended lead time may apply")
        
        if pcb_options.get("impedance_controlled"):
            warnings.append("Impedance control requires additional testing and documentation")
        
        if pcb_options.get("min_track_space_mm", 0.15) <= 0.10:
            warnings.append("Fine pitch traces (≤0.10mm) - advanced manufacturing capability")
        
        if smt_options and smt_options.get("bga_count", 0) > 0:
            warnings.append(f"BGA components: {smt_options['bga_count']} units - requires X-ray inspection")
        
        if volume_discount["next_tier"]:
            next_tier = volume_discount["next_tier"]
            warnings.append(
                f"Order {next_tier['additional_units_needed']} more units to reach "
                f"{next_tier['quantity']} tier and save {int(next_tier['discount_rate']*100)}%"
            )
        
        return {
            "currency": self.currency,
            "summary": {
                "total": round(grand_total, 2),
                "base_cost": round(total_base_cost, 2),
                "with_margin": round(pricing_strategy["final_price"], 2),
                "after_discount": round(volume_discount["final_price"], 2),
                "shipping": shipping_cost,
                "savings": round(volume_discount["discount_amount"], 2)
            },
            "breakdown": {
                "pcb": round(pcb_costs["base_cost"], 2),
                "smt": round(smt_costs["base_cost"], 2),
                "shipping": shipping_cost
            },
            "detailed_costs": {
                "pcb": pcb_costs,
                "smt": smt_costs
            },
            "pricing_strategy": pricing_strategy,
            "volume_discount": volume_discount,
            "warnings": warnings,
            "quantity": quantity,
            "lead_time": lead_time
        }
