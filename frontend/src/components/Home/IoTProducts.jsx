import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { AnimatedIcon } from '../LottieAnimation';
import AnimatedSection from '../AnimatedSection';

const IoTProducts = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      badge: 'ENDÜSTRİYEL IoT ÇÖZÜMLERİ',
      title: 'Akıllı Sistemler',
      subtitle: 'Yapay zeka destekli sensör teknolojileri ile işletmenizi geleceğe taşıyın',
      note: 'Kurumsal projeler için bilgi talebi oluşturabilirsiniz',
      cta: 'Bilgi Al',
      products: [
        {
          iconType: 'agriculture',
          title: 'Akıllı Tarım Sistemleri',
          description: 'Toprak nem sensörleri, sera otomasyon ve sulama optimizasyonu ile verimli tarım',
          features: ['Toprak Analizi', 'Sulama Otomasyonu', 'Sera Kontrolü', 'Verim Takibi'],
          link: '/coffee-machine-systems',
          color: '#16A34A'
        },
        {
          iconType: 'mining',
          title: 'Madenci Yer Altı Takibi',
          description: 'UWB teknolojisi ile hassas konum tespiti ve acil durum yönetimi',
          features: ['Konum Takibi', 'Acil Durum Alarmı', 'Personel Yönetimi', 'ATEX Sertifikalı'],
          link: '/mining-tracking',
          color: '#1554F6'
        },
        {
          iconType: 'vibration',
          title: 'Makine Ses ve Titreşim Analizi',
          description: 'AI destekli akustik ve titreşim analizi ile önleyici bakım',
          features: ['Ses Analizi', 'Titreşim İzleme', 'Arıza Tahmini', 'Bakım Planlaması'],
          link: '/machine-analysis',
          color: '#7C3AED'
        },
        {
          iconType: 'fire',
          title: 'Yangın Tespit Sistemleri',
          description: 'AI kamera ile erken yangın tespiti ve otomatik uyarı sistemi',
          features: ['AI Kamera', 'Erken Tespit', '7/24 İzleme', 'Hızlı Müdahale'],
          link: '/fire-detection',
          color: '#F97316'
        },
        {
          iconType: 'cold',
          title: 'Soğuk Hava Deposu İzleme',
          description: 'Sıcaklık, nem ve enerji yönetimi için akıllı kontrol sistemleri',
          features: ['Sıcaklık Kontrolü', 'Nem İzleme', 'IoT Bağlantı', 'Enerji Tasarrufu'],
          link: '/cold-storage',
          color: '#0EA5E9'
        }
      ]
    },
    en: {
      badge: 'INDUSTRIAL IoT SOLUTIONS',
      title: 'Smart Systems',
      subtitle: 'Elevate your business with AI-powered sensor technologies',
      note: 'Submit an information request for enterprise projects',
      cta: 'Get Info',
      products: [
        {
          iconType: 'agriculture',
          title: 'Smart Agriculture Systems',
          description: 'Efficient farming with soil moisture sensors, greenhouse automation and irrigation optimization',
          features: ['Soil Analysis', 'Irrigation Automation', 'Greenhouse Control', 'Yield Tracking'],
          link: '/coffee-machine-systems',
          color: '#16A34A'
        },
        {
          iconType: 'mining',
          title: 'Underground Mining Tracking',
          description: 'Precise location detection and emergency management with UWB technology',
          features: ['Location Tracking', 'Emergency Alerts', 'Personnel Management', 'ATEX Certified'],
          link: '/mining-tracking',
          color: '#1554F6'
        },
        {
          iconType: 'vibration',
          title: 'Machine Sound & Vibration Analysis',
          description: 'Predictive maintenance with AI-powered acoustic and vibration analysis',
          features: ['Sound Analysis', 'Vibration Monitoring', 'Failure Prediction', 'Maintenance Planning'],
          link: '/machine-analysis',
          color: '#7C3AED'
        },
        {
          iconType: 'fire',
          title: 'Fire Detection Systems',
          description: 'Early fire detection and automatic alert system with AI camera',
          features: ['AI Camera', 'Early Detection', '24/7 Monitoring', 'Fast Response'],
          link: '/fire-detection',
          color: '#F97316'
        },
        {
          iconType: 'cold',
          title: 'Cold Storage Monitoring',
          description: 'Smart control systems for temperature, humidity and energy management',
          features: ['Temperature Control', 'Humidity Monitoring', 'IoT Connection', 'Energy Savings'],
          link: '/cold-storage',
          color: '#0EA5E9'
        }
      ]
    }
  };

  const t = content[lang] || content.tr;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <AnimatedSection animation="fadeInDown">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold mb-6">
              {t.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
              {t.subtitle}
            </p>
            <p className="text-sm text-slate-500">
              {t.note}
            </p>
          </div>
        </AnimatedSection>

        {/* Products Grid - 5 items in a custom layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.products.map((product, idx) => (
            <AnimatedSection
              key={idx}
              animation="fadeInUp"
              delay={idx * 0.1}
              className={idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <Link to={`/${lang}${product.link}`} className="block h-full">
                <div className="h-full bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
                  {/* Icon */}
                  <div className="mb-6">
                    <AnimatedIcon
                      type={product.iconType}
                      size={64}
                      color={product.color}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-slate-900 font-semibold group-hover:gap-3 transition-all">
                    <Phone size={16} />
                    <span>{t.cta}</span>
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IoTProducts;
