'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { MeshDistortMaterial, MeshTransmissionMaterial, Sphere, Float } from '@react-three/drei';
import SafeEnvironment from './3d/SafeEnvironment';
import Scene3DErrorBoundary from './3d/Scene3DErrorBoundary';
import * as THREE from 'three';

// ===========================================
// NeuralCore v3.2 — X-Ray Engineering Core
// Frosted glass translucency + linear data streams
// Heavy, deliberate rotation (tons of weight)
// ===========================================

// Frosted glass sphere — X-Ray translucency effect
function XRaySphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;

    if (meshRef.current) {
      // HEAVY rotation — like a multi-ton turbine core
      meshRef.current.rotation.x += delta * 0.012;
      meshRef.current.rotation.y += delta * 0.018;
    }
  });

  return (
    <Float
      speed={0.6}
      rotationIntensity={0.05}
      floatIntensity={0.2}
    >
      <Sphere ref={meshRef} args={[1.5, 128, 128]}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.5}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.1}
          transmission={0.92}
          roughness={0.3}
          ior={1.5}
          color="#0a0a12"
          attenuationColor="#F97316"
          attenuationDistance={3}
        />
      </Sphere>

      {/* Inner wireframe shell — reveals internal structure */}
      <Sphere args={[1.2, 24, 24]}>
        <meshBasicMaterial
          color="#F97316"
          wireframe
          transparent
          opacity={0.06}
        />
      </Sphere>

      {/* Inner core glow */}
      <Sphere args={[0.4, 16, 16]}>
        <meshBasicMaterial
          color="#F97316"
          transparent
          opacity={0.15}
        />
      </Sphere>
    </Float>
  );
}

// Linear data streams — NOT circular rings, but linear dash-array flows
function DataStreams() {
  const groupRef = useRef<THREE.Group>(null);
  const streamCount = 8;

  const streams = useMemo(() => {
    return Array.from({ length: streamCount }, (_, i) => ({
      id: i,
      radius: 1.8 + (i % 4) * 0.2,
      tiltX: (Math.PI * 0.15) + (i * Math.PI * 2) / streamCount,
      tiltZ: (i * Math.PI) / streamCount * 0.4,
      dashScale: 0.6 + Math.random() * 0.4,
      speed: 0.08 + (i % 3) * 0.03,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow group rotation — weight
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {streams.map((stream) => (
        <DataStreamRing key={stream.id} {...stream} />
      ))}
    </group>
  );
}

// Individual data stream with dash-array animation
function DataStreamRing({
  radius,
  tiltX,
  tiltZ,
  dashScale,
  speed,
}: {
  radius: number;
  tiltX: number;
  tiltZ: number;
  dashScale: number;
  speed: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<any>(null);
  const dashOffsetRef = useRef(0);

  // Create a circle of points for the ring
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    geo.computeBoundingSphere();
    return geo;
  }, [radius]);

  useFrame((state) => {
    if (materialRef.current) {
      // Linear dash offset animation — data flowing along the ring
      dashOffsetRef.current -= speed;
      (materialRef.current as any).dashOffset = dashOffsetRef.current;
    }
    if (lineRef.current) {
      lineRef.current.rotation.x = tiltX;
      lineRef.current.rotation.z = tiltZ;
    }
  });

  return (
    <line ref={lineRef as any}>
      <primitive object={geometry} attach="geometry" />
      <lineDashedMaterial
        ref={materialRef}
        color="#F97316"
        transparent
        opacity={0.25}
        dashSize={0.15 * dashScale}
        gapSize={0.25 * dashScale}
        linewidth={1}
      />
    </line>
  );
}

// Glowing core light — pulsing subtly
function CoreGlow() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="#F97316"
        intensity={1.5}
        distance={10}
        decay={2}
      />
      <pointLight
        position={[3, 2, 2]}
        color="#F97316"
        intensity={0.3}
        distance={8}
      />
      <pointLight
        position={[-3, -2, -2]}
        color="#0a0a1a"
        intensity={0.2}
        distance={8}
      />
    </>
  );
}

// Ambient particles — sparse, slow, weighty
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color('#F97316');

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 3;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const intensity = 0.2 + Math.random() * 0.5;
      colors[i * 3] = color.r * intensity;
      colors[i * 3 + 1] = color.g * intensity;
      colors[i * 3 + 2] = color.b * intensity;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      // Very slow drift — heavy mass
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.008;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.004;
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
        size={0.015}
        transparent
        opacity={0.4}
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
            <ambientLight intensity={0.08} />

            {/* Core elements */}
            <XRaySphere />
            <DataStreams />
            <CoreGlow />
            <AmbientParticles />

            {/* Safe environment lighting */}
            <SafeEnvironment />
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
