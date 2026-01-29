'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Filter, Cpu, Factory, Cloud, Smartphone, Radio } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';
import { PROJECTS, PROJECT_CATEGORIES, getFeaturedProjects, getProjectsByCategory } from '@/lib/data/projects';
import type { Project, ProjectCategory } from '@/types';

interface ProjectsClientProps {
  lang: Locale;
}

// Category icons
const categoryIcons: Record<string, React.ElementType> = {
  embedded: Cpu,
  industrial: Factory,
  iot: Cloud,
  consumer: Smartphone,
  saas: Radio,
};

export default function ProjectsClient({ lang }: ProjectsClientProps) {
  const t = getTranslations(lang);
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = PROJECTS[lang];
  const categories = PROJECT_CATEGORIES[lang];
  const featuredProjects = getFeaturedProjects(lang);
  const filteredProjects = getProjectsByCategory(activeCategory, lang);

  const text = {
    tr: {
      badge: 'MUHENDISLIK PORTFOLYOSU',
      heroTitle: 'Gerçek Projeler,',
      heroHighlight: 'Olculebilir Sonuclar',
      heroSubtitle: 'Gömülü sistemlerden endüstriyel IoT çözümlerine kadar tamamladığımız mühendislik projelerini inceleyin.',
      featured: 'One Cikan Projeler',
      allProjects: 'Tum Projeler',
      viewProject: 'Detayları İncele',
      challenge: 'Problem',
      solution: 'Çözüm',
      impact: 'Etki',
      ctaTitle: 'Projenizi birlikte tasarlayalim',
      ctaSubtitle: 'Muhendislik ekibimiz, ihtiyaclariniza ozel bir cozum tasarlamak icin hazir.',
    },
    en: {
      badge: 'ENGINEERING PORTFOLIO',
      heroTitle: 'Real Projects,',
      heroHighlight: 'Measurable Results',
      heroSubtitle: 'Explore our completed engineering projects from embedded systems to industrial IoT solutions.',
      featured: 'Featured Projects',
      allProjects: 'All Projects',
      viewProject: 'View Details',
      challenge: 'Challenge',
      solution: 'Solution',
      impact: 'Impact',
      ctaTitle: "Let's design your project together",
      ctaSubtitle: 'Our engineering team is ready to design a custom solution for your needs.',
    },
  };

  const content = text[lang];

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
              {content.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite-400 mb-6"
          >
            {content.heroTitle}{' '}
            <span className="text-engineer-500">{content.heroHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-offwhite-700 max-w-2xl mb-12"
          >
            {content.heroSubtitle}
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Filter size={16} className="text-offwhite-800" />
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Filter;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-engineer-500 text-white'
                      : 'bg-white/5 text-offwhite-600 hover:bg-white/10 hover:text-offwhite-400'
                  }`}
                >
                  {cat.id !== 'all' && <Icon size={14} />}
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {activeCategory === 'all' && featuredProjects.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <span className="text-offwhite-800 text-sm uppercase tracking-wide">
              {content.featured}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-1">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/${lang}/projects/${project.slug}`}
              >
                <motion.div
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
                      <span className="px-3 py-1 bg-engineer-500/20 border border-engineer-500/30 rounded-full text-xs text-engineer-400 uppercase tracking-wide">
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

                    {/* Description Preview */}
                    <p className="text-sm text-offwhite-700 mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-6 mb-6">
                      {project.stats.slice(0, 3).map((stat, idx) => (
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
                      <span>{content.viewProject}</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </motion.div>
              </Link>
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
                {content.allProjects}
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
                <Link
                  key={project.id}
                  href={`/${lang}/projects/${project.slug}`}
                >
                  <motion.article
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
                          <span>{content.viewProject}</span>
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

                      {/* Description */}
                      <p className="text-sm text-offwhite-700 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/5 rounded text-xs text-offwhite-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex gap-6 pt-4 border-t border-white/5">
                        {project.stats.slice(0, 3).map((stat, idx) => (
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
                </Link>
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
              {content.ctaTitle}
            </h2>
            <p className="text-lg text-offwhite-700 mb-10">
              {content.ctaSubtitle}
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
