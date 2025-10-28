"""Standard pricing strategy"""

from typing import Dict, Any
from ..base import PricingStrategy


class StandardStrategy(PricingStrategy):
    """Standard pricing with normal margins"""
    
    def get_strategy_name(self) -> str:
        return "Standard"
    
    def calculate(self, options: Dict[str, Any]) -> Dict[str, Any]:
        """Apply standard pricing strategy"""
        
        base_cost = options.get("base_cost", 0)
        
        # Standard margin: 30%
        margin_rate = self.config.get("standard_margin", 0.30)
        margin = base_cost * margin_rate
        
        final_price = base_cost + margin
        
        return {
            "strategy": self.get_strategy_name(),
            "base_cost": round(base_cost, 2),
            "margin_rate": margin_rate,
            "margin_amount": round(margin, 2),
            "final_price": round(final_price, 2),
            "notes": "Standard pricing with 30% margin"
        }
