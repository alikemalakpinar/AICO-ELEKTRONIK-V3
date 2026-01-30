'use client';

import React, { useCallback } from 'react';
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
import { useSceneStore, type ResidenceSceneType } from '@/stores/sceneStore';

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

// Lazy load 3D Residence Scene
const ResidenceScene = dynamic(
  () => import('@/components/premium/3d/ResidenceScene'),
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
  { ssr: false, loading: () => <div className="h-[600px] animate-pulse bg-card border border-border rounded-3xl" /> }
);

interface SmartResidenceClientProps {
  lang: Locale;
}

// Map scrollytelling scene IDs to ResidenceScene camera positions
const SCENE_ID_TO_RESIDENCE: Record<string, ResidenceSceneType> = {
  hero: 'intro',
  morning: 'intro',
  infrastructure: 'infrastructure',
  noon: 'platform',
  evening: 'mobile',
  night: 'access',
  platform: 'platform',
  mobile: 'mobile',
  access: 'access',
  maintenance: 'dashboard',
};

export default function SmartResidenceClient({ lang }: SmartResidenceClientProps) {
  const t = getTranslations(lang);
  const setResidenceScene = useSceneStore((s) => s.setResidenceScene);

  // Drive 3D camera from scroll position
  const handleSceneChange = useCallback(
    (_index: number, sceneId: string) => {
      const mapped = SCENE_ID_TO_RESIDENCE[sceneId] || 'intro';
      setResidenceScene(mapped);
    },
    [setResidenceScene]
  );

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
      id: 'morning',
      badge: '08:00',
      title: lang === 'tr' ? 'Günaydın, Enerji Tasarrufu Aktif' : 'Good Morning, Energy Savings Active',
      content: lang === 'tr'
        ? 'Sakinler uyanmadan önce sistem gece modundan çıkar. Ortak alan aydınlatması gün ışığına göre ayarlanır, asansörler standby moddan aktif moda geçer.'
        : 'Before residents wake up, the system exits night mode. Common area lighting adjusts to daylight, elevators switch from standby to active mode.',
      stats: [
        { label: lang === 'tr' ? 'Enerji Tasarrufu' : 'Energy Savings', value: '%35' },
        { label: lang === 'tr' ? 'Aktif Sistem' : 'Active Systems', value: '12' },
      ],
    },
    {
      id: 'infrastructure',
      badge: lang === 'tr' ? 'ALTYAPI' : 'INFRASTRUCTURE',
      title: lang === 'tr' ? 'Elektrik Panosu & FireLink Zonu' : 'Electrical Cabinet & FireLink Zone',
      content: lang === 'tr'
        ? 'Bodrum katında bulunan ana elektrik panolarında ark algılama ve kablo yalıtım izleme sistemi aktif. FireLink, yalıtım bozulmasını termal baskı öncesinde tespit eder ve koruyucu devre kesiciyi devreye sokar.'
        : 'Arc detection and cable insulation monitoring active in basement electrical cabinets. FireLink detects insulation degradation before thermal buildup and engages preventive circuit breakers.',
      stats: [
        { label: lang === 'tr' ? 'Ark Algılama' : 'Arc Detection', value: '<50ms' },
        { label: lang === 'tr' ? 'Kablo İzleme' : 'Cable Monitor', value: '24/7' },
      ],
    },
    {
      id: 'noon',
      badge: '12:00',
      title: lang === 'tr' ? 'Yoğun Saat, Akıllı Yük Dengeleme' : 'Peak Hours, Smart Load Balancing',
      content: lang === 'tr'
        ? 'Gün ortasında enerji tüketimi zirveye ulaşır. Sistem otomatik olarak yük dengeleme yapar, klimaları optimize eder ve ortak alan aydınlatmasını doğal ışığa göre kısar.'
        : 'Energy consumption peaks at midday. The system automatically balances loads, optimizes HVAC units, and dims common area lighting based on natural light.',
      stats: [
        { label: lang === 'tr' ? 'Yük Optimizasyonu' : 'Load Optimization', value: '%28' },
        { label: lang === 'tr' ? 'Aktif Sensör' : 'Active Sensors', value: '340+' },
      ],
    },
    {
      id: 'evening',
      badge: '18:00',
      title: lang === 'tr' ? 'Hoş Geldiniz, Otomasyon Aktif' : 'Welcome Home, Automation Active',
      content: lang === 'tr'
        ? 'Sakinler eve dönerken sistem otomatik karşılama senaryolarını devreye sokar. Lobi aydınlatması artırılır, asansör öncelikleri ayarlanır, otopark bariyerleri hızlandırılır.'
        : 'As residents return home, the system activates automated welcome sequences. Lobby lighting increases, elevator priorities adjust, parking barriers speed up.',
      stats: [
        { label: lang === 'tr' ? 'Giriş Hızı' : 'Entry Speed', value: '<3s' },
        { label: lang === 'tr' ? 'Aktif Senaryo' : 'Active Scenarios', value: '8' },
      ],
    },
    {
      id: 'night',
      badge: '23:00',
      title: lang === 'tr' ? 'Gece Güvenlik Modu Aktif' : 'Night Security Mode Active',
      content: lang === 'tr'
        ? 'Gece modu devreye girer: güvenlik kameraları yüksek hassasiyete geçer, ortak alan ışıkları minimuma düşer, asansörler enerji tasarruf moduna alınır. Tüm giriş-çıkışlar kayıt altında.'
        : 'Night mode activates: security cameras switch to high sensitivity, common area lights dim to minimum, elevators enter energy saving mode. All entries and exits are logged.',
      stats: [
        { label: lang === 'tr' ? 'Gece Tasarrufu' : 'Night Savings', value: '%55' },
        { label: lang === 'tr' ? 'Güvenlik Seviyesi' : 'Security Level', value: 'MAX' },
      ],
    },
    {
      id: 'platform',
      badge: lang === 'tr' ? 'PLATFORM' : 'PLATFORM',
      title: t.smartResidence.scene1Title,
      content: t.smartResidence.scene1Text,
      stats: [
        { label: lang === 'tr' ? 'Daire' : 'Units', value: '500+' },
        { label: lang === 'tr' ? 'Veri Noktası' : 'Data Points', value: '10K+' },
      ],
    },
    {
      id: 'mobile',
      badge: lang === 'tr' ? 'MOBİL UYGULAMA' : 'MOBILE APP',
      title: lang === 'tr' ? 'Avucunuzdaki Site Yönetimi' : 'Site Management in Your Palm',
      content:
        lang === 'tr'
          ? 'iOS ve Android uygulaması ile tüm site işlemlerinizi mobil cihazınızdan yönetin. Arıza bildirimi, aidat ödeme, duyuruları takip - hepsi tek uygulamada.'
          : 'Manage all your site operations from your mobile device with iOS and Android app. Fault reporting, dues payment, announcements - all in one app.',
      stats: [
        { label: lang === 'tr' ? 'Günlük Aktif' : 'Daily Active', value: '85%' },
        { label: lang === 'tr' ? 'İşlem Süresi' : 'Process Time', value: '<2s' },
      ],
    },
    {
      id: 'access',
      badge: lang === 'tr' ? 'ERİŞİM' : 'ACCESS',
      title: t.smartResidence.scene2Title,
      content: t.smartResidence.scene2Text,
      stats: [
        { label: lang === 'tr' ? 'Kullanıcı' : 'Users', value: lang === 'tr' ? 'Sınırsız' : 'Unlimited' },
        { label: lang === 'tr' ? 'Erişim Türü' : 'Access Types', value: '8+' },
      ],
    },
    {
      id: 'maintenance',
      badge: lang === 'tr' ? 'BAKIM' : 'MAINTENANCE',
      title: t.smartResidence.scene3Title,
      content: t.smartResidence.scene3Text,
      stats: [
        { label: lang === 'tr' ? 'Öngörü Süresi' : 'Prediction Time', value: '72h' },
        { label: lang === 'tr' ? 'Maliyet Azalma' : 'Cost Reduction', value: '%60' },
      ],
    },
  ];

  // Core platform modules
  const platformModules = [
    {
      icon: Building2,
      title: lang === 'tr' ? 'Site Yönetim Paneli' : 'Site Management Panel',
      description:
        lang === 'tr'
          ? 'Web tabanlı yönetim paneli ile tüm site operasyonlarını tek ekrandan yönetin. Dashboard, raporlar, sakin veritabanı.'
          : 'Manage all site operations from a single screen with web-based management panel. Dashboard, reports, resident database.',
      features: [
        lang === 'tr' ? 'Canlı dashboard' : 'Live dashboard',
        lang === 'tr' ? 'Detaylı raporlama' : 'Detailed reporting',
        lang === 'tr' ? 'Sakin yönetimi' : 'Resident management',
      ],
    },
    {
      icon: Smartphone,
      title: lang === 'tr' ? 'Mobil Uygulama' : 'Mobile Application',
      description:
        lang === 'tr'
          ? 'Sakinler için iOS ve Android uygulaması. Bildirimler, ödemeler, arızalar - her şey parmaklarının ucunda.'
          : 'iOS and Android app for residents. Notifications, payments, faults - everything at your fingertips.',
      features: [
        lang === 'tr' ? 'Push bildirimler' : 'Push notifications',
        lang === 'tr' ? 'Anlık mesajlaşma' : 'Instant messaging',
        lang === 'tr' ? 'Kolay ödeme' : 'Easy payment',
      ],
    },
    {
      icon: CreditCard,
      title: lang === 'tr' ? 'Aidat Takip Sistemi' : 'Dues Tracking System',
      description:
        lang === 'tr'
          ? 'Otomatik aidat hesaplama, hatırlatma ve tahsilat. Banka entegrasyonu ile anlık ödeme takibi.'
          : 'Automatic dues calculation, reminders and collection. Instant payment tracking with bank integration.',
      features: [
        lang === 'tr' ? 'Otomatik faturalama' : 'Auto billing',
        lang === 'tr' ? 'Banka entegrasyonu' : 'Bank integration',
        lang === 'tr' ? 'Gecikme takibi' : 'Late payment tracking',
      ],
    },
    {
      icon: QrCode,
      title: lang === 'tr' ? 'QR Misafir Girişi' : 'QR Guest Entry',
      description:
        lang === 'tr'
          ? 'Misafirleriniz için tek kullanımlık QR kod oluşturun. Güvenli, hızlı ve kayıtlı giriş sistemi.'
          : 'Create one-time QR codes for your guests. Secure, fast and registered entry system.',
      features: [
        lang === 'tr' ? 'Tek kullanımlık kod' : 'One-time code',
        lang === 'tr' ? 'Zaman sınırlı erişim' : 'Time-limited access',
        lang === 'tr' ? 'Giriş kaydı' : 'Entry logging',
      ],
    },
  ];

  // Additional feature cards
  const features = [
    {
      icon: Lock,
      title: lang === 'tr' ? 'Erişim Kontrolü' : 'Access Control',
      description:
        lang === 'tr'
          ? 'QR kod, yüz tanıma, plaka okuma - çoklu erişim yöntemleri.'
          : 'QR code, face recognition, plate reading - multiple access methods.',
    },
    {
      icon: Wrench,
      title: lang === 'tr' ? 'Kestirimci Bakım' : 'Predictive Maintenance',
      description:
        lang === 'tr'
          ? 'Algoritmik analiz ile arıza oluşmadan müdahale.'
          : 'Intervention before failure with algorithmic analysis.',
    },
    {
      icon: BarChart3,
      title: lang === 'tr' ? 'Enerji Analitiği' : 'Energy Analytics',
      description:
        lang === 'tr'
          ? 'Daire bazlı tüketim takibi, karşılaştırmalı raporlar.'
          : 'Unit-based consumption tracking, comparative reports.',
    },
    {
      icon: Bell,
      title: lang === 'tr' ? 'Akıllı Bildirimler' : 'Smart Notifications',
      description:
        lang === 'tr'
          ? 'Önemli duyurular, ödeme hatırlatıları, arıza güncellemeleri.'
          : 'Important announcements, payment reminders, fault updates.',
    },
    {
      icon: Shield,
      title: lang === 'tr' ? 'Güvenlik İzleme' : 'Security Monitoring',
      description:
        lang === 'tr'
          ? '7/24 kamera izleme, hareket algılama, acil durum protokolleri.'
          : '24/7 camera monitoring, motion detection, emergency protocols.',
    },
    {
      icon: Leaf,
      title: lang === 'tr' ? 'Sürdürülebilirlik' : 'Sustainability',
      description:
        lang === 'tr'
          ? 'Karbon ayak izi takibi, yeşil bina sertifikasyonu desteği.'
          : 'Carbon footprint tracking, green building certification support.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 3D Building Scene - Fixed behind scrollytelling */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ResidenceScene />
      </div>

      {/* Scrollytelling Section - drives 3D camera */}
      <ScrollyTellingContainer scenes={scenes} onSceneChange={handleSceneChange} />

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
              {lang === 'tr' ? 'BAĞLI EKOSİSTEM' : 'CONNECTED ECOSYSTEM'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {lang === 'tr' ? 'Tüm Sistemler Tek Platformda' : 'All Systems in One Platform'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Site yönetimi, sakin portalı, aidat takibi, misafir girişi - hepsi birbiriyle entegre.'
                : 'Site management, resident portal, dues tracking, guest entry - all integrated with each other.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Bento Grid - BMS Architecture */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'MİMARİ GENEL BAKIŞ' : 'ARCHITECTURE OVERVIEW'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {lang === 'tr' ? 'Merkezi BMS Entegrasyonu' : 'Central BMS Integration'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Tek bir platformdan 500+ daireyi yönetin. Ölçeklenebilir mimari, modüler yapı.'
                : 'Manage 500+ units from a single platform. Scalable architecture, modular design.'}
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Large card: BMS Architecture SVG */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-2 row-span-2 group relative p-8 rounded-2xl bg-card border border-border hover:border-engineer-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-engineer-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-xl font-bold text-foreground mb-2 relative z-10">
                {lang === 'tr' ? 'Sistem Mimarisi' : 'System Architecture'}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 relative z-10">
                {lang === 'tr' ? 'Merkezi kontrol, dağıtık zekâ' : 'Central control, distributed intelligence'}
              </p>
              {/* Animated SVG Architecture Diagram */}
              <div className="relative z-10">
                <svg viewBox="0 0 500 300" className="w-full h-auto">
                  {/* Central Hub */}
                  <motion.rect x="200" y="120" width="100" height="60" rx="8" fill="none" stroke="#F97316" strokeWidth="2"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }} />
                  <text x="250" y="155" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600" className="text-foreground">BMS Hub</text>

                  {/* Floor Controllers */}
                  {[
                    { x: 50, y: 30, label: lang === 'tr' ? 'Kat 1' : 'Floor 1' },
                    { x: 50, y: 130, label: lang === 'tr' ? 'Kat 2' : 'Floor 2' },
                    { x: 50, y: 230, label: lang === 'tr' ? 'Kat N' : 'Floor N' },
                    { x: 380, y: 30, label: 'HVAC' },
                    { x: 380, y: 130, label: lang === 'tr' ? 'Güvenlik' : 'Security' },
                    { x: 380, y: 230, label: lang === 'tr' ? 'Enerji' : 'Energy' },
                  ].map((node, i) => (
                    <g key={i}>
                      <motion.line
                        x1={node.x + 50} y1={node.y + 20} x2={200} y2={150}
                        stroke="#F97316" strokeWidth="1" strokeDasharray="4,4" strokeOpacity="0.4"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                      />
                      <motion.rect x={node.x} y={node.y} width="80" height="40" rx="6" fill="none" strokeWidth="1.5"
                        stroke={i < 3 ? '#3B82F6' : '#10B981'} strokeOpacity="0.6"
                        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.3 + i * 0.1 }}
                      />
                      <text x={node.x + 40} y={node.y + 25} textAnchor="middle" fill="currentColor" fontSize="9" className="text-muted-foreground">
                        {node.label}
                      </text>
                    </g>
                  ))}

                  {/* Data flow dots */}
                  {[0, 1, 2].map((i) => (
                    <motion.circle key={`dot-${i}`} r="3" fill="#F97316"
                      animate={{ cx: [100, 200, 300, 200], cy: [50 + i * 100, 150, 50 + i * 100, 150], opacity: [1, 0.5, 1, 0.5] }}
                      transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: 'linear' }}
                    />
                  ))}
                </svg>
              </div>
            </motion.div>

            {/* Scalability card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-engineer-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 size={24} className="text-engineer-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {lang === 'tr' ? 'Ölçeklenebilirlik' : 'Scalability'}
              </h3>
              <div className="font-mono text-4xl font-bold text-engineer-500 mb-2">500+</div>
              <p className="text-sm text-muted-foreground">
                {lang === 'tr' ? 'Daire kapasitesi, modüler büyüme' : 'Unit capacity, modular growth'}
              </p>
            </motion.div>

            {/* Real-time monitoring card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-engineer-500/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 size={24} className="text-cyan-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {lang === 'tr' ? 'Gerçek Zamanlı Veri' : 'Real-time Data'}
              </h3>
              <div className="font-mono text-4xl font-bold text-cyan-500 mb-2">10K+</div>
              <p className="text-sm text-muted-foreground">
                {lang === 'tr' ? 'Veri noktası / saniye' : 'Data points / second'}
              </p>
            </motion.div>

            {/* Uptime card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-engineer-500/10 to-transparent border border-engineer-500/20 hover:border-engineer-500/40 transition-all duration-500"
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {lang === 'tr' ? 'Sistem Çalışma Süresi' : 'System Uptime'}
              </h3>
              <div className="font-mono text-5xl font-bold text-foreground">99.9<span className="text-engineer-500">%</span></div>
              <p className="text-xs text-muted-foreground mt-2">
                {lang === 'tr' ? 'Yedekli altyapı garantisi' : 'Redundant infrastructure guarantee'}
              </p>
            </motion.div>

            {/* Integration protocols card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="md:col-span-2 group p-6 rounded-2xl bg-card border border-border hover:border-engineer-500/30 transition-all duration-500"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">
                {lang === 'tr' ? 'Entegrasyon Protokolleri' : 'Integration Protocols'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {['KNX', 'BACnet', 'Modbus', 'MQTT', 'REST API', 'OPC-UA', 'Zigbee', 'LoRaWAN'].map((proto) => (
                  <span key={proto} className="px-3 py-1.5 rounded-lg bg-muted text-sm font-mono text-muted-foreground border border-border hover:border-engineer-500/30 hover:text-engineer-500 transition-all cursor-default">
                    {proto}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Modules - Main Features */}
      <section className="py-32 bg-secondary/30">
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
              {lang === 'tr' ? 'PLATFORM MODÜLLERİ' : 'PLATFORM MODULES'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {lang === 'tr' ? 'Ana Modüller' : 'Core Modules'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Site yönetiminin tüm ihtiyaçlarını karşılayan entegre modüller.'
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
                  className="group p-8 rounded-2xl transition-all duration-300 bg-card border border-border hover:border-engineer-500/30 shadow-sm hover:shadow-lg"
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
              {lang === 'tr' ? 'Ek Özellikler' : 'Additional Features'}
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
                  className="group p-6 rounded-xl transition-all duration-300 bg-card border border-border hover:border-engineer-500/30 hover:shadow-md"
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

      {/* Interactive Mobile App Demo - Split Layout */}
      <section className="py-20 bg-secondary/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
                <span className="w-8 h-px bg-engineer-500" />
                {lang === 'tr' ? 'MOBİL UYGULAMA' : 'MOBILE APP'}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {lang === 'tr' ? 'Dijital Kapıcı' : 'Digital Concierge'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {lang === 'tr'
                  ? 'Kapıyı açın, misafir QR kodu oluşturun, interkom çağrılarını yanıtlayın - hepsi avucunuzda.'
                  : 'Unlock the door, generate guest QR codes, answer intercom calls - all in your palm.'}
              </p>

              {/* Feature List */}
              <div className="space-y-4">
                {[
                  {
                    icon: Lock,
                    title: lang === 'tr' ? 'Tek Dokunuşla Giriş' : 'One-Touch Entry',
                    desc: lang === 'tr' ? 'Ana kapıyı kaydırarak açın' : 'Slide to unlock main door',
                  },
                  {
                    icon: QrCode,
                    title: lang === 'tr' ? 'Misafir QR Kodu' : 'Guest QR Code',
                    desc: lang === 'tr' ? 'Tek kullanımlık, 5 dakika geçerli' : 'One-time use, 5 min validity',
                  },
                  {
                    icon: Bell,
                    title: lang === 'tr' ? 'Video İnterkom' : 'Video Intercom',
                    desc: lang === 'tr' ? 'Lobi çağrılarını anında yanıtlayın' : 'Answer lobby calls instantly',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-engineer-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-engineer-500" />
                    </div>
                    <div>
                      <div className="text-foreground font-medium">{item.title}</div>
                      <div className="text-muted-foreground text-sm">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Phone Demo */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <ResidenceMobileDemo lang={lang} />
              </motion.div>

              {/* Decorative glow behind phone */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-engineer-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: '500+',
                label: lang === 'tr' ? 'Yönetilebilir Daire' : 'Manageable Units',
              },
              {
                value: '%60',
                label: lang === 'tr' ? 'Bakım Tasarrufu' : 'Maintenance Savings',
              },
              {
                value: '2.1M',
                label: lang === 'tr' ? 'Yıllık Tasarruf (TL)' : 'Annual Savings (TL)',
              },
              {
                value: '24/7',
                label: lang === 'tr' ? 'İzleme' : 'Monitoring',
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
                ? 'Site yönetiminizi dijitalleştirelim. Mühendislik ekibimiz sizinle.'
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
