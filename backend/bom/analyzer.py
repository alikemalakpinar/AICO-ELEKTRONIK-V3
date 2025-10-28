"""BOM Analyzer - Analyze BOM for cost and availability"""

from typing import Dict, Any, List


class BOMAnalyzer:
    """Analyze BOM for insights and recommendations"""
    
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}
        self.part_database = self._initialize_part_database()
    
    def _initialize_part_database(self) -> Dict[str, Any]:
        """Initialize simulated part database with common components"""
        return {
            # Resistors
            "0402_resistor": {"cost": 0.01, "availability": "excellent", "lead_time": 1},
            "0603_resistor": {"cost": 0.012, "availability": "excellent", "lead_time": 1},
            "0805_resistor": {"cost": 0.015, "availability": "excellent", "lead_time": 1},
            "1206_resistor": {"cost": 0.02, "availability": "excellent", "lead_time": 1},
            
            # Capacitors
            "0402_capacitor": {"cost": 0.015, "availability": "good", "lead_time": 2},
            "0603_capacitor": {"cost": 0.018, "availability": "excellent", "lead_time": 1},
            "0805_capacitor": {"cost": 0.025, "availability": "excellent", "lead_time": 1},
            "1206_capacitor": {"cost": 0.035, "availability": "good", "lead_time": 2},
            
            # ICs
            "sot23_ic": {"cost": 0.25, "availability": "good", "lead_time": 3},
            "soic8_ic": {"cost": 0.45, "availability": "good", "lead_time": 4},
            "qfn_ic": {"cost": 1.50, "availability": "fair", "lead_time": 6},
            "bga_ic": {"cost": 5.00, "availability": "fair", "lead_time": 8},
        }
    
    def analyze_bom(self, bom_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze BOM for cost, availability, and risks
        
        Args:
            bom_data: Dictionary with component information
        
        Returns:
            Analysis results with recommendations
        """
        
        component_count = bom_data.get("component_count", 0)
        unique_parts = bom_data.get("unique_parts", 0)
        bga_count = bom_data.get("bga_count", 0)
        uses_01005 = bom_data.get("uses_01005", False)
        
        # Estimate component breakdown
        component_breakdown = self._estimate_component_breakdown(
            component_count, unique_parts, bga_count, uses_01005
        )
        
        # Calculate costs
        cost_analysis = self._analyze_costs(component_breakdown)
        
        # Availability check
        availability_analysis = self._check_availability(component_breakdown)
        
        # Risk assessment
        risk_assessment = self._assess_risks(bom_data, component_breakdown)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(
            cost_analysis, availability_analysis, risk_assessment
        )
        
        return {
            "component_breakdown": component_breakdown,
            "cost_analysis": cost_analysis,
            "availability": availability_analysis,
            "risk_assessment": risk_assessment,
            "recommendations": recommendations,
            "estimated_bom_cost": cost_analysis["total_estimated_cost"]
        }
    
    def _estimate_component_breakdown(self,
                                     total_count: int,
                                     unique_parts: int,
                                     bga_count: int,
                                     uses_01005: bool) -> Dict[str, int]:
        """Estimate component types breakdown"""
        
        # Typical PCB component distribution
        breakdown = {
            "resistors": int(total_count * 0.35),
            "capacitors": int(total_count * 0.30),
            "ics": int(total_count * 0.15),
            "connectors": int(total_count * 0.08),
            "leds": int(total_count * 0.05),
            "inductors": int(total_count * 0.04),
            "other": int(total_count * 0.03)
        }
        
        breakdown["bga_count"] = bga_count
        breakdown["uses_01005"] = uses_01005
        breakdown["unique_parts"] = unique_parts
        
        return breakdown
    
    def _analyze_costs(self, breakdown: Dict[str, int]) -> Dict[str, Any]:
        """Analyze estimated BOM costs"""
        
        costs = {
            "resistors": breakdown["resistors"] * 0.012,
            "capacitors": breakdown["capacitors"] * 0.020,
            "ics": breakdown["ics"] * 1.20,
            "connectors": breakdown.get("connectors", 0) * 0.50,
            "leds": breakdown.get("leds", 0) * 0.15,
            "inductors": breakdown.get("inductors", 0) * 0.25,
            "other": breakdown.get("other", 0) * 0.30
        }
        
        # BGA premium
        if breakdown.get("bga_count", 0) > 0:
            costs["bga_premium"] = breakdown["bga_count"] * 3.00
        
        # 01005 premium (if used)
        if breakdown.get("uses_01005", False):
            costs["01005_premium"] = 50  # Additional handling cost
        
        total = sum(costs.values())
        
        return {
            "breakdown": {k: round(v, 2) for k, v in costs.items()},
            "total_estimated_cost": round(total, 2),
            "cost_per_component": round(total / max(sum([breakdown[k] for k in ["resistors", "capacitors", "ics"] if k in breakdown]), 1), 3)
        }
    
    def _check_availability(self, breakdown: Dict[str, int]) -> Dict[str, Any]:
        """Check component availability status"""
        
        availability = {
            "resistors": "excellent",
            "capacitors": "excellent",
            "ics": "good",
            "overall_status": "good"
        }
        
        # Check for potential issues
        issues = []
        
        if breakdown.get("bga_count", 0) > 0:
            issues.append("BGA components may have longer lead times (6-8 weeks)")
            availability["overall_status"] = "fair"
        
        if breakdown.get("uses_01005", False):
            issues.append("01005 components have limited availability")
            availability["overall_status"] = "fair"
        
        if breakdown.get("unique_parts", 0) > 50:
            issues.append(f"High unique part count ({breakdown['unique_parts']}) may affect sourcing")
        
        availability["issues"] = issues
        
        return availability
    
    def _assess_risks(self, bom_data: Dict[str, Any], breakdown: Dict[str, int]) -> Dict[str, Any]:
        """Assess BOM-related risks"""
        
        risks = []
        risk_score = 0  # 0-100, lower is better
        
        # Single source risk
        unique_parts = breakdown.get("unique_parts", 0)
        if unique_parts > 100:
            risks.append({"type": "high_unique_parts", "severity": "medium", "description": f"{unique_parts} unique parts increases sourcing complexity"})
            risk_score += 15
        
        # Obsolescence risk
        if breakdown.get("bga_count", 0) > 5:
            risks.append({"type": "specialized_components", "severity": "medium", "description": "Multiple BGA components may have limited second sources"})
            risk_score += 10
        
        # Lead time risk
        if breakdown.get("ics", 0) > 20:
            risks.append({"type": "ic_dependency", "severity": "low", "description": "High IC count may extend overall lead time"})
            risk_score += 5
        
        # Exotic component risk
        if breakdown.get("uses_01005", False):
            risks.append({"type": "exotic_components", "severity": "high", "description": "01005 components require specialized handling"})
            risk_score += 20
        
        return {
            "risks": risks,
            "risk_score": min(risk_score, 100),
            "risk_level": "low" if risk_score < 20 else "medium" if risk_score < 50 else "high"
        }
    
    def _generate_recommendations(self,
                                 cost_analysis: Dict,
                                 availability: Dict,
                                 risk_assessment: Dict) -> List[str]:
        """Generate actionable recommendations"""
        
        recommendations = []
        
        # Cost recommendations
        cost_per_component = cost_analysis.get("cost_per_component", 0)
        if cost_per_component > 1.0:
            recommendations.append("Consider using more generic components to reduce BOM cost")
        
        # Availability recommendations
        if availability.get("overall_status") == "fair":
            recommendations.append("Plan for extended lead times due to component availability")
        
        # Risk recommendations
        risk_level = risk_assessment.get("risk_level")
        if risk_level == "high":
            recommendations.append("Review BOM for potential second sources and alternates")
        elif risk_level == "medium":
            recommendations.append("Consider stock buffer for critical components")
        
        # Specific component recommendations
        for risk in risk_assessment.get("risks", []):
            if risk["type"] == "exotic_components":
                recommendations.append("Evaluate if exotic components (01005) can be replaced with standard sizes")
            elif risk["type"] == "specialized_components":
                recommendations.append("Confirm BGA component availability before production")
        
        if not recommendations:
            recommendations.append("BOM looks good - no major concerns identified")
        
        return recommendations
