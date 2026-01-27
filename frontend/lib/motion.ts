/**
 * Shared Motion Configuration
 * Apple-inspired animation constants for consistent UI feel
 */

// ===========================================
// Spring Configurations
// ===========================================

/**
 * Apple-style spring - smooth and elegant
 * Used for primary UI interactions (buttons, modals, cards)
 */
export const appleSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Snappy spring - faster response
 * Used for quick micro-interactions (toggles, checkboxes)
 */
export const snappySpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
};

/**
 * Soft spring - gentle and fluid
 * Used for larger elements (page transitions, overlays)
 */
export const softSpring = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 30,
  mass: 1.2,
};

/**
 * Bouncy spring - playful with overshoot
 * Used sparingly for emphasis (notifications, celebrations)
 */
export const bouncySpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 15,
  mass: 1,
};

// ===========================================
// Easing Functions
// ===========================================

/**
 * Apple's default cubic bezier
 */
export const appleEase = [0.25, 0.1, 0.25, 1.0];

/**
 * Apple's ease-out for exits
 */
export const appleEaseOut = [0.22, 1, 0.36, 1];

/**
 * Apple's ease-in for entrances
 */
export const appleEaseIn = [0.4, 0, 1, 1];

// ===========================================
// Duration Presets
// ===========================================

export const durations = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
};

// ===========================================
// Common Animation Variants
// ===========================================

/**
 * Fade in/out with scale
 */
export const fadeScaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: appleSpring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: durations.fast },
  },
};

/**
 * Slide up fade
 */
export const slideUpFadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: appleSpring,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: durations.fast },
  },
};

/**
 * Stagger children animation
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: appleSpring,
  },
};

// ===========================================
// Hover/Tap Presets
// ===========================================

export const hoverScale = {
  scale: 1.02,
  transition: appleSpring,
};

export const tapScale = {
  scale: 0.98,
  transition: snappySpring,
};

export const hoverLift = {
  y: -2,
  transition: appleSpring,
};

// ===========================================
// Reduced Motion Support
// ===========================================

/**
 * Get animation config that respects reduced motion
 * Returns instant transitions if reduced motion is preferred
 */
export function getReducedMotionConfig(config: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return {
        ...config,
        transition: { duration: 0 },
      };
    }
  }
  return config;
}

// ===========================================
// Scroll-Based Animation Helpers
// ===========================================

/**
 * Calculate opacity based on scroll progress
 * Fades out element as it leaves viewport
 */
export function getScrollFadeOpacity(
  scrollProgress: number,
  fadeStart: number = 0.7,
  minOpacity: number = 0.4
): number {
  if (scrollProgress < fadeStart) return 1;
  const fadeProgress = (scrollProgress - fadeStart) / (1 - fadeStart);
  return Math.max(minOpacity, 1 - fadeProgress * (1 - minOpacity));
}

/**
 * Calculate parallax offset based on scroll
 */
export function getParallaxOffset(
  scrollProgress: number,
  strength: number = 50
): number {
  return scrollProgress * strength;
}
