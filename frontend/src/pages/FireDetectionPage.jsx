import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Camera, AlertTriangle, Shield, Eye, Zap, CheckCircle2, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

const FireDetectionPage = ({ lang = 'tr' }) => {
  const content = {
    tr: {
      hero: {
        title: 'Yangın Tespit',
        titleHighlight: 'AI Destekli Erken Uyarı',
        subtitle: 'Kamera ve yapay zeka ile yangını başlamadan tespit edin',
        cta: 'Sipariş Ver'
      },
      features: [
        {
          icon: Camera,
          title: 'AI Kamera Sistemi',
          description: 'Görüntü işleme ile anlık yangın tespiti'
        },
        {
          icon: AlertTriangle,
          title: 'Erken Uyarı',
          description: 'Duman, alevden önce algılama'
        },
        {
          icon: Eye,
          title: '7/24 İzleme',
          description: 'Kesintisiz gözetim ve analiz'
        },
        {
          icon: Zap,
          title: 'Hızlı Müdahale',
          description: 'Otomatik alarm ve bildirim'
        }
      ],
      systems: {
        title: 'Sistem Özellikleri',
        items: [
          'Termal ve optik kamera entegrasyonu',
          'Deep learning duman/alev algılama',
          'Çoklu alan simultane izleme',
          'Anlık SMS ve email bildirimi',
          'Yangın söndürme sistemine otomasyon',
          'Cloud kayıt ve arşivleme'
        ]
      },
      stats: [
        { value: '0.5sn', label: 'Tespit Süresi' },
        { value: '%99.8', label: 'Doğruluk' },
        { value: '24/7', label: 'İzleme' },
        { value: '0', label: 'Yanlış Alarm' }
      ]
    },
    en: {
      hero: {
        title: 'Fire Detection',
        titleHighlight: 'AI-Powered Early Warning',
        subtitle: 'Detect fire before it starts with camera and artificial intelligence',
        cta: 'Order Now'
      },
      features: [
        {
          icon: Camera,
          title: 'AI Camera System',
          description: 'Instant fire detection with image processing'
        },
        {
          icon: AlertTriangle,
          title: 'Early Warning',
          description: 'Detection before smoke and flame'
        },
        {
          icon: Eye,
          title: '24/7 Monitoring',
          description: 'Continuous surveillance and analysis'
        },
        {
          icon: Zap,
          title: 'Fast Response',
          description: 'Automatic alarm and notification'
        }
      ],
      systems: {
        title: 'System Features',
        items: [
          'Thermal and optical camera integration',
          'Deep learning smoke/flame detection',
          'Multi-area simultaneous monitoring',
          'Instant SMS and email notification',
          'Fire suppression system automation',
          'Cloud recording and archiving'
        ]
      },
      stats: [
        { value: '0.5s', label: 'Detection Time' },
        { value: '99.8%', label: 'Accuracy' },
        { value: '24/7', label: 'Monitoring' },
        { value: '0', label: 'False Alarms' }
      ]
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-red-50/30 to-slate-50">
      {/* Hero Section with neon effect */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Neon background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection animation="fadeInDown">
            <div className="inline-block mb-6">
              <div className="glass px-6 py-3 rounded-full border border-red-200 shadow-lg shadow-red-500/20">
                <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                  <Flame className="w-4 h-4 animate-pulse" />
                  <span>AI Fire Detection</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900">{t.hero.title}</span>
              <br />
              <span className="text-gradient bg-gradient-to-r from-red-600 via-orange-600 to-red-600">
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
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl shadow-red-500/30 hover-lift"
              >
                {t.hero.cta}
              </Button>
            </Link>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection animation="scaleIn" delay={0.8}>
            <div className="grid grid-cols-4 gap-6 mt-16">
              {t.stats.map((stat, idx) => (
                <GlassCard key={idx} className="p-6 text-center" gradient="orange">
                  <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={idx} animation="fadeInUp" delay={idx * 0.1}>
                  <GlassCard className="p-6 h-full group" gradient="orange" glow>
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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

      {/* System Features */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              {t.systems.title}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.systems.items.map((item, idx) => (
              <AnimatedSection key={idx} animation="fadeInUp" delay={idx * 0.1}>
                <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-red-100">
                  <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FireDetectionPage;
