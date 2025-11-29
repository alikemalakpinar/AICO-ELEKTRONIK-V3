import React, { useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Award,
  Cpu,
  Layers,
  Eye,
  Clock,
  Globe,
  Rocket,
  FileCheck,
  Settings,
  BarChart3,
  Package,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ParallaxSection from '../components/ParallaxSection';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard, { BentoGrid, FeatureCard, StatCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';

// Lazy load the 3D Hero for better performance
const InteractivePCBHero = lazy(() => import('../components/3D/InteractivePCBHero'));

// Hero Loading Fallback
const HeroFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-400">Yükleniyor...</p>
    </div>
  </div>
);

// Bento Feature Item with animation
const BentoFeatureItem = ({ icon: Icon, title, description, gradient, size, delay, link }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className={size === 'large' ? 'col-span-2 row-span-2' : size === 'wide' ? 'col-span-2' : size === 'tall' ? 'row-span-2' : ''}
  >
    <Link to={link || '#'} className="block h-full">
      <GlassCard
        gradient={gradient}
        glow
        spotlight
        noise
        className="h-full p-6 flex flex-col justify-between group cursor-pointer"
      >
        <div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${gradient}-500/30 to-${gradient}-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 text-${gradient}-400`} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
        <motion.div
          className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors mt-4"
          whileHover={{ x: 4 }}
        >
          <span className="text-xs font-medium">Keşfet</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </GlassCard>
    </Link>
  </motion.div>
);

// Process Step for Scrollytelling
const ProcessStep = ({ number, title, description, icon: Icon, isActive }) => (
  <motion.div
    className={`flex items-start gap-4 p-6 rounded-2xl transition-all duration-500 ${
      isActive ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-transparent'
    }`}
    initial={{ opacity: 0.5, x: -20 }}
    animate={{ opacity: isActive ? 1 : 0.5, x: isActive ? 0 : -20 }}
  >
    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
      isActive ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
    }`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-xs font-bold ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
          ADIM {number}
        </span>
      </div>
      <h4 className={`font-semibold mb-1 ${isActive ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
      <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
    </div>
  </motion.div>
);

const ModernHomePage = ({ lang = 'tr' }) => {
  const containerRef = useRef(null);
  const processRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ['start center', 'end center'],
  });

  const content = {
    tr: {
      features: {
        title: 'Neden AICO?',
        subtitle: 'Sektörün en gelişmiş teknolojileri ile fark yaratın',
        items: [
          {
            icon: Zap,
            title: 'AI Anında Teklif',
            description: 'Yapay zeka destekli fiyatlandırma motoru ile 30 saniyede detaylı maliyet analizi alın.',
            gradient: 'blue',
            size: 'large',
            link: '/tr/services/instant-quote',
          },
          {
            icon: Shield,
            title: 'Gerçek Zamanlı DFM',
            description: 'Otomatik üretilebilirlik kontrolü ve hata tespiti.',
            gradient: 'green',
            size: 'default',
            link: '/tr/services/pcb-manufacturing',
          },
          {
            icon: Eye,
            title: '3D Önizleme',
            description: 'Gerber dosyalarınızı 3D olarak görüntüleyin.',
            gradient: 'purple',
            size: 'default',
            link: '/tr/services/instant-quote',
          },
          {
            icon: TrendingUp,
            title: 'Maliyet Optimizasyonu',
            description: 'AI destekli önerilerle %20\'ye varan tasarruf fırsatları.',
            gradient: 'orange',
            size: 'wide',
            link: '/tr/services/pcb-assembly',
          },
          {
            icon: Layers,
            title: '16 Katman Üretim',
            description: 'En karmaşık tasarımlar için çok katmanlı PCB üretimi.',
            gradient: 'cyan',
            size: 'default',
            link: '/tr/resources/capabilities',
          },
          {
            icon: Clock,
            title: '24 Saat Prototip',
            description: 'Acil projeleriniz için ekspres üretim hizmeti.',
            gradient: 'rose',
            size: 'default',
            link: '/tr/services/fast-prototyping',
          },
        ],
      },
      process: {
        title: 'Nasıl Çalışır?',
        subtitle: 'Basit ve hızlı sipariş süreci',
        steps: [
          { icon: FileCheck, title: 'Dosya Yükle', description: 'Gerber, BOM ve yerleşim dosyalarınızı yükleyin.' },
          { icon: Cpu, title: 'AI Analizi', description: 'Sistem tasarımınızı analiz eder ve DFM kontrolü yapar.' },
          { icon: BarChart3, title: 'Teklif Al', description: 'Detaylı fiyatlandırma ve optimizasyon önerileri alın.' },
          { icon: Settings, title: 'Üretim', description: 'ISO 9001 sertifikalı tesislerde üretim başlar.' },
          { icon: Truck, title: 'Teslimat', description: 'Hızlı kargo ile ürünleriniz kapınıza gelir.' },
        ],
      },
      capabilities: {
        title: 'Üretim Yetenekleri',
        subtitle: 'Endüstri standardının ötesinde',
        items: [
          { label: 'Min. Trace/Space', value: '3/3 mil' },
          { label: 'Min. Delik', value: '0.15mm' },
          { label: 'Max Katman', value: '16 Layer' },
          { label: 'Yüzey Kaplama', value: 'ENIG, HASL, OSP' },
          { label: 'Sertifikalar', value: 'ISO 9001, CE, RoHS' },
          { label: 'Teslimat', value: '24 Saat Ekspres' },
        ],
      },
      stats: [
        { label: 'Tamamlanan Proje', value: '5000+', icon: Package, trend: { direction: 'up', value: '%15 bu ay' } },
        { label: 'Mutlu Müşteri', value: '500+', icon: Globe },
        { label: 'Ortalama DFM Skoru', value: '94.5', icon: Award },
        { label: 'Zamanında Teslimat', value: '%99.2', icon: Truck },
      ],
      cta: {
        title: 'Projenizi Hayata Geçirin',
        subtitle: 'Ücretsiz AI destekli teklif alın ve üretim sürecinizi hızlandırın.',
        button: 'Hemen Başla',
      },
    },
    en: {
      features: {
        title: 'Why AICO?',
        subtitle: 'Make a difference with the industry\'s most advanced technologies',
        items: [
          {
            icon: Zap,
            title: 'AI Instant Quote',
            description: 'Get detailed cost analysis in 30 seconds with AI-powered pricing engine.',
            gradient: 'blue',
            size: 'large',
            link: '/en/services/instant-quote',
          },
          {
            icon: Shield,
            title: 'Real-time DFM',
            description: 'Automatic manufacturability check and error detection.',
            gradient: 'green',
            size: 'default',
            link: '/en/services/pcb-manufacturing',
          },
          {
            icon: Eye,
            title: '3D Preview',
            description: 'View your Gerber files in 3D.',
            gradient: 'purple',
            size: 'default',
            link: '/en/services/instant-quote',
          },
          {
            icon: TrendingUp,
            title: 'Cost Optimization',
            description: 'Save up to 20% with AI-powered recommendations.',
            gradient: 'orange',
            size: 'wide',
            link: '/en/services/pcb-assembly',
          },
          {
            icon: Layers,
            title: '16 Layer Production',
            description: 'Multi-layer PCB production for the most complex designs.',
            gradient: 'cyan',
            size: 'default',
            link: '/en/resources/capabilities',
          },
          {
            icon: Clock,
            title: '24 Hour Prototype',
            description: 'Express production service for urgent projects.',
            gradient: 'rose',
            size: 'default',
            link: '/en/services/fast-prototyping',
          },
        ],
      },
      process: {
        title: 'How It Works?',
        subtitle: 'Simple and fast ordering process',
        steps: [
          { icon: FileCheck, title: 'Upload Files', description: 'Upload your Gerber, BOM and placement files.' },
          { icon: Cpu, title: 'AI Analysis', description: 'System analyzes your design and performs DFM check.' },
          { icon: BarChart3, title: 'Get Quote', description: 'Receive detailed pricing and optimization suggestions.' },
          { icon: Settings, title: 'Production', description: 'Production starts in ISO 9001 certified facilities.' },
          { icon: Truck, title: 'Delivery', description: 'Your products arrive at your door with fast shipping.' },
        ],
      },
      capabilities: {
        title: 'Manufacturing Capabilities',
        subtitle: 'Beyond industry standard',
        items: [
          { label: 'Min. Trace/Space', value: '3/3 mil' },
          { label: 'Min. Hole', value: '0.15mm' },
          { label: 'Max Layers', value: '16 Layer' },
          { label: 'Surface Finish', value: 'ENIG, HASL, OSP' },
          { label: 'Certifications', value: 'ISO 9001, CE, RoHS' },
          { label: 'Delivery', value: '24h Express' },
        ],
      },
      stats: [
        { label: 'Completed Projects', value: '5000+', icon: Package, trend: { direction: 'up', value: '+15% this month' } },
        { label: 'Happy Customers', value: '500+', icon: Globe },
        { label: 'Average DFM Score', value: '94.5', icon: Award },
        { label: 'On-time Delivery', value: '99.2%', icon: Truck },
      ],
      cta: {
        title: 'Bring Your Project to Life',
        subtitle: 'Get a free AI-powered quote and accelerate your production process.',
        button: 'Get Started',
      },
    },
  };

  const t = content[lang] || content.tr;

  // Calculate active step based on scroll
  const activeStep = Math.min(
    Math.floor(processProgress.get() * t.process.steps.length),
    t.process.steps.length - 1
  );

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* 3D Interactive Hero Section */}
      <Suspense fallback={<HeroFallback />}>
        <InteractivePCBHero lang={lang} />
      </Suspense>

      {/* Bento Grid Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {lang === 'tr' ? 'Fütüristik Teknoloji' : 'Futuristic Technology'}
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {t.features.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.features.subtitle}</p>
            </div>
          </AnimatedSection>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {t.features.items.map((feature, idx) => (
              <BentoFeatureItem
                key={idx}
                {...feature}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Dark Theme */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  trend={stat.trend}
                  gradient={['blue', 'green', 'purple', 'orange'][idx]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Scrollytelling */}
      <section ref={processRef} className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {t.process.title}
              </h2>
              <p className="text-xl text-gray-600">{t.process.subtitle}</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Steps List */}
            <div className="space-y-4">
              {t.process.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProcessStep
                    number={idx + 1}
                    {...step}
                    isActive={idx <= activeStep}
                  />
                </motion.div>
              ))}
            </div>

            {/* Visual Representation */}
            <AnimatedSection animation="fadeInRight">
              <div className="relative">
                <GlassCard
                  gradient="blue"
                  glow
                  spotlight
                  className="p-8 bg-gradient-to-br from-slate-900 to-slate-800"
                >
                  {/* PCB Visualization Mockup */}
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-green-800 to-green-900 relative overflow-hidden">
                    {/* Circuit Pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 200 200">
                      <defs>
                        <pattern id="pcb-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M10 0 V15 H30 V25 H40" stroke="#c4b52a" strokeWidth="1.5" fill="none" />
                          <circle cx="10" cy="15" r="2" fill="#c4b52a" />
                          <circle cx="30" cy="25" r="2" fill="#c4b52a" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#pcb-pattern)" />
                    </svg>

                    {/* Animated Elements */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-16 h-16 bg-gray-900 rounded-lg shadow-lg"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-1/2 right-1/4 w-12 h-12 bg-gray-800 rounded-full shadow-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-1/4 left-1/3 w-20 h-8 bg-gray-900 rounded shadow-lg flex items-center justify-around px-2"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1.5 h-4 bg-gray-600" />
                      ))}
                    </motion.div>

                    {/* Status Indicator */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white/70 text-xs">
                          {lang === 'tr' ? 'İşleniyor...' : 'Processing...'}
                        </span>
                      </div>
                      <span className="text-white/50 text-xs">
                        {lang === 'tr' ? 'DFM Skoru: 96.5' : 'DFM Score: 96.5'}
                      </span>
                    </div>
                  </div>
                </GlassCard>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket className="w-4 h-4 inline mr-1" />
                  {lang === 'tr' ? 'AI Destekli' : 'AI Powered'}
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t.capabilities.title}
              </h2>
              <p className="text-xl text-gray-400">{t.capabilities.subtitle}</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.capabilities.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <GlassCard
                  gradient={['blue', 'green', 'purple', 'orange', 'cyan', 'rose'][idx]}
                  noise
                  spotlight
                  className="p-4 text-center h-full"
                >
                  <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
                  <p className="text-gray-400 text-xs">{item.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection animation="scaleIn">
            <GlassCard
              gradient="blue"
              glow
              spotlight
              noise
              className="p-12 md:p-16 text-center bg-gradient-to-br from-slate-900/95 to-slate-800/95"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t.cta.title}
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                {t.cta.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={`/${lang}/services/instant-quote`}>
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                  >
                    {t.cta.button}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to={`/${lang}/contact`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/20 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-2xl transition-all duration-300"
                  >
                    {lang === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                {['ISO 9001', 'CE Certified', 'RoHS Compliant', 'IPC-A-610'].map((badge, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{badge}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ModernHomePage;
