'use client';

import { Environment } from '@react-three/drei';
import { Suspense } from 'react';

/**
 * SafeEnvironment - CSP-compliant, crash-proof environment lighting
 *
 * Architecture:
 * 1. ALWAYS renders fallback lights (scene is never pitch black)
 * 2. Attempts to load local HDR as enhancement
 * 3. If HDR fails or loads slowly, fallback lights ensure visibility
 * 4. NEVER uses drei presets (which fetch from raw.githack.com)
 */

// Local HDR file path - MUST be in public/hdri/
const LOCAL_HDR_PATH = '/hdri/dikhololo_night_1k.hdr';

/**
 * FallbackLights - Always-present lighting
 * Ensures scene is visible even if HDR fails or loads slowly
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
 * SafeEnvironment - Main component
 *
 * Usage:
 *   <SafeEnvironment />                    // HDR + fallback lights
 *   <SafeEnvironment background />         // HDR as background
 *   <SafeEnvironment fallbackOnly />       // Only fallback lights (skip HDR)
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
  return (
    <>
      {/* ALWAYS render fallback lights so scene is never pitch black */}
      <FallbackLights />

      {/* Load local HDR as enhancement (not replacement) */}
      {!fallbackOnly && (
        <Suspense fallback={null}>
          <Environment
            files={LOCAL_HDR_PATH}
            background={background}
          />
        </Suspense>
      )}
    </>
  );
}

// Named export for compatibility
export default SafeEnvironment;

// Re-export for convenience
export { FallbackLights, LOCAL_HDR_PATH };
