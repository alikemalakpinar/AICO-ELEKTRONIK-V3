'use client';

import React, { Suspense, useState, useEffect, Component, ReactNode, ErrorInfo } from 'react';
import { Environment } from '@react-three/drei';

/**
 * SafeEnvironment - CSP-compliant environment lighting for R3F
 *
 * This component loads HDR environment maps ONLY from local assets.
 * It NEVER uses drei presets (which fetch from raw.githack.com).
 *
 * Architecture:
 * 1. Attempts to load local HDR file from /hdri/
 * 2. If loading fails, falls back to multi-point lighting
 * 3. Canvas NEVER crashes regardless of HDR loading status
 */

// ===========================================
// Local HDR file path - MUST be in public/hdri/
// ===========================================
const LOCAL_HDR_PATH = '/hdri/dikhololo_night_1k.hdr';

// ===========================================
// Lighting Configurations (fallback when HDR fails)
// ===========================================
type LightingStyle = 'night' | 'studio' | 'sunset' | 'neutral';

const LIGHTING_CONFIGS: Record<LightingStyle, {
  ambient: number;
  keyLight: { color: string; intensity: number; position: [number, number, number] };
  fillLight: { color: string; intensity: number; position: [number, number, number] };
  backLight: { color: string; intensity: number; position: [number, number, number] };
  rimLight: { color: string; intensity: number; position: [number, number, number] };
}> = {
  night: {
    ambient: 0.15,
    keyLight: { color: '#6688cc', intensity: 0.5, position: [5, 5, 5] },
    fillLight: { color: '#334466', intensity: 0.3, position: [-5, 3, -5] },
    backLight: { color: '#1a1a2e', intensity: 0.2, position: [0, -5, -5] },
    rimLight: { color: '#4466aa', intensity: 0.25, position: [0, 8, 0] },
  },
  studio: {
    ambient: 0.25,
    keyLight: { color: '#ffffff', intensity: 0.9, position: [5, 5, 5] },
    fillLight: { color: '#e8e8ff', intensity: 0.5, position: [-5, 3, 2] },
    backLight: { color: '#ffffff', intensity: 0.4, position: [0, 5, -8] },
    rimLight: { color: '#ffffff', intensity: 0.3, position: [0, 10, 0] },
  },
  sunset: {
    ambient: 0.15,
    keyLight: { color: '#ff7744', intensity: 0.7, position: [-8, 2, 5] },
    fillLight: { color: '#4466cc', intensity: 0.4, position: [5, 3, -5] },
    backLight: { color: '#ff5522', intensity: 0.3, position: [-5, 0, -5] },
    rimLight: { color: '#ffaa66', intensity: 0.35, position: [0, 8, 0] },
  },
  neutral: {
    ambient: 0.4,
    keyLight: { color: '#ffffff', intensity: 0.6, position: [5, 5, 5] },
    fillLight: { color: '#f0f0ff', intensity: 0.35, position: [-5, 3, -5] },
    backLight: { color: '#e0e0e0', intensity: 0.25, position: [0, -3, -5] },
    rimLight: { color: '#ffffff', intensity: 0.2, position: [0, 8, 0] },
  },
};

// ===========================================
// FallbackLighting - Used when HDR loading fails
// ===========================================
interface FallbackLightingProps {
  intensity?: number;
  style?: LightingStyle;
}

export function FallbackLighting({ intensity = 1, style = 'night' }: FallbackLightingProps) {
  const config = LIGHTING_CONFIGS[style] || LIGHTING_CONFIGS.night;

  return (
    <group name="fallback-lighting">
      {/* Ambient base - ensures nothing is pure black */}
      <ambientLight intensity={config.ambient * intensity} />

      {/* Key light - main illumination */}
      <pointLight
        position={config.keyLight.position}
        color={config.keyLight.color}
        intensity={config.keyLight.intensity * intensity}
        distance={25}
        decay={2}
      />

      {/* Fill light - softens shadows */}
      <pointLight
        position={config.fillLight.position}
        color={config.fillLight.color}
        intensity={config.fillLight.intensity * intensity}
        distance={20}
        decay={2}
      />

      {/* Back light - rim/edge lighting */}
      <pointLight
        position={config.backLight.position}
        color={config.backLight.color}
        intensity={config.backLight.intensity * intensity}
        distance={20}
        decay={2}
      />

      {/* Top rim light - highlights from above */}
      <directionalLight
        position={config.rimLight.position}
        color={config.rimLight.color}
        intensity={config.rimLight.intensity * intensity}
      />
    </group>
  );
}

// ===========================================
// HDR Error Boundary - Catches HDR loading failures
// ===========================================
interface HDRErrorBoundaryState {
  hasError: boolean;
}

interface HDRErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error) => void;
}

class HDRErrorBoundary extends Component<HDRErrorBoundaryProps, HDRErrorBoundaryState> {
  constructor(props: HDRErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): HDRErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log silently - DO NOT throw or crash
    console.warn('[SafeEnvironment] HDR loading failed, using fallback lighting:', error.message);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ===========================================
// LocalHDREnvironment - Loads HDR from local path only
// ===========================================
interface LocalHDREnvironmentProps {
  background?: boolean;
}

function LocalHDREnvironment({ background = false }: LocalHDREnvironmentProps) {
  // IMPORTANT: Only use `files` prop with local path
  // NEVER use `preset` prop - it fetches from external CDN
  return (
    <Environment
      files={LOCAL_HDR_PATH}
      background={background}
    />
  );
}

// ===========================================
// SafeEnvironment - Main Export
// ===========================================
interface SafeEnvironmentProps {
  /** Whether to show HDR as background (default: false) */
  background?: boolean;
  /** Intensity multiplier for fallback lights (default: 1) */
  intensity?: number;
  /** Lighting style for fallback (default: 'night') */
  style?: LightingStyle;
  /** Force fallback lighting (skip HDR loading) */
  forceFallback?: boolean;
}

/**
 * SafeEnvironment - Crash-proof environment lighting
 *
 * Usage:
 *   <SafeEnvironment />                    // Tries HDR, falls back to lights
 *   <SafeEnvironment forceFallback />      // Skips HDR, uses lights only
 *   <SafeEnvironment style="studio" />     // Custom fallback lighting style
 *
 * This component:
 * - Loads HDR ONLY from local /hdri/ directory
 * - NEVER uses drei presets (no external CDN fetching)
 * - Gracefully falls back to multi-point lighting on failure
 * - NEVER crashes Canvas or triggers ErrorBoundary
 */
export default function SafeEnvironment({
  background = false,
  intensity = 1,
  style = 'night',
  forceFallback = false,
}: SafeEnvironmentProps) {
  // State to track if HDR loading failed (set via error boundary)
  const [hdrFailed, setHdrFailed] = useState(false);

  // Use effect to avoid render-phase side effects
  useEffect(() => {
    // Could add HDR preloading validation here if needed
  }, []);

  // If forced fallback or HDR failed, use lighting only
  if (forceFallback || hdrFailed) {
    return <FallbackLighting intensity={intensity} style={style} />;
  }

  // Try to load local HDR with fallback
  return (
    <HDRErrorBoundary
      fallback={<FallbackLighting intensity={intensity} style={style} />}
      onError={() => setHdrFailed(true)}
    >
      <Suspense fallback={<FallbackLighting intensity={intensity} style={style} />}>
        <LocalHDREnvironment background={background} />
      </Suspense>
    </HDRErrorBoundary>
  );
}

// ===========================================
// Re-exports for convenience
// ===========================================
export { FallbackLighting as EnvironmentLights };
export { LOCAL_HDR_PATH };
