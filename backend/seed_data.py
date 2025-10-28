"""
Seed data for Config collection
This file contains the default pricing configuration v0.1
"""

PRICING_CONFIG_V0_1 = {
    "key": "pricing.v0_1",
    "enabled": True,
    "data": {
        "pcb": {
            "setupFee": 250,
            "basePerCm2": 0.18,
            "layerFactor": {
                "2": 1.0,
                "4": 1.6,
                "6": 2.2,
                "8": 3.0,
                "10": 3.6
            },
            "finishFactor": {
                "HASL": 1.0,
                "ENIG": 1.25,
                "OSP": 0.95
            },
            "copperFactor": {
                "1": 1.0,
                "2": 1.3
            },
            "tightToleranceFactor": 1.15,
            "impedance": {
                "enabled": True,
                "flat": 200,
                "factor": 1.10
            },
            "etestPerCm2PerBoard": 0.05,
            "leadTimeFactor": {
                "fast": 1.4,
                "standard": 1.0,
                "economy": 0.9
            },
            "wasteRate": 0.08
        },
        "smt": {
            "setupFeeSingle": 350,
            "setupFeeDouble": 550,
            "placementPerComponent": 0.22,
            "uniquePartFee": 0.8,
            "bgaPremiumPerUnit": 0.6,
            "stencil": {
                "frameless": 450,
                "framed": 700
            },
            "aoiPerComponent": 0.03,
            "xrayPerBga": 0.35,
            "uses01005Factor": 1.2,
            "leadTimeFactor": {
                "fast": 1.25,
                "standard": 1.0,
                "economy": 0.95
            }
        },
        "shipping": {
            "flat": 0,
            "perKg": 0
        },
        "currency": "TRY",
        
        # Advanced pricing configurations
        "material_prices": {
            "fr4_per_cm2": 0.12,
            "copper_per_layer_cm2": 0.03,
            "solder_mask_per_cm2": 0.02,
            "silkscreen_per_cm2": 0.01,
            "solder_per_component": 0.02,
            "flux_per_component": 0.01
        },
        "labor_rates": {
            "pcb_technician": 150,
            "smt_operator": 180
        },
        "overhead_rates": {
            "energy_per_hour": 45,
            "facility_rate": 0.25,
            "depreciation_rate": 0.15,
            "qc_base": 50
        },
        "volume_discounts": {
            "50": 0.0,
            "100": 0.05,
            "250": 0.10,
            "500": 0.15,
            "1000": 0.20,
            "2500": 0.25
        },
        "standard_margin": 0.30
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
        print(f"✅ Seeded pricing config: {PRICING_CONFIG_V0_1['key']}")
    else:
        print(f"⏭️  Pricing config already exists: {PRICING_CONFIG_V0_1['key']}")
