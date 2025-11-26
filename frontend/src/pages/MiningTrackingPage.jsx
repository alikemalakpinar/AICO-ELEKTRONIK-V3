import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  MapPin, Radio, Battery, Shield, Wifi, AlertTriangle,
  Users, Activity, Clock, CheckCircle2, ArrowRight, Phone
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { AnimatedIcon } from '../components/LottieAnimation';
import AnimatedSection from '../components/AnimatedSection';

const MiningTrackingPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      meta: {
        title: 'Madenci Yer Altı Takip Sistemi | Aico Elektronik',
        description: 'Gerçek zamanlı madenci takibi, acil durum alarmları ve güvenlik izleme. UWB ve LoRa teknolojisi ile yer altı konum tespiti.'
      },
      hero: {
        badge: 'YER ALTI GÜVENLİK SİSTEMLERİ',
        title: 'Madenci Yer Altı Takip Sistemi',
        subtitle: 'Gerçek zamanlı konum takibi ve acil durum yönetimi ile madencilik güvenliğini üst seviyeye taşıyın',
        cta: 'Bilgi Talep Et',
        ctaSecondary: 'Teknik Detaylar'
      },
      features: {
        title: 'Sistem Özellikleri',
        items: [
          {
            icon: MapPin,
            title: 'Hassas Konum Tespiti',
            description: 'UWB (Ultra-Wideband) teknolojisi ile 30cm hassasiyetinde yer altı konum takibi'
          },
          {
            icon: Radio,
            title: 'Güvenilir İletişim',
            description: 'LoRa mesh ağı ile zorlu yer altı koşullarında kesintisiz veri iletimi'
          },
          {
            icon: AlertTriangle,
            title: 'Acil Durum Alarmları',
            description: 'Otomatik tehlike algılama ve anlık bildirim sistemi'
          },
          {
            icon: Users,
            title: 'Personel Yönetimi',
            description: 'Giriş-çıkış kontrolü, vardiya takibi ve personel sayım sistemi'
          },
          {
            icon: Battery,
            title: 'Uzun Pil Ömrü',
            description: '72 saat kesintisiz çalışma, kablosuz şarj desteği'
          },
          {
            icon: Shield,
            title: 'Sertifikalı Güvenlik',
            description: 'ATEX Zone 1 sertifikalı, patlama önleyici tasarım'
          }
        ]
      },
      specs: {
        title: 'Teknik Özellikler',
        items: [
          { label: 'Konum Hassasiyeti', value: '±30 cm' },
          { label: 'Güncelleme Hızı', value: '1 saniye' },
          { label: 'Çalışma Derinliği', value: '1000+ metre' },
          { label: 'Pil Ömrü', value: '72 saat' },
          { label: 'Eşzamanlı Cihaz', value: '5000+' },
          { label: 'Sertifikalar', value: 'ATEX, CE, IP68' }
        ]
      },
      benefits: {
        title: 'Avantajlar',
        items: [
          'Acil durumlarda hızlı tahliye koordinasyonu',
          'Tehlikeli bölgelere giriş kontrolü',
          'Çalışma saati ve verimlilik analizi',
          'Kaza sonrası konum geçmişi inceleme',
          'Yasal uyumluluk raporlaması',
          'Merkezi izleme ve yönetim'
        ]
      },
      cta: {
        title: 'Madencilik Güvenliğinizi Artırın',
        subtitle: 'Uzman ekibimiz sizinle iletişime geçerek ihtiyaçlarınıza özel çözüm sunacaktır.',
        button: 'Bilgi Talep Et',
        note: 'Çözümlerimiz satın alınamaz, kurumsal projeler için bilgi talebi oluşturabilirsiniz.'
      }
    },
    en: {
      meta: {
        title: 'Underground Mining Tracking System | Aico Electronics',
        description: 'Real-time miner tracking, emergency alerts and safety monitoring. Underground positioning with UWB and LoRa technology.'
      },
      hero: {
        badge: 'UNDERGROUND SAFETY SYSTEMS',
        title: 'Underground Mining Tracking System',
        subtitle: 'Elevate mining safety with real-time location tracking and emergency management',
        cta: 'Request Information',
        ctaSecondary: 'Technical Details'
      },
      features: {
        title: 'System Features',
        items: [
          {
            icon: MapPin,
            title: 'Precise Location Detection',
            description: 'Underground positioning with 30cm accuracy using UWB (Ultra-Wideband) technology'
          },
          {
            icon: Radio,
            title: 'Reliable Communication',
            description: 'Uninterrupted data transmission in harsh underground conditions with LoRa mesh network'
          },
          {
            icon: AlertTriangle,
            title: 'Emergency Alerts',
            description: 'Automatic hazard detection and instant notification system'
          },
          {
            icon: Users,
            title: 'Personnel Management',
            description: 'Entry-exit control, shift tracking and personnel counting system'
          },
          {
            icon: Battery,
            title: 'Long Battery Life',
            description: '72 hours continuous operation, wireless charging support'
          },
          {
            icon: Shield,
            title: 'Certified Safety',
            description: 'ATEX Zone 1 certified, explosion-proof design'
          }
        ]
      },
      specs: {
        title: 'Technical Specifications',
        items: [
          { label: 'Location Accuracy', value: '±30 cm' },
          { label: 'Update Rate', value: '1 second' },
          { label: 'Operating Depth', value: '1000+ meters' },
          { label: 'Battery Life', value: '72 hours' },
          { label: 'Simultaneous Devices', value: '5000+' },
          { label: 'Certifications', value: 'ATEX, CE, IP68' }
        ]
      },
      benefits: {
        title: 'Benefits',
        items: [
          'Quick evacuation coordination in emergencies',
          'Access control to hazardous areas',
          'Working hours and efficiency analysis',
          'Post-accident location history review',
          'Legal compliance reporting',
          'Centralized monitoring and management'
        ]
      },
      cta: {
        title: 'Enhance Your Mining Safety',
        subtitle: 'Our expert team will contact you to provide a solution tailored to your needs.',
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
                  <Radio className="w-4 h-4 mr-2" />
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
                  <AnimatedIcon type="mining" size={300} color="#3B82F6" />
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

        {/* Specs Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fadeInLeft">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                  {t.specs.title}
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {t.specs.items.map((spec, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200">
                      <div className="text-sm text-slate-500 mb-1">{spec.label}</div>
                      <div className="text-2xl font-bold text-slate-900">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={0.2}>
                <div className="p-8 rounded-2xl bg-white border border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.benefits.title}</h3>
                  <ul className="space-y-4">
                    {t.benefits.items.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
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

export default MiningTrackingPage;
