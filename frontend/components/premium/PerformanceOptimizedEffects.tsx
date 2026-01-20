'use client';

import { useEffect, useState, lazy, Suspense } from 'react';

// Lazy load heavy components
const NoiseOverlay = lazy(() => import('./NoiseOverlay'));
const CustomCursor = lazy(() => import('./CustomCursor'));

/**
 * PerformanceOptimizedEffects - Smart wrapper for cinematic effects
 *
 * Features:
 * - Respects prefers-reduced-motion user preference
 * - Disables effects on mobile devices
 * - Lazy loads components to reduce initial bundle
 * - Can be disabled per-page via props
 */

interface PerformanceOptimizedEffectsProps {
  enableNoise?: boolean;
  enableCursor?: boolean;
}

export default function PerformanceOptimizedEffects({
  enableNoise = true,
  enableCursor = true,
}: PerformanceOptimizedEffectsProps) {
  const [shouldRenderEffects, setShouldRenderEffects] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Check for mobile/touch devices
    const checkMobile = () => {
      const hasTouchScreen =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouchScreen || isSmallScreen);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check for low power mode (battery saver)
    // @ts-ignore - Navigator.getBattery is not in TypeScript types
    if ('getBattery' in navigator) {
      // @ts-ignore
      navigator.getBattery().then((battery: any) => {
        const checkBattery = () => {
          // Consider low power if battery < 20% or charging is needed
          setIsLowPowerMode(battery.level < 0.2 && !battery.charging);
        };
        checkBattery();
        battery.addEventListener('levelchange', checkBattery);
        battery.addEventListener('chargingchange', checkBattery);
      });
    }

    // Delay rendering to prioritize critical content
    const timer = setTimeout(() => {
      setShouldRenderEffects(true);
    }, 1000); // 1 second delay

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Skip effects if user prefers reduced motion or device conditions
  if (!shouldRenderEffects || prefersReducedMotion || isLowPowerMode) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      {/* Noise overlay - disabled on mobile for performance */}
      {enableNoise && !isMobile && <NoiseOverlay />}

      {/* Custom cursor - already has mobile detection built-in */}
      {enableCursor && !isMobile && <CustomCursor />}
    </Suspense>
  );
}

/**
 * Hook for components to check if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for checking if device is mobile/touch
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(hasTouchScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
