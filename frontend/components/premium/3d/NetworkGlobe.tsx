'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEcoCanvas } from '@/hooks/useEcoMode';

// Globe made of points
function Globe() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  // Generate points on sphere surface
  const { positions, colors } = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const radius = 2;

    const color1 = new THREE.Color('#F97316');
    const color2 = new THREE.Color('#0F172A');

    for (let i = 0; i < count; i++) {
      // Use fibonacci sphere for even distribution
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((i % count) + 0.5) / count * Math.PI * (3 - Math.sqrt(5)) * count;

      positions[i * 3] = Math.cos(theta) * radiusAtY * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;

      // Color gradient based on latitude
      const t = (y + 1) / 2;
      const color = color1.clone().lerp(color2, t * 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  // Generate connection lines
  const connectionPositions = useMemo(() => {
    const lineCount = 30;
    const linePositions = new Float32Array(lineCount * 6);
    const pointCount = positions.length / 3;

    for (let i = 0; i < lineCount; i++) {
      const idx1 = Math.floor(Math.random() * pointCount);
      const idx2 = Math.floor(Math.random() * pointCount);

      linePositions[i * 6] = positions[idx1 * 3];
      linePositions[i * 6 + 1] = positions[idx1 * 3 + 1];
      linePositions[i * 6 + 2] = positions[idx1 * 3 + 2];
      linePositions[i * 6 + 3] = positions[idx2 * 3];
      linePositions[i * 6 + 4] = positions[idx2 * 3 + 1];
      linePositions[i * 6 + 5] = positions[idx2 * 3 + 2];
    }

    return linePositions;
  }, [positions]);

  // Connection line colors (animated)
  const lineColors = useMemo(() => {
    const colors = new Float32Array(30 * 6);
    for (let i = 0; i < colors.length; i++) {
      colors[i] = 0;
    }
    return colors;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.1;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.1;

      // Animate line visibility
      const colors = linesRef.current.geometry.attributes.color.array as Float32Array;
      const lineCount = 30;

      for (let i = 0; i < lineCount; i++) {
        // Create pulsing effect for each line
        const phase = (time * 0.5 + i * 0.3) % (Math.PI * 2);
        const intensity = Math.sin(phase) * 0.5 + 0.5;

        const color = new THREE.Color('#F97316');
        colors[i * 6] = color.r * intensity;
        colors[i * 6 + 1] = color.g * intensity;
        colors[i * 6 + 2] = color.b * intensity;
        colors[i * 6 + 3] = color.r * intensity;
        colors[i * 6 + 4] = color.g * intensity;
        colors[i * 6 + 5] = color.b * intensity;
      }

      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Globe points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionPositions.length / 3}
            array={connectionPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.6} />
      </lineSegments>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#0F172A"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 8, 64]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Orbiting data packets
function DataPackets() {
  const groupRef = useRef<THREE.Group>(null);
  const packetsCount = 5;

  const packets = useMemo(() => {
    return Array.from({ length: packetsCount }, (_, i) => ({
      id: i,
      radius: 2.8 + Math.random() * 0.4,
      speed: 0.3 + Math.random() * 0.3,
      offset: (i / packetsCount) * Math.PI * 2,
      tilt: Math.random() * Math.PI * 0.3,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const packet = packets[i];
        const time = state.clock.elapsedTime * packet.speed + packet.offset;

        child.position.x = Math.cos(time) * packet.radius;
        child.position.z = Math.sin(time) * packet.radius;
        child.position.y = Math.sin(time * 2) * 0.3;

        child.rotation.x = time;
        child.rotation.y = time * 1.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {packets.map((packet) => (
        <mesh key={packet.id}>
          <octahedronGeometry args={[0.08]} />
          <meshBasicMaterial color="#F97316" />
        </mesh>
      ))}
    </group>
  );
}

// Ambient particles
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 3;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
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

      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#F97316" intensity={0.5} />
      <pointLight position={[-5, -5, -5]} color="#0F172A" intensity={0.3} />

      <Globe />
      <DataPackets />
      <AmbientParticles />
    </>
  );
}

// Main component
interface NetworkGlobeProps {
  className?: string;
}

export default function NetworkGlobe({ className = '' }: NetworkGlobeProps) {
  const { dpr, frameloop, gl, shouldShowStatic } = useEcoCanvas();

  if (shouldShowStatic) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-onyx-900/50 ${className}`}>
        <div className="text-xs text-muted-foreground font-mono">Network Globe</div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={dpr}
        frameloop={frameloop as 'always' | 'never' | 'demand'}
        gl={{ ...gl, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
