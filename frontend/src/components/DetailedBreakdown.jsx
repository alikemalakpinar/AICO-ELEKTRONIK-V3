import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const DetailedBreakdown = ({ pricing, lang = 'tr' }) => {
  if (!pricing || !pricing.detailed_costs) return null;

  const { pcb, smt } = pricing.detailed_costs;

  const content = {
    tr: {
      title: 'Detaylı Maliyet Analizi',
      pcb: 'PCB Maliyetleri',
      smt: 'SMT Maliyetleri',
      material: 'Malzeme',
      labor: 'İşçilik',
      overhead: 'Genel Gider',
      additional: 'Ek Maliyetler',
      breakdown: 'Detay',
      hours: 'saat',
      perHour: 'saat başı'
    },
    en: {
      title: 'Detailed Cost Analysis',
      pcb: 'PCB Costs',
      smt: 'SMT Costs',
      material: 'Material',
      labor: 'Labor',
      overhead: 'Overhead',
      additional: 'Additional',
      breakdown: 'Details',
      hours: 'hours',
      perHour: 'per hour'
    }
  };

  const t = content[lang] || content.tr;

  const CostCard = ({ title, data, color }) => {
    if (!data) return null;

    return (
      <div className={`bg-white rounded-lg border-2 ${color} p-4`}>
        <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t.material}</span>
            {data.material && (
              <span className="font-semibold">₺{data.material.amount}</span>
            )}
          </div>
          
          {data.labor && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t.labor}</span>
                <span className="font-semibold">₺{data.labor.amount}</span>
              </div>
              {data.labor.breakdown && (
                <div className="ml-4 text-xs text-gray-500 mt-1">
                  {data.labor.breakdown.total_hours} {t.hours} × ₺{data.labor.breakdown.hourly_rate}/{t.perHour}
                </div>
              )}
            </div>
          )}
          
          {data.overhead && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.overhead}</span>
              <span className="font-semibold">₺{data.overhead.amount}</span>
            </div>
          )}
          
          {data.additional && data.additional.total > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.additional}</span>
              <span className="font-semibold">₺{data.additional.total}</span>
            </div>
          )}
          
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center font-bold">
              <span>Toplam</span>
              <span className="text-primary">₺{data.base_cost}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mt-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-600" />
        {t.title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CostCard 
          title={t.pcb} 
          data={pcb} 
          color="border-blue-200" 
        />
        
        {smt && smt.base_cost > 0 && (
          <CostCard 
            title={t.smt} 
            data={smt} 
            color="border-green-200" 
          />
        )}
      </div>
      
      {/* Complexity Score */}
      {pcb && pcb.complexity_score !== undefined && (
        <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">PCB Komplekslik Skoru</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    pcb.complexity_score > 0.7 ? 'bg-red-500' :
                    pcb.complexity_score > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${pcb.complexity_score * 100}%` }}
                />
              </div>
              <span className="font-semibold text-gray-900">
                {(pcb.complexity_score * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedBreakdown;
