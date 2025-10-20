import React from 'react';
import { CheckCircle2, Layers, Zap, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const PCBManufacturingPage = ({ lang }) => {
  const content = {
    tr: {
      title: 'PCB Üretim',
      subtitle: 'Prototipten seri üretime, tekrarlanabilir kalite',
      features: [
        '2-10 katman PCB',
        '0.1mm iz/boşluk',
        'ENIG/HASL/OSP kaplama',
        '±%10 impedans toleransı',
        'E-test & AOI',
        '24-48 saat hızlı prototip'
      ],
      process: {
        title: 'Süreç Akışı',
        steps: [
          { title: 'DFM Kontrol', desc: 'Otomatik DFM analizi ve uyarılar' },
          { title: 'Üretim', desc: 'IPC sınıf II-III standartlarında üretim' },
          { title: 'E-Test', desc: 'Elektriksel test ve doğrulama' },
          { title: 'QC', desc: 'Görsel ve mekanik kalite kontrol' }
        ]
      },
      cta: 'Gerber Yükle - PCB Üretim'
    },
    en: {
      title: 'PCB Manufacturing',
      subtitle: 'From prototype to production, repeatable quality',
      features: [
        '2-10 layer PCB',
        '0.1mm track/space',
        'ENIG/HASL/OSP finish',
        '±%10 impedance tolerance',
        'E-test & AOI',
        '24-48h fast prototyping'
      ],
      process: {
        title: 'Process Flow',
        steps: [
          { title: 'DFM Check', desc: 'Automated DFM analysis and warnings' },
          { title: 'Manufacturing', desc: 'IPC class II-III standard production' },
          { title: 'E-Test', desc: 'Electrical testing and verification' },
          { title: 'QC', desc: 'Visual and mechanical quality control' }
        ]
      },
      cta: 'Upload Gerber - PCB Manufacturing'
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
          <Button asChild className="bg-gradient-to-r from-[#1554F6] to-[#0EA5E9] text-white px-8 py-6 text-lg rounded-xl">
            <Link to={`/${lang}/instant-quote`}>{t.cta}</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3 bg-white border border-gray-200 rounded-xl p-4">
                <CheckCircle2 className="text-green-500" size={24} />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0E27] text-center mb-12">{t.process.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {t.process.steps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center border border-gray-200">
                <div className="w-12 h-12 bg-[#1554F6] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">{idx + 1}</div>
                <h3 className="font-bold text-[#0A0E27] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PCBManufacturingPage;