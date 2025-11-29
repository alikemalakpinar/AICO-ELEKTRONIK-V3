"""
Dynamic Pricing Strategy - AI-Powered Capacity-Based Pricing

This strategy adjusts prices based on:
1. Factory capacity utilization (occupancy rate)
2. Market demand indicators
3. Supply chain status
4. Seasonal factors
5. Customer loyalty tiers
"""

from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import random  # For demo purposes - replace with real data source


class CapacityMonitor:
    """Simulates factory capacity monitoring system"""

    def __init__(self):
        # In production, this would connect to MES/ERP systems
        self._base_capacity = 100  # percentage

    def get_current_utilization(self) -> float:
        """Get current factory utilization (0-100%)"""
        # Demo: Random utilization - replace with real factory data
        base = 70
        variance = random.uniform(-20, 20)
        return min(100, max(20, base + variance))

    def get_weekly_forecast(self) -> Dict[str, float]:
        """Get capacity forecast for upcoming weeks"""
        today = datetime.now()
        forecast = {}

        for week in range(1, 5):
            week_start = today + timedelta(weeks=week)
            # Demo: Simulated forecast
            forecast[week_start.strftime('%Y-W%W')] = random.uniform(50, 90)

        return forecast

    def get_machine_availability(self) -> Dict[str, bool]:
        """Check availability of key production machines"""
        return {
            'pick_and_place_1': True,
            'pick_and_place_2': True,
            'reflow_oven_1': True,
            'reflow_oven_2': random.choice([True, False]),
            'aoi_machine': True,
            'wave_soldering': True,
            'xray_inspection': True,
        }


class SupplyChainMonitor:
    """Monitors supply chain health and component availability"""

    def get_component_availability_index(self) -> float:
        """Returns 0-1 index of overall component availability"""
        # Demo: Would integrate with Mouser/DigiKey/LCSC APIs
        return random.uniform(0.7, 1.0)

    def get_lead_time_multiplier(self) -> float:
        """Returns multiplier based on current supply chain conditions"""
        availability = self.get_component_availability_index()

        if availability >= 0.9:
            return 1.0
        elif availability >= 0.7:
            return 1.1
        elif availability >= 0.5:
            return 1.25
        else:
            return 1.5


class DynamicPricingStrategy:
    """
    AI-Powered Dynamic Pricing Strategy

    Automatically adjusts prices based on real-time factory conditions
    and market dynamics to optimize revenue and capacity utilization.
    """

    def __init__(self):
        self.capacity_monitor = CapacityMonitor()
        self.supply_chain = SupplyChainMonitor()

        # Pricing configuration
        self.config = {
            'base_margin': 0.30,  # 30% base margin
            'min_margin': 0.15,   # 15% minimum margin
            'max_margin': 0.50,   # 50% maximum margin

            # Capacity thresholds
            'low_capacity_threshold': 40,   # Below this, offer discounts
            'high_capacity_threshold': 80,  # Above this, add premiums
            'critical_capacity_threshold': 95,  # Near capacity - high premium

            # Discount/Premium ranges
            'max_low_capacity_discount': 0.15,  # Up to 15% discount when quiet
            'high_capacity_premium': 0.20,       # Up to 20% premium when busy
            'critical_capacity_premium': 0.35,   # Up to 35% premium when critical

            # Lead time adjustments
            'express_premium': {
                'express_24h': 0.50,   # 50% premium for 24h
                'express_48h': 0.30,   # 30% premium for 48h
                'standard': 0.0,       # No adjustment
                'economy': -0.10,      # 10% discount for economy
            },

            # Customer loyalty tiers
            'loyalty_discounts': {
                'platinum': 0.10,  # 10% discount
                'gold': 0.07,      # 7% discount
                'silver': 0.05,    # 5% discount
                'bronze': 0.02,    # 2% discount
                'new': 0.0,        # No discount
            },
        }

    def calculate_capacity_adjustment(self) -> Dict[str, Any]:
        """Calculate price adjustment based on current capacity"""
        utilization = self.capacity_monitor.get_current_utilization()

        adjustment = {
            'utilization': utilization,
            'adjustment_factor': 0.0,
            'reason': '',
            'recommendation': '',
        }

        if utilization < self.config['low_capacity_threshold']:
            # Low capacity - offer discounts to attract business
            discount_factor = (
                (self.config['low_capacity_threshold'] - utilization) /
                self.config['low_capacity_threshold']
            ) * self.config['max_low_capacity_discount']

            adjustment['adjustment_factor'] = -discount_factor
            adjustment['reason'] = 'low_capacity_discount'
            adjustment['recommendation'] = (
                f"Factory running at {utilization:.0f}% capacity. "
                f"Offering {discount_factor*100:.1f}% discount to optimize utilization."
            )

        elif utilization > self.config['critical_capacity_threshold']:
            # Critical capacity - significant premium
            adjustment['adjustment_factor'] = self.config['critical_capacity_premium']
            adjustment['reason'] = 'critical_capacity_premium'
            adjustment['recommendation'] = (
                f"Factory at {utilization:.0f}% capacity. "
                f"Premium pricing applied. Consider economy lead time for savings."
            )

        elif utilization > self.config['high_capacity_threshold']:
            # High capacity - moderate premium
            premium_factor = (
                (utilization - self.config['high_capacity_threshold']) /
                (100 - self.config['high_capacity_threshold'])
            ) * self.config['high_capacity_premium']

            adjustment['adjustment_factor'] = premium_factor
            adjustment['reason'] = 'high_capacity_premium'
            adjustment['recommendation'] = (
                f"Factory at {utilization:.0f}% capacity. "
                f"Consider scheduling for next week for better pricing."
            )
        else:
            adjustment['reason'] = 'normal_capacity'
            adjustment['recommendation'] = 'Optimal factory capacity. Standard pricing applies.'

        return adjustment

    def calculate_seasonal_adjustment(self) -> Dict[str, Any]:
        """Calculate seasonal price adjustments"""
        now = datetime.now()
        month = now.month

        # Peak seasons (higher prices)
        peak_months = [9, 10, 11]  # Q4 electronics rush

        # Slow seasons (potential discounts)
        slow_months = [1, 2, 7, 8]  # Post-holiday, summer

        if month in peak_months:
            return {
                'adjustment_factor': 0.05,
                'reason': 'peak_season',
                'note': 'Q4 peak season pricing in effect'
            }
        elif month in slow_months:
            return {
                'adjustment_factor': -0.05,
                'reason': 'slow_season',
                'note': 'Seasonal discount available'
            }

        return {
            'adjustment_factor': 0.0,
            'reason': 'normal_season',
            'note': 'Standard seasonal pricing'
        }

    def calculate_lead_time_adjustment(self, lead_time: str) -> Dict[str, Any]:
        """Calculate adjustment based on requested lead time"""
        premium = self.config['express_premium'].get(lead_time, 0.0)

        return {
            'adjustment_factor': premium,
            'lead_time': lead_time,
            'note': f"Lead time adjustment: {premium*100:+.0f}%"
        }

    def calculate_loyalty_discount(self, customer_tier: str) -> Dict[str, Any]:
        """Calculate customer loyalty discount"""
        discount = self.config['loyalty_discounts'].get(customer_tier, 0.0)

        return {
            'adjustment_factor': -discount,
            'tier': customer_tier,
            'note': f"Loyalty discount: {discount*100:.0f}%"
        }

    def calculate_supply_chain_adjustment(self) -> Dict[str, Any]:
        """Adjust pricing based on supply chain conditions"""
        multiplier = self.supply_chain.get_lead_time_multiplier()
        availability = self.supply_chain.get_component_availability_index()

        if multiplier > 1.0:
            return {
                'adjustment_factor': multiplier - 1.0,
                'availability_index': availability,
                'reason': 'supply_chain_constraints',
                'note': f"Supply chain adjustment: +{(multiplier-1)*100:.0f}%"
            }

        return {
            'adjustment_factor': 0.0,
            'availability_index': availability,
            'reason': 'normal_supply_chain',
            'note': 'Supply chain operating normally'
        }

    def calculate_final_price(
        self,
        base_cost: float,
        lead_time: str = 'standard',
        customer_tier: str = 'new',
        apply_capacity_pricing: bool = True,
        apply_seasonal_pricing: bool = True,
        apply_supply_chain_pricing: bool = True,
    ) -> Dict[str, Any]:
        """
        Calculate final price with all dynamic adjustments

        Args:
            base_cost: Base manufacturing cost
            lead_time: Requested lead time tier
            customer_tier: Customer loyalty tier
            apply_capacity_pricing: Whether to apply capacity-based adjustments
            apply_seasonal_pricing: Whether to apply seasonal adjustments
            apply_supply_chain_pricing: Whether to apply supply chain adjustments

        Returns:
            Dict containing final price and breakdown of all adjustments
        """
        adjustments = []
        total_adjustment = 0.0

        # Base margin
        base_margin = self.config['base_margin']
        base_price = base_cost * (1 + base_margin)

        # Capacity adjustment
        if apply_capacity_pricing:
            capacity_adj = self.calculate_capacity_adjustment()
            total_adjustment += capacity_adj['adjustment_factor']
            adjustments.append({
                'type': 'capacity',
                **capacity_adj
            })

        # Seasonal adjustment
        if apply_seasonal_pricing:
            seasonal_adj = self.calculate_seasonal_adjustment()
            total_adjustment += seasonal_adj['adjustment_factor']
            adjustments.append({
                'type': 'seasonal',
                **seasonal_adj
            })

        # Lead time adjustment
        lead_time_adj = self.calculate_lead_time_adjustment(lead_time)
        total_adjustment += lead_time_adj['adjustment_factor']
        adjustments.append({
            'type': 'lead_time',
            **lead_time_adj
        })

        # Loyalty discount
        loyalty_adj = self.calculate_loyalty_discount(customer_tier)
        total_adjustment += loyalty_adj['adjustment_factor']
        adjustments.append({
            'type': 'loyalty',
            **loyalty_adj
        })

        # Supply chain adjustment
        if apply_supply_chain_pricing:
            supply_adj = self.calculate_supply_chain_adjustment()
            total_adjustment += supply_adj['adjustment_factor']
            adjustments.append({
                'type': 'supply_chain',
                **supply_adj
            })

        # Calculate final price ensuring margin constraints
        effective_margin = base_margin + total_adjustment
        effective_margin = max(self.config['min_margin'],
                               min(self.config['max_margin'], effective_margin))

        final_price = base_cost * (1 + effective_margin)
        savings = base_price - final_price if final_price < base_price else 0

        # Generate recommendations
        recommendations = self._generate_recommendations(adjustments)

        return {
            'base_cost': round(base_cost, 2),
            'base_price': round(base_price, 2),
            'base_margin_percent': base_margin * 100,
            'total_adjustment_percent': round(total_adjustment * 100, 2),
            'effective_margin_percent': round(effective_margin * 100, 2),
            'final_price': round(final_price, 2),
            'savings': round(savings, 2),
            'adjustments': adjustments,
            'recommendations': recommendations,
            'pricing_valid_until': (datetime.now() + timedelta(hours=24)).isoformat(),
            'dynamic_pricing_active': True,
        }

    def _generate_recommendations(self, adjustments: list) -> list:
        """Generate smart recommendations based on adjustments"""
        recommendations = []

        for adj in adjustments:
            if adj['type'] == 'capacity' and adj.get('reason') == 'high_capacity_premium':
                recommendations.append({
                    'type': 'timing',
                    'message': 'Schedule production for next week to save up to 20%',
                    'potential_savings': '20%',
                    'action': 'reschedule'
                })

            if adj['type'] == 'lead_time' and adj.get('adjustment_factor', 0) > 0.3:
                recommendations.append({
                    'type': 'lead_time',
                    'message': 'Switch to standard lead time to save 50%',
                    'potential_savings': '50%',
                    'action': 'change_lead_time'
                })

            if adj['type'] == 'loyalty' and adj.get('tier') == 'new':
                recommendations.append({
                    'type': 'loyalty',
                    'message': 'Create an account to unlock loyalty discounts',
                    'potential_savings': 'Up to 10%',
                    'action': 'register'
                })

        return recommendations

    def get_pricing_insights(self) -> Dict[str, Any]:
        """Get current pricing insights for dashboard"""
        capacity = self.capacity_monitor.get_current_utilization()
        forecast = self.capacity_monitor.get_weekly_forecast()
        machines = self.capacity_monitor.get_machine_availability()
        supply = self.supply_chain.get_component_availability_index()

        return {
            'current_capacity': capacity,
            'capacity_forecast': forecast,
            'machine_status': machines,
            'supply_chain_health': supply * 100,
            'optimal_order_window': self._find_optimal_window(forecast),
            'pricing_mode': self._get_pricing_mode(capacity),
        }

    def _find_optimal_window(self, forecast: Dict[str, float]) -> Optional[str]:
        """Find the optimal time window for best pricing"""
        if not forecast:
            return None

        min_week = min(forecast.items(), key=lambda x: x[1])
        if min_week[1] < 60:
            return min_week[0]
        return None

    def _get_pricing_mode(self, capacity: float) -> str:
        """Get current pricing mode description"""
        if capacity < self.config['low_capacity_threshold']:
            return 'discount'
        elif capacity > self.config['critical_capacity_threshold']:
            return 'premium_critical'
        elif capacity > self.config['high_capacity_threshold']:
            return 'premium'
        return 'standard'


# Singleton instance
dynamic_strategy = DynamicPricingStrategy()


def get_dynamic_price(
    base_cost: float,
    lead_time: str = 'standard',
    customer_tier: str = 'new',
) -> Dict[str, Any]:
    """Convenience function to get dynamic pricing"""
    return dynamic_strategy.calculate_final_price(
        base_cost=base_cost,
        lead_time=lead_time,
        customer_tier=customer_tier,
    )


def get_pricing_insights() -> Dict[str, Any]:
    """Get current pricing insights"""
    return dynamic_strategy.get_pricing_insights()
