"""
Seed data for Config collection
This file contains the default pricing configuration v0.1
Updated pricing structure with competitive market rates
"""

PRICING_CONFIG_V0_1 = {
    "key": "pricing.v0_1",
    "enabled": True,
    "data": {
        "pcb": {
            "setupFee": 450,  # Market-adjusted setup fee
            "basePerCm2": 0.18,
            "layerFactor": {
                "2": 1.0,
                "4": 1.6,
                "6": 2.2,
                "8": 3.0,
                "10": 3.8  # Increased multiplier for 10-layer
            },
            "finishFactor": {
                "HASL": 1.0,
                "ENIG": 1.30,  # Updated for gold plating costs
                "OSP": 0.95
            },
            "copperFactor": {
                "1": 1.0,
                "2": 1.35
            },
            "tightToleranceFactor": 1.20,
            "impedance": {
                "enabled": True,
                "flat": 350,  # Impedance control requires extra engineering
                "factor": 1.10
            },
            "etestPerCm2PerBoard": 0.05,
            "leadTimeFactor": {
                "fast": 1.5,  # Increased rush premium
                "standard": 1.0,
                "economy": 0.95
            },
            "wasteRate": 0.10
        },
        "smt": {
            # Project setup fees aligned with market
            "setupFeeSingle": 1000,
            "setupFeeDouble": 1500,
            # Per-component pricing (volume discounts apply for high quantities)
            "placementPerComponent": 0.25,
            "uniquePartFee": 1.0,  # Feeder loading cost
            # BGA assembly requires X-ray, increased cost
            "bgaPremiumPerUnit": 30.0,
            "stencil": {
                "frameless": 750,  # Prototype stencil (realistic cost)
                "framed": 2500  # Steel-framed stencil (market standard)
            },
            "aoiPerComponent": 0.04,
            "xrayPerBga": 5.0,  # For non-BGA X-ray requests
            "uses01005Factor": 1.25,  # Difficult assembly multiplier
            "leadTimeFactor": {
                "fast": 1.30,
                "standard": 1.0,
                "economy": 0.95
            }
        },
        "shipping": {
            "flat": 150,  # Base shipping cost
            "perKg": 25
        },
        "currency": "TRY",

        # Advanced pricing and cost analysis
        "material_prices": {
            "fr4_per_cm2": 0.12,
            "copper_per_layer_cm2": 0.03,
            "solder_mask_per_cm2": 0.02,
            "silkscreen_per_cm2": 0.01,
            "solder_per_component": 0.03,  # Updated solder cost
            "flux_per_component": 0.015
        },
        "labor_rates": {
            "pcb_technician": 250,  # Hourly rate (TR market)
            "smt_operator": 300
        },
        "overhead_rates": {
            "energy_per_hour": 60,  # Increased energy costs
            "facility_rate": 0.30,
            "depreciation_rate": 0.15,
            "qc_base": 100
        },
        # Aggressive discounts for volume production competitiveness
        "volume_discounts": {
            "50": 0.0,
            "100": 0.10,  # 10% discount
            "250": 0.15,
            "500": 0.25,
            "1000": 0.40,  # 40% discount (unit price ~0.15 TRY)
            "5000": 0.60  # 60% discount (unit price ~0.10 TRY - market competitive)
        },
        "standard_margin": 0.35  # Profit margin
    }
}


async def seed_config(db):
    """Seed the Config collection with default pricing data"""

    # Check if pricing config already exists
    existing = await db.config.find_one({"key": "pricing.v0_1"})

    if not existing:
        from datetime import datetime, timezone
        import uuid

        config_doc = {
            "id": str(uuid.uuid4()),
            "key": PRICING_CONFIG_V0_1["key"],
            "enabled": PRICING_CONFIG_V0_1["enabled"],
            "data": PRICING_CONFIG_V0_1["data"],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }

        await db.config.insert_one(config_doc)
        print(f"Seeded pricing config: {PRICING_CONFIG_V0_1['key']}")
    else:
        # Update existing config with new pricing
        from datetime import datetime, timezone
        await db.config.update_one(
            {"key": "pricing.v0_1"},
            {
                "$set": {
                    "data": PRICING_CONFIG_V0_1["data"],
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        print(f"Updated pricing config: {PRICING_CONFIG_V0_1['key']}")
