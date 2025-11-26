import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Award, TrendingUp, Play, Pause } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from '../../utils/i18n';

// 3D PCB Visualization Component
const PCB3DVisualization = () => {
  const [rotation, setRotation] = useState({ x: 15, y: -15 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 10;
    const y = (e.clientX - rect.left - rect.width / 2) / 10;
    setRotation({ x: 15 + x, y: -15 + y });
  };

  return (
    <motion.div
      className="relative w-full h-80 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotation({ x: 15, y: -15 });
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* PCB Board */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-64 h-48 rounded-lg shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #15803d 0%, #166534 50%, #14532d 100%)',
              transform: 'translateZ(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
            }}
          >
            {/* Circuit Traces */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 192">
              {/* Horizontal traces */}
              <path d="M20 40 H100 L110 50 H180" stroke="#c4b52a" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M20 80 H60 L70 90 H120 L130 80 H200" stroke="#c4b52a" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M40 120 H80 L90 130 H160 L170 120 H236" stroke="#c4b52a" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M20 160 H140 L150 150 H220" stroke="#c4b52a" strokeWidth="2" fill="none" opacity="0.8" />

              {/* Vertical traces */}
              <path d="M60 20 V60 L70 70 V120" stroke="#c4b52a" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M140 30 V80 L150 90 V150" stroke="#c4b52a" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M200 40 V100 L190 110 V170" stroke="#c4b52a" strokeWidth="2" fill="none" opacity="0.8" />

              {/* Via holes */}
              <circle cx="60" cy="60" r="4" fill="#c4b52a" />
              <circle cx="140" cy="80" r="4" fill="#c4b52a" />
              <circle cx="200" cy="100" r="4" fill="#c4b52a" />
              <circle cx="100" cy="120" r="4" fill="#c4b52a" />
              <circle cx="180" cy="150" r="4" fill="#c4b52a" />
            </svg>

            {/* Components */}
            <motion.div
              className="absolute top-6 left-8 w-12 h-8 bg-gray-900 rounded-sm shadow-md"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transform: 'translateZ(5px)' }}
            >
              <div className="absolute inset-1 border border-gray-700 rounded-sm" />
            </motion.div>

            <motion.div
              className="absolute top-16 right-10 w-8 h-8 bg-gray-800 rounded-full shadow-md"
              animate={{ boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 8px rgba(59, 130, 246, 0.3)', '0 0 0 0 rgba(59, 130, 246, 0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transform: 'translateZ(8px)' }}
            />

            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-sm shadow-md"
              style={{ transform: 'translateZ(5px) translateX(-50%)' }}
            >
              <div className="flex justify-around items-center h-full px-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-gray-600" />
                ))}
              </div>
            </div>

            {/* LED indicators */}
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ transform: 'translateZ(10px)', boxShadow: '0 0 8px #4ade80' }}
            />
            <motion.div
              className="absolute top-4 right-8 w-2 h-2 rounded-full bg-blue-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ transform: 'translateZ(10px)', boxShadow: '0 0 8px #60a5fa' }}
            />
          </div>
        </div>

        {/* Reflection */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'rotateX(180deg) translateY(-100%) translateZ(-40px)' }}
        >
          <div
            className="w-64 h-48 rounded-lg opacity-20 blur-sm"
            style={{
              background: 'linear-gradient(135deg, #15803d 0%, #166534 50%, #14532d 100%)',
              maskImage: 'linear-gradient(to bottom, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            }}
          />
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

const PremiumHero = ({ lang }) => {
  const t = useTranslation(lang);
  const [isVisible, setIsVisible] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Zap,
      value: t.hero.stats.projects,
      label: t.hero.stats.projectsLabel,
      color: '#1554F6',
    },
    {
      icon: Shield,
      value: t.hero.stats.experience,
      label: t.hero.stats.experienceLabel,
      color: '#10B981',
    },
    {
      icon: Award,
      value: t.hero.stats.delivery,
      label: t.hero.stats.deliveryLabel,
      color: '#F59E0B',
    },
    {
      icon: TrendingUp,
      value: t.hero.stats.satisfaction,
      label: t.hero.stats.satisfactionLabel,
      color: '#8B5CF6',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"
    >
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Simulated video effect with animated gradient */}
        <motion.div
          className="absolute inset-0"
          style={{ y, opacity }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 z-10" />

          {/* Animated tech pattern background */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)
                `,
              }}
            />
          </div>

          {/* Circuit pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 10 H40 V40 H70 V70 H90" stroke="#60a5fa" strokeWidth="0.5" fill="none" />
                <path d="M50 10 V30 H80 V60" stroke="#60a5fa" strokeWidth="0.5" fill="none" />
                <circle cx="40" cy="40" r="2" fill="#60a5fa" />
                <circle cx="70" cy="70" r="2" fill="#60a5fa" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>

          {/* Animated gradient blobs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium backdrop-blur-sm"
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
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {t.hero.title.split(',').map((part, idx) => (
                  <span key={idx} className="block">
                    {idx === 0 ? (
                      <>
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          {part}
                        </span>
                        ,
                      </>
                    ) : (
                      part
                    )}
                  </span>
                ))}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.p
                className="text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {t.hero.description}
              </motion.p>
            </div>

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
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-7 text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                <Link to={`/${lang}/products`}>
                  {t.hero.cta1}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={22} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-7 text-lg rounded-2xl transition-all duration-300"
              >
                <Link to={`/${lang}/services/instant-quote`}>
                  <Zap className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={22} />
                  {t.hero.cta2}
                </Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap gap-6 pt-4"
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
                  <Shield size={18} className="text-green-400" />
                  <span className="font-medium">{badge}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D PCB Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 3D PCB Component */}
            <PCB3DVisualization />

            {/* Stats Cards - Floating around PCB */}
            <div className="absolute -bottom-8 left-0 right-0">
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {stats.slice(0, 2).map((stat, idx) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${stat.color}20` }}
                        >
                          <IconComponent size={20} style={{ color: stat.color }} />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-20">
        <svg className="w-full h-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 50C240 20 480 80 720 50C960 20 1200 80 1440 50V100H0V50Z" fill="white" fillOpacity="0.03" />
          <path d="M0 70C240 85 480 55 720 70C960 85 1200 55 1440 70V100H0V70Z" fill="white" />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20"
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

export default PremiumHero;
