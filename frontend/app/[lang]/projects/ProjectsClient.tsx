'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Filter } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';

interface ProjectsClientProps {
  lang: Locale;
}

// Project data
const projectsData = {
  tr: [
    {
      id: 'smart-villa-beykoz',
      title: 'Beykoz Villa Projesi',
      category: 'villa',
      year: '2024',
      challenge:
        'Istanbul Bogazina bakan 1200m² villanin, mevcut altyapiyi bozmadan tam otomasyon sistemine donusturulmesi.',
      approach:
        'Mevcut kablolama analizi, kablosuz sensor aglari ve hibrit iletisim protokolleri ile retrofitting cozumu.',
      impact:
        'Enerji tuketiminde %42 azalma, tek noktadan 47 farkli sistemin yonetimi.',
      stats: [
        { label: 'Alan', value: '1,200m²' },
        { label: 'Sistem', value: '47' },
        { label: 'Tasarruf', value: '%42' },
      ],
      featured: true,
    },
    {
      id: 'residence-maslak',
      title: 'Maslak Towers Rezidans',
      category: 'residence',
      year: '2023',
      challenge:
        '340 daireli A sinifi rezidansin enerji yonetimi ve ortak alan guvenlik sistemlerinin modernizasyonu.',
      approach:
        'Merkezi BMS platformu, IoT sensor agi ve kestirimci bakim algoritmalarinin entegrasyonu.',
      impact:
        'Yillik enerji maliyetinde 2.1M TL tasarruf, bakim maliyetlerinde %60 azalma.',
      stats: [
        { label: 'Daire', value: '340' },
        { label: 'Tasarruf', value: '2.1M TL' },
        { label: 'Bakim', value: '-%60' },
      ],
      featured: true,
    },
    {
      id: 'factory-gebze',
      title: 'Gebze Uretim Tesisi',
      category: 'industrial',
      year: '2023',
      challenge:
        '24/7 calisan uretim hattinda kesintisiz enerji izleme ve ekipman saglik takibi.',
      approach:
        'Edge computing tabanli veri toplama, makine ogrenimi ile anomali tespiti ve OEE optimizasyonu.',
      impact:
        "Planlanmamis duruslarda %78 azalma, toplam ekipman verimliligi (OEE) %89'a yukseldi.",
      stats: [
        { label: 'Hat', value: '12' },
        { label: 'Durus', value: '-%78' },
        { label: 'OEE', value: '%89' },
      ],
      featured: true,
    },
    {
      id: 'villa-bodrum',
      title: 'Bodrum Yazlik Villa',
      category: 'villa',
      year: '2024',
      challenge:
        'Sezonluk kullanilan villanin uzaktan izleme, guvenlik ve enerji optimizasyonu.',
      approach:
        'Bulut tabanli uzaktan erisim, nem/sicaklik kontrolu ve guvenlik entegrasyonu.',
      impact:
        'Sezon disi enerji tuketiminde %70 azalma, 7/24 uzaktan izleme.',
      stats: [
        { label: 'Alan', value: '450m²' },
        { label: 'Enerji', value: '-%70' },
        { label: 'Erisim', value: '7/24' },
      ],
      featured: false,
    },
    {
      id: 'residence-ankara',
      title: 'Ankara Cankaya Rezidans',
      category: 'residence',
      year: '2023',
      challenge:
        '180 daireli rezidansin guvenlik ve erisim kontrol sisteminin yenilenmesi.',
      approach:
        'QR kodlu misafir erisimi, yuz tanima ve mobil uygulama entegrasyonu.',
      impact:
        'Guvenlik olaylarinda %95 azalma, sakin memnuniyetinde %40 artis.',
      stats: [
        { label: 'Daire', value: '180' },
        { label: 'Guvenlik', value: '-%95' },
        { label: 'Memnuniyet', value: '+%40' },
      ],
      featured: false,
    },
  ],
  en: [
    {
      id: 'smart-villa-beykoz',
      title: 'Beykoz Villa Project',
      category: 'villa',
      year: '2024',
      challenge:
        'Converting a 1200m² villa overlooking the Bosphorus to a full automation system without disrupting existing infrastructure.',
      approach:
        'Existing wiring analysis, wireless sensor networks, and hybrid communication protocols for retrofitting solution.',
      impact:
        '42% reduction in energy consumption, management of 47 different systems from a single point.',
      stats: [
        { label: 'Area', value: '1,200m²' },
        { label: 'Systems', value: '47' },
        { label: 'Savings', value: '42%' },
      ],
      featured: true,
    },
    {
      id: 'residence-maslak',
      title: 'Maslak Towers Residence',
      category: 'residence',
      year: '2023',
      challenge:
        'Modernization of energy management and common area security systems for a 340-unit Class A residence.',
      approach:
        'Central BMS platform, IoT sensor network, and integration of predictive maintenance algorithms.',
      impact:
        '2.1M TL savings in annual energy costs, 60% reduction in maintenance costs.',
      stats: [
        { label: 'Units', value: '340' },
        { label: 'Savings', value: '2.1M TL' },
        { label: 'Maintenance', value: '-60%' },
      ],
      featured: true,
    },
    {
      id: 'factory-gebze',
      title: 'Gebze Production Facility',
      category: 'industrial',
      year: '2023',
      challenge:
        'Continuous energy monitoring and equipment health tracking in a 24/7 production line.',
      approach:
        'Edge computing-based data collection, machine learning anomaly detection, and OEE optimization.',
      impact:
        '78% reduction in unplanned downtime, overall equipment effectiveness (OEE) increased to 89%.',
      stats: [
        { label: 'Lines', value: '12' },
        { label: 'Downtime', value: '-78%' },
        { label: 'OEE', value: '89%' },
      ],
      featured: true,
    },
    {
      id: 'villa-bodrum',
      title: 'Bodrum Summer Villa',
      category: 'villa',
      year: '2024',
      challenge:
        'Remote monitoring, security, and energy optimization for a seasonally used villa.',
      approach:
        'Cloud-based remote access, humidity/temperature control, and security integration.',
      impact:
        '70% reduction in off-season energy consumption, 24/7 remote monitoring.',
      stats: [
        { label: 'Area', value: '450m²' },
        { label: 'Energy', value: '-70%' },
        { label: 'Access', value: '24/7' },
      ],
      featured: false,
    },
    {
      id: 'residence-ankara',
      title: 'Ankara Cankaya Residence',
      category: 'residence',
      year: '2023',
      challenge:
        'Renewal of security and access control system for a 180-unit residence.',
      approach:
        'QR-coded guest access, face recognition, and mobile app integration.',
      impact:
        '95% reduction in security incidents, 40% increase in resident satisfaction.',
      stats: [
        { label: 'Units', value: '180' },
        { label: 'Security', value: '-95%' },
        { label: 'Satisfaction', value: '+40%' },
      ],
      featured: false,
    },
  ],
};

const categories = {
  tr: [
    { id: 'all', label: 'Tumu' },
    { id: 'villa', label: 'Villa' },
    { id: 'residence', label: 'Rezidans' },
    { id: 'industrial', label: 'Endustriyel' },
  ],
  en: [
    { id: 'all', label: 'All' },
    { id: 'villa', label: 'Villa' },
    { id: 'residence', label: 'Residence' },
    { id: 'industrial', label: 'Industrial' },
  ],
};

export default function ProjectsClient({ lang }: ProjectsClientProps) {
  const t = getTranslations(lang);
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = projectsData[lang] || projectsData.tr;
  const cats = categories[lang] || categories.tr;

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
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

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase">
              <span className="w-8 h-px bg-engineer-500" />
              {t.projects.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-hero-md md:text-hero-lg font-bold text-offwhite-400 mb-6"
          >
            {t.projects.heroTitle}{' '}
            <span className="text-engineer-500">{t.projects.heroHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-offwhite-700 max-w-2xl mb-12"
          >
            {t.projects.heroSubtitle}
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Filter size={16} className="text-offwhite-800" />
            {cats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-engineer-500 text-white'
                    : 'bg-white/5 text-offwhite-600 hover:bg-white/10 hover:text-offwhite-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {activeCategory === 'all' && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <span className="text-offwhite-800 text-sm uppercase tracking-wide">
              {t.projects.featured}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-1">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-onyx-800"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-onyx-700 to-onyx-900" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-900 via-onyx-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  {/* Category & Year */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-offwhite-600 uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="text-offwhite-800 text-xs font-mono">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-offwhite-400 mb-4 group-hover:text-engineer-500 transition-colors">
                    {project.title}
                  </h3>

                  {/* Challenge Preview */}
                  <p className="text-sm text-offwhite-700 mb-6 line-clamp-2">
                    {project.challenge}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 mb-6">
                    {project.stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="font-mono text-lg font-bold text-offwhite-400">
                          {stat.value}
                        </div>
                        <div className="text-xs text-offwhite-800 uppercase">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-engineer-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t.projects.viewProject}</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {activeCategory === 'all' && (
            <div className="mb-12">
              <span className="text-offwhite-800 text-sm uppercase tracking-wide">
                {t.projects.allProjects}
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  {/* Project Card */}
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-xl bg-onyx-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-onyx-700 to-onyx-900" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-onyx-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-engineer-500 rounded-lg text-white text-sm font-medium">
                        <span>{t.projects.viewProject}</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-onyx-900/80 backdrop-blur-sm rounded-full text-xs text-offwhite-600 uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    {/* Title & Year */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-offwhite-400 group-hover:text-engineer-500 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-offwhite-800 font-mono text-sm flex-shrink-0">
                        {project.year}
                      </span>
                    </div>

                    {/* Case Study Sections */}
                    <div className="space-y-3 text-sm">
                      {/* Challenge */}
                      <div>
                        <span className="text-engineer-500 font-mono text-xs uppercase tracking-wide">
                          {t.projects.caseStudy.challenge}
                        </span>
                        <p className="text-offwhite-700 mt-1 line-clamp-2">
                          {project.challenge}
                        </p>
                      </div>

                      {/* Approach */}
                      <div>
                        <span className="text-blue-500 font-mono text-xs uppercase tracking-wide">
                          {t.projects.caseStudy.approach}
                        </span>
                        <p className="text-offwhite-700 mt-1 line-clamp-2">
                          {project.approach}
                        </p>
                      </div>

                      {/* Impact */}
                      <div>
                        <span className="text-success-500 font-mono text-xs uppercase tracking-wide">
                          {t.projects.caseStudy.impact}
                        </span>
                        <p className="text-offwhite-700 mt-1 line-clamp-2">
                          {project.impact}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 pt-4 border-t border-white/5">
                      {project.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="font-mono text-lg font-bold text-offwhite-400">
                            {stat.value}
                          </div>
                          <div className="text-xs text-offwhite-800 uppercase">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
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
