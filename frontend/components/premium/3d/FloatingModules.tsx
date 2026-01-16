'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================
// FloatingModules - Compact & Elegant
// Scaled down for better visual balance
// ===========================================

// Glassmorphism Chip component - SCALED DOWN
function GlassChip({ position, rotation, scale = 0.7 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0015;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.2}
      floatIntensity={0.35}
    >
      <group position={position} rotation={rotation} scale={scale}>
        {/* Main chip body - smaller */}
        <mesh ref={meshRef}>
          <boxGeometry args={[0.9, 0.12, 0.6]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.4}
            chromaticAberration={0.15}
            anisotropy={0.2}
            distortion={0.08}
            distortionScale={0.15}
            temporalDistortion={0.08}
            iridescence={0.8}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1200]}
            color="#1e293b"
            transmission={0.92}
            roughness={0.12}
          />
        </mesh>
        {/* Chip pins - fewer */}
        {[-0.3, 0, 0.3].map((x, i) => (
          <mesh key={i} position={[x, -0.08, 0.38]}>
            <boxGeometry args={[0.04, 0.015, 0.1]} />
            <meshStandardMaterial color="#F97316" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {[-0.3, 0, 0.3].map((x, i) => (
          <mesh key={`b${i}`} position={[x, -0.08, -0.38]}>
            <boxGeometry args={[0.04, 0.015, 0.1]} />
            <meshStandardMaterial color="#F97316" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Glassmorphism Capacitor - SCALED DOWN
function GlassCapacitor({ position, rotation }: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.15}
      floatIntensity={0.3}
    >
      <group position={position} rotation={rotation} scale={0.7}>
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.18, 0.18, 0.45, 16]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.25}
            chromaticAberration={0.1}
            anisotropy={0.15}
            distortion={0.04}
            temporalDistortion={0.04}
            color="#0f172a"
            transmission={0.88}
            roughness={0.15}
          />
        </mesh>
        {/* Top marking */}
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.015, 16]} />
          <meshStandardMaterial color="#F97316" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Legs */}
        <mesh position={[0.08, -0.3, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.08, -0.3, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// Glassmorphism Resistor - SCALED DOWN
function GlassResistor({ position, rotation }: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <Float
      speed={1.4}
      rotationIntensity={0.18}
      floatIntensity={0.25}
    >
      <group position={position} rotation={rotation} scale={0.65}>
        {/* Body */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.38, 12]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.15}
            chromaticAberration={0.08}
            color="#1e293b"
            transmission={0.82}
            roughness={0.2}
          />
        </mesh>
        {/* Color bands - fewer */}
        {[
          { pos: -0.1, color: '#ef4444' },
          { pos: 0, color: '#F97316' },
          { pos: 0.1, color: '#eab308' },
        ].map((band, i) => (
          <mesh key={i} position={[band.pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.025, 12]} />
            <meshStandardMaterial color={band.color} metalness={0.5} roughness={0.3} />
          </mesh>
        ))}
        {/* Leads */}
        <mesh position={[-0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.15, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.15, 8]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating particles - REDUCED
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60; // Reduced from 100

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10; // Reduced spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
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
        size={0.02}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Responsive camera
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useFrame(() => {
    const isMobile = size.width < 768;
    const targetFov = isMobile ? 50 : 45;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

// Scene - SPREAD OUT components more
function Scene() {
  return (
    <>
      <color attach="background" args={['transparent']} />

      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} color="#F97316" intensity={0.6} />
      <pointLight position={[-4, -4, -4]} color="#3b82f6" intensity={0.3} />
      <directionalLight position={[0, 8, 0]} intensity={0.4} />

      <ResponsiveCamera />

      {/* Multiple floating components - MORE SPREAD OUT */}
      <GlassChip position={[-1.8, 0.8, 0]} rotation={[0.15, 0.2, 0.08]} scale={0.85} />
      <GlassChip position={[2, -0.3, -0.8]} rotation={[-0.08, 0.4, 0.15]} scale={0.65} />

      <GlassCapacitor position={[-1.2, -0.8, 0.8]} rotation={[0.08, 0, 0.15]} />
      <GlassCapacitor position={[1.3, 1.2, -0.4]} rotation={[-0.15, 0.2, 0.08]} />

      <GlassResistor position={[0, -1.2, 0.4]} rotation={[0, 0.4, 0.2]} />
      <GlassResistor position={[-2, 0, -0.8]} rotation={[0.15, -0.2, 0.4]} />

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
        camera={{ position: [0, 0, 6], fov: 45 }} // Pulled back
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
