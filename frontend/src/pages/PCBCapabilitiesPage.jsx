import React from 'react';
import { Layers, Download } from 'lucide-react';
import { Button } from '../components/ui/button';

const PCBCapabilitiesPage = ({ lang }) => {
  const specs = [
    { label: lang === 'tr' ? 'Katmanlar' : 'Layers', value: '2-10L' },
    { label: lang === 'tr' ? 'İz/Boşluk' : 'Track/Space', value: '0.1mm min' },
    { label: lang === 'tr' ? 'Delik' : 'Drill', value: '0.2mm min' },
    { label: lang === 'tr' ? 'Bakır' : 'Copper', value: '1-2oz' },
    { label: lang === 'tr' ? 'Kaplama' : 'Finish', value: 'ENIG/HASL/OSP' },
    { label: lang === 'tr' ? 'İmpedans' : 'Impedance', value: '±%10' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{lang === 'tr' ? 'PCB Kapasitesi' : 'PCB Capabilities'}</h1>
          <p className="text-xl text-gray-600">{lang === 'tr' ? 'Teknik özellikler ve toleranslar' : 'Technical specifications and tolerances'}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specs.map((spec, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-sm text-gray-600 mb-1">{spec.label}</div>
                <div className="text-2xl font-bold text-[#0A0E27]">{spec.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button className="bg-[#1554F6] text-white px-8 py-6 rounded-xl">
              <Download className="mr-2" size={20} />
              {lang === 'tr' ? 'Stackup PDF İndir' : 'Download Stackup PDF'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PCBCapabilitiesPage;