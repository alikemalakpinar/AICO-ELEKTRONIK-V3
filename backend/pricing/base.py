"""Base classes for pricing strategies"""

from abc import ABC, abstractmethod
from typing import Dict, Any


class PricingStrategy(ABC):
    """Abstract base class for pricing strategies"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
    
    @abstractmethod
    def calculate(self, options: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate price based on strategy"""
        pass
    
    @abstractmethod
    def get_strategy_name(self) -> str:
        """Return strategy name"""
        pass


class CostComponent:
    """Represents a cost component in pricing"""
    
    def __init__(self, name: str, amount: float, unit: str = "TRY", breakdown: Dict = None):
        self.name = name
        self.amount = amount
        self.unit = unit
        self.breakdown = breakdown or {}
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "amount": round(self.amount, 2),
            "unit": self.unit,
            "breakdown": self.breakdown
        }
