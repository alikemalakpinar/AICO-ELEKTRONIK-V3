'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Loading fallback component for 3D scenes
function Scene3DLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-onyx-900/50 ${className}`}>
      {/* Animated loading indicator */}
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing cube animation */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-engineer-500/30 rounded-lg animate-pulse" />
          <div
            className="absolute inset-2 border border-engineer-500/50 rounded-md animate-ping"
            style={{ animationDuration: '1.5s' }}
          />
          <div className="absolute inset-4 bg-engineer-500/20 rounded-sm animate-pulse" />
        </div>
        {/* Loading text */}
        <div className="text-xs text-muted-foreground font-mono animate-pulse">
          Loading 3D Scene...
        </div>
      </div>
    </div>
  );
}

// Lazy loaded 3D components with SSR disabled
// These components use WebGL/Three.js which requires browser APIs

export const LazyFloatingModules = dynamic(
  () => import('./FloatingModules').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Scene3DLoader className="min-h-[400px] rounded-xl" />,
  }
);

export const LazyHolographicGrid = dynamic(
  () => import('./HolographicGrid').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Scene3DLoader className="min-h-[300px]" />,
  }
);

export const LazyInteractiveWireframeHouse = dynamic(
  () => import('./InteractiveWireframeHouse').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Scene3DLoader className="min-h-[500px] rounded-2xl" />,
  }
);

export const LazyNetworkGlobe = dynamic(
  () => import('./NetworkGlobe').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Scene3DLoader className="min-h-[400px]" />,
  }
);

export const LazyResidenceScene = dynamic(
  () => import('./ResidenceScene').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Scene3DLoader className="min-h-[600px] rounded-2xl" />,
  }
);

export const LazyVillaScene = dynamic(
  () => import('./VillaScene').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Scene3DLoader className="min-h-[600px] rounded-2xl" />,
  }
);

// Viewport-aware lazy loading wrapper with Intersection Observer
interface LazyScene3DProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

export function LazyScene3D({
  children,
  className = '',
  rootMargin = '100px',
  threshold = 0.1,
}: LazyScene3DProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        <Suspense fallback={<Scene3DLoader className="min-h-full" />}>
          {children}
        </Suspense>
      ) : (
        <Scene3DLoader className="min-h-full" />
      )}
    </div>
  );
}

// Re-export the loader for custom use
export { Scene3DLoader };
