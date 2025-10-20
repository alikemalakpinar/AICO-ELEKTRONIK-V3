import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock, CheckCircle2, ArrowRight, Package, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

const FastPrototypingPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      title: 'Hızlı PCB Prototip Üretimi',
      subtitle: '24-48 saat içinde PCB prototipinizi elinizde',
      hero: {
        desc: 'Fikrinizi hızla gerçeğe dönüştürün. Express üretim hizmetimizle prototip kartlarınızı 24-48 saat içinde teslim alın.'
      },
      features: [
        { icon: Zap, title: '24 Saat Teslimat', desc: 'Kritik projeler için ekspres üretim' },
        { icon: Shield, title: 'Kalite Garantisi', desc: 'Hızlı üretimde bile IPC standartları' },
        { icon: Package, title: 'Hazır Stok', desc: 'Yaygın malzemeler stokta' },
        { icon: Clock, title: 'Online Takip', desc: 'Gerçek zamanlı üretim durumu' }
      ],
      pricing: {
        title: 'Hızlı Prototip Fiyatlandırma',
        items: [
          { time: '24 Saat', price: '+%40 prim', desc: 'En hızlı teslimat' },
          { time: '48 Saat', price: '+%25 prim', desc: 'Hızlı teslimat' },
          { time: '72 Saat', price: 'Standart fiyat', desc: 'Normal prototip' }
        ]
      },
      specs: {
        title: 'Hızlı Prototip Özellikleri',
        items: [
          { label: 'Katman', value: '2-6 katman' },
          { label: 'Boyut', value: 'Max 300×300mm' },
          { label: 'Kaplama', value: 'HASL, ENIG' },
          { label: 'Min İz/Boşluk', value: '0.15mm' },
          { label: 'Minimum Adet', value: '1 adet' }
        ]
      },
      cta: 'Hemen Teklif Al'
    },
    en: {
      title: 'Fast PCB Prototype Manufacturing',
      subtitle: 'Get your PCB prototype in 24-48 hours',
      hero: {
        desc: 'Turn your idea into reality quickly. Get your prototype boards delivered in 24-48 hours with our express manufacturing service.'
      },
      features: [
        { icon: Zap, title: '24 Hour Delivery', desc: 'Express manufacturing for critical projects' },
        { icon: Shield, title: 'Quality Guaranteed', desc: 'IPC standards even in fast production' },
        { icon: Package, title: 'Ready Stock', desc: 'Common materials in stock' },
        { icon: Clock, title: 'Online Tracking', desc: 'Real-time production status' }
      ],
      pricing: {
        title: 'Fast Prototype Pricing',
        items: [
          { time: '24 Hours', price: '+40% premium', desc: 'Fastest delivery' },
          { time: '48 Hours', price: '+25% premium', desc: 'Fast delivery' },
          { time: '72 Hours', price: 'Standard price', desc: 'Normal prototype' }
        ]
      },
      specs: {
        title: 'Fast Prototype Specifications',
        items: [
          { label: 'Layers', value: '2-6 layers' },
          { label: 'Size', value: 'Max 300×300mm' },
          { label: 'Finish', value: 'HASL, ENIG' },
          { label: 'Min Track/Space', value: '0.15mm' },
          { label: 'Minimum Qty', value: '1 piece' }
        ]
      },
      cta: 'Get Quote Now'
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1554F6] to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
            <Zap size={16} />
            <span>Express Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{t.subtitle}</p>
          <p className="text-lg max-w-3xl mx-auto mb-8 opacity-80">{t.hero.desc}</p>
          <Link to={`/${lang}/instant-quote`}>
            <Button size="lg" className="bg-white text-[#1554F6] hover:bg-gray-100 px-8 py-6 text-lg">
              <Zap className="mr-2" />
              {t.cta}
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#1554F6] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.pricing.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.pricing.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#1554F6] transition-colors">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1554F6] mb-2">{item.time}</div>
                  <div className="text-2xl font-semibold mb-2">{item.price}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.specs.title}</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {t.specs.items.map((spec, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 ${idx > 0 ? 'border-t border-gray-200' : ''}`}>
                <span className="font-semibold text-gray-700">{spec.label}</span>
                <span className="text-[#1554F6] font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1554F6] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {lang === 'tr' ? 'Hemen Başlayın' : 'Get Started Now'}
          </h2>
          <Link to={`/${lang}/instant-quote`}>
            <Button size="lg" className="bg-white text-[#1554F6] hover:bg-gray-100 px-8 py-6 text-lg">
              {t.cta}
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FastPrototypingPage;
