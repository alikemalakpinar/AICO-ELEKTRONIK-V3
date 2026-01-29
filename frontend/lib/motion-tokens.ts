/**
 * Motion Tokens — Engineering-Grade Animation System
 * Centralized Framer Motion configurations for AICO v3.2
 *
 * Three tiers: Apple (standard UI), Heavy (industrial weight), Magnetic (cursor-following)
 */

// ===========================================
// Spring Configurations — Tiered System
// ===========================================

/** Apple-style spring — smooth, elegant, standard UI */
export const appleSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/** Heavy spring — industrial machinery weight, slow settle */
export const heavySpring = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 40,
  mass: 2.5,
};

/** Magnetic spring — cursor-following, responsive pull */
export const magneticSpring = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 18,
  mass: 0.6,
};

/** Snappy spring — micro-interactions (toggles, checkboxes) */
export const snappySpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
};

/** Soft spring — large element transitions (overlays, modals) */
export const softSpring = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 30,
  mass: 1.2,
};

/** Bouncy spring — emphasis only (notifications) */
export const bouncySpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 15,
  mass: 1,
};

// ===========================================
// Industrial Easing — cubic-bezier tokens
// ===========================================

/** Standard industrial easing — weighted, premium feel */
export const industrialEase = [0.4, 0, 0.2, 1] as const;

/** Apple default easing */
export const appleEase = [0.25, 0.1, 0.25, 1.0] as const;

/** Exit easing — decelerate out */
export const exitEase = [0.22, 1, 0.36, 1] as const;

/** Enter easing — accelerate in */
export const enterEase = [0.4, 0, 1, 1] as const;

// ===========================================
// Duration Presets — Industrial weighted
// ===========================================

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  heavy: 0.8,
  cinematic: 1.2,
} as const;

// ===========================================
// Haptic Button Presets
// ===========================================

/** Haptic hover — scale 1.0 → 0.98 → 1.0 spring bounce */
export const hapticHover = {
  scale: [1, 0.98, 1.0],
  transition: {
    duration: 0.3,
    ease: industrialEase,
  },
};

/** Haptic tap — quick press feedback */
export const hapticTap = {
  scale: 0.97,
  transition: snappySpring,
};

/** Industrial hover — subtle lift with glow */
export const industrialHover = {
  y: -1,
  transition: heavySpring,
};

// ===========================================
// Stagger Presets
// ===========================================

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: appleSpring,
  },
};

// ===========================================
// Page Transition Presets
// ===========================================

export const pageEnter = {
  initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
  transition: { duration: durations.normal, ease: industrialEase },
};

export const bootSequence = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.15, ease: 'easeOut' },
};
