'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Float } from '@react-three/drei';
import * as THREE from 'three';

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
      <meshBasicMaterial color={color} transparent opacity={isHighlighted ? 0.15 : 0.02} />
      <Edges
        scale={1}
        threshold={15}
        color={isHighlighted ? highlightColor : color}
      />
    </mesh>
  );
}

// Main house structure
function WireframeHouse() {
  const groupRef = useRef<THREE.Group>(null);
  const [highlightedRoom, setHighlightedRoom] = useState(0);
  const timeRef = useRef(0);

  // Room definitions
  const rooms = useMemo(() => [
    { name: 'Living Room', position: [-0.6, 0, 0] as [number, number, number], size: [1.8, 1, 1.5] as [number, number, number] },
    { name: 'Kitchen', position: [0.8, 0, 0.5] as [number, number, number], size: [1, 1, 0.8] as [number, number, number] },
    { name: 'Bedroom 1', position: [-0.6, 1.1, 0] as [number, number, number], size: [1.2, 1, 1.2] as [number, number, number] },
    { name: 'Bedroom 2', position: [0.6, 1.1, 0] as [number, number, number], size: [1, 1, 1.2] as [number, number, number] },
    { name: 'Bathroom', position: [0.8, 0, -0.5] as [number, number, number], size: [1, 1, 0.6] as [number, number, number] },
  ], []);

  useFrame((state, delta) => {
    timeRef.current += delta;

    // Rotate house slowly
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }

    // Cycle through rooms
    if (timeRef.current > 2) {
      timeRef.current = 0;
      setHighlightedRoom((prev) => (prev + 1) % rooms.length);
    }
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <group ref={groupRef}>
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

        {/* Roof */}
        <group position={[0, 2, 0]}>
          {/* Roof left */}
          <mesh position={[-0.5, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[1.5, 0.05, 2]} />
            <meshBasicMaterial color="#F97316" transparent opacity={0.02} />
            <Edges scale={1} threshold={15} color="#F97316" />
          </mesh>
          {/* Roof right */}
          <mesh position={[0.5, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[1.5, 0.05, 2]} />
            <meshBasicMaterial color="#F97316" transparent opacity={0.02} />
            <Edges scale={1} threshold={15} color="#F97316" />
          </mesh>
        </group>

        {/* Foundation */}
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[3, 0.1, 2]} />
          <meshBasicMaterial color="#F97316" transparent opacity={0.02} />
          <Edges scale={1} threshold={15} color="#F97316" />
        </mesh>

        {/* Smart home indicators - glowing points */}
        <SmartIndicator position={[-0.6, 0.6, 0.8]} />
        <SmartIndicator position={[0.8, 0.6, 0.5]} />
        <SmartIndicator position={[-0.6, 1.7, 0.7]} />
        <SmartIndicator position={[0.6, 1.7, 0.7]} />
      </group>
    </Float>
  );
}

// Smart home indicator (glowing point)
function SmartIndicator({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 3 + position[0]) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#F97316" />
    </mesh>
  );
}

// Connection lines between smart points
function SmartConnections() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const points = [
      [-0.6, 0.6, 0.8],
      [0.8, 0.6, 0.5],
      [-0.6, 1.7, 0.7],
      [0.6, 1.7, 0.7],
    ];

    const linePositions: number[] = [];

    // Connect all points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        linePositions.push(...points[i], ...points[j]);
      }
    }

    return new Float32Array(linePositions);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      (linesRef.current.material as THREE.LineBasicMaterial).opacity =
        0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#F97316" transparent opacity={0.3} />
    </lineSegments>
  );
}

// Ambient particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
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
        size={0.02}
        transparent
        opacity={0.3}
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
      <pointLight position={[5, 5, 5]} color="#F97316" intensity={0.5} />
      <pointLight position={[-5, 3, -5]} color="#0F172A" intensity={0.3} />

      <WireframeHouse />
      <Particles />
    </>
  );
}

// Main component
interface InteractiveWireframeHouseProps {
  className?: string;
}

export default function InteractiveWireframeHouse({ className = '' }: InteractiveWireframeHouseProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
