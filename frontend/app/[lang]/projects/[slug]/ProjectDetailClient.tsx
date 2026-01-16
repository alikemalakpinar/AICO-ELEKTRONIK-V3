'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Cpu,
  Code,
  Radio,
  Cloud,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import type { Project, Locale } from '@/types';

// Lazy load 3D component for performance
const HolographicGrid = dynamic(
  () => import('@/components/premium/3d/HolographicGrid'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-onyx-800 via-onyx-900 to-black" />
    ),
  }
);

interface ProjectDetailClientProps {
  project: Project;
  lang: Locale;
}

// Icon mapping for tech stack
const techIcons: Record<string, React.ElementType> = {
  cpu: Cpu,
  code: Code,
  radio: Radio,
  cloud: Cloud,
  brain: Cpu,
  layout: Code,
  signal: Radio,
  server: Cloud,
  monitor: Code,
  zap: Radio,
  activity: Code,
  sliders: Code,
  wifi: Radio,
  battery: Cpu,
  shield: CheckCircle2,
  droplet: Radio,
  database: Cloud,
  smartphone: Code,
  'share-2': Radio,
  'bar-chart': Code,
  'message-square': Radio,
  thermometer: Cpu,
};

// Navigation sections
const sections = {
  tr: [
    { id: 'overview', label: 'Genel Bakis' },
    { id: 'challenge', label: 'Problem & Cozum' },
    { id: 'specs', label: 'Teknik Ozellikler' },
    { id: 'techstack', label: 'Teknolojiler' },
    { id: 'results', label: 'Sonuclar' },
  ],
  en: [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge & Solution' },
    { id: 'specs', label: 'Technical Specs' },
    { id: 'techstack', label: 'Tech Stack' },
    { id: 'results', label: 'Results' },
  ],
};

export default function ProjectDetailClient({
  project,
  lang,
}: ProjectDetailClientProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections[lang].map((s) =>
        document.getElementById(s.id)
      );
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[lang][i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang]);

  const t = {
    tr: {
      backToProjects: 'Tum Projeler',
      challenge: 'Problem',
      solution: 'Cozum',
      techStack: 'Kullanilan Teknolojiler',
      specs: 'Teknik Ozellikler',
      results: 'Sonuclar & Metrikler',
      cta: 'Bu projeye benzer bir ihtiyaciniz mi var?',
      ctaButton: 'Gorusme Planla',
      hardware: 'Donanim',
      software: 'Yazilim',
      protocol: 'Protokol',
      platform: 'Platform',
    },
    en: {
      backToProjects: 'All Projects',
      challenge: 'Challenge',
      solution: 'Solution',
      techStack: 'Technologies Used',
      specs: 'Technical Specifications',
      results: 'Results & Metrics',
      cta: 'Have a similar project in mind?',
      ctaButton: 'Schedule a Meeting',
      hardware: 'Hardware',
      software: 'Software',
      protocol: 'Protocol',
      platform: 'Platform',
    },
  };

  const text = t[lang];

  // Group tech stack by category
  const techByCategory = project.techStack.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) acc[tech.category] = [];
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<string, typeof project.techStack>
  );

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Hero Section with 3D Background */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* 3D Holographic Grid Background */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <HolographicGrid className="opacity-40" />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-onyx-900 via-onyx-900/70 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-16">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-32 left-6"
          >
            <Link
              href={`/${lang}/projects`}
              className="group inline-flex items-center gap-2 text-offwhite-600 hover:text-offwhite-400 transition-colors"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-sm font-medium">{text.backToProjects}</span>
            </Link>
          </motion.div>

          {/* Category & Year */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="px-4 py-1.5 bg-engineer-500/20 border border-engineer-500/30 rounded-full text-engineer-400 text-sm font-medium uppercase tracking-wide">
              {project.category}
            </span>
            <span className="flex items-center gap-2 text-offwhite-600 text-sm">
              <Calendar size={14} />
              {project.year}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite-400 mb-4 max-w-4xl"
          >
            {project.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-offwhite-600 max-w-2xl"
          >
            {project.subtitle}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {project.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-lg text-offwhite-700 text-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-onyx-900/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
            {sections[lang].map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'text-engineer-500'
                    : 'text-offwhite-600 hover:text-offwhite-400'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Overview Section */}
        <section id="overview" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16"
          >
            {/* Description */}
            <div>
              <p className="text-lg text-offwhite-600 leading-relaxed mb-8">
                {project.description}
              </p>
              <div className="prose prose-invert prose-lg max-w-none">
                {project.fullDetailText.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-offwhite-700 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {project.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-onyx-800/50 border border-white/5 rounded-2xl"
                >
                  <div className="font-mono text-3xl md:text-4xl font-bold text-engineer-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-offwhite-700 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Challenge & Solution Section */}
        <section id="challenge" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Challenge */}
            <div className="p-8 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-xl">!</span>
                </div>
                <h3 className="text-xl font-bold text-offwhite-400">
                  {text.challenge}
                </h3>
              </div>
              <p className="text-offwhite-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="p-8 bg-gradient-to-br from-engineer-500/10 to-transparent border border-engineer-500/20 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-engineer-500/20 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-engineer-400" />
                </div>
                <h3 className="text-xl font-bold text-offwhite-400">
                  {text.solution}
                </h3>
              </div>
              <p className="text-offwhite-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Technical Specifications Section */}
        <section id="specs" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-12">
              <FileText size={24} className="text-engineer-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-offwhite-400">
                {text.specs}
              </h2>
            </div>

            <div className="bg-onyx-800/30 border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {project.specs.map((spec, idx) => (
                    <motion.tr
                      key={spec.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className={`${
                        idx % 2 === 0 ? 'bg-white/[0.02]' : ''
                      } border-b border-white/5 last:border-0`}
                    >
                      <td className="px-6 py-4 text-offwhite-600 font-medium w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-offwhite-400 font-mono">
                        {spec.value}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* Tech Stack Section */}
        <section id="techstack" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-offwhite-400 mb-12">
              {text.techStack}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(techByCategory).map(([category, techs]) => (
                <div
                  key={category}
                  className="p-6 bg-onyx-800/30 border border-white/5 rounded-2xl"
                >
                  <h4 className="text-sm text-offwhite-700 uppercase tracking-wide mb-4">
                    {text[category as keyof typeof text] || category}
                  </h4>
                  <div className="space-y-3">
                    {techs.map((tech) => {
                      const Icon = techIcons[tech.icon || 'code'] || Code;
                      return (
                        <div
                          key={tech.name}
                          className="flex items-center gap-3 text-offwhite-500"
                        >
                          <Icon size={18} className="text-engineer-500" />
                          <span>{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Results Section */}
        <section id="results" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-offwhite-400 mb-12">
              {text.results}
            </h2>

            <div className="grid md:grid-cols-4 gap-1">
              {project.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-onyx-800 text-center"
                >
                  <div className="font-mono text-4xl md:text-5xl font-bold text-offwhite-400 mb-3">
                    {stat.value}
                  </div>
                  <div className="text-sm text-offwhite-700 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-offwhite-400 mb-6">
              {project.cta?.text || text.cta}
            </h2>
            <Link
              href={project.cta?.link || `/${lang}/contact?subject=consultation`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300"
            >
              <span>{text.ctaButton}</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </section>

        {/* Back to Projects */}
        <div className="text-center pt-12 border-t border-white/5">
          <Link
            href={`/${lang}/projects`}
            className="group inline-flex items-center gap-2 text-offwhite-600 hover:text-engineer-500 transition-colors"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>{text.backToProjects}</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
