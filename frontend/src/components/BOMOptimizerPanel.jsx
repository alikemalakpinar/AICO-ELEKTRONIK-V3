import React from 'react';
import { Lightbulb, TrendingDown, AlertCircle, Package, DollarSign } from 'lucide-react';

const BOMOptimizerPanel = ({ optimization, lang = 'tr' }) => {
  if (!optimization || !optimization.optimization_suggestions) return null;

  const content = {
    tr: {
      title: 'Optimizasyon Önerileri',
      potentialSavings: 'Potansiyel Tasarruf',
      priorityActions: 'Öncelikli Aksiyonlar',
      allSuggestions: 'Tüm Öneriler',
      current: 'Mevcut',
      alternative: 'Alternatif',
      benefit: 'Fayda',
      impact: 'Etki',
      complexity: 'Uygulama Karmaşıklığı',
      savings: 'Tasarruf'
    },
    en: {
      title: 'Optimization Suggestions',
      potentialSavings: 'Potential Savings',
      priorityActions: 'Priority Actions',
      allSuggestions: 'All Suggestions',
      current: 'Current',
      alternative: 'Alternative',
      benefit: 'Benefit',
      impact: 'Impact',
      complexity: 'Implementation Complexity',
      savings: 'Savings'
    }
  };

  const t = content[lang] || content.tr;

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') return <AlertCircle className="w-4 h-4" />;
    if (priority === 'medium') return <Package className="w-4 h-4" />;
    return <Lightbulb className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          {t.title}
        </h3>
        {optimization.total_potential_savings_percent > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              <div>
                <p className="text-xs opacity-90">{t.potentialSavings}</p>
                <p className="text-lg font-bold">
                  {optimization.total_potential_savings_percent.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Priority Actions */}
      {optimization.priority_actions && optimization.priority_actions.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            {t.priorityActions}
          </h4>
          <div className="space-y-3">
            {optimization.priority_actions.map((action, idx) => (
              <div key={idx} className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(action.priority)} flex items-center gap-1`}>
                      {getPriorityIcon(action.priority)}
                      {action.priority.toUpperCase()}
                    </span>
                    {action.savings_percent > 0 && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        -{action.savings_percent}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">{t.current}:</p>
                    <p className="text-gray-900">{action.current}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">{t.alternative}:</p>
                    <p className="text-gray-900">{action.alternative}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-orange-200">
                  <p className="text-sm text-gray-700">
                    <strong>{t.benefit}:</strong> {action.benefit}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    💡 {action.recommendation}
                  </p>
                  {action.impact && (
                    <p className="text-xs text-blue-600 mt-1">
                      ✨ {t.impact}: {action.impact}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Suggestions */}
      {optimization.optimization_suggestions && optimization.optimization_suggestions.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">{t.allSuggestions}</h4>
          <div className="space-y-2">
            {optimization.optimization_suggestions.map((suggestion, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(suggestion.priority)}`}>
                      {suggestion.priority}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {suggestion.current} → {suggestion.alternative}
                    </span>
                  </div>
                  {suggestion.savings_percent > 0 && (
                    <span className="text-sm font-bold text-green-600">
                      -{suggestion.savings_percent}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-2">{suggestion.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Implementation Complexity */}
      {optimization.implementation_complexity && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>{t.complexity}:</strong> {optimization.implementation_complexity}
          </p>
        </div>
      )}
    </div>
  );
};

export default BOMOptimizerPanel;
