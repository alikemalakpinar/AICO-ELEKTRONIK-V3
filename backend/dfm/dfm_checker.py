"""DFM Checker - Design for Manufacturing validation"""

from typing import Dict, Any, List
from .rules import DFMRuleSet, Severity


class DFMChecker:
    """DFM validation engine for PCB designs"""
    
    def __init__(self, custom_rules: List = None):
        """Initialize DFM checker with standard or custom rules"""
        self.ruleset = DFMRuleSet()
        
        if custom_rules:
            for rule in custom_rules:
                self.ruleset.add_rule(rule)
    
    def check_design(self, design_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Run all DFM checks on design data
        
        Args:
            design_data: Dict containing PCB and SMT specifications
        
        Returns:
            DFM check results with score and recommendations
        """
        
        results = []
        errors = []
        warnings = []
        infos = []
        
        # Merge PCB and SMT data
        check_data = self._prepare_check_data(design_data)
        
        # Run all rules
        for rule in self.ruleset.rules:
            result = rule.check(check_data)
            results.append(result)
            
            if not result["passed"]:
                if result["severity"] == Severity.ERROR.value or result["severity"] == Severity.CRITICAL.value:
                    errors.append(result)
                elif result["severity"] == Severity.WARNING.value:
                    warnings.append(result)
            else:
                if result["severity"] == Severity.INFO.value:
                    infos.append(result)
        
        # Calculate DFM score (0-100)
        score = self._calculate_dfm_score(results)
        
        # Generate summary
        summary = self._generate_summary(score, errors, warnings)
        
        return {
            "dfm_score": score,
            "grade": self._get_grade(score),
            "summary": summary,
            "total_checks": len(results),
            "passed": len([r for r in results if r["passed"]]),
            "failed": len([r for r in results if not r["passed"]]),
            "errors": errors,
            "warnings": warnings,
            "infos": infos,
            "all_results": results,
            "manufacturability": self._get_manufacturability_level(score)
        }
    
    def _prepare_check_data(self, design_data: Dict[str, Any]) -> Dict[str, Any]:
        """Prepare combined data for checking"""
        pcb = design_data.get("pcb", {})
        smt = design_data.get("smt", {})
        
        # Combine relevant fields
        check_data = {
            **pcb,
            "component_count": smt.get("component_count", 0),
            "unique_parts": smt.get("unique_parts", 0),
            "bga_count": smt.get("bga_count", 0),
            "uses_01005": smt.get("uses_01005", False),
            "inspection": smt.get("inspection", [])
        }
        
        return check_data
    
    def _calculate_dfm_score(self, results: List[Dict[str, Any]]) -> int:
        """Calculate DFM score based on check results"""
        if not results:
            return 100
        
        total_weight = 0
        score_sum = 0
        
        severity_weights = {
            Severity.CRITICAL.value: 25,
            Severity.ERROR.value: 15,
            Severity.WARNING.value: 8,
            Severity.INFO.value: 2
        }
        
        for result in results:
            weight = severity_weights.get(result["severity"], 5)
            total_weight += weight
            
            if result["passed"]:
                score_sum += weight
            else:
                # Partial credit for non-critical issues
                if result["severity"] in [Severity.WARNING.value, Severity.INFO.value]:
                    score_sum += weight * 0.5
        
        if total_weight == 0:
            return 100
        
        score = int((score_sum / total_weight) * 100)
        return max(0, min(100, score))
    
    def _get_grade(self, score: int) -> str:
        """Convert score to letter grade"""
        if score >= 95:
            return "A+"
        elif score >= 90:
            return "A"
        elif score >= 85:
            return "B+"
        elif score >= 80:
            return "B"
        elif score >= 75:
            return "C+"
        elif score >= 70:
            return "C"
        elif score >= 60:
            return "D"
        else:
            return "F"
    
    def _get_manufacturability_level(self, score: int) -> str:
        """Get manufacturability level description"""
        if score >= 90:
            return "Excellent - Ready for production"
        elif score >= 80:
            return "Good - Minor improvements recommended"
        elif score >= 70:
            return "Fair - Several issues should be addressed"
        elif score >= 60:
            return "Poor - Significant design changes needed"
        else:
            return "Critical - Not recommended for manufacturing"
    
    def _generate_summary(self, score: int, errors: List, warnings: List) -> str:
        """Generate human-readable summary"""
        if score >= 90:
            return f"Design is excellent with DFM score of {score}/100. Ready for manufacturing."
        elif score >= 80:
            summary = f"Good design with DFM score of {score}/100. "
            if warnings:
                summary += f"{len(warnings)} warning(s) should be reviewed."
            return summary
        elif score >= 70:
            summary = f"Fair design with DFM score of {score}/100. "
            if errors:
                summary += f"{len(errors)} error(s) and "
            if warnings:
                summary += f"{len(warnings)} warning(s) need attention."
            return summary
        else:
            summary = f"Design needs improvement (DFM score: {score}/100). "
            if errors:
                summary += f"{len(errors)} critical error(s) must be fixed before manufacturing."
            return summary
