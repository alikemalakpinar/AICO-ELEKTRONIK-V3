'use client';

import { ReactNode } from 'react';
import PageTransition from '@/components/premium/PageTransition';

/**
 * Template - Page Transition Wrapper
 *
 * In Next.js App Router, template.tsx re-renders on navigation,
 * making it perfect for page transitions.
 *
 * Unlike layout.tsx which persists, template.tsx unmounts/remounts
 * on every route change, triggering our transition animations.
 */

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return <PageTransition>{children}</PageTransition>;
}
