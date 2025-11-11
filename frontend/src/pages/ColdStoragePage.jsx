import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Thermometer, Gauge, Activity, Cloud, Shield, CheckCircle2, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

const ColdStoragePage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      hero: {
        title: 'Soğuk Hava Deposu',
        titleHighlight: 'Akıllı Kontrol Sistemleri',
        subtitle: 'Sıcaklık, nem ve enerji yönetimini otomasyon ile optimize edin',
        cta: 'Sipariş Ver'
      },
      features: [
        {
          icon: Thermometer,
          title: 'Sıcaklık Kontrol',
          description: '±0.1°C hassasiyetle sıcaklık yönetimi'
        },
        {
          icon: Activity,
          title: 'Nem İzleme',
          description: 'Optimal nem seviyesi takibi'
        },
        {
          icon: Cloud,
          title: 'IoT Bağlantı',
          description: 'Uzaktan izleme ve kontrol'
        },
        {
          icon: TrendingDown,
          title: 'Enerji Tasarrufu',
          description: 'Akıllı enerji optimizasyonu'
        }
      ],
      systems: {
        title: 'Sistem Bileşenleri',
        items: [
          'Hassas sıcaklık sensörleri',
          'Nem sensörleri ve kontrolü',
          'Akıllı kompresör yönetimi',
          'Kapı açılma alarm sistemi',
          'Enerji tüketim analizi',
          'Bakım zamanlayıcı',
          'Mobil bildirim sistemi',
          'Cloud veri depolama'
        ]
      },
      benefits: {
        title: 'Avantajlar',
        items: [
          { icon: Shield, title: 'Ürün Güvenliği', desc: '%99.9 sıcaklık stabilitesi' },
          { icon: TrendingDown, title: 'Enerji Tasarrufu', desc: '%35 enerji maliyeti azalma' },
          { icon: Activity, title: 'Uzaktan Yönetim', desc: 'Her yerden erişim' },
          { icon: CheckCircle2, title: 'Compliance', desc: 'Gıda güvenliği standartları' }
        ]
      }
    },
    en: {
      hero: {
        title: 'Cold Storage',
        titleHighlight: 'Smart Control Systems',
        subtitle: 'Optimize temperature, humidity and energy management with automation',
        cta: 'Order Now'
      },
      features: [
        {
          icon: Thermometer,
          title: 'Temperature Control',
          description: 'Temperature management with ±0.1°C precision'
        },
        {
          icon: Activity,
          title: 'Humidity Monitoring',
          description: 'Optimal humidity level tracking'
        },
        {
          icon: Cloud,
          title: 'IoT Connection',
          description: 'Remote monitoring and control'
        },
        {
          icon: TrendingDown,
          title: 'Energy Savings',
          description: 'Smart energy optimization'
        }
      ],
      systems: {
        title: 'System Components',
        items: [
          'Precision temperature sensors',
          'Humidity sensors and control',
          'Smart compressor management',
          'Door opening alarm system',
          'Energy consumption analysis',
          'Maintenance scheduler',
          'Mobile notification system',
          'Cloud data storage'
        ]
      },
      benefits: {
        title: 'Benefits',
        items: [
          { icon: Shield, title: 'Product Safety', desc: '99.9% temperature stability' },
          { icon: TrendingDown, title: 'Energy Savings', desc: '35% energy cost reduction' },
          { icon: Activity, title: 'Remote Management', desc: 'Access from anywhere' },
          { icon: CheckCircle2, title: 'Compliance', desc: 'Food safety standards' }
        ]
      }
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50/30 to-slate-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection animation="fadeInDown">
            <div className="inline-block mb-6">
              <div className="glass px-6 py-3 rounded-full border border-cyan-200">
                <div className="flex items-center gap-2 text-sm font-medium text-cyan-600">
                  <Snowflake className="w-4 h-4" />
                  <span>Smart Cold Storage</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900">{t.hero.title}</span>
              <br />
              <span className="text-gradient bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600">
                {t.hero.titleHighlight}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              {t.hero.subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.6}>
            <Link to="/checkout">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl hover-lift"
              >
                {t.hero.cta}
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={idx} animation="fadeInUp" delay={idx * 0.1}>
                  <GlassCard className="p-6 h-full" gradient="blue" glow>
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </GlassCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Components */}
      <section className="py-20 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              {t.systems.title}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.systems.items.map((item, idx) => (
              <AnimatedSection key={idx} animation="scaleIn" delay={idx * 0.05}>
                <GlassCard className="p-4 text-center" gradient="blue">
                  <CheckCircle2 className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 font-medium">{item}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              {t.benefits.title}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.items.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <AnimatedSection key={idx} animation="fadeInUp" delay={idx * 0.1}>
                  <GlassCard className="p-6 text-center" gradient="blue">
                    <Icon className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-2xl font-bold text-cyan-600">{benefit.desc}</p>
                  </GlassCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColdStoragePage;
