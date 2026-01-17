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

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Device Frame Components with improved mobile responsiveness
function PhoneFrame({ children, accentColor }: { children: ReactNode; accentColor?: string }) {
  const glowColor = accentColor || '#F97316';

  return (
    <div className="relative w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] md:w-[280px] md:h-[560px] lg:w-[300px] lg:h-[620px]">
      {/* Phone bezel */}
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-[2rem] sm:rounded-[2.5rem] p-[5px] sm:p-[6px] shadow-2xl border border-white/10">
        {/* Dynamic Island */}
        <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-4 sm:h-5 md:h-6 bg-onyx-900 rounded-full z-20">
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{ boxShadow: `inset 0 0 10px ${glowColor}20` }}
          />
        </div>
        {/* Screen */}
        <div className="relative w-full h-full bg-onyx-900 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 bg-white/30 rounded-full" />
      </div>
      {/* Ambient glow */}
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
    <div className="relative w-[280px] h-[210px] sm:w-[360px] sm:h-[270px] md:w-[440px] md:h-[330px] lg:w-[520px] lg:h-[390px]">
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl border border-white/10">
        <div className="absolute top-1/2 left-1.5 sm:left-2 -translate-y-1/2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-onyx-600 rounded-full" />
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
    <div className="relative w-[300px] h-[190px] sm:w-[420px] sm:h-[260px] md:w-[540px] md:h-[340px] lg:w-[640px] lg:h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-lg sm:rounded-xl p-1 sm:p-1.5 shadow-2xl border border-white/10">
        <div
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ backgroundColor: glowColor, boxShadow: `0 0 8px ${glowColor}` }}
        />
        <div className="relative w-full h-[calc(100%-6px)] bg-onyx-900 rounded-md sm:rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
          {children}
        </div>
      </div>
      <div className="absolute -bottom-3 sm:-bottom-5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-3 sm:h-5 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-b-md border-x border-b border-white/10" />
      <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-1.5 sm:h-2 bg-gradient-to-b from-onyx-700 to-onyx-800 rounded-full border border-white/10" />
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

// Mobile-optimized step card
function MobileStepCard({
  step,
  index,
  isActive,
  onClick,
  DeviceFrame,
}: {
  step: StoryStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
  DeviceFrame: React.ComponentType<{ children: ReactNode; accentColor?: string }>;
}) {
  const stepColor = step.accentColor || '#F97316';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="py-8 sm:py-12"
    >
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs text-white"
          style={{ backgroundColor: stepColor }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        {step.badge && (
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: stepColor }}
          >
            {step.badge}
          </span>
        )}
      </div>

      {/* Device/Demo - Shown first on mobile */}
      <div className="flex justify-center mb-8">
        <DeviceFrame accentColor={stepColor}>
          <div className="absolute inset-0">
            {step.component}
          </div>
        </DeviceFrame>
      </div>

      {/* Text content */}
      <div className="text-center px-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-offwhite-400 mb-4 leading-tight">
          {step.title}
        </h3>
        <p className="text-offwhite-700 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
          {step.description}
        </p>
      </div>
    </motion.div>
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
  const isMobile = useIsMobile();

  // Mouse position for magnetic effects (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Update active index based on scroll (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const unsubscribe = scrollYProgress.on('change', (value) => {
      const newIndex = Math.min(
        Math.floor(value * steps.length),
        steps.length - 1
      );
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
        setIsAutoPlaying(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, steps.length, activeIndex, isMobile]);

  // Auto-play functionality (desktop only)
  useEffect(() => {
    if (!isAutoPlaying || isMobile) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, steps.length, isMobile]);

  // Handle mouse move for magnetic effects
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
  }, [mouseX, mouseY, isMobile]);

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

  // ==========================================
  // MOBILE LAYOUT - Vertical Stack
  // ==========================================
  if (isMobile) {
    return (
      <section className={`relative bg-onyx-950 ${className}`}>
        {/* Mobile: Simple vertical layout with no sticky behavior */}
        <div className="max-w-lg mx-auto px-4 py-12">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center gap-2 mb-4">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-8' : 'w-2'
                  }`}
                  style={{
                    backgroundColor: idx === activeIndex ? step.accentColor || '#F97316' : 'rgba(255,255,255,0.2)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Steps - Rendered as stacked cards */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <MobileStepCard
                key={step.id}
                step={step}
                index={index}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                DeviceFrame={DeviceFrame}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // DESKTOP LAYOUT - Sticky Side-by-Side
  // ==========================================
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
          <div className="flex flex-row items-center gap-12 xl:gap-20">
            {/* Left: Text Content */}
            <div className="flex-1 max-w-lg">
              {/* Desktop Step Navigation */}
              <div className="flex flex-col gap-3 mb-8">
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
                      <span
                        className={`font-medium text-sm xl:text-base transition-colors ${
                          isActive ? 'text-offwhite-400' : 'text-offwhite-700'
                        }`}
                      >
                        {step.title}
                      </span>
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
                >
                  {currentStep.badge && (
                    <span
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-4"
                      style={{ color: currentColor }}
                    >
                      <span className="w-6 h-px" style={{ backgroundColor: currentColor }} />
                      {currentStep.badge}
                    </span>
                  )}
                  <h3 className="text-3xl lg:text-4xl font-bold text-offwhite-400 mb-4 leading-tight">
                    {currentStep.title}
                  </h3>
                  <p className="text-offwhite-700 text-base md:text-lg leading-relaxed">
                    {currentStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Device with Dynamic Content */}
            <motion.div
              className="flex-shrink-0"
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
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-offwhite-800 text-xs uppercase tracking-widest">
          {lang === 'tr' ? 'Kaydırın' : 'Scroll'}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>

      {/* Auto-play toggle (if enabled) */}
      {autoPlay && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-onyx-800/80 border border-white/10 backdrop-blur-sm transition-all hover:bg-onyx-700/80"
          style={{ boxShadow: isAutoPlaying ? `0 0 20px ${currentColor}40` : 'none' }}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5 text-offwhite-400" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-offwhite-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}
