'use client';

import dynamic from 'next/dynamic';
import React, { Suspense, useState, useEffect, ComponentType } from 'react';
import Scene3DErrorBoundary from './Scene3DErrorBoundary';

// Hook to detect reduced motion preference
function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

// Premium loading fallback for 3D scenes - pulsing glow wireframe effect
function Scene3DLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full flex items-center justify-center bg-onyx-900/50 overflow-hidden ${className}`}>
      <div className="flex flex-col items-center gap-4">
        {/* Premium wireframe glow effect */}
        <div className="relative w-20 h-20">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-xl border border-engineer-500/20 motion-safe:animate-pulse"
            style={{ boxShadow: '0 0 20px rgba(249, 115, 22, 0.1), inset 0 0 20px rgba(249, 115, 22, 0.05)' }}
          />
          {/* Inner wireframe cube */}
          <div
            className="absolute inset-2 border border-engineer-500/40 rounded-lg motion-safe:animate-ping"
            style={{ animationDuration: '2s' }}
          />
          {/* Core glow */}
          <div
            className="absolute inset-4 rounded-md motion-safe:animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
            }}
          />
          {/* Wireframe 3D cube SVG */}
          <svg className="absolute inset-0 w-full h-full p-5 text-engineer-500/50 motion-safe:animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>
        {/* Loading text with glow */}
        <div
          className="text-xs text-engineer-500/70 font-mono motion-safe:animate-pulse tracking-wider"
          style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.3)' }}
        >
          {typeof window !== 'undefined' && window.location.pathname.startsWith('/en')
            ? 'Loading 3D Scene...'
            : '3D Sahne Yükleniyor...'}
        </div>
      </div>
    </div>
  );
}

// Static placeholder for reduced motion users
function Scene3DPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full flex items-center justify-center bg-gradient-to-br from-onyx-900/80 to-onyx-800/80 overflow-hidden ${className}`}>
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-lg border-2 border-engineer-500/40 flex items-center justify-center">
          <svg className="w-8 h-8 text-engineer-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          {typeof window !== 'undefined' && window.location.pathname.startsWith('/en')
            ? '3D visualization available'
            : '3D görselleştirme mevcut'}
        </div>
        <div className="text-[10px] text-muted-foreground/60">
          {typeof window !== 'undefined' && window.location.pathname.startsWith('/en')
            ? '(Reduced motion enabled)'
            : '(Azaltılmış hareket etkin)'}
        </div>
      </div>
    </div>
  );
}

// Lazy loaded 3D components with SSR disabled
// These components use WebGL/Three.js which requires browser APIs

/**
 * Creates a safe lazy-loaded 3D component wrapper with:
 * - Dynamic import with SSR disabled
 * - Loading fallback
 * - Error boundary for graceful degradation
 */
function createSafeLazy3D<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  sceneName: string,
  loaderClassName: string
) {
  const LazyComponent = dynamic(importFn, {
    ssr: false,
    loading: () => <Scene3DLoader className={loaderClassName} />,
  });

  // Return a wrapper that includes error boundary
  return function SafeLazy3DComponent(props: P) {
    return (
      <Scene3DErrorBoundary sceneName={sceneName} className={loaderClassName}>
        <LazyComponent {...props} />
      </Scene3DErrorBoundary>
    );
  };
}

export const LazyFloatingModules = createSafeLazy3D(
  () => import('./FloatingModules').then((mod) => ({ default: mod.default })),
  'FloatingModules',
  'min-h-[400px] rounded-xl'
);

export const LazyHolographicGrid = createSafeLazy3D(
  () => import('./HolographicGrid').then((mod) => ({ default: mod.default })),
  'HolographicGrid',
  'min-h-[300px]'
);

export const LazyInteractiveWireframeHouse = createSafeLazy3D(
  () => import('./InteractiveWireframeHouse').then((mod) => ({ default: mod.default })),
  'InteractiveWireframeHouse',
  'min-h-[500px] rounded-2xl'
);

export const LazyNetworkGlobe = createSafeLazy3D(
  () => import('./NetworkGlobe').then((mod) => ({ default: mod.default })),
  'NetworkGlobe',
  'min-h-[400px]'
);

export const LazyResidenceScene = createSafeLazy3D(
  () => import('./ResidenceScene').then((mod) => ({ default: mod.default })),
  'ResidenceScene',
  'min-h-[600px] rounded-2xl'
);

export const LazyVillaScene = createSafeLazy3D(
  () => import('./VillaScene').then((mod) => ({ default: mod.default })),
  'VillaScene',
  'min-h-[600px] rounded-2xl'
);

// Viewport-aware lazy loading wrapper with Intersection Observer
interface LazyScene3DProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  /** Show placeholder instead of 3D for reduced motion users */
  respectReducedMotion?: boolean;
}

export function LazyScene3D({
  children,
  className = '',
  rootMargin = '100px',
  threshold = 0.1,
  respectReducedMotion = true,
}: LazyScene3DProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred and we respect it, skip loading 3D
    if (respectReducedMotion && reducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, respectReducedMotion, reducedMotion]);

  // Show static placeholder for reduced motion users
  if (respectReducedMotion && reducedMotion) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <Scene3DPlaceholder className="absolute inset-0" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Scene3DErrorBoundary sceneName="LazyScene3D" className="absolute inset-0">
        {isVisible ? (
          <Suspense fallback={<Scene3DLoader className="absolute inset-0" />}>
            {children}
          </Suspense>
        ) : (
          <Scene3DLoader className="absolute inset-0" />
        )}
      </Scene3DErrorBoundary>
    </div>
  );
}

// Re-export components for custom use
export { Scene3DLoader, Scene3DPlaceholder };
