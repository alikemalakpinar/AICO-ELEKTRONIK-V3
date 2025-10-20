import React from 'react';
import { TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const CaseStudiesPage = ({ lang }) => {
  const cases = [
    {
      title: lang === 'tr' ? 'Otomotiv Kontrol Ünitesi' : 'Automotive Control Unit',
      problem: lang === 'tr' ? 'Yüksek sıcaklık ortamı' : 'High temperature environment',
      solution: lang === 'tr' ? 'Polyimide malzeme, 2oz bakır' : 'Polyimide material, 2oz copper',
      result: lang === 'tr' ? '%99.5 ilk geçiş verimi, 5 gün termin' : '99.5% FPY, 5 days lead time'
    },
    {
      title: lang === 'tr' ? 'IoT Sensör Modulu' : 'IoT Sensor Module',
      problem: lang === 'tr' ? '01005 komponent, kompakt tasarım' : '01005 components, compact design',
      solution: lang === 'tr' ? 'Çift taraf SMT, X-ray kontrol' : 'Double-sided SMT, X-ray inspection',
      result: lang === 'tr' ? 'Sıfır hata, 1000 adet/gün' : 'Zero defects, 1000 pcs/day'
    },
    {
      title: lang === 'tr' ? 'Endüstriyel Kontrolör' : 'Industrial Controller',
      problem: lang === 'tr' ? 'İmpedans kontrol gereksinimi' : 'Impedance control requirement',
      solution: lang === 'tr' ? '6L stackup, ±%8 tolerans' : '6L stackup, ±%8 tolerance',
      result: lang === 'tr' ? 'Tüm kartlar ölçüm içinde, 7 gün termin' : 'All boards within spec, 7 days lead time'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{lang === 'tr' ? 'Vaka Çalışmaları' : 'Case Studies'}</h1>
          <p className="text-xl text-gray-600">{lang === 'tr' ? 'Müşterilerimizin başarı hikâyeleri' : 'Our customers\' success stories'}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((caseItem, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-[#1554F6] hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#0A0E27] mb-6">{caseItem.title}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-[#1554F6] mb-1">{lang === 'tr' ? 'Sorun' : 'Problem'}</div>
                    <p className="text-gray-700">{caseItem.problem}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1554F6] mb-1">{lang === 'tr' ? 'Çözüm' : 'Solution'}</div>
                    <p className="text-gray-700">{caseItem.solution}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-sm font-semibold text-green-800 mb-1">{lang === 'tr' ? 'Sonuç' : 'Result'}</div>
                    <p className="text-green-700 font-medium">{caseItem.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] text-white px-8 py-6 text-lg rounded-xl">
              <Link to={`/${lang}/instant-quote`}>{lang === 'tr' ? 'Benzer Proje İçin Teklif Al' : 'Get Quote for Similar Project'}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;