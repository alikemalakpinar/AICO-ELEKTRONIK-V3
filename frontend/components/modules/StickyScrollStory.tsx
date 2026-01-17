'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
}

// Device Frame Components
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[300px] h-[620px] md:w-[340px] md:h-[700px]">
      {/* Phone bezel */}
      <div className="absolute inset-0 bg-onyx-800 rounded-[3rem] p-2 shadow-2xl border border-white/10">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-onyx-900 rounded-full z-20" />
        {/* Screen */}
        <div className="relative w-full h-full bg-onyx-900 rounded-[2.5rem] overflow-hidden">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
      </div>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-engineer-500/20 via-transparent to-transparent blur-3xl -z-10 scale-150" />
    </div>
  );
}

function TabletFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[500px] h-[380px] md:w-[600px] md:h-[450px]">
      <div className="absolute inset-0 bg-onyx-800 rounded-[2rem] p-3 shadow-2xl border border-white/10">
        {/* Camera */}
        <div className="absolute top-1/2 left-3 -translate-y-1/2 w-2 h-2 bg-onyx-600 rounded-full" />
        {/* Screen */}
        <div className="relative w-full h-full bg-onyx-900 rounded-[1.5rem] overflow-hidden">
          {children}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-engineer-500/15 via-transparent to-transparent blur-3xl -z-10 scale-150" />
    </div>
  );
}

function MonitorFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[600px] h-[380px] md:w-[700px] md:h-[440px]">
      {/* Monitor body */}
      <div className="absolute inset-0 bg-onyx-800 rounded-2xl p-2 shadow-2xl border border-white/10">
        {/* Screen */}
        <div className="relative w-full h-full bg-onyx-900 rounded-xl overflow-hidden">
          {children}
        </div>
      </div>
      {/* Stand */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-8 bg-onyx-800 rounded-b-lg border-x border-b border-white/10" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-3 bg-onyx-800 rounded-full border border-white/10" />
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-engineer-500/10 via-transparent to-transparent blur-3xl -z-10 scale-150" />
    </div>
  );
}

export default function StickyScrollStory({
  steps,
  lang,
  className = '',
  deviceType = 'phone',
  customDevice,
}: StickyScrollStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, steps.length, activeIndex]);

  const currentStep = steps[activeIndex];

  // Select device frame
  const DeviceFrame = deviceType === 'phone' ? PhoneFrame :
                      deviceType === 'tablet' ? TabletFrame :
                      deviceType === 'monitor' ? MonitorFrame :
                      ({ children }: { children: ReactNode }) => <>{children}</>;

  return (
    <section
      ref={containerRef}
      className={`relative bg-onyx-950 ${className}`}
      style={{ height: `${steps.length * 100}vh` }}
    >
      {/* Dynamic background based on active step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{
            background: currentStep.accentColor
              ? `radial-gradient(ellipse at center, ${currentStep.accentColor}10 0%, transparent 70%)`
              : 'transparent',
          }}
        />
      </AnimatePresence>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Text Content */}
            <div className="flex-1 w-full lg:max-w-lg order-2 lg:order-1">
              {/* Step Indicators */}
              <div className="flex lg:hidden gap-2 mb-6 justify-center">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-8 bg-engineer-500'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Step Navigation - Desktop */}
              <div className="hidden lg:flex flex-col gap-4 mb-8">
                {steps.map((step, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <motion.button
                      key={step.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 ${
                        isActive
                          ? 'bg-onyx-800/80 border border-white/10'
                          : 'hover:bg-onyx-800/40'
                      }`}
                      whileHover={{ x: isActive ? 0 : 4 }}
                    >
                      {/* Step Number */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm transition-all ${
                          isActive
                            ? 'bg-engineer-500 text-white'
                            : 'bg-onyx-800 text-offwhite-700'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      {/* Step Title */}
                      <span
                        className={`font-medium transition-colors ${
                          isActive ? 'text-offwhite-400' : 'text-offwhite-700'
                        }`}
                      >
                        {step.title}
                      </span>
                      {/* Active indicator */}
                      <div
                        className={`ml-auto w-1.5 h-8 rounded-full transition-all ${
                          isActive ? 'bg-engineer-500' : 'bg-transparent'
                        }`}
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
                  transition={{ duration: 0.4 }}
                  className="text-center lg:text-left"
                >
                  {currentStep.badge && (
                    <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-4">
                      <span className="w-6 h-px bg-engineer-500" />
                      {currentStep.badge}
                    </span>
                  )}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-offwhite-400 mb-4">
                    {currentStep.title}
                  </h3>
                  <p className="text-offwhite-700 text-base md:text-lg leading-relaxed">
                    {currentStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Device with Dynamic Content */}
            <div className="flex-shrink-0 order-1 lg:order-2">
              {customDevice ? (
                <div className="relative">
                  {customDevice}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      {currentStep.component}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <DeviceFrame>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      {currentStep.component}
                    </motion.div>
                  </AnimatePresence>
                </DeviceFrame>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-offwhite-800 text-xs uppercase tracking-widest">
          {lang === 'tr' ? 'Kaydırın' : 'Scroll'}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
