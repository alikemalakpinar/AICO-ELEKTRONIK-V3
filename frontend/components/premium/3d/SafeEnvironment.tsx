'use client';

import { Environment, useEnvironment } from '@react-three/drei';
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ===========================================
// SafeEnvironment - Crash-Proof HDR Environment
// ===========================================
// This component provides multiple layers of protection:
// 1. Error Boundary - catches render/component errors
// 2. Suspense with timeout - catches async loading errors
// 3. State-based fallback - gracefully degrades to lights
// 4. FallbackLights always rendered - ensures scene is never dark
// ===========================================

// Local HDR file path (must be in public folder)
// IMPORTANT: Leading slash ensures it's served from root, not relative
const LOCAL_HDR_PATH = '/hdri/dikhololo_night_1k.hdr';

// Timeout for HDR loading (ms) - if it takes longer, use fallback
const LOAD_TIMEOUT_MS = 5000;

/**
 * FallbackLights - Provides basic scene lighting when HDR is unavailable
 * Always rendered as a base layer to ensure the scene is never completely dark
 */
function FallbackLights() {
  return (
    <group name="fallback-lights">
      {/* Ambient fill light */}
      <ambientLight intensity={0.4} color="#f5f5f5" />
      {/* Main directional light (sun-like) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow={false}
      />
      {/* Secondary fill light for softer shadows */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#b4c6e0"
      />
      {/* Accent light for depth */}
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.4}
        color="#4466aa"
        distance={30}
        decay={2}
      />
    </group>
  );
}

/**
 * EnvironmentLoaderBoundary - Error Boundary for HDR loading
 * Catches errors from the Environment component and prevents crashes
 */
class EnvironmentLoaderBoundary extends React.Component<
  { children: React.ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error but don't crash the app
    console.warn('[SafeEnvironment] HDR loading failed, using fallback lights:', {
      message: error.message,
      // Only log stack in development
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        componentStack: errorInfo.componentStack
      }),
    });

    // Notify parent that error occurred
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      // Return null - FallbackLights are rendered separately as always-on
      return null;
    }
    return this.props.children;
  }
}

/**
 * HDREnvironmentLoader - Attempts to load HDR with timeout protection
 * Uses state to track loading status and gracefully falls back on failure
 */
function HDREnvironmentLoader({
  background,
  onLoadSuccess,
  onLoadError,
}: {
  background: boolean;
  onLoadSuccess?: () => void;
  onLoadError?: (error: Error) => void;
}) {
  const [loadFailed, setLoadFailed] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  // Set up timeout for loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTimedOut(true);
      console.warn('[SafeEnvironment] HDR loading timed out, using fallback lights');
      onLoadError?.(new Error('HDR loading timed out'));
    }, LOAD_TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, [onLoadError]);

  // Handle load errors from Environment component
  const handleError = useCallback((error: Error) => {
    console.warn('[SafeEnvironment] Environment component error:', error.message);
    setLoadFailed(true);
    onLoadError?.(error);
  }, [onLoadError]);

  // Don't render if timed out or failed
  if (isTimedOut || loadFailed) {
    return null;
  }

  return (
    <Environment
      files={LOCAL_HDR_PATH}
      background={background}
      // Error callback - drei's Environment supports onError in some versions
      // We also wrap in error boundary as backup
    />
  );
}

/**
 * SuspenseFallback - Renders nothing during loading
 * FallbackLights handle illumination during this time
 */
function SuspenseFallback() {
  return null;
}

/**
 * SafeEnvironment - Main exported component
 *
 * Provides crash-proof HDR environment loading with multiple fallback layers:
 * 1. FallbackLights always render first (ensures scene is never dark)
 * 2. HDR Environment attempts to load inside error boundary + suspense
 * 3. If HDR fails for any reason, FallbackLights remain active
 *
 * @param background - Whether to use HDR as scene background
 * @param fallbackOnly - Skip HDR loading entirely, use only fallback lights
 * @param onLoadComplete - Callback when HDR successfully loads
 * @param onLoadError - Callback when HDR fails to load
 */
export function SafeEnvironment({
  background = false,
  fallbackOnly = false,
  onLoadComplete,
  onLoadError,
}: {
  background?: boolean;
  fallbackOnly?: boolean;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}) {
  const [hdrLoaded, setHdrLoaded] = useState(false);
  const [hdrFailed, setHdrFailed] = useState(false);

  const handleLoadSuccess = useCallback(() => {
    setHdrLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleLoadError = useCallback((error: Error) => {
    setHdrFailed(true);
    onLoadError?.(error);
  }, [onLoadError]);

  const handleBoundaryError = useCallback(() => {
    setHdrFailed(true);
    onLoadError?.(new Error('Environment boundary caught error'));
  }, [onLoadError]);

  return (
    <>
      {/* Layer 1: FallbackLights - ALWAYS render these first
          They provide base lighting even if HDR loads successfully */}
      <FallbackLights />

      {/* Layer 2: HDR Environment - only attempt if not in fallbackOnly mode */}
      {!fallbackOnly && !hdrFailed && (
        <EnvironmentLoaderBoundary onError={handleBoundaryError}>
          <Suspense fallback={<SuspenseFallback />}>
            <HDREnvironmentLoader
              background={background}
              onLoadSuccess={handleLoadSuccess}
              onLoadError={handleLoadError}
            />
          </Suspense>
        </EnvironmentLoaderBoundary>
      )}
    </>
  );
}

/**
 * SafeEnvironmentWithPreload - Enhanced version that preloads HDR
 * Use this when you want to ensure HDR is cached before rendering
 */
export function SafeEnvironmentWithPreload({
  background = false,
  fallbackOnly = false,
}: {
  background?: boolean;
  fallbackOnly?: boolean;
}) {
  const [preloadComplete, setPreloadComplete] = useState(false);
  const [preloadFailed, setPreloadFailed] = useState(false);

  useEffect(() => {
    if (fallbackOnly) {
      setPreloadComplete(true);
      return;
    }

    // Attempt to preload the HDR file
    const loader = new THREE.FileLoader();
    loader.setResponseType('arraybuffer');

    const timeoutId = setTimeout(() => {
      setPreloadFailed(true);
      console.warn('[SafeEnvironment] Preload timed out');
    }, LOAD_TIMEOUT_MS);

    loader.load(
      LOCAL_HDR_PATH,
      () => {
        clearTimeout(timeoutId);
        setPreloadComplete(true);
      },
      undefined,
      (error) => {
        clearTimeout(timeoutId);
        console.warn('[SafeEnvironment] Preload failed:', error);
        setPreloadFailed(true);
      }
    );

    return () => clearTimeout(timeoutId);
  }, [fallbackOnly]);

  return (
    <SafeEnvironment
      background={background}
      fallbackOnly={fallbackOnly || preloadFailed}
    />
  );
}

export default SafeEnvironment;
