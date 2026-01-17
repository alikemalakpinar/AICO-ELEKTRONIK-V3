'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Flame,
  HardHat,
  Thermometer,
  Coffee,
  Home,
  Building,
  Building2,
  Play,
  Zap,
} from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';

// Dynamically import NeuralCore to avoid SSR issues with Three.js
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

interface HomePageClientProps {
  lang: Locale;
}

export default function HomePageClient({ lang }: HomePageClientProps) {
  const t = getTranslations(lang);

  // Product categories
  const products = [
    {
      id: 'fire-safety',
      icon: Flame,
      title: 'FireLink',
      subtitle: lang === 'tr' ? 'Yangin Guvenlik Karti' : 'Fire Safety Card',
      description: lang === 'tr'
        ? 'Termal izleme ve erken uyari sistemi. Gorunmez tehlikeyi gorun.'
        : 'Thermal monitoring and early warning system. See the invisible danger.',
      href: `/${lang}/solutions/fire-safety`,
      color: '#EF4444',
      gradient: 'from-red-500/20 to-transparent',
    },
    {
      id: 'mining-iot',
      icon: HardHat,
      title: 'MineGuard',
      subtitle: lang === 'tr' ? 'Maden Guvenligi' : 'Mining Safety',
      description: lang === 'tr'
        ? 'Isci takip ve gaz algilama sistemi. Yerin altinda tam kontrol.'
        : 'Worker tracking and gas detection system. Full control underground.',
      href: `/${lang}/solutions/mining-iot`,
      color: '#EAB308',
      gradient: 'from-yellow-500/20 to-transparent',
    },
    {
      id: 'cold-chain',
      icon: Thermometer,
      title: 'ColdTrack',
      subtitle: lang === 'tr' ? 'Soguk Zincir' : 'Cold Chain',
      description: lang === 'tr'
        ? 'Sicaklik izleme ve lojistik yonetimi. Soguk zinciri kirmayin.'
        : 'Temperature monitoring and logistics management. Never break the chain.',
      href: `/${lang}/solutions/cold-chain`,
      color: '#06B6D4',
      gradient: 'from-cyan-500/20 to-transparent',
    },
    {
      id: 'coffee',
      icon: Coffee,
      title: 'AICO Coffee',
      subtitle: lang === 'tr' ? 'Akilli Kahve' : 'Smart Coffee',
      description: lang === 'tr'
        ? 'IoT baglantili premium kahve deneyimi. Kahveniz, sizin kurallariniz.'
        : 'IoT-connected premium coffee experience. Your coffee, your rules.',
      href: `/${lang}/products/coffee`,
      color: '#A855F7',
      gradient: 'from-purple-500/20 to-transparent',
    },
  ];

  // Smart Living solutions
  const smartLiving = [
    {
      id: 'smart-villa',
      icon: Home,
      title: lang === 'tr' ? 'Akilli Villa' : 'Smart Villa',
      description: lang === 'tr' ? 'Kisisel luks, gorunmez teknoloji' : 'Personal luxury, invisible technology',
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

  return (
    <div className="min-h-screen bg-onyx-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-engineer-500/5 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        {/* 3D Neural Core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full max-w-4xl max-h-[80vh] opacity-50">
            <NeuralCore className="w-full h-full" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-onyx-900/80 backdrop-blur-sm rounded-full border border-white/10">
              <Zap size={14} className="text-engineer-500" />
              <span className="text-offwhite-600 text-sm font-medium">
                {lang === 'tr' ? 'Teknoloji Ekosistemi' : 'Technology Ecosystem'}
              </span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-offwhite-400 mb-6 tracking-tight"
          >
            {lang === 'tr' ? 'Muhendislik,' : 'Engineering,'}
            <br />
            <span className="text-engineer-500">
              {lang === 'tr' ? 'Yeniden Tanimlandi.' : 'Redefined.'}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-offwhite-700 max-w-2xl mx-auto mb-12"
          >
            {lang === 'tr'
              ? 'Endustriyel IoT\'dan akilli yasam sistemlerine. Fikirden uretime, tek adres.'
              : 'From industrial IoT to smart living systems. From idea to production, one destination.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#products"
              className="group flex items-center gap-2 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300"
            >
              <span>{lang === 'tr' ? 'Urunleri Kesfedin' : 'Explore Products'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${lang}/contact?subject=demo`}
              className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 text-offwhite-400 font-medium rounded-xl transition-all duration-300"
            >
              <Play size={18} />
              <span>{lang === 'tr' ? 'Demo Izleyin' : 'Watch Demo'}</span>
            </Link>
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

      {/* Products Section */}
      <section id="products" className="py-24 md:py-32 bg-onyx-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'URUNLERIMIZ' : 'OUR PRODUCTS'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr' ? 'Teknoloji' : 'Technology'}
              {' '}
              <span className="text-engineer-500">
                {lang === 'tr' ? 'Cozumlerimiz' : 'Solutions'}
              </span>
            </h2>
            <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Her sektorun ihtiyacina ozel, uctan uca teknoloji cozumleri.'
                : 'End-to-end technology solutions tailored to the needs of every industry.'}
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={product.href}
                  className="group block relative overflow-hidden p-8 bg-onyx-800/50 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <product.icon size={32} style={{ color: product.color }} />
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-offwhite-400 group-hover:text-white transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-offwhite-700 text-sm mt-1">{product.subtitle}</p>
                    </div>

                    <p className="text-offwhite-600 mb-6">{product.description}</p>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-2 text-sm font-medium transition-colors"
                      style={{ color: product.color }}
                    >
                      <span>{lang === 'tr' ? 'Kesfet' : 'Explore'}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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
            <span className="inline-flex items-center gap-2 text-purple-400 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-purple-400" />
              SMART LIVING
              <span className="w-8 h-px bg-purple-400" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr' ? 'Akilli' : 'Smart'}
              {' '}
              <span className="text-purple-400">
                {lang === 'tr' ? 'Yasam Alanlari' : 'Living Spaces'}
              </span>
            </h2>
            <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Villa, apartman ve rezidans projeleriniz icin akilli otomasyon cozumleri.'
                : 'Smart automation solutions for your villa, apartment, and residence projects.'}
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
                  className="group block p-6 bg-onyx-800/50 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-500"
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
                    <span>{lang === 'tr' ? 'Incele' : 'Explore'}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr'
                ? 'Projenizi Hayata Gecirelim'
                : "Let's Bring Your Project to Life"}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {lang === 'tr'
                ? 'Muhendislik ekibimiz, fikirlerinizi gercege donusturmek icin hazir.'
                : 'Our engineering team is ready to turn your ideas into reality.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300"
              >
                <span>{lang === 'tr' ? 'Iletisime Gecin' : 'Get in Touch'}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${lang}/projects`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-offwhite-400 font-medium rounded-xl transition-all duration-300"
              >
                <span>{lang === 'tr' ? 'Projeleri Inceleyin' : 'View Projects'}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
