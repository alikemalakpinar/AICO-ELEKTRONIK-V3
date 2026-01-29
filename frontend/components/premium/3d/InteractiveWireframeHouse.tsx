'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useEcoCanvas } from '@/hooks/useEcoMode';

// ===========================================
// InteractiveWireframeHouse - Compact & Elegant
// Scaled down for better visual balance
// ===========================================

// Room component with highlight capability
function Room({
  position,
  size,
  color,
  highlightColor,
  isHighlighted,
  name,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  highlightColor: string;
  isHighlighted: boolean;
  name: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentColor = useRef(new THREE.Color(color));
  const targetColor = isHighlighted ? new THREE.Color(highlightColor) : new THREE.Color(color);

  useFrame(() => {
    currentColor.current.lerp(targetColor, 0.05);
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).color = currentColor.current;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color={color} transparent opacity={isHighlighted ? 0.12 : 0.015} />
      <Edges
        scale={1}
        threshold={15}
        color={isHighlighted ? highlightColor : color}
      />
    </mesh>
  );
}

// Main house structure - SCALED DOWN
function WireframeHouse({ scale = 0.7 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [highlightedRoom, setHighlightedRoom] = useState(0);
  const timeRef = useRef(0);

  // Room definitions - smaller sizes
  const rooms = useMemo(() => [
    { name: 'Living Room', position: [-0.5, 0, 0] as [number, number, number], size: [1.4, 0.8, 1.2] as [number, number, number] },
    { name: 'Kitchen', position: [0.6, 0, 0.4] as [number, number, number], size: [0.8, 0.8, 0.6] as [number, number, number] },
    { name: 'Bedroom 1', position: [-0.5, 0.9, 0] as [number, number, number], size: [1, 0.8, 1] as [number, number, number] },
    { name: 'Bedroom 2', position: [0.5, 0.9, 0] as [number, number, number], size: [0.8, 0.8, 1] as [number, number, number] },
    { name: 'Bathroom', position: [0.6, 0, -0.4] as [number, number, number], size: [0.8, 0.8, 0.5] as [number, number, number] },
  ], []);

  useFrame((state, delta) => {
    timeRef.current += delta;

    // Rotate house slowly
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }

    // Cycle through rooms
    if (timeRef.current > 2.5) {
      timeRef.current = 0;
      setHighlightedRoom((prev) => (prev + 1) % rooms.length);
    }
  });

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.08}
      floatIntensity={0.2}
    >
      <group ref={groupRef} scale={scale}>
        {/* Rooms */}
        {rooms.map((room, index) => (
          <Room
            key={room.name}
            position={room.position}
            size={room.size}
            color="#F97316"
            highlightColor="#F97316"
            isHighlighted={index === highlightedRoom}
            name={room.name}
          />
        ))}

        {/* Roof - smaller */}
        <group position={[0, 1.6, 0]}>
          {/* Roof left */}
          <mesh position={[-0.4, 0.25, 0]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[1.2, 0.04, 1.6]} />
            <meshBasicMaterial color="#F97316" transparent opacity={0.015} />
            <Edges scale={1} threshold={15} color="#F97316" />
          </mesh>
          {/* Roof right */}
          <mesh position={[0.4, 0.25, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[1.2, 0.04, 1.6]} />
            <meshBasicMaterial color="#F97316" transparent opacity={0.015} />
            <Edges scale={1} threshold={15} color="#F97316" />
          </mesh>
        </group>

        {/* Foundation - smaller */}
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[2.4, 0.08, 1.6]} />
          <meshBasicMaterial color="#F97316" transparent opacity={0.015} />
          <Edges scale={1} threshold={15} color="#F97316" />
        </mesh>

        {/* Smart home indicators - smaller & fewer */}
        <SmartIndicator position={[-0.5, 0.5, 0.6]} />
        <SmartIndicator position={[0.6, 0.5, 0.3]} />
        <SmartIndicator position={[-0.5, 1.4, 0.5]} />
      </group>
    </Float>
  );
}

// Smart home indicator (glowing point) - smaller
function SmartIndicator({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 0.7 + Math.sin(state.clock.elapsedTime * 2.5 + position[0]) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color="#F97316" />
    </mesh>
  );
}

// Ambient particles - fewer and smaller spread
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50; // Reduced from 80

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5; // Reduced spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
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
        size={0.015}
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

// Responsive camera hook
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useFrame(() => {
    // Adjust FOV based on screen width for better mobile experience
    const isMobile = size.width < 768;
    const targetFov = isMobile ? 55 : 50;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

// Scene
function Scene() {
  return (
    <>
      <color attach="background" args={['transparent']} />

      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} color="#F97316" intensity={0.4} />
      <pointLight position={[-4, 2, -4]} color="#0F172A" intensity={0.2} />

      <ResponsiveCamera />
      <WireframeHouse scale={0.75} />
      <Particles />
    </>
  );
}

// Main component
interface InteractiveWireframeHouseProps {
  className?: string;
}

export default function InteractiveWireframeHouse({ className = '' }: InteractiveWireframeHouseProps) {
  const { dpr, frameloop, gl, shouldShowStatic } = useEcoCanvas();

  if (shouldShowStatic) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-onyx-900/50 ${className}`}>
        <div className="text-xs text-muted-foreground font-mono">Smart Home Wireframe</div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [3.5, 2.5, 3.5], fov: 50 }}
        dpr={dpr}
        frameloop={frameloop as 'always' | 'never' | 'demand'}
        gl={{ ...gl, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
