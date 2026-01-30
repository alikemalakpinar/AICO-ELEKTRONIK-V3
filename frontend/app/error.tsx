'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AlertTriangle, RefreshCw, Home, ChevronRight } from 'lucide-react';
import { getTranslations, type Locale } from '@/lib/i18n';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Page (App Router)
 *
 * This error boundary catches errors in the app directory
 * and displays a premium-styled, locale-aware error page.
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  const pathname = usePathname();
  // Detect locale from current URL path
  const lang: Locale = pathname?.startsWith('/en') ? 'en' : 'tr';
  const t = getTranslations(lang);

  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Error Card */}
        <div className="relative bg-onyx-800/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          {/* Accent glow */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground text-center mb-2">
            {t.common.error}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-center mb-6">
            {t.common.errorDescription}
          </p>

          {/* Error digest for debugging */}
          {error.digest && (
            <div className="mb-6 p-3 bg-onyx-900/50 rounded-lg border border-white/5">
              <p className="text-xs font-mono text-muted-foreground text-center">
                {t.common.errorCode}: {error.digest}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-colors"
            >
              <RefreshCw size={18} />
              <span>{t.common.tryAgain}</span>
            </button>
            <a
              href={`/${lang}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground font-medium rounded-xl border border-white/10 transition-colors"
            >
              <Home size={18} />
              <span>{t.common.homePage}</span>
            </a>
          </div>

          {/* Support Link */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <a
              href={`/${lang}/contact`}
              className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-engineer-500 transition-colors"
            >
              <span>{t.common.supportLink}</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
