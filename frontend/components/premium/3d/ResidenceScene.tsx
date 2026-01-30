'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import {
  useSceneStore,
  RESIDENCE_CAMERA_POSITIONS,
  RESIDENCE_SCENE_COLORS,
  type ResidenceSceneType,
} from '@/stores/sceneStore';
import { useEcoCanvas } from '@/hooks/useEcoMode';

// ===========================================
// ResidenceScene - Smart Building Management 3D Scene
// Showcases platform layers and management features
// ===========================================

// Animated Camera that follows scene changes
function AnimatedCamera() {
  const { camera } = useThree();
  const residenceScene = useSceneStore((state) => state.residenceScene);
  const targetPosition = useRef(new THREE.Vector3(...RESIDENCE_CAMERA_POSITIONS.intro));
  const currentPosition = useRef(new THREE.Vector3(...RESIDENCE_CAMERA_POSITIONS.intro));

  useEffect(() => {
    const pos = RESIDENCE_CAMERA_POSITIONS[residenceScene];
    targetPosition.current.set(pos[0], pos[1], pos[2]);
  }, [residenceScene]);

  useFrame(() => {
    currentPosition.current.lerp(targetPosition.current, 0.02);
    camera.position.copy(currentPosition.current);
    camera.lookAt(0, 2, 0);
  });

  return null;
}

// Building Structure with Floors
function SmartBuilding({ activeScene }: { activeScene: ResidenceSceneType }) {
  const groupRef = useRef<THREE.Group>(null);

  // Floor definitions
  const floors = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        index: i,
        position: [0, i * 0.8, 0] as [number, number, number],
        units: 4, // apartments per floor
      })),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.05}>
      <group ref={groupRef}>
        {/* Floors */}
        {floors.map((floor) => (
          <BuildingFloor
            key={floor.index}
            position={floor.position}
            index={floor.index}
            units={floor.units}
            activeScene={activeScene}
          />
        ))}

        {/* Building Base/Foundation */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[3.5, 0.4, 2.5]} />
          <meshStandardMaterial
            color={RESIDENCE_SCENE_COLORS[activeScene]}
            transparent
            opacity={0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Roof with antenna */}
        <group position={[0, 6.6, 0]}>
          <mesh>
            <boxGeometry args={[3.2, 0.2, 2.2]} />
            <meshStandardMaterial
              color={RESIDENCE_SCENE_COLORS[activeScene]}
              transparent
              opacity={0.15}
              metalness={0.5}
            />
          </mesh>
          {/* Communication antenna */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
            <meshBasicMaterial color="#F97316" />
          </mesh>
          <mesh position={[0, 0.9, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={RESIDENCE_SCENE_COLORS[activeScene]} />
          </mesh>
        </group>

        {/* Infrastructure / FireLink Cabinet Visual */}
        {activeScene === 'infrastructure' && <InfrastructureVisual />}

        {/* Platform Layers Visualization */}
        {activeScene === 'platform' && <PlatformLayers />}

        {/* Mobile App Visualization */}
        {activeScene === 'mobile' && <MobileAppVisual />}

        {/* Access Points */}
        {activeScene === 'access' && <AccessPoints />}

        {/* Dashboard Visualization */}
        {activeScene === 'dashboard' && <DashboardVisual />}
      </group>
    </Float>
  );
}

// Individual Building Floor
function BuildingFloor({
  position,
  index,
  units,
  activeScene,
}: {
  position: [number, number, number];
  index: number;
  units: number;
  activeScene: ResidenceSceneType;
}) {
  const floorRef = useRef<THREE.Mesh>(null);
  const unitsRef = useRef<THREE.Group>(null);

  const isActive =
    activeScene === 'platform' ||
    (activeScene === 'infrastructure' && index === 0) ||
    (activeScene === 'mobile' && index % 2 === 0) ||
    (activeScene === 'access' && index === 0) ||
    activeScene === 'dashboard';

  const sceneColor = new THREE.Color(RESIDENCE_SCENE_COLORS[activeScene]);

  useFrame((state) => {
    if (floorRef.current) {
      const mat = floorRef.current.material as THREE.MeshStandardMaterial;
      const targetOpacity = isActive ? 0.12 : 0.03;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.05);
      mat.color.lerp(sceneColor, 0.05);
    }

    if (unitsRef.current) {
      unitsRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshBasicMaterial;
          const pulse = Math.sin(state.clock.elapsedTime * 2 + index + i) * 0.5 + 0.5;
          mat.opacity = isActive ? 0.3 + pulse * 0.4 : 0.1;
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* Floor slab */}
      <mesh ref={floorRef}>
        <boxGeometry args={[3, 0.7, 2]} />
        <meshStandardMaterial
          color={sceneColor}
          transparent
          opacity={0.03}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Unit windows/indicators */}
      <group ref={unitsRef}>
        {Array.from({ length: units }).map((_, i) => {
          const x = (i - (units - 1) / 2) * 0.7;
          return (
            <mesh key={i} position={[x, 0, 1.01]}>
              <planeGeometry args={[0.5, 0.5]} />
              <meshBasicMaterial
                color={RESIDENCE_SCENE_COLORS[activeScene]}
                transparent
                opacity={0.2}
              />
            </mesh>
          );
        })}
      </group>

      {/* Floor edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 0.7, 2)]} />
        <lineBasicMaterial color={RESIDENCE_SCENE_COLORS[activeScene]} transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// Infrastructure Visual — Basement electrical cabinet with FireLink arc indicators
function InfrastructureVisual() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle pulsing glow on the cabinet
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshBasicMaterial;
          if (mat.opacity !== undefined) {
            mat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 1]}>
      {/* Electrical cabinet body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.8, 0.6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} transparent opacity={0.9} />
      </mesh>
      {/* Cabinet door panel */}
      <mesh position={[0, 0, 0.31]}>
        <planeGeometry args={[1.1, 1.7]} />
        <meshBasicMaterial color="#334155" transparent opacity={0.7} />
      </mesh>
      {/* Arc detection indicator — pulsing red */}
      <mesh position={[0, 0.5, 0.35]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0.8} />
      </mesh>
      {/* Cable bus bars */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 0.35]}>
          <boxGeometry args={[0.08, 0.8, 0.02]} />
          <meshBasicMaterial color={i === 1 ? '#F97316' : '#64748B'} transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Thermal warning ring */}
      <mesh position={[0, 0.5, 0.36]}>
        <ringGeometry args={[0.15, 0.2, 32]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Ground cables running to building */}
      <ConnectionLine start={[0.6, -0.5, 0]} end={[1.5, -0.3, -0.5]} color="#EF4444" />
      <ConnectionLine start={[-0.6, -0.5, 0]} end={[-1.5, -0.3, -0.5]} color="#F97316" />
    </group>
  );
}

// Platform Layers - Floating Layers around building
function PlatformLayers() {
  const layersRef = useRef<THREE.Group>(null);

  const layers = useMemo(
    () => [
      { name: 'Data', y: 1, radius: 2.5, color: '#8B5CF6' },
      { name: 'Services', y: 3, radius: 2.8, color: '#06B6D4' },
      { name: 'Integration', y: 5, radius: 3.1, color: '#22C55E' },
    ],
    []
  );

  useFrame((state) => {
    if (layersRef.current) {
      layersRef.current.children.forEach((layer, i) => {
        layer.rotation.y = state.clock.elapsedTime * 0.2 * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={layersRef}>
      {layers.map((layer, i) => (
        <group key={layer.name} position={[0, layer.y, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[layer.radius, 0.02, 8, 64]} />
            <meshBasicMaterial color={layer.color} transparent opacity={0.5} />
          </mesh>
          {/* Data nodes on ring */}
          {Array.from({ length: 8 }).map((_, j) => {
            const angle = (j / 8) * Math.PI * 2;
            const x = Math.cos(angle) * layer.radius;
            const z = Math.sin(angle) * layer.radius;
            return (
              <mesh key={j} position={[x, 0, z]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color={layer.color} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// Mobile App Visual - Floating Phone
function MobileAppVisual() {
  const phoneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      phoneRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={phoneRef} position={[-3, 3, 0]}>
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[0.8, 1.6, 0.1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.051]}>
        <boxGeometry args={[0.7, 1.4, 0.01]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>
      {/* Notification dots */}
      {[0.4, 0.1, -0.2, -0.5].map((y, i) => (
        <mesh key={i} position={[-0.2, y, 0.06]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial
            color={i === 0 ? '#22C55E' : i === 1 ? '#F97316' : '#3B82F6'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      {/* Connection lines to building */}
      <ConnectionLine start={[0.4, 0, 0]} end={[2.5, 0, 0]} color="#06B6D4" />
    </group>
  );
}

// Access Points Visual
function AccessPoints() {
  const accessRef = useRef<THREE.Group>(null);

  const accessPoints = useMemo(
    () => [
      { position: [0, -0.1, 1.3] as [number, number, number], type: 'main' },
      { position: [-1.6, -0.1, 0] as [number, number, number], type: 'side' },
      { position: [1.6, -0.1, 0] as [number, number, number], type: 'parking' },
    ],
    []
  );

  useFrame((state) => {
    if (accessRef.current) {
      accessRef.current.children.forEach((point, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2;
        point.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={accessRef}>
      {accessPoints.map((point, i) => (
        <group key={i} position={point.position}>
          {/* Access point indicator */}
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
            <meshBasicMaterial color="#22C55E" transparent opacity={0.8} />
          </mesh>
          {/* QR code symbol */}
          <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Scanning effect */}
          <mesh position={[0, 0.5, 0]}>
            <ringGeometry args={[0.2, 0.25, 32]} />
            <meshBasicMaterial color="#22C55E" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Dashboard Visual - Floating Screens
function DashboardVisual() {
  const dashboardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dashboardRef.current) {
      dashboardRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={dashboardRef} position={[0, 3.5, 0]}>
      {/* Main dashboard screen */}
      <group position={[0, 0, 2]}>
        <mesh>
          <boxGeometry args={[2, 1.2, 0.05]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Screen content */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.9, 1.1]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.8} />
        </mesh>
        {/* Data bars */}
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={i} position={[x, -0.3, 0.04]}>
            <boxGeometry args={[0.15, 0.3 + i * 0.15, 0.01]} />
            <meshBasicMaterial color={i === 3 ? '#22C55E' : '#60A5FA'} />
          </mesh>
        ))}
      </group>

      {/* Side screens */}
      {[1, -1].map((side) => (
        <group key={side} position={[side * 1.5, 0, 1.5]} rotation={[0, side * -0.4, 0]}>
          <mesh>
            <boxGeometry args={[1, 0.8, 0.04]} />
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[0.9, 0.7]} />
            <meshBasicMaterial color={side === 1 ? '#8B5CF6' : '#06B6D4'} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Connection Line Helper
function ConnectionLine({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) {
  const lineRef = useRef<THREE.Line>(null);

  const { lineObject, material } = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, start[1] + 0.5, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end)
    );
    const points = curve.getPoints(20);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 });
    const line = new THREE.Line(geometry, mat);
    return { lineObject: line, material: mat };
  }, [start, end, color]);

  useFrame((state) => {
    if (material) {
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return <primitive ref={lineRef} object={lineObject} />;
}

// Ambient Particles
function AmbientParticles({ color }: { color: string }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
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
      <pointsMaterial color={color} size={0.025} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Scene Component
function Scene() {
  const residenceScene = useSceneStore((state) => state.residenceScene);
  const sceneColor = RESIDENCE_SCENE_COLORS[residenceScene];

  return (
    <>
      <color attach="background" args={['transparent']} />

      <ambientLight intensity={0.25} />
      <pointLight position={[8, 10, 8]} color={sceneColor} intensity={0.5} />
      <pointLight position={[-8, 5, -8]} color="#0F172A" intensity={0.3} />
      <pointLight position={[0, 15, 0]} color="#ffffff" intensity={0.15} />

      <AnimatedCamera />
      <SmartBuilding activeScene={residenceScene} />
      <AmbientParticles color={sceneColor} />
    </>
  );
}

// Main Component
interface ResidenceSceneProps {
  className?: string;
}

export default function ResidenceScene({ className = '' }: ResidenceSceneProps) {
  const { dpr, frameloop, gl, shouldShowStatic } = useEcoCanvas();

  if (shouldShowStatic) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-onyx-900/50 ${className}`}>
        <div className="text-xs text-muted-foreground font-mono">Smart Residence</div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        dpr={dpr}
        frameloop={frameloop as 'always' | 'never' | 'demand'}
        gl={{ ...gl, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
