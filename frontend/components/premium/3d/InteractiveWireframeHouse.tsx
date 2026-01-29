'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useEcoCanvas } from '@/hooks/useEcoMode';

// ===========================================
// InteractiveWireframeHouse v3.2 — X-Ray Mode
// Translucent frosted glass rooms replacing Edges
// Heavy, deliberate rotation — industrial weight
// ===========================================

// Room component with frosted glass translucency
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
  const edgeRef = useRef<THREE.LineSegments>(null);
  const currentOpacity = useRef(0.03);
  const targetOpacity = isHighlighted ? 0.15 : 0.03;

  // Create edge geometry for the box
  const edgeGeo = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(...size));
  }, [size]);

  useFrame(() => {
    currentOpacity.current += (targetOpacity - currentOpacity.current) * 0.04;
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.opacity = currentOpacity.current;
    }
    if (edgeRef.current) {
      const mat = edgeRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = isHighlighted ? 0.5 : 0.12;
    }
  });

  return (
    <group position={position}>
      {/* Frosted glass volume */}
      <mesh ref={meshRef}>
        <boxGeometry args={size} />
        <meshPhysicalMaterial
          color={isHighlighted ? highlightColor : '#0a0a12'}
          transparent
          opacity={0.03}
          roughness={0.8}
          metalness={0.1}
          transmission={isHighlighted ? 0.6 : 0.3}
          thickness={0.5}
          ior={1.3}
        />
      </mesh>

      {/* Wireframe edges — subtle structural lines */}
      <lineSegments ref={edgeRef} geometry={edgeGeo}>
        <lineBasicMaterial
          color={isHighlighted ? highlightColor : color}
          transparent
          opacity={0.12}
        />
      </lineSegments>
    </group>
  );
}

// Main house structure — HEAVY rotation
function WireframeHouse({ scale = 0.7 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [highlightedRoom, setHighlightedRoom] = useState(0);
  const timeRef = useRef(0);

  const rooms = useMemo(() => [
    { name: 'Living Room', position: [-0.5, 0, 0] as [number, number, number], size: [1.4, 0.8, 1.2] as [number, number, number] },
    { name: 'Kitchen', position: [0.6, 0, 0.4] as [number, number, number], size: [0.8, 0.8, 0.6] as [number, number, number] },
    { name: 'Bedroom 1', position: [-0.5, 0.9, 0] as [number, number, number], size: [1, 0.8, 1] as [number, number, number] },
    { name: 'Bedroom 2', position: [0.5, 0.9, 0] as [number, number, number], size: [0.8, 0.8, 1] as [number, number, number] },
    { name: 'Bathroom', position: [0.6, 0, -0.4] as [number, number, number], size: [0.8, 0.8, 0.5] as [number, number, number] },
  ], []);

  useFrame((state, delta) => {
    timeRef.current += delta;

    // HEAVY rotation — like rotating a building on a turntable
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }

    // Cycle through rooms every 3.5s
    if (timeRef.current > 3.5) {
      timeRef.current = 0;
      setHighlightedRoom((prev) => (prev + 1) % rooms.length);
    }
  });

  // Edge geometries for roof and foundation
  const roofEdgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.2, 0.04, 1.6)), []);
  const foundationEdgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.4, 0.08, 1.6)), []);

  return (
    <Float
      speed={0.4}
      rotationIntensity={0.03}
      floatIntensity={0.1}
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

        {/* Roof — frosted glass */}
        <group position={[0, 1.6, 0]}>
          <group position={[-0.4, 0.25, 0]} rotation={[0, 0, Math.PI / 6]}>
            <mesh>
              <boxGeometry args={[1.2, 0.04, 1.6]} />
              <meshPhysicalMaterial
                color="#0a0a12"
                transparent
                opacity={0.04}
                transmission={0.3}
                roughness={0.9}
                thickness={0.3}
              />
            </mesh>
            <lineSegments geometry={roofEdgeGeo}>
              <lineBasicMaterial color="#F97316" transparent opacity={0.15} />
            </lineSegments>
          </group>
          <group position={[0.4, 0.25, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <mesh>
              <boxGeometry args={[1.2, 0.04, 1.6]} />
              <meshPhysicalMaterial
                color="#0a0a12"
                transparent
                opacity={0.04}
                transmission={0.3}
                roughness={0.9}
                thickness={0.3}
              />
            </mesh>
            <lineSegments geometry={roofEdgeGeo}>
              <lineBasicMaterial color="#F97316" transparent opacity={0.15} />
            </lineSegments>
          </group>
        </group>

        {/* Foundation — frosted glass */}
        <group position={[0, -0.45, 0]}>
          <mesh>
            <boxGeometry args={[2.4, 0.08, 1.6]} />
            <meshPhysicalMaterial
              color="#0a0a12"
              transparent
              opacity={0.04}
              transmission={0.3}
              roughness={0.9}
              thickness={0.3}
            />
          </mesh>
          <lineSegments geometry={foundationEdgeGeo}>
            <lineBasicMaterial color="#F97316" transparent opacity={0.15} />
          </lineSegments>
        </group>

        {/* Smart home indicators */}
        <SmartIndicator position={[-0.5, 0.5, 0.6]} />
        <SmartIndicator position={[0.6, 0.5, 0.3]} />
        <SmartIndicator position={[-0.5, 1.4, 0.5]} />
      </group>
    </Float>
  );
}

// Smart home indicator (pulsing point)
function SmartIndicator({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 0.7 + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.2;
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

// Ambient particles — fewer, slower
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 40;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.006;
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
        size={0.012}
        transparent
        opacity={0.2}
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

      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} color="#F97316" intensity={0.5} />
      <pointLight position={[-4, 2, -4]} color="#0F172A" intensity={0.2} />
      <directionalLight position={[0, 5, 3]} intensity={0.3} color="#ffffff" />

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
