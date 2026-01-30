'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Zap,
  Thermometer,
  Bell,
  Shield,
  Clock,
  ArrowRight,
  Cpu,
  Battery,
  Radio,
  Activity,
} from 'lucide-react';
import { ImmersiveHero, StickyScrollStory, BentoGrid } from '@/components/modules';
import type { StoryStep } from '@/components/modules';
import type { BentoItem } from '@/components/modules';
import type { Locale } from '@/types';
import AnimatedDataFlow from '@/components/premium/AnimatedDataFlow';

// Dynamic import for FireLink Arc Detection Demo
const FireLinkDemo = dynamic(
  () => import('@/components/demos/FireLinkDemo'),
  { ssr: false, loading: () => <div className="aspect-[16/10] bg-gray-100 dark:bg-onyx-800/50 rounded-2xl animate-pulse" /> }
);

interface FireSafetyClientProps {
  lang: Locale;
}

export default function FireSafetyClient({ lang }: FireSafetyClientProps) {
  const accentColor = '#FF4500';

  const content = {
    hero: {
      badge: 'FIRELINK ARC DETECTION',
      title: lang === 'tr' ? 'Elektriksel Yangini' : 'Detect Electrical Fires',
      titleHighlight: lang === 'tr' ? 'Önleyin.' : 'Before Ignition.',
      subtitle: lang === 'tr'
        ? 'Kablo izolasyon bozulmasi, mikro-ark tespiti ve proaktif enerji kesintisi. Pano seviyesinde gorunmez tehlikeyi gorun.'
        : 'Cable insulation degradation, micro-arc detection and proactive energy cutoff. See invisible danger at cabinet level.',
      cta: lang === 'tr' ? 'Demoyu İnceleyin' : 'Explore Demo',
    },
    story: {
      steps: [
        {
          id: 'problem',
          badge: lang === 'tr' ? 'PROBLEM' : 'THE PROBLEM',
          title: lang === 'tr'
            ? 'Elektrik panolarinda gorunmeyen tehlike: izolasyon bozulmasi'
            : 'Invisible threat in electrical cabinets: insulation degradation',
          description: lang === 'tr'
            ? 'Elektriksel yanginlarin %30\'u pano ici kablo isinisindan kaynaklanir. Geleneksel duman dedektorleri icten yanmayi tespit edemez.'
            : '30% of electrical fires originate from in-cabinet cable heating. Conventional smoke detectors cannot detect smoldering.',
        },
        {
          id: 'detection',
          badge: lang === 'tr' ? 'ALGILAMA' : 'DETECTION',
          title: lang === 'tr'
            ? 'Kablo Sicakligi & Ark Imza Analizi'
            : 'Cable Temperature & Arc Signature Analysis',
          description: lang === 'tr'
            ? '8 bagimsiz sensor ile kablo sicakligi, izolasyon direnci ve mikro-ark aktivitesi gercek zamanli izlenir.'
            : '8 independent sensors monitor cable temperature, insulation resistance, and micro-arc activity in real-time.',
        },
        {
          id: 'alert',
          badge: lang === 'tr' ? 'DOGRULAMA' : 'VERIFICATION',
          title: lang === 'tr'
            ? 'Ark Imza Guveni & Dogrulama Dongusu'
            : 'Arc Signature Confidence & Verification Cycle',
          description: lang === 'tr'
            ? 'Ark imza guveni esik degerini astiginda otomatik dogrulama dongusu baslar. Yanlis alarm orani minimize edilir.'
            : 'When arc signature confidence exceeds threshold, automatic verification cycle engages. False alarm rate minimized.',
        },
        {
          id: 'action',
          badge: lang === 'tr' ? 'ONLEME' : 'PREVENTION',
          title: lang === 'tr'
            ? 'Proaktif Enerji Kesintisi & Pano Kilitleme'
            : 'Proactive Energy Cutoff & Cabinet Lockout',
          description: lang === 'tr'
            ? 'Kritik icten yanma riskinde otomatik enerji kesintisi ve pano kilitleme. Manuel muayene gerektirmeden sistem korunur.'
            : 'At critical smoldering risk, automated energy cutoff and cabinet lockout. System protection without manual intervention.',
        },
      ] as StoryStep[],
    },
    features: {
      badge: lang === 'tr' ? 'ÖZELLİKLER' : 'FEATURES',
      title: lang === 'tr' ? 'Teknik' : 'Technical',
      titleHighlight: lang === 'tr' ? 'Üstünlükler' : 'Excellence',
      items: [
        {
          id: 'sensors',
          icon: Thermometer,
          title: lang === 'tr' ? 'Çoklu Sensör' : 'Multi-Sensor',
          description: lang === 'tr'
            ? 'Tek kart üzerinde 8 bağımsız sıcaklık ve ark sensörü'
            : '8 independent temperature and arc sensors on a single board',
          value: '8',
          unit: lang === 'tr' ? 'Sensör' : 'Sensors',
          size: 'medium' as const,
        },
        {
          id: 'accuracy',
          icon: Cpu,
          title: lang === 'tr' ? 'Hassasiyet' : 'Accuracy',
          description: lang === 'tr'
            ? 'Endüstriyel kalite sıcaklık ve ark imza ölçümü'
            : 'Industrial-grade temperature and arc signature measurement',
          value: '±0.5',
          unit: '°C',
          size: 'medium' as const,
        },
        {
          id: 'response',
          icon: Zap,
          title: lang === 'tr' ? 'Tepki Süresi' : 'Response Time',
          description: lang === 'tr'
            ? 'Uyarı süresinde milisaniye hassasiyeti'
            : 'Millisecond precision in alert timing',
          value: '<100',
          unit: 'ms',
          size: 'medium' as const,
        },
        {
          id: 'connectivity',
          icon: Radio,
          title: lang === 'tr' ? 'Bağlantı' : 'Connectivity',
          description: lang === 'tr'
            ? 'WiFi, LoRa ve RS485 desteği'
            : 'WiFi, LoRa, and RS485 support',
          size: 'medium' as const,
        },
        {
          id: 'battery',
          icon: Battery,
          title: lang === 'tr' ? 'Pil Ömrü' : 'Battery Life',
          description: lang === 'tr'
            ? 'Düşük güç modu ile uzun ömür'
            : 'Extended life with low power mode',
          value: '5+',
          unit: lang === 'tr' ? 'Yıl' : 'Years',
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
      title: lang === 'tr' ? 'Teknik Özellikler' : 'Technical Specifications',
      items: [
        { label: lang === 'tr' ? 'Ölçüm Aralığı' : 'Measurement Range', value: '-40°C ~ +125°C' },
        { label: lang === 'tr' ? 'Çalışma Gerilimi' : 'Operating Voltage', value: '3.3V ~ 5V DC' },
        { label: lang === 'tr' ? 'Güç Tüketimi' : 'Power Consumption', value: '<50mA (aktif), <1mA (uyku)' },
        { label: lang === 'tr' ? 'Boyutlar' : 'Dimensions', value: '45 x 30 x 8 mm' },
        { label: lang === 'tr' ? 'Koruma Sınıfı' : 'Protection Class', value: 'IP65' },
        { label: lang === 'tr' ? 'Çalışma Sıcaklığı' : 'Operating Temp', value: '-20°C ~ +70°C' },
      ],
    },
    cta: {
      title: lang === 'tr'
        ? 'FireLink\'i Tesisinizde Görün'
        : 'See FireLink in Your Facility',
      subtitle: lang === 'tr'
        ? 'Ücretsiz teknik danışmanlık ve demo için bizimle iletişime geçin.'
        : 'Contact us for free technical consultation and demo.',
      button: lang === 'tr' ? 'Demo Talep Et' : 'Request Demo',
    },
  };

  const getStepComponent = (stepId: string) => {
    switch (stepId) {
      case 'problem':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Zap size={40} className="text-red-500" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">30%</div>
                <div className="text-gray-400 text-sm font-mono">
                  {lang === 'tr' ? 'Elektrik Kaynakli Yanginlar' : 'Electrical Origin Fires'}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                lang === 'tr' ? 'Izolasyon Bozulmasi' : 'Insulation Degradation',
                lang === 'tr' ? 'Kablo Isinmasi' : 'Cable Overheating',
                lang === 'tr' ? 'Mikro-Ark Aktivitesi' : 'Micro-Arc Activity',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-red-500/10 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-gray-300 text-xs font-mono">{item}</span>
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
              <span className="text-orange-400 text-sm font-mono">
                {lang === 'tr' ? 'Kablo Termal Harita' : 'Cable Thermal Map'}
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
            <div className="mt-4 text-[10px] text-gray-400 font-mono">
              {lang === 'tr' ? '100ms aralıkla güncelleniyor' : 'Updating every 100ms'}
            </div>
          </div>
        );
      case 'alert':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col">
            <div className="text-center mb-4">
              <Activity size={32} className="text-yellow-500 mx-auto mb-2" />
              <span className="text-yellow-400 text-sm font-mono">
                {lang === 'tr' ? 'DOGRULAMA DONGUSU' : 'VERIFICATION CYCLE'}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: lang === 'tr' ? 'Ark Imza Analizi' : 'Arc Signature Analysis', time: '<50ms' },
                { label: lang === 'tr' ? 'Izolasyon Direnci' : 'Insulation Resistance', time: '<100ms' },
                { label: lang === 'tr' ? 'Harmonik Bozulma' : 'Harmonic Distortion', time: '<80ms' },
                { label: lang === 'tr' ? 'Toprak Kacagi' : 'Ground Leakage', time: '<60ms' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Cpu size={14} className="text-yellow-400" />
                    <span className="text-gray-300 text-sm font-mono">{item.label}</span>
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
              <span className="text-green-400 text-sm font-mono">
                {lang === 'tr' ? 'PROAKTIF ONLEME' : 'PROACTIVE PREVENTION'}
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: lang === 'tr' ? 'Enerji Kesintisi' : 'Energy Cutoff', status: 'ready' },
                { label: lang === 'tr' ? 'Pano Kilitleme' : 'Cabinet Lockout', status: 'ready' },
                { label: lang === 'tr' ? 'Bara Izolasyonu' : 'Bus Isolation', status: 'standby' },
                { label: lang === 'tr' ? 'Alarm Bildirimi' : 'Alert Notification', status: 'ready' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <span className="text-gray-300 text-sm font-mono">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-gray-400 text-xs font-mono uppercase">{item.status}</span>
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
        deviceType="phone"
      />

      {/* Interactive Demo Section - FireLink Arc Detection */}
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
              FIRELINK ARC DETECTION HUD
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Elektriksel Yangin Erken Uyari Sistemi' : 'Electrical Fire Early Warning System'}
            </h2>
            <p className="text-offwhite-700 max-w-2xl mx-auto font-mono">
              {lang === 'tr'
                ? 'Kablo izolasyon izleme, ark tespiti ve proaktif enerji kesintisi simulasyonu.'
                : 'Cable insulation monitoring, arc detection, and proactive energy cutoff simulation.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FireLinkDemo lang={lang} />
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

      <section className="py-16 bg-onyx-950">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-offwhite-700 mb-4 block">
              {lang === 'tr' ? 'VERİ AKIŞ MİMARİSİ' : 'DATA FLOW ARCHITECTURE'}
            </span>
          </motion.div>
          <AnimatedDataFlow variant="fire" />
        </div>
      </section>

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
              <Zap size={40} style={{ color: accentColor }} />
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
