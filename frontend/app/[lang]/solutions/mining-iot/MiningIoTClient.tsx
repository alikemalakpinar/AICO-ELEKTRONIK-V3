'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HardHat,
  MapPin,
  Wind,
  Heart,
  Radio,
  Shield,
  Zap,
  ArrowRight,
  AlertTriangle,
  Users,
  Clock,
  Battery,
} from 'lucide-react';
import { ImmersiveHero, StickyScrollStory, BentoGrid } from '@/components/modules';
import type { StoryStep, BentoItem } from '@/components/modules';
import WorkerTrackerDemo from '@/components/products/mining/WorkerTrackerDemo';
import type { Locale } from '@/types';

interface MiningIoTClientProps {
  lang: Locale;
}

export default function MiningIoTClient({ lang }: MiningIoTClientProps) {
  const accentColor = '#EAB308'; // Yellow for mining safety

  const content = {
    hero: {
      badge: 'MINEGUARD',
      title: lang === 'tr' ? 'Yerin Altinda' : 'Underground',
      titleHighlight: lang === 'tr' ? 'Tam Kontrol.' : 'Full Control.',
      subtitle: lang === 'tr'
        ? 'Isci takip, gaz algilama ve acil durum yonetimi. Tek platformda.'
        : 'Worker tracking, gas detection, and emergency management. One platform.',
      cta: lang === 'tr' ? 'Sistemi Inceleyin' : 'Explore System',
    },
    story: {
      steps: [
        {
          id: 'tracking',
          badge: lang === 'tr' ? 'TAKIP' : 'TRACKING',
          title: lang === 'tr'
            ? 'Her Isciyi, Her An Gorun'
            : 'See Every Worker, Every Moment',
          description: lang === 'tr'
            ? 'UWB ve LoRa teknolojisiyle santimetre hassasiyetinde konum takibi. Her isci bir dijital ikiz olarak haritada canli izlenir.'
            : 'Centimeter-precision location tracking with UWB and LoRa technology. Every worker is monitored live on the map as a digital twin.',
        },
        {
          id: 'vitals',
          badge: lang === 'tr' ? 'SAGLIK' : 'VITALS',
          title: lang === 'tr'
            ? 'Canli Yasamsal Degerler'
            : 'Live Vital Signs',
          description: lang === 'tr'
            ? 'Nabiz, hareket ve dusme sensoru ile iscilerin saglik durumu anlık izlenir. Anormal durumlar otomatik tespit edilir.'
            : 'Health status of workers is monitored in real-time with heart rate, motion, and fall sensors. Abnormal conditions are automatically detected.',
        },
        {
          id: 'gas',
          badge: lang === 'tr' ? 'GAZ' : 'GAS',
          title: lang === 'tr'
            ? 'Coklu Gaz Algilama'
            : 'Multi-Gas Detection',
          description: lang === 'tr'
            ? 'Metan, karbon monoksit, hidrojen sulfur ve oksijen seviyesi surekli olculur. Tehlikeli esikler asildiginda aninda alarm.'
            : 'Methane, carbon monoxide, hydrogen sulfide, and oxygen levels are continuously measured. Instant alarm when dangerous thresholds are exceeded.',
        },
        {
          id: 'emergency',
          badge: lang === 'tr' ? 'ACIL DURUM' : 'EMERGENCY',
          title: lang === 'tr'
            ? 'Akilli Tahliye Sistemi'
            : 'Smart Evacuation System',
          description: lang === 'tr'
            ? 'Acil durumda en guvenli kacis rotasi otomatik hesaplanir. Tum iscilere ses ve titresim ile anında uyari gonderilir.'
            : 'In emergency, the safest escape route is automatically calculated. All workers receive instant audio and vibration alerts.',
        },
      ] as StoryStep[],
    },
    features: {
      badge: lang === 'tr' ? 'OZELLIKLER' : 'FEATURES',
      title: lang === 'tr' ? 'Endustriyel' : 'Industrial',
      titleHighlight: lang === 'tr' ? 'Guvenlik Standartlari' : 'Safety Standards',
      items: [
        {
          id: 'workers',
          icon: Users,
          title: lang === 'tr' ? 'Isci Kapasitesi' : 'Worker Capacity',
          description: lang === 'tr'
            ? 'Tek sistemde 1000+ isci takibi'
            : 'Track 1000+ workers in single system',
          value: '1000+',
          unit: lang === 'tr' ? 'Isci' : 'Workers',
          size: 'medium' as const,
        },
        {
          id: 'accuracy',
          icon: MapPin,
          title: lang === 'tr' ? 'Konum Hassasiyeti' : 'Location Accuracy',
          description: lang === 'tr'
            ? 'UWB teknolojisi ile yuksek hassasiyet'
            : 'High precision with UWB technology',
          value: '±10',
          unit: 'cm',
          size: 'medium' as const,
        },
        {
          id: 'response',
          icon: Zap,
          title: lang === 'tr' ? 'Alarm Suresi' : 'Alert Time',
          description: lang === 'tr'
            ? 'Tehlike aninda aninda bildirim'
            : 'Instant notification in danger',
          value: '<1',
          unit: lang === 'tr' ? 'saniye' : 'second',
          size: 'medium' as const,
        },
        {
          id: 'gases',
          icon: Wind,
          title: lang === 'tr' ? 'Gaz Turleri' : 'Gas Types',
          description: lang === 'tr'
            ? 'CH4, CO, H2S, O2 olcumu'
            : 'CH4, CO, H2S, O2 measurement',
          value: '4',
          unit: lang === 'tr' ? 'Gaz' : 'Gases',
          size: 'medium' as const,
        },
        {
          id: 'battery',
          icon: Battery,
          title: lang === 'tr' ? 'Pil Omru' : 'Battery Life',
          description: lang === 'tr'
            ? 'Tek sarjla uzun calisma suresi'
            : 'Long operation with single charge',
          value: '72',
          unit: lang === 'tr' ? 'Saat' : 'Hours',
          size: 'medium' as const,
        },
        {
          id: 'certifications',
          icon: Shield,
          title: lang === 'tr' ? 'Sertifikalar' : 'Certifications',
          description: lang === 'tr'
            ? 'ATEX, IECEx, MSHA uyumlu'
            : 'ATEX, IECEx, MSHA compliant',
          size: 'medium' as const,
        },
      ] as BentoItem[],
    },
    specs: {
      title: lang === 'tr' ? 'Teknik Ozellikler' : 'Technical Specifications',
      items: [
        { label: lang === 'tr' ? 'Frekans Bandi' : 'Frequency Band', value: 'UWB 6.5GHz + LoRa 868MHz' },
        { label: lang === 'tr' ? 'Koruma Sinifi' : 'Protection Class', value: 'IP68, ATEX Zone 1' },
        { label: lang === 'tr' ? 'Calisma Sicakligi' : 'Operating Temp', value: '-40°C ~ +70°C' },
        { label: lang === 'tr' ? 'Agirlik' : 'Weight', value: '85g (kask modulu)' },
        { label: lang === 'tr' ? 'Veri Aktarim' : 'Data Transfer', value: 'LoRaWAN + 4G fallback' },
        { label: lang === 'tr' ? 'Sarj Suresi' : 'Charge Time', value: '< 2 saat (tam sarj)' },
      ],
    },
    cta: {
      title: lang === 'tr'
        ? 'Maden Guvenliginizi Yukseltın'
        : 'Elevate Your Mining Safety',
      subtitle: lang === 'tr'
        ? 'Saha incelemesi ve pilot uygulama icin bizimle iletisime gecin.'
        : 'Contact us for site assessment and pilot implementation.',
      button: lang === 'tr' ? 'Demo Talep Et' : 'Request Demo',
    },
  };

  // Screen content for story steps
  const getStepComponent = (stepId: string) => {
    switch (stepId) {
      case 'tracking':
        return (
          <div className="h-full bg-gradient-to-br from-yellow-900/30 to-gray-900 p-2">
            <WorkerTrackerDemo lang={lang} className="h-full" />
          </div>
        );
      case 'vitals':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col">
            <div className="text-center mb-4">
              <Heart size={32} className="text-red-500 mx-auto mb-2" />
              <span className="text-offwhite-400 text-sm font-medium">
                {lang === 'tr' ? 'Canli Izleme' : 'Live Monitoring'}
              </span>
            </div>
            <div className="flex-1 space-y-4">
              {[
                { label: lang === 'tr' ? 'Nabiz' : 'Heart Rate', value: '78', unit: 'bpm', color: '#EF4444' },
                { label: lang === 'tr' ? 'Hareket' : 'Motion', value: 'Aktif', unit: '', color: '#22C55E' },
                { label: lang === 'tr' ? 'Dusme' : 'Fall', value: 'Yok', unit: '', color: '#22C55E' },
                { label: lang === 'tr' ? 'Sicaklik' : 'Body Temp', value: '36.5', unit: '°C', color: '#06B6D4' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-mono font-bold" style={{ color: item.color }}>
                      {item.value}
                    </span>
                    <span className="text-gray-500 text-xs">{item.unit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 'gas':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col">
            <div className="text-center mb-4">
              <Wind size={32} className="text-cyan-500 mx-auto mb-2" />
              <span className="text-offwhite-400 text-sm font-medium">
                {lang === 'tr' ? 'Gaz Analizi' : 'Gas Analysis'}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: 'CH₄ (Metan)', value: 0.2, max: 5, unit: '%', danger: 1 },
                { label: 'CO', value: 12, max: 100, unit: 'ppm', danger: 50 },
                { label: 'H₂S', value: 2, max: 20, unit: 'ppm', danger: 10 },
                { label: 'O₂', value: 20.9, max: 23, unit: '%', danger: 19.5, reverse: true },
              ].map((gas, i) => {
                const percentage = (gas.value / gas.max) * 100;
                const isDanger = gas.reverse
                  ? gas.value < gas.danger
                  : gas.value > gas.danger;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400 text-xs">{gas.label}</span>
                      <span className={`text-sm font-mono ${isDanger ? 'text-red-400' : 'text-green-400'}`}>
                        {gas.value} {gas.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: isDanger ? '#EF4444' : '#22C55E',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      case 'emergency':
        return (
          <div className="h-full bg-gradient-to-br from-red-900/30 to-gray-900 p-6 flex flex-col">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-center mb-4"
            >
              <AlertTriangle size={40} className="text-red-500 mx-auto mb-2" />
              <span className="text-red-400 text-sm font-bold">
                {lang === 'tr' ? 'ACIL TAHLIYE' : 'EMERGENCY EVACUATION'}
              </span>
            </motion.div>
            <div className="flex-1 space-y-3">
              {[
                { label: lang === 'tr' ? 'Etkilenen Sektor' : 'Affected Sector', value: 'D', status: 'danger' },
                { label: lang === 'tr' ? 'Tahliye Rotasi' : 'Evacuation Route', value: 'Rota A', status: 'active' },
                { label: lang === 'tr' ? 'Tahmini Sure' : 'Est. Time', value: '8 dk', status: 'normal' },
                { label: lang === 'tr' ? 'Isci Sayisi' : 'Workers', value: '12', status: 'normal' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    item.status === 'danger' ? 'bg-red-500/20 border-red-500/50' :
                    item.status === 'active' ? 'bg-green-500/20 border-green-500/50' :
                    'bg-white/5 border-white/10'
                  }`}
                >
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className={`font-mono font-bold ${
                    item.status === 'danger' ? 'text-red-400' :
                    item.status === 'active' ? 'text-green-400' : 'text-white'
                  }`}>
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-4 p-3 bg-green-500/20 rounded-lg text-center"
            >
              <span className="text-green-400 text-sm">
                {lang === 'tr' ? '↑ Cikisa Yonelin ↑' : '↑ Head to Exit ↑'}
              </span>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  const storySteps: StoryStep[] = content.story.steps.map(step => ({
    ...step,
    component: getStepComponent(step.id),
    accentColor,
  }));

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

      <StickyScrollStory
        steps={storySteps}
        lang={lang}
        deviceType="tablet"
      />

      {/* Interactive Demo Section */}
      <section id="demo" className="py-24 md:py-32 bg-onyx-900">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: accentColor }}>
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
              {lang === 'tr' ? 'CANLI RADAR' : 'LIVE RADAR'}
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Isci Takip Sistemi' : 'Worker Tracking System'}
            </h2>
            <p className="text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Canli Mod\'u acarak gercek zamanli isci hareketlerini ve saglik verilerini izleyin.'
                : 'Enable Live Mode to monitor real-time worker movements and health data.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <WorkerTrackerDemo lang={lang} className="max-w-4xl mx-auto" />
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

      {/* Technical Specifications */}
      <section className="py-24 md:py-32 bg-onyx-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400">
              {content.specs.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {content.specs.items.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-onyx-800/50 rounded-xl border border-white/5"
              >
                <span className="text-offwhite-700">{spec.label}</span>
                <span className="text-offwhite-400 font-mono">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              <HardHat size={40} style={{ color: accentColor }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {content.cta.title}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {content.cta.subtitle}
            </p>
            <Link
              href={`/${lang}/contact?subject=mineguard-demo`}
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
