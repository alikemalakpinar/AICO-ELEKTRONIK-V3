'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Flame,
  Thermometer,
  Bell,
  Wifi,
  Shield,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Battery,
  Radio,
  AlertTriangle,
} from 'lucide-react';
import { ImmersiveHero, StickyScrollStory, BentoGrid } from '@/components/modules';
import type { StoryStep } from '@/components/modules';
import type { BentoItem } from '@/components/modules';
import type { Locale } from '@/types';

// Dynamic import for the Industrial Air Quality Demo (Factory Context)
const IndustrialAirQualityDemo = dynamic(
  () => import('@/components/products/fire/IndustrialAirQualityDemo'),
  { ssr: false, loading: () => <div className="aspect-[16/10] bg-gray-100 dark:bg-onyx-800/50 rounded-2xl animate-pulse" /> }
);

interface FireSafetyClientProps {
  lang: Locale;
}

export default function FireSafetyClient({ lang }: FireSafetyClientProps) {
  // MAGMA THEME - Deep Obsidian with Burning Amber
  const accentColor = '#FF4500'; // Burning Amber

  // Content based on language - Industrial Air Quality Context
  const content = {
    hero: {
      badge: 'FIRELINK IAQ',
      title: lang === 'tr' ? 'Fabrikanizin Havasini' : 'Monitor Your Factory',
      titleHighlight: lang === 'tr' ? 'Izleyin.' : 'Air Quality.',
      subtitle: lang === 'tr'
        ? 'CO₂, TVOC ve PM2.5 izleme. Isci sagligi icin gercek zamanli hava kalitesi.'
        : 'CO₂, TVOC, and PM2.5 monitoring. Real-time air quality for worker safety.',
      cta: lang === 'tr' ? 'Demoyu Inceleyin' : 'Explore Demo',
    },
    story: {
      steps: [
        {
          id: 'problem',
          badge: lang === 'tr' ? 'PROBLEM' : 'THE PROBLEM',
          title: lang === 'tr'
            ? 'Kotu hava kalitesi uretkenlik kaybina sebep olur'
            : 'Poor air quality causes productivity loss',
          description: lang === 'tr'
            ? 'Fabrikalarda CO₂ seviyesi 1500 ppm\'i astiginda isci performansi %15 duser. TVOC maruziyeti uzun vadeli saglik sorunlarina yol acar.'
            : 'When CO₂ levels exceed 1500 ppm in factories, worker performance drops by 15%. TVOC exposure leads to long-term health issues.',
        },
        {
          id: 'detection',
          badge: lang === 'tr' ? 'ALGILAMA' : 'DETECTION',
          title: lang === 'tr'
            ? 'Cok Parametreli Hava Analizi'
            : 'Multi-Parameter Air Analysis',
          description: lang === 'tr'
            ? 'CO₂, TVOC ve PM2.5 sensorleri her uretim alanini izler. Tehlikeli gazlar aninda tespit edilir ve uyari verilir.'
            : 'CO₂, TVOC, and PM2.5 sensors monitor every production area. Dangerous gases are instantly detected and alerts are triggered.',
        },
        {
          id: 'alert',
          badge: lang === 'tr' ? 'UYARI' : 'ALERT',
          title: lang === 'tr'
            ? 'Akilli Havalandirma Sistemi'
            : 'Smart Ventilation System',
          description: lang === 'tr'
            ? 'Hava kalitesi dusunce otomatik havalandirma devreye girer. TVOC yuksekliginde toksik gaz alarm protokolu baslar.'
            : 'Automatic ventilation kicks in when air quality drops. Toxic gas alarm protocol starts when TVOC is high.',
        },
        {
          id: 'action',
          badge: lang === 'tr' ? 'AKSIYON' : 'ACTION',
          title: lang === 'tr'
            ? 'Tahliye Protokolu'
            : 'Evacuation Protocol',
          description: lang === 'tr'
            ? 'Kritik seviyelerde otomatik tahliye alarmi, kapi kontrolleri ve acil durum aydinlatmasi aktif olur.'
            : 'At critical levels, automatic evacuation alarm, door controls, and emergency lighting are activated.',
        },
      ] as StoryStep[],
    },
    features: {
      badge: lang === 'tr' ? 'OZELLIKLER' : 'FEATURES',
      title: lang === 'tr' ? 'Teknik' : 'Technical',
      titleHighlight: lang === 'tr' ? 'Ustunlukler' : 'Excellence',
      items: [
        {
          id: 'sensors',
          icon: Thermometer,
          title: lang === 'tr' ? 'Coklu Sensor' : 'Multi-Sensor',
          description: lang === 'tr'
            ? 'Tek kart uzerinde 8 bagimsiz sicaklik sensoru'
            : '8 independent temperature sensors on a single board',
          value: '8',
          unit: lang === 'tr' ? 'Sensor' : 'Sensors',
          size: 'medium' as const,
        },
        {
          id: 'accuracy',
          icon: Cpu,
          title: lang === 'tr' ? 'Hassasiyet' : 'Accuracy',
          description: lang === 'tr'
            ? 'Endustriyel kalite sicaklik olcumu'
            : 'Industrial-grade temperature measurement',
          value: '±0.5',
          unit: '°C',
          size: 'medium' as const,
        },
        {
          id: 'response',
          icon: Zap,
          title: lang === 'tr' ? 'Tepki Suresi' : 'Response Time',
          description: lang === 'tr'
            ? 'Uyari suresinde milisaniye hassasiyeti'
            : 'Millisecond precision in alert timing',
          value: '<100',
          unit: 'ms',
          size: 'medium' as const,
        },
        {
          id: 'connectivity',
          icon: Radio,
          title: lang === 'tr' ? 'Baglanti' : 'Connectivity',
          description: lang === 'tr'
            ? 'WiFi, LoRa ve RS485 destegi'
            : 'WiFi, LoRa, and RS485 support',
          size: 'medium' as const,
        },
        {
          id: 'battery',
          icon: Battery,
          title: lang === 'tr' ? 'Pil Omru' : 'Battery Life',
          description: lang === 'tr'
            ? 'Dusuk guc modu ile uzun omur'
            : 'Extended life with low power mode',
          value: '5+',
          unit: lang === 'tr' ? 'Yil' : 'Years',
          size: 'medium' as const,
        },
        {
          id: 'certifications',
          icon: Shield,
          title: lang === 'tr' ? 'Sertifikalar' : 'Certifications',
          description: lang === 'tr'
            ? 'CE, UL, ve EN 54 uyumlu'
            : 'CE, UL, and EN 54 compliant',
          size: 'medium' as const,
        },
      ] as BentoItem[],
    },
    specs: {
      title: lang === 'tr' ? 'Teknik Ozellikler' : 'Technical Specifications',
      items: [
        { label: lang === 'tr' ? 'Olcum Araligi' : 'Measurement Range', value: '-40°C ~ +125°C' },
        { label: lang === 'tr' ? 'Calisma Gerilimi' : 'Operating Voltage', value: '3.3V ~ 5V DC' },
        { label: lang === 'tr' ? 'Guc Tuketimi' : 'Power Consumption', value: '<50mA (aktif), <1mA (uyku)' },
        { label: lang === 'tr' ? 'Boyutlar' : 'Dimensions', value: '45 x 30 x 8 mm' },
        { label: lang === 'tr' ? 'Koruma Sinifi' : 'Protection Class', value: 'IP65' },
        { label: lang === 'tr' ? 'Calisma Sicakligi' : 'Operating Temp', value: '-20°C ~ +70°C' },
      ],
    },
    cta: {
      title: lang === 'tr'
        ? 'FireLink\'i Tesisinizde Gorun'
        : 'See FireLink in Your Facility',
      subtitle: lang === 'tr'
        ? 'Ucretsiz teknik danismanlik ve demo icin bizimle iletisime gecin.'
        : 'Contact us for free technical consultation and demo.',
      button: lang === 'tr' ? 'Demo Talep Et' : 'Request Demo',
    },
  };

  // Screen content for each story step
  const getStepComponent = (stepId: string) => {
    switch (stepId) {
      case 'problem':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Flame size={40} className="text-red-500" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">30%</div>
                <div className="text-gray-400 text-sm">
                  {lang === 'tr' ? 'Elektrik Kaynakli Yanginlar' : 'Electrical Fires'}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {['PCB Arizasi', 'Kablo Isınması', 'Kisa Devre'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-red-500/10 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-gray-300 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'detection':
        return (
          <div className="h-full bg-gradient-to-br from-orange-900/50 to-gray-900 p-4 flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <Thermometer size={40} className="text-orange-500 mx-auto mb-2" />
              <span className="text-orange-400 text-sm font-medium">
                {lang === 'tr' ? 'Termal Haritalama' : 'Thermal Mapping'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => {
                const temp = 25 + Math.random() * 40;
                const isHot = temp > 50;
                return (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-mono"
                    style={{
                      backgroundColor: isHot ? `rgba(255, 69, 0, ${temp / 100})` : `rgba(34, 197, 94, 0.3)`,
                      border: `1px solid ${isHot ? '#FF4500' : '#22C55E'}`,
                    }}
                    animate={isHot ? { scale: [1, 1.05, 1] } : undefined}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    {temp.toFixed(0)}°
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 text-[10px] text-gray-400">
              {lang === 'tr' ? '100ms aralikla guncelleniyor' : 'Updating every 100ms'}
            </div>
          </div>
        );
      case 'alert':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col">
            <div className="text-center mb-4">
              <Bell size={32} className="text-red-500 mx-auto mb-2 animate-bounce" />
              <span className="text-red-400 text-sm font-medium">
                {lang === 'tr' ? 'UYARI AKTIF' : 'ALERT ACTIVE'}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { icon: '📱', label: lang === 'tr' ? 'Mobil Bildirim' : 'Mobile Push', time: '< 1s' },
                { icon: '📧', label: 'Email', time: '< 3s' },
                { icon: '💬', label: 'SMS', time: '< 5s' },
                { icon: '🔗', label: 'Webhook', time: '< 1s' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                  <span className="text-green-400 text-xs font-mono">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 'action':
        return (
          <div className="h-full bg-gradient-to-br from-green-900/30 to-gray-900 p-6 flex flex-col">
            <div className="text-center mb-4">
              <Shield size={32} className="text-green-500 mx-auto mb-2" />
              <span className="text-green-400 text-sm font-medium">
                {lang === 'tr' ? 'OTOMATIK KORUMA' : 'AUTO PROTECTION'}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: lang === 'tr' ? 'Guc Kesme' : 'Power Cut', status: 'ready' },
                { label: lang === 'tr' ? 'Havalandirma' : 'Ventilation', status: 'ready' },
                { label: lang === 'tr' ? 'Yangin Sondurucu' : 'Fire Suppression', status: 'standby' },
                { label: lang === 'tr' ? 'Acil Durum Isigi' : 'Emergency Lights', status: 'ready' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <span className="text-gray-300 text-sm">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-gray-400 text-xs capitalize">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Add components to story steps
  const storySteps: StoryStep[] = content.story.steps.map(step => ({
    ...step,
    component: getStepComponent(step.id),
    accentColor,
  }));

  return (
    <div className="min-h-screen bg-onyx-950">
      {/* Immersive Hero */}
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

      {/* Sticky Scroll Story */}
      <StickyScrollStory
        steps={storySteps}
        lang={lang}
        deviceType="phone"
      />

      {/* Interactive Demo Section - FireLink Pro Dashboard */}
      <section id="demo" className="py-24 md:py-32 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-6" style={{ color: accentColor }}>
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
              {lang === 'tr' ? 'FIRELINK PRO DASHBOARD' : 'FIRELINK PRO DASHBOARD'}
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? '3D Termal Izleme Sistemi' : '3D Thermal Monitoring System'}
            </h2>
            <p className="text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Gercek zamanli 3D goruntulem, taktik HUD sensor durumu ve akilli alarm sistemi.'
                : 'Real-time 3D visualization, tactical HUD sensor status and smart alarm system.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <IndustrialAirQualityDemo lang={lang} />
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
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
              <Flame size={40} style={{ color: accentColor }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {content.cta.title}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {content.cta.subtitle}
            </p>
            <Link
              href={`/${lang}/contact?subject=firelink-demo`}
              className="group inline-flex items-center gap-3 px-8 py-4 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: accentColor,
              }}
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
