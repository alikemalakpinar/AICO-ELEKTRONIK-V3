'use client';

import React from 'react';
import Link from 'next/link';
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

  // Sample fleet data for demo visualization
  const fleetData = [
    { id: 'TRK-001', temp: -18.2, target: -18, location: 'Istanbul-Ankara', status: 'normal', progress: 65 },
    { id: 'TRK-002', temp: 4.1, target: 4, location: 'Izmir-Antalya', status: 'normal', progress: 40 },
    { id: 'TRK-003', temp: -15.8, target: -18, location: 'Bursa-Istanbul', status: 'warning', progress: 82 },
    { id: 'TRK-004', temp: 2.3, target: 2, location: 'Ankara-Konya', status: 'normal', progress: 25 },
  ];

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

      {/* Fleet Tracking Demo */}
      <section id="demo" className="py-24 md:py-32 bg-onyx-900">
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
              {lang === 'tr' ? 'CANLI DEMO' : 'LIVE DEMO'}
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {content.demo.title}
            </h2>
            <p className="text-offwhite-700 max-w-2xl mx-auto">
              {content.demo.subtitle}
            </p>
          </motion.div>

          {/* Fleet Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-onyx-800/50 rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Truck size={20} style={{ color: accentColor }} />
                <span className="text-offwhite-400 font-medium">
                  {lang === 'tr' ? 'Filo Durumu' : 'Fleet Status'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={14} className="text-green-500" />
                <span className="text-offwhite-700 text-xs">
                  {lang === 'tr' ? 'Canli' : 'Live'}
                </span>
              </div>
            </div>

            {/* Fleet List */}
            <div className="divide-y divide-white/5">
              {fleetData.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${accentColor}15` }}
                      >
                        <Package size={20} style={{ color: accentColor }} />
                      </div>
                      <div>
                        <div className="text-offwhite-400 font-medium">{vehicle.id}</div>
                        <div className="text-offwhite-800 text-xs flex items-center gap-1">
                          <MapPin size={10} />
                          {vehicle.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-mono font-bold ${
                        vehicle.status === 'warning' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {vehicle.temp}°C
                      </div>
                      <div className="text-offwhite-800 text-xs">
                        {lang === 'tr' ? 'Hedef' : 'Target'}: {vehicle.target}°C
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 bg-onyx-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: accentColor }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${vehicle.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-offwhite-800 text-xs">
                      {lang === 'tr' ? 'Rota Ilerleme' : 'Route Progress'}
                    </span>
                    <span className="text-offwhite-700 text-xs font-mono">{vehicle.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dashboard Footer */}
            <div className="p-4 border-t border-white/10 bg-onyx-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-offwhite-700 text-xs">
                      {fleetData.filter(v => v.status === 'normal').length} {lang === 'tr' ? 'Normal' : 'Normal'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-offwhite-700 text-xs">
                      {fleetData.filter(v => v.status === 'warning').length} {lang === 'tr' ? 'Uyari' : 'Warning'}
                    </span>
                  </div>
                </div>
                <span className="text-offwhite-800 text-xs font-mono">ColdTrack v2.5</span>
              </div>
            </div>
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
