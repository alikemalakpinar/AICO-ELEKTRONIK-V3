"""
AI-Powered BOM Optimizer

Intelligent component analysis and optimization with:
1. Alternative component suggestions
2. Cost optimization recommendations
3. Supply chain risk assessment
4. Cross-reference database integration (Mouser, DigiKey, LCSC simulation)
"""

from typing import Dict, Any, List, Optional
from dataclasses import dataclass, field
from datetime import datetime, timedelta
import re
import random  # For demo - replace with real API calls


@dataclass
class Component:
    """Represents a BOM component"""
    mpn: str  # Manufacturer Part Number
    manufacturer: str
    description: str
    quantity: int
    reference_designators: List[str] = field(default_factory=list)
    package: str = ""
    value: str = ""
    unit_price: float = 0.0
    stock_status: str = "unknown"
    lead_time_days: int = 0
    alternatives: List[Dict] = field(default_factory=list)
    risk_level: str = "low"


@dataclass
class ComponentAlternative:
    """Alternative component suggestion"""
    mpn: str
    manufacturer: str
    description: str
    unit_price: float
    stock_quantity: int
    compatibility_score: float  # 0-100
    savings_percent: float
    source: str  # mouser, digikey, lcsc
    notes: str = ""


class SupplierAPI:
    """Simulated supplier API integration"""

    # Simulated component database with alternatives
    COMPONENT_DB = {
        # STM32 MCU family
        "STM32F103": {
            "category": "mcu",
            "base_price": 3.50,
            "alternatives": [
                {"mpn": "GD32F103", "manufacturer": "GigaDevice", "price": 2.10, "compat": 95, "notes": "Pin-compatible clone"},
                {"mpn": "CH32F103", "manufacturer": "WCH", "price": 1.80, "compat": 90, "notes": "Chinese alternative"},
                {"mpn": "AT32F403", "manufacturer": "Artery", "price": 2.50, "compat": 85, "notes": "Higher performance"},
            ]
        },
        "STM32F4": {
            "category": "mcu",
            "base_price": 8.00,
            "alternatives": [
                {"mpn": "GD32F4", "manufacturer": "GigaDevice", "price": 5.50, "compat": 92, "notes": "Pin-compatible"},
                {"mpn": "AT32F435", "manufacturer": "Artery", "price": 6.00, "compat": 88, "notes": "Comparable specs"},
            ]
        },
        # Common passives
        "10K": {
            "category": "resistor",
            "base_price": 0.01,
            "alternatives": [
                {"mpn": "RC0603JR-0710KL", "manufacturer": "Yageo", "price": 0.008, "compat": 100, "notes": "Standard 10K 0603"},
                {"mpn": "ERJ-3EKF1002V", "manufacturer": "Panasonic", "price": 0.015, "compat": 100, "notes": "Higher precision"},
            ]
        },
        "100nF": {
            "category": "capacitor",
            "base_price": 0.02,
            "alternatives": [
                {"mpn": "CC0603KRX7R9BB104", "manufacturer": "Yageo", "price": 0.015, "compat": 100, "notes": "X7R ceramic"},
                {"mpn": "GRM188R71H104KA93D", "manufacturer": "Murata", "price": 0.025, "compat": 100, "notes": "Premium quality"},
            ]
        },
        # Power regulators
        "LM7805": {
            "category": "voltage_regulator",
            "base_price": 0.50,
            "alternatives": [
                {"mpn": "AMS1117-5.0", "manufacturer": "AMS", "price": 0.25, "compat": 85, "notes": "LDO, lower dropout"},
                {"mpn": "L7805CV", "manufacturer": "STM", "price": 0.45, "compat": 100, "notes": "Original design"},
                {"mpn": "MC7805CDTG", "manufacturer": "ON Semi", "price": 0.40, "compat": 100, "notes": "D2PAK package"},
            ]
        },
    }

    @classmethod
    def search_component(cls, mpn: str, manufacturer: str = "") -> Dict[str, Any]:
        """Search for component in supplier databases"""
        # Simulate API call delay
        # In production, use real Mouser/DigiKey APIs

        # Try exact match first
        for key, data in cls.COMPONENT_DB.items():
            if key.lower() in mpn.lower():
                return {
                    "found": True,
                    "category": data["category"],
                    "base_price": data["base_price"],
                    "alternatives": data["alternatives"],
                    "stock_status": random.choice(["in_stock", "low_stock", "out_of_stock"]),
                    "stock_quantity": random.randint(0, 10000),
                    "lead_time_days": random.randint(1, 30),
                }

        # Component not in database - generate generic response
        return {
            "found": False,
            "category": "unknown",
            "base_price": random.uniform(0.1, 10.0),
            "alternatives": [],
            "stock_status": "unknown",
            "stock_quantity": 0,
            "lead_time_days": 0,
        }

    @classmethod
    def check_stock_multiple_sources(cls, mpn: str) -> Dict[str, Any]:
        """Check stock across multiple sources"""
        sources = ["mouser", "digikey", "lcsc", "arrow", "tme"]

        results = {}
        for source in sources:
            results[source] = {
                "in_stock": random.choice([True, True, True, False]),  # 75% chance in stock
                "quantity": random.randint(0, 5000),
                "unit_price": random.uniform(0.5, 15.0),
                "lead_time_days": random.randint(1, 45),
            }

        return results


class AIBOMOptimizer:
    """AI-Powered BOM Optimization Engine"""

    def __init__(self):
        self.supplier_api = SupplierAPI()

    def parse_bom(self, bom_data: List[Dict]) -> List[Component]:
        """Parse BOM data into Component objects"""
        components = []

        for row in bom_data:
            component = Component(
                mpn=row.get("mpn", row.get("part_number", "")),
                manufacturer=row.get("manufacturer", ""),
                description=row.get("description", ""),
                quantity=int(row.get("quantity", row.get("qty", 1))),
                reference_designators=row.get("references", "").split(",") if row.get("references") else [],
                package=row.get("package", row.get("footprint", "")),
                value=row.get("value", ""),
            )
            components.append(component)

        return components

    def analyze_component(self, component: Component) -> Dict[str, Any]:
        """Deep analysis of a single component"""
        # Search supplier databases
        search_result = SupplierAPI.search_component(component.mpn, component.manufacturer)
        multi_source = SupplierAPI.check_stock_multiple_sources(component.mpn)

        # Determine risk level
        risk_level = self._assess_risk(search_result, multi_source)

        # Find alternatives
        alternatives = self._find_alternatives(component, search_result)

        # Calculate potential savings
        savings = self._calculate_savings(component, alternatives)

        return {
            "mpn": component.mpn,
            "manufacturer": component.manufacturer,
            "quantity": component.quantity,
            "category": search_result.get("category", "unknown"),
            "unit_price": search_result.get("base_price", 0),
            "total_price": search_result.get("base_price", 0) * component.quantity,
            "stock_status": search_result.get("stock_status", "unknown"),
            "stock_sources": multi_source,
            "risk_level": risk_level,
            "risk_factors": self._get_risk_factors(risk_level, search_result, multi_source),
            "alternatives": alternatives,
            "potential_savings": savings,
            "recommendation": self._generate_recommendation(component, risk_level, alternatives, savings),
        }

    def _assess_risk(self, search_result: Dict, multi_source: Dict) -> str:
        """Assess supply chain risk for component"""
        in_stock_count = sum(1 for s in multi_source.values() if s.get("in_stock"))
        total_quantity = sum(s.get("quantity", 0) for s in multi_source.values())

        if search_result.get("stock_status") == "out_of_stock" and in_stock_count < 2:
            return "critical"
        elif in_stock_count < 3 or total_quantity < 1000:
            return "high"
        elif in_stock_count < 4:
            return "medium"
        return "low"

    def _get_risk_factors(self, risk_level: str, search_result: Dict, multi_source: Dict) -> List[str]:
        """Get specific risk factors"""
        factors = []

        if search_result.get("stock_status") == "out_of_stock":
            factors.append("Primary source out of stock")
        if search_result.get("lead_time_days", 0) > 14:
            factors.append(f"Long lead time: {search_result.get('lead_time_days')} days")

        in_stock_count = sum(1 for s in multi_source.values() if s.get("in_stock"))
        if in_stock_count < 3:
            factors.append("Limited availability across suppliers")

        if not search_result.get("found"):
            factors.append("Component not found in database")

        return factors

    def _find_alternatives(self, component: Component, search_result: Dict) -> List[Dict]:
        """Find alternative components"""
        alternatives = []

        for alt in search_result.get("alternatives", []):
            alternatives.append({
                "mpn": alt["mpn"],
                "manufacturer": alt["manufacturer"],
                "unit_price": alt["price"],
                "compatibility_score": alt["compat"],
                "savings_percent": round(
                    (search_result.get("base_price", 0) - alt["price"]) /
                    max(search_result.get("base_price", 1), 0.01) * 100, 1
                ) if search_result.get("base_price", 0) > 0 else 0,
                "notes": alt["notes"],
                "stock_status": random.choice(["in_stock", "in_stock", "low_stock"]),
                "source": random.choice(["mouser", "digikey", "lcsc"]),
            })

        # Sort by savings
        alternatives.sort(key=lambda x: x["savings_percent"], reverse=True)
        return alternatives

    def _calculate_savings(self, component: Component, alternatives: List[Dict]) -> Dict[str, Any]:
        """Calculate potential savings from using alternatives"""
        if not alternatives:
            return {"total": 0, "per_unit": 0, "best_alternative": None}

        best = max(alternatives, key=lambda x: x["savings_percent"])
        original_price = component.unit_price or 0
        alt_price = best["unit_price"]

        per_unit_savings = original_price - alt_price
        total_savings = per_unit_savings * component.quantity

        return {
            "total": round(max(0, total_savings), 2),
            "per_unit": round(max(0, per_unit_savings), 4),
            "percent": round(best["savings_percent"], 1),
            "best_alternative": best["mpn"],
        }

    def _generate_recommendation(
        self,
        component: Component,
        risk_level: str,
        alternatives: List[Dict],
        savings: Dict
    ) -> Dict[str, Any]:
        """Generate AI recommendation for component"""
        if risk_level == "critical":
            if alternatives:
                return {
                    "action": "replace",
                    "urgency": "high",
                    "message": f"CRITICAL: {component.mpn} is unavailable. Consider {alternatives[0]['mpn']} as replacement.",
                    "alternative": alternatives[0] if alternatives else None,
                }
            return {
                "action": "manual_review",
                "urgency": "high",
                "message": f"CRITICAL: {component.mpn} unavailable and no alternatives found. Manual review required.",
                "alternative": None,
            }

        if risk_level == "high":
            return {
                "action": "consider_alternative",
                "urgency": "medium",
                "message": f"Supply risk detected for {component.mpn}. Consider stocking up or using alternative.",
                "alternative": alternatives[0] if alternatives else None,
            }

        if savings.get("percent", 0) > 20 and alternatives:
            best_alt = alternatives[0]
            return {
                "action": "cost_optimization",
                "urgency": "low",
                "message": f"Save {savings['percent']}% by switching to {best_alt['mpn']}. Compatibility: {best_alt['compatibility_score']}%",
                "alternative": best_alt,
            }

        return {
            "action": "approved",
            "urgency": "none",
            "message": "Component approved. Good availability and pricing.",
            "alternative": None,
        }

    def optimize_bom(self, bom_data: List[Dict]) -> Dict[str, Any]:
        """Full BOM optimization analysis"""
        components = self.parse_bom(bom_data)
        analysis_results = []
        total_original_cost = 0
        total_optimized_cost = 0
        critical_items = []
        high_risk_items = []
        optimization_opportunities = []

        for component in components:
            result = self.analyze_component(component)
            analysis_results.append(result)

            # Track costs
            original_cost = result["total_price"]
            total_original_cost += original_cost

            # Calculate optimized cost
            if result["alternatives"]:
                best_alt = result["alternatives"][0]
                optimized_cost = best_alt["unit_price"] * component.quantity
            else:
                optimized_cost = original_cost
            total_optimized_cost += optimized_cost

            # Categorize by risk
            if result["risk_level"] == "critical":
                critical_items.append(result)
            elif result["risk_level"] == "high":
                high_risk_items.append(result)

            # Track optimization opportunities
            if result["potential_savings"]["percent"] > 15:
                optimization_opportunities.append({
                    "component": component.mpn,
                    "savings_percent": result["potential_savings"]["percent"],
                    "total_savings": result["potential_savings"]["total"],
                    "recommendation": result["recommendation"],
                })

        # Calculate summary
        total_savings = total_original_cost - total_optimized_cost
        savings_percent = (total_savings / max(total_original_cost, 0.01)) * 100

        return {
            "summary": {
                "total_components": len(components),
                "total_unique_parts": len(set(c.mpn for c in components)),
                "original_cost": round(total_original_cost, 2),
                "optimized_cost": round(total_optimized_cost, 2),
                "potential_savings": round(total_savings, 2),
                "savings_percent": round(savings_percent, 1),
                "critical_items": len(critical_items),
                "high_risk_items": len(high_risk_items),
                "optimization_opportunities": len(optimization_opportunities),
            },
            "risk_assessment": {
                "overall_risk": self._calculate_overall_risk(critical_items, high_risk_items, len(components)),
                "critical_components": critical_items[:5],  # Top 5 critical
                "high_risk_components": high_risk_items[:5],  # Top 5 high risk
            },
            "optimization_recommendations": optimization_opportunities[:10],  # Top 10 opportunities
            "component_analysis": analysis_results,
            "action_items": self._generate_action_items(critical_items, high_risk_items, optimization_opportunities),
            "generated_at": datetime.now().isoformat(),
        }

    def _calculate_overall_risk(self, critical: List, high: List, total: int) -> str:
        """Calculate overall BOM risk level"""
        if len(critical) > 0:
            return "critical"
        if len(high) > total * 0.1:  # More than 10% high risk
            return "high"
        if len(high) > 0:
            return "medium"
        return "low"

    def _generate_action_items(
        self,
        critical: List,
        high_risk: List,
        opportunities: List
    ) -> List[Dict]:
        """Generate prioritized action items"""
        actions = []

        # Critical items first
        for item in critical[:3]:
            actions.append({
                "priority": 1,
                "type": "critical_shortage",
                "component": item["mpn"],
                "action": "Find alternative immediately",
                "impact": "Production blocking",
            })

        # High risk items
        for item in high_risk[:3]:
            actions.append({
                "priority": 2,
                "type": "supply_risk",
                "component": item["mpn"],
                "action": "Secure additional inventory or approve alternative",
                "impact": "Potential delay",
            })

        # Cost optimization
        for opp in opportunities[:5]:
            actions.append({
                "priority": 3,
                "type": "cost_optimization",
                "component": opp["component"],
                "action": f"Switch to alternative - save {opp['savings_percent']}%",
                "impact": f"${opp['total_savings']:.2f} savings",
            })

        return actions


# Singleton instance
ai_optimizer = AIBOMOptimizer()


def optimize_bom(bom_data: List[Dict]) -> Dict[str, Any]:
    """Convenience function for BOM optimization"""
    return ai_optimizer.optimize_bom(bom_data)


def analyze_component(mpn: str, manufacturer: str = "", quantity: int = 1) -> Dict[str, Any]:
    """Analyze single component"""
    component = Component(
        mpn=mpn,
        manufacturer=manufacturer,
        description="",
        quantity=quantity,
    )
    return ai_optimizer.analyze_component(component)
