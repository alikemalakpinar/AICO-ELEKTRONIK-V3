'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Zap, Shield, Cpu } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import ServicesSection from '@/components/premium/ServicesSection';

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

  const solutions = [
    {
      id: 'smart-villa',
      title: lang === 'tr' ? 'Akilli Villa' : 'Smart Villa',
      description:
        lang === 'tr'
          ? 'Kisisel luks, gorunmez teknoloji. Yasam alaninizi algoritmik sistemlerle donusturun.'
          : 'Personal luxury, invisible technology. Transform your living space with algorithmic systems.',
      icon: Shield,
      href: `/${lang}/solutions/smart-villa`,
      stats: [
        { label: lang === 'tr' ? 'Enerji Tasarrufu' : 'Energy Savings', value: '%42' },
        { label: lang === 'tr' ? 'Sistem' : 'Systems', value: '47+' },
      ],
    },
    {
      id: 'smart-residence',
      title: lang === 'tr' ? 'Akilli Rezidans' : 'Smart Residence',
      description:
        lang === 'tr'
          ? 'Merkezi yonetim, olceklenebilir guc. 500+ daireyi tek ekrandan yonetin.'
          : 'Central management, scalable power. Manage 500+ units from a single screen.',
      icon: Cpu,
      href: `/${lang}/solutions/smart-residence`,
      stats: [
        { label: lang === 'tr' ? 'Bakim Tasarrufu' : 'Maintenance Savings', value: '%60' },
        { label: lang === 'tr' ? 'Daire' : 'Units', value: '500+' },
      ],
    },
  ];

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
                {lang === 'tr' ? 'Muhendislik Çözümleri' : 'Engineering Solutions'}
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
            {t.home.heroSubtitle}
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
              href={`/${lang}/solutions/smart-villa`}
              className="group flex items-center gap-2 px-8 py-4 bg-onyx-900/80 backdrop-blur-sm border border-white/20 hover:border-white/40 text-offwhite-400 font-medium rounded-lg transition-all duration-300"
            >
              <span>{t.home.discoverSolutions}</span>
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

      {/* Services Section - PCB Design & Embedded Consulting */}
      <ServicesSection lang={lang} />

      {/* Solutions Section */}
      <section className="py-32 relative">
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
              {lang === 'tr' ? 'COZUMLER' : 'SOLUTIONS'}
              <span className="w-8 h-px bg-engineer-500" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr'
                ? 'Muhendislik Cozumleri'
                : 'Engineering Solutions'}
            </h2>
            <p className="text-lg text-offwhite-700 max-w-2xl mx-auto">
              {lang === 'tr'
                ? 'Villa ve rezidans projeleri icin ozel tasarlanmis akilli yasam sistemleri.'
                : 'Smart living systems custom designed for villa and residence projects.'}
            </p>
          </motion.div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={solution.href}
                    className="group block p-8 lg:p-10 bg-onyx-800/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-engineer-500/30 transition-all duration-500"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-engineer-500/10 flex items-center justify-center mb-6 group-hover:bg-engineer-500/20 transition-colors">
                      <Icon size={28} className="text-engineer-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-offwhite-400 mb-4 group-hover:text-engineer-500 transition-colors">
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className="text-offwhite-700 mb-8 leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-8 mb-8">
                      {solution.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="font-mono text-2xl font-bold text-offwhite-400">
                            {stat.value}
                          </div>
                          <div className="text-xs text-offwhite-800 uppercase tracking-wide">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-engineer-500 text-sm font-medium">
                      <span>{t.common.learnMore}</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite-400 mb-6">
              {lang === 'tr'
                ? 'Projenizi birlikte tasarlayalim'
                : "Let's design your project together"}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {lang === 'tr'
                ? 'Muhendislik ekibimiz, ihtiyaclariniza ozel bir cozum tasarlamak icin hazir.'
                : 'Our engineering team is ready to design a custom solution for your needs.'}
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
