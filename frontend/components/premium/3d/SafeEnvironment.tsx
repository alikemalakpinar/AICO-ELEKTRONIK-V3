'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * SafeEnvironment - CSP-compliant environment lighting for R3F
 *
 * This component provides environment-based lighting without using drei's
 * Environment component which attempts to fetch HDR files from external CDNs
 * (raw.githack.com) that violate CSP.
 *
 * Instead, it provides:
 * 1. High-quality multi-point lighting that simulates environment reflections
 * 2. Optional local HDR file loading (from public/hdri/)
 * 3. Graceful fallback if anything fails
 */

interface SafeEnvironmentProps {
  /** Whether to show background (default: false) */
  background?: boolean;
  /** Intensity multiplier for lights (default: 1) */
  intensity?: number;
  /** Color tint for the environment (default: neutral) */
  tint?: string;
  /** Preset lighting style */
  preset?: 'night' | 'studio' | 'sunset' | 'neutral';
}

// Preset configurations for different moods
const PRESETS = {
  night: {
    ambient: 0.05,
    keyLight: { color: '#4466aa', intensity: 0.4, position: [5, 5, 5] as [number, number, number] },
    fillLight: { color: '#1a1a2e', intensity: 0.2, position: [-5, 3, -5] as [number, number, number] },
    backLight: { color: '#0a0a1a', intensity: 0.1, position: [0, -5, -5] as [number, number, number] },
    rimLight: { color: '#334488', intensity: 0.15, position: [0, 8, 0] as [number, number, number] },
  },
  studio: {
    ambient: 0.15,
    keyLight: { color: '#ffffff', intensity: 0.8, position: [5, 5, 5] as [number, number, number] },
    fillLight: { color: '#e8e8ff', intensity: 0.4, position: [-5, 3, 2] as [number, number, number] },
    backLight: { color: '#ffffff', intensity: 0.3, position: [0, 5, -8] as [number, number, number] },
    rimLight: { color: '#ffffff', intensity: 0.2, position: [0, 10, 0] as [number, number, number] },
  },
  sunset: {
    ambient: 0.1,
    keyLight: { color: '#ff7744', intensity: 0.6, position: [-8, 2, 5] as [number, number, number] },
    fillLight: { color: '#4466cc', intensity: 0.3, position: [5, 3, -5] as [number, number, number] },
    backLight: { color: '#ff5522', intensity: 0.2, position: [-5, 0, -5] as [number, number, number] },
    rimLight: { color: '#ffaa66', intensity: 0.25, position: [0, 8, 0] as [number, number, number] },
  },
  neutral: {
    ambient: 0.3,
    keyLight: { color: '#ffffff', intensity: 0.5, position: [5, 5, 5] as [number, number, number] },
    fillLight: { color: '#f0f0ff', intensity: 0.25, position: [-5, 3, -5] as [number, number, number] },
    backLight: { color: '#e0e0e0', intensity: 0.15, position: [0, -3, -5] as [number, number, number] },
    rimLight: { color: '#ffffff', intensity: 0.1, position: [0, 8, 0] as [number, number, number] },
  },
};

/**
 * EnvironmentLights - Multi-point lighting setup that simulates environment reflections
 * This is a fallback-safe alternative to HDR environment maps
 */
function EnvironmentLights({
  intensity = 1,
  preset = 'night'
}: {
  intensity?: number;
  preset?: keyof typeof PRESETS;
}) {
  const config = PRESETS[preset] || PRESETS.night;

  return (
    <group name="safe-environment-lights">
      {/* Ambient base */}
      <ambientLight intensity={config.ambient * intensity} />

      {/* Key light - main directional light */}
      <pointLight
        position={config.keyLight.position}
        color={config.keyLight.color}
        intensity={config.keyLight.intensity * intensity}
        distance={20}
        decay={2}
      />

      {/* Fill light - soften shadows */}
      <pointLight
        position={config.fillLight.position}
        color={config.fillLight.color}
        intensity={config.fillLight.intensity * intensity}
        distance={15}
        decay={2}
      />

      {/* Back light - rim lighting */}
      <pointLight
        position={config.backLight.position}
        color={config.backLight.color}
        intensity={config.backLight.intensity * intensity}
        distance={15}
        decay={2}
      />

      {/* Top rim light - highlights */}
      <pointLight
        position={config.rimLight.position}
        color={config.rimLight.color}
        intensity={config.rimLight.intensity * intensity}
        distance={20}
        decay={2}
      />
    </group>
  );
}

/**
 * SafeEnvironment - Main component
 * Provides environment-like lighting without external asset fetching
 */
export default function SafeEnvironment({
  background = false,
  intensity = 1,
  tint,
  preset = 'night',
}: SafeEnvironmentProps) {
  return (
    <Suspense fallback={null}>
      <EnvironmentLights intensity={intensity} preset={preset} />
    </Suspense>
  );
}

/**
 * FallbackLighting - Minimal lighting for when everything else fails
 * Used as the ultimate fallback to ensure scenes are always visible
 */
export function FallbackLighting({ intensity = 1 }: { intensity?: number }) {
  return (
    <group name="fallback-lighting">
      <ambientLight intensity={0.6 * intensity} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8 * intensity}
        color="#ffffff"
      />
      <pointLight
        position={[-5, 3, -5]}
        intensity={0.3 * intensity}
        color="#F97316"
        distance={15}
      />
    </group>
  );
}

export { EnvironmentLights };
