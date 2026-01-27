'use client';

import { Environment } from '@react-three/drei';
import React, { Suspense, useState, useEffect, useCallback } from 'react';

/**
 * SafeEnvironment - CSP-compliant, crash-proof environment lighting
 *
 * Architecture:
 * 1. ALWAYS renders fallback lights OUTSIDE any error boundary (scene is never pitch black)
 * 2. Attempts to load local HDR as enhancement inside error boundary
 * 3. If HDR fails (sync or async), error boundary catches and renders null
 * 4. NEVER uses drei presets (which fetch from raw.githack.com)
 *
 * Error Handling Strategy:
 * - Class-based EnvironmentLoaderBoundary catches React render errors
 * - Inner HDRLoader component catches async loader errors via state
 * - Both mechanisms render null on failure, allowing FallbackLights to illuminate scene
 */

// Local HDR file path - MUST be in public/hdri/
const LOCAL_HDR_PATH = '/hdri/dikhololo_night_1k.hdr';

/**
 * FallbackLights - Always-present lighting
 * Ensures scene is visible even if HDR fails or loads slowly
 * IMPORTANT: Rendered OUTSIDE error boundary so it's always available
 */
function FallbackLights() {
  return (
    <group name="fallback-lights">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4466aa" />
    </group>
  );
}

/**
 * EnvironmentLoaderBoundary - Internal Error Boundary for HDR Loader
 *
 * Catches errors from the Environment component during React render phase.
 * When an error is caught:
 * - Logs a warning (not an error) to console
 * - Renders null (not an error UI) so the scene continues
 * - FallbackLights outside this boundary keep the scene illuminated
 */
interface BoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

interface BoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error) => void;
}

class EnvironmentLoaderBoundary extends React.Component<BoundaryProps, BoundaryState> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error): BoundaryState {
    // Update state so next render shows nothing (fallback lights continue)
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log as warning - this is expected behavior when HDR fails, not a crash
    console.warn(
      '[SafeEnvironment] HDR loading failed, scene will use fallback lights:',
      error.message
    );

    // Optional callback for parent component monitoring
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      // Return null - DO NOT render error UI
      // FallbackLights outside this boundary will keep scene lit
      return null;
    }
    return this.props.children;
  }
}

/**
 * HDRLoader - Internal component that loads Environment with async error handling
 *
 * Catches async errors that bypass React error boundaries:
 * - Three.js loader failures
 * - Network errors
 * - File not found errors
 */
interface HDRLoaderProps {
  files: string;
  background: boolean;
}

function HDRLoader({ files, background }: HDRLoaderProps) {
  const [loadFailed, setLoadFailed] = useState(false);

  // Reset failure state if files prop changes
  useEffect(() => {
    setLoadFailed(false);
  }, [files]);

  // Global error handler for uncaught async loader errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if this error is related to HDR loading
      if (
        event.message?.includes('.hdr') ||
        event.message?.includes('Could not load') ||
        event.message?.includes('Load failed')
      ) {
        console.warn('[SafeEnvironment] Async HDR load error caught:', event.message);
        setLoadFailed(true);
        event.preventDefault(); // Prevent error from propagating
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || String(event.reason);
      if (
        reason?.includes('.hdr') ||
        reason?.includes('Could not load') ||
        reason?.includes('Load failed')
      ) {
        console.warn('[SafeEnvironment] Async HDR promise rejection caught:', reason);
        setLoadFailed(true);
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // If async load failed, render nothing
  if (loadFailed) {
    return null;
  }

  // Attempt to render Environment - sync errors will be caught by parent boundary
  return <Environment files={files} background={background} />;
}

/**
 * SafeEnvironment - Main component
 *
 * Usage:
 *   <SafeEnvironment />                    // HDR + fallback lights
 *   <SafeEnvironment background />         // HDR as background
 *   <SafeEnvironment fallbackOnly />       // Only fallback lights (skip HDR)
 *
 * Error Recovery:
 * - If HDR fails to load, scene continues with FallbackLights
 * - Never crashes the entire Canvas/scene
 * - Logs warnings (not errors) for debugging
 */
interface SafeEnvironmentProps {
  /** Whether to show HDR as background (default: false) */
  background?: boolean;
  /** Skip HDR loading, use only fallback lights */
  fallbackOnly?: boolean;
}

export function SafeEnvironment({
  background = false,
  fallbackOnly = false
}: SafeEnvironmentProps) {
  // Track if HDR loading failed (for potential future use/monitoring)
  const [hdrFailed, setHdrFailed] = useState(false);

  const handleBoundaryError = useCallback((error: Error) => {
    setHdrFailed(true);
  }, []);

  return (
    <>
      {/* CRITICAL: FallbackLights rendered OUTSIDE error boundary */}
      {/* This ensures scene is ALWAYS illuminated, even if HDR completely fails */}
      <FallbackLights />

      {/* HDR Environment as enhancement (not replacement for fallback lights) */}
      {/* Wrapped in error boundary + async error handling */}
      {!fallbackOnly && !hdrFailed && (
        <EnvironmentLoaderBoundary onError={handleBoundaryError}>
          <Suspense fallback={null}>
            <HDRLoader files={LOCAL_HDR_PATH} background={background} />
          </Suspense>
        </EnvironmentLoaderBoundary>
      )}
    </>
  );
}

// Named export for compatibility
export default SafeEnvironment;

// Re-export for convenience
export { FallbackLights, EnvironmentLoaderBoundary, LOCAL_HDR_PATH };
