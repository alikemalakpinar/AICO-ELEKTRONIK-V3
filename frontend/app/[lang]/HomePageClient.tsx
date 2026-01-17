'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import ServicesSection from '@/components/premium/ServicesSection';
import TechStack from '@/components/premium/TechStack';

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

// Dynamically import SmartLifestylePreview to improve initial load
const SmartLifestylePreview = dynamic(
  () => import('@/components/premium/SmartLifestylePreview'),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen bg-onyx-950 flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    )
  }
);

interface HomePageClientProps {
  lang: Locale;
}

export default function HomePageClient({ lang }: HomePageClientProps) {
  const t = getTranslations(lang);

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Hero Section with 3D Neural Core */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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

        {/* 3D Neural Core - positioned behind content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full max-w-4xl max-h-[80vh] opacity-60">
            <NeuralCore className="w-full h-full" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
                {lang === 'tr' ? 'Uctan Uca Teknoloji Cozumleri' : 'End-to-End Technology Solutions'}
              </span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-hero-md md:text-hero-lg lg:text-hero-xl font-bold text-offwhite-400 mb-6 tracking-tight"
          >
            {t.home.heroTitle}{' '}
            <span className="text-engineer-500">{t.home.heroHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-offwhite-700 max-w-2xl mx-auto mb-12"
          >
            {lang === 'tr'
              ? 'PCB tasarimindan akilli yasam sistemlerine, kiosk cozumlerinden POS otomasyonuna kadar tum ihtiyaclariniz icin tek adres.'
              : 'From PCB design to smart living systems, from kiosk solutions to POS automation - your single destination for all technology needs.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={`/${lang}/projects`}
              className="group flex items-center gap-2 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-lg transition-all duration-300"
            >
              <span>{t.home.exploreProjects}</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="group flex items-center gap-2 px-8 py-4 bg-onyx-900/80 backdrop-blur-sm border border-white/20 hover:border-white/40 text-offwhite-400 font-medium rounded-lg transition-all duration-300"
            >
              <span>{lang === 'tr' ? 'Teklif Alin' : 'Get a Quote'}</span>
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
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
          <div className="flex flex-col items-center gap-2">
            <span className="text-offwhite-800 text-xs uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Technologies We Use - Strip below Hero */}
      <TechStack lang={lang} />

      {/* Services Section - Engineering Services & Product Solutions */}
      <ServicesSection lang={lang} />

      {/* Smart Lifestyle Preview - Apple-style Scrollytelling Demo */}
      <SmartLifestylePreview lang={lang} />

      {/* Final CTA Section */}
      <section className="py-32 border-t border-white/5 bg-onyx-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-engineer-500" />
              {lang === 'tr' ? 'BIRLIKTE CALISALIM' : "LET'S COLLABORATE"}
              <span className="w-8 h-px bg-engineer-500" />
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr'
                ? 'Projenizi birlikte tasarlayalim'
                : "Let's design your project together"}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {lang === 'tr'
                ? 'Muhendislik ekibimiz, ihtiyaclariniza ozel bir cozum tasarlamak icin hazir. PCB tasarimindan akilli bina sistemlerine kadar her projede yaninizdayiz.'
                : 'Our engineering team is ready to design a custom solution for your needs. From PCB design to smart building systems, we are with you in every project.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              <Link
                href={`/${lang}/about`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-offwhite-400 font-medium rounded-lg transition-all duration-300"
              >
                <span>{lang === 'tr' ? 'Bizi Taniyin' : 'About Us'}</span>
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-white/5"
            >
              <p className="text-sm text-offwhite-800 mb-4">
                {lang === 'tr' ? 'Guvenilir Ortaklar' : 'Trusted Partners'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {['ISO 9001', 'CE', 'RoHS', 'UL'].map((cert) => (
                  <span
                    key={cert}
                    className="text-offwhite-700 font-mono text-sm border border-white/10 px-4 py-2 rounded-lg"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
