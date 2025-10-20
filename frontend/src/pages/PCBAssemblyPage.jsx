import React from 'react';
import { Cpu, Eye, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const PCBAssemblyPage = ({ lang }) => {
  const content = {
    tr: {
      title: 'PCB Dizgi (SMT/THT)',
      subtitle: '01005\'e kadar komponent, AOI/X-ray kontrol',
      capabilities: [
        '01005, 0201, BGA, QFN',
        'İki taraflı dizgi',
        'AOI & X-ray test',
        'ICT/FCT test',
        'Conformal coating',
        'Turnkey/consigned'
      ],
      cta: 'BOM Yükle - Dizgi Teklifi'
    },
    en: {
      title: 'PCB Assembly (SMT/THT)',
      subtitle: 'Components down to 01005, AOI/X-ray inspection',
      capabilities: [
        '01005, 0201, BGA, QFN',
        'Double-sided assembly',
        'AOI & X-ray testing',
        'ICT/FCT testing',
        'Conformal coating',
        'Turnkey/consigned'
      ],
      cta: 'Upload BOM - Assembly Quote'
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
          <Button asChild className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] text-white px-8 py-6 text-lg rounded-xl">
            <Link to={`/${lang}/instant-quote`}>{t.cta}</Link>
          </Button>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center space-x-3 bg-white border border-gray-200 rounded-xl p-4">
                <CheckCircle2 className="text-green-500" size={24} />
                <span className="text-gray-700">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PCBAssemblyPage;