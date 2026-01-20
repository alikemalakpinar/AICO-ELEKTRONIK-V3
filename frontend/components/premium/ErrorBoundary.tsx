'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronRight } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Global Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 *
 * Features:
 * - Premium-styled error page matching AICO design system
 * - Error reporting capability
 * - Recovery options (retry, go home)
 * - Development mode stack trace display
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // In production, you might want to send to error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default premium error UI
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

              {/* Error details (development only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                  <p className="text-xs font-mono text-red-400 break-all">
                    {this.state.error.message}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                        Stack trace
                      </summary>
                      <pre className="mt-2 text-xs text-muted-foreground overflow-auto max-h-32 p-2 bg-black/20 rounded">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleRetry}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-colors"
                >
                  <RefreshCw size={18} />
                  <span>Tekrar Dene</span>
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground font-medium rounded-xl border border-white/10 transition-colors"
                >
                  <Home size={18} />
                  <span>Ana Sayfa</span>
                </button>
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

    return this.props.children;
  }
}

/**
 * Section Error Boundary
 * For wrapping individual sections that might fail
 * Shows a smaller, inline error message
 */
interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
}

interface SectionErrorState {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<SectionErrorBoundaryProps, SectionErrorState> {
  public state: SectionErrorState = { hasError: false };

  public static getDerivedStateFromError(): SectionErrorState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Section "${this.props.sectionName}" error:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-onyx-800/30 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 text-muted-foreground">
            <AlertTriangle size={20} className="text-yellow-500" />
            <span className="text-sm">
              Bu bolum yuklenirken bir hata olustu.
              {this.props.sectionName && ` (${this.props.sectionName})`}
            </span>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="ml-auto text-xs text-engineer-500 hover:underline"
            >
              Tekrar dene
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
