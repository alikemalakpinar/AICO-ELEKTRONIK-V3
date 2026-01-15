"""
Advanced Pricing Engine v2.0 for PCB manufacturing and assembly.
Features:
- Pydantic type-safe models
- Realistic panel calculations with edge rails and kerf
- Minimum order values
- Edge case handling
- Detailed cost breakdowns
"""

from typing import Dict, Any, List, Optional, Tuple
from models.schemas import (
    PCBOptions, SMTOptions, QuoteRequest, QuoteResponse,
    PCBBreakdown, SMTBreakdown, PanelInfo, QuoteSummary,
    PricingConfig, PCBPricingConfig, SMTPricingConfig, ShippingConfig,
    LeadTime, SurfaceFinish, StencilType, AssemblySide
)
from datetime import datetime, timedelta
import uuid
import math


class PricingEngine:
    """
    Advanced pricing calculation engine for PCB manufacturing and assembly.
    Supports type-safe configuration and comprehensive cost breakdowns.
    """

    def __init__(self, config: Optional[PricingConfig] = None):
        """Initialize with pricing configuration"""
        self.config = config or PricingConfig()
        self.currency = self.config.currency

    def calculate_panel_details(
        self,
        board_width_mm: float,
        board_height_mm: float,
        quantity: int,
        panelization: Optional[Dict[str, Any]] = None
    ) -> Tuple[PanelInfo, int, float]:
        """
        Calculate realistic panelization with edge rails and kerf width.

        Returns:
            Tuple of (PanelInfo, effective_quantity, panel_efficiency)
        """
        pcb_config = self.config.pcb

        if not panelization or panelization.get("mode") == "none":
            # Single board, no panelization
            return None, quantity, 1.0

        # Panel configuration
        nxm = panelization.get("nxm", {"n": 2, "m": 2})
        n = nxm.get("n", 2)
        m = nxm.get("m", 2)

        # Edge rails (top, bottom, left, right)
        rail_width = panelization.get("rail_width_mm", 5.0)
        # Kerf width for v-cut or routing between boards
        kerf_width = panelization.get("kerf_width_mm", 2.0)

        # Calculate actual panel dimensions
        # Panel = rails + (n * board_width) + ((n-1) * kerf)
        panel_width = (2 * rail_width) + (n * board_width_mm) + ((n - 1) * kerf_width)
        panel_height = (2 * rail_width) + (m * board_height_mm) + ((m - 1) * kerf_width)

        # Boards per panel
        boards_per_panel = n * m

        # How many panels needed
        panel_count = math.ceil(quantity / boards_per_panel)

        # Total boards (may be more than requested due to panel rounding)
        total_boards = panel_count * boards_per_panel

        # Calculate utilization
        useful_area = (board_width_mm * board_height_mm * boards_per_panel)
        total_panel_area = panel_width * panel_height
        utilization = (useful_area / total_panel_area) * 100

        # Waste area
        waste_area_cm2 = ((total_panel_area - useful_area) * panel_count) / 100

        panel_info = PanelInfo(
            mode=panelization.get("mode", "array"),
            boards_per_panel=boards_per_panel,
            panel_count=panel_count,
            total_boards=total_boards,
            panel_size_mm={"width": panel_width, "height": panel_height},
            utilization_percent=round(utilization, 1),
            waste_area_cm2=round(waste_area_cm2, 2)
        )

        return panel_info, total_boards, utilization / 100

    def calculate_pcb_price(self, pcb_options: PCBOptions, lead_time: LeadTime) -> Dict[str, Any]:
        """
        Calculate PCB manufacturing price with comprehensive edge case handling.
        """
        pcb_config = self.config.pcb
        warnings = []

        # Board dimensions
        width_mm = pcb_options.board_size_mm.w
        height_mm = pcb_options.board_size_mm.h
        area_cm2 = pcb_options.board_size_mm.area_cm2
        quantity = pcb_options.quantity

        # ======================================
        # EDGE CASE: Very small boards
        # ======================================
        MIN_BOARD_AREA_CM2 = 1.0  # 10x10mm
        if area_cm2 < MIN_BOARD_AREA_CM2:
            warnings.append(
                f"Very small board ({width_mm}x{height_mm}mm). "
                f"Minimum production charge may apply."
            )
            # Use minimum area for pricing
            effective_area = MIN_BOARD_AREA_CM2
        else:
            effective_area = area_cm2

        # ======================================
        # EDGE CASE: Very large boards
        # ======================================
        MAX_STANDARD_WIDTH = 450  # mm
        MAX_STANDARD_HEIGHT = 350  # mm
        if width_mm > MAX_STANDARD_WIDTH or height_mm > MAX_STANDARD_HEIGHT:
            warnings.append(
                f"Large board size ({width_mm}x{height_mm}mm). "
                f"Additional tooling charges may apply."
            )

        # ======================================
        # Panelization calculation
        # ======================================
        panel_info = None
        effective_quantity = quantity

        if pcb_options.panelization:
            panel_data = pcb_options.panelization.model_dump() if hasattr(pcb_options.panelization, 'model_dump') else pcb_options.panelization
            panel_info, effective_quantity, utilization = self.calculate_panel_details(
                width_mm, height_mm, quantity, panel_data
            )
            if panel_info:
                warnings.append(
                    f"Panel: {panel_info.boards_per_panel} boards/panel, "
                    f"{panel_info.panel_count} panels, "
                    f"{panel_info.utilization_percent}% utilization"
                )
                # Apply waste rate to effective area
                effective_area *= (1 + pcb_config.waste_rate)

        # ======================================
        # Base pricing
        # ======================================
        setup_fee = pcb_config.setup_fee
        base_per_cm2 = pcb_config.base_per_cm2

        # Layer factor
        layer_key = str(pcb_options.layers)
        layer_factor = pcb_config.layer_factors.get(layer_key, 1.0)

        # ======================================
        # EDGE CASE: High layer count
        # ======================================
        if pcb_options.layers >= 8:
            warnings.append(
                f"High layer count ({pcb_options.layers} layers). "
                f"Extended lead time may be required."
            )

        # Finish factor
        finish_key = pcb_options.finish.value if hasattr(pcb_options.finish, 'value') else pcb_options.finish
        finish_factor = pcb_config.finish_factors.get(finish_key, 1.0)

        # Copper factor
        copper_key = str(pcb_options.copper_oz)
        copper_factor = pcb_config.copper_factors.get(copper_key, 1.0)

        # Base cost calculation
        base_cost = effective_area * base_per_cm2 * layer_factor * finish_factor * copper_factor * effective_quantity

        # ======================================
        # Tight tolerance handling (≤0.10mm)
        # ======================================
        tight_tolerance_applied = False
        if pcb_options.min_track_space_mm <= 0.10:
            base_cost *= pcb_config.tight_tolerance_factor
            tight_tolerance_applied = True
            warnings.append(
                f"Tight tolerance applied (≤0.10mm track/space): "
                f"+{int((pcb_config.tight_tolerance_factor - 1) * 100)}% premium"
            )

        # ======================================
        # EDGE CASE: Ultra-fine pitch
        # ======================================
        if pcb_options.min_track_space_mm <= 0.075:
            ultra_fine_factor = 1.25
            base_cost *= ultra_fine_factor
            warnings.append(
                f"Ultra-fine pitch (≤0.075mm): Additional +25% premium"
            )

        # ======================================
        # Impedance control
        # ======================================
        impedance_cost = 0.0
        if pcb_options.impedance_controlled:
            impedance_cost = pcb_config.impedance_flat_fee
            base_cost *= pcb_config.impedance_factor
            warnings.append(
                f"Impedance control: +{pcb_config.impedance_flat_fee} {self.currency} flat "
                f"+ {int((pcb_config.impedance_factor - 1) * 100)}% multiplier"
            )

        # ======================================
        # E-test
        # ======================================
        etest_cost = 0.0
        if pcb_options.e_test:
            etest_cost = pcb_config.etest_per_cm2_per_board * effective_area * effective_quantity

        # ======================================
        # Lead time factor
        # ======================================
        lead_time_key = lead_time.value if hasattr(lead_time, 'value') else lead_time
        leadtime_factor = pcb_config.lead_time_factors.get(lead_time_key, 1.0)

        # ======================================
        # Subtotal
        # ======================================
        subtotal = setup_fee + base_cost + impedance_cost + etest_cost
        total_pcb = subtotal * leadtime_factor

        # ======================================
        # EDGE CASE: Minimum order value
        # ======================================
        if total_pcb < pcb_config.minimum_order_value:
            old_total = total_pcb
            total_pcb = pcb_config.minimum_order_value
            warnings.append(
                f"Minimum order value applied: {pcb_config.minimum_order_value} {self.currency} "
                f"(calculated: {old_total:.2f})"
            )

        # Unit price
        unit_price = total_pcb / effective_quantity

        breakdown = PCBBreakdown(
            setup_fee=setup_fee,
            base_cost=round(base_cost, 2),
            impedance_cost=impedance_cost,
            etest_cost=round(etest_cost, 2),
            leadtime_factor=leadtime_factor,
            tight_tolerance_applied=tight_tolerance_applied,
            area_cm2=round(effective_area, 2),
            unit_price=round(unit_price, 2)
        )

        return {
            "subtotal": round(total_pcb, 2),
            "breakdown": breakdown.model_dump(),
            "warnings": warnings,
            "panel_info": panel_info.model_dump() if panel_info else None
        }

    def calculate_smt_price(self, smt_options: SMTOptions, lead_time: LeadTime) -> Dict[str, Any]:
        """
        Calculate SMT/Assembly price with edge case handling.
        """
        if not smt_options or not smt_options.assembly_required:
            return {"subtotal": 0, "breakdown": {}, "warnings": []}

        smt_config = self.config.smt
        warnings = []

        # ======================================
        # Setup fee (single vs double sided)
        # ======================================
        sides_value = smt_options.sides.value if hasattr(smt_options.sides, 'value') else smt_options.sides
        if sides_value == "double":
            setup_fee = smt_config.setup_fee_double
        else:
            setup_fee = smt_config.setup_fee_single

        # ======================================
        # Placement cost
        # ======================================
        placement_cost = smt_options.component_count * smt_config.placement_per_component

        # ======================================
        # EDGE CASE: High component count
        # ======================================
        if smt_options.component_count > 500:
            # Volume discount for high component count
            volume_discount = 0.95
            placement_cost *= volume_discount
            warnings.append(
                f"Volume discount applied for {smt_options.component_count} components"
            )

        # ======================================
        # Unique parts fee
        # ======================================
        unique_cost = smt_options.unique_parts * smt_config.unique_part_fee

        # ======================================
        # BGA handling
        # ======================================
        bga_cost = smt_options.bga_count * smt_config.bga_premium_per_unit
        if smt_options.bga_count > 0:
            warnings.append(f"BGA components detected: {smt_options.bga_count} units")

            # EDGE CASE: Many BGAs
            if smt_options.bga_count > 5:
                warnings.append(
                    "Multiple BGA packages may require extended reflow profiling"
                )

        # ======================================
        # Stencil cost
        # ======================================
        stencil_key = smt_options.stencil.value if hasattr(smt_options.stencil, 'value') else smt_options.stencil
        stencil_cost = smt_config.stencil_costs.get(stencil_key, 0)

        # ======================================
        # AOI inspection
        # ======================================
        aoi_cost = 0.0
        if "AOI" in smt_options.inspection:
            aoi_cost = smt_options.component_count * smt_config.aoi_per_component

        # ======================================
        # X-ray inspection (only if BGAs present)
        # ======================================
        xray_cost = 0.0
        if "Xray" in smt_options.inspection and smt_options.bga_count > 0:
            xray_cost = smt_options.bga_count * smt_config.xray_per_bga

        # ======================================
        # 01005 components factor
        # ======================================
        uses_01005_factor = 1.0
        if smt_options.uses_01005:
            uses_01005_factor = smt_config.uses_01005_factor
            warnings.append(
                f"01005 components: +{int((uses_01005_factor - 1) * 100)}% premium"
            )

        # ======================================
        # Calculate subtotal
        # ======================================
        subtotal = (
            setup_fee +
            placement_cost +
            unique_cost +
            bga_cost +
            stencil_cost +
            aoi_cost +
            xray_cost
        ) * uses_01005_factor

        # ======================================
        # Lead time factor
        # ======================================
        lead_time_key = lead_time.value if hasattr(lead_time, 'value') else lead_time
        leadtime_factor = smt_config.lead_time_factors.get(lead_time_key, 1.0)

        total_smt = subtotal * leadtime_factor

        breakdown = SMTBreakdown(
            setup_fee=setup_fee,
            placement_cost=round(placement_cost, 2),
            unique_cost=round(unique_cost, 2),
            bga_cost=round(bga_cost, 2),
            stencil_cost=stencil_cost,
            aoi_cost=round(aoi_cost, 2),
            xray_cost=round(xray_cost, 2),
            uses_01005_factor=uses_01005_factor,
            leadtime_factor=leadtime_factor
        )

        return {
            "subtotal": round(total_smt, 2),
            "breakdown": breakdown.model_dump(),
            "warnings": warnings
        }

    def calculate_shipping(self, subtotal: float, weight_kg: float = 0.5) -> float:
        """
        Calculate shipping cost with free shipping threshold.
        """
        shipping_config = self.config.shipping

        # Free shipping for orders above threshold
        if subtotal >= shipping_config.free_shipping_threshold:
            return 0.0

        return shipping_config.flat_rate + (weight_kg * shipping_config.per_kg)

    def calculate_quote(self, request: QuoteRequest) -> QuoteResponse:
        """
        Calculate complete quote with PCB + SMT + Shipping.
        Returns typed QuoteResponse.
        """
        all_warnings = []

        # Calculate PCB price
        pcb_result = self.calculate_pcb_price(request.pcb, request.lead_time)
        pcb_price = pcb_result["subtotal"]
        all_warnings.extend(pcb_result["warnings"])

        # Calculate SMT price
        smt_price = 0.0
        smt_breakdown = {}
        if request.smt and request.smt.assembly_required:
            smt_result = self.calculate_smt_price(request.smt, request.lead_time)
            smt_price = smt_result["subtotal"]
            smt_breakdown = smt_result["breakdown"]
            all_warnings.extend(smt_result["warnings"])

        # Calculate subtotal for shipping calculation
        subtotal = pcb_price + smt_price

        # Calculate shipping
        shipping_price = self.calculate_shipping(subtotal)
        if shipping_price == 0 and subtotal >= self.config.shipping.free_shipping_threshold:
            all_warnings.append(
                f"Free shipping applied (order ≥{self.config.shipping.free_shipping_threshold} {self.currency})"
            )

        # Grand total
        grand_total = subtotal + shipping_price

        # Unit price
        unit_price = grand_total / request.pcb.quantity

        # Generate quote ID
        quote_id = f"Q{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"

        # Quote validity (7 days)
        valid_until = datetime.utcnow() + timedelta(days=7)

        # Summary
        summary = QuoteSummary(
            total=round(grand_total, 2),
            unit_price=round(unit_price, 2)
        )

        return QuoteResponse(
            currency=self.currency,
            breakdown={
                "pcb": pcb_price,
                "smt": smt_price,
                "shipping": shipping_price
            },
            total=round(grand_total, 2),
            warnings=all_warnings,
            details={
                "pcb_breakdown": pcb_result["breakdown"],
                "smt_breakdown": smt_breakdown
            },
            summary=summary,
            panel_info=PanelInfo(**pcb_result["panel_info"]) if pcb_result.get("panel_info") else None,
            quote_id=quote_id,
            valid_until=valid_until
        )


# =====================================================
# LEGACY SUPPORT - Dict-based interface
# =====================================================

def calculate_quote_legacy(
    pcb_options: Dict[str, Any],
    smt_options: Optional[Dict[str, Any]] = None,
    lead_time: str = "standard",
    config: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Legacy dict-based interface for backward compatibility.
    """
    # Convert config
    pricing_config = None
    if config:
        pricing_config = PricingConfig(
            pcb=PCBPricingConfig(**config.get("pcb", {})),
            smt=SMTPricingConfig(**config.get("smt", {})),
            shipping=ShippingConfig(**config.get("shipping", {})),
            currency=config.get("currency", "TRY")
        )

    engine = PricingEngine(pricing_config)

    # Build PCB options
    board_size = pcb_options.get("board_size_mm", {})
    from models.schemas import BoardSize, PCBOptions

    pcb = PCBOptions(
        quantity=pcb_options.get("quantity", 1),
        layers=pcb_options.get("layers", 2),
        thickness_mm=pcb_options.get("thickness_mm", 1.6),
        copper_oz=pcb_options.get("copper_oz", 1),
        finish=pcb_options.get("finish", "HASL"),
        min_track_space_mm=pcb_options.get("min_track_space_mm", 0.15),
        impedance_controlled=pcb_options.get("impedance_controlled", False),
        e_test=pcb_options.get("e_test", True),
        board_size_mm=BoardSize(
            w=board_size.get("w", 100),
            h=board_size.get("h", 100)
        ),
        panelization=pcb_options.get("panelization")
    )

    # Build SMT options
    smt = None
    if smt_options and smt_options.get("assembly_required"):
        smt = SMTOptions(
            assembly_required=True,
            sides=smt_options.get("sides", "single"),
            component_count=smt_options.get("component_count", 0),
            unique_parts=smt_options.get("unique_parts", 0),
            bga_count=smt_options.get("bga_count", 0),
            uses_01005=smt_options.get("uses_01005", False),
            stencil=smt_options.get("stencil", "frameless"),
            inspection=smt_options.get("inspection", []),
            sourcing=smt_options.get("sourcing", "turnkey")
        )

    # Build request
    request = QuoteRequest(
        pcb=pcb,
        smt=smt,
        lead_time=lead_time
    )

    # Calculate
    response = engine.calculate_quote(request)

    # Return as dict for legacy compatibility
    return response.model_dump()
