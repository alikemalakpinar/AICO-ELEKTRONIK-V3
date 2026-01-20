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
 * This reduces the Framer Motion bundle size by only loading
 * the animation features when they are first used.
 *
 * Features:
 * - 'dom': Basic animations (opacity, scale, transform) - lighter bundle
 * - 'domMax': Full features including layout animations - heavier but complete
 *
 * Note: We don't use 'strict' mode to allow gradual migration from
 * `motion` to `m` components. Both work, but `m` provides better tree shaking.
 *
 * For new components, prefer using `m` from framer-motion:
 * ```tsx
 * import { m } from 'framer-motion';
 * <m.div animate={{ opacity: 1 }}>Content</m.div>
 * ```
 */
export function MotionProvider({ children, features = 'dom' }: MotionProviderProps) {
  return (
    <LazyMotion features={features === 'domMax' ? domMax : domAnimation}>
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
    <LazyMotion features={domMax}>
      {children}
    </LazyMotion>
  );
}

export default MotionProvider;
