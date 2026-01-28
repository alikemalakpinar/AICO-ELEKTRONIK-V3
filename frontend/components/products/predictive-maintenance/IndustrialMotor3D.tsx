'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Edges, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================
// IndustrialMotor3D - Stylized Industrial Motor
// Shakes when vibration level is high
// ===========================================

interface IndustrialMotor3DProps {
  rpm: number;
  vibrationLevel: number;
  status: 'normal' | 'warning' | 'critical';
  accentColor: string;
  className?: string;
}

// Motor housing component
function MotorHousing({
  vibrationLevel,
  status,
  accentColor,
}: {
  vibrationLevel: number;
  status: string;
  accentColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const statusColor = useMemo(() => {
    if (status === 'critical') return '#EF4444';
    if (status === 'warning') return '#F59E0B';
    return '#22C55E';
  }, [status]);

  const emissiveIntensity = status === 'critical' ? 0.3 : status === 'warning' ? 0.1 : 0.05;

  // Shake effect based on vibration
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    const shakeIntensity = (vibrationLevel - 2) * 0.003;
    if (shakeIntensity > 0) {
      groupRef.current.position.x = Math.sin(timeRef.current * 50) * shakeIntensity;
      groupRef.current.position.y = Math.sin(timeRef.current * 45) * shakeIntensity * 0.5;
      groupRef.current.rotation.z = Math.sin(timeRef.current * 40) * shakeIntensity * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main motor body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.4, 32]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.3}
          emissive={statusColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Cooling fins */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i / 12) * Math.PI * 2) * 0.55,
            0,
            Math.cos((i / 12) * Math.PI * 2) * 0.55,
          ]}
          rotation={[0, (i / 12) * Math.PI * 2, 0]}
        >
          <boxGeometry args={[0.15, 1.2, 0.02]} />
          <meshStandardMaterial
            color="#2d2d4a"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* End cap - front */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.15, 32]} />
        <meshStandardMaterial
          color="#16213e"
          metalness={0.7}
          roughness={0.4}
          emissive={accentColor}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* End cap - back */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.15, 32]} />
        <meshStandardMaterial
          color="#16213e"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Terminal box */}
      <mesh position={[0.5, 0.2, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Mounting feet */}
      <mesh position={[-0.3, -0.55, 0.4]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#0f0f1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.3, -0.55, 0.4]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#0f0f1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-0.3, -0.55, -0.4]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#0f0f1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.3, -0.55, -0.4]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#0f0f1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Status indicator light */}
      <mesh position={[0.5, 0.45, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={status === 'critical' ? 2 : 1}
        />
      </mesh>

      {/* Brand plate */}
      <mesh position={[0, 0.3, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.15]} />
        <meshStandardMaterial
          color="#333"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Rotating shaft component
function RotatingShaft({ rpm, accentColor }: { rpm: number; accentColor: string }) {
  const shaftRef = useRef<THREE.Group>(null);
  const couplingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (shaftRef.current) {
      // RPM to radians per second: (rpm / 60) * 2 * PI
      const radiansPerSecond = (rpm / 60) * Math.PI * 2;
      shaftRef.current.rotation.y += radiansPerSecond * delta;
    }
    if (couplingRef.current) {
      const radiansPerSecond = (rpm / 60) * Math.PI * 2;
      couplingRef.current.rotation.y += radiansPerSecond * delta;
    }
  });

  return (
    <>
      {/* Main shaft */}
      <group ref={shaftRef}>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
          <meshStandardMaterial
            color="#888"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Keyway */}
        <mesh position={[0.06, 1.2, 0]}>
          <boxGeometry args={[0.03, 0.3, 0.03]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Coupling */}
      <mesh ref={couplingRef} position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.15, 16]} />
        <meshStandardMaterial
          color="#2a2a4a"
          metalness={0.7}
          roughness={0.3}
          emissive={accentColor}
          emissiveIntensity={0.1}
        />
      </mesh>
    </>
  );
}

// Sensor indicators
function SensorIndicators({ vibrationLevel, status }: { vibrationLevel: number; status: string }) {
  const sensor1Ref = useRef<THREE.Mesh>(null);
  const sensor2Ref = useRef<THREE.Mesh>(null);

  const sensorColor = status === 'critical' ? '#EF4444' : status === 'warning' ? '#F59E0B' : '#00D4FF';

  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.3 + 0.7;
    if (sensor1Ref.current) {
      (sensor1Ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
    if (sensor2Ref.current) {
      (sensor2Ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <>
      {/* Vibration sensor 1 */}
      <group position={[0, 0.3, 0.62]}>
        <mesh ref={sensor1Ref}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
          <meshStandardMaterial
            color={sensorColor}
            emissive={sensorColor}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Vibration sensor 2 */}
      <group position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh ref={sensor2Ref}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
          <meshStandardMaterial
            color={sensorColor}
            emissive={sensorColor}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Temperature sensor */}
      <group position={[-0.62, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
          <meshStandardMaterial
            color="#22C55E"
            emissive="#22C55E"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </>
  );
}

// Vibration wave visualization
function VibrationWaves({ vibrationLevel, status }: { vibrationLevel: number; status: string }) {
  const wavesRef = useRef<THREE.Group>(null);

  const waveColor = status === 'critical' ? '#EF4444' : status === 'warning' ? '#F59E0B' : '#00D4FF';

  useFrame((state) => {
    if (!wavesRef.current) return;

    wavesRef.current.children.forEach((child, i) => {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * vibrationLevel * 0.05;
      child.scale.setScalar(scale);
      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshBasicMaterial;
      if (material && 'opacity' in material) {
        material.opacity = 0.3 - i * 0.08;
      }
    });
  });

  if (vibrationLevel < 3) return null;

  return (
    <group ref={wavesRef} position={[0, 0, 0]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i}>
          <torusGeometry args={[0.7 + i * 0.15, 0.02, 8, 32]} />
          <meshBasicMaterial
            color={waveColor}
            transparent
            opacity={0.3 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

// Ground platform
function Platform({ accentColor }: { accentColor: string }) {
  return (
    <group position={[0, -0.7, 0]}>
      {/* Main platform */}
      <mesh>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial
          color="#111"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Edge lighting */}
      <mesh position={[0, 0.05, 0.76]}>
        <boxGeometry args={[2, 0.02, 0.02]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, 0.05, -0.76]}>
        <boxGeometry args={[2, 0.02, 0.02]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.5 + 3;
    camera.position.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.5 + 3;
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

// Main scene
function Scene({
  rpm,
  vibrationLevel,
  status,
  accentColor,
}: {
  rpm: number;
  vibrationLevel: number;
  status: 'normal' | 'warning' | 'critical';
  accentColor: string;
}) {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 12]} />

      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-3, 2, -3]} intensity={0.3} color={accentColor} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.5}
        color="#ffffff"
        castShadow
      />

      <CameraController />

      <Float speed={0.5} rotationIntensity={0.01} floatIntensity={0.02}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <MotorHousing
            vibrationLevel={vibrationLevel}
            status={status}
            accentColor={accentColor}
          />
          <RotatingShaft rpm={rpm} accentColor={accentColor} />
          <SensorIndicators vibrationLevel={vibrationLevel} status={status} />
          <VibrationWaves vibrationLevel={vibrationLevel} status={status} />
        </group>
        <Platform accentColor={accentColor} />
      </Float>

      {/* Ground grid */}
      <gridHelper args={[10, 20, accentColor, '#111111']} position={[0, -0.75, 0]} />
    </>
  );
}

// Main component
export default function IndustrialMotor3D({
  rpm,
  vibrationLevel,
  status,
  accentColor,
  className = '',
}: IndustrialMotor3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [3, 2, 3], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Scene
          rpm={rpm}
          vibrationLevel={vibrationLevel}
          status={status}
          accentColor={accentColor}
        />
      </Canvas>
    </div>
  );
}
