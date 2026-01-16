'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sun, Shield, Thermometer, Eye, Wifi, Zap } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import ScrollyTellingContainer, {
  type ScrollyScene,
} from '@/components/premium/ScrollyTellingContainer';

interface SmartVillaClientProps {
  lang: Locale;
}

export default function SmartVillaClient({ lang }: SmartVillaClientProps) {
  const t = getTranslations(lang);

  // Scrollytelling scenes
  const scenes: ScrollyScene[] = [
    {
      id: 'hero',
      badge: t.smartVilla.badge,
      title: t.smartVilla.heroTitle,
      subtitle: t.smartVilla.heroHighlight,
      content: t.smartVilla.heroSubtitle,
    },
    {
      id: 'morning',
      badge: lang === 'tr' ? 'SENARYO 01' : 'SCENARIO 01',
      title: t.smartVilla.scene1Title,
      content: t.smartVilla.scene1Text,
      stats: [
        { label: lang === 'tr' ? 'Sensor' : 'Sensors', value: '24' },
        { label: lang === 'tr' ? 'Otomasyon' : 'Automations', value: '12' },
      ],
    },
    {
      id: 'security',
      badge: lang === 'tr' ? 'SENARYO 02' : 'SCENARIO 02',
      title: t.smartVilla.scene2Title,
      content: t.smartVilla.scene2Text,
      stats: [
        { label: lang === 'tr' ? 'Aktif Sensor' : 'Active Sensors', value: '47' },
        { label: lang === 'tr' ? 'Tepki Suresi' : 'Response Time', value: '<1s' },
      ],
    },
    {
      id: 'comfort',
      badge: lang === 'tr' ? 'SENARYO 03' : 'SCENARIO 03',
      title: t.smartVilla.scene3Title,
      content: t.smartVilla.scene3Text,
      stats: [
        { label: lang === 'tr' ? 'Ongoru' : 'Prediction', value: '15dk' },
        { label: lang === 'tr' ? 'Tasarruf' : 'Savings', value: '%42' },
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
      {/* Scrollytelling Section */}
      <ScrollyTellingContainer scenes={scenes} />

      {/* Features Grid */}
      <section className="py-32 bg-onyx-950">
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
      <section className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-lg transition-all duration-300"
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
