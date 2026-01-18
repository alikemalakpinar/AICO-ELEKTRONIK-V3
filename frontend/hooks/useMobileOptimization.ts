'use client';

import { useState, useEffect, useMemo } from 'react';

interface MobileOptimizationState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  shouldUseLiteMode: boolean;
  prefersReducedMotion: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  isLowEndDevice: boolean;
}

// Breakpoints
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

// Performance detection thresholds
const LOW_END_MEMORY_THRESHOLD = 4; // GB
const LOW_END_CORES_THRESHOLD = 4;

/**
 * Hook for mobile optimization and performance detection
 * Returns device info and whether to use "lite" mode for performance
 */
export function useMobileOptimization(): MobileOptimizationState {
  const [state, setState] = useState<MobileOptimizationState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    shouldUseLiteMode: false,
    prefersReducedMotion: false,
    screenWidth: 1920,
    screenHeight: 1080,
    devicePixelRatio: 1,
    isLowEndDevice: false,
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // Screen size detection
      const isMobile = width < MOBILE_BREAKPOINT;
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
      const isDesktop = width >= TABLET_BREAKPOINT;

      // Reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Low-end device detection (best effort, not all browsers support these)
      let isLowEndDevice = false;

      // Check navigator for device memory (Chrome/Edge only)
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        hardwareConcurrency?: number;
      };

      if (nav.deviceMemory && nav.deviceMemory < LOW_END_MEMORY_THRESHOLD) {
        isLowEndDevice = true;
      }

      // Check CPU cores
      if (nav.hardwareConcurrency && nav.hardwareConcurrency < LOW_END_CORES_THRESHOLD) {
        isLowEndDevice = true;
      }

      // High DPR with small screen often means older device struggling
      if (dpr > 2 && width < 400) {
        isLowEndDevice = true;
      }

      // Determine if we should use lite mode
      // Lite mode: Simplified UI, reduced animations, no 3D/blur effects
      const shouldUseLiteMode =
        isMobile ||
        isLowEndDevice ||
        prefersReducedMotion ||
        (isTablet && dpr > 2); // High DPI tablet can also struggle

      setState({
        isMobile,
        isTablet,
        isDesktop,
        shouldUseLiteMode,
        prefersReducedMotion,
        screenWidth: width,
        screenHeight: height,
        devicePixelRatio: dpr,
        isLowEndDevice,
      });
    };

    // Initial update
    updateState();

    // Listen for resize
    const handleResize = () => {
      // Debounce resize events
      requestAnimationFrame(updateState);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Listen for reduced motion preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => updateState();
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return state;
}

/**
 * Simplified hook that just returns whether to use lite mode
 */
export function useLiteMode(): boolean {
  const { shouldUseLiteMode } = useMobileOptimization();
  return shouldUseLiteMode;
}

/**
 * Hook that returns CSS classes based on device type
 */
export function useMobileClasses() {
  const { isMobile, isTablet, shouldUseLiteMode } = useMobileOptimization();

  return useMemo(() => ({
    // Add these classes to elements that should be optimized
    containerClass: shouldUseLiteMode ? 'lite-mode' : 'full-mode',
    backdropClass: shouldUseLiteMode ? 'bg-black/90' : 'backdrop-blur-xl bg-black/50',
    shadowClass: shouldUseLiteMode ? 'shadow-lg' : 'shadow-2xl',
    transformClass: shouldUseLiteMode ? '' : 'transform-gpu',
    animationClass: shouldUseLiteMode ? 'transition-none' : 'transition-all duration-300',
  }), [shouldUseLiteMode]);
}

export default useMobileOptimization;
