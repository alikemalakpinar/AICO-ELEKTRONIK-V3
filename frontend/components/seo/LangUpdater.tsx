'use client';

import { useEffect } from 'react';
import { Locale } from '@/lib/i18n';

interface LangUpdaterProps {
  lang: Locale;
}

/**
 * LangUpdater - Updates the HTML lang attribute based on the current locale
 * This ensures proper SEO and accessibility for i18n routes
 */
export default function LangUpdater({ lang }: LangUpdaterProps) {
  useEffect(() => {
    // Update the html lang attribute
    document.documentElement.lang = lang;
  }, [lang]);

  // This component doesn't render anything
  return null;
}
