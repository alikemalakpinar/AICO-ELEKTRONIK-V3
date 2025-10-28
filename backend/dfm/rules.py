"""DFM Rule definitions"""

from typing import Dict, Any, List, Callable
from enum import Enum


class Severity(Enum):
    """DFM issue severity levels"""
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"


class DFMRule:
    """Represents a single DFM rule"""
    
    def __init__(self,
                 rule_id: str,
                 name: str,
                 description: str,
                 severity: Severity,
                 check_function: Callable,
                 suggestion: str = ""):
        self.rule_id = rule_id
        self.name = name
        self.description = description
        self.severity = severity
        self.check_function = check_function
        self.suggestion = suggestion
    
    def check(self, design_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the rule check"""
        passed, details = self.check_function(design_data)
        
        return {
            "rule_id": self.rule_id,
            "name": self.name,
            "passed": passed,
            "severity": self.severity.value,
            "description": self.description,
            "details": details,
            "suggestion": self.suggestion if not passed else ""
        }


class DFMRuleSet:
    """Collection of DFM rules for PCB manufacturing"""
    
    def __init__(self):
        self.rules: List[DFMRule] = []
        self._initialize_standard_rules()
    
    def _initialize_standard_rules(self):
        """Initialize standard DFM rules"""
        
        # Rule 1: Minimum trace width check
        def check_min_trace(data):
            min_trace = data.get("min_track_space_mm", 0.15)
            layers = data.get("layers", 2)
            
            if layers <= 4 and min_trace < 0.10:
                return False, f"Trace width {min_trace}mm is too fine for {layers}-layer PCB"
            elif layers > 4 and min_trace < 0.075:
                return False, f"Trace width {min_trace}mm is too fine for {layers}-layer PCB"
            elif min_trace < 0.05:
                return False, f"Trace width {min_trace}mm is below manufacturing capability"
            return True, "Trace width is acceptable"
        
        self.rules.append(DFMRule(
            rule_id="DFM001",
            name="Minimum Trace Width",
            description="Check if trace width meets manufacturing capabilities",
            severity=Severity.ERROR,
            check_function=check_min_trace,
            suggestion="Increase trace width to at least 0.10mm for better manufacturability"
        ))
        
        # Rule 2: Layer count validity
        def check_layer_count(data):
            layers = data.get("layers", 2)
            if layers % 2 != 0 and layers != 1:
                return False, f"Odd layer count ({layers}) is not standard"
            if layers > 16:
                return False, f"Layer count ({layers}) exceeds typical capability"
            return True, f"{layers} layers is standard"
        
        self.rules.append(DFMRule(
            rule_id="DFM002",
            name="Layer Count Validation",
            description="Verify layer count is manufacturable",
            severity=Severity.ERROR,
            check_function=check_layer_count,
            suggestion="Use even number of layers (2, 4, 6, 8, 10, 12, 14, 16)"
        ))
        
        # Rule 3: Board size constraints
        def check_board_size(data):
            board_size = data.get("board_size_mm", {})
            width = board_size.get("w", 100)
            height = board_size.get("h", 80)
            
            if width < 10 or height < 10:
                return False, f"Board size ({width}×{height}mm) is too small"
            if width > 500 or height > 500:
                return False, f"Board size ({width}×{height}mm) exceeds panel size"
            if width < 20 or height < 20:
                return False, f"Board size ({width}×{height}mm) may have handling issues"
            return True, f"Board size {width}×{height}mm is acceptable"
        
        self.rules.append(DFMRule(
            rule_id="DFM003",
            name="Board Size Validation",
            description="Check if board dimensions are within manufacturing limits",
            severity=Severity.WARNING,
            check_function=check_board_size,
            suggestion="Ensure board size is between 20×20mm and 500×500mm"
        ))
        
        # Rule 4: Impedance control feasibility
        def check_impedance(data):
            impedance = data.get("impedance_controlled", False)
            layers = data.get("layers", 2)
            thickness = data.get("thickness_mm", 1.6)
            
            if impedance and layers < 4:
                return False, f"Impedance control on {layers}-layer board is challenging"
            if impedance and thickness < 0.8:
                return False, f"Board thickness {thickness}mm too thin for impedance control"
            return True, "Impedance control is feasible" if impedance else "No impedance control"
        
        self.rules.append(DFMRule(
            rule_id="DFM004",
            name="Impedance Control Feasibility",
            description="Verify impedance control requirements are achievable",
            severity=Severity.WARNING,
            check_function=check_impedance,
            suggestion="Use 4+ layers and minimum 1.0mm thickness for impedance control"
        ))
        
        # Rule 5: Copper weight vs trace width
        def check_copper_trace(data):
            copper_oz = data.get("copper_oz", 1)
            min_trace = data.get("min_track_space_mm", 0.15)
            
            if copper_oz >= 2 and min_trace < 0.15:
                return False, f"2oz copper requires wider traces (current: {min_trace}mm)"
            return True, "Copper weight and trace width are compatible"
        
        self.rules.append(DFMRule(
            rule_id="DFM005",
            name="Copper Weight Compatibility",
            description="Check copper weight vs trace width compatibility",
            severity=Severity.WARNING,
            check_function=check_copper_trace,
            suggestion="Use minimum 0.15mm traces with 2oz copper"
        ))
        
        # Rule 6: SMT component density
        def check_smt_density(data):
            board_size = data.get("board_size_mm", {})
            width = board_size.get("w", 100)
            height = board_size.get("h", 80)
            area_cm2 = (width * height) / 100
            
            component_count = data.get("component_count", 0)
            if component_count == 0:
                return True, "No SMT components"
            
            density = component_count / area_cm2
            
            if density > 50:
                return False, f"Component density ({density:.1f}/cm²) is very high"
            elif density > 30:
                return False, f"Component density ({density:.1f}/cm²) may cause assembly issues"
            return True, f"Component density ({density:.1f}/cm²) is acceptable"
        
        self.rules.append(DFMRule(
            rule_id="DFM006",
            name="SMT Component Density",
            description="Verify component density is reasonable for assembly",
            severity=Severity.WARNING,
            check_function=check_smt_density,
            suggestion="Keep component density below 30 per cm² for reliable assembly"
        ))
        
        # Rule 7: BGA placement considerations
        def check_bga(data):
            bga_count = data.get("bga_count", 0)
            inspection = data.get("inspection", [])
            
            if bga_count > 0 and "Xray" not in inspection:
                return False, f"{bga_count} BGA components require X-ray inspection"
            if bga_count > 10:
                return False, f"High BGA count ({bga_count}) - ensure adequate thermal management"
            return True, "BGA placement is acceptable" if bga_count > 0 else "No BGAs"
        
        self.rules.append(DFMRule(
            rule_id="DFM007",
            name="BGA Inspection Requirements",
            description="Ensure proper inspection for BGA components",
            severity=Severity.ERROR,
            check_function=check_bga,
            suggestion="Enable X-ray inspection for boards with BGA components"
        ))
        
        # Rule 8: 01005 component handling
        def check_01005(data):
            uses_01005 = data.get("uses_01005", False)
            if uses_01005:
                return False, "01005 components require specialized handling and equipment"
            return True, "No 01005 components"
        
        self.rules.append(DFMRule(
            rule_id="DFM008",
            name="01005 Component Warning",
            description="Alert for ultra-small components",
            severity=Severity.INFO,
            check_function=check_01005,
            suggestion="Confirm necessity of 01005 components - consider using 0201 if possible"
        ))
    
    def add_rule(self, rule: DFMRule):
        """Add a custom rule to the rule set"""
        self.rules.append(rule)
    
    def get_rules_by_severity(self, severity: Severity) -> List[DFMRule]:
        """Get all rules of a specific severity"""
        return [rule for rule in self.rules if rule.severity == severity]
