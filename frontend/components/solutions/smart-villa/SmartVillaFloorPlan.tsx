'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sun, Speaker, Thermometer, Shield, Waves, Eye, Wind, Lock } from 'lucide-react';

type Lang = 'tr' | 'en';

interface FeatureSection {
  id: string;
  icon: React.ElementType;
  secondaryIcon: React.ElementType;
  badge: { tr: string; en: string };
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  specs: { label: { tr: string; en: string }; value: string }[];
  visualColor: string;
  visualGradient: string;
}

const features: FeatureSection[] = [
  {
    id: 'lighting',
    icon: Sun,
    secondaryIcon: Eye,
    badge: { tr: 'ALGORİTMİK AYDINLATMA', en: 'ALGORITHMIC LIGHTING' },
    title: { tr: 'Işık Sizi Takip Eder', en: 'Light Follows You' },
    description: {
      tr: 'Sirkadyen ritminize uyum sağlayan akıllı aydınlatma. Gün doğumunda sıcak tonlar, öğlende doğal beyaz, akşam amber. Her oda bağımsız kontrol edilir ve hareket sensörleriyle otomatik ayarlanır.',
      en: 'Smart lighting that adapts to your circadian rhythm. Warm tones at sunrise, natural white at noon, amber in the evening. Each room independently controlled and auto-adjusted with motion sensors.',
    },
    specs: [
      { label: { tr: 'Bağımsız Bölge', en: 'Independent Zones' }, value: '24' },
      { label: { tr: 'Renk Sıcaklığı', en: 'Color Range' }, value: '2700K-6500K' },
      { label: { tr: 'Tepki Süresi', en: 'Response Time' }, value: '<200ms' },
    ],
    visualColor: '#FBBF24',
    visualGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    id: 'audio',
    icon: Speaker,
    secondaryIcon: Waves,
    badge: { tr: 'GÖRÜNMEZ SES', en: 'INVISIBLE AUDIO' },
    title: { tr: 'Ses, Mimariyle Bir', en: 'Sound Meets Architecture' },
    description: {
      tr: 'Duvarlara gömülü hoparlör sistemleri ile müzik sizi takip eder. Bir odadan diğerine geçerken ses kesintisiz akar. Misafirleriniz hoparlör görmez, sadece müziği hisseder.',
      en: 'Wall-embedded speaker systems let music follow you. Sound flows seamlessly from room to room. Your guests never see speakers—they only feel the music.',
    },
    specs: [
      { label: { tr: 'Ses Bölgesi', en: 'Audio Zones' }, value: '12' },
      { label: { tr: 'Geçiş Süresi', en: 'Crossfade' }, value: '0.8s' },
      { label: { tr: 'Kayıp Oranı', en: 'Signal Loss' }, value: '0%' },
    ],
    visualColor: '#8B5CF6',
    visualGradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
  },
  {
    id: 'climate',
    icon: Thermometer,
    secondaryIcon: Wind,
    badge: { tr: 'İKLİM LOJİĞİ', en: 'CLIMATE LOGIC' },
    title: { tr: 'Hava Sizden Önce Hazır', en: 'Air Prepared Before You' },
    description: {
      tr: 'GPS senkronizasyonu ile eve 15 dakika kala iklimlendirme başlar. Her oda farklı sıcaklık, nem ve hava kalitesi hedefine sahip. Mevsimsel öğrenme ile enerji tüketimi sürekli optimize edilir.',
      en: 'Climate begins 15 minutes before arrival via GPS sync. Each room has individual temperature, humidity, and air quality targets. Seasonal learning continuously optimizes energy consumption.',
    },
    specs: [
      { label: { tr: 'Bağımsız Bölge', en: 'Independent Zones' }, value: '8' },
      { label: { tr: 'Enerji Tasarrufu', en: 'Energy Savings' }, value: '%35' },
      { label: { tr: 'Hava Kalitesi', en: 'Air Quality' }, value: 'PM2.5<10' },
    ],
    visualColor: '#06B6D4',
    visualGradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
  },
  {
    id: 'security',
    icon: Shield,
    secondaryIcon: Lock,
    badge: { tr: 'GÜVENLİK AĞI', en: 'SECURITY MESH' },
    title: { tr: 'Görünmez Koruma', en: 'Invisible Protection' },
    description: {
      tr: 'Çit yok, kamera görünmüyor. Ama 47 sensör her saniye aktif. Algoritmik analiz ile tehdit tespiti, yüz tanıma ile kapı açma, plaka okuma ile garaj kontrolü. Güvenlik görünmez ama her yerde.',
      en: 'No fences, no visible cameras. But 47 sensors active every second. Threat detection via algorithmic analysis, face recognition for door access, plate reading for garage control. Security is invisible but everywhere.',
    },
    specs: [
      { label: { tr: 'Aktif Sensör', en: 'Active Sensors' }, value: '47' },
      { label: { tr: 'Algılama Süresi', en: 'Detection Time' }, value: '<0.3s' },
      { label: { tr: 'Yanlış Alarm', en: 'False Alarms' }, value: '<0.1%' },
    ],
    visualColor: '#10B981',
    visualGradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
  },
];

function FeatureVisual({ feature, progress }: { feature: FeatureSection; progress: number }) {
  const Icon = feature.icon;
  const SecondaryIcon = feature.secondaryIcon;

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Background glow */}
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-radial ${feature.visualGradient} blur-3xl`}
        style={{ opacity: Math.min(progress * 2, 1) }}
      />

      {/* Main visual container */}
      <motion.div
        className="relative w-full h-full rounded-3xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden"
        style={{
          filter: `blur(${Math.max(0, (1 - progress) * 8)}px)`,
          transform: `scale(${0.9 + progress * 0.1})`,
        }}
      >
        {/* Grid pattern inside */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full">
            <defs>
              <pattern id={`grid-${feature.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${feature.id})`} className="text-foreground" />
          </svg>
        </div>

        {/* Central icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {/* Orbital ring */}
            <div
              className="w-48 h-48 rounded-full border border-dashed"
              style={{ borderColor: `${feature.visualColor}30` }}
            />
          </motion.div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${feature.visualColor}15` }}
            >
              <Icon size={40} style={{ color: feature.visualColor }} />
            </div>
          </div>

          {/* Floating secondary icons */}
          <motion.div
            className="absolute top-1/4 right-1/4"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: `${feature.visualColor}10`, border: `1px solid ${feature.visualColor}20` }}
            >
              <SecondaryIcon size={20} style={{ color: feature.visualColor }} />
            </div>
          </motion.div>
        </div>

        {/* Spec readouts at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between gap-2">
            {feature.specs.map((spec, i) => (
              <motion.div
                key={i}
                className="flex-1 text-center p-2 rounded-lg bg-background/60 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: progress > 0.3 ? 1 : 0, y: progress > 0.3 ? 0 : 10 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-mono text-sm font-bold" style={{ color: feature.visualColor }}>
                  {spec.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeatureBlock({ feature, index, lang }: { feature: FeatureSection; index: number; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-20% 0px -20% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  return (
    <div ref={ref} className="min-h-screen flex items-center py-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
          {/* Visual Side */}
          <motion.div className={index % 2 === 1 ? 'lg:order-2' : ''}>
            <FeatureVisual feature={feature} progress={isInView ? 1 : 0} />
          </motion.div>

          {/* Text Side */}
          <motion.div
            className={index % 2 === 1 ? 'lg:order-1' : ''}
            style={{ y: textY, opacity: textOpacity }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: feature.visualColor }} />
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: feature.visualColor }}
              >
                {feature.badge[lang]}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
            >
              {feature.title[lang]}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
            >
              {feature.description[lang]}
            </motion.p>

            {/* Specs */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
            >
              {feature.specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-card border border-border text-center"
                >
                  <div
                    className="font-mono text-2xl font-bold mb-1"
                    style={{ color: feature.visualColor }}
                  >
                    {spec.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {spec.label[lang]}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SmartVillaFloorPlan({ lang }: { lang: Lang }) {
  return (
    <div className="relative">
      {/* Section header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          {lang === 'tr'
            ? 'Aşağı kaydırarak villanızın görünmez teknoloji katmanlarını keşfedin.'
            : 'Scroll down to discover the invisible technology layers of your villa.'}
        </p>
      </motion.div>

      {/* Feature sections */}
      {features.map((feature, index) => (
        <FeatureBlock key={feature.id} feature={feature} index={index} lang={lang} />
      ))}
    </div>
  );
}
