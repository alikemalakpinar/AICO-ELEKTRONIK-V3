'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import SafeEnvironment from './3d/SafeEnvironment';
import Scene3DErrorBoundary from './3d/Scene3DErrorBoundary';
import * as THREE from 'three';

// Animated distorting sphere with energy effect
function DistortingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;

    if (meshRef.current) {
      // Slow, mysterious rotation
      meshRef.current.rotation.x += delta * 0.05;
      meshRef.current.rotation.y += delta * 0.08;
    }

    if (materialRef.current) {
      // Pulsing distort effect
      materialRef.current.distort = 0.3 + Math.sin(timeRef.current * 0.5) * 0.1;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <Sphere ref={meshRef} args={[1.5, 128, 128]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#0a0a0a"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

// Energy veins orbiting the sphere
function EnergyVeins() {
  const groupRef = useRef<THREE.Group>(null);
  const veinsCount = 5;

  const veins = useMemo(() => {
    return Array.from({ length: veinsCount }, (_, i) => ({
      id: i,
      radius: 1.8 + i * 0.15,
      speed: 0.3 + i * 0.1,
      offset: (i * Math.PI * 2) / veinsCount,
      tilt: Math.random() * Math.PI * 0.5,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {veins.map((vein) => (
        <EnergyRing key={vein.id} {...vein} />
      ))}
    </group>
  );
}

// Individual energy ring
function EnergyRing({
  radius,
  speed,
  offset,
  tilt,
}: {
  radius: number;
  speed: number;
  offset: number;
  tilt: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create particles along the ring
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [radius]);

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed + offset;

    if (ringRef.current) {
      ringRef.current.rotation.x = tilt;
      ringRef.current.rotation.z = time;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.x = tilt;
      particlesRef.current.rotation.z = time;
    }
  });

  return (
    <group>
      {/* Ring glow */}
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.008, 8, 100]} />
        <meshBasicMaterial
          color="#F97316"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={60}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#F97316"
          size={0.03}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Glowing core light
function CoreGlow() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Pulsing light intensity
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="#F97316"
        intensity={2}
        distance={10}
        decay={2}
      />
      <pointLight
        position={[3, 2, 2]}
        color="#F97316"
        intensity={0.5}
        distance={8}
      />
      <pointLight
        position={[-3, -2, -2]}
        color="#1a1a2e"
        intensity={0.3}
        distance={8}
      />
    </>
  );
}

// Ambient particles floating around
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color('#F97316');

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere around the core
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 3;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Vary the color slightly
      const intensity = 0.3 + Math.random() * 0.7;
      colors[i * 3] = color.r * intensity;
      colors[i * 3 + 1] = color.g * intensity;
      colors[i * 3 + 2] = color.b * intensity;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        transparent
        opacity={0.6}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-engineer-500/30 border-t-engineer-500 rounded-full animate-spin" />
    </div>
  );
}

// Main NeuralCore component
interface NeuralCoreProps {
  className?: string;
}

export default function NeuralCore({ className = '' }: NeuralCoreProps) {
  return (
    <Scene3DErrorBoundary sceneName="NeuralCore" className={className}>
      <div className={`relative ${className}`}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            style={{ background: 'transparent' }}
          >
            {/* Ambient lighting */}
            <ambientLight intensity={0.1} />

            {/* Core elements */}
            <DistortingSphere />
            <EnergyVeins />
            <CoreGlow />
            <AmbientParticles />

            {/* Safe environment lighting (CSP-compliant, no external HDR fetching) */}
            <SafeEnvironment preset="night" />
          </Canvas>
        </Suspense>

        {/* Overlay gradient for blending */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-onyx-900/80" />
        </div>
      </div>
    </Scene3DErrorBoundary>
  );
}
