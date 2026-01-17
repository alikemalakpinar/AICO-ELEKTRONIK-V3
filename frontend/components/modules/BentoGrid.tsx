'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import type { Locale } from '@/types';

export interface BentoItem {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  value?: string;
  unit?: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  accentColor?: string;
  component?: ReactNode;
  backgroundImage?: string;
}

interface BentoGridProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  items: BentoItem[];
  lang?: Locale;
  className?: string;
  accentColor?: string;
}

// Size to grid span mapping
const sizeClasses: Record<string, string> = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
  large: 'col-span-1 row-span-1 md:col-span-2 md:row-span-2',
  wide: 'col-span-1 row-span-1 md:col-span-2 md:row-span-1',
  tall: 'col-span-1 row-span-1 md:col-span-1 md:row-span-2',
};

function BentoCard({ item, index, accentColor }: { item: BentoItem; index: number; accentColor: string }) {
  const color = item.accentColor || accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-3xl bg-onyx-800/50 border border-white/5 hover:border-white/10 transition-all duration-500 ${
        sizeClasses[item.size || 'medium']
      }`}
    >
      {/* Background Image */}
      {item.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ backgroundImage: `url(${item.backgroundImage})` }}
        />
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at bottom right, ${color}10 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
        {/* Icon */}
        {item.icon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${color}15`,
            }}
          >
            <item.icon size={24} style={{ color }} />
          </div>
        )}

        {/* Value Display (for stats) */}
        {item.value && (
          <div className="mb-2">
            <span
              className="font-mono text-4xl md:text-5xl font-bold"
              style={{ color }}
            >
              {item.value}
            </span>
            {item.unit && (
              <span className="text-offwhite-700 text-lg ml-1">{item.unit}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-offwhite-400 mb-2 group-hover:text-white transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-offwhite-700 text-sm md:text-base leading-relaxed flex-grow">
            {item.description}
          </p>
        )}

        {/* Custom Component */}
        {item.component && (
          <div className="mt-4 flex-grow">
            {item.component}
          </div>
        )}
      </div>

      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{
          background: `radial-gradient(circle at top right, ${color} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

export default function BentoGrid({
  badge,
  title,
  titleHighlight,
  subtitle,
  items,
  lang,
  className = '',
  accentColor = '#F97316',
}: BentoGridProps) {
  return (
    <section className={`relative py-24 md:py-32 bg-onyx-950 overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}05 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        {(badge || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            {badge && (
              <span
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-6"
                style={{ color: accentColor }}
              >
                <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
                {badge}
                <span className="w-8 h-px" style={{ backgroundColor: accentColor }} />
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 mb-6">
                {title}
                {titleHighlight && (
                  <>
                    {' '}
                    <span style={{ color: accentColor }}>{titleHighlight}</span>
                  </>
                )}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-offwhite-700 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">
          {items.map((item, index) => (
            <BentoCard
              key={item.id}
              item={item}
              index={index}
              accentColor={accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
