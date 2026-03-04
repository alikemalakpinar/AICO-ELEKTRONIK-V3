'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { revealUp } from '@/lib/motion';
import { DESIGN_SYSTEM } from '@/lib/design-system';

type AccentTone = 'engineer' | 'violet';

interface SectionHeaderProps {
  eyebrow: string;
  code?: string;
  title: string;
  highlight?: string;
  description: string;
  accent?: AccentTone;
  className?: string;
}

const toneStyles: Record<AccentTone, { text: string; line: string }> = {
  engineer: {
    text: 'text-engineer-500',
    line: 'bg-engineer-500/50',
  },
  violet: {
    text: 'text-fuchsia-400',
    line: 'bg-fuchsia-400/50',
  },
};

export default function SectionHeader({
  eyebrow,
  code,
  title,
  highlight,
  description,
  accent = 'engineer',
  className,
}: SectionHeaderProps) {
  const tone = toneStyles[accent];

  return (
    <motion.div {...revealUp(0)} className={cn('text-center mb-16', className)}>
      <span className={cn('inline-flex items-center gap-3 mb-6', tone.text)}>
        <span className={cn('w-12 h-px', tone.line)} />
        <span className="mono-overline">{eyebrow}</span>
        {code && <span className="mono-badge text-offwhite-800">{code}</span>}
        <span className={cn('w-12 h-px', tone.line)} />
      </span>

      <h2 className={DESIGN_SYSTEM.typography.sectionTitle}>
        {title}
        {highlight ? (
          <>
            {' '}
            <span className={tone.text}>{highlight}</span>
          </>
        ) : null}
      </h2>

      <p className={DESIGN_SYSTEM.typography.sectionBody}>{description}</p>
    </motion.div>
  );
}

