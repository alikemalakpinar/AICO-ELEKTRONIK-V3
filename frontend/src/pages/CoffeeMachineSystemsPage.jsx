import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Activity, Gauge, Zap, TrendingUp, Shield, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

const CoffeeMachineSystemsPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      hero: {
        title: 'Kahve Makinası',
        titleHighlight: 'Akıllı Kontrol Sistemleri',
        subtitle: 'Ses ve titreşim analiziyle makina sağlığını gerçek zamanlı izleyin',
        cta: 'Sipariş Ver'
      },
      features: [
        {
          icon: Gauge,
          title: 'Sayaç Kartları',
          description: 'Hassas ölçüm, uzun ömür ve kolay entegrasyon'
        },
        {
          icon: Activity,
          title: 'Titreşim Analizi',
          description: 'Makina sağlığını titreşim verileriyle izleme'
        },
        {
          icon: Zap,
          title: 'Ses Analizi',
          description: 'AI destekli ses tanıma ile arıza tespiti'
        },
        {
          icon: Shield,
          title: 'Önleyici Bakım',
          description: 'Arızalar olmadan önce uyarı sistemi'
        }
      ],
      specs: {
        title: 'Teknik Özellikler',
        items: [
          'IoT destekli uzaktan izleme',
          'Gerçek zamanlı veri analizi',
          'Cloud tabanlı raporlama',
          'Mobil uygulama desteği',
          'Enerji tüketimi optimizasyonu',
          '7/24 sistem izleme'
        ]
      },
      benefits: {
        title: 'Avantajlar',
        items: [
          { title: 'Arıza Önleme', desc: '%80 daha az plansız duruş' },
          { title: 'Maliyet Tasarrufu', desc: '%60 bakım maliyeti düşüşü' },
          { title: 'Verimlilik', desc: '%40 daha fazla çalışma süresi' },
          { title: 'Enerji', desc: '%25 enerji tasarrufu' }
        ]
      }
    },
    en: {
      hero: {
        title: 'Coffee Machine',
        titleHighlight: 'Smart Control Systems',
        subtitle: 'Monitor machine health in real-time with sound and vibration analysis',
        cta: 'Order Now'
      },
      features: [
        {
          icon: Gauge,
          title: 'Counter Cards',
          description: 'Precise measurement, long life and easy integration'
        },
        {
          icon: Activity,
          title: 'Vibration Analysis',
          description: 'Monitor machine health with vibration data'
        },
        {
          icon: Zap,
          title: 'Sound Analysis',
          description: 'AI-powered sound recognition for fault detection'
        },
        {
          icon: Shield,
          title: 'Preventive Maintenance',
          description: 'Alert system before failures occur'
        }
      ],
      specs: {
        title: 'Technical Specifications',
        items: [
          'IoT-enabled remote monitoring',
          'Real-time data analysis',
          'Cloud-based reporting',
          'Mobile app support',
          'Energy consumption optimization',
          '24/7 system monitoring'
        ]
      },
      benefits: {
        title: 'Benefits',
        items: [
          { title: 'Failure Prevention', desc: '80% less unplanned downtime' },
          { title: 'Cost Savings', desc: '60% maintenance cost reduction' },
          { title: 'Efficiency', desc: '40% more uptime' },
          { title: 'Energy', desc: '25% energy savings' }
        ]
      }
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section - Corporate */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-slate-700">
        {/* Subtle animated background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection animation="fadeInDown">
            <div className="inline-block mb-6">
              <div className="glass px-6 py-3 rounded-full border border-white/30 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Coffee className="w-4 h-4" />
                  <span>IoT Smart Solutions</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {t.hero.title}
              <br />
              <span className="text-blue-200">
                {t.hero.titleHighlight}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl">
              {t.hero.subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.6}>
            <Link to="/checkout">
              <Button 
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 px-12 py-8 text-xl rounded-2xl shadow-2xl hover-lift"
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
                  <GlassCard className="p-6 h-full group bg-white/80" glow>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </GlassCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection animation="fadeInLeft">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{t.specs.title}</h2>
              <div className="space-y-3">
                {t.specs.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{t.benefits.title}</h2>
              <div className="grid grid-cols-2 gap-4">
                {t.benefits.items.map((benefit, idx) => (
                  <GlassCard key={idx} className="p-4 bg-white/80">
                    <h4 className="font-bold text-blue-600 mb-1">{benefit.title}</h4>
                    <p className="text-2xl font-bold text-gray-900">{benefit.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoffeeMachineSystemsPage;
