import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

const AssemblyCapabilitiesPage = ({ lang }) => {
  const capabilities = [
    lang === 'tr' ? '01005, 0201 komponentler' : '01005, 0201 components',
    lang === 'tr' ? 'BGA/CSP montaj' : 'BGA/CSP assembly',
    lang === 'tr' ? 'İki taraflı dizgi' : 'Double-sided assembly',
    lang === 'tr' ? 'AOI & X-ray test' : 'AOI & X-ray testing',
    lang === 'tr' ? 'Reflow profilleme' : 'Reflow profiling'
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{lang === 'tr' ? 'Dizgi Kapasitesi' : 'Assembly Capabilities'}</h1>
          <p className="text-xl text-gray-600">{lang === 'tr' ? 'SMT ve THT montaj yetenekleri' : 'SMT and THT assembly capabilities'}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center space-x-3 bg-white border border-gray-200 rounded-xl p-6">
                <CheckCircle2 className="text-green-500" size={24} />
                <span className="text-lg text-gray-700">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssemblyCapabilitiesPage;