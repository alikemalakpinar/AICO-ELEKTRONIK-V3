import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Layers,
  Eye,
  Cpu,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from '../../utils/i18n';

// Lazy load the 3D scene for better initial load
const PCB3DScene = lazy(() => import('./PCB3DScene'));

// Fallback loading component
const PCBLoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl backdrop-blur-sm">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">3D Model Yükleniyor...</p>
    </div>
  </div>
);

// Control Button Component
const ControlButton = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
      active
        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon size={16} />
    <span className="hidden sm:inline">{label}</span>
  </motion.button>
);

// Floating Stat Card
const StatCard = ({ icon: Icon, value, label, color, delay }) => (
  <motion.div
    className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-colors"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 100 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </div>
    </div>
  </motion.div>
);

// Feature Badge
const FeatureBadge = ({ children, delay }) => (
  <motion.div
    className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 text-xs font-medium backdrop-blur-sm"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

const InteractivePCBHero = ({ lang = 'tr' }) => {
  const t = useTranslation(lang);
  const [exploded, setExploded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
    // Delay 3D loading for smoother initial render
    const timer = setTimeout(() => setIs3DLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: Zap,
      value: t.hero?.stats?.projects || '5000+',
      label: t.hero?.stats?.projectsLabel || 'Proje',
      color: '#1554F6',
    },
    {
      icon: Shield,
      value: t.hero?.stats?.experience || '25+',
      label: t.hero?.stats?.experienceLabel || 'Yıl Deneyim',
      color: '#10B981',
    },
    {
      icon: Award,
      value: t.hero?.stats?.delivery || '%99',
      label: t.hero?.stats?.deliveryLabel || 'Zamanında Teslimat',
      color: '#F59E0B',
    },
    {
      icon: TrendingUp,
      value: t.hero?.stats?.satisfaction || '%98',
      label: t.hero?.stats?.satisfactionLabel || 'Müşteri Memnuniyeti',
      color: '#8B5CF6',
    },
  ];

  const features = [
    { icon: Cpu, text: lang === 'tr' ? 'AI Destekli Analiz' : 'AI-Powered Analysis' },
    { icon: Layers, text: lang === 'tr' ? '16 Katmana Kadar' : 'Up to 16 Layers' },
    { icon: Eye, text: lang === 'tr' ? 'Gerçek Zamanlı DFM' : 'Real-time DFM' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"
    >
      {/* Animated Background */}
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80 z-10" />

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -60, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Circuit Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-circuit" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              <path d="M15 15 H60 V60 H105 V105 H135" stroke="#60a5fa" strokeWidth="0.5" fill="none" />
              <path d="M75 15 V45 H120 V90" stroke="#60a5fa" strokeWidth="0.5" fill="none" />
              <circle cx="60" cy="60" r="3" fill="#60a5fa" />
              <circle cx="105" cy="105" r="3" fill="#60a5fa" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-circuit)" />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Zap size={16} className="mr-2" />
              </motion.div>
              {lang === 'tr' ? '25 Yıldır Endüstri Lideri' : 'Industry Leader for 25 Years'}
            </motion.div>

            {/* Main Heading */}
            <div>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {lang === 'tr' ? 'Geleceğin Elektroniği' : 'Future of Electronics'}
                </span>
                <br />
                <span className="text-white">
                  {lang === 'tr' ? 'Bugün Başlıyor' : 'Starts Today'}
                </span>
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {lang === 'tr'
                  ? 'Yapay zeka destekli PCB tasarım analizi, gerçek zamanlı DFM kontrolü ve akıllı tedarik zinciri yönetimi ile elektronik üretimde yeni bir çağ.'
                  : 'A new era in electronics manufacturing with AI-powered PCB design analysis, real-time DFM checks, and intelligent supply chain management.'}
              </motion.p>
            </div>

            {/* Feature Badges */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {features.map((feature, idx) => (
                <FeatureBadge key={idx} delay={0.7 + idx * 0.1}>
                  <feature.icon size={14} className="mr-1.5" />
                  {feature.text}
                </FeatureBadge>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                <Link to={`/${lang}/services/instant-quote`}>
                  {lang === 'tr' ? 'Hızlı Teklif Al' : 'Get Instant Quote'}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={22} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg rounded-2xl transition-all duration-300"
              >
                <Link to={`/${lang}/products`}>
                  <Eye className="mr-2" size={20} />
                  {lang === 'tr' ? 'Ürünleri Keşfet' : 'Explore Products'}
                </Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {['ISO 9001', 'CE', 'RoHS', 'IPC-A-610'].map((badge, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center space-x-2 text-gray-400"
                  whileHover={{ scale: 1.05, color: '#fff' }}
                >
                  <Shield size={16} className="text-green-400" />
                  <span className="font-medium text-sm">{badge}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D PCB */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 3D Viewer Container */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl opacity-50" />

              {/* 3D Scene */}
              <div className="relative w-full h-full min-h-[350px] lg:min-h-[450px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                <Suspense fallback={<PCBLoadingFallback />}>
                  {is3DLoaded && <PCB3DScene exploded={exploded} />}
                </Suspense>

                {/* Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                  <ControlButton
                    icon={Layers}
                    label={lang === 'tr' ? 'Patlatılmış Görünüm' : 'Exploded View'}
                    active={exploded}
                    onClick={() => setExploded(!exploded)}
                  />
                  <ControlButton
                    icon={RotateCcw}
                    label={lang === 'tr' ? 'Sıfırla' : 'Reset'}
                    active={false}
                    onClick={() => setExploded(false)}
                  />
                </div>

                {/* Hint */}
                <div className="absolute top-4 left-4 right-4 flex justify-center">
                  <motion.div
                    className="bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-gray-400 border border-white/10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    {lang === 'tr'
                      ? '🖱️ Döndürmek için sürükleyin, bileşenlere tıklayın'
                      : '🖱️ Drag to rotate, click components for info'}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-8 left-0 right-0 px-4">
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {stats.slice(0, 2).map((stat, idx) => (
                  <StatCard key={idx} {...stat} delay={1 + idx * 0.1} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Row - Mobile */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 lg:mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} delay={1.2 + idx * 0.1} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50C240 20 480 80 720 50C960 20 1200 80 1440 50V100H0V50Z"
            fill="white"
            fillOpacity="0.03"
          />
          <path
            d="M0 70C240 85 480 55 720 70C960 85 1200 55 1440 70V100H0V70Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default InteractivePCBHero;
