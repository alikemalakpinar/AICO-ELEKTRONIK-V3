"""BOM Optimizer - Suggest component substitutions and optimizations"""

from typing import Dict, Any, List, Tuple


class BOMOptimizer:
    """Optimize BOM for cost and manufacturability"""
    
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}
        self.substitution_database = self._initialize_substitutions()
    
    def _initialize_substitutions(self) -> Dict[str, List[Dict]]:
        """Initialize component substitution database"""
        return {
            "01005": {
                "alternatives": [
                    {"size": "0201", "cost_multiplier": 0.7, "availability": "better", "note": "Easier to handle"}
                ],
                "recommendation": "Use 0201 unless space is critical"
            },
            "0201": {
                "alternatives": [
                    {"size": "0402", "cost_multiplier": 0.8, "availability": "excellent", "note": "Most common, best availability"}
                ],
                "recommendation": "Use 0402 for better reliability"
            },
            "exotic_finish": {
                "alternatives": [
                    {"finish": "ENIG", "cost_multiplier": 1.0, "note": "Industry standard"},
                    {"finish": "HASL", "cost_multiplier": 0.6, "note": "Most economical"}
                ],
                "recommendation": "Use ENIG for lead-free, HASL for cost savings"
            },
            "high_layer_count": {
                "alternatives": [
                    {"approach": "impedance_design", "note": "Optimize trace routing to reduce layers"},
                    {"approach": "component_selection", "note": "Use integrated components"}
                ],
                "recommendation": "Evaluate if layer count can be reduced"
            }
        }
    
    def optimize(self, bom_data: Dict[str, Any], pcb_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate optimization suggestions for BOM and PCB
        
        Args:
            bom_data: BOM specifications
            pcb_data: PCB specifications
        
        Returns:
            Optimization suggestions with potential savings
        """
        
        suggestions = []
        potential_savings = 0
        
        # Component size optimization
        if bom_data.get("uses_01005", False):
            suggestion, savings = self._suggest_size_optimization("01005", bom_data)
            if suggestion:
                suggestions.append(suggestion)
                potential_savings += savings
        
        # Finish optimization
        finish = pcb_data.get("finish", "HASL")
        if finish not in ["HASL", "ENIG"]:
            suggestion, savings = self._suggest_finish_optimization(finish, pcb_data)
            if suggestion:
                suggestions.append(suggestion)
                potential_savings += savings
        
        # Layer count optimization
        layers = pcb_data.get("layers", 2)
        if layers > 6:
            suggestion, savings = self._suggest_layer_optimization(layers, pcb_data)
            if suggestion:
                suggestions.append(suggestion)
                potential_savings += savings
        
        # BGA optimization
        bga_count = bom_data.get("bga_count", 0)
        if bga_count > 0:
            suggestion, savings = self._suggest_bga_optimization(bga_count, bom_data)
            if suggestion:
                suggestions.append(suggestion)
                potential_savings += savings
        
        # Quantity optimization
        quantity = pcb_data.get("quantity", 1)
        suggestion, savings = self._suggest_quantity_optimization(quantity)
        if suggestion:
            suggestions.append(suggestion)
            potential_savings += savings
        
        # Volume consolidation
        unique_parts = bom_data.get("unique_parts", 0)
        if unique_parts > 50:
            suggestion, savings = self._suggest_part_consolidation(unique_parts, bom_data)
            if suggestion:
                suggestions.append(suggestion)
                potential_savings += savings
        
        return {
            "optimization_suggestions": suggestions,
            "total_potential_savings_percent": round(potential_savings, 1),
            "priority_actions": self._prioritize_suggestions(suggestions),
            "implementation_complexity": self._assess_complexity(suggestions)
        }
    
    def _suggest_size_optimization(self, current_size: str, bom_data: Dict) -> Tuple[Dict, float]:
        """Suggest component size optimizations"""
        
        if current_size not in self.substitution_database:
            return None, 0
        
        substitution = self.substitution_database[current_size]
        alternative = substitution["alternatives"][0]
        
        # Estimate savings (handling cost reduction)
        savings_percent = (1 - alternative["cost_multiplier"]) * 100
        
        suggestion = {
            "type": "component_size",
            "priority": "high",
            "current": current_size,
            "alternative": alternative["size"],
            "savings_percent": round(savings_percent, 1),
            "benefit": alternative["note"],
            "recommendation": substitution["recommendation"],
            "impact": "Easier assembly, better yield"
        }
        
        return suggestion, savings_percent * 0.1  # 10% of component cost
    
    def _suggest_finish_optimization(self, current_finish: str, pcb_data: Dict) -> Tuple[Dict, float]:
        """Suggest surface finish optimizations"""
        
        # Simplified finish cost comparison
        finish_costs = {
            "HASL": 1.0,
            "ENIG": 1.6,
            "OSP": 0.8,
            "ImAg": 1.4,
            "ImSn": 1.3
        }
        
        current_cost = finish_costs.get(current_finish, 1.5)
        recommended_finish = "ENIG" if current_cost > 1.6 else "HASL"
        recommended_cost = finish_costs[recommended_finish]
        
        savings_percent = ((current_cost - recommended_cost) / current_cost) * 100
        
        if savings_percent > 5:
            suggestion = {
                "type": "surface_finish",
                "priority": "medium",
                "current": current_finish,
                "alternative": recommended_finish,
                "savings_percent": round(savings_percent, 1),
                "benefit": "Standard finish with good availability",
                "recommendation": f"Use {recommended_finish} for optimal cost/performance",
                "impact": "Reduced cost, faster lead time"
            }
            return suggestion, savings_percent * 0.05  # 5% of PCB cost
        
        return None, 0
    
    def _suggest_layer_optimization(self, current_layers: int, pcb_data: Dict) -> Tuple[Dict, float]:
        """Suggest layer count optimizations"""
        
        if current_layers <= 6:
            return None, 0
        
        # Potential to reduce layers through design optimization
        suggested_layers = current_layers - 2
        
        # Typical cost reduction per layer pair
        savings_percent = 15  # Each layer pair reduction saves ~15%
        
        suggestion = {
            "type": "layer_reduction",
            "priority": "medium",
            "current": f"{current_layers} layers",
            "alternative": f"{suggested_layers} layers",
            "savings_percent": savings_percent,
            "benefit": "Lower cost, easier manufacturing",
            "recommendation": "Review if routing can be optimized to reduce layers",
            "impact": "Significant cost reduction, faster turnaround"
        }
        
        return suggestion, savings_percent * 0.3  # 30% impact on PCB cost
    
    def _suggest_bga_optimization(self, bga_count: int, bom_data: Dict) -> Tuple[Dict, float]:
        """Suggest BGA component optimizations"""
        
        if bga_count > 3:
            suggestion = {
                "type": "bga_reduction",
                "priority": "low",
                "current": f"{bga_count} BGA components",
                "alternative": "Evaluate QFN or other packages",
                "savings_percent": 10,
                "benefit": "Easier assembly, lower inspection cost",
                "recommendation": "Consider if some BGAs can be replaced with QFN packages",
                "impact": "Reduced assembly complexity and cost"
            }
            return suggestion, 5  # 5% potential savings
        
        return None, 0
    
    def _suggest_quantity_optimization(self, current_quantity: int) -> Tuple[Dict, float]:
        """Suggest order quantity optimizations"""
        
        # Volume break points
        breakpoints = [50, 100, 250, 500, 1000]
        
        # Find next breakpoint
        next_breakpoint = None
        for bp in breakpoints:
            if bp > current_quantity:
                next_breakpoint = bp
                break
        
        if next_breakpoint:
            additional_units = next_breakpoint - current_quantity
            savings_at_next_tier = 5  # 5% additional discount
            
            suggestion = {
                "type": "quantity_optimization",
                "priority": "low",
                "current": f"{current_quantity} units",
                "alternative": f"{next_breakpoint} units",
                "additional_units_needed": additional_units,
                "savings_percent": savings_at_next_tier,
                "benefit": "Volume discount tier",
                "recommendation": f"Order {additional_units} more units to reach {next_breakpoint} tier for {savings_at_next_tier}% discount",
                "impact": "Lower per-unit cost"
            }
            return suggestion, 0  # Don't add to total savings (this is a trade-off)
        
        return None, 0
    
    def _suggest_part_consolidation(self, unique_parts: int, bom_data: Dict) -> Tuple[Dict, float]:
        """Suggest part consolidation"""
        
        if unique_parts > 50:
            potential_reduction = int(unique_parts * 0.15)  # Could reduce by 15%
            
            suggestion = {
                "type": "part_consolidation",
                "priority": "medium",
                "current": f"{unique_parts} unique parts",
                "alternative": f"~{unique_parts - potential_reduction} unique parts",
                "savings_percent": 8,
                "benefit": "Simplified sourcing, better volume pricing",
                "recommendation": "Review BOM to consolidate similar components (e.g., standardize resistor values)",
                "impact": "Reduced sourcing time, better pricing"
            }
            return suggestion, 8
        
        return None, 0
    
    def _prioritize_suggestions(self, suggestions: List[Dict]) -> List[Dict]:
        """Prioritize suggestions by impact and ease"""
        
        priority_order = {"high": 0, "medium": 1, "low": 2}
        
        sorted_suggestions = sorted(
            suggestions,
            key=lambda x: (priority_order.get(x.get("priority", "low"), 3), -x.get("savings_percent", 0))
        )
        
        return sorted_suggestions[:3]  # Top 3 recommendations
    
    def _assess_complexity(self, suggestions: List[Dict]) -> str:
        """Assess overall implementation complexity"""
        
        if not suggestions:
            return "none"
        
        high_priority_count = len([s for s in suggestions if s.get("priority") == "high"])
        
        if high_priority_count > 2:
            return "high - requires significant design changes"
        elif high_priority_count > 0 or len(suggestions) > 3:
            return "medium - some design modifications needed"
        else:
            return "low - minor adjustments only"
