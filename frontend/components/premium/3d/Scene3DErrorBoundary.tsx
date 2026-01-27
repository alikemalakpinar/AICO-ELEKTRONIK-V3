'use client';

import React, { Component, ErrorInfo, ReactNode, Suspense } from 'react';

/**
 * Scene3DErrorBoundary - Specialized error boundary for React Three Fiber scenes
 *
 * This boundary catches errors from 3D components (Canvas, loaders, shaders, etc.)
 * and provides graceful fallback to ensure the page never crashes.
 *
 * Key features:
 * - Catches WebGL context errors
 * - Catches asset loading failures (HDR, textures, models)
 * - Catches shader compilation errors
 * - Provides visual fallback instead of crashing
 * - Logs errors for debugging without breaking the app
 */

interface Scene3DErrorBoundaryProps {
  children: ReactNode;
  /** Fallback UI when 3D fails */
  fallback?: ReactNode;
  /** Optional callback when error occurs */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Scene name for logging */
  sceneName?: string;
  /** Custom fallback component class name */
  className?: string;
}

interface Scene3DErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Default fallback UI for failed 3D scenes
 */
function Default3DFallback({ className = '', sceneName }: { className?: string; sceneName?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-br from-onyx-900/80 to-onyx-800/80 ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background as fallback visual */}
        <div className="absolute inset-0 bg-gradient-radial from-engineer-500/10 via-transparent to-transparent animate-pulse" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center px-4">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-engineer-500/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-engineer-500/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
        </div>
        <div className="text-sm text-offwhite-600 font-medium">
          3D visualization
        </div>
        {sceneName && (
          <div className="text-xs text-muted-foreground/60">
            {sceneName}
          </div>
        )}
      </div>
    </div>
  );
}

class Scene3DErrorBoundary extends Component<Scene3DErrorBoundaryProps, Scene3DErrorBoundaryState> {
  constructor(props: Scene3DErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Scene3DErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log 3D-specific errors for debugging
    const sceneName = this.props.sceneName || 'Unknown 3D Scene';

    // Check for common 3D error types
    const errorType = this.categorizeError(error);

    console.warn(`[Scene3DErrorBoundary] ${sceneName} - ${errorType}:`, {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  private categorizeError(error: Error): string {
    const message = error.message.toLowerCase();

    if (message.includes('webgl') || message.includes('context')) {
      return 'WebGL Context Error';
    }
    if (message.includes('hdr') || message.includes('rgbe') || message.includes('environment')) {
      return 'HDR/Environment Loading Error';
    }
    if (message.includes('texture') || message.includes('image')) {
      return 'Texture Loading Error';
    }
    if (message.includes('shader') || message.includes('glsl')) {
      return 'Shader Compilation Error';
    }
    if (message.includes('gltf') || message.includes('model') || message.includes('draco')) {
      return 'Model Loading Error';
    }
    if (message.includes('csp') || message.includes('security') || message.includes('connect-src')) {
      return 'CSP/Security Error';
    }
    if (message.includes('network') || message.includes('fetch') || message.includes('load')) {
      return 'Network/Loading Error';
    }

    return 'Unknown 3D Error';
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback
      return (
        <Default3DFallback
          className={this.props.className || 'min-h-[300px]'}
          sceneName={this.props.sceneName}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * withScene3DErrorBoundary - HOC wrapper for 3D components
 */
export function withScene3DErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: {
    sceneName?: string;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
  }
) {
  return function WithErrorBoundary(props: P) {
    return (
      <Scene3DErrorBoundary
        sceneName={options?.sceneName}
        fallback={options?.fallback}
        onError={options?.onError}
      >
        <WrappedComponent {...props} />
      </Scene3DErrorBoundary>
    );
  };
}

/**
 * Safe3DCanvas - Wrapper that combines Suspense and ErrorBoundary
 * Use this to wrap any 3D content for maximum safety
 */
export function Safe3DWrapper({
  children,
  fallback,
  sceneName,
  className = '',
  onError,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  sceneName?: string;
  className?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}) {
  return (
    <Scene3DErrorBoundary
      fallback={fallback}
      sceneName={sceneName}
      className={className}
      onError={onError}
    >
      <Suspense
        fallback={
          <div className={`relative flex items-center justify-center bg-onyx-900/50 ${className}`}>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-2 border-engineer-500/30 rounded-lg motion-safe:animate-pulse" />
                <div
                  className="absolute inset-2 border border-engineer-500/50 rounded-md motion-safe:animate-ping"
                  style={{ animationDuration: '1.5s' }}
                />
                <div className="absolute inset-4 bg-engineer-500/20 rounded-sm motion-safe:animate-pulse" />
              </div>
              <div className="text-xs text-muted-foreground font-mono motion-safe:animate-pulse">
                Loading 3D...
              </div>
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
    </Scene3DErrorBoundary>
  );
}

export default Scene3DErrorBoundary;
export { Default3DFallback };
