'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building,
  Users,
  MessageSquare,
  Bell,
  Shield,
  Car,
  Package,
  Wrench,
  CreditCard,
  Camera,
  Lock,
  Wifi,
  Zap,
  Leaf,
  Phone,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import ScrollyTellingContainer, {
  type ScrollyScene,
} from '@/components/premium/ScrollyTellingContainer';

// Lazy load the interactive demo
const SmartApartmentInteractiveDemo = dynamic(
  () => import('@/components/solutions/smart-apartment/SmartApartmentInteractiveDemo'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] animate-pulse rounded-3xl bg-card border border-border flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Yükleniyor...</div>
      </div>
    ),
  }
);

interface SmartApartmentClientProps {
  lang: Locale;
}

export default function SmartApartmentClient({ lang }: SmartApartmentClientProps) {
  const t = getTranslations(lang);

  // Scrollytelling scenes
  const scenes: ScrollyScene[] = [
    {
      id: 'hero',
      badge: lang === 'tr' ? 'AKILLI APARTMAN' : 'SMART APARTMENT',
      title: lang === 'tr' ? 'Birlikte Daha Akıllı' : 'Smarter Together',
      subtitle: lang === 'tr' ? 'Ortak Alan Yönetimi' : 'Common Area Management',
      content: lang === 'tr'
        ? 'Modern apartman yaşamı için tasarlanmış, sakinleri ve yönetimi bir araya getiren dijital platform.'
        : 'Digital platform designed for modern apartment living, connecting residents and management.',
    },
    {
      id: 'communication',
      badge: lang === 'tr' ? 'İLETİŞİM' : 'COMMUNICATION',
      title: lang === 'tr' ? 'Anında Bağlantı' : 'Instant Connection',
      content: lang === 'tr'
        ? 'Yönetim duyuruları, sakin talepleri ve acil bildirimler tek platformda. Herkesi bilgilendirin, her zaman.'
        : 'Management announcements, resident requests, and emergency notifications in one platform. Keep everyone informed, always.',
      stats: [
        { label: lang === 'tr' ? 'Okuma Oranı' : 'Read Rate', value: '94%' },
        { label: lang === 'tr' ? 'Yanıt Süresi' : 'Response Time', value: '<5dk' },
      ],
    },
    {
      id: 'security',
      badge: lang === 'tr' ? 'GÜVENLİK' : 'SECURITY',
      title: lang === 'tr' ? 'Güvenli Giriş-Çıkış' : 'Secure Access Control',
      content: lang === 'tr'
        ? 'Kart, QR kod veya mobil uygulama ile giriş. Misafir yetkilendirme ve araç plaka tanıma sistemi.'
        : 'Entry via card, QR code, or mobile app. Guest authorization and vehicle plate recognition system.',
      stats: [
        { label: lang === 'tr' ? 'Erişim Yöntemi' : 'Access Methods', value: '5+' },
        { label: lang === 'tr' ? 'Giriş Kaydı' : 'Entry Logs', value: '100%' },
      ],
    },
    {
      id: 'services',
      badge: lang === 'tr' ? 'HİZMETLER' : 'SERVICES',
      title: lang === 'tr' ? 'Günlük Yaşam Kolaylığı' : 'Daily Living Convenience',
      content: lang === 'tr'
        ? 'Kargo takibi, otopark yönetimi, bakım talepleri. Apartman yaşamı artık çok daha pratik.'
        : 'Package tracking, parking management, maintenance requests. Apartment living is now much more practical.',
      stats: [
        { label: lang === 'tr' ? 'Hizmet Türü' : 'Service Types', value: '12+' },
        { label: lang === 'tr' ? 'Memnuniyet' : 'Satisfaction', value: '%96' },
      ],
    },
  ];

  // Core features
  const coreFeatures = [
    {
      icon: MessageSquare,
      title: lang === 'tr' ? 'Dijital Duyuru Paneli' : 'Digital Announcement Board',
      description: lang === 'tr'
        ? 'Yönetim duyuruları, toplantı bildirimleri ve önemli haberler anında tüm sakinlere ulaşır.'
        : 'Management announcements, meeting notifications, and important news reach all residents instantly.',
      features: [
        lang === 'tr' ? 'Push bildirimleri' : 'Push notifications',
        lang === 'tr' ? 'Okuma takibi' : 'Read tracking',
        lang === 'tr' ? 'Önem derecesi' : 'Priority levels',
      ],
    },
    {
      icon: Lock,
      title: lang === 'tr' ? 'Akıllı Kapı Sistemi' : 'Smart Door System',
      description: lang === 'tr'
        ? 'Mobil uygulama, NFC kart veya QR kod ile giriş. Misafirleriniz için geçici erişim kodları oluşturun.'
        : 'Entry via mobile app, NFC card, or QR code. Create temporary access codes for your guests.',
      features: [
        lang === 'tr' ? 'Çoklu erişim' : 'Multi-access',
        lang === 'tr' ? 'Misafir yetki' : 'Guest access',
        lang === 'tr' ? 'Giriş kaydı' : 'Entry logging',
      ],
    },
    {
      icon: Package,
      title: lang === 'tr' ? 'Kargo Takip Sistemi' : 'Package Tracking System',
      description: lang === 'tr'
        ? 'Kargonuz geldiğinde anında bildirim alın. Akıllı kargo dolabı entegrasyonu ile 7/24 teslim alın.'
        : 'Get instant notifications when your package arrives. 24/7 pickup with smart locker integration.',
      features: [
        lang === 'tr' ? 'Anlık bildirim' : 'Instant alerts',
        lang === 'tr' ? 'Dolap entegrasyonu' : 'Locker integration',
        lang === 'tr' ? 'Kurye takibi' : 'Courier tracking',
      ],
    },
    {
      icon: Car,
      title: lang === 'tr' ? 'Otopark Yönetimi' : 'Parking Management',
      description: lang === 'tr'
        ? 'Plaka tanıma ile otomatik bariyer. Misafir park yetkisi ve boş park yeri görüntüleme.'
        : 'Automatic barrier with plate recognition. Guest parking authorization and vacant spot viewing.',
      features: [
        lang === 'tr' ? 'Plaka tanıma' : 'Plate recognition',
        lang === 'tr' ? 'Boş yer gösterimi' : 'Vacant spots',
        lang === 'tr' ? 'Misafir park' : 'Guest parking',
      ],
    },
  ];

  // Additional services
  const additionalServices = [
    {
      icon: Wrench,
      title: lang === 'tr' ? 'Arıza Bildirimi' : 'Fault Reporting',
      description: lang === 'tr'
        ? 'Fotoğraflı arıza bildirimi, durum takibi, tamamlanma bildirimi.'
        : 'Photo fault reporting, status tracking, completion notification.',
    },
    {
      icon: CreditCard,
      title: lang === 'tr' ? 'Aidat Ödeme' : 'Dues Payment',
      description: lang === 'tr'
        ? 'Mobil ödeme, otomatik tahsilat, borç takibi ve hatırlatma.'
        : 'Mobile payment, automatic collection, debt tracking and reminders.',
    },
    {
      icon: Camera,
      title: lang === 'tr' ? 'Güvenlik Kameraları' : 'Security Cameras',
      description: lang === 'tr'
        ? 'Ortak alan izleme, hareket algılama, kayıt arşivi.'
        : 'Common area monitoring, motion detection, recording archive.',
    },
    {
      icon: Users,
      title: lang === 'tr' ? 'Sakin Portalı' : 'Resident Portal',
      description: lang === 'tr'
        ? 'Kişisel profil, tercihler, komşularla iletişim.'
        : 'Personal profile, preferences, communication with neighbors.',
    },
    {
      icon: Phone,
      title: lang === 'tr' ? 'İnterkom Sistemi' : 'Intercom System',
      description: lang === 'tr'
        ? 'IP tabanlı interkom, mobil cevaplama, video görüşme.'
        : 'IP-based intercom, mobile answering, video calling.',
    },
    {
      icon: Leaf,
      title: lang === 'tr' ? 'Enerji İzleme' : 'Energy Monitoring',
      description: lang === 'tr'
        ? 'Ortak alan tüketimi, karşılaştırmalı raporlar, tasarruf önerileri.'
        : 'Common area consumption, comparative reports, savings suggestions.',
    },
  ];

  // Stats
  const stats = [
    { value: '50-200', label: lang === 'tr' ? 'Daire' : 'Units' },
    { value: '%40', label: lang === 'tr' ? 'Maliyet Azalma' : 'Cost Reduction' },
    { value: '24/7', label: lang === 'tr' ? 'Destek' : 'Support' },
    { value: '99.9%', label: lang === 'tr' ? 'Uptime' : 'Uptime' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Scrollytelling Section */}
      <ScrollyTellingContainer scenes={scenes} />

      {/* Interactive Demo Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'İNTERAKTİF DEMO' : 'INTERACTIVE DEMO'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {lang === 'tr' ? 'Apartmanınızı Keşfedin' : 'Explore Your Apartment'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Odaları seçin, sensör verilerini görüntüleyin, akıllı sistemleri deneyimleyin.'
                : 'Select rooms, view sensor data, experience smart systems.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <SmartApartmentInteractiveDemo lang={lang} />
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-32 bg-background">
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
              {lang === 'tr' ? 'TEMEL ÖZELLİKLER' : 'CORE FEATURES'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {lang === 'tr' ? 'Apartman Yaşamı Yeniden' : 'Apartment Living Reimagined'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Sakinler ve yönetim arasında kusursuz iletişim ve verimli operasyonlar.'
                : 'Seamless communication between residents and management with efficient operations.'}
            </p>
          </motion.div>

          {/* Core Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 rounded-2xl border transition-all duration-300 bg-card border-border hover:shadow-lg hover:border-engineer-500/30"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-engineer-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-engineer-500/20 transition-colors">
                      <Icon size={32} className="text-engineer-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-engineer-500/10 text-engineer-500 text-xs font-medium rounded-full"
                          >
                            <span className="w-1 h-1 rounded-full bg-engineer-500" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-foreground">
              {lang === 'tr' ? 'Ek Hizmetler' : 'Additional Services'}
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-6 rounded-xl border transition-all duration-300 bg-card border-border hover:border-engineer-500/30 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-lg bg-engineer-500/10 flex items-center justify-center mb-4 group-hover:bg-engineer-500/20 transition-colors">
                    <Icon size={24} className="text-engineer-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Mobile App Showcase */}
      <section className="py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
                <span className="w-8 h-px bg-engineer-500" />
                {lang === 'tr' ? 'MOBİL UYGULAMA' : 'MOBILE APP'}
                <span className="w-8 h-px bg-engineer-500" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {lang === 'tr' ? 'Apartmanınız Cebinizde' : 'Your Apartment in Your Pocket'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {lang === 'tr'
                  ? 'iOS ve Android için geliştirilmiş kullanıcı dostu arayüz. Tüm apartman hizmetlerine tek uygulamadan ulaşın.'
                  : 'User-friendly interface developed for iOS and Android. Access all apartment services from a single app.'}
              </p>

              <div className="space-y-4">
                {[
                  { icon: Bell, text: lang === 'tr' ? 'Anlık bildirimler' : 'Instant notifications' },
                  { icon: Lock, text: lang === 'tr' ? 'Biyometrik giriş' : 'Biometric login' },
                  { icon: Wifi, text: lang === 'tr' ? 'Çevrimdışı mod' : 'Offline mode' },
                  { icon: Shield, text: lang === 'tr' ? 'Uçtan uca şifreleme' : 'End-to-end encryption' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center">
                      <item.icon size={20} className="text-engineer-500" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative mx-auto w-64 md:w-72">
                {/* Phone frame */}
                <div className="relative rounded-[3rem] p-2 bg-gray-800 dark:bg-onyx-800 shadow-2xl">
                  {/* Screen */}
                  <div className="rounded-[2.5rem] overflow-hidden aspect-[9/19] bg-gray-900 dark:bg-onyx-900">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl" />

                    {/* App UI Mock */}
                    <div className="p-4 pt-8 h-full flex flex-col">
                      {/* Status bar */}
                      <div className="flex items-center justify-between text-white/60 text-xs mb-4">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <Wifi size={12} />
                          <span>100%</span>
                        </div>
                      </div>

                      {/* Welcome */}
                      <div className="mb-6">
                        <p className="text-white/60 text-xs">{lang === 'tr' ? 'Hoş geldiniz' : 'Welcome'}</p>
                        <p className="text-white text-lg font-semibold">Ali Yılmaz</p>
                        <p className="text-white/40 text-xs">Blok A, Daire 12</p>
                      </div>

                      {/* Quick actions */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { icon: Lock, label: lang === 'tr' ? 'Kapı Aç' : 'Open Door', color: '#10B981' },
                          { icon: Package, label: lang === 'tr' ? 'Kargo' : 'Package', color: '#F97316' },
                          { icon: Car, label: lang === 'tr' ? 'Otopark' : 'Parking', color: '#3B82F6' },
                          { icon: Wrench, label: lang === 'tr' ? 'Arıza' : 'Report', color: '#EF4444' },
                        ].map((action, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-1 p-3 rounded-xl"
                            style={{ backgroundColor: `${action.color}20` }}
                          >
                            <action.icon size={20} style={{ color: action.color }} />
                            <span className="text-white/80 text-[10px]">{action.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Recent activity */}
                      <div className="flex-1">
                        <p className="text-white/40 text-xs mb-2">{lang === 'tr' ? 'Son Aktivite' : 'Recent Activity'}</p>
                        <div className="space-y-2">
                          {[
                            { text: lang === 'tr' ? 'Aidat ödemesi alındı' : 'Dues payment received', time: '2dk' },
                            { text: lang === 'tr' ? 'Yeni duyuru' : 'New announcement', time: '1s' },
                          ].map((activity, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                              <span className="text-white/80 text-xs">{activity.text}</span>
                              <span className="text-white/40 text-[10px]">{activity.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-4 rounded-[4rem] bg-engineer-500/20 blur-3xl -z-10" />
              </div>
            </motion.div>
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
            <Building size={48} className="text-engineer-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {lang === 'tr' ? 'Apartmanınızı Dijitalleştirin' : 'Digitalize Your Apartment'}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {lang === 'tr'
                ? 'Mühendislik ekibimiz apartman yönetiminiz için özel çözümler sunuyor.'
                : 'Our engineering team offers custom solutions for your apartment management.'}
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
