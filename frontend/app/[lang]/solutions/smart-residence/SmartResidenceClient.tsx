'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Users,
  Wrench,
  BarChart3,
  Lock,
  Leaf,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import ScrollyTellingContainer, {
  type ScrollyScene,
} from '@/components/premium/ScrollyTellingContainer';

interface SmartResidenceClientProps {
  lang: Locale;
}

export default function SmartResidenceClient({ lang }: SmartResidenceClientProps) {
  const t = getTranslations(lang);

  // Scrollytelling scenes
  const scenes: ScrollyScene[] = [
    {
      id: 'hero',
      badge: t.smartResidence.badge,
      title: t.smartResidence.heroTitle,
      subtitle: t.smartResidence.heroHighlight,
      content: t.smartResidence.heroSubtitle,
    },
    {
      id: 'platform',
      badge: lang === 'tr' ? 'PLATFORM' : 'PLATFORM',
      title: t.smartResidence.scene1Title,
      content: t.smartResidence.scene1Text,
      stats: [
        { label: lang === 'tr' ? 'Daire' : 'Units', value: '500+' },
        { label: lang === 'tr' ? 'Veri Noktasi' : 'Data Points', value: '10K+' },
      ],
    },
    {
      id: 'access',
      badge: lang === 'tr' ? 'ERISIM' : 'ACCESS',
      title: t.smartResidence.scene2Title,
      content: t.smartResidence.scene2Text,
      stats: [
        { label: lang === 'tr' ? 'Kullanici' : 'Users', value: lang === 'tr' ? 'Sinirsiz' : 'Unlimited' },
        { label: lang === 'tr' ? 'Erisim Turu' : 'Access Types', value: '8+' },
      ],
    },
    {
      id: 'maintenance',
      badge: lang === 'tr' ? 'BAKIM' : 'MAINTENANCE',
      title: t.smartResidence.scene3Title,
      content: t.smartResidence.scene3Text,
      stats: [
        { label: lang === 'tr' ? 'Ongoru Suresi' : 'Prediction Time', value: '72h' },
        { label: lang === 'tr' ? 'Maliyet Azalma' : 'Cost Reduction', value: '%60' },
      ],
    },
  ];

  // Feature cards
  const features = [
    {
      icon: Building2,
      title: lang === 'tr' ? 'Bina Yonetim Sistemi' : 'Building Management',
      description:
        lang === 'tr'
          ? 'HVAC, aydinlatma, asansor - tek platformda entegre yonetim.'
          : 'HVAC, lighting, elevators - integrated management in one platform.',
    },
    {
      icon: Users,
      title: lang === 'tr' ? 'Sakin Portali' : 'Resident Portal',
      description:
        lang === 'tr'
          ? 'Mobil uygulama ile ariza bildirimi, aidat takibi, duyurular.'
          : 'Mobile app for fault reporting, dues tracking, announcements.',
    },
    {
      icon: Lock,
      title: lang === 'tr' ? 'Erisim Kontrolu' : 'Access Control',
      description:
        lang === 'tr'
          ? 'QR kod, yuz tanima, plaka okuma - coklu erisim yontemleri.'
          : 'QR code, face recognition, plate reading - multiple access methods.',
    },
    {
      icon: Wrench,
      title: lang === 'tr' ? 'Kestirimci Bakim' : 'Predictive Maintenance',
      description:
        lang === 'tr'
          ? 'Algoritmik analiz ile ariza olusmadan mudahale.'
          : 'Intervention before failure with algorithmic analysis.',
    },
    {
      icon: BarChart3,
      title: lang === 'tr' ? 'Enerji Analitigi' : 'Energy Analytics',
      description:
        lang === 'tr'
          ? 'Daire bazli tuketim takibi, karsilastirmali raporlar.'
          : 'Unit-based consumption tracking, comparative reports.',
    },
    {
      icon: Leaf,
      title: lang === 'tr' ? 'Surdurulebilirlik' : 'Sustainability',
      description:
        lang === 'tr'
          ? 'Karbon ayak izi takibi, yesil bina sertifikasyonu destegi.'
          : 'Carbon footprint tracking, green building certification support.',
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
              {lang === 'tr' ? 'MODULLER' : 'MODULES'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr' ? 'Platform Modulleri' : 'Platform Modules'}
            </h2>
            <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Ihtiyaciniza gore olceklenen, birbirine entegre moduller.'
                : 'Modules that scale to your needs and integrate with each other.'}
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

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: '500+',
                label: lang === 'tr' ? 'Yonetilebilir Daire' : 'Manageable Units',
              },
              {
                value: '%60',
                label: lang === 'tr' ? 'Bakim Tasarrufu' : 'Maintenance Savings',
              },
              {
                value: '2.1M',
                label: lang === 'tr' ? 'Yillik Tasarruf (TL)' : 'Annual Savings (TL)',
              },
              {
                value: '24/7',
                label: lang === 'tr' ? 'Izleme' : 'Monitoring',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-mono text-4xl md:text-5xl font-bold text-offwhite-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-offwhite-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
              {t.smartResidence.cta}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {lang === 'tr'
                ? 'Site yonetiminizi dijitallestirelim. Muhendislik ekibimiz sizinle.'
                : "Let's digitalize your site management. Our engineering team is with you."}
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
