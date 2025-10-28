"""Volume-based pricing strategy"""

from typing import Dict, Any
from ..base import PricingStrategy


class VolumeStrategy(PricingStrategy):
    """Volume-based pricing with reduced margins for bulk orders"""
    
    def get_strategy_name(self) -> str:
        return "Volume"
    
    def calculate(self, options: Dict[str, Any]) -> Dict[str, Any]:
        """Apply volume-based pricing strategy"""
        
        base_cost = options.get("base_cost", 0)
        quantity = options.get("quantity", 1)
        
        # Reduce margin for higher quantities
        if quantity >= 1000:
            margin_rate = 0.18  # 18% for 1000+
        elif quantity >= 500:
            margin_rate = 0.22  # 22% for 500+
        elif quantity >= 250:
            margin_rate = 0.25  # 25% for 250+
        elif quantity >= 100:
            margin_rate = 0.28  # 28% for 100+
        else:
            margin_rate = 0.30  # 30% for <100
        
        margin = base_cost * margin_rate
        final_price = base_cost + margin
        
        return {
            "strategy": self.get_strategy_name(),
            "base_cost": round(base_cost, 2),
            "quantity": quantity,
            "margin_rate": margin_rate,
            "margin_amount": round(margin, 2),
            "final_price": round(final_price, 2),
            "notes": f"Volume pricing: {int(margin_rate*100)}% margin for {quantity} units"
        }
