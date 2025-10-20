from typing import Dict, Any, List
import math


class PricingEngine:
    """Pricing calculation engine v0.1 for PCB manufacturing and assembly"""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize with pricing config from database"""
        self.config = config
        self.pcb_config = config.get("pcb", {})
        self.smt_config = config.get("smt", {})
        self.shipping_config = config.get("shipping", {})
        self.currency = config.get("currency", "TRY")
    
    def calculate_pcb_price(
        self,
        quantity: int,
        layers: int,
        width_mm: float,
        height_mm: float,
        copper_oz: int,
        finish: str,
        min_track_space_mm: float,
        impedance_controlled: bool,
        e_test: bool,
        lead_time: str,
        panelization: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Calculate PCB manufacturing price"""
        
        warnings = []
        
        # Calculate board area in cm²
        area_cm2 = (width_mm * height_mm) / 100.0
        
        # Setup fee
        setup_fee = self.pcb_config.get("setupFee", 250)
        
        # Base price per cm²
        base_per_cm2 = self.pcb_config.get("basePerCm2", 0.18)
        
        # Layer factor
        layer_factors = self.pcb_config.get("layerFactor", {})
        layer_factor = layer_factors.get(str(layers), 1.0)
        
        # Finish factor
        finish_factors = self.pcb_config.get("finishFactor", {})
        finish_factor = finish_factors.get(finish, 1.0)
        
        # Copper factor
        copper_factors = self.pcb_config.get("copperFactor", {})
        copper_factor = copper_factors.get(str(copper_oz), 1.0)
        
        # Base PCB cost
        base_cost = area_cm2 * base_per_cm2 * layer_factor * finish_factor * copper_factor * quantity
        
        # Tight tolerance check (≤0.10mm)
        tight_tolerance_factor = 1.0
        if min_track_space_mm <= 0.10:
            tight_tolerance_factor = self.pcb_config.get("tightToleranceFactor", 1.15)
            warnings.append(f"Tight tolerance applied (≤0.10mm): +{int((tight_tolerance_factor-1)*100)}% premium")
        
        base_cost *= tight_tolerance_factor
        
        # Impedance control
        impedance_cost = 0
        if impedance_controlled:
            impedance_config = self.pcb_config.get("impedance", {})
            impedance_flat = impedance_config.get("flat", 200)
            impedance_factor = impedance_config.get("factor", 1.10)
            impedance_cost = impedance_flat
            base_cost *= impedance_factor
            warnings.append(f"Impedance control: +{impedance_flat} {self.currency} flat + {int((impedance_factor-1)*100)}% multiplier")
        
        # E-test
        etest_cost = 0
        if e_test:
            etest_per_cm2 = self.pcb_config.get("etestPerCm2PerBoard", 0.05)
            etest_cost = etest_per_cm2 * area_cm2 * quantity
        
        # Lead time factor
        leadtime_factors = self.pcb_config.get("leadTimeFactor", {})
        leadtime_factor = leadtime_factors.get(lead_time, 1.0)
        
        # Panel efficiency (if array mode)
        panel_info = ""
        if panelization and panelization.get("mode") == "array":
            nxm = panelization.get("nxm", {})
            n = nxm.get("n", 1)
            m = nxm.get("m", 1)
            waste_rate = self.pcb_config.get("wasteRate", 0.08)
            panel_yield = n * m * (1 - waste_rate)
            panel_info = f"Panel: {n}×{m} array, ~{panel_yield:.1f} boards per panel"
            warnings.append(panel_info)
        
        # Total PCB price
        subtotal = setup_fee + base_cost + impedance_cost + etest_cost
        total_pcb = subtotal * leadtime_factor
        
        return {
            "subtotal": round(total_pcb, 2),
            "breakdown": {
                "setup_fee": setup_fee,
                "base_cost": round(base_cost, 2),
                "impedance_cost": impedance_cost,
                "etest_cost": round(etest_cost, 2),
                "leadtime_factor": leadtime_factor
            },
            "warnings": warnings
        }
    
    def calculate_smt_price(
        self,
        sides: str,
        component_count: int,
        unique_parts: int,
        bga_count: int,
        uses_01005: bool,
        stencil: str,
        inspection: List[str],
        lead_time: str
    ) -> Dict[str, Any]:
        """Calculate SMT/assembly price"""
        
        warnings = []
        
        # Setup fee (single or double sided)
        if sides == "double":
            setup_fee = self.smt_config.get("setupFeeDouble", 550)
        else:
            setup_fee = self.smt_config.get("setupFeeSingle", 350)
        
        # Placement cost
        placement_per_comp = self.smt_config.get("placementPerComponent", 0.22)
        placement_cost = component_count * placement_per_comp
        
        # Unique parts fee
        unique_fee_per = self.smt_config.get("uniquePartFee", 0.8)
        unique_cost = unique_parts * unique_fee_per
        
        # BGA premium
        bga_premium_per = self.smt_config.get("bgaPremiumPerUnit", 0.6)
        bga_cost = bga_count * bga_premium_per
        if bga_count > 0:
            warnings.append(f"BGA components: {bga_count} units")
        
        # Stencil cost
        stencil_costs = self.smt_config.get("stencil", {})
        stencil_cost = stencil_costs.get(stencil, 0) if stencil != "none" else 0
        
        # AOI cost
        aoi_cost = 0
        if "AOI" in inspection:
            aoi_per_comp = self.smt_config.get("aoiPerComponent", 0.03)
            aoi_cost = component_count * aoi_per_comp
        
        # X-ray cost
        xray_cost = 0
        if "Xray" in inspection and bga_count > 0:
            xray_per_bga = self.smt_config.get("xrayPerBga", 0.35)
            xray_cost = bga_count * xray_per_bga
        
        # 01005 factor
        uses_01005_factor = 1.0
        if uses_01005:
            uses_01005_factor = self.smt_config.get("uses01005Factor", 1.2)
            warnings.append(f"01005 components: +{int((uses_01005_factor-1)*100)}% premium")
        
        # Subtotal before lead time
        subtotal = (
            setup_fee + 
            placement_cost + 
            unique_cost + 
            bga_cost + 
            stencil_cost + 
            aoi_cost + 
            xray_cost
        ) * uses_01005_factor
        
        # Lead time factor
        leadtime_factors = self.smt_config.get("leadTimeFactor", {})
        leadtime_factor = leadtime_factors.get(lead_time, 1.0)
        
        total_smt = subtotal * leadtime_factor
        
        return {
            "subtotal": round(total_smt, 2),
            "breakdown": {
                "setup_fee": setup_fee,
                "placement_cost": round(placement_cost, 2),
                "unique_cost": round(unique_cost, 2),
                "bga_cost": round(bga_cost, 2),
                "stencil_cost": stencil_cost,
                "aoi_cost": round(aoi_cost, 2),
                "xray_cost": round(xray_cost, 2),
                "uses_01005_factor": uses_01005_factor,
                "leadtime_factor": leadtime_factor
            },
            "warnings": warnings
        }
    
    def calculate_shipping(self, weight_kg: float = 0) -> float:
        """Calculate shipping cost (currently flat rate or free)"""
        flat = self.shipping_config.get("flat", 0)
        per_kg = self.shipping_config.get("perKg", 0)
        return flat + (weight_kg * per_kg)
    
    def calculate_quote(
        self,
        pcb_options: Dict[str, Any],
        smt_options: Dict[str, Any] = None,
        lead_time: str = "standard"
    ) -> Dict[str, Any]:
        """
        Calculate complete quote with PCB + SMT pricing
        
        Args:
            pcb_options: PCB manufacturing options
            smt_options: SMT/assembly options (optional)
            lead_time: "fast", "standard", or "economy"
        
        Returns:
            Complete pricing breakdown with warnings
        """
        
        all_warnings = []
        
        # Calculate PCB price
        board_size = pcb_options.get("board_size_mm", {})
        panelization = pcb_options.get("panelization")
        
        pcb_result = self.calculate_pcb_price(
            quantity=pcb_options.get("quantity"),
            layers=pcb_options.get("layers"),
            width_mm=board_size.get("w"),
            height_mm=board_size.get("h"),
            copper_oz=pcb_options.get("copper_oz", 1),
            finish=pcb_options.get("finish"),
            min_track_space_mm=pcb_options.get("min_track_space_mm"),
            impedance_controlled=pcb_options.get("impedance_controlled", False),
            e_test=pcb_options.get("e_test", True),
            lead_time=lead_time,
            panelization=panelization
        )
        
        pcb_price = pcb_result["subtotal"]
        all_warnings.extend(pcb_result["warnings"])
        
        # Calculate SMT price (if required)
        smt_price = 0
        smt_breakdown = {}
        
        if smt_options and smt_options.get("assembly_required"):
            smt_result = self.calculate_smt_price(
                sides=smt_options.get("sides", "single"),
                component_count=smt_options.get("component_count", 0),
                unique_parts=smt_options.get("unique_parts", 0),
                bga_count=smt_options.get("bga_count", 0),
                uses_01005=smt_options.get("uses_01005", False),
                stencil=smt_options.get("stencil", "frameless"),
                inspection=smt_options.get("inspection", []),
                lead_time=lead_time
            )
            
            smt_price = smt_result["subtotal"]
            smt_breakdown = smt_result["breakdown"]
            all_warnings.extend(smt_result["warnings"])
        
        # Calculate shipping
        shipping_price = self.calculate_shipping()
        
        # Grand total
        grand_total = pcb_price + smt_price + shipping_price
        
        return {
            "currency": self.currency,
            "breakdown": {
                "pcb": pcb_price,
                "smt": smt_price,
                "shipping": shipping_price
            },
            "total": round(grand_total, 2),
            "warnings": all_warnings,
            "details": {
                "pcb_breakdown": pcb_result["breakdown"],
                "smt_breakdown": smt_breakdown
            }
        }
