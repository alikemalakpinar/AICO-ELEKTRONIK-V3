'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Thermometer,
  Truck,
  MapPin,
  Bell,
  Shield,
  Zap,
  ArrowRight,
  BarChart3,
  Snowflake,
  Package,
  Clock,
  Wifi,
} from 'lucide-react';
import { ImmersiveHero, BentoGrid } from '@/components/modules';
import type { BentoItem } from '@/components/modules';
import type { Locale } from '@/types';

// Dynamic import for the 3D globe demo to avoid SSR issues
const ColdChainProDemo = dynamic(
  () => import('@/components/products/cold-chain/ColdChainProDemo'),
  { ssr: false, loading: () => <div className="aspect-[16/10] bg-onyx-800/50 rounded-2xl animate-pulse" /> }
);

interface ColdChainClientProps {
  lang: Locale;
}

export default function ColdChainClient({ lang }: ColdChainClientProps) {
  const accentColor = '#06B6D4'; // Cyan for cold chain

  const content = {
    hero: {
      badge: 'COLDTRACK',
      title: lang === 'tr' ? 'Soguk Zinciri' : 'Break the Chain,',
      titleHighlight: lang === 'tr' ? 'Kirmayin.' : 'Never.',
      subtitle: lang === 'tr'
        ? 'Ilactan gidaya, her hassas urun icin kesintisiz sicaklik kontrolu.'
        : 'Uninterrupted temperature control for every sensitive product, from pharmaceuticals to food.',
      cta: lang === 'tr' ? 'Sistemi Inceleyin' : 'Explore System',
    },
    features: {
      badge: lang === 'tr' ? 'OZELLIKLER' : 'FEATURES',
      title: lang === 'tr' ? 'Akilli Lojistik' : 'Smart Logistics',
      titleHighlight: lang === 'tr' ? 'Cozumleri' : 'Solutions',
      items: [
        {
          id: 'sensors',
          icon: Thermometer,
          title: lang === 'tr' ? 'Coklu Sensor' : 'Multi-Sensor',
          description: lang === 'tr'
            ? 'Arac basina 8 bagimsiz sicaklik sensoru'
            : '8 independent temperature sensors per vehicle',
          value: '8',
          unit: lang === 'tr' ? 'Sensor' : 'Sensors',
          size: 'medium' as const,
        },
        {
          id: 'accuracy',
          icon: Snowflake,
          title: lang === 'tr' ? 'Hassasiyet' : 'Accuracy',
          description: lang === 'tr'
            ? 'Endustriyel kalite sicaklik olcumu'
            : 'Industrial-grade temperature measurement',
          value: '±0.3',
          unit: '°C',
          size: 'medium' as const,
        },
        {
          id: 'tracking',
          icon: MapPin,
          title: lang === 'tr' ? 'GPS Takip' : 'GPS Tracking',
          description: lang === 'tr'
            ? 'Gercek zamanli konum ve rota izleme'
            : 'Real-time location and route tracking',
          size: 'medium' as const,
        },
        {
          id: 'alerts',
          icon: Bell,
          title: lang === 'tr' ? 'Akilli Alarmlar' : 'Smart Alerts',
          description: lang === 'tr'
            ? 'SMS, email ve push bildirimler'
            : 'SMS, email, and push notifications',
          value: '<30',
          unit: lang === 'tr' ? 'saniye' : 'seconds',
          size: 'medium' as const,
        },
        {
          id: 'battery',
          icon: Clock,
          title: lang === 'tr' ? 'Pil Omru' : 'Battery Life',
          description: lang === 'tr'
            ? 'Tek sarjla uzun calisma suresi'
            : 'Extended operation with single charge',
          value: '30',
          unit: lang === 'tr' ? 'Gun' : 'Days',
          size: 'medium' as const,
        },
        {
          id: 'compliance',
          icon: Shield,
          title: lang === 'tr' ? 'Uyumluluk' : 'Compliance',
          description: lang === 'tr'
            ? 'GDP, HACCP, FDA 21 CFR Part 11'
            : 'GDP, HACCP, FDA 21 CFR Part 11',
          size: 'medium' as const,
        },
      ] as BentoItem[],
    },
    demo: {
      title: lang === 'tr' ? 'Canli Filo Takibi' : 'Live Fleet Tracking',
      subtitle: lang === 'tr'
        ? 'Tum araclarinizin sicaklik ve konum verilerini tek ekrandan izleyin.'
        : 'Monitor temperature and location data of all your vehicles from a single screen.',
    },
    cta: {
      title: lang === 'tr'
        ? 'Soguk Zincirinizi Guvence Altina Alin'
        : 'Secure Your Cold Chain',
      subtitle: lang === 'tr'
        ? 'Ucretsiz pilot uygulama icin bizimle iletisime gecin.'
        : 'Contact us for a free pilot implementation.',
      button: lang === 'tr' ? 'Demo Talep Et' : 'Request Demo',
    },
  };

  return (
    <div className="min-h-screen bg-onyx-950">
      <ImmersiveHero
        badge={content.hero.badge}
        title={content.hero.title}
        titleHighlight={content.hero.titleHighlight}
        subtitle={content.hero.subtitle}
        accentColor={accentColor}
        ctaText={content.hero.cta}
        ctaHref="#demo"
        lang={lang}
      />

      {/* Global Fleet Tracking with 3D Globe */}
      <section id="demo" className="py-24 md:py-32 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: accentColor }}>
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
              {lang === 'tr' ? 'GLOBAL KOMUTA MERKEZI' : 'GLOBAL COMMAND CENTER'}
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? '3D Global Filo Izleme' : '3D Global Fleet Tracking'}
            </h2>
            <p className="text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Interaktif 3D dunya uzerinde arac rotalarini ve sicaklik durumunu izleyin. Araca tiklayin detaylari gorun.'
                : 'Track vehicle routes and temperature status on interactive 3D globe. Click on vehicles to see details.'}
            </p>
          </motion.div>

          {/* 3D Globe Fleet Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ColdChainProDemo lang={lang} />
          </motion.div>
        </div>
      </section>

      <BentoGrid
        badge={content.features.badge}
        title={content.features.title}
        titleHighlight={content.features.titleHighlight}
        items={content.features.items}
        accentColor={accentColor}
        lang={lang}
      />

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-onyx-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <Thermometer size={40} style={{ color: accentColor }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {content.cta.title}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {content.cta.subtitle}
            </p>
            <Link
              href={`/${lang}/contact?subject=coldtrack-demo`}
              className="group inline-flex items-center gap-3 px-8 py-4 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              <span>{content.cta.button}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
