'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// ===========================================
// ProductShowcase - Split-Screen Scrolly Demo
// Left: Sticky demo area (iPad mockup, 3D scene, etc.)
// Right: Scroll-triggered content cards
// ===========================================

export interface ShowcaseStep {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  demoState?: string;
  features?: string[];
}

export interface ProductShowcaseProps {
  steps: ShowcaseStep[];
  demoComponent: React.ComponentType<{ activeStep: number; steps: ShowcaseStep[] }>;
  className?: string;
  stickyOffset?: number;
}

// Step Card Component with staggered reveal
function StepCard({
  step,
  index,
  isActive,
  totalSteps,
}: {
  step: ShowcaseStep;
  index: number;
  isActive: boolean;
  totalSteps: number;
}) {
  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  const accentColor = step.accentColor || '#F97316';

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative p-8 rounded-3xl border transition-all duration-500',
        isActive
          ? 'bg-onyx-800/60 border-white/10 shadow-2xl'
          : 'bg-onyx-800/20 border-white/5'
      )}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 20 }}
      transition={{
        duration: 0.6,
        delay: 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Active indicator line */}
      <motion.div
        className="absolute left-0 top-8 bottom-8 w-1 rounded-full"
        style={{ backgroundColor: accentColor }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Step number */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold transition-colors',
            isActive ? 'text-white' : 'text-muted-foreground'
          )}
          style={{ backgroundColor: isActive ? accentColor : 'rgba(255,255,255,0.05)' }}
        >
          {step.icon || String(index + 1).padStart(2, '0')}
        </div>

        {step.badge && (
          <span
            className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {step.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={cn(
          'text-2xl font-semibold mb-3 transition-colors',
          isActive ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        {step.description}
      </p>

      {/* Features list with stagger animation */}
      {step.features && step.features.length > 0 && (
        <ul className="space-y-3">
          {step.features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-3 text-sm text-muted-foreground"
              initial={{ opacity: 0, x: 20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              {feature}
            </motion.li>
          ))}
        </ul>
      )}

      {/* Progress indicator */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">{index + 1} / {totalSteps}</span>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-6 h-1 rounded-full transition-colors',
                  i === index ? 'bg-engineer-500' : 'bg-white/10'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// iPad Mockup Frame for demo area
function DeviceMockup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative', className)}>
      {/* iPad frame */}
      <div className="relative bg-onyx-900 rounded-[2.5rem] p-3 shadow-2xl border border-white/10">
        {/* Bezel */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />

        {/* Screen */}
        <div className="relative bg-onyx-950 rounded-[2rem] overflow-hidden aspect-[4/3]">
          {children}
        </div>
      </div>

      {/* Reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[2.5rem] pointer-events-none" />
    </div>
  );
}

// Main ProductShowcase Component
export default function ProductShowcase({
  steps,
  demoComponent: DemoComponent,
  className,
  stickyOffset = 100,
}: ProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Calculate active step based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const stepElements = container.querySelectorAll('[data-step]');

      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;

        if (Math.abs(elementCenter - viewportCenter) < rect.height / 2) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  return (
    <section ref={containerRef} className={cn('relative', className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Sticky Demo Area */}
          <div className="hidden lg:block">
            <div
              className="sticky"
              style={{ top: `${stickyOffset}px` }}
            >
              <DeviceMockup className="w-full max-w-lg mx-auto">
                <DemoComponent activeStep={activeStep} steps={steps} />
              </DeviceMockup>

              {/* Demo state indicator */}
              <motion.div
                className="mt-6 text-center"
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-onyx-800/50 border border-white/5 text-xs font-mono text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {steps[activeStep]?.demoState || `Step ${activeStep + 1} Active`}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right: Scroll-triggered Content Cards */}
          <div className="space-y-8 py-20 lg:py-40">
            {steps.map((step, index) => (
              <div key={step.id} data-step={index} className="min-h-[50vh] flex items-center">
                <StepCard
                  step={step}
                  index={index}
                  isActive={index === activeStep}
                  totalSteps={steps.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Show demo inline */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <DeviceMockup className="w-full max-w-xs mx-auto scale-75 origin-bottom">
          <DemoComponent activeStep={activeStep} steps={steps} />
        </DeviceMockup>
      </div>
    </section>
  );
}

// Export types and sub-components
export { DeviceMockup, StepCard };
