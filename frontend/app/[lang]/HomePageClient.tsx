'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Flame,
  HardHat,
  Thermometer,
  Activity,
  Home,
  Building,
  Building2,
  Play,
  Zap,
  Globe,
  Shield,
  Cpu,
  Factory,
  Gauge,
  Snowflake,
  AlertTriangle,
  Truck,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';

// ===========================================
// HomePageClient - Grandeur Edition
// Connected World 3D, Bento Grid, Trusted By
// ===========================================

// Dynamically import 3D scenes to avoid SSR issues with Three.js
const NeuralCore = dynamic(
  () => import('@/components/premium/NeuralCore'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 border-2 border-engineer-500/30 border-t-engineer-500 rounded-full animate-spin" />
      </div>
    )
  }
);

const HolographicGrid = dynamic(
  () => import('@/components/premium/3d/HolographicGrid'),
  { ssr: false }
);

const NetworkGlobe = dynamic(
  () => import('@/components/premium/3d/NetworkGlobe'),
  { ssr: false }
);

interface HomePageClientProps {
  lang: Locale;
}

export default function HomePageClient({ lang }: HomePageClientProps) {
  const t = getTranslations(lang);

  // Industrial IoT Solutions (replacing Coffee with VibrationGuard)
  const products = [
    {
      id: 'fire-safety',
      icon: Flame,
      title: 'FireLink Pro',
      subtitle: lang === 'tr' ? 'Yangin Guvenlik Sistemi' : 'Fire Safety System',
      description: lang === 'tr'
        ? '3D termal izleme ve erken uyari. PCB seviyesinde gorunmez tehlikeyi gorun.'
        : '3D thermal monitoring and early warning. See invisible danger at PCB level.',
      href: `/${lang}/solutions/fire-safety`,
      color: '#FF4500',
      gradient: 'from-orange-500/20 to-transparent',
      stats: { value: '<50ms', label: lang === 'tr' ? 'Tepki Suresi' : 'Response' },
    },
    {
      id: 'predictive-maintenance',
      icon: Activity,
      title: 'VibrationGuard',
      subtitle: lang === 'tr' ? 'Kestirimci Bakim' : 'Predictive Maintenance',
      description: lang === 'tr'
        ? 'FFT titresim analizi ve ML ile 2 hafta onceden ariza tahmini.'
        : 'FFT vibration analysis and ML for 2-week advance fault prediction.',
      href: `/${lang}/solutions/predictive-maintenance`,
      color: '#00D4FF',
      gradient: 'from-cyan-500/20 to-transparent',
      stats: { value: '14', label: lang === 'tr' ? 'Gün Önceden' : 'Days Ahead' },
    },
    {
      id: 'cold-chain',
      icon: Thermometer,
      title: 'ColdTrack',
      subtitle: lang === 'tr' ? 'Global Soguk Zincir' : 'Global Cold Chain',
      description: lang === 'tr'
        ? '3D dunya haritasinda filo takibi. Kesintisiz sicaklik kontrolu.'
        : '3D globe fleet tracking. Uninterrupted temperature control.',
      href: `/${lang}/solutions/cold-chain`,
      color: '#06B6D4',
      gradient: 'from-teal-500/20 to-transparent',
      stats: { value: '-40°C', label: lang === 'tr' ? 'Aralik' : 'Range' },
    },
    {
      id: 'mining-iot',
      icon: HardHat,
      title: 'MineGuard',
      subtitle: lang === 'tr' ? 'Maden Guvenligi' : 'Mining Safety',
      description: lang === 'tr'
        ? 'Dijital ikiz ile yeralti isci takibi. Gaz algilama ve biyometrik izleme.'
        : 'Underground worker tracking with digital twin. Gas detection & bio-metric monitoring.',
      href: `/${lang}/solutions/mining-iot`,
      color: '#EAB308',
      gradient: 'from-yellow-500/20 to-transparent',
      stats: { value: '1000+', label: lang === 'tr' ? 'Isci' : 'Workers' },
    },
  ];

  // Smart Living solutions
  const smartLiving = [
    {
      id: 'smart-villa',
      icon: Home,
      title: lang === 'tr' ? 'Akilli Villa' : 'Smart Villa',
      description: lang === 'tr' ? 'Kişisel lüks, görünmez teknoloji' : 'Personal luxury, invisible technology',
      href: `/${lang}/solutions/smart-villa`,
    },
    {
      id: 'smart-apartment',
      icon: Building,
      title: lang === 'tr' ? 'Akilli Apartman' : 'Smart Apartment',
      description: lang === 'tr' ? 'Ortak alan yonetimi' : 'Common area management',
      href: `/${lang}/solutions/smart-apartment`,
    },
    {
      id: 'smart-residence',
      icon: Building2,
      title: lang === 'tr' ? 'Akilli Rezidans' : 'Smart Residence',
      description: lang === 'tr' ? 'Merkezi yonetim, olceklenebilir guc' : 'Central management, scalable power',
      href: `/${lang}/solutions/smart-residence`,
    },
  ];

  // Industrial partners/trusted by logos
  const trustedBy = [
    { name: 'Siemens', category: 'industrial' },
    { name: 'Bosch', category: 'industrial' },
    { name: 'Schneider Electric', category: 'energy' },
    { name: 'ABB', category: 'automation' },
    { name: 'Honeywell', category: 'safety' },
    { name: 'Rockwell', category: 'automation' },
    { name: 'Emerson', category: 'industrial' },
    { name: 'Mitsubishi', category: 'industrial' },
  ];

  return (
    <div className="min-h-screen bg-onyx-950">
      {/* Hero Section - Connected World */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-engineer-500/3 via-transparent to-transparent" />
          {/* Animated gradient orbs — subdued, monochrome dominant */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        {/* Deep Lab Background — HolographicGrid floor + NetworkGlobe */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Holographic grid floor — lower half */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] opacity-30">
            <HolographicGrid />
          </div>
          {/* NetworkGlobe — upper right, subtle */}
          <div className="absolute top-[5%] right-[5%] w-[40%] h-[50%] opacity-20">
            <NetworkGlobe />
          </div>
        </div>

        {/* 3D Neural Core - "Connected World" */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full max-w-4xl max-h-[80vh] opacity-50">
            <NeuralCore className="w-full h-full" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          {/* Badge — JetBrains Mono overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 bg-onyx-900/80 backdrop-blur-sm rounded-full border border-white/10">
              <Zap size={12} className="text-engineer-500" />
              <span className="mono-overline text-offwhite-700">AICO_UNIT_v3.2</span>
              <span className="w-px h-3 bg-white/10" />
              <span className="mono-badge text-offwhite-600">
                {lang === 'tr' ? 'SAVUNMA & ENDÜSTRİYEL' : 'DEFENSE & INDUSTRIAL'}
              </span>
            </span>
          </motion.div>

          {/* Title — Satoshi 900, tracking-tighter */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-display text-5xl md:text-6xl lg:text-8xl text-offwhite-400 mb-6"
          >
            {lang === 'tr' ? 'Kritik Altyapi Icin' : 'Advanced Sensory Systems'}
            <br />
            <span className="text-engineer-500 glow-engineer-intense">
              {lang === 'tr' ? 'Sensor Sistemleri.' : 'for Critical Infrastructure.'}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-offwhite-700 max-w-3xl mx-auto mb-12"
          >
            {lang === 'tr'
              ? 'Anomalileri isik hizinda tespit edin. Savunma, madencilik ve yuksek yogunluklu konut sektorleri icin hassas izleme.'
              : 'Detecting anomalies at the speed of light. Precision monitoring for defense, mining, and high-density residential sectors.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#solutions"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-engineer-500 to-orange-500 hover:from-engineer-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-engineer-500/25"
            >
              <span>{lang === 'tr' ? 'Çözümleri Keşfedin' : 'Explore Solutions'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${lang}/contact?subject=demo`}
              className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 text-offwhite-400 font-medium rounded-xl transition-all duration-300"
            >
              <Play size={18} />
              <span>{lang === 'tr' ? 'Demo İzleyin' : 'Watch Demo'}</span>
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '<50ms', label: lang === 'tr' ? 'Tepki Süresi' : 'Response Time', spec: 'RT_SPEC' },
              { value: '99.97%', label: lang === 'tr' ? 'Çalışma Süresi' : 'Uptime', spec: 'SLA_TIER' },
              { value: '78%', label: lang === 'tr' ? 'Duruş Azalması' : 'Downtime Cut', spec: 'EFF_GAIN' },
              { value: '100+', label: lang === 'tr' ? 'Kurulum' : 'Installations', spec: 'DEPLOY_CT' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="mono-badge text-offwhite-800 mb-1">{stat.spec}</div>
                <div className="text-2xl md:text-3xl font-bold text-engineer-500 mono-data glow-engineer">{stat.value}</div>
                <div className="text-offwhite-700 text-xs mt-1.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-offwhite-800 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Solutions Bento Grid - with Live Previews */}
      <section id="solutions" className="py-24 md:py-32 bg-onyx-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-3 text-engineer-500 mb-6">
              <span className="w-12 h-px bg-engineer-500/50" />
              <span className="mono-overline">{lang === 'tr' ? 'KRİTİK SİSTEMLER' : 'CRITICAL SYSTEMS'}</span>
              <span className="mono-badge text-offwhite-800">SEC::CLASSIFIED</span>
              <span className="w-12 h-px bg-engineer-500/50" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr' ? 'Yüksek Teknoloji' : 'High-Tech'}
              {' '}
              <span className="text-engineer-500">
                {lang === 'tr' ? 'Çözümler' : 'Solutions'}
              </span>
            </h2>
            <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Savunma sinifi izleme, hassas algilama ve gercek zamanli anomali tespiti.'
                : 'Defense-grade monitoring, precision sensing, and real-time anomaly detection.'}
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
              >
                <Link
                  href={product.href}
                  className="group block relative h-full overflow-hidden rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500 border-beam"
                  style={{ backgroundColor: '#050507' }}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className={`relative z-10 p-6 ${index === 0 ? 'md:p-8' : ''} h-full flex flex-col`}>
                    {/* Live Preview Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`${index === 0 ? 'w-16 h-16' : 'w-12 h-12'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        style={{ backgroundColor: `${product.color}15` }}
                      >
                        <product.icon size={index === 0 ? 32 : 24} style={{ color: product.color }} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: product.color }}
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="mono-badge text-offwhite-700">LIVE</span>
                      </div>
                    </div>

                    {/* Mini Preview Animation */}
                    {index === 0 && (
                      <div className="mb-4 p-3 rounded-xl bg-black/30 border border-white/5">
                        <MiniFireLinkPreview color={product.color} />
                      </div>
                    )}

                    {/* Title & Description */}
                    <div className="flex-1">
                      <h3 className={`${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold text-offwhite-400 group-hover:text-white transition-colors`}>
                        {product.title}
                      </h3>
                      <p className="text-offwhite-700 text-sm mt-1">{product.subtitle}</p>
                      <p className={`text-offwhite-600 ${index === 0 ? 'mt-4' : 'mt-2'} ${index === 0 ? 'text-base' : 'text-sm'}`}>
                        {product.description}
                      </p>
                    </div>

                    {/* Stats & CTA */}
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <div className="text-2xl mono-data font-bold" style={{ color: product.color }}>
                          {product.stats.value}
                        </div>
                        <div className="text-offwhite-700 text-xs mt-0.5">{product.stats.label}</div>
                      </div>
                      <div
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: product.color }}
                      >
                        <span>{lang === 'tr' ? 'Keşfet' : 'Explore'}</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-px" style={{ background: `linear-gradient(to right, ${product.color}, transparent)` }} />
                  <div className="absolute top-0 left-0 w-px h-8" style={{ background: `linear-gradient(to bottom, ${product.color}, transparent)` }} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Marquee */}
      <section className="py-16 bg-onyx-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-offwhite-700 text-sm uppercase tracking-widest">
              {lang === 'tr' ? 'Sektör Liderleri Tarafından Tercih Ediliyor' : 'Trusted by Industry Leaders'}
            </span>
          </motion.div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-onyx-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-onyx-950 to-transparent z-10" />

            {/* Scrolling logos */}
            <motion.div
              className="flex gap-16 items-center"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...trustedBy, ...trustedBy].map((company, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-6 py-3 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <span className="text-offwhite-600 font-semibold text-lg whitespace-nowrap">{company.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Living Section */}
      <section className="py-24 md:py-32 bg-onyx-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-3 text-purple-400 mb-6">
              <span className="w-12 h-px bg-purple-400/50" />
              <span className="mono-overline">SMART LIVING</span>
              <span className="mono-badge text-offwhite-800">RES::PREMIUM</span>
              <span className="w-12 h-px bg-purple-400/50" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr' ? 'Akıllı' : 'Smart'}
              {' '}
              <span className="text-purple-400">
                {lang === 'tr' ? 'Yaşam Alanları' : 'Living Spaces'}
              </span>
            </h2>
            <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Lüks villa, apartman ve rezidans projeleriniz için premium otomasyon çözümleri.'
                : 'Premium automation solutions for your luxury villa, apartment, and residence projects.'}
            </p>
          </motion.div>

          {/* Smart Living Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {smartLiving.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group block p-6 bg-onyx-800/50 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 border-beam"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                    <item.icon size={28} className="text-purple-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-offwhite-400 mb-2 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-offwhite-700 text-sm mb-4">{item.description}</p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                    <span>{lang === 'tr' ? 'İncele' : 'Explore'}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 md:py-32 bg-onyx-900 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-engineer-500/10 flex items-center justify-center">
              <Globe size={40} className="text-engineer-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr'
                ? 'Projenizi Hayata Geçirelim'
                : "Let's Bring Your Project to Life"}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {lang === 'tr'
                ? 'Mühendislik ekibimiz, fikirlerinizi endüstriyel gerçekliğe dönüştürmek için hazır.'
                : 'Our engineering team is ready to turn your ideas into industrial reality.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-engineer-500 to-orange-500 hover:from-engineer-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-engineer-500/25"
              >
                <span>{lang === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${lang}/projects`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-offwhite-400 font-medium rounded-xl transition-all duration-300"
              >
                <span>{lang === 'tr' ? 'Projeleri İnceleyin' : 'View Projects'}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ===========================================
// Mini Preview Components for Bento Grid
// ===========================================

function MiniFireLinkPreview({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-3">
      {/* Mini sensor grid */}
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => {
          const isActive = i === 2 || i === 5;
          return (
            <motion.div
              key={i}
              className="w-4 h-4 rounded"
              style={{
                backgroundColor: isActive ? color : 'rgba(255,255,255,0.1)',
              }}
              animate={isActive ? { opacity: [1, 0.5, 1] } : undefined}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          );
        })}
      </div>

      {/* Temperature reading */}
      <div className="flex-1">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            animate={{ width: ['40%', '70%', '40%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[8px] text-offwhite-700">20°C</span>
          <span className="text-[8px] font-mono" style={{ color }}>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              67.3°C
            </motion.span>
          </span>
          <span className="text-[8px] text-offwhite-700">100°C</span>
        </div>
      </div>
    </div>
  );
}
