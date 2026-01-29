'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Home,
  Building,
  Building2,
  Thermometer,
  Lightbulb,
  Shield,
  Video,
  Receipt,
  Bell,
  Wind,
  Gauge,
  BarChart3,
  Droplets,
  Camera,
  Lock,
  Wifi,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import type { Locale } from '@/types';

interface SmartLifestylePreviewProps {
  lang?: Locale;
}

// Screen content data for each mode
const screenContentData = {
  tr: {
    badge: 'AKILLI YAŞAM DENEYİMİ',
    title: 'Tek Ekran,',
    titleHighlight: 'Sınırsız Kontrol',
    subtitle: 'Villa, apartman veya rezidans - tüm yaşam alanınızı tek bir uygulamadan yönetin.',
    modes: [
      {
        id: 'villa',
        icon: Home,
        title: 'Villa Modu',
        subtitle: 'Kişisel Lüks & Konfor',
        description: 'Havuz sıcaklığı, RGB aydınlatma, güvenlik kameraları ve daha fazlası. Eviniz size özel bir deneyim sunar.',
        theme: 'luxury',
        color: 'from-amber-500 to-orange-600',
        bgGradient: 'from-amber-500/10 via-transparent to-transparent',
        screenElements: [
          { icon: Thermometer, label: 'Havuz', value: '28°C', status: 'active' },
          { icon: Lightbulb, label: 'RGB Işıklar', value: 'Akşamcı', status: 'active' },
          { icon: Camera, label: 'Güvenlik', value: '4 Kamera', status: 'monitoring' },
          { icon: Wind, label: 'İklimlendirme', value: '23°C', status: 'active' },
          { icon: Lock, label: 'Alarm', value: 'Pasif', status: 'idle' },
          { icon: Droplets, label: 'Bahçe Sulama', value: '06:00', status: 'scheduled' },
        ],
        quickActions: ['Işıkları Aç', 'Havuz Isıt', 'Alarm Aktif'],
      },
      {
        id: 'apartment',
        icon: Building,
        title: 'Apartman Modu',
        subtitle: 'İletişim & Topluluk',
        description: 'Video diafon, aidat takibi, duyurular ve komşu iletişimi. Apartman yaşamınızı kolaylaştırın.',
        theme: 'communication',
        color: 'from-indigo-500 to-purple-600',
        bgGradient: 'from-indigo-500/10 via-transparent to-transparent',
        screenElements: [
          { icon: Video, label: 'Kapı Zili', value: 'Beklemede', status: 'idle' },
          { icon: Receipt, label: 'Aidat', value: '₺850', status: 'pending' },
          { icon: Bell, label: 'Duyurular', value: '3 Yeni', status: 'notification' },
          { icon: Lock, label: 'Kapı Kilidi', value: 'Güvenli', status: 'locked' },
          { icon: Wifi, label: 'Internet', value: '100 Mbps', status: 'active' },
          { icon: Smartphone, label: 'Misafir Girişi', value: 'QR Kod', status: 'ready' },
        ],
        quickActions: ['Kapıyı Aç', 'Aidat Öde', 'Duyuru Gör'],
      },
      {
        id: 'residence',
        icon: Building2,
        title: 'Rezidans Modu',
        subtitle: 'Yönetim & Verimlilik',
        description: 'HVAC merkezi kontrol, asansör çağırma, enerji analitiği. Kurumsal yaşam standartları.',
        theme: 'management',
        color: 'from-rose-500 to-pink-600',
        bgGradient: 'from-rose-500/10 via-transparent to-transparent',
        screenElements: [
          { icon: Wind, label: 'HVAC Merkezi', value: '22°C', status: 'active' },
          { icon: Gauge, label: 'Asansör', value: 'Kat 3', status: 'moving' },
          { icon: BarChart3, label: 'Enerji', value: '-15%', status: 'saving' },
          { icon: Shield, label: 'Güvenlik', value: '24/7', status: 'monitoring' },
          { icon: Thermometer, label: 'Ortak Alan', value: '21°C', status: 'active' },
          { icon: Bell, label: 'Yönetim', value: '2 Mesaj', status: 'notification' },
        ],
        quickActions: ['Asansör Çağır', 'HVAC Ayarla', 'Rapor Al'],
      },
    ],
  },
  en: {
    badge: 'SMART LIFESTYLE EXPERIENCE',
    title: 'One Screen,',
    titleHighlight: 'Unlimited Control',
    subtitle: 'Villa, apartment, or residence - manage your entire living space from a single app.',
    modes: [
      {
        id: 'villa',
        icon: Home,
        title: 'Villa Mode',
        subtitle: 'Personal Luxury & Comfort',
        description: 'Pool temperature, RGB lighting, security cameras and more. Your home offers a personalized experience.',
        theme: 'luxury',
        color: 'from-amber-500 to-orange-600',
        bgGradient: 'from-amber-500/10 via-transparent to-transparent',
        screenElements: [
          { icon: Thermometer, label: 'Pool', value: '28°C', status: 'active' },
          { icon: Lightbulb, label: 'RGB Lights', value: 'Evening', status: 'active' },
          { icon: Camera, label: 'Security', value: '4 Cameras', status: 'monitoring' },
          { icon: Wind, label: 'Climate', value: '23°C', status: 'active' },
          { icon: Lock, label: 'Alarm', value: 'Passive', status: 'idle' },
          { icon: Droplets, label: 'Garden', value: '06:00', status: 'scheduled' },
        ],
        quickActions: ['Lights On', 'Heat Pool', 'Arm Alarm'],
      },
      {
        id: 'apartment',
        icon: Building,
        title: 'Apartment Mode',
        subtitle: 'Communication & Community',
        description: 'Video intercom, dues tracking, announcements and neighbor communication. Simplify apartment living.',
        theme: 'communication',
        color: 'from-indigo-500 to-purple-600',
        bgGradient: 'from-indigo-500/10 via-transparent to-transparent',
        screenElements: [
          { icon: Video, label: 'Doorbell', value: 'Standby', status: 'idle' },
          { icon: Receipt, label: 'Dues', value: '$85', status: 'pending' },
          { icon: Bell, label: 'Notices', value: '3 New', status: 'notification' },
          { icon: Lock, label: 'Door Lock', value: 'Secure', status: 'locked' },
          { icon: Wifi, label: 'Internet', value: '100 Mbps', status: 'active' },
          { icon: Smartphone, label: 'Guest Entry', value: 'QR Code', status: 'ready' },
        ],
        quickActions: ['Open Door', 'Pay Dues', 'View Notice'],
      },
      {
        id: 'residence',
        icon: Building2,
        title: 'Residence Mode',
        subtitle: 'Management & Efficiency',
        description: 'HVAC central control, elevator call, energy analytics. Corporate living standards.',
        theme: 'management',
        color: 'from-rose-500 to-pink-600',
        bgGradient: 'from-rose-500/10 via-transparent to-transparent',
        screenElements: [
          { icon: Wind, label: 'HVAC Central', value: '22°C', status: 'active' },
          { icon: Gauge, label: 'Elevator', value: 'Floor 3', status: 'moving' },
          { icon: BarChart3, label: 'Energy', value: '-15%', status: 'saving' },
          { icon: Shield, label: 'Security', value: '24/7', status: 'monitoring' },
          { icon: Thermometer, label: 'Common Area', value: '21°C', status: 'active' },
          { icon: Bell, label: 'Management', value: '2 Messages', status: 'notification' },
        ],
        quickActions: ['Call Elevator', 'Adjust HVAC', 'Get Report'],
      },
    ],
  },
};

// Status color mapping
const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  idle: 'bg-gray-500',
  monitoring: 'bg-blue-500',
  scheduled: 'bg-yellow-500',
  pending: 'bg-orange-500',
  notification: 'bg-red-500',
  locked: 'bg-green-500',
  moving: 'bg-blue-500',
  saving: 'bg-emerald-500',
  ready: 'bg-cyan-500',
};

// Device Screen Component
function DeviceScreen({ mode, isActive }: { mode: typeof screenContentData.tr.modes[0]; isActive: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={mode.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col"
        >
          {/* Screen Header */}
          <div className={`p-4 bg-gradient-to-r ${mode.color}`}>
            <div className="flex items-center gap-3">
              <mode.icon size={24} className="text-white" />
              <div>
                <h4 className="text-white font-semibold text-sm">{mode.title}</h4>
                <p className="text-white/70 text-xs">{mode.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Screen Body */}
          <div className="flex-1 p-4 bg-onyx-900/95 overflow-hidden">
            {/* Widget Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {mode.screenElements.map((element, idx) => (
                <motion.div
                  key={element.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-3 bg-onyx-800/80 rounded-xl border border-white/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <element.icon size={16} className="text-offwhite-600" />
                    <span className={`w-2 h-2 rounded-full ${statusColors[element.status]}`} />
                  </div>
                  <div className="text-offwhite-400 font-semibold text-sm">{element.value}</div>
                  <div className="text-offwhite-800 text-xs">{element.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              {mode.quickActions.map((action, idx) => (
                <motion.button
                  key={action}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className={`w-full p-3 bg-gradient-to-r ${mode.color} rounded-xl text-white text-sm font-medium flex items-center justify-between hover:opacity-90 transition-opacity`}
                >
                  <span>{action}</span>
                  <ChevronRight size={16} />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Phone Mockup Component
function PhoneMockup({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone Frame */}
      <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[660px] bg-onyx-800 rounded-[3rem] p-2 shadow-2xl border border-white/10">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-onyx-900 rounded-full z-20" />

        {/* Screen */}
        <div className="relative w-full h-full bg-onyx-900 rounded-[2.5rem] overflow-hidden">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-engineer-500/20 via-transparent to-transparent blur-3xl -z-10" />
    </div>
  );
}

export default function SmartLifestylePreview({ lang }: SmartLifestylePreviewProps) {
  const safeLang: Locale = lang && (lang === 'tr' || lang === 'en') ? lang : 'tr';
  const content = screenContentData[safeLang];

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Update active index based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const sectionCount = content.modes.length;
      const newIndex = Math.min(
        Math.floor(value * sectionCount),
        sectionCount - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, content.modes.length]);

  const currentMode = content.modes[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-onyx-950"
      style={{ height: `${content.modes.length * 100}vh` }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMode.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-radial ${currentMode.bgGradient}`}
          />
        </AnimatePresence>
      </div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Header - Only on desktop, shown above the main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-engineer-500" />
              {content.badge}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-4">
              {content.title}{' '}
              <span className="text-engineer-500">{content.titleHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-offwhite-700 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </motion.div>

          {/* Main Content - Side by Side on Desktop, Stacked on Mobile */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="flex-1 w-full lg:max-w-md order-2 lg:order-1">
              {/* Progress Indicators */}
              <div className="flex lg:flex-col gap-3 lg:gap-4 mb-6 lg:mb-0 justify-center lg:justify-start">
                {content.modes.map((mode, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <motion.div
                      key={mode.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'bg-onyx-800/80 border border-white/10'
                          : 'bg-transparent border border-transparent hover:bg-onyx-800/40'
                      }`}
                      onClick={() => setActiveIndex(idx)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-br ${mode.color}`
                            : 'bg-onyx-800'
                        }`}
                      >
                        <mode.icon
                          size={24}
                          className={isActive ? 'text-white' : 'text-offwhite-600'}
                        />
                      </div>

                      {/* Text - Hidden on mobile for compact view */}
                      <div className="hidden lg:block flex-1">
                        <h3
                          className={`font-semibold transition-colors ${
                            isActive ? 'text-offwhite-400' : 'text-offwhite-700'
                          }`}
                        >
                          {mode.title}
                        </h3>
                        <p className="text-sm text-offwhite-800">{mode.subtitle}</p>
                      </div>

                      {/* Active Indicator */}
                      <div
                        className={`hidden lg:block w-1 h-8 rounded-full transition-all duration-300 ${
                          isActive ? `bg-gradient-to-b ${mode.color}` : 'bg-transparent'
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Description Panel - Only on Desktop */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block mt-8 p-6 bg-onyx-800/50 rounded-2xl border border-white/5"
                >
                  <p className="text-offwhite-600 leading-relaxed">
                    {currentMode.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Phone Mockup */}
            <div className="flex-shrink-0 order-1 lg:order-2">
              <PhoneMockup>
                {content.modes.map((mode, idx) => (
                  <DeviceScreen
                    key={mode.id}
                    mode={mode}
                    isActive={idx === activeIndex}
                  />
                ))}
              </PhoneMockup>
            </div>
          </div>

          {/* Mobile Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-6 text-center"
            >
              <h3 className="text-xl font-semibold text-offwhite-400 mb-2">
                {currentMode.title}
              </h3>
              <p className="text-sm text-offwhite-700">
                {currentMode.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-offwhite-800 text-xs uppercase tracking-widest">
              {safeLang === 'tr' ? 'Kaydirin' : 'Scroll'}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
