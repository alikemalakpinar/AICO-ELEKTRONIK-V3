'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronRight } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Page (App Router)
 *
 * This error boundary catches errors in the app directory
 * and displays a premium-styled error page.
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console
    console.error('Global error:', error);

    // In production, send to error tracking service
    // Example: Sentry.captureException(error);
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
            Bir hata olustu
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-center mb-6">
            Beklenmedik bir hata meydana geldi. Lutfen sayfayi yenileyin veya
            ana sayfaya donun.
          </p>

          {/* Error digest for debugging */}
          {error.digest && (
            <div className="mb-6 p-3 bg-onyx-900/50 rounded-lg border border-white/5">
              <p className="text-xs font-mono text-muted-foreground text-center">
                Hata Kodu: {error.digest}
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
              <span>Tekrar Dene</span>
            </button>
            <a
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground font-medium rounded-xl border border-white/10 transition-colors"
            >
              <Home size={18} />
              <span>Ana Sayfa</span>
            </a>
          </div>

          {/* Support Link */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <a
              href="/contact"
              className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-engineer-500 transition-colors"
            >
              <span>Sorun devam ederse bize ulasin</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
