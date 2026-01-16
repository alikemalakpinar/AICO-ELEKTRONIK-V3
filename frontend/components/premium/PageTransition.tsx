'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useState, useEffect } from 'react';

/**
 * PageTransition - Cinematic Page Transitions
 *
 * Features:
 * - Smooth fade + slide transitions between pages
 * - Curtain wipe effect option
 * - No "hard reload" feel
 * - Performance optimized with framer-motion
 */

interface PageTransitionProps {
  children: ReactNode;
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

// Default export - Premium Fade with subtle blur
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
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
          duration: 0.35,
          ease: 'easeOut',
        }}
        className="will-change-[opacity,transform]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
