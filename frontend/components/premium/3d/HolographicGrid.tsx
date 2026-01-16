'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Infinite neon grid floor with wave animation
function InfiniteGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Custom shader for animated wave effect
  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#F97316') },
      uFogColor: { value: new THREE.Color('#0F172A') },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;

        vec3 pos = position;

        // Wave animation
        float wave1 = sin(pos.x * 0.5 + uTime * 0.5) * 0.15;
        float wave2 = sin(pos.y * 0.3 + uTime * 0.3) * 0.1;
        float wave3 = cos((pos.x + pos.y) * 0.2 + uTime * 0.4) * 0.08;

        pos.z = wave1 + wave2 + wave3;
        vElevation = pos.z;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform vec3 uFogColor;
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        // Grid pattern
        float gridX = abs(fract(vUv.x * 30.0 - 0.5) - 0.5) / fwidth(vUv.x * 30.0);
        float gridY = abs(fract(vUv.y * 30.0 - 0.5) - 0.5) / fwidth(vUv.y * 30.0);
        float grid = 1.0 - min(min(gridX, gridY), 1.0);

        // Distance fade
        float dist = length(vUv - 0.5) * 2.0;
        float fade = 1.0 - smoothstep(0.3, 1.0, dist);

        // Elevation glow
        float glow = smoothstep(-0.2, 0.3, vElevation) * 0.5 + 0.5;

        // Pulse effect
        float pulse = sin(uTime * 2.0 - dist * 5.0) * 0.2 + 0.8;

        vec3 color = uColor * grid * fade * glow * pulse;

        // Add subtle fog
        color = mix(uFogColor * 0.1, color, fade);

        gl_FragColor = vec4(color, grid * fade * 0.8);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[40, 40, 100, 100]} />
      <shaderMaterial
        ref={materialRef}
        {...shader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Vertical scan lines effect
function ScanLines() {
  const linesRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= 0.05;
        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = 8;
        }
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={linesRef}>
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
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Camera parallax based on mouse movement
function ParallaxCamera() {
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Get normalized mouse position
    const mouseX = (state.pointer.x * 0.1);
    const mouseY = (state.pointer.y * 0.05);

    // Smooth lerp to target
    targetRotation.current.x += (mouseY - targetRotation.current.x) * 0.02;
    targetRotation.current.y += (-mouseX - targetRotation.current.y) * 0.02;

    camera.rotation.x = -0.3 + targetRotation.current.x;
    camera.rotation.y = targetRotation.current.y;
  });

  return null;
}

// Main component
interface HolographicGridProps {
  className?: string;
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0F172A']} />
      <fog attach="fog" args={['#0F172A', 5, 25]} />

      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 0]} color="#F97316" intensity={1} />

      <InfiniteGrid />
      <ScanLines />
      <ParallaxCamera />
    </>
  );
}

export default function HolographicGrid({ className = '' }: HolographicGridProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
