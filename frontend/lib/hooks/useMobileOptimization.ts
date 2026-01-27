'use client';

import { useState, useEffect, useMemo } from 'react';

interface MobileOptimizationConfig {
  /** Max device pixel ratio (1-2) */
  maxDpr: number;
  /** Enable shadows */
  shadows: boolean;
  /** Particle count multiplier (0-1) */
  particleMultiplier: number;
  /** Enable post-processing effects */
  postProcessing: boolean;
  /** Enable high quality materials (transmission, etc.) */
  highQualityMaterials: boolean;
  /** Antialiasing enabled */
  antialias: boolean;
  /** User prefers reduced motion */
  reducedMotion: boolean;
  /** Is mobile device */
  isMobile: boolean;
  /** Is low-end device (based on hardware concurrency) */
  isLowEnd: boolean;
}

const DEFAULT_CONFIG: MobileOptimizationConfig = {
  maxDpr: 2,
  shadows: true,
  particleMultiplier: 1,
  postProcessing: true,
  highQualityMaterials: true,
  antialias: true,
  reducedMotion: false,
  isMobile: false,
  isLowEnd: false,
};

const MOBILE_CONFIG: MobileOptimizationConfig = {
  maxDpr: 1.5,
  shadows: false,
  particleMultiplier: 0.5,
  postProcessing: false,
  highQualityMaterials: false,
  antialias: false,
  reducedMotion: false,
  isMobile: true,
  isLowEnd: false,
};

const LOW_END_CONFIG: MobileOptimizationConfig = {
  maxDpr: 1,
  shadows: false,
  particleMultiplier: 0.25,
  postProcessing: false,
  highQualityMaterials: false,
  antialias: false,
  reducedMotion: false,
  isMobile: true,
  isLowEnd: true,
};

/**
 * Hook for mobile-optimized 3D rendering settings
 * Automatically detects device capabilities and adjusts quality
 */
export function useMobileOptimization(): MobileOptimizationConfig {
  const [config, setConfig] = useState<MobileOptimizationConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect mobile via touch capability and screen size
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    const isMobile = isTouchDevice && isSmallScreen;

    // Detect low-end device
    // Use hardware concurrency as a proxy for device capability
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowEnd = hardwareConcurrency <= 4 || (isMobile && hardwareConcurrency <= 6);

    // Check for WebGL capabilities
    let webglTier = 2; // Assume high-end by default
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        webglTier = 0;
      } else {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
          // Detect low-end GPUs
          if (
            renderer.includes('intel') ||
            renderer.includes('mali-4') ||
            renderer.includes('adreno 3') ||
            renderer.includes('powervr')
          ) {
            webglTier = 1;
          }
        }
      }
    } catch {
      // WebGL detection failed, assume mid-tier
      webglTier = 1;
    }

    // Determine config based on device capabilities
    let newConfig: MobileOptimizationConfig;

    if (webglTier === 0 || isLowEnd) {
      newConfig = { ...LOW_END_CONFIG, reducedMotion: prefersReducedMotion };
    } else if (isMobile || webglTier === 1) {
      newConfig = { ...MOBILE_CONFIG, reducedMotion: prefersReducedMotion };
    } else {
      newConfig = { ...DEFAULT_CONFIG, reducedMotion: prefersReducedMotion };
    }

    setConfig(newConfig);

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({ ...prev, reducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return config;
}

/**
 * Hook for computing particle count based on device capabilities
 */
export function useOptimizedParticleCount(baseCount: number): number {
  const { particleMultiplier, reducedMotion } = useMobileOptimization();

  return useMemo(() => {
    if (reducedMotion) return 0;
    return Math.floor(baseCount * particleMultiplier);
  }, [baseCount, particleMultiplier, reducedMotion]);
}

/**
 * Get Canvas props optimized for the current device
 */
export function useOptimizedCanvasProps() {
  const config = useMobileOptimization();

  return useMemo(() => ({
    dpr: [1, config.maxDpr] as [number, number],
    gl: {
      antialias: config.antialias,
      alpha: true,
      powerPreference: config.isLowEnd ? 'low-power' : 'high-performance' as WebGLPowerPreference,
      failIfMajorPerformanceCaveat: false,
    },
    shadows: config.shadows,
    frameloop: config.reducedMotion ? 'demand' : 'always' as 'demand' | 'always',
  }), [config]);
}
