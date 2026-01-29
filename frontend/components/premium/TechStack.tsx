'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/types';

interface TechStackProps {
  lang?: Locale;
}

// Technology stack data
const techStackData = {
  tr: {
    badge: 'TEKNOLOJİ YIĞINIMIZ',
    title: 'Kullandığımız Teknolojiler',
  },
  en: {
    badge: 'OUR TECH STACK',
    title: 'Technologies We Use',
  },
};

// Technology categories with logos (using SVG-like representations)
const technologies = [
  {
    category: 'mobile',
    items: [
      { name: 'Swift', abbr: 'Sw', color: '#F05138' },
      { name: 'Kotlin', abbr: 'Kt', color: '#7F52FF' },
      { name: 'React Native', abbr: 'RN', color: '#61DAFB' },
      { name: 'Flutter', abbr: 'Fl', color: '#02569B' },
    ],
  },
  {
    category: 'web',
    items: [
      { name: 'Next.js', abbr: 'Nx', color: '#FFFFFF' },
      { name: 'React', abbr: 'Re', color: '#61DAFB' },
      { name: 'TypeScript', abbr: 'TS', color: '#3178C6' },
      { name: 'Node.js', abbr: 'Nd', color: '#339933' },
    ],
  },
  {
    category: 'embedded',
    items: [
      { name: 'Altium', abbr: 'At', color: '#A5915F' },
      { name: 'KiCad', abbr: 'Ki', color: '#314CB0' },
      { name: 'STM32', abbr: 'ST', color: '#03234B' },
      { name: 'ESP32', abbr: 'ES', color: '#E7352C' },
    ],
  },
  {
    category: 'cloud',
    items: [
      { name: 'Azure', abbr: 'Az', color: '#0078D4' },
      { name: 'AWS', abbr: 'AW', color: '#FF9900' },
      { name: 'Firebase', abbr: 'Fb', color: '#FFCA28' },
      { name: 'Docker', abbr: 'Dk', color: '#2496ED' },
    ],
  },
];

// Flatten all technologies for the marquee
const allTechnologies = technologies.flatMap((cat) => cat.items);
// Double the array for seamless looping
const marqueeItems = [...allTechnologies, ...allTechnologies];

// Technology Logo Component
function TechLogo({ tech, index }: { tech: typeof allTechnologies[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col items-center gap-3 px-6 md:px-8"
    >
      {/* Logo Circle */}
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-mono font-bold text-lg md:text-xl transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${tech.color}15`,
          color: tech.color,
          border: `1px solid ${tech.color}30`,
        }}
      >
        {tech.abbr}
      </div>
      {/* Name */}
      <span className="text-xs md:text-sm text-offwhite-700 group-hover:text-offwhite-400 transition-colors whitespace-nowrap">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechStack({ lang }: TechStackProps) {
  const safeLang: Locale = lang && (lang === 'tr' || lang === 'en') ? lang : 'tr';
  const content = techStackData[safeLang];

  return (
    <section className="relative py-16 md:py-24 bg-onyx-900 overflow-hidden border-y border-white/5">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-engineer-500/3 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-6 h-px bg-engineer-500" />
            {content.badge}
            <span className="w-6 h-px bg-engineer-500" />
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-offwhite-400">
            {content.title}
          </h2>
        </motion.div>

        {/* Technology Categories - Grid on Desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
          {technologies.map((category, catIdx) => (
            <div key={category.category} className="text-center">
              <span className="text-xs text-offwhite-800 uppercase tracking-wider mb-6 block">
                {category.category === 'mobile' && (safeLang === 'tr' ? 'Mobil' : 'Mobile')}
                {category.category === 'web' && 'Web'}
                {category.category === 'embedded' && (safeLang === 'tr' ? 'Gomulu' : 'Embedded')}
                {category.category === 'cloud' && (safeLang === 'tr' ? 'Bulut' : 'Cloud')}
              </span>
              <div className="flex flex-wrap justify-center gap-4">
                {category.items.map((tech, techIdx) => (
                  <TechLogo
                    key={tech.name}
                    tech={tech}
                    index={catIdx * 4 + techIdx}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Animation - Mobile Only */}
        <div className="md:hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-onyx-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-onyx-900 to-transparent z-10" />

          {/* Scrolling container */}
          <motion.div
            className="flex"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {marqueeItems.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="flex flex-col items-center gap-2 px-4 flex-shrink-0"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm"
                  style={{
                    backgroundColor: `${tech.color}15`,
                    color: tech.color,
                    border: `1px solid ${tech.color}30`,
                  }}
                >
                  {tech.abbr}
                </div>
                <span className="text-xs text-offwhite-700 whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: '16+', label: safeLang === 'tr' ? 'Teknoloji' : 'Technologies' },
            { value: '20+', label: safeLang === 'tr' ? 'Yil Deneyim' : 'Years Experience' },
            { value: '100+', label: safeLang === 'tr' ? 'Proje' : 'Projects' },
          ].map((stat, idx) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-engineer-500">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-offwhite-700 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
