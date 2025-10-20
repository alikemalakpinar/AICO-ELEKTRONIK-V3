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

      {/* Coating Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0E27] text-center mb-12">
            {lang === 'tr' ? 'Yüzey Kaplama Seçenekleri' : 'Surface Finish Options'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-xl text-[#0A0E27] mb-3">HASL</h3>
              <p className="text-gray-600 mb-4">
                {lang === 'tr' 
                  ? 'Kurşunsuz hot air solder leveling. Ekonomik ve yaygın kullanım için ideal.'
                  : 'Lead-free hot air solder leveling. Ideal for economical and general use.'}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> {lang === 'tr' ? 'Uygun fiyat' : 'Cost effective'}</li>
                <li className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> {lang === 'tr' ? 'Genel kullanım' : 'General purpose'}</li>
              </ul>
            </div>

            <div className="bg-white border border-blue-200 rounded-2xl p-6 hover:shadow-xl transition-shadow relative">
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">POPULAR</div>
              <h3 className="font-bold text-xl text-[#0A0E27] mb-3">ENIG</h3>
              <p className="text-gray-600 mb-4">
                {lang === 'tr' 
                  ? 'Electroless nickel immersion gold. Düz yüzey, fine pitch için ideal.'
                  : 'Electroless nickel immersion gold. Flat surface, ideal for fine pitch.'}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> {lang === 'tr' ? 'Düz yüzey' : 'Flat surface'}</li>
                <li className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> {lang === 'tr' ? 'BGA/QFN için ideal' : 'Ideal for BGA/QFN'}</li>
                <li className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> {lang === 'tr' ? 'Uzun raf ömrü' : 'Long shelf life'}</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-xl text-[#0A0E27] mb-3">OSP</h3>
              <p className="text-gray-600 mb-4">
                {lang === 'tr' 
                  ? 'Organic solderability preservative. Çevre dostu, ince yüzey.'
                  : 'Organic solderability preservative. Eco-friendly, thin surface.'}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> {lang === 'tr' ? 'Çevre dostu' : 'Eco-friendly'}</li>
                <li className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> {lang === 'tr' ? 'Ekonomik' : 'Economical'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0E27] text-center mb-12">
            {lang === 'tr' ? 'Teknik Özellikler' : 'Technical Specifications'}
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">{lang === 'tr' ? 'Parametre' : 'Parameter'}</th>
                  <th className="px-6 py-4 text-left font-bold">{lang === 'tr' ? 'Standart' : 'Standard'}</th>
                  <th className="px-6 py-4 text-left font-bold">{lang === 'tr' ? 'İleri Seviye' : 'Advanced'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">{lang === 'tr' ? 'Katman' : 'Layers'}</td>
                  <td className="px-6 py-4">2-6L</td>
                  <td className="px-6 py-4">8-10L</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">{lang === 'tr' ? 'Min iz/boşluk' : 'Min track/space'}</td>
                  <td className="px-6 py-4">0.15mm</td>
                  <td className="px-6 py-4">0.10mm</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">{lang === 'tr' ? 'Min delik' : 'Min via'}</td>
                  <td className="px-6 py-4">0.3mm</td>
                  <td className="px-6 py-4">0.2mm</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">{lang === 'tr' ? 'Bakır ağırlığı' : 'Copper weight'}</td>
                  <td className="px-6 py-4">1oz</td>
                  <td className="px-6 py-4">2oz</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">{lang === 'tr' ? 'Max boyut' : 'Max size'}</td>
                  <td className="px-6 py-4">500×500mm</td>
                  <td className="px-6 py-4">{lang === 'tr' ? 'Özel' : 'Custom'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            {lang === 'tr' ? 'Hemen Başlayın' : 'Get Started Now'}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {lang === 'tr' 
              ? 'Gerber dosyanızı yükleyin, anında fiyat ve termin alın'
              : 'Upload your Gerber file, get instant price and lead time'}
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg rounded-xl">
            <Link to={`/${lang}/instant-quote`}>
              <Zap className="mr-2" />
              {lang === 'tr' ? 'Anında Teklif Al' : 'Get Instant Quote'}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PCBManufacturingPage;