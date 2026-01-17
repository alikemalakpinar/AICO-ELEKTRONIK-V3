'use client';

import React, { useRef, useState, useEffect, ReactNode, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import type { Locale } from '@/types';

export interface StoryStep {
  id: string;
  badge?: string;
  title: string;
  description: string;
  component: ReactNode;
  accentColor?: string;
}

interface StickyScrollStoryProps {
  steps: StoryStep[];
  lang?: Locale;
  className?: string;
  deviceType?: 'phone' | 'tablet' | 'monitor' | 'custom';
  customDevice?: ReactNode;
  showProgressBar?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// Device Frame Components with improved mobile responsiveness
function PhoneFrame({ children, accentColor }: { children: ReactNode; accentColor?: string }) {
  const glowColor = accentColor || '#F97316';

  return (
    <div className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] md:w-[300px] md:h-[620px] lg:w-[320px] lg:h-[660px]">
      {/* Phone bezel */}
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-[2.5rem] sm:rounded-[3rem] p-[6px] sm:p-2 shadow-2xl border border-white/10">
        {/* Dynamic Island */}
        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-20 sm:w-24 md:w-28 h-5 sm:h-6 md:h-7 bg-onyx-900 rounded-full z-20">
          {/* Notch inner glow */}
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{ boxShadow: `inset 0 0 10px ${glowColor}20` }}
          />
        </div>
        {/* Screen */}
        <div className="relative w-full h-full bg-onyx-900 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
          {/* Screen reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32 h-1 bg-white/30 rounded-full" />
      </div>
      {/* Ambient glow - uses accent color */}
      <div
        className="absolute inset-0 blur-3xl -z-10 scale-150 opacity-40"
        style={{ background: `radial-gradient(circle, ${glowColor}30, transparent 70%)` }}
      />
    </div>
  );
}

function TabletFrame({ children, accentColor }: { children: ReactNode; accentColor?: string }) {
  const glowColor = accentColor || '#F97316';

  return (
    <div className="relative w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] md:w-[500px] md:h-[380px] lg:w-[560px] lg:h-[420px]">
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-2xl border border-white/10">
        {/* Camera */}
        <div className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-onyx-600 rounded-full" />
        {/* Screen */}
        <div className="relative w-full h-full bg-onyx-900 rounded-lg sm:rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
          {children}
        </div>
      </div>
      <div
        className="absolute inset-0 blur-3xl -z-10 scale-150 opacity-30"
        style={{ background: `radial-gradient(circle, ${glowColor}25, transparent 70%)` }}
      />
    </div>
  );
}

function MonitorFrame({ children, accentColor }: { children: ReactNode; accentColor?: string }) {
  const glowColor = accentColor || '#F97316';

  return (
    <div className="relative w-[340px] h-[220px] sm:w-[480px] sm:h-[300px] md:w-[600px] md:h-[380px] lg:w-[680px] lg:h-[420px]">
      {/* Monitor body */}
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl border border-white/10">
        {/* Power LED */}
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: glowColor, boxShadow: `0 0 8px ${glowColor}` }}
        />
        {/* Screen */}
        <div className="relative w-full h-[calc(100%-8px)] bg-onyx-900 rounded-lg sm:rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
          {children}
        </div>
      </div>
      {/* Stand */}
      <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-b-lg border-x border-b border-white/10" />
      <div className="absolute -bottom-5 sm:-bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 w-28 sm:w-32 md:w-40 h-2 sm:h-2.5 md:h-3 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-full border border-white/10" />
      {/* Glow */}
      <div
        className="absolute inset-0 blur-3xl -z-10 scale-150 opacity-25"
        style={{ background: `radial-gradient(circle, ${glowColor}20, transparent 70%)` }}
      />
    </div>
  );
}

// Progress bar component
function ProgressBar({ progress, accentColor }: { progress: number; accentColor: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-onyx-800/50">
      <motion.div
        className="h-full"
        style={{
          backgroundColor: accentColor,
          width: `${progress * 100}%`,
          boxShadow: `0 0 20px ${accentColor}80`
        }}
      />
    </div>
  );
}

export default function StickyScrollStory({
  steps,
  lang,
  className = '',
  deviceType = 'phone',
  customDevice,
  showProgressBar = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: StickyScrollStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  // Mouse position for magnetic effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Update active index based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const newIndex = Math.min(
        Math.floor(value * steps.length),
        steps.length - 1
      );
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
        setIsAutoPlaying(false); // Stop autoplay on scroll
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, steps.length, activeIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, steps.length]);

  // Handle mouse move for magnetic effects
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const currentStep = steps[activeIndex] || steps[0];
  const currentColor = currentStep.accentColor || '#F97316';

  // Select device frame
  const DeviceFrame = deviceType === 'phone' ? PhoneFrame :
                      deviceType === 'tablet' ? TabletFrame :
                      deviceType === 'monitor' ? MonitorFrame :
                      ({ children }: { children: ReactNode }) => <>{children}</>;

  // Calculate scroll progress for current step
  const progress = scrollYProgress;

  return (
    <section
      ref={containerRef}
      className={`relative bg-onyx-950 ${className}`}
      style={{ height: `${steps.length * 100}vh` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Progress bar */}
      {showProgressBar && (
        <ProgressBar progress={scrollYProgress.get()} accentColor={currentColor} />
      )}

      {/* Dynamic background based on active step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            background: currentStep.accentColor
              ? `radial-gradient(ellipse at 50% 30%, ${currentStep.accentColor}12 0%, transparent 60%)`
              : 'transparent',
          }}
        />
      </AnimatePresence>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-20">
            {/* Left: Text Content - Mobile first approach */}
            <div className="flex-1 w-full max-w-lg order-2 lg:order-1">
              {/* Mobile Step Indicators */}
              <div className="flex lg:hidden gap-1.5 sm:gap-2 mb-4 sm:mb-6 justify-center">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                      idx === activeIndex
                        ? 'w-6 sm:w-8'
                        : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    style={idx === activeIndex ? { backgroundColor: currentColor } : {}}
                    aria-label={`Go to step ${idx + 1}: ${step.title}`}
                  />
                ))}
              </div>

              {/* Desktop Step Navigation */}
              <div className="hidden lg:flex flex-col gap-3 mb-8">
                {steps.map((step, idx) => {
                  const isActive = idx === activeIndex;
                  const stepColor = step.accentColor || '#F97316';

                  return (
                    <motion.button
                      key={step.id}
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsAutoPlaying(false);
                      }}
                      className={`flex items-center gap-4 p-3 xl:p-4 rounded-xl xl:rounded-2xl text-left transition-all duration-300 ${
                        isActive
                          ? 'bg-onyx-800/80 border border-white/10'
                          : 'hover:bg-onyx-800/40 border border-transparent'
                      }`}
                      whileHover={{ x: isActive ? 0 : 4 }}
                      style={isActive ? { borderColor: `${stepColor}30` } : {}}
                    >
                      {/* Step Number */}
                      <div
                        className={`w-8 h-8 xl:w-10 xl:h-10 rounded-lg xl:rounded-xl flex items-center justify-center font-mono text-xs xl:text-sm transition-all ${
                          isActive
                            ? 'text-white'
                            : 'bg-onyx-800 text-offwhite-700'
                        }`}
                        style={isActive ? { backgroundColor: stepColor } : {}}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      {/* Step Title */}
                      <span
                        className={`font-medium text-sm xl:text-base transition-colors ${
                          isActive ? 'text-offwhite-400' : 'text-offwhite-700'
                        }`}
                      >
                        {step.title}
                      </span>
                      {/* Active indicator */}
                      <div
                        className={`ml-auto w-1 xl:w-1.5 h-6 xl:h-8 rounded-full transition-all ${
                          isActive ? '' : 'bg-transparent'
                        }`}
                        style={isActive ? { backgroundColor: stepColor } : {}}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Step Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center lg:text-left px-2 sm:px-0"
                >
                  {currentStep.badge && (
                    <span
                      className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4"
                      style={{ color: currentColor }}
                    >
                      <span className="w-4 sm:w-6 h-px" style={{ backgroundColor: currentColor }} />
                      {currentStep.badge}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-offwhite-400 mb-3 sm:mb-4 leading-tight">
                    {currentStep.title}
                  </h3>
                  <p className="text-offwhite-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    {currentStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Device with Dynamic Content */}
            <motion.div
              className="flex-shrink-0 order-1 lg:order-2"
              style={{ x: springX, y: springY }}
            >
              {customDevice ? (
                <div className="relative">
                  {customDevice}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      {currentStep.component}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <DeviceFrame accentColor={currentColor}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      {currentStep.component}
                    </motion.div>
                  </AnimatePresence>
                </DeviceFrame>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Hint - only show on first step */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: activeIndex === 0 ? 1 : 0, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-offwhite-800 text-[10px] sm:text-xs uppercase tracking-widest">
          {lang === 'tr' ? 'Kaydırın' : 'Scroll'}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-6 sm:h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>

      {/* Auto-play toggle (if enabled) */}
      {autoPlay && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 p-2 sm:p-3 rounded-full bg-onyx-800/80 border border-white/10 backdrop-blur-sm transition-all hover:bg-onyx-700/80"
          style={{ boxShadow: isAutoPlaying ? `0 0 20px ${currentColor}40` : 'none' }}
        >
          {isAutoPlaying ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-offwhite-400" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-offwhite-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}
