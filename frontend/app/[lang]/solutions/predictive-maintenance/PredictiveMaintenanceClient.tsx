'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Activity,
  Gauge,
  Waves,
  BarChart3,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  Cpu,
  Wifi,
  Shield,
  Zap,
  Settings,
} from 'lucide-react';
import { ImmersiveHero, StickyScrollStory, BentoGrid } from '@/components/modules';
import type { StoryStep, BentoItem } from '@/components/modules';
import type { Locale } from '@/types';

// Dynamic import for the demo component
const VibrationGuardDemo = dynamic(
  () => import('@/components/products/predictive-maintenance/VibrationGuardDemo'),
  { ssr: false, loading: () => <div className="aspect-[16/10] bg-onyx-800/50 rounded-2xl animate-pulse" /> }
);

interface PredictiveMaintenanceClientProps {
  lang: Locale;
}

export default function PredictiveMaintenanceClient({ lang }: PredictiveMaintenanceClientProps) {
  const accentColor = '#00D4FF'; // Electric Blue for VibrationGuard

  const content = {
    hero: {
      badge: 'VIBRATIONGUARD',
      title: lang === 'tr' ? 'Arizayi' : 'Predict Failures',
      titleHighlight: lang === 'tr' ? 'Onceden Gorun.' : 'Before They Happen.',
      subtitle: lang === 'tr'
        ? 'FFT titresim analizi ve makine ogrenimi ile 2 hafta onceden ariza tahmini.'
        : 'FFT vibration analysis and machine learning for 2-week advance failure prediction.',
      cta: lang === 'tr' ? 'Sistemi Inceleyin' : 'Explore System',
    },
    story: {
      steps: [
        {
          id: 'problem',
          badge: lang === 'tr' ? 'SORUN' : 'THE PROBLEM',
          title: lang === 'tr'
            ? 'Planlanmamis Duruslar Milyonlara Mal Oluyor'
            : 'Unplanned Downtime Costs Millions',
          description: lang === 'tr'
            ? 'Sanayi motorlarindaki beklenmedik arizalar, uretim kaybi, acil onarim maliyetleri ve is guvenligi riskleri olusturur. Geleneksel "bozuldugunda tamir et" yaklasimi artik yetersiz.'
            : 'Unexpected failures in industrial motors cause production loss, emergency repair costs, and workplace safety risks. The traditional "fix when broken" approach is no longer sufficient.',
        },
        {
          id: 'sensing',
          badge: lang === 'tr' ? 'ALGILAMA' : 'SENSING',
          title: lang === 'tr'
            ? '10.000 Hz Titresim Ornekleme'
            : '10,000 Hz Vibration Sampling',
          description: lang === 'tr'
            ? 'MEMS akselerometreler, saniyede 10.000 veri noktasi toplayarak motorun titresim imzasini yakalar. Bu veri, ariza belirtilerinin erken tespit edilmesini saglar.'
            : 'MEMS accelerometers capture 10,000 data points per second, recording the motor\'s vibration signature. This data enables early detection of failure symptoms.',
        },
        {
          id: 'analysis',
          badge: lang === 'tr' ? 'ANALIZ' : 'ANALYSIS',
          title: lang === 'tr'
            ? 'FFT ile Frekans Analizi'
            : 'FFT Frequency Analysis',
          description: lang === 'tr'
            ? 'Hizli Fourier Donusumu (FFT) ile zaman domeni sinyali frekans domenine cevrilir. Her ariza tipi kendine ozgu bir frekans imzasi birakir - rulman hasari, dengesizlik, hizalama hatasi.'
            : 'Fast Fourier Transform (FFT) converts time-domain signals to frequency domain. Each fault type leaves a unique frequency signature - bearing damage, imbalance, misalignment.',
        },
        {
          id: 'prediction',
          badge: lang === 'tr' ? 'TAHMIN' : 'PREDICTION',
          title: lang === 'tr'
            ? 'ML ile 2 Hafta Onceden Uyari'
            : '2-Week Advance Warning with ML',
          description: lang === 'tr'
            ? 'Random Forest ve LSTM modelleri, frekans oruntulerine bakarak arizayi 14 gun oncesinden tahmin eder. Bakim planlama icin kritik zaman kazandirır.'
            : 'Random Forest and LSTM models analyze frequency patterns to predict failures 14 days in advance. Provides critical time for maintenance planning.',
        },
      ] as StoryStep[],
    },
    features: {
      badge: lang === 'tr' ? 'OZELLIKLER' : 'FEATURES',
      title: lang === 'tr' ? 'Industry 4.0' : 'Industry 4.0',
      titleHighlight: lang === 'tr' ? 'Kestirimci Bakim' : 'Predictive Maintenance',
      items: [
        {
          id: 'sampling',
          icon: Activity,
          title: lang === 'tr' ? 'Ornekleme Hizi' : 'Sampling Rate',
          description: lang === 'tr'
            ? '3 eksenli yuksek hizli veri toplama'
            : '3-axis high-speed data acquisition',
          value: '10',
          unit: 'kHz',
          size: 'medium' as const,
        },
        {
          id: 'prediction',
          icon: Clock,
          title: lang === 'tr' ? 'Tahmin Penceresi' : 'Prediction Window',
          description: lang === 'tr'
            ? 'Ariza oncesi uyari suresi'
            : 'Pre-failure warning time',
          value: '14',
          unit: lang === 'tr' ? 'Gun' : 'Days',
          size: 'medium' as const,
        },
        {
          id: 'downtime',
          icon: TrendingDown,
          title: lang === 'tr' ? 'Durus Azalma' : 'Downtime Reduction',
          description: lang === 'tr'
            ? 'Planlanmamis duruslarda azalma'
            : 'Reduction in unplanned downtime',
          value: '78',
          unit: '%',
          size: 'medium' as const,
        },
        {
          id: 'fft',
          icon: BarChart3,
          title: lang === 'tr' ? 'FFT Cozunurluk' : 'FFT Resolution',
          description: lang === 'tr'
            ? 'Detayli frekans analizi'
            : 'Detailed frequency analysis',
          value: '4096',
          unit: lang === 'tr' ? 'Nokta' : 'Points',
          size: 'medium' as const,
        },
        {
          id: 'frequency',
          icon: Waves,
          title: lang === 'tr' ? 'Frekans Araligi' : 'Frequency Range',
          description: lang === 'tr'
            ? 'Genis bant izleme'
            : 'Wide band monitoring',
          value: '0.5-5',
          unit: 'kHz',
          size: 'medium' as const,
        },
        {
          id: 'integration',
          icon: Settings,
          title: lang === 'tr' ? 'SCADA Entegrasyonu' : 'SCADA Integration',
          description: lang === 'tr'
            ? 'OPC-UA ve Modbus protokolleri'
            : 'OPC-UA and Modbus protocols',
          size: 'medium' as const,
        },
      ] as BentoItem[],
    },
    specs: {
      title: lang === 'tr' ? 'Teknik Ozellikler' : 'Technical Specifications',
      items: [
        { label: lang === 'tr' ? 'Sensor Tipi' : 'Sensor Type', value: 'MEMS 3-axis ±16g' },
        { label: lang === 'tr' ? 'Ornekleme' : 'Sampling', value: '10kHz / channel' },
        { label: lang === 'tr' ? 'FFT Cozunurluk' : 'FFT Resolution', value: '4096 points' },
        { label: lang === 'tr' ? 'Frekans Araligi' : 'Frequency Range', value: '0.5Hz - 5kHz' },
        { label: lang === 'tr' ? 'ML Modeli' : 'ML Model', value: 'Random Forest + LSTM' },
        { label: lang === 'tr' ? 'Entegrasyon' : 'Integration', value: 'OPC-UA / Modbus / MQTT' },
        { label: lang === 'tr' ? 'Koruma Sinifi' : 'Protection Class', value: 'IP67' },
        { label: lang === 'tr' ? 'Calisma Sicakligi' : 'Operating Temp', value: '-20°C ~ +70°C' },
      ],
    },
    cta: {
      title: lang === 'tr'
        ? 'Planlanmamis Duruslara Son Verin'
        : 'End Unplanned Downtime',
      subtitle: lang === 'tr'
        ? 'Ucretsiz saha degerlendirmesi ve ROI analizi icin iletisime gecin.'
        : 'Contact us for free site assessment and ROI analysis.',
      button: lang === 'tr' ? 'Demo Talep Et' : 'Request Demo',
    },
  };

  // Step components for sticky scroll story
  const getStepComponent = (stepId: string) => {
    switch (stepId) {
      case 'problem':
        return (
          <div className="h-full bg-gradient-to-br from-red-900/30 to-gray-900 p-6 flex flex-col justify-center items-center">
            <div className="text-center">
              <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
              <div className="text-5xl font-bold text-red-500 mb-2">$250K</div>
              <div className="text-gray-400 text-sm">
                {lang === 'tr' ? 'Ort. Saat Basina Durus Maliyeti' : 'Avg. Hourly Downtime Cost'}
              </div>
              <div className="mt-6 space-y-2">
                {[
                  lang === 'tr' ? 'Uretim Kaybi' : 'Production Loss',
                  lang === 'tr' ? 'Acil Onarim' : 'Emergency Repair',
                  lang === 'tr' ? 'Is Guvenligi Riski' : 'Safety Risk',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'sensing':
        return (
          <div className="h-full bg-gradient-to-br from-cyan-900/30 to-gray-900 p-6 flex flex-col">
            <div className="text-center mb-6">
              <Cpu size={32} className="text-cyan-400 mx-auto mb-2" />
              <span className="text-cyan-400 text-sm font-medium">MEMS Accelerometer</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 text-center">
                {['X', 'Y', 'Z'].map((axis, i) => (
                  <div key={axis} className="p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl font-mono font-bold text-cyan-400">{axis}</div>
                    <div className="text-gray-400 text-xs mt-1">
                      {(Math.random() * 5).toFixed(2)} mm/s
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center text-gray-400 text-xs">
              10,000 {lang === 'tr' ? 'ornekleme/saniye' : 'samples/second'}
            </div>
          </div>
        );
      case 'analysis':
        return (
          <div className="h-full bg-gradient-to-br from-purple-900/30 to-gray-900 p-6 flex flex-col">
            <div className="text-center mb-4">
              <BarChart3 size={32} className="text-purple-400 mx-auto mb-2" />
              <span className="text-purple-400 text-sm font-medium">FFT Spectrum</span>
            </div>
            <div className="flex-1 flex items-end gap-1 px-4">
              {Array.from({ length: 16 }).map((_, i) => {
                const height = 20 + Math.random() * 60 + (i === 5 || i === 10 ? 30 : 0);
                const isHigh = i === 5 || i === 10;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <motion.div
                      className="w-full rounded-t"
                      style={{
                        backgroundColor: isHigh ? '#EF4444' : '#A855F7',
                        height: `${height}%`,
                      }}
                      animate={{ height: [`${height - 10}%`, `${height}%`, `${height - 10}%`] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.05 }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-4">
              <span>0 Hz</span>
              <span>5 kHz</span>
            </div>
          </div>
        );
      case 'prediction':
        return (
          <div className="h-full bg-gradient-to-br from-green-900/30 to-gray-900 p-6 flex flex-col">
            <div className="text-center mb-4">
              <CheckCircle2 size={32} className="text-green-400 mx-auto mb-2" />
              <span className="text-green-400 text-sm font-medium">
                {lang === 'tr' ? 'Tahmin Sonucu' : 'Prediction Result'}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-yellow-500" />
                  <span className="text-yellow-500 font-medium">
                    {lang === 'tr' ? 'Rulman Asiniasi Tespit' : 'Bearing Wear Detected'}
                  </span>
                </div>
                <div className="text-gray-400 text-xs">
                  {lang === 'tr'
                    ? 'Tahmini ariza: 12-16 gun icinde'
                    : 'Estimated failure: within 12-16 days'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">14</div>
                  <div className="text-[10px] text-gray-400">
                    {lang === 'tr' ? 'Gun Kaldi' : 'Days Left'}
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-2xl font-bold text-cyan-400">94%</div>
                  <div className="text-[10px] text-gray-400">
                    {lang === 'tr' ? 'Guven' : 'Confidence'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const storySteps: StoryStep[] = content.story.steps.map((step) => ({
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

      <StickyScrollStory steps={storySteps} lang={lang} deviceType="tablet" />

      {/* Interactive Demo Section */}
      <section id="demo" className="py-24 md:py-32 bg-onyx-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: accentColor }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
              {lang === 'tr' ? 'INTERAKTIF DEMO' : 'INTERACTIVE DEMO'}
              <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'VibrationGuard Deneyimi' : 'VibrationGuard Experience'}
            </h2>
            <p className="text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Simulasyonu baslatarak farkli ariza senaryolarini deneyimleyin.'
                : 'Start the simulation to experience different failure scenarios.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <VibrationGuardDemo lang={lang} />
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
              <Activity size={40} style={{ color: accentColor }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-4">
              {content.cta.title}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">{content.cta.subtitle}</p>
            <Link
              href={`/${lang}/contact?subject=vibrationguard-demo`}
              className="group inline-flex items-center gap-3 px-8 py-4 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              <span>{content.cta.button}</span>
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
