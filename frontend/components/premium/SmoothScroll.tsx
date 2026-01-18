'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * SmoothScroll - Lenis-powered momentum scrolling wrapper
 *
 * Provides Apple-like inertial scrolling with:
 * - Momentum scroll with natural deceleration
 * - Smooth anchor link navigation
 * - RAF-based animation loop for 60fps performance
 * - Automatic cleanup on unmount
 *
 * Usage:
 * Wrap your app or page content with <SmoothScroll>...</SmoothScroll>
 *
 * Note: This is optional and can be disabled by removing the wrapper
 * for pages where native scroll is preferred (e.g., complex forms)
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with performance-optimized settings
    const lenis = new Lenis({
      duration: 1.2,           // Scroll duration (lower = snappier)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOutExpo
      orientation: 'vertical', // Only vertical scroll
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // RAF loop for smooth updates
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

/**
 * Hook to access the Lenis instance for programmatic scroll control
 * Usage:
 *   const scrollTo = useLenisScroll();
 *   scrollTo('#section', { offset: -100 });
 */
export function useLenisScroll() {
  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      lock?: boolean;
    }
  ) => {
    // Get the Lenis instance from the window if available
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(target, options);
    } else {
      // Fallback to native scroll if Lenis isn't initialized
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return scrollTo;
}

/**
 * Hook to stop/start scroll (useful for modals, overlays)
 */
export function useLenisControl() {
  const stop = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    lenis?.stop();
  };

  const start = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    lenis?.start();
  };

  return { stop, start };
}
