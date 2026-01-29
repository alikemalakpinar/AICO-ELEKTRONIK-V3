'use client';

import React, { useRef, useMemo, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  useSceneStore,
  VILLA_CAMERA_POSITIONS,
  VILLA_SCENE_COLORS,
  type VillaSceneType,
} from '@/stores/sceneStore';
import {
  useMobileOptimization,
  useOptimizedParticleCount,
  useOptimizedCanvasProps,
} from '@/lib/hooks/useMobileOptimization';
import Scene3DErrorBoundary from './Scene3DErrorBoundary';

// ===========================================
// VillaScene - Apple-Style Scroll-Reactive 3D Scene
// Showcases smart home features with smooth transitions
// ===========================================

// ===========================================
// ResponsiveCamera - Viewport-based camera distance adjustment
// Moves camera back on smaller screens for better framing
// ===========================================
function ResponsiveCamera() {
  const { camera, viewport } = useThree();
  const currentMultiplier = useRef(1);

  useFrame(() => {
    // Calculate responsive multiplier based on viewport width
    // Desktop (width >= 10): multiplier = 1.0
    // Mobile (width ~3-4): multiplier increases to push camera back
    const viewportFactor = Math.min(viewport.width / 10, 1);
    const targetMultiplier = 1 + (0.6 * (1 - viewportFactor)); // Max 1.6x on mobile

    // Smooth interpolation
    currentMultiplier.current = THREE.MathUtils.lerp(
      currentMultiplier.current,
      targetMultiplier,
      0.03
    );

    // Also adjust FOV for mobile - wider FOV shows more
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = viewport.width < 5 ? 55 : 45;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.03);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

// Animated Camera that follows scene changes
function AnimatedCamera() {
  const { camera, viewport } = useThree();
  const villaScene = useSceneStore((state) => state.villaScene);
  const targetPosition = useRef(new THREE.Vector3(...VILLA_CAMERA_POSITIONS.intro));
  const currentPosition = useRef(new THREE.Vector3(...VILLA_CAMERA_POSITIONS.intro));

  useEffect(() => {
    const pos = VILLA_CAMERA_POSITIONS[villaScene];
    targetPosition.current.set(pos[0], pos[1], pos[2]);
  }, [villaScene]);

  useFrame(() => {
    // Calculate responsive offset based on viewport
    // Smaller screens = push camera back further
    const viewportFactor = Math.min(viewport.width / 10, 1);
    const distanceMultiplier = 1 + (0.5 * (1 - viewportFactor)); // 1.0 to 1.5x

    // Apply multiplier to target position
    const adjustedTarget = targetPosition.current.clone().multiplyScalar(distanceMultiplier);

    currentPosition.current.lerp(adjustedTarget, 0.02);
    camera.position.copy(currentPosition.current);
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}

// Smart Home House Structure
function SmartHouse({ activeScene }: { activeScene: VillaSceneType }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Room definitions with smart features
  const rooms = useMemo(
    () => [
      {
        name: 'living',
        position: [-0.8, 0, 0] as [number, number, number],
        size: [2, 1.2, 1.8] as [number, number, number],
        features: ['lighting', 'climate', 'integrated'],
      },
      {
        name: 'kitchen',
        position: [1, 0, 0.6] as [number, number, number],
        size: [1.2, 1.2, 1] as [number, number, number],
        features: ['lighting', 'climate'],
      },
      {
        name: 'bedroom1',
        position: [-0.6, 1.3, 0] as [number, number, number],
        size: [1.4, 1.1, 1.4] as [number, number, number],
        features: ['lighting', 'climate', 'security'],
      },
      {
        name: 'bedroom2',
        position: [0.8, 1.3, 0] as [number, number, number],
        size: [1.2, 1.1, 1.4] as [number, number, number],
        features: ['lighting', 'climate'],
      },
      {
        name: 'garage',
        position: [1, 0, -0.6] as [number, number, number],
        size: [1.2, 1.2, 0.8] as [number, number, number],
        features: ['security'],
      },
    ],
    []
  );

  const sceneColor = new THREE.Color(VILLA_SCENE_COLORS[activeScene]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      // Heavy slow rotation — industrial weight
      const targetRotation = activeScene === 'integrated' ? timeRef.current * 0.03 : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.02
      );
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={groupRef}>
        {/* Rooms */}
        {rooms.map((room) => {
          const isActive =
            activeScene === 'integrated' ||
            room.features.includes(activeScene);
          return (
            <RoomBox
              key={room.name}
              position={room.position}
              size={room.size}
              isActive={isActive}
              sceneColor={sceneColor}
              activeScene={activeScene}
            />
          );
        })}

        {/* Roof */}
        <group position={[0, 2.3, 0]}>
          <mesh position={[-0.6, 0.35, 0]} rotation={[0, 0, Math.PI / 5]}>
            <boxGeometry args={[1.8, 0.08, 2.2]} />
            <meshPhysicalMaterial
              color={sceneColor}
              transparent
              opacity={0.15}
              metalness={0.4}
              roughness={0.15}
              transmission={0.4}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
          <mesh position={[0.6, 0.35, 0]} rotation={[0, 0, -Math.PI / 5]}>
            <boxGeometry args={[1.8, 0.08, 2.2]} />
            <meshPhysicalMaterial
              color={sceneColor}
              transparent
              opacity={0.15}
              metalness={0.4}
              roughness={0.15}
              transmission={0.4}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
        </group>

        {/* Foundation */}
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[3.5, 0.15, 2.5]} />
          <meshPhysicalMaterial
            color={sceneColor}
            transparent
            opacity={0.1}
            metalness={0.7}
            roughness={0.15}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Smart Indicators */}
        <SmartIndicators activeScene={activeScene} />
      </group>
    </Float>
  );
}

// Individual Room Box with Glass Effect
function RoomBox({
  position,
  size,
  isActive,
  sceneColor,
  activeScene,
}: {
  position: [number, number, number];
  size: [number, number, number];
  isActive: boolean;
  sceneColor: THREE.Color;
  activeScene: VillaSceneType;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const targetOpacity = useRef(0.02);

  useFrame(() => {
    targetOpacity.current = isActive ? 0.15 : 0.02;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity.current, 0.05);
      mat.color.lerp(sceneColor, 0.05);
    }

    if (edgesRef.current) {
      const mat = edgesRef.current.material as THREE.LineBasicMaterial;
      mat.color.lerp(isActive ? sceneColor : new THREE.Color('#F97316'), 0.05);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, isActive ? 0.8 : 0.3, 0.05);
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(...size), [size]);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color={sceneColor}
          transparent
          opacity={0.02}
          metalness={0.2}
          roughness={0.15}
          transmission={0.3}
          ior={1.4}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#F97316" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// Smart Home Indicators (sensors, lights, etc.)
function SmartIndicators({ activeScene }: { activeScene: VillaSceneType }) {
  const indicators = useMemo(
    () => [
      // Lighting indicators
      { position: [-0.8, 0.8, 0.9] as [number, number, number], scene: 'lighting' as const },
      { position: [1, 0.8, 0.5] as [number, number, number], scene: 'lighting' as const },
      { position: [-0.6, 2, 0.7] as [number, number, number], scene: 'lighting' as const },
      // Climate indicators
      { position: [-0.8, 0.3, -0.5] as [number, number, number], scene: 'climate' as const },
      { position: [0.8, 1.5, -0.3] as [number, number, number], scene: 'climate' as const },
      // Security indicators
      { position: [1.5, 1, -0.6] as [number, number, number], scene: 'security' as const },
      { position: [-1.5, 1.5, 0] as [number, number, number], scene: 'security' as const },
      { position: [0, 2.5, 1] as [number, number, number], scene: 'security' as const },
    ],
    []
  );

  return (
    <group>
      {indicators.map((indicator, idx) => (
        <SmartPoint
          key={idx}
          position={indicator.position}
          isActive={activeScene === indicator.scene || activeScene === 'integrated'}
          color={VILLA_SCENE_COLORS[indicator.scene]}
        />
      ))}

      {/* Connection Lines when integrated */}
      {activeScene === 'integrated' && <ConnectionLines />}
    </group>
  );
}

// Glowing Smart Point
function SmartPoint({
  position,
  isActive,
  color,
}: {
  position: [number, number, number];
  isActive: boolean;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 3 + position[0] * 2) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
    if (glowRef.current) {
      const targetScale = isActive ? 1.5 : 0;
      glowRef.current.scale.setScalar(
        THREE.MathUtils.lerp(glowRef.current.scale.x, targetScale, 0.1)
      );
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={isActive ? color : '#666'} />
      </mesh>
      {/* Glow effect */}
      <mesh ref={glowRef} scale={0}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Connection Lines for Integrated Mode
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const points = [
      [-0.8, 0.8, 0.9],
      [1, 0.8, 0.5],
      [-0.6, 2, 0.7],
      [-0.8, 0.3, -0.5],
      [0.8, 1.5, -0.3],
      [1.5, 1, -0.6],
      [-1.5, 1.5, 0],
      [0, 2.5, 1],
    ];

    const linePositions: number[] = [];

    // Connect points in a network pattern
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const distance = Math.sqrt(
          Math.pow(points[i][0] - points[j][0], 2) +
            Math.pow(points[i][1] - points[j][1], 2) +
            Math.pow(points[i][2] - points[j][2], 2)
        );
        if (distance < 2.5) {
          linePositions.push(...points[i], ...points[j]);
        }
      }
    }

    return new Float32Array(linePositions);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
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
      <lineBasicMaterial color="#10B981" transparent opacity={0.3} />
    </lineSegments>
  );
}

// Ambient Particles with mobile optimization
function AmbientParticles({ color, count }: { color: string; count: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const positions = useMemo(() => {
    if (count === 0) return new Float32Array(0);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  // Cleanup geometry on unmount
  useEffect(() => {
    return () => {
      geometryRef.current?.dispose();
    };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  if (count === 0) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Scene Component with mobile optimization
function Scene({ particleCount }: { particleCount: number }) {
  const villaScene = useSceneStore((state) => state.villaScene);
  const sceneColor = VILLA_SCENE_COLORS[villaScene];

  return (
    <>
      <color attach="background" args={['transparent']} />

      {/* Responsive Camera - adjusts based on viewport */}
      <ResponsiveCamera />

      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color={sceneColor} intensity={0.6} />
      <pointLight position={[-5, 3, -5]} color="#0F172A" intensity={0.3} />
      <pointLight position={[0, 10, 0]} color="#ffffff" intensity={0.2} />

      <AnimatedCamera />
      <SmartHouse activeScene={villaScene} />
      <AmbientParticles color={sceneColor} count={particleCount} />
    </>
  );
}

// Loading fallback for Canvas Suspense
function CanvasLoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#F97316" wireframe />
    </mesh>
  );
}

// Main Component with mobile optimization
interface VillaSceneProps {
  className?: string;
}

export default function VillaScene({ className = '' }: VillaSceneProps) {
  const canvasProps = useOptimizedCanvasProps();
  const particleCount = useOptimizedParticleCount(100);
  const { reducedMotion } = useMobileOptimization();

  // Skip rendering entirely if reduced motion and very low-end
  if (reducedMotion && particleCount === 0) {
    return (
      <div className={`absolute inset-0 ${className} bg-gradient-to-br from-onyx-900/50 to-onyx-800/50`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs text-muted-foreground font-mono">
            3D Scene (reduced motion enabled)
          </div>
        </div>
      </div>
    );
  }

  return (
    <Scene3DErrorBoundary sceneName="VillaScene" className={`absolute inset-0 ${className}`}>
      <div className={`absolute inset-0 ${className}`}>
        <Canvas
          camera={{ position: [5, 4, 5], fov: 45 }}
          {...canvasProps}
        >
          {/* Suspense inside Canvas catches async 3D asset loading */}
          <Suspense fallback={<CanvasLoadingFallback />}>
            <Scene particleCount={particleCount} />
          </Suspense>
        </Canvas>
      </div>
    </Scene3DErrorBoundary>
  );
}
