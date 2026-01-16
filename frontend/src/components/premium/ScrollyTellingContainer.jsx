import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * ScrollyTellingContainer - Apple-style Scroll-driven Storytelling Engine
 *
 * Bu bileşen, scroll ettikçe sahne sahne değişen premium bir deneyim sunar.
 * - Arka Plan (Sticky): Tam ekran görsel/video/gradient (sahneye göre fade transition)
 * - Ön Plan (Scrollable): Kısa, vurucu metin blokları
 *
 * @param {Array} scenes - Her sahne için { id, background, content, stats } objesi
 * @param {string} heroContent - Giriş hero bölümü JSX
 */

// Single Scene Component
const Scene = ({ scene, isActive, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-2xl mx-auto px-6 lg:px-8"
      >
        {/* Scene Label */}
        {scene.label && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-spec-sm tracking-tech uppercase">
              <span className="w-8 h-px bg-engineer-500" />
              {scene.label}
            </span>
          </motion.div>
        )}

        {/* Scene Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-offwhite-400 tracking-tight leading-tight mb-6"
        >
          {scene.title}
        </motion.h2>

        {/* Scene Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-offwhite-700 leading-relaxed mb-10"
        >
          {scene.description}
        </motion.p>

        {/* Stats Grid */}
        {scene.stats && scene.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {scene.stats.map((stat, idx) => (
              <div key={idx} className="border-l border-onyx-400 pl-4">
                <div className="font-mono text-2xl md:text-3xl font-bold text-offwhite-400 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-offwhite-800 mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Background Layer Component
const BackgroundLayer = ({ scenes, activeIndex, className }) => {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      {scenes.map((scene, index) => (
        <AnimatePresence key={scene.id}>
          {activeIndex === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {/* Background Type: Image */}
              {scene.backgroundType === 'image' && scene.backgroundSrc && (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${scene.backgroundSrc})` }}
                >
                  <div className="absolute inset-0 bg-onyx-900/80" />
                </div>
              )}

              {/* Background Type: Video */}
              {scene.backgroundType === 'video' && scene.backgroundSrc && (
                <div className="absolute inset-0">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={scene.backgroundSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-onyx-900/70" />
                </div>
              )}

              {/* Background Type: Gradient (Default) */}
              {(!scene.backgroundType || scene.backgroundType === 'gradient') && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: scene.backgroundGradient ||
                      `radial-gradient(ellipse at 50% 50%, ${scene.accentColor || 'rgba(249, 115, 22, 0.08)'} 0%, transparent 60%),
                       linear-gradient(180deg, #050505 0%, #0A0A0A 50%, #050505 100%)`
                  }}
                />
              )}

              {/* Subtle Grid Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '100px 100px'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

// Main ScrollyTelling Container
const ScrollyTellingContainer = ({
  scenes = [],
  heroContent,
  ctaContent,
  className = ''
}) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position for background switching
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Update active scene based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const totalScenes = scenes.length;
      if (totalScenes === 0) return;

      // Calculate which scene should be active
      const sceneIndex = Math.min(
        Math.floor(value * totalScenes),
        totalScenes - 1
      );

      if (sceneIndex !== activeIndex) {
        setActiveIndex(sceneIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, scenes.length, activeIndex]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Sticky Background Layer */}
      <BackgroundLayer scenes={scenes} activeIndex={activeIndex} />

      {/* Hero Section */}
      {heroContent && (
        <div className="min-h-screen flex items-center justify-center relative z-10">
          {heroContent}
        </div>
      )}

      {/* Scrollable Content Scenes */}
      {scenes.map((scene, index) => (
        <Scene
          key={scene.id}
          scene={scene}
          index={index}
          isActive={index === activeIndex}
        />
      ))}

      {/* CTA Section */}
      {ctaContent && (
        <div className="min-h-[70vh] flex items-center justify-center relative z-10">
          {ctaContent}
        </div>
      )}

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-fade-up z-20 pointer-events-none" />
    </div>
  );
};

// Progress Indicator Component (Optional)
export const ScrollProgress = ({ progress }) => {
  return (
    <motion.div
      className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`w-1 h-8 rounded-full transition-colors duration-300 ${
            progress >= i / 4 ? 'bg-engineer-500' : 'bg-onyx-600'
          }`}
        />
      ))}
    </motion.div>
  );
};

// Scene Indicator Dots (Optional)
export const SceneIndicator = ({ scenes, activeIndex, onSelect }) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {scenes.map((scene, index) => (
        <button
          key={scene.id}
          onClick={() => onSelect?.(index)}
          className={`group relative flex items-center justify-end`}
        >
          {/* Label on hover */}
          <span className={`
            absolute right-6 whitespace-nowrap text-sm font-medium
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            ${index === activeIndex ? 'text-offwhite-400' : 'text-offwhite-800'}
          `}>
            {scene.label}
          </span>

          {/* Dot */}
          <span className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${index === activeIndex
              ? 'bg-engineer-500 scale-125'
              : 'bg-onyx-600 hover:bg-onyx-500'}
          `} />
        </button>
      ))}
    </div>
  );
};

export default ScrollyTellingContainer;
