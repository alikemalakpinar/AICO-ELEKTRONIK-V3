/**
 * Shared design tokens for layout rhythm, typography, and product accents.
 * Keep these values centralized to avoid style drift across pages.
 */

export const DESIGN_SYSTEM = {
  layout: {
    section: 'section-shell',
    sectionCompact: 'section-shell-compact',
    shell: 'content-shell',
    shellNarrow: 'content-shell-narrow',
  },
  typography: {
    sectionTitle: 'text-fluid-4xl font-bold text-offwhite-400 mb-6 heading-flex',
    sectionBody: 'section-copy copy-flex',
  },
  motion: {
    cardStagger: 0.1,
    statStagger: 0.08,
  },
} as const;

export const PRODUCT_ACCENTS = {
  fireSafety: {
    color: '#FF4500',
    gradient: 'from-orange-500/20 to-transparent',
  },
  predictiveMaintenance: {
    color: '#00D4FF',
    gradient: 'from-cyan-500/20 to-transparent',
  },
  coldChain: {
    color: '#06B6D4',
    gradient: 'from-teal-500/20 to-transparent',
  },
  miningIot: {
    color: '#EAB308',
    gradient: 'from-yellow-500/20 to-transparent',
  },
} as const;
