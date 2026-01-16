'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Sun, Shield, Thermometer, Eye, Wifi, Zap } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import { useInView } from 'react-intersection-observer';
import {
  useSceneStore,
  getVillaSceneFromProgress,
  VILLA_SCENE_COLORS,
  type VillaSceneType,
} from '@/stores/sceneStore';

// Lazy load 3D components for performance
const VillaScene = dynamic(
  () => import('@/components/premium/3d/VillaScene'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
    ),
  }
);

const InteractiveWireframeHouse = dynamic(
  () => import('@/components/premium/3d/InteractiveWireframeHouse'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
    ),
  }
);

interface SmartVillaClientProps {
  lang: Locale;
}

// Scene Section Component with Observer
function SceneSection({
  id,
  scene,
  badge,
  title,
  subtitle,
  description,
  stats,
  index,
}: {
  id: string;
  scene: VillaSceneType;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
  index: number;
}) {
  const setVillaScene = useSceneStore((state) => state.setVillaScene);
  const activeScene = useSceneStore((state) => state.villaScene);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setVillaScene(scene);
    }
  }, [inView, scene, setVillaScene]);

  const sceneColor = VILLA_SCENE_COLORS[scene];
  const isActive = activeScene === scene;

  return (
    <section
      ref={ref}
      id={id}
      className="min-h-screen flex items-center justify-center relative py-32"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <span
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
              style={{ color: sceneColor }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: sceneColor }} />
              {badge}
              <span className="w-8 h-px" style={{ backgroundColor: sceneColor }} />
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite-400 mb-6 tracking-tight"
          >
            {title}
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8"
              style={{ color: sceneColor }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-offwhite-700 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center gap-12 mt-12"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="font-mono text-3xl md:text-4xl font-bold mb-2"
                    style={{ color: sceneColor }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-offwhite-800 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Progress Indicator
function ProgressIndicator({ scenes, lang }: { scenes: { id: string; scene: VillaSceneType }[]; lang: Locale }) {
  const activeScene = useSceneStore((state) => state.villaScene);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {scenes.map(({ id, scene }) => {
        const isActive = activeScene === scene;
        const color = VILLA_SCENE_COLORS[scene];
        return (
          <a
            key={id}
            href={`#${id}`}
            className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
            style={{
              backgroundColor: isActive ? color : 'rgba(255,255,255,0.2)',
              transform: isActive ? 'scale(1.25)' : 'scale(1)',
            }}
          />
        );
      })}
    </div>
  );
}

export default function SmartVillaClient({ lang }: SmartVillaClientProps) {
  const t = getTranslations(lang);
  const setActivePage = useSceneStore((state) => state.setActivePage);

  // Set active page on mount
  useEffect(() => {
    setActivePage('villa');
    return () => setActivePage(null);
  }, [setActivePage]);

  // Scene definitions with scroll-reactive 3D
  const scenes: {
    id: string;
    scene: VillaSceneType;
    badge: string;
    title: string;
    subtitle?: string;
    description: string;
    stats?: Array<{ label: string; value: string }>;
  }[] = [
    {
      id: 'hero',
      scene: 'intro',
      badge: t.smartVilla.badge,
      title: t.smartVilla.heroTitle,
      subtitle: t.smartVilla.heroHighlight,
      description: t.smartVilla.heroSubtitle,
    },
    {
      id: 'lighting',
      scene: 'lighting',
      badge: lang === 'tr' ? 'AYDINLATMA' : 'LIGHTING',
      title: lang === 'tr' ? 'Akilli Isik Kontrolu' : 'Smart Light Control',
      subtitle: lang === 'tr' ? 'Dogal ritme uyum' : 'In harmony with natural rhythm',
      description:
        lang === 'tr'
          ? 'Gun isigini takip eden, sahne modlari ve sirkadyen ritim destegi ile gozlerinizi koruyun. Her oda, her an ideal aydinlatmada.'
          : 'Track daylight, protect your eyes with scene modes and circadian rhythm support. Every room, every moment in ideal lighting.',
      stats: [
        { label: lang === 'tr' ? 'Isik Noktasi' : 'Light Points', value: '48+' },
        { label: lang === 'tr' ? 'Tasarruf' : 'Savings', value: '%35' },
      ],
    },
    {
      id: 'climate',
      scene: 'climate',
      badge: lang === 'tr' ? 'IKLIM' : 'CLIMATE',
      title: lang === 'tr' ? 'Konfor Muhendisligi' : 'Comfort Engineering',
      subtitle: lang === 'tr' ? 'Sezgiler otesinde' : 'Beyond intuition',
      description:
        lang === 'tr'
          ? 'Bolge bazli sicaklik kontrolu, nem yonetimi ve hava kalitesi izleme. Eviniz siz gelmeden hazir.'
          : 'Zone-based temperature control, humidity management and air quality monitoring. Your home is ready before you arrive.',
      stats: [
        { label: lang === 'tr' ? 'Sensor' : 'Sensors', value: '24' },
        { label: lang === 'tr' ? 'Tepki Suresi' : 'Response', value: '<30s' },
      ],
    },
    {
      id: 'security',
      scene: 'security',
      badge: lang === 'tr' ? 'GUVENLIK' : 'SECURITY',
      title: lang === 'tr' ? 'Gorunmez Kalkan' : 'Invisible Shield',
      subtitle: lang === 'tr' ? '7/24 koruma' : '24/7 protection',
      description:
        lang === 'tr'
          ? 'Gorunmez algilama, yuz tanima, anlasilan uyarilar. Guvenlik sistemi sizi rahatsiz etmeden calisir.'
          : 'Invisible detection, face recognition, intuitive alerts. Security system works without disturbing you.',
      stats: [
        { label: lang === 'tr' ? 'Kamera' : 'Cameras', value: '12' },
        { label: lang === 'tr' ? 'Tepki' : 'Response', value: '<1s' },
      ],
    },
    {
      id: 'integrated',
      scene: 'integrated',
      badge: lang === 'tr' ? 'ENTEGRE SISTEM' : 'INTEGRATED SYSTEM',
      title: lang === 'tr' ? 'Tam Senkronizasyon' : 'Full Synchronization',
      subtitle: lang === 'tr' ? 'Tum sistemler bir arada' : 'All systems together',
      description:
        lang === 'tr'
          ? 'Aydinlatma, iklim, guvenlik - tum sistemler birbiriyle konusur. Tek bir ekosistem, sinirsiz olasilik.'
          : 'Lighting, climate, security - all systems talk to each other. One ecosystem, unlimited possibilities.',
      stats: [
        { label: lang === 'tr' ? 'Entegrasyon' : 'Integrations', value: '47+' },
        { label: lang === 'tr' ? 'Otomasyon' : 'Automations', value: '120+' },
      ],
    },
  ];

  // Feature cards
  const features = [
    {
      icon: Sun,
      title: lang === 'tr' ? 'Aydinlatma Kontrolu' : 'Lighting Control',
      description:
        lang === 'tr'
          ? 'Dogal isik takibi, sahne modlari, sirkadyen ritim destegi.'
          : 'Natural light tracking, scene modes, circadian rhythm support.',
    },
    {
      icon: Shield,
      title: lang === 'tr' ? 'Guvenlik Sistemi' : 'Security System',
      description:
        lang === 'tr'
          ? 'Gorunmez algilama, yuz tanima, anlasilan uyarilar.'
          : 'Invisible detection, face recognition, intuitive alerts.',
    },
    {
      icon: Thermometer,
      title: lang === 'tr' ? 'Iklim Kontrolu' : 'Climate Control',
      description:
        lang === 'tr'
          ? 'Bolge bazli sicaklik, nem kontrolu, hava kalitesi izleme.'
          : 'Zone-based temperature, humidity control, air quality monitoring.',
    },
    {
      icon: Eye,
      title: lang === 'tr' ? 'Gizlilik Yonetimi' : 'Privacy Management',
      description:
        lang === 'tr'
          ? 'Akilli perdeler, cam tonlama, ses izolasyonu.'
          : 'Smart blinds, glass tinting, sound isolation.',
    },
    {
      icon: Wifi,
      title: lang === 'tr' ? 'Baglanti Altyapisi' : 'Connectivity',
      description:
        lang === 'tr'
          ? 'Mesh WiFi, yerel islem, bulut yedekleme.'
          : 'Mesh WiFi, local processing, cloud backup.',
    },
    {
      icon: Zap,
      title: lang === 'tr' ? 'Enerji Yonetimi' : 'Energy Management',
      description:
        lang === 'tr'
          ? 'Solar entegrasyon, akilli sarj, tuketim optimizasyonu.'
          : 'Solar integration, smart charging, consumption optimization.',
    },
  ];

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <VillaScene className="opacity-60" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-onyx-900/60 via-transparent to-onyx-900/80" />
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator scenes={scenes} lang={lang} />

      {/* Scroll Sections */}
      <div className="relative z-10">
        {scenes.map((scene, index) => (
          <SceneSection
            key={scene.id}
            id={scene.id}
            scene={scene.scene}
            badge={scene.badge}
            title={scene.title}
            subtitle={scene.subtitle}
            description={scene.description}
            stats={scene.stats}
            index={index}
          />
        ))}
      </div>

      {/* 3D Interactive House Showcase */}
      <section className="relative z-10 py-20 bg-onyx-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
                <span className="w-8 h-px bg-engineer-500" />
                {lang === 'tr' ? 'INTERAKTIF MODEL' : 'INTERACTIVE MODEL'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
                {lang === 'tr' ? 'Evinizin Dijital Ikizi' : 'Digital Twin of Your Home'}
              </h2>
              <p className="text-lg text-offwhite-700 mb-6">
                {lang === 'tr'
                  ? 'Her oda, her sistem, her sensor. Tum evinizi tek bir ekrandan izleyin ve kontrol edin. Odalar sirasi ile parlayarak aktif sistemleri gosteriyor.'
                  : 'Every room, every system, every sensor. Monitor and control your entire home from a single screen. Rooms light up sequentially showing active systems.'}
              </p>
              <ul className="space-y-3 text-offwhite-600">
                {[
                  lang === 'tr' ? 'Gercek zamanli oda izleme' : 'Real-time room monitoring',
                  lang === 'tr' ? 'Akilli aydinlatma kontrolu' : 'Smart lighting control',
                  lang === 'tr' ? 'Enerji tuketim haritasi' : 'Energy consumption mapping',
                  lang === 'tr' ? 'Guvenlik sensor durumu' : 'Security sensor status',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-engineer-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 3D House */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-lg mx-auto w-full"
            >
              <InteractiveWireframeHouse />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 bg-onyx-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'SISTEMLER' : 'SYSTEMS'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr' ? 'Entegre Sistemler' : 'Integrated Systems'}
            </h2>
            <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Her sistem birbiriyle konusur. Tek bir ekosistem, sinirsiz olasilik.'
                : 'Every system talks to each other. One ecosystem, unlimited possibilities.'}
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-6 bg-onyx-800/50 border border-white/5 rounded-xl hover:border-engineer-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-4 group-hover:bg-engineer-500/20 transition-colors">
                    <Icon size={24} className="text-engineer-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-offwhite-400 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-offwhite-700">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap size={48} className="text-engineer-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
              {t.smartVilla.cta}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {lang === 'tr'
                ? 'Muhendislik ekibimiz villa projeniz icin ozel cozumler tasarlamaya hazir.'
                : 'Our engineering team is ready to design custom solutions for your villa project.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300"
            >
              <span>{t.nav.engineeringRequest}</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
