'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import type { Locale } from '@/types';

interface ImmersiveHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlayOpacity?: number;
  accentColor?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCta?: {
    text: string;
    onClick?: () => void;
  };
  children?: ReactNode;
  lang?: Locale;
  className?: string;
  showScrollIndicator?: boolean;
  height?: 'full' | 'large' | 'medium';
}

export default function ImmersiveHero({
  badge,
  title,
  titleHighlight,
  subtitle,
  backgroundImage,
  backgroundVideo,
  overlayOpacity = 0.7,
  accentColor = '#F97316', // engineer-500
  ctaText,
  ctaHref,
  secondaryCta,
  children,
  lang,
  className = '',
  showScrollIndicator = true,
  height = 'full',
}: ImmersiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const heightClass = height === 'full' ? 'min-h-screen' :
                      height === 'large' ? 'min-h-[85vh]' :
                      'min-h-[70vh]';

  return (
    <section
      ref={containerRef}
      className={`relative ${heightClass} flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Video Background */}
        {backgroundVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {/* Image Background */}
        {backgroundImage && !backgroundVideo && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        {/* Gradient Overlays */}
        <div
          className="absolute inset-0 bg-onyx-950"
          style={{ opacity: overlayOpacity }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center bottom, ${accentColor}15 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-transparent to-onyx-950/50" />
      </motion.div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs tracking-widest uppercase"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-offwhite-400 mb-6 tracking-tight leading-tight"
        >
          {title}
          {titleHighlight && (
            <>
              <br />
              <span style={{ color: accentColor }}>{titleHighlight}</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-offwhite-700 max-w-2xl mx-auto mb-12"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {(ctaText || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {ctaText && ctaHref && (
              <a
                href={ctaHref}
                className="group flex items-center gap-2 px-8 py-4 font-medium rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: accentColor,
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 10px 40px ${accentColor}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>{ctaText}</span>
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            )}
            {secondaryCta && (
              <button
                onClick={secondaryCta.onClick}
                className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 text-offwhite-400 font-medium rounded-xl transition-all duration-300"
              >
                <Play size={18} className="group-hover:scale-110 transition-transform" />
                <span>{secondaryCta.text}</span>
              </button>
            )}
          </motion.div>
        )}

        {/* Custom Children */}
        {children}
      </motion.div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-offwhite-800 text-xs uppercase tracking-widest">
              {lang === 'tr' ? 'Keşfet' : 'Explore'}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-2 rounded-full bg-white/50"
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-onyx-950 to-transparent pointer-events-none" />
    </section>
  );
}
