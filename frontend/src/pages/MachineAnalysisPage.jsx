import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Activity, Ear, Vibrate, Cpu, BarChart3, AlertCircle,
  Wrench, TrendingUp, Clock, CheckCircle2, ArrowRight, Phone
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { AnimatedIcon } from '../components/LottieAnimation';
import AnimatedSection from '../components/AnimatedSection';

const MachineAnalysisPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      meta: {
        title: 'Makine Ses ve Titreşim Analizi | Aico Elektronik',
        description: 'Yapay zeka destekli ses ve titreşim analizi ile önleyici bakım. Makine arızalarını önceden tespit edin.'
      },
      hero: {
        badge: 'AKILLI ÜRETİM SİSTEMLERİ',
        title: 'Makine Ses ve Titreşim Analizi',
        subtitle: 'Yapay zeka ve gelişmiş sensör teknolojisi ile makinelerinizin sağlığını 7/24 izleyin',
        cta: 'Bilgi Talep Et',
        ctaSecondary: 'Demo İste'
      },
      features: {
        title: 'Sistem Özellikleri',
        items: [
          {
            icon: Ear,
            title: 'Akustik Analiz',
            description: 'Yüksek hassasiyetli mikrofonlar ile ses frekansı analizi ve anomali tespiti'
          },
          {
            icon: Vibrate,
            title: 'Titreşim İzleme',
            description: '3 eksenli MEMS sensörler ile mikro titreşim değişikliklerinin algılanması'
          },
          {
            icon: Cpu,
            title: 'Edge AI İşleme',
            description: 'Yerinde yapay zeka işleme ile anlık karar verme ve düşük gecikme'
          },
          {
            icon: BarChart3,
            title: 'Trend Analizi',
            description: 'Geçmiş verilerle karşılaştırma ve aşınma trendi tahmini'
          },
          {
            icon: AlertCircle,
            title: 'Erken Uyarı',
            description: 'Arıza öncesi uyarılar ile plansız duruşları önleme'
          },
          {
            icon: Wrench,
            title: 'Bakım Optimizasyonu',
            description: 'Durum bazlı bakım planlaması ile maliyet optimizasyonu'
          }
        ]
      },
      useCases: {
        title: 'Uygulama Alanları',
        items: [
          { title: 'Rulman Arızaları', description: 'Rulman aşınmasını %95 doğrulukla önceden tespit' },
          { title: 'Motor Sorunları', description: 'Elektrik motoru dengesizlik ve ısınma analizi' },
          { title: 'Pompa İzleme', description: 'Kavitasyon ve sızdırmazlık sorunlarını algılama' },
          { title: 'Kompresör Bakımı', description: 'Valf ve piston aşınma tespiti' },
          { title: 'Konveyör Sistemleri', description: 'Kayış gerilimi ve makara arızaları' },
          { title: 'CNC Tezgahları', description: 'Mil titreşimi ve takım aşınma izleme' }
        ]
      },
      stats: {
        title: 'Kanıtlanmış Sonuçlar',
        items: [
          { value: '%70', label: 'Plansız duruş azalması' },
          { value: '%40', label: 'Bakım maliyeti düşüşü' },
          { value: '%95', label: 'Arıza tahmin doğruluğu' },
          { value: '2-4 hafta', label: 'Önceden uyarı süresi' }
        ]
      },
      benefits: {
        title: 'İş Avantajları',
        items: [
          'Üretim sürekliliği ve OEE artışı',
          'Planlı bakım ile maliyet kontrolü',
          'Yedek parça envanteri optimizasyonu',
          'Enerji verimliliği izleme',
          'Kalite tutarlılığı',
          'Sigorta maliyetlerinde düşüş'
        ]
      },
      cta: {
        title: 'Üretiminizi Akıllı Hale Getirin',
        subtitle: 'Fabrikanız için özelleştirilmiş çözüm önerisi almak üzere bizimle iletişime geçin.',
        button: 'Bilgi Talep Et',
        note: 'Çözümlerimiz satın alınamaz, kurumsal projeler için bilgi talebi oluşturabilirsiniz.'
      }
    },
    en: {
      meta: {
        title: 'Machine Sound and Vibration Analysis | Aico Electronics',
        description: 'AI-powered sound and vibration analysis for predictive maintenance. Detect machine failures before they happen.'
      },
      hero: {
        badge: 'SMART MANUFACTURING SYSTEMS',
        title: 'Machine Sound and Vibration Analysis',
        subtitle: 'Monitor your machines health 24/7 with AI and advanced sensor technology',
        cta: 'Request Information',
        ctaSecondary: 'Request Demo'
      },
      features: {
        title: 'System Features',
        items: [
          {
            icon: Ear,
            title: 'Acoustic Analysis',
            description: 'Sound frequency analysis and anomaly detection with high-precision microphones'
          },
          {
            icon: Vibrate,
            title: 'Vibration Monitoring',
            description: 'Detection of micro vibration changes with 3-axis MEMS sensors'
          },
          {
            icon: Cpu,
            title: 'Edge AI Processing',
            description: 'Instant decision making and low latency with on-site AI processing'
          },
          {
            icon: BarChart3,
            title: 'Trend Analysis',
            description: 'Comparison with historical data and wear trend prediction'
          },
          {
            icon: AlertCircle,
            title: 'Early Warning',
            description: 'Pre-failure alerts to prevent unplanned downtime'
          },
          {
            icon: Wrench,
            title: 'Maintenance Optimization',
            description: 'Cost optimization with condition-based maintenance planning'
          }
        ]
      },
      useCases: {
        title: 'Application Areas',
        items: [
          { title: 'Bearing Failures', description: 'Detect bearing wear with 95% accuracy in advance' },
          { title: 'Motor Issues', description: 'Electric motor imbalance and heating analysis' },
          { title: 'Pump Monitoring', description: 'Detect cavitation and sealing problems' },
          { title: 'Compressor Maintenance', description: 'Valve and piston wear detection' },
          { title: 'Conveyor Systems', description: 'Belt tension and pulley failures' },
          { title: 'CNC Machines', description: 'Spindle vibration and tool wear monitoring' }
        ]
      },
      stats: {
        title: 'Proven Results',
        items: [
          { value: '70%', label: 'Unplanned downtime reduction' },
          { value: '40%', label: 'Maintenance cost decrease' },
          { value: '95%', label: 'Failure prediction accuracy' },
          { value: '2-4 weeks', label: 'Advance warning time' }
        ]
      },
      benefits: {
        title: 'Business Benefits',
        items: [
          'Production continuity and OEE increase',
          'Cost control with planned maintenance',
          'Spare parts inventory optimization',
          'Energy efficiency monitoring',
          'Quality consistency',
          'Reduction in insurance costs'
        ]
      },
      cta: {
        title: 'Make Your Production Smart',
        subtitle: 'Contact us to get a customized solution proposal for your factory.',
        button: 'Request Information',
        note: 'Our solutions are not available for direct purchase. Please submit an information request for enterprise projects.'
      }
    }
  };

  const t = content[lang] || content.tr;

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="fadeInLeft">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
                  <Activity className="w-4 h-4 mr-2" />
                  {t.hero.badge}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  {t.hero.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={`/${lang}/contact`}>
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl">
                      <Phone className="mr-2" size={20} />
                      {t.hero.cta}
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                    {t.hero.ctaSecondary}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={0.2}>
                <div className="flex justify-center">
                  <AnimatedIcon type="vibration" size={300} color="#3B82F6" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {t.features.title}
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.features.items.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <AnimatedSection key={idx} animation="fadeInUp" delay={idx * 0.1}>
                    <div className="p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
                      <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.stats.title}</h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {t.stats.items.map((stat, idx) => (
                <AnimatedSection key={idx} animation="fadeInUp" delay={idx * 0.1}>
                  <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-slate-400">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {t.useCases.title}
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.useCases.items.map((useCase, idx) => (
                <AnimatedSection key={idx} animation="fadeInUp" delay={idx * 0.1}>
                  <div className="p-6 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-all">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{useCase.title}</h3>
                    <p className="text-slate-600 text-sm">{useCase.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp">
              <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{t.benefits.title}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {t.benefits.items.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.cta.title}</h2>
              <p className="text-xl text-slate-300 mb-8">{t.cta.subtitle}</p>
              <Link to={`/${lang}/contact`}>
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-6 text-lg rounded-xl">
                  <Phone className="mr-2" size={20} />
                  {t.cta.button}
                </Button>
              </Link>
              <p className="text-sm text-slate-400 mt-6">{t.cta.note}</p>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default MachineAnalysisPage;
