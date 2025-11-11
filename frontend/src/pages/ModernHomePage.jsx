import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Shield, TrendingUp, Sparkles, CheckCircle2, Star, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParallaxSection from '../components/ParallaxSection';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { Button } from '../components/ui/button';

const ModernHomePage = ({ lang = 'tr' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const content = {
    tr: {
      hero: {
        title: 'PCB Üretiminde',
        titleHighlight: 'Yeni Çağ',
        subtitle: 'Gelişmiş AI destekli analiz ile saniyeler içinde profesyonel PCB teklifi alın',
        cta: 'Hemen Başla',
        ctaSecondary: 'Nasıl Çalışır?',
        stats: [
          { label: 'Müşteri', value: '500+' },
          { label: 'Proje', value: '10K+' },
          { label: 'Memnuniyet', value: '%99' }
        ]
      },
      features: {
        title: 'Neden Aico?',
        subtitle: 'Sektörün en gelişmiş teknolojileri',
        items: [
          {
            icon: Zap,
            title: 'Anında Teklif',
            description: 'AI destekli pricing engine ile 30 saniyede detaylı maliyet analizi'
          },
          {
            icon: Shield,
            title: 'DFM Analizi',
            description: 'Otomatik üretilebilirlik kontrolü ve optimizasyon önerileri'
          },
          {
            icon: TrendingUp,
            title: 'Maliyet Optimizasyonu',
            description: '%20\'ye varan tasarruf fırsatları ile akıllı öneriler'
          },
          {
            icon: Award,
            title: 'Premium Kalite',
            description: 'ISO 9001 sertifikalı üretim ve %99.8 kalite skoru'
          }
        ]
      },
      technology: {
        title: 'Gelişmiş Teknoloji',
        subtitle: 'Apple tarzı mükemmellik',
        description: 'Parallax animasyonlar, glassmorphism tasarım ve AI destekli akıllı sistemler'
      },
      cta: {
        title: 'Projenizi Hayata Geçirin',
        subtitle: 'Ücretsiz teklif alın, farkı görün',
        button: 'Teklif Al'
      }
    },
    en: {
      hero: {
        title: 'New Era in',
        titleHighlight: 'PCB Manufacturing',
        subtitle: 'Get professional PCB quotes in seconds with advanced AI-powered analysis',
        cta: 'Get Started',
        ctaSecondary: 'How it Works?',
        stats: [
          { label: 'Customers', value: '500+' },
          { label: 'Projects', value: '10K+' },
          { label: 'Satisfaction', value: '99%' }
        ]
      },
      features: {
        title: 'Why Aico?',
        subtitle: 'Industry\'s most advanced technologies',
        items: [
          {
            icon: Zap,
            title: 'Instant Quote',
            description: 'AI-powered pricing engine for detailed cost analysis in 30 seconds'
          },
          {
            icon: Shield,
            title: 'DFM Analysis',
            description: 'Automatic manufacturability check and optimization suggestions'
          },
          {
            icon: TrendingUp,
            title: 'Cost Optimization',
            description: 'Smart recommendations with up to 20% savings opportunities'
          },
          {
            icon: Award,
            title: 'Premium Quality',
            description: 'ISO 9001 certified production with 99.8% quality score'
          }
        ]
      },
      technology: {
        title: 'Advanced Technology',
        subtitle: 'Apple-style perfection',
        description: 'Parallax animations, glassmorphism design, and AI-powered intelligent systems'
      },
      cta: {
        title: 'Bring Your Project to Life',
        subtitle: 'Get a free quote, see the difference',
        button: 'Get Quote'
      }
    }
  };

  const t = content[lang] || content.tr;

  return (
    <div ref={containerRef} className="overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <AnimatedSection animation="fadeInDown" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-block mb-6"
            >
              <div className="glass px-6 py-3 rounded-full border border-white/30 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                  <span className="text-gradient-blue">AI-Powered PCB Manufacturing</span>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">{t.hero.title}</span>
              <br />
              <span className="text-gradient bg-gradient-to-r from-blue-600 via-blue-700 to-slate-700 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light">
              {t.hero.subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/instant-quote">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white px-8 py-6 text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover-lift group"
                >
                  {t.hero.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="glass border-2 border-white/30 backdrop-blur-xl px-8 py-6 text-lg rounded-2xl hover-lift"
              >
                {t.hero.ctaSecondary}
              </Button>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection animation="scaleIn" delay={1}>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {t.hero.stats.map((stat, idx) => (
                <GlassCard key={idx} hover={false} className="p-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + idx * 0.1, type: 'spring', stiffness: 100 }}
                  >
                    <p className="text-4xl font-bold text-gradient-blue mb-2">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </motion.div>
                </GlassCard>
              ))}
            </div>
          </AnimatedSection>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Features Section with Parallax */}
      <ParallaxSection speed={-0.2}>
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                  {t.features.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {t.features.subtitle}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.features.items.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <AnimatedSection 
                    key={idx}
                    animation="fadeInUp"
                    delay={idx * 0.1}
                  >
                    <GlassCard className="p-8 h-full group" glow>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </GlassCard>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Technology Showcase with Parallax */}
      <ParallaxSection speed={0.3}>
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fadeInLeft">
                <div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                    {t.technology.title}
                  </h2>
                  <p className="text-2xl text-gradient-blue font-semibold mb-6">
                    {t.technology.subtitle}
                  </p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {t.technology.description}
                  </p>
                  
                  <div className="space-y-4">
                    {['Parallax Animations', 'Glassmorphism UI', 'AI-Powered Analysis', 'Real-time Updates'].map((tech, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <span className="text-lg text-gray-700">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight">
                <div className="relative">
                  <GlassCard className="p-12" gradient="purple">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full animate-pulse" />
                        <div className="flex-1 h-4 bg-gradient-to-r from-blue-500/30 to-transparent rounded" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="flex-1 h-4 bg-gradient-to-r from-purple-500/30 to-transparent rounded" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="flex-1 h-4 bg-gradient-to-r from-pink-500/30 to-transparent rounded" />
                      </div>
                    </div>
                  </GlassCard>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl flex items-center justify-center"
                  >
                    <Sparkles className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection animation="scaleIn">
            <GlassCard className="p-16 text-center bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" gradient="blue">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {t.cta.title}
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                {t.cta.subtitle}
              </p>
              <Link to="/instant-quote">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl shadow-blue-500/25 hover-lift group"
                >
                  {t.cta.button}
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ModernHomePage;
