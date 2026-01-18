'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ===========================================
// ScrollyTellingContainer - Apple-style Scroll Engine
// Premium scrollytelling for AICO Engineering Showroom
// ===========================================

export interface ScrollyScene {
  id: string;
  backgroundImage?: string;
  backgroundColor?: string;
  title: string;
  subtitle?: string;
  content: string;
  badge?: string;
  stats?: Array<{ label: string; value: string }>;
}

interface ScrollyTellingContainerProps {
  scenes: ScrollyScene[];
  className?: string;
}

// Individual Scene Component
function ScrollyScene({
  scene,
  index,
  isActive,
}: {
  scene: ScrollyScene;
  index: number;
  isActive: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative py-32"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          {/* Badge */}
          {scene.badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase">
                <span className="w-8 h-px bg-engineer-500" />
                {scene.badge}
                <span className="w-8 h-px bg-engineer-500" />
              </span>
            </motion.div>
          )}

          {/* Title - Theme Adaptive */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight"
          >
            {scene.title}
          </motion.h2>

          {/* Subtitle */}
          {scene.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-engineer-500 mb-8"
            >
              {scene.subtitle}
            </motion.p>
          )}

          {/* Content - Theme Adaptive */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {scene.content}
          </motion.p>

          {/* Stats - Theme Adaptive */}
          {scene.stats && scene.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center gap-12 mt-12"
            >
              {scene.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Background Layer Component - Theme Adaptive
function BackgroundLayer({
  scenes,
  activeSceneIndex,
}: {
  scenes: ScrollyScene[];
  activeSceneIndex: number;
}) {
  const activeScene = scenes[activeSceneIndex];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Base background - adapts to theme */}
      <div className="absolute inset-0 bg-background transition-colors duration-300" />

      {/* Softer Gradient Overlay - Theme Adaptive, REDUCED OPACITY */}
      <div className="absolute inset-0 z-10 dark:bg-gradient-to-b dark:from-onyx-900/40 dark:via-transparent dark:to-onyx-900/40 light:bg-gradient-to-b light:from-white/20 light:via-transparent light:to-white/20" />

      {/* Subtle Vignette Effect - Reduced for readability */}
      <div className="absolute inset-0 z-10 dark:bg-gradient-radial dark:from-transparent dark:via-transparent dark:to-onyx-900/20 light:bg-gradient-radial light:from-transparent light:via-transparent light:to-gray-100/30" />

      {/* Grid Pattern - Theme Adaptive */}
      <div
        className="absolute inset-0 opacity-[0.03] z-5 dark:opacity-[0.03] light:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(var(--product-primary, rgba(249,115,22,0.15)) 1px, transparent 1px),
            linear-gradient(90deg, var(--product-primary, rgba(249,115,22,0.15)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial Glow - Subtle accent */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSceneIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-5"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full dark:bg-gradient-radial dark:from-engineer-500/8 dark:via-engineer-500/2 dark:to-transparent light:bg-gradient-radial light:from-engineer-500/5 light:via-engineer-500/1 light:to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Background Image (if provided) */}
      {activeScene?.backgroundImage && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${activeSceneIndex}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${activeScene.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
      )}
    </div>
  );
}

// Progress Indicator - Theme Adaptive
function ProgressIndicator({
  totalScenes,
  activeIndex,
}: {
  totalScenes: number;
  activeIndex: number;
}) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {Array.from({ length: totalScenes }).map((_, idx) => (
        <motion.div
          key={idx}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            idx === activeIndex
              ? 'bg-engineer-500 scale-125'
              : 'dark:bg-white/20 dark:hover:bg-white/40 light:bg-gray-400/40 light:hover:bg-gray-400/60'
          }`}
          animate={idx === activeIndex ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
}

// Main Container Component
export default function ScrollyTellingContainer({
  scenes,
  className = '',
}: ScrollyTellingContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Track scroll position to determine active scene
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const scrollPosition = window.scrollY - containerTop;
      const sceneHeight = window.innerHeight;

      const newIndex = Math.max(
        0,
        Math.min(
          scenes.length - 1,
          Math.floor(scrollPosition / sceneHeight + 0.5)
        )
      );

      setActiveSceneIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scenes.length]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background Layer */}
      <BackgroundLayer scenes={scenes} activeSceneIndex={activeSceneIndex} />

      {/* Progress Indicator */}
      <ProgressIndicator
        totalScenes={scenes.length}
        activeIndex={activeSceneIndex}
      />

      {/* Content Scenes */}
      <div className="relative z-10">
        {scenes.map((scene, index) => (
          <ScrollyScene
            key={scene.id}
            scene={scene}
            index={index}
            isActive={index === activeSceneIndex}
          />
        ))}
      </div>
    </div>
  );
}
