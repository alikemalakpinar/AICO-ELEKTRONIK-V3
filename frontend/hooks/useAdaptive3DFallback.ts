'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEcoMode } from './useEcoMode';
import { useMobileOptimization } from './useMobileOptimization';

export type Adaptive3DFallbackReason =
  | 'low-battery'
  | 'low-end-device'
  | 'eco-mode'
  | 'webgl-unavailable'
  | 'webgl-context-lost'
  | null;

interface Adaptive3DFallbackOptions {
  lowBatteryThreshold?: number;
  allowEcoModeFallback?: boolean;
  allowLowEndDeviceFallback?: boolean;
}

interface Adaptive3DFallbackState {
  shouldFallback: boolean;
  reason: Adaptive3DFallbackReason;
  isCriticalBattery: boolean;
  isLowEndDevice: boolean;
  isWebGLUnavailable: boolean;
  hasContextLoss: boolean;
  attachToCanvas: (canvas: HTMLCanvasElement | null) => void;
}

/**
 * Tracks runtime signals that should switch heavy 3D scenes to premium fallback UI.
 * - Critical battery (configurable threshold, default 10%)
 * - Low-end device lite-mode detection
 * - Context loss on WebGL canvas
 * - Optional eco-mode fallback for reduced motion users
 */
export function useAdaptive3DFallback(
  options: Adaptive3DFallbackOptions = {}
): Adaptive3DFallbackState {
  const {
    lowBatteryThreshold = 10,
    allowEcoModeFallback = true,
    allowLowEndDeviceFallback = true,
  } = options;
  const { batteryLevel, isCharging, isEcoMode, prefersReducedMotion } = useEcoMode();
  const { isLowEndDevice, shouldUseLiteMode } = useMobileOptimization();

  const [hasContextLoss, setHasContextLoss] = useState(false);
  const [isWebGLUnavailable, setIsWebGLUnavailable] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleContextLost = useCallback((event: Event) => {
    event.preventDefault();
    setHasContextLoss(true);
  }, []);

  const handleContextRestored = useCallback(() => {
    // Keep rendering disabled after context restore to avoid blank or unstable frame loops.
    setHasContextLoss(true);
  }, []);

  const attachToCanvas = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvasRef.current === canvas) return;

      if (canvasRef.current) {
        canvasRef.current.removeEventListener('webglcontextlost', handleContextLost as EventListener);
        canvasRef.current.removeEventListener('webglcontextrestored', handleContextRestored);
      }

      canvasRef.current = canvas;

      if (canvasRef.current) {
        canvasRef.current.addEventListener('webglcontextlost', handleContextLost as EventListener, {
          passive: false,
        });
        canvasRef.current.addEventListener('webglcontextrestored', handleContextRestored);
      }
    },
    [handleContextLost, handleContextRestored]
  );

  useEffect(() => {
    return () => attachToCanvas(null);
  }, [attachToCanvas]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const probeCanvas = document.createElement('canvas');
    const hasWebGLContext =
      !!probeCanvas.getContext('webgl2') ||
      !!probeCanvas.getContext('webgl') ||
      !!probeCanvas.getContext('experimental-webgl');
    setIsWebGLUnavailable(!hasWebGLContext);
  }, []);

  const isCriticalBattery =
    batteryLevel !== null && batteryLevel <= lowBatteryThreshold && !isCharging;
  const shouldUseEcoFallback = allowEcoModeFallback && isEcoMode && prefersReducedMotion;
  const shouldUseLowEndFallback = allowLowEndDeviceFallback && isLowEndDevice && shouldUseLiteMode;

  const reason = useMemo<Adaptive3DFallbackReason>(() => {
    if (isWebGLUnavailable) return 'webgl-unavailable';
    if (hasContextLoss) return 'webgl-context-lost';
    if (isCriticalBattery) return 'low-battery';
    if (shouldUseLowEndFallback) return 'low-end-device';
    if (shouldUseEcoFallback) return 'eco-mode';
    return null;
  }, [hasContextLoss, isCriticalBattery, isWebGLUnavailable, shouldUseEcoFallback, shouldUseLowEndFallback]);

  return {
    shouldFallback: reason !== null,
    reason,
    isCriticalBattery,
    isLowEndDevice,
    isWebGLUnavailable,
    hasContextLoss,
    attachToCanvas,
  };
}
