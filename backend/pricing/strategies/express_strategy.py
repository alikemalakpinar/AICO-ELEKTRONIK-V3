"""Express/Fast delivery pricing strategy"""

from typing import Dict, Any
from ..base import PricingStrategy


class ExpressStrategy(PricingStrategy):
    """Express pricing with premium for fast delivery"""
    
    def get_strategy_name(self) -> str:
        return "Express"
    
    def calculate(self, options: Dict[str, Any]) -> Dict[str, Any]:
        """Apply express pricing strategy"""
        
        base_cost = options.get("base_cost", 0)
        lead_time = options.get("lead_time", "standard")
        
        # Standard margin
        margin_rate = 0.30
        margin = base_cost * margin_rate
        
        # Express premium based on lead time
        if lead_time == "fast":
            express_premium_rate = 0.40  # 40% premium for fast
            express_premium = base_cost * express_premium_rate
            notes = "Express delivery: 3-5 business days with 40% premium"
        elif lead_time == "standard":
            express_premium_rate = 0.0
            express_premium = 0
            notes = "Standard delivery: 7-10 business days"
        else:  # economy
            # Economy discount
            express_premium_rate = -0.10  # 10% discount
            express_premium = base_cost * express_premium_rate
            notes = "Economy delivery: 12-15 business days with 10% discount"
        
        final_price = base_cost + margin + express_premium
        
        return {
            "strategy": self.get_strategy_name(),
            "base_cost": round(base_cost, 2),
            "margin_rate": margin_rate,
            "margin_amount": round(margin, 2),
            "express_premium_rate": express_premium_rate,
            "express_premium": round(express_premium, 2),
            "final_price": round(final_price, 2),
            "lead_time": lead_time,
            "notes": notes
        }
