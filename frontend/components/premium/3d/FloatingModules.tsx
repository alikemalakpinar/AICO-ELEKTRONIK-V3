'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Glassmorphism Chip component
function GlassChip({ position, rotation, scale = 1 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <group position={position} rotation={rotation} scale={scale}>
        {/* Main chip body */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1.2, 0.15, 0.8]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.2}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color="#1e293b"
            transmission={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Chip pins */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
          <mesh key={i} position={[x, -0.1, 0.5]}>
            <boxGeometry args={[0.05, 0.02, 0.15]} />
            <meshStandardMaterial color="#F97316" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
          <mesh key={`b${i}`} position={[x, -0.1, -0.5]}>
            <boxGeometry args={[0.05, 0.02, 0.15]} />
            <meshStandardMaterial color="#F97316" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Glassmorphism Capacitor
function GlassCapacitor({ position, rotation }: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.4}
    >
      <group position={position} rotation={rotation}>
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.25, 0.25, 0.6, 16]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.3}
            chromaticAberration={0.15}
            anisotropy={0.2}
            distortion={0.05}
            temporalDistortion={0.05}
            color="#0f172a"
            transmission={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* Top marking */}
        <mesh position={[0, 0.31, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
          <meshStandardMaterial color="#F97316" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Legs */}
        <mesh position={[0.1, -0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.1, -0.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// Glassmorphism Resistor
function GlassResistor({ position, rotation }: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <Float
      speed={1.8}
      rotationIntensity={0.25}
      floatIntensity={0.35}
    >
      <group position={position} rotation={rotation}>
        {/* Body */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.5, 12]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.2}
            chromaticAberration={0.1}
            color="#1e293b"
            transmission={0.85}
            roughness={0.2}
          />
        </mesh>
        {/* Color bands */}
        {[
          { pos: -0.15, color: '#ef4444' },
          { pos: -0.05, color: '#F97316' },
          { pos: 0.05, color: '#eab308' },
          { pos: 0.15, color: '#a1a1aa' },
        ].map((band, i) => (
          <mesh key={i} position={[band.pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.03, 12]} />
            <meshStandardMaterial color={band.color} metalness={0.5} roughness={0.3} />
          </mesh>
        ))}
        {/* Leads */}
        <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
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
      </bufferGeometry>
      <pointsMaterial
        color="#F97316"
        size={0.03}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Scene
function Scene() {
  return (
    <>
      <color attach="background" args={['transparent']} />

      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#F97316" intensity={0.8} />
      <pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={0.4} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />

      {/* Multiple floating components */}
      <GlassChip position={[-2, 1, 0]} rotation={[0.2, 0.3, 0.1]} scale={1.2} />
      <GlassChip position={[2.5, -0.5, -1]} rotation={[-0.1, 0.5, 0.2]} scale={0.9} />
      <GlassChip position={[0, 2, 1]} rotation={[0.3, -0.2, 0.1]} scale={1} />

      <GlassCapacitor position={[-1.5, -1, 1]} rotation={[0.1, 0, 0.2]} />
      <GlassCapacitor position={[1.5, 1.5, -0.5]} rotation={[-0.2, 0.3, 0.1]} />

      <GlassResistor position={[0, -1.5, 0.5]} rotation={[0, 0.5, 0.3]} />
      <GlassResistor position={[-2.5, 0.5, -1]} rotation={[0.2, -0.3, 0.5]} />
      <GlassResistor position={[3, 0, 0.5]} rotation={[-0.1, 0.2, -0.4]} />

      <Particles />
    </>
  );
}

// Main component
interface FloatingModulesProps {
  className?: string;
}

export default function FloatingModules({ className = '' }: FloatingModulesProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
