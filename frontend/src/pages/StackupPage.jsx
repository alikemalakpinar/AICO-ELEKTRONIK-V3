import React from 'react';
import { Download, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';

const StackupPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      title: 'Stackup Kütüphanesi',
      subtitle: 'Standart PCB katman yapıları ve malzeme kombinasyonları',
      stackups: [
        {
          layers: '2L',
          thickness: '1.6mm',
          desc: 'Standart 2 katman PCB',
          structure: ['Top Copper (35µm)', 'FR-4 Core (1.52mm)', 'Bottom Copper (35µm)']
        },
        {
          layers: '4L',
          thickness: '1.6mm',
          desc: 'İmpedans kontrollü 4 katman',
          structure: ['Top Copper (35µm)', 'Prepreg (0.2mm)', 'Inner L2 (35µm)', 'Core (0.95mm)', 'Inner L3 (35µm)', 'Prepreg (0.2mm)', 'Bottom Copper (35µm)']
        },
        {
          layers: '6L',
          thickness: '1.6mm',
          desc: 'High density 6 katman',
          structure: ['Top', 'PP', 'L2 (GND)', 'Core', 'L3 (PWR)', 'PP', 'L4 (Signal)', 'Core', 'L5 (GND)', 'PP', 'Bottom']
        },
        {
          layers: '8L',
          thickness: '2.0mm',
          desc: 'Kompleks 8 katman',
          structure: ['8 katman yapısı - detaylı bilgi için iletişime geçin']
        }
      ],
      download: 'Stackup Şablonlarını İndir'
    },
    en: {
      title: 'Stackup Library',
      subtitle: 'Standard PCB layer structures and material combinations',
      stackups: [
        {
          layers: '2L',
          thickness: '1.6mm',
          desc: 'Standard 2 layer PCB',
          structure: ['Top Copper (35µm)', 'FR-4 Core (1.52mm)', 'Bottom Copper (35µm)']
        },
        {
          layers: '4L',
          thickness: '1.6mm',
          desc: 'Impedance controlled 4 layer',
          structure: ['Top Copper (35µm)', 'Prepreg (0.2mm)', 'Inner L2 (35µm)', 'Core (0.95mm)', 'Inner L3 (35µm)', 'Prepreg (0.2mm)', 'Bottom Copper (35µm)']
        },
        {
          layers: '6L',
          thickness: '1.6mm',
          desc: 'High density 6 layer',
          structure: ['Top', 'PP', 'L2 (GND)', 'Core', 'L3 (PWR)', 'PP', 'L4 (Signal)', 'Core', 'L5 (GND)', 'PP', 'Bottom']
        },
        {
          layers: '8L',
          thickness: '2.0mm',
          desc: 'Complex 8 layer',
          structure: ['8 layer structure - contact for details']
        }
      ],
      download: 'Download Stackup Templates'
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1554F6] to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl opacity-90">{t.subtitle}</p>
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.stackups.map((stackup, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#1554F6] text-white rounded-lg flex items-center justify-center font-bold text-lg">
                    {stackup.layers}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{stackup.desc}</div>
                    <div className="text-sm text-gray-500">{stackup.thickness}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {stackup.structure.map((layer, layerIdx) => (
                    <div key={layerIdx} className="bg-white p-2 rounded text-sm text-center">
                      {layer}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#1554F6] hover:bg-blue-700 text-white">
              <Download className="mr-2" size={20} />
              {t.download}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StackupPage;
