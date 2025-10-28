import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Clock } from 'lucide-react';

const PriceComparisonChart = ({ pricing, lang = 'tr' }) => {
  if (!pricing) return null;

  const content = {
    tr: {
      title: 'Fiyat Karşılaştırması',
      baseCost: 'Temel Maliyet',
      withMargin: 'Kar Marjı ile',
      afterDiscount: 'İndirim Sonrası',
      finalPrice: 'Final Fiyat',
      savings: 'Toplam Tasarruf',
      discountRate: 'İndirim Oranı',
      volumeTier: 'Hacim Kademesi',
      nextTier: 'Sonraki Kademe',
      unitsNeeded: 'daha fazla birim'
    },
    en: {
      title: 'Price Comparison',
      baseCost: 'Base Cost',
      withMargin: 'With Margin',
      afterDiscount: 'After Discount',
      finalPrice: 'Final Price',
      savings: 'Total Savings',
      discountRate: 'Discount Rate',
      volumeTier: 'Volume Tier',
      nextTier: 'Next Tier',
      unitsNeeded: 'more units'
    }
  };

  const t = content[lang] || content.tr;

  const summary = pricing.summary || {};
  const volumeDiscount = pricing.volume_discount || {};
  const pricingStrategy = pricing.pricing_strategy || {};

  const baseCost = summary.base_cost || 0;
  const withMargin = summary.with_margin || 0;
  const afterDiscount = summary.after_discount || 0;
  const finalPrice = summary.total || 0;

  const maxValue = Math.max(baseCost, withMargin, afterDiscount, finalPrice) * 1.1;

  const PriceBar = ({ label, value, color, width }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-lg font-bold text-gray-900">₺{value.toFixed(2)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mt-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-primary" />
        {t.title}
      </h3>

      {/* Price Breakdown Bars */}
      <div className="space-y-4 mb-6">
        <PriceBar 
          label={t.baseCost}
          value={baseCost}
          color="bg-blue-500"
          width={(baseCost / maxValue) * 100}
        />
        
        {withMargin > baseCost && (
          <PriceBar 
            label={t.withMargin}
            value={withMargin}
            color="bg-indigo-500"
            width={(withMargin / maxValue) * 100}
          />
        )}
        
        {afterDiscount < withMargin && afterDiscount > 0 && (
          <PriceBar 
            label={t.afterDiscount}
            value={afterDiscount}
            color="bg-green-500"
            width={(afterDiscount / maxValue) * 100}
          />
        )}
        
        <PriceBar 
          label={t.finalPrice}
          value={finalPrice}
          color="bg-gradient-to-r from-primary to-blue-600"
          width={(finalPrice / maxValue) * 100}
        />
      </div>

      {/* Savings Info */}
      {volumeDiscount && volumeDiscount.discount_amount > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <p className="text-sm font-medium text-green-800">{t.savings}</p>
              </div>
              <p className="text-2xl font-bold text-green-700">
                ₺{volumeDiscount.discount_amount.toFixed(2)}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {volumeDiscount.savings_percentage}% {t.discountRate}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">{t.volumeTier}</p>
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {volumeDiscount.tier}+ units
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Tier Info */}
      {volumeDiscount && volumeDiscount.next_tier && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">{t.nextTier}:</p>
              <p className="text-sm text-amber-800 mt-1">
                Siparişe <strong>{volumeDiscount.next_tier.additional_units_needed}</strong> {t.unitsNeeded} ekleyerek{' '}
                <strong>{volumeDiscount.next_tier.quantity}</strong> kademeye ulaşın ve{' '}
                <strong className="text-green-700">{(volumeDiscount.next_tier.discount_rate * 100).toFixed(0)}%</strong> indirim kazanın!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Strategy Info */}
      {pricingStrategy && pricingStrategy.margin_strategy && (
        <div className="mt-4 text-xs text-gray-600 bg-gray-50 rounded p-3">
          <p>
            <strong>Fiyatlandırma Stratejisi:</strong> {pricingStrategy.margin_strategy.strategy}
          </p>
          {pricingStrategy.margin_strategy.notes && (
            <p className="mt-1">{pricingStrategy.margin_strategy.notes}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceComparisonChart;
