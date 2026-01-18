'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Users,
  Wrench,
  BarChart3,
  Lock,
  Leaf,
  Smartphone,
  QrCode,
  CreditCard,
  Settings,
  Bell,
  Shield,
  Zap,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import ScrollyTellingContainer, {
  type ScrollyScene,
} from '@/components/premium/ScrollyTellingContainer';

// Lazy load 3D component for performance
const NetworkGlobe = dynamic(
  () => import('@/components/premium/3d/NetworkGlobe'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
    ),
  }
);

// Lazy load the Residence Mobile Demo
const ResidenceMobileDemo = dynamic(
  () => import('@/components/products/residence/ResidenceMobileDemo'),
  { ssr: false, loading: () => <div className="h-[600px] animate-pulse bg-onyx-800/50 rounded-3xl" /> }
);

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
      id: 'mobile',
      badge: lang === 'tr' ? 'MOBIL UYGULAMA' : 'MOBILE APP',
      title: lang === 'tr' ? 'Avucunuzdaki Site Yonetimi' : 'Site Management in Your Palm',
      content:
        lang === 'tr'
          ? 'iOS ve Android uygulamasi ile tum site islemlerinizi mobil cihazinizdan yonetin. Ariza bildirimi, aidat odeme, duyurulari takip - hepsi tek uygulamada.'
          : 'Manage all your site operations from your mobile device with iOS and Android app. Fault reporting, dues payment, announcements - all in one app.',
      stats: [
        { label: lang === 'tr' ? 'Gunluk Aktif' : 'Daily Active', value: '85%' },
        { label: lang === 'tr' ? 'Islem Suresi' : 'Process Time', value: '<2s' },
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

  // Core platform modules
  const platformModules = [
    {
      icon: Building2,
      title: lang === 'tr' ? 'Site Yonetim Paneli' : 'Site Management Panel',
      description:
        lang === 'tr'
          ? 'Web tabanli yonetim paneli ile tum site operasyonlarini tek ekrandan yonetin. Dashboard, raporlar, sakin veritabani.'
          : 'Manage all site operations from a single screen with web-based management panel. Dashboard, reports, resident database.',
      features: [
        lang === 'tr' ? 'Canli dashboard' : 'Live dashboard',
        lang === 'tr' ? 'Detayli raporlama' : 'Detailed reporting',
        lang === 'tr' ? 'Sakin yonetimi' : 'Resident management',
      ],
    },
    {
      icon: Smartphone,
      title: lang === 'tr' ? 'Mobil Uygulama' : 'Mobile Application',
      description:
        lang === 'tr'
          ? 'Sakinler icin iOS ve Android uygulamasi. Bildirimler, odemeler, arizalar - her sey parmaklarinin ucunda.'
          : 'iOS and Android app for residents. Notifications, payments, faults - everything at your fingertips.',
      features: [
        lang === 'tr' ? 'Push bildirimler' : 'Push notifications',
        lang === 'tr' ? 'Anlık mesajlaşma' : 'Instant messaging',
        lang === 'tr' ? 'Kolay odeme' : 'Easy payment',
      ],
    },
    {
      icon: CreditCard,
      title: lang === 'tr' ? 'Aidat Takip Sistemi' : 'Dues Tracking System',
      description:
        lang === 'tr'
          ? 'Otomatik aidat hesaplama, hatirlatma ve tahsilat. Banka entegrasyonu ile anlık odeme takibi.'
          : 'Automatic dues calculation, reminders and collection. Instant payment tracking with bank integration.',
      features: [
        lang === 'tr' ? 'Otomatik faturalama' : 'Auto billing',
        lang === 'tr' ? 'Banka entegrasyonu' : 'Bank integration',
        lang === 'tr' ? 'Gecikme takibi' : 'Late payment tracking',
      ],
    },
    {
      icon: QrCode,
      title: lang === 'tr' ? 'QR Misafir Girisi' : 'QR Guest Entry',
      description:
        lang === 'tr'
          ? 'Misafirleriniz icin tek kullanimlik QR kod olusturun. Guvenli, hizli ve kayitli giris sistemi.'
          : 'Create one-time QR codes for your guests. Secure, fast and registered entry system.',
      features: [
        lang === 'tr' ? 'Tek kullanimlik kod' : 'One-time code',
        lang === 'tr' ? 'Zaman sinirli erisim' : 'Time-limited access',
        lang === 'tr' ? 'Giris kaydi' : 'Entry logging',
      ],
    },
  ];

  // Additional feature cards
  const features = [
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
      icon: Bell,
      title: lang === 'tr' ? 'Akilli Bildirimler' : 'Smart Notifications',
      description:
        lang === 'tr'
          ? 'Onemli duyurular, odeme hatirlatalari, ariza guncelemeleri.'
          : 'Important announcements, payment reminders, fault updates.',
    },
    {
      icon: Shield,
      title: lang === 'tr' ? 'Guvenlik Izleme' : 'Security Monitoring',
      description:
        lang === 'tr'
          ? '7/24 kamera izleme, hareket algilama, acil durum protokolleri.'
          : '24/7 camera monitoring, motion detection, emergency protocols.',
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
    <div className="min-h-screen bg-background">
      {/* Scrollytelling Section */}
      <ScrollyTellingContainer scenes={scenes} />

      {/* 3D Network Globe Showcase */}
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <NetworkGlobe />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'BAGLI EKOSISTEM' : 'CONNECTED ECOSYSTEM'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {lang === 'tr' ? 'Tum Sistemler Tek Platformda' : 'All Systems in One Platform'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Site yonetimi, sakin portali, aidat takibi, misafir girisi - hepsi birbiriyle entegre.'
                : 'Site management, resident portal, dues tracking, guest entry - all integrated with each other.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Modules - Main Features */}
      <section className="py-32 dark:bg-onyx-950 light:bg-gray-50">
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
              {lang === 'tr' ? 'PLATFORM MODULLERI' : 'PLATFORM MODULES'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {lang === 'tr' ? 'Ana Moduller' : 'Core Modules'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Site yonetiminin tum ihtiyaclarini karsilayan entegre moduller.'
                : 'Integrated modules meeting all site management needs.'}
            </p>
          </motion.div>

          {/* Platform Modules Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {platformModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 rounded-2xl transition-all duration-300 dark:bg-gradient-to-br dark:from-onyx-800/80 dark:to-onyx-800/40 dark:border dark:border-white/5 dark:hover:border-engineer-500/30 light:bg-white light:border light:border-gray-200 light:hover:border-engineer-500/50 light:shadow-sm light:hover:shadow-lg"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-engineer-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-engineer-500/20 transition-colors">
                      <Icon size={32} className="text-engineer-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {module.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{module.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {module.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-engineer-500/10 text-engineer-500 text-xs font-medium rounded-full"
                          >
                            <span className="w-1 h-1 rounded-full bg-engineer-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-foreground">
              {lang === 'tr' ? 'Ek Ozellikler' : 'Additional Features'}
            </h3>
          </motion.div>

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
                  className="group p-6 rounded-xl transition-all duration-300 dark:bg-onyx-800/50 dark:border dark:border-white/5 dark:hover:border-engineer-500/30 light:bg-white light:border light:border-gray-200 light:hover:border-engineer-500/50 light:shadow-sm light:hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-4 group-hover:bg-engineer-500/20 transition-colors">
                    <Icon size={24} className="text-engineer-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Mobile App Demo */}
      <section className="py-20 dark:bg-onyx-900 light:bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'MOBİL UYGULAMA' : 'MOBILE APP'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {lang === 'tr' ? 'Dijital Kapıcı' : 'Digital Concierge'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Kapıyı açın, misafir QR kodu oluşturun, interkom çağrılarını yanıtlayın - hepsi avucunuzda.'
                : 'Unlock the door, generate guest QR codes, answer intercom calls - all in your palm.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ResidenceMobileDemo lang={lang} />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y dark:border-white/5 light:border-gray-200">
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
                <div className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
            <Zap size={48} className="text-engineer-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t.smartResidence.cta}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {lang === 'tr'
                ? 'Site yonetiminizi dijitallestirelim. Muhendislik ekibimiz sizinle.'
                : "Let's digitalize your site management. Our engineering team is with you."}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-engineer-500/25"
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
