'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ===========================================
// GlobalFleetGlobe - 3D Globe with Fleet Tracking
// Trucks move along routes, click to zoom
// ===========================================

interface TruckData {
  id: string;
  name: string;
  route: { lat: number; lng: number }[];
  currentPosition: number;
  temperature: number;
  status: 'normal' | 'warning' | 'critical';
}

interface GlobalFleetGlobeProps {
  trucks: TruckData[];
  selectedTruck: string | null;
  onSelectTruck: (id: string | null) => void;
  accentColor: string;
  className?: string;
}

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Globe component with texture lines
function Globe({ accentColor }: { accentColor: string }) {
  const globeRef = useRef<THREE.Group>(null);

  // Create latitude/longitude lines
  const gridLines = useMemo(() => {
    const lines: { points: THREE.Vector3[]; type: 'lat' | 'lng' }[] = [];
    const radius = 1;

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 10) {
        points.push(latLngToVector3(lat, lng, radius * 1.001));
      }
      lines.push({ points, type: 'lat' });
    }

    // Longitude lines
    for (let lng = -180; lng < 180; lng += 30) {
      const points: THREE.Vector3[] = [];
      for (let lat = -80; lat <= 80; lat += 5) {
        points.push(latLngToVector3(lat, lng, radius * 1.001));
      }
      lines.push({ points, type: 'lng' });
    }

    return lines;
  }, []);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globe sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#0a1628"
          transparent
          opacity={0.9}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      {/* Grid lines */}
      {gridLines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color={accentColor}
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}

      {/* Continents (simplified outlines) */}
      <ContinentOutlines accentColor={accentColor} />

      {/* Glow effect */}
      <Sphere args={[1.02, 32, 32]}>
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

// Simplified continent outlines
function ContinentOutlines({ accentColor }: { accentColor: string }) {
  // Major city/port markers
  const markers = useMemo(
    () => [
      { name: 'Istanbul', lat: 41.0, lng: 29.0 },
      { name: 'London', lat: 51.5, lng: -0.1 },
      { name: 'New York', lat: 40.7, lng: -74.0 },
      { name: 'Dubai', lat: 25.2, lng: 55.3 },
      { name: 'Singapore', lat: 1.3, lng: 103.8 },
      { name: 'Shanghai', lat: 31.2, lng: 121.5 },
      { name: 'Tokyo', lat: 35.7, lng: 139.7 },
      { name: 'Sydney', lat: -33.9, lng: 151.2 },
    ],
    []
  );

  return (
    <>
      {markers.map((marker) => {
        const pos = latLngToVector3(marker.lat, marker.lng, 1.01);
        return (
          <group key={marker.name} position={pos}>
            <mesh>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

// Truck marker on globe
function TruckMarker({
  truck,
  isSelected,
  onClick,
  accentColor,
}: {
  truck: TruckData;
  isSelected: boolean;
  onClick: () => void;
  accentColor: string;
}) {
  const markerRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Calculate position on route
  const position = useMemo(() => {
    const routeIndex = Math.floor(truck.currentPosition * (truck.route.length - 1));
    const nextIndex = Math.min(routeIndex + 1, truck.route.length - 1);
    const t = (truck.currentPosition * (truck.route.length - 1)) % 1;

    const currentPoint = truck.route[routeIndex];
    const nextPoint = truck.route[nextIndex];

    const lat = currentPoint.lat + (nextPoint.lat - currentPoint.lat) * t;
    const lng = currentPoint.lng + (nextPoint.lng - currentPoint.lng) * t;

    return latLngToVector3(lat, lng, 1.05);
  }, [truck]);

  const statusColor =
    truck.status === 'critical' ? '#EF4444' : truck.status === 'warning' ? '#F59E0B' : '#22C55E';

  useFrame((state, delta) => {
    if (!markerRef.current) return;
    timeRef.current += delta;

    // Pulse effect
    const pulse = Math.sin(timeRef.current * 3) * 0.2 + 1;
    markerRef.current.scale.setScalar(isSelected ? 1.5 : pulse);
  });

  return (
    <group
      ref={markerRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/* Truck icon (simplified as box) */}
      <mesh>
        <boxGeometry args={[0.04, 0.02, 0.06]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={isSelected ? 1 : 0.5}
        />
      </mesh>

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.005, 8, 16]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      )}

      {/* Status indicator */}
      <mesh position={[0, 0.03, 0]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={1}
        />
      </mesh>

      {/* Temperature label (when selected) */}
      {isSelected && (
        <Text
          position={[0, 0.08, 0]}
          fontSize={0.03}
          color="#FFFFFF"
          anchorX="center"
          anchorY="bottom"
        >
          {`${truck.temperature}°C`}
        </Text>
      )}
    </group>
  );
}

// Route line on globe
function RouteLine({
  route,
  color,
  active,
}: {
  route: { lat: number; lng: number }[];
  color: string;
  active: boolean;
}) {
  const points = useMemo(() => {
    return route.map((point) => latLngToVector3(point.lat, point.lng, 1.02));
  }, [route]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={active ? 2 : 1}
      transparent
      opacity={active ? 0.8 : 0.3}
      dashed={!active}
      dashSize={0.02}
      dashScale={50}
    />
  );
}

// Camera controller with zoom to selection
function CameraController({
  selectedTruck,
  trucks,
}: {
  selectedTruck: string | null;
  trucks: TruckData[];
}) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, 4));

  useFrame(() => {
    if (selectedTruck) {
      const truck = trucks.find((t) => t.id === selectedTruck);
      if (truck) {
        const routeIndex = Math.floor(truck.currentPosition * (truck.route.length - 1));
        const point = truck.route[routeIndex];
        const pos = latLngToVector3(point.lat, point.lng, 2.5);
        targetRef.current.lerp(pos, 0.02);
      }
    } else {
      targetRef.current.lerp(new THREE.Vector3(0, 0.5, 3.5), 0.02);
    }

    camera.position.lerp(targetRef.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main scene
function Scene({
  trucks,
  selectedTruck,
  onSelectTruck,
  accentColor,
}: {
  trucks: TruckData[];
  selectedTruck: string | null;
  onSelectTruck: (id: string | null) => void;
  accentColor: string;
}) {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 4, 10]} />

      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#FFFFFF" />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color={accentColor} />

      <CameraController selectedTruck={selectedTruck} trucks={trucks} />

      <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.02}>
        <Globe accentColor={accentColor} />

        {/* Route lines */}
        {trucks.map((truck) => (
          <RouteLine
            key={`route-${truck.id}`}
            route={truck.route}
            color={
              truck.status === 'critical'
                ? '#EF4444'
                : truck.status === 'warning'
                ? '#F59E0B'
                : accentColor
            }
            active={selectedTruck === truck.id}
          />
        ))}

        {/* Truck markers */}
        {trucks.map((truck) => (
          <TruckMarker
            key={truck.id}
            truck={truck}
            isSelected={selectedTruck === truck.id}
            onClick={() => onSelectTruck(selectedTruck === truck.id ? null : truck.id)}
            accentColor={accentColor}
          />
        ))}
      </Float>
    </>
  );
}

// Main component
export default function GlobalFleetGlobe({
  trucks,
  selectedTruck,
  onSelectTruck,
  accentColor,
  className = '',
}: GlobalFleetGlobeProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene
          trucks={trucks}
          selectedTruck={selectedTruck}
          onSelectTruck={onSelectTruck}
          accentColor={accentColor}
        />
      </Canvas>
    </div>
  );
}
