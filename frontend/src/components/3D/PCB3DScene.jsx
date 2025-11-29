import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Float,
  Html,
  ContactShadows,
  useTexture,
  MeshTransmissionMaterial
} from '@react-three/drei';
import * as THREE from 'three';

// Component Labels that appear on hover
const ComponentLabel = ({ position, label, description, isVisible }) => {
  if (!isVisible) return null;

  return (
    <Html position={position} center distanceFactor={10}>
      <div className="pointer-events-none animate-fadeIn">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-blue-500/50 rounded-xl px-4 py-2 shadow-2xl shadow-blue-500/20 min-w-[140px]">
          <div className="text-blue-400 font-bold text-sm">{label}</div>
          <div className="text-gray-400 text-xs mt-0.5">{description}</div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-500/50" />
        </div>
      </div>
    </Html>
  );
};

// Microchip/IC Component
const Microchip = ({ position, size = [0.4, 0.08, 0.4], label, description, exploded = false }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const explodedOffset = exploded ? [0, 0.5, 0] : [0, 0, 0];
  const finalPosition = [
    position[0] + explodedOffset[0],
    position[1] + explodedOffset[1],
    position[2] + explodedOffset[2]
  ];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = finalPosition[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.01;
    }
  });

  const pins = useMemo(() => {
    const pinsArray = [];
    const pinsPerSide = 8;
    const pinWidth = size[0] / (pinsPerSide + 1);

    for (let i = 0; i < pinsPerSide; i++) {
      // Bottom pins
      pinsArray.push([
        position[0] - size[0]/2 + pinWidth * (i + 1),
        position[1] - 0.02,
        position[2] + size[2]/2 + 0.03
      ]);
      // Top pins
      pinsArray.push([
        position[0] - size[0]/2 + pinWidth * (i + 1),
        position[1] - 0.02,
        position[2] - size[2]/2 - 0.03
      ]);
    }
    return pinsArray;
  }, [position, size]);

  return (
    <group>
      {/* IC Body */}
      <mesh
        ref={meshRef}
        position={finalPosition}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={hovered ? '#1a1a2e' : '#0f0f1a'}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* IC Label Dot */}
      <mesh position={[finalPosition[0] - size[0]/3, finalPosition[1] + size[1]/2 + 0.001, finalPosition[2] - size[2]/3]}>
        <circleGeometry args={[0.02, 16]} />
        <meshBasicMaterial color="#4ade80" />
      </mesh>

      {/* Pins */}
      {pins.map((pinPos, idx) => (
        <mesh key={idx} position={pinPos}>
          <boxGeometry args={[0.015, 0.04, 0.02]} />
          <meshStandardMaterial color="#b8b8b8" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      <ComponentLabel
        position={[finalPosition[0], finalPosition[1] + 0.2, finalPosition[2]]}
        label={label}
        description={description}
        isVisible={hovered}
      />
    </group>
  );
};

// LED Component
const LED = ({ position, color = '#4ade80', label, description, exploded = false }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [intensity, setIntensity] = useState(1);

  const explodedOffset = exploded ? [0, 0.6, 0] : [0, 0, 0];
  const finalPosition = [
    position[0] + explodedOffset[0],
    position[1] + explodedOffset[1],
    position[2] + explodedOffset[2]
  ];

  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 3 + position[0] * 5) * 0.5 + 0.5;
    setIntensity(pulse);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={finalPosition}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight
        position={finalPosition}
        color={color}
        intensity={intensity * 0.3}
        distance={0.5}
      />
      <ComponentLabel
        position={[finalPosition[0], finalPosition[1] + 0.15, finalPosition[2]]}
        label={label}
        description={description}
        isVisible={hovered}
      />
    </group>
  );
};

// Capacitor Component
const Capacitor = ({ position, label, description, exploded = false }) => {
  const [hovered, setHovered] = useState(false);

  const explodedOffset = exploded ? [0, 0.4, 0] : [0, 0, 0];
  const finalPosition = [
    position[0] + explodedOffset[0],
    position[1] + explodedOffset[1],
    position[2] + explodedOffset[2]
  ];

  return (
    <group>
      <mesh
        position={finalPosition}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <cylinderGeometry args={[0.08, 0.08, 0.15, 24]} />
        <meshStandardMaterial
          color="#1e3a5f"
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      {/* Cap marking */}
      <mesh position={[finalPosition[0], finalPosition[1] + 0.076, finalPosition[2]]}>
        <cylinderGeometry args={[0.075, 0.075, 0.001, 24]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
      <ComponentLabel
        position={[finalPosition[0], finalPosition[1] + 0.2, finalPosition[2]]}
        label={label}
        description={description}
        isVisible={hovered}
      />
    </group>
  );
};

// SMD Resistor
const Resistor = ({ position, label, description, exploded = false }) => {
  const [hovered, setHovered] = useState(false);

  const explodedOffset = exploded ? [0, 0.35, 0] : [0, 0, 0];
  const finalPosition = [
    position[0] + explodedOffset[0],
    position[1] + explodedOffset[1],
    position[2] + explodedOffset[2]
  ];

  return (
    <group>
      <mesh
        position={finalPosition}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[0.08, 0.02, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Terminals */}
      <mesh position={[finalPosition[0] - 0.035, finalPosition[1], finalPosition[2]]}>
        <boxGeometry args={[0.015, 0.025, 0.045]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[finalPosition[0] + 0.035, finalPosition[1], finalPosition[2]]}>
        <boxGeometry args={[0.015, 0.025, 0.045]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
      </mesh>
      <ComponentLabel
        position={[finalPosition[0], finalPosition[1] + 0.12, finalPosition[2]]}
        label={label}
        description={description}
        isVisible={hovered}
      />
    </group>
  );
};

// Connector Component
const Connector = ({ position, pins = 6, label, description, exploded = false }) => {
  const [hovered, setHovered] = useState(false);

  const explodedOffset = exploded ? [0, 0.5, 0] : [0, 0, 0];
  const finalPosition = [
    position[0] + explodedOffset[0],
    position[1] + explodedOffset[1],
    position[2] + explodedOffset[2]
  ];

  const width = pins * 0.05;

  return (
    <group>
      {/* Connector housing */}
      <mesh
        position={finalPosition}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[width, 0.08, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Pins */}
      {Array.from({ length: pins }).map((_, i) => (
        <mesh
          key={i}
          position={[
            finalPosition[0] - width/2 + 0.025 + i * 0.05,
            finalPosition[1] - 0.06,
            finalPosition[2]
          ]}
        >
          <boxGeometry args={[0.02, 0.08, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      <ComponentLabel
        position={[finalPosition[0], finalPosition[1] + 0.18, finalPosition[2]]}
        label={label}
        description={description}
        isVisible={hovered}
      />
    </group>
  );
};

// Via Hole
const Via = ({ position }) => {
  return (
    <group position={position}>
      {/* Pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
        <ringGeometry args={[0.015, 0.03, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Hole */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.027, 0]}>
        <circleGeometry args={[0.015, 16]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

// Circuit Trace
const Trace = ({ points, width = 0.02 }) => {
  const curve = useMemo(() => {
    const pts = points.map(p => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(pts);
  }, [points]);

  const geometry = useMemo(() => {
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, width / 2, 8, false);
    return tubeGeometry;
  }, [curve, width]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#c9a227"
        metalness={0.95}
        roughness={0.15}
      />
    </mesh>
  );
};

// Main PCB Board
const PCBBoard = ({ exploded = false }) => {
  const boardRef = useRef();
  const [boardHovered, setBoardHovered] = useState(false);

  useFrame((state) => {
    if (boardRef.current && !exploded) {
      boardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const traces = [
    // Horizontal traces
    [[-0.6, 0.027, -0.3], [-0.2, 0.027, -0.3], [0, 0.027, -0.25], [0.4, 0.027, -0.25]],
    [[-0.5, 0.027, 0], [-0.1, 0.027, 0], [0.1, 0.027, 0.1], [0.5, 0.027, 0.1]],
    [[-0.4, 0.027, 0.3], [0, 0.027, 0.3], [0.2, 0.027, 0.25], [0.6, 0.027, 0.25]],
    // Vertical traces
    [[-0.3, 0.027, -0.4], [-0.3, 0.027, -0.1], [-0.25, 0.027, 0.1], [-0.25, 0.027, 0.4]],
    [[0.3, 0.027, -0.35], [0.3, 0.027, 0], [0.35, 0.027, 0.2], [0.35, 0.027, 0.35]],
  ];

  const vias = [
    [-0.2, 0, -0.3], [0.4, 0, -0.25], [-0.1, 0, 0], [0.5, 0, 0.1],
    [0, 0, 0.3], [-0.3, 0, -0.1], [0.3, 0, 0]
  ];

  return (
    <group ref={boardRef}>
      {/* PCB Base */}
      <mesh
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        onPointerOver={() => setBoardHovered(true)}
        onPointerOut={() => setBoardHovered(false)}
      >
        <boxGeometry args={[1.6, 0.05, 1]} />
        <meshStandardMaterial
          color={boardHovered ? '#166534' : '#15803d'}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Solder Mask Top Layer */}
      <mesh position={[0, 0.026, 0]}>
        <boxGeometry args={[1.59, 0.001, 0.99]} />
        <meshStandardMaterial
          color="#0d9448"
          transparent
          opacity={0.9}
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* Circuit Traces */}
      {traces.map((pts, idx) => (
        <Trace key={idx} points={pts} />
      ))}

      {/* Via Holes */}
      {vias.map((pos, idx) => (
        <Via key={idx} position={pos} />
      ))}

      {/* Components */}
      <Microchip
        position={[0, 0.065, 0]}
        size={[0.35, 0.06, 0.35]}
        label="MCU"
        description="STM32F4 ARM Cortex-M4"
        exploded={exploded}
      />

      <Microchip
        position={[-0.5, 0.055, -0.25]}
        size={[0.25, 0.05, 0.25]}
        label="Power IC"
        description="DC-DC Buck Converter"
        exploded={exploded}
      />

      <Capacitor
        position={[0.55, 0.1, 0]}
        label="Cap 100µF"
        description="Electrolytic Filter"
        exploded={exploded}
      />

      <Capacitor
        position={[0.55, 0.1, 0.25]}
        label="Cap 47µF"
        description="Decoupling"
        exploded={exploded}
      />

      {/* LEDs */}
      <LED
        position={[0.65, 0.045, -0.35]}
        color="#4ade80"
        label="PWR LED"
        description="Power Indicator"
        exploded={exploded}
      />
      <LED
        position={[0.55, 0.045, -0.35]}
        color="#60a5fa"
        label="STS LED"
        description="Status Indicator"
        exploded={exploded}
      />
      <LED
        position={[0.45, 0.045, -0.35]}
        color="#f59e0b"
        label="ERR LED"
        description="Error Indicator"
        exploded={exploded}
      />

      {/* Resistors */}
      <Resistor position={[-0.15, 0.035, -0.35]} label="R1" description="10kΩ Pull-up" exploded={exploded} />
      <Resistor position={[-0.05, 0.035, -0.35]} label="R2" description="4.7kΩ" exploded={exploded} />
      <Resistor position={[0.05, 0.035, -0.35]} label="R3" description="1kΩ LED" exploded={exploded} />

      {/* Connectors */}
      <Connector
        position={[-0.6, 0.065, 0.35]}
        pins={8}
        label="GPIO Header"
        description="8-Pin Expansion"
        exploded={exploded}
      />
      <Connector
        position={[0.25, 0.065, 0.4]}
        pins={4}
        label="UART"
        description="Debug Serial Port"
        exploded={exploded}
      />

      {/* Crystal Oscillator */}
      <mesh position={[-0.2, 0.04, 0.15]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.06]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Silkscreen Text */}
      <Html position={[0.5, 0.028, 0.42]} center>
        <div className="text-[6px] text-white/70 font-mono pointer-events-none select-none">
          AICO-PCB-V3
        </div>
      </Html>
      <Html position={[-0.55, 0.028, -0.42]} center>
        <div className="text-[5px] text-white/70 font-mono pointer-events-none select-none">
          REV 1.0
        </div>
      </Html>

      {/* Corner Mounting Holes */}
      {[[-0.72, 0.026, -0.42], [0.72, 0.026, -0.42], [-0.72, 0.026, 0.42], [0.72, 0.026, 0.42]].map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.025, 0.045, 24]} />
            <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
            <circleGeometry args={[0.025, 24]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Scene Setup
const Scene = ({ exploded }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[5, 8, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[-5, 5, -5]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.8}
      />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#60a5fa" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <PCBBoard exploded={exploded} />
      </Float>

      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.5}
        scale={3}
        blur={2}
        far={1.5}
      />

      <Environment preset="city" />
    </>
  );
};

// Loading Fallback
const Loader = () => (
  <Html center>
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  </Html>
);

// Main Export Component
const PCB3DScene = ({ className = '', exploded = false }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [2, 1.5, 2], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<Loader />}>
          <Scene exploded={exploded} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={1.5}
            maxDistance={5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PCB3DScene;
