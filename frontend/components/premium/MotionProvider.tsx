'use client';

import { LazyMotion, domAnimation, domMax } from 'framer-motion';
import React from 'react';

interface MotionProviderProps {
  children: React.ReactNode;
  features?: 'dom' | 'domMax';
}

/**
 * LazyMotion Provider for optimized Framer Motion bundle
 *
 * This reduces the Framer Motion bundle size by ~30KB by only loading
 * the animation features that are actually needed.
 *
 * Features:
 * - 'dom': Basic animations (opacity, scale, transform) - ~15KB
 * - 'domMax': Full features including layout animations - ~25KB
 *
 * Usage:
 * Wrap your app or sections that use animations with this provider.
 * Use `m` components instead of `motion` for tree-shaking benefits.
 *
 * Example:
 * ```tsx
 * import { m } from 'framer-motion';
 *
 * <m.div animate={{ opacity: 1 }}>Content</m.div>
 * ```
 */
export function MotionProvider({ children, features = 'dom' }: MotionProviderProps) {
  return (
    <LazyMotion features={features === 'domMax' ? domMax : domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/**
 * LazyMotion Provider with full features
 * Use this when you need layout animations or drag functionality
 */
export function MotionProviderFull({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}

export default MotionProvider;
