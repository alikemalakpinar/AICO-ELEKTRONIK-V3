'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Edges, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { FireLinkSensor } from '@/lib/utils/firelink-parser';

// ===========================================
// HeatStressHouse - 3D Electrical Cabinet X-Ray
// Electrical Stress Monitoring & Thermal Mapping
// Panels pulse with emission on arc detection or thermal anomaly
// ===========================================

interface HeatStressHouseProps {
  sensors: FireLinkSensor[];
  selectedSensor: number | null;
  onSelectSensor: (id: number | null) => void;
  accentColor: string;
  className?: string;
}

// Room definitions matching sensor IDs
const ROOM_CONFIG = [
  { name: 'Main Panel A', position: [-0.8, 0.1, 0.3] as [number, number, number], size: [1.5, 0.9, 1.3] as [number, number, number], sensorId: 1 },
  { name: 'Panel B - Floor 1', position: [0.7, 0.1, 0.5] as [number, number, number], size: [0.9, 0.9, 0.8] as [number, number, number], sensorId: 2 },
  { name: 'Panel C - Floor 2', position: [-0.6, 1.1, 0.2] as [number, number, number], size: [1.2, 0.9, 1.1] as [number, number, number], sensorId: 3 },
  { name: 'Panel D - Kitchen', position: [0.6, 1.1, 0.2] as [number, number, number], size: [0.9, 0.9, 1.1] as [number, number, number], sensorId: 4 },
  { name: 'Sub-Panel E', position: [0.7, 0.1, -0.5] as [number, number, number], size: [0.9, 0.9, 0.6] as [number, number, number], sensorId: 5 },
  { name: 'Junction Box F', position: [-1.2, -0.3, -0.5] as [number, number, number], size: [0.7, 0.5, 0.8] as [number, number, number], sensorId: 6 },
  { name: 'Distribution G', position: [0, 0.1, -0.2] as [number, number, number], size: [0.4, 0.9, 1.8] as [number, number, number], sensorId: 7 },
  { name: 'Emergency Panel H', position: [-0.2, 1.1, -0.5] as [number, number, number], size: [0.6, 0.9, 0.5] as [number, number, number], sensorId: 8 },
];

// Electrical panel zone with thermal stress emission
function HeatStressRoom({
  position,
  size,
  sensor,
  isSelected,
  onClick,
  accentColor,
}: {
  position: [number, number, number];
  size: [number, number, number];
  sensor: FireLinkSensor;
  isSelected: boolean;
  onClick: () => void;
  accentColor: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const timeRef = useRef(0);

  // Determine color based on sensor state
  const getColor = () => {
    if (sensor.hasFire) return new THREE.Color('#FF0000');
    if (sensor.hasArc) return new THREE.Color('#FF6B00');
    if (sensor.temperature > 40) return new THREE.Color('#FF9500');
    return new THREE.Color(accentColor);
  };

  const baseColor = useMemo(() => getColor(), [sensor.hasFire, sensor.hasArc, sensor.temperature, accentColor]);
  const emissionIntensity = sensor.hasFire ? 2 : sensor.hasArc ? 0.8 : isSelected ? 0.4 : 0;

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    timeRef.current += delta;

    // Pulsing emission for thermal anomaly / arc detection
    if (sensor.hasFire) {
      const pulse = Math.sin(timeRef.current * 8) * 0.5 + 0.5;
      materialRef.current.emissiveIntensity = 1 + pulse * 2;
      materialRef.current.opacity = 0.3 + pulse * 0.3;
    } else if (sensor.hasArc) {
      const pulse = Math.sin(timeRef.current * 4) * 0.3 + 0.7;
      materialRef.current.emissiveIntensity = 0.5 + pulse * 0.3;
      materialRef.current.opacity = 0.15 + pulse * 0.1;
    } else {
      materialRef.current.emissiveIntensity = isSelected ? 0.5 : 0.05;
      materialRef.current.opacity = isSelected ? 0.15 : 0.02;
    }

    // Shake effect for fire
    if (sensor.hasFire && meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(timeRef.current * 30) * 0.01;
      meshRef.current.position.y = position[1] + Math.sin(timeRef.current * 25) * 0.01;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          ref={materialRef}
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={emissionIntensity}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
        <Edges
          scale={1}
          threshold={15}
          color={sensor.hasFire ? '#FF0000' : sensor.hasArc ? '#FF6B00' : isSelected ? '#FFFFFF' : accentColor}
          lineWidth={sensor.hasFire || isSelected ? 2 : 1}
        />
      </mesh>

      {/* Temperature label */}
      {(isSelected || sensor.hasFire || sensor.hasArc) && (
        <Text
          position={[position[0], position[1] + size[1] / 2 + 0.15, position[2]]}
          fontSize={0.12}
          color={sensor.hasFire ? '#FF0000' : sensor.hasArc ? '#FF6B00' : '#FFFFFF'}
          anchorX="center"
          anchorY="bottom"
        >
          {`${sensor.temperature.toFixed(1)}°C`}
        </Text>
      )}

      {/* Thermal overload particles */}
      {sensor.hasFire && (
        <FireParticles position={[position[0], position[1] + size[1] / 2, position[2]]} />
      )}

      {/* Arc discharge particles */}
      {sensor.hasArc && !sensor.hasFire && (
        <ArcParticles position={[position[0], position[1] + size[1] / 2, position[2]]} />
      )}
    </group>
  );
}

// Thermal overload particle effect
function FireParticles({ position }: { position: [number, number, number] }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 30;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = Math.random() * 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += delta * 0.5; // Rise up
      if (posArray[i * 3 + 1] > 0.5) {
        posArray[i * 3 + 1] = 0;
        posArray[i * 3] = (Math.random() - 0.5) * 0.3;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#FF4500" size={0.04} transparent opacity={0.8} />
    </points>
  );
}

// Arc discharge particle effect
function ArcParticles({ position }: { position: [number, number, number] }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 20;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = Math.random() * 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += delta * 0.2;
      posArray[i * 3] += Math.sin(state.clock.elapsedTime + i) * delta * 0.05;
      if (posArray[i * 3 + 1] > 0.4) {
        posArray[i * 3 + 1] = 0;
        posArray[i * 3] = (Math.random() - 0.5) * 0.4;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#888888" size={0.06} transparent opacity={0.5} />
    </points>
  );
}

// X-Ray cable visualization between panels
function CableWiring({ sensors, accentColor }: { sensors: FireLinkSensor[]; accentColor: string }) {
  const cableRef = useRef<THREE.Group>(null);

  // Cable routes connecting panels
  const cableRoutes = [
    { from: [-0.8, -0.4, 0.3], to: [0.7, -0.4, 0.5], sensorIdx: 0 },  // Main Panel to Panel B
    { from: [-0.8, -0.4, 0.3], to: [-0.6, 0.6, 0.2], sensorIdx: 2 },  // Main to Panel C (vertical)
    { from: [0.7, -0.4, 0.5], to: [0.7, -0.4, -0.5], sensorIdx: 4 },  // Panel B to Sub-Panel E
    { from: [0, -0.4, -0.2], to: [-1.2, -0.55, -0.5], sensorIdx: 5 },  // Distribution to Junction
    { from: [0, -0.4, -0.2], to: [0, 0.6, -0.2], sensorIdx: 6 },      // Distribution vertical
    { from: [-0.6, 0.6, 0.2], to: [0.6, 0.6, 0.2], sensorIdx: 3 },   // Floor 2 horizontal
  ];

  useFrame((state) => {
    // Animate cable glow based on sensor state
  });

  return (
    <group ref={cableRef}>
      {cableRoutes.map((route, i) => {
        const sensor = sensors[route.sensorIdx];
        const isHot = sensor && (sensor.hasFire || sensor.hasArc);
        const color = isHot ? (sensor.hasFire ? '#FF0000' : '#FF6B00') : accentColor;

        // Create tube geometry between points
        const points = [
          new THREE.Vector3(...(route.from as [number, number, number])),
          new THREE.Vector3(...(route.to as [number, number, number])),
        ];
        const curve = new THREE.LineCurve3(points[0], points[1]);

        return (
          <group key={i}>
            <mesh>
              <tubeGeometry args={[curve, 8, isHot ? 0.025 : 0.015, 6, false]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isHot ? 1.5 : 0.2}
                transparent
                opacity={isHot ? 0.9 : 0.4}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Cabinet enclosure structure (roof and foundation)
function HouseStructure({ accentColor }: { accentColor: string }) {
  return (
    <group>
      {/* Foundation */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[3, 0.1, 2.5]} />
        <meshStandardMaterial color={accentColor} transparent opacity={0.02} />
        <Edges scale={1} threshold={15} color={accentColor} />
      </mesh>

      {/* Roof left */}
      <mesh position={[-0.6, 1.9, 0]} rotation={[0, 0, Math.PI / 5]}>
        <boxGeometry args={[1.8, 0.05, 2.2]} />
        <meshStandardMaterial color={accentColor} transparent opacity={0.02} />
        <Edges scale={1} threshold={15} color={accentColor} />
      </mesh>

      {/* Roof right */}
      <mesh position={[0.6, 1.9, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <boxGeometry args={[1.8, 0.05, 2.2]} />
        <meshStandardMaterial color={accentColor} transparent opacity={0.02} />
        <Edges scale={1} threshold={15} color={accentColor} />
      </mesh>
    </group>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5 + 4;
    camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 0.5 + 4;
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}

// Main scene
function Scene({
  sensors,
  selectedSensor,
  onSelectSensor,
  accentColor,
}: {
  sensors: FireLinkSensor[];
  selectedSensor: number | null;
  onSelectSensor: (id: number | null) => void;
  accentColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 15]} />

      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#FF4500" />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#0066FF" />

      <CameraController />

      <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.05}>
        <group ref={groupRef}>
          <CableWiring sensors={sensors} accentColor={accentColor} />
          <HouseStructure accentColor={accentColor} />

          {ROOM_CONFIG.map((room) => {
            const sensor = sensors.find((s) => s.id === room.sensorId);
            if (!sensor) return null;

            return (
              <HeatStressRoom
                key={room.sensorId}
                position={room.position}
                size={room.size}
                sensor={sensor}
                isSelected={selectedSensor === room.sensorId}
                onClick={() => onSelectSensor(selectedSensor === room.sensorId ? null : room.sensorId)}
                accentColor={accentColor}
              />
            );
          })}

          {/* Sensor position indicators */}
          {sensors.map((sensor) => {
            const room = ROOM_CONFIG.find((r) => r.sensorId === sensor.id);
            if (!room) return null;

            return (
              <mesh
                key={`indicator-${sensor.id}`}
                position={[room.position[0], room.position[1] - room.size[1] / 2 + 0.1, room.position[2]]}
              >
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial
                  color={sensor.hasFire ? '#FF0000' : sensor.hasArc ? '#FF6B00' : '#22C55E'}
                  emissive={sensor.hasFire ? '#FF0000' : sensor.hasArc ? '#FF6B00' : '#22C55E'}
                  emissiveIntensity={sensor.hasFire ? 2 : sensor.hasArc ? 1 : 0.5}
                />
              </mesh>
            );
          })}
        </group>
      </Float>

      {/* Ground grid */}
      <gridHelper args={[10, 20, accentColor, '#111111']} position={[0, -0.6, 0]} />
    </>
  );
}

// Main component
export default function HeatStressHouse({
  sensors,
  selectedSensor,
  onSelectSensor,
  accentColor,
  className = '',
}: HeatStressHouseProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene
          sensors={sensors}
          selectedSensor={selectedSensor}
          onSelectSensor={onSelectSensor}
          accentColor={accentColor}
        />
      </Canvas>
    </div>
  );
}
