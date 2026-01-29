'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useState, useEffect } from 'react';

// ===========================================
// PageTransition v3.2 — Boot Sequence + Signal Dropout
// HUD brackets + SYS::LOADING glitch on entry
// ===========================================

interface PageTransitionProps {
  children: ReactNode;
}

// Boot Sequence overlay — HUD brackets + glitch text
function BootSequence({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9990] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
    >
      {/* Corner brackets — HUD frame */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-engineer-500/60" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-engineer-500/60" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-engineer-500/60" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-engineer-500/60" />

      {/* SYS::LOADING glitch text */}
      <motion.span
        className="font-mono text-[10px] tracking-[0.3em] uppercase text-engineer-500/70"
        style={{ animation: 'glitch-text 0.15s steps(2) 3' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.1, 0.6, 1] }}
      >
        SYS::LOADING
      </motion.span>

      {/* Top-left spec label */}
      <motion.span
        className="absolute top-7 left-16 font-mono text-[8px] text-engineer-500/40 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 0.7 }}
      >
        AICO_NAV_v3.2
      </motion.span>
    </motion.div>
  );
}

// Simple Fade Transition
export function FadeTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 1.02 }}
        transition={{
          duration: 0.4,
          ease: 'easeOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Curtain Wipe Transition
export function CurtainTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Curtain Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 bg-onyx-900 z-[9990] pointer-events-none"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: [0, 1, 1, 0],
              transition: {
                duration: 0.8,
                times: [0, 0.4, 0.6, 1],
                ease: 'easeInOut',
              },
            }}
            style={{ originY: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}

// Slide Transition
export function SlideTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{
          duration: 0.4,
          ease: 'easeOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Default export — Boot Sequence + Signal Dropout
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [showBoot, setShowBoot] = useState(false);

  useEffect(() => {
    setShowBoot(true);
    const timer = setTimeout(() => setShowBoot(false), 900);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Boot sequence overlay */}
      <BootSequence isActive={showBoot} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -8,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="will-change-[opacity,transform]"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
