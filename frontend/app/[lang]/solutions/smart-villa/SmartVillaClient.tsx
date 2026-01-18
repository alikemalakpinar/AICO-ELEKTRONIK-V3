'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Sun,
  Moon,
  Shield,
  ShieldAlert,
  Thermometer,
  Blinds,
  Lightbulb,
  Wind,
  Droplets,
  Lock,
  Unlock,
  Music,
  Volume2,
  Power,
  Wifi,
  Battery,
  ChevronRight,
  ArrowRight,
  Zap,
  Eye,
  Home,
  Settings,
  Bell,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import dynamic from 'next/dynamic';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

// Lazy load the Villa Dashboard Demo with proper skeleton
const VillaDashboardDemo = dynamic(
  () => import('@/components/products/villa/VillaDashboardDemo'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] animate-pulse rounded-3xl bg-gradient-to-br from-onyx-800/50 to-onyx-900/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-engineer-500/20 flex items-center justify-center">
            <Home className="w-8 h-8 text-engineer-500 animate-pulse" />
          </div>
          <div className="text-sm text-muted-foreground">Loading dashboard...</div>
        </div>
      </div>
    ),
  }
);

interface SmartVillaClientProps {
  lang: Locale;
}

// Control modes
type ControlMode = 'home' | 'lights' | 'climate' | 'security' | 'entertainment';

// Room data
interface Room {
  id: string;
  name: { tr: string; en: string };
  temperature: number;
  humidity: number;
  lights: number;
  occupied: boolean;
}

// Scene presets
interface ScenePreset {
  id: string;
  name: { tr: string; en: string };
  icon: React.ElementType;
  color: string;
  description: { tr: string; en: string };
}

export default function SmartVillaClient({ lang }: SmartVillaClientProps) {
  const t = getTranslations(lang);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile optimization - disable heavy effects on mobile
  const { shouldUseLiteMode, isMobile, prefersReducedMotion } = useMobileOptimization();

  // State for smart home controls
  const [activeMode, setActiveMode] = useState<ControlMode>('home');
  const [ambientColor, setAmbientColor] = useState('#F97316');
  const [blindsOpen, setBlindsOpen] = useState(70);
  const [securityMode, setSecurityMode] = useState<'home' | 'away' | 'night'>('home');
  const [lightsOn, setLightsOn] = useState(true);
  const [temperature, setTemperature] = useState(22);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animations - DISABLED on mobile for performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // On mobile, don't animate hero based on scroll (reduces GPU load)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], shouldUseLiteMode ? [1, 1] : [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], shouldUseLiteMode ? [1, 1] : [1, 0.95]);

  // Animation variants for mobile optimization
  const mobileOptimizedTransition = shouldUseLiteMode
    ? { duration: 0.15 }
    : { type: 'spring', stiffness: 300, damping: 25 };

  // Rooms data
  const rooms: Room[] = [
    { id: 'living', name: { tr: 'Oturma Odasi', en: 'Living Room' }, temperature: 22, humidity: 45, lights: 80, occupied: true },
    { id: 'master', name: { tr: 'Yatak Odasi', en: 'Master Bedroom' }, temperature: 20, humidity: 50, lights: 0, occupied: false },
    { id: 'kitchen', name: { tr: 'Mutfak', en: 'Kitchen' }, temperature: 21, humidity: 55, lights: 100, occupied: true },
    { id: 'office', name: { tr: 'Ofis', en: 'Home Office' }, temperature: 23, humidity: 40, lights: 60, occupied: false },
    { id: 'pool', name: { tr: 'Havuz', en: 'Pool Area' }, temperature: 26, humidity: 65, lights: 30, occupied: false },
    { id: 'garage', name: { tr: 'Garaj', en: 'Garage' }, temperature: 18, humidity: 35, lights: 0, occupied: false },
  ];

  // Scene presets
  const scenePresets: ScenePreset[] = [
    { id: 'morning', name: { tr: 'Sabah', en: 'Morning' }, icon: Sun, color: '#FBBF24', description: { tr: 'Perdeleri ac, isiklari artir', en: 'Open blinds, brighten lights' } },
    { id: 'focus', name: { tr: 'Odaklanma', en: 'Focus' }, icon: Eye, color: '#3B82F6', description: { tr: 'Dikkat dagitici ogeleri kapat', en: 'Minimize distractions' } },
    { id: 'movie', name: { tr: 'Film', en: 'Movie' }, icon: Moon, color: '#8B5CF6', description: { tr: 'Isiklari kis, perdeleri kapat', en: 'Dim lights, close blinds' } },
    { id: 'away', name: { tr: 'Disarida', en: 'Away' }, icon: Shield, color: '#EF4444', description: { tr: 'Guvenligi aktif et', en: 'Activate security' } },
  ];

  // Handle scene activation
  const activateScene = (scene: ScenePreset) => {
    setAmbientColor(scene.color);
    if (scene.id === 'morning') {
      setBlindsOpen(100);
      setLightsOn(true);
      setSecurityMode('home');
    } else if (scene.id === 'movie') {
      setBlindsOpen(0);
      setLightsOn(true);
    } else if (scene.id === 'away') {
      setSecurityMode('away');
      setLightsOn(false);
    } else if (scene.id === 'focus') {
      setBlindsOpen(30);
    }
  };

  // Control panel modes
  const controlModes = [
    { id: 'home' as ControlMode, icon: Home, label: { tr: 'Ana Sayfa', en: 'Home' } },
    { id: 'lights' as ControlMode, icon: Lightbulb, label: { tr: 'Isiklar', en: 'Lights' } },
    { id: 'climate' as ControlMode, icon: Thermometer, label: { tr: 'Iklim', en: 'Climate' } },
    { id: 'security' as ControlMode, icon: Shield, label: { tr: 'Guvenlik', en: 'Security' } },
    { id: 'entertainment' as ControlMode, icon: Music, label: { tr: 'Eglence', en: 'Media' } },
  ];

  // Stats for hero section
  const stats = [
    { value: '47', label: lang === 'tr' ? 'Sensor' : 'Sensors' },
    { value: '24', label: lang === 'tr' ? 'Oda' : 'Rooms' },
    { value: '120+', label: lang === 'tr' ? 'Otomasyon' : 'Automations' },
    { value: '<1s', label: lang === 'tr' ? 'Tepki' : 'Response' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-onyx-900">
      {/* Ambient Background Effect - DISABLED on mobile for GPU performance */}
      {!shouldUseLiteMode && (
        <div
          className="fixed inset-0 pointer-events-none transition-colors duration-1000"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${ambientColor}08 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Hero Section - POV Perspective */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Villa Interior Background */}
        <div className="absolute inset-0">
          {/* Gradient overlay simulating interior view */}
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: `
                linear-gradient(180deg,
                  ${blindsOpen > 50 ? 'rgba(251, 191, 36, 0.05)' : 'rgba(0, 0, 0, 0.3)'} 0%,
                  transparent 30%,
                  transparent 70%,
                  rgba(15, 15, 15, 0.9) 100%
                )
              `,
            }}
          />

          {/* Window effect based on blinds */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-amber-500/10 to-transparent"
            animate={{ opacity: blindsOpen / 100 }}
            transition={{ duration: 0.5 }}
          />

          {/* Interior light effect - DISABLED on mobile */}
          {!shouldUseLiteMode && (
            <motion.div
              className="absolute inset-0"
              animate={{
                background: lightsOn
                  ? `radial-gradient(circle at 30% 40%, ${ambientColor}15 0%, transparent 50%),
                     radial-gradient(circle at 70% 60%, ${ambientColor}10 0%, transparent 40%)`
                  : 'transparent',
              }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Grid pattern for depth */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'bottom',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="w-8 h-px bg-engineer-500" />
              <span className="text-engineer-500 font-mono text-xs tracking-widest uppercase">
                Smart Living Experience
              </span>
              <span className="w-8 h-px bg-engineer-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-offwhite-400 mb-6 tracking-tight"
            >
              {lang === 'tr' ? 'Evinizin Icinden' : 'From Inside Your Home'}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-offwhite-600 max-w-2xl mx-auto mb-12"
            >
              {lang === 'tr'
                ? 'Gorunmez teknoloji, sezgisel kontrol. Her dokunuşta eviniz sizinle konusur.'
                : 'Invisible technology, intuitive control. Your home speaks to you with every touch.'}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-8 md:gap-16 mb-16"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-mono text-3xl md:text-4xl font-bold text-engineer-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-offwhite-700 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-offwhite-700 text-xs uppercase tracking-widest">
                {lang === 'tr' ? 'Kontrol Panelini Kesfet' : 'Explore Control Panel'}
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-px h-8 bg-gradient-to-b from-engineer-500/50 to-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Control Panel Section */}
      <section className="relative py-32 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'KONTROL PANELI' : 'CONTROL PANEL'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Tek Bir Dokunusla' : 'With A Single Touch'}
            </h2>
            <p className="text-lg text-offwhite-600 max-w-xl mx-auto">
              {lang === 'tr'
                ? 'Tum ev sistemlerinizi tek bir arayuzden yonetin.'
                : 'Manage all your home systems from a single interface.'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Control Panel - Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative"
            >
              <div
                className="relative p-8 rounded-3xl border border-white/10 overflow-hidden"
                style={{
                  background: shouldUseLiteMode
                    ? 'rgba(20, 20, 20, 0.98)' // Solid background on mobile - no blur
                    : 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%)',
                  backdropFilter: shouldUseLiteMode ? 'none' : 'blur(20px)',
                  WebkitBackdropFilter: shouldUseLiteMode ? 'none' : 'blur(20px)',
                  boxShadow: shouldUseLiteMode
                    ? '0 4px 20px rgba(0,0,0,0.3)'
                    : `0 0 60px ${ambientColor}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
              >
                {/* Status Bar */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Wifi size={14} className="text-success-500" />
                      <span className="text-xs text-offwhite-600">Connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery size={14} className="text-success-500" />
                      <span className="text-xs text-offwhite-600">Hub Online</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-offwhite-600 font-mono">
                      {currentTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <Bell size={18} className="text-offwhite-500" />
                      {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-engineer-500 text-[10px] text-white flex items-center justify-center">
                          {notifications}
                        </span>
                      )}
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <Settings size={18} className="text-offwhite-500" />
                    </button>
                  </div>
                </div>

                {/* Mode Navigation */}
                <div className="flex gap-2 mb-8">
                  {controlModes.map((mode) => {
                    const isActive = activeMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-engineer-500 text-white shadow-lg shadow-engineer-500/25'
                            : 'bg-white/5 text-offwhite-500 hover:bg-white/10'
                        }`}
                      >
                        <mode.icon size={16} />
                        <span className="hidden sm:inline">{mode.label[lang]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Control Content based on mode */}
                <AnimatePresence mode="wait">
                  {activeMode === 'home' && (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Scene Presets */}
                      <div>
                        <h3 className="text-sm text-offwhite-600 mb-4 font-medium">
                          {lang === 'tr' ? 'Hizli Sahneler' : 'Quick Scenes'}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {scenePresets.map((scene) => (
                            <button
                              key={scene.id}
                              onClick={() => activateScene(scene)}
                              className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all text-left"
                            >
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${scene.color}20` }}
                              >
                                <scene.icon size={20} style={{ color: scene.color }} />
                              </div>
                              <div className="text-sm font-medium text-offwhite-400 mb-1">
                                {scene.name[lang]}
                              </div>
                              <div className="text-xs text-offwhite-700">
                                {scene.description[lang]}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Room Overview */}
                      <div>
                        <h3 className="text-sm text-offwhite-600 mb-4 font-medium">
                          {lang === 'tr' ? 'Odalar' : 'Rooms'}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {rooms.slice(0, 6).map((room) => (
                            <button
                              key={room.id}
                              onClick={() => setSelectedRoom(room.id)}
                              className={`p-4 rounded-xl transition-all text-left ${
                                selectedRoom === room.id
                                  ? 'bg-engineer-500/20 border border-engineer-500/30'
                                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-offwhite-400">
                                  {room.name[lang]}
                                </span>
                                {room.occupied && (
                                  <span className="w-2 h-2 rounded-full bg-success-500" />
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-offwhite-600">
                                <span className="flex items-center gap-1">
                                  <Thermometer size={12} />
                                  {room.temperature}°C
                                </span>
                                <span className="flex items-center gap-1">
                                  <Lightbulb size={12} />
                                  {room.lights}%
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeMode === 'lights' && (
                    <motion.div
                      key="lights"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Master Light Control */}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${lightsOn ? 'bg-amber-500/20' : 'bg-white/10'}`}>
                            <Lightbulb size={24} className={lightsOn ? 'text-amber-500' : 'text-offwhite-600'} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-offwhite-400">
                              {lang === 'tr' ? 'Tum Isiklar' : 'All Lights'}
                            </div>
                            <div className="text-xs text-offwhite-600">
                              {lightsOn ? (lang === 'tr' ? 'Acik' : 'On') : (lang === 'tr' ? 'Kapali' : 'Off')}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setLightsOn(!lightsOn)}
                          className={`w-14 h-8 rounded-full transition-all ${lightsOn ? 'bg-engineer-500' : 'bg-white/20'}`}
                        >
                          <motion.div
                            className="w-6 h-6 rounded-full bg-white shadow-lg"
                            animate={{ x: lightsOn ? 24 : 4 }}
                            transition={shouldUseLiteMode ? { duration: 0.1 } : { type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      {/* Blinds Control */}
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Blinds size={20} className="text-offwhite-500" />
                            <span className="text-sm font-medium text-offwhite-400">
                              {lang === 'tr' ? 'Perdeler' : 'Blinds'}
                            </span>
                          </div>
                          <span className="text-sm font-mono text-engineer-500">{blindsOpen}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={blindsOpen}
                          onChange={(e) => setBlindsOpen(parseInt(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-engineer-500 [&::-webkit-slider-thumb]:shadow-lg"
                        />
                      </div>

                      {/* Ambient Color */}
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3 mb-4">
                          <Sun size={20} className="text-offwhite-500" />
                          <span className="text-sm font-medium text-offwhite-400">
                            {lang === 'tr' ? 'Ambiyans Rengi' : 'Ambient Color'}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          {['#F97316', '#EF4444', '#8B5CF6', '#3B82F6', '#10B981', '#FBBF24'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setAmbientColor(color)}
                              className={`w-10 h-10 rounded-full transition-all ${ambientColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-onyx-900 scale-110' : ''}`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeMode === 'climate' && (
                    <motion.div
                      key="climate"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Temperature Control */}
                      <div className="p-6 rounded-xl bg-white/5 text-center">
                        <div className="text-6xl font-mono font-bold text-offwhite-400 mb-4">
                          {temperature}
                          <span className="text-2xl text-offwhite-600">°C</span>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => setTemperature(Math.max(16, temperature - 1))}
                            className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 text-2xl hover:bg-blue-500/30 transition-colors"
                          >
                            -
                          </button>
                          <div className="text-sm text-offwhite-600">
                            {lang === 'tr' ? 'Hedef Sicaklik' : 'Target Temperature'}
                          </div>
                          <button
                            onClick={() => setTemperature(Math.min(30, temperature + 1))}
                            className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 text-2xl hover:bg-red-500/30 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Climate Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 text-center">
                          <Wind size={24} className="text-cyan-400 mx-auto mb-2" />
                          <div className="text-lg font-mono text-offwhite-400">Good</div>
                          <div className="text-xs text-offwhite-600">{lang === 'tr' ? 'Hava Kalitesi' : 'Air Quality'}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 text-center">
                          <Droplets size={24} className="text-blue-400 mx-auto mb-2" />
                          <div className="text-lg font-mono text-offwhite-400">45%</div>
                          <div className="text-xs text-offwhite-600">{lang === 'tr' ? 'Nem' : 'Humidity'}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 text-center">
                          <Thermometer size={24} className="text-orange-400 mx-auto mb-2" />
                          <div className="text-lg font-mono text-offwhite-400">23°C</div>
                          <div className="text-xs text-offwhite-600">{lang === 'tr' ? 'Mevcut' : 'Current'}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeMode === 'security' && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Security Mode Selection */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: 'home', icon: Unlock, label: { tr: 'Evde', en: 'Home' }, color: '#10B981' },
                          { id: 'away', icon: Lock, label: { tr: 'Disarida', en: 'Away' }, color: '#EF4444' },
                          { id: 'night', icon: Moon, label: { tr: 'Gece', en: 'Night' }, color: '#8B5CF6' },
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() => setSecurityMode(mode.id as typeof securityMode)}
                            className={`p-6 rounded-xl text-center transition-all ${
                              securityMode === mode.id
                                ? 'bg-white/10 border-2'
                                : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                            }`}
                            style={{ borderColor: securityMode === mode.id ? mode.color : 'transparent' }}
                          >
                            <mode.icon
                              size={32}
                              className="mx-auto mb-3"
                              style={{ color: securityMode === mode.id ? mode.color : '#9ca3af' }}
                            />
                            <div className="text-sm font-medium text-offwhite-400">
                              {mode.label[lang]}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Security Status */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-success-500/10 to-transparent border border-success-500/20">
                        <div className="flex items-center gap-3">
                          <ShieldAlert size={24} className="text-success-500" />
                          <div>
                            <div className="text-sm font-medium text-offwhite-400">
                              {lang === 'tr' ? 'Sistem Durumu' : 'System Status'}
                            </div>
                            <div className="text-xs text-success-400">
                              {lang === 'tr' ? 'Tum sistemler aktif ve calisiyor' : 'All systems active and running'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeMode === 'entertainment' && (
                    <motion.div
                      key="entertainment"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Music Control */}
                      <div className="p-6 rounded-xl bg-white/5">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                            <Music size={32} className="text-purple-400" />
                          </div>
                          <div>
                            <div className="text-sm text-offwhite-600">{lang === 'tr' ? 'Simdi Caliniyor' : 'Now Playing'}</div>
                            <div className="text-lg font-medium text-offwhite-400">Ambient Sounds</div>
                            <div className="text-sm text-offwhite-600">Home Playlist</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Volume2 size={20} className="text-offwhite-500" />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="60"
                            className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                          />
                          <span className="text-xs text-offwhite-600 w-8">60%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Side Panel - House Map / Status */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Digital House Map */}
              <div
                className="relative p-6 rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: shouldUseLiteMode
                    ? 'rgba(20, 20, 20, 0.98)'
                    : 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%)',
                }}
              >
                <h3 className="text-sm font-medium text-offwhite-500 mb-4">
                  {lang === 'tr' ? 'Kat Plani' : 'Floor Plan'}
                </h3>

                {/* Simplified house wireframe */}
                <div className="aspect-square relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* House outline */}
                    <path
                      d="M10 50 L50 15 L90 50 L90 90 L10 90 Z"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                    />
                    {/* Room divisions */}
                    <line x1="50" y1="50" x2="50" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                    {/* Active room indicators */}
                    {rooms.map((room, idx) => {
                      const positions = [
                        { x: 30, y: 60 },
                        { x: 70, y: 60 },
                        { x: 30, y: 80 },
                        { x: 70, y: 80 },
                        { x: 50, y: 40 },
                        { x: 50, y: 95 },
                      ];
                      const pos = positions[idx];
                      return (
                        <g key={room.id}>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={room.occupied ? 4 : 3}
                            fill={room.occupied ? ambientColor : 'rgba(255,255,255,0.2)'}
                            className="transition-all duration-500"
                          >
                            {room.occupied && (
                              <animate
                                attributeName="opacity"
                                values="1;0.5;1"
                                dur="2s"
                                repeatCount="indefinite"
                              />
                            )}
                          </circle>
                          {room.lights > 0 && (
                            <circle
                              cx={pos.x}
                              cy={pos.y}
                              r={8}
                              fill={`${ambientColor}20`}
                              className="transition-all duration-500"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 text-xs text-offwhite-600">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ambientColor }} />
                    <span>{lang === 'tr' ? 'Aktif' : 'Active'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span>{lang === 'tr' ? 'Pasif' : 'Inactive'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <Power size={18} className="text-success-500 mb-2" />
                  <div className="text-lg font-mono text-offwhite-400">2.4 kW</div>
                  <div className="text-xs text-offwhite-600">{lang === 'tr' ? 'Tuketim' : 'Usage'}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <Zap size={18} className="text-amber-500 mb-2" />
                  <div className="text-lg font-mono text-offwhite-400">-18%</div>
                  <div className="text-xs text-offwhite-600">{lang === 'tr' ? 'Tasarruf' : 'Savings'}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Demo Section */}
      <section className="py-20 dark:bg-onyx-900 light:bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'İNTERAKTİF DEMO' : 'INTERACTIVE DEMO'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {lang === 'tr' ? 'Tablet Kontrol Paneli' : 'Tablet Control Panel'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Odaları seçin, perdeleri kontrol edin, sıcaklığı ayarlayın. Mutfak güvenlik özelliklerini test edin.'
                : 'Select rooms, control curtains, adjust temperature. Test kitchen safety features.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <VillaDashboardDemo lang={lang} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 dark:bg-onyx-950 light:bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'OZELLIKLER' : 'FEATURES'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Her Detay Dusunuldu' : 'Every Detail Considered'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sun,
                title: lang === 'tr' ? 'Akilli Aydinlatma' : 'Smart Lighting',
                description: lang === 'tr'
                  ? 'Dogal isik takibi, sahne modlari, sirkadyen ritim destegi'
                  : 'Natural light tracking, scene modes, circadian rhythm support',
              },
              {
                icon: Shield,
                title: lang === 'tr' ? 'Guvenlik Sistemi' : 'Security System',
                description: lang === 'tr'
                  ? 'Gorunmez algilama, yuz tanima, anlasilan uyarilar'
                  : 'Invisible detection, face recognition, intuitive alerts',
              },
              {
                icon: Thermometer,
                title: lang === 'tr' ? 'Iklim Kontrolu' : 'Climate Control',
                description: lang === 'tr'
                  ? 'Bolge bazli sicaklik, nem kontrolu, hava kalitesi izleme'
                  : 'Zone-based temperature, humidity, air quality monitoring',
              },
              {
                icon: Eye,
                title: lang === 'tr' ? 'Gizlilik Yonetimi' : 'Privacy Management',
                description: lang === 'tr'
                  ? 'Akilli perdeler, cam tonlama, ses izolasyonu'
                  : 'Smart blinds, glass tinting, sound isolation',
              },
              {
                icon: Wifi,
                title: lang === 'tr' ? 'Baglanti Altyapisi' : 'Connectivity',
                description: lang === 'tr'
                  ? 'Mesh WiFi, yerel islem, bulut yedekleme'
                  : 'Mesh WiFi, local processing, cloud backup',
              },
              {
                icon: Zap,
                title: lang === 'tr' ? 'Enerji Yonetimi' : 'Energy Management',
                description: lang === 'tr'
                  ? 'Solar entegrasyon, akilli sarj, tuketim optimizasyonu'
                  : 'Solar integration, smart charging, consumption optimization',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-6 bg-onyx-800/50 border border-white/5 rounded-2xl hover:border-engineer-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center mb-4 group-hover:bg-engineer-500/20 transition-colors">
                  <feature.icon size={24} className="text-engineer-500" />
                </div>
                <h3 className="text-lg font-semibold text-offwhite-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-offwhite-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Home size={48} className="text-engineer-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
              {t.smartVilla.cta}
            </h2>
            <p className="text-lg text-offwhite-600 mb-10">
              {lang === 'tr'
                ? 'Muhendislik ekibimiz villa projeniz icin ozel cozumler tasarlamaya hazir.'
                : 'Our engineering team is ready to design custom solutions for your villa project.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-engineer-500/25"
            >
              <span>{t.nav.engineeringRequest}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
