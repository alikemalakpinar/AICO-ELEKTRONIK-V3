import React, { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Float,
  Html,
  ContactShadows,
  Instances,
  Instance,
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

// =====================================================
// INSTANCED COMPONENTS - High Performance GPU Batching
// =====================================================

// Instanced SMD Resistors - All rendered in single draw call
const InstancedResistors = ({ resistors, exploded = false }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(null);

  return (
    <group>
      {/* Main resistor bodies - single draw call for all */}
      <Instances
        ref={meshRef}
        limit={100}
        range={resistors.length}
      >
        <boxGeometry args={[0.08, 0.02, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
        {resistors.map((r, idx) => {
          const explodedY = exploded ? 0.35 : 0;
          return (
            <Instance
              key={idx}
              position={[r.position[0], r.position[1] + explodedY, r.position[2]]}
              onPointerOver={() => setHovered(idx)}
              onPointerOut={() => setHovered(null)}
            />
          );
        })}
      </Instances>

      {/* Left terminals */}
      <Instances limit={100} range={resistors.length}>
        <boxGeometry args={[0.015, 0.025, 0.045]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
        {resistors.map((r, idx) => {
          const explodedY = exploded ? 0.35 : 0;
          return (
            <Instance
              key={idx}
              position={[r.position[0] - 0.035, r.position[1] + explodedY, r.position[2]]}
            />
          );
        })}
      </Instances>

      {/* Right terminals */}
      <Instances limit={100} range={resistors.length}>
        <boxGeometry args={[0.015, 0.025, 0.045]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
        {resistors.map((r, idx) => {
          const explodedY = exploded ? 0.35 : 0;
          return (
            <Instance
              key={idx}
              position={[r.position[0] + 0.035, r.position[1] + explodedY, r.position[2]]}
            />
          );
        })}
      </Instances>

      {/* Labels for hovered resistor */}
      {resistors.map((r, idx) => (
        <ComponentLabel
          key={`label-${idx}`}
          position={[r.position[0], r.position[1] + (exploded ? 0.47 : 0.12), r.position[2]]}
          label={r.label}
          description={r.description}
          isVisible={hovered === idx}
        />
      ))}
    </group>
  );
};

// Instanced Via Holes - Massive performance gain for boards with many vias
const InstancedVias = ({ vias }) => {
  return (
    <group>
      {/* Via pads (gold rings) */}
      <Instances limit={200} range={vias.length}>
        <ringGeometry args={[0.015, 0.03, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        {vias.map((pos, idx) => (
          <Instance
            key={idx}
            position={[pos[0], 0.026, pos[2]]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        ))}
      </Instances>

      {/* Via holes (dark centers) */}
      <Instances limit={200} range={vias.length}>
        <circleGeometry args={[0.015, 16]} />
        <meshBasicMaterial color="#1a1a1a" />
        {vias.map((pos, idx) => (
          <Instance
            key={idx}
            position={[pos[0], 0.027, pos[2]]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        ))}
      </Instances>
    </group>
  );
};

// Instanced LEDs with pulsing effect
const InstancedLEDs = ({ leds, exploded = false }) => {
  const [intensities, setIntensities] = useState(leds.map(() => 1));
  const [hovered, setHovered] = useState(null);

  useFrame((state) => {
    const newIntensities = leds.map((_, idx) =>
      Math.sin(state.clock.elapsedTime * 3 + idx * 2) * 0.5 + 0.5
    );
    setIntensities(newIntensities);
  });

  return (
    <group>
      {leds.map((led, idx) => {
        const explodedY = exploded ? 0.6 : 0;
        const finalPosition = [
          led.position[0],
          led.position[1] + explodedY,
          led.position[2]
        ];

        return (
          <group key={idx}>
            <mesh
              position={finalPosition}
              onPointerOver={() => setHovered(idx)}
              onPointerOut={() => setHovered(null)}
            >
              <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
              <meshStandardMaterial
                color={led.color}
                emissive={led.color}
                emissiveIntensity={intensities[idx]}
                transparent
                opacity={0.9}
              />
            </mesh>
            <pointLight
              position={finalPosition}
              color={led.color}
              intensity={intensities[idx] * 0.3}
              distance={0.5}
            />
            <ComponentLabel
              position={[finalPosition[0], finalPosition[1] + 0.15, finalPosition[2]]}
              label={led.label}
              description={led.description}
              isVisible={hovered === idx}
            />
          </group>
        );
      })}
    </group>
  );
};

// Instanced IC Pins - Major performance improvement for chip packages
const InstancedICPins = ({ positions }) => {
  return (
    <Instances limit={200} range={positions.length}>
      <boxGeometry args={[0.015, 0.04, 0.02]} />
      <meshStandardMaterial color="#b8b8b8" metalness={0.9} roughness={0.2} />
      {positions.map((pos, idx) => (
        <Instance key={idx} position={pos} />
      ))}
    </Instances>
  );
};

// Microchip/IC Component with instanced pins
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

  // Generate pin positions
  const pins = useMemo(() => {
    const pinsArray = [];
    const pinsPerSide = 8;
    const pinWidth = size[0] / (pinsPerSide + 1);

    for (let i = 0; i < pinsPerSide; i++) {
      // Bottom pins
      pinsArray.push([
        position[0] - size[0]/2 + pinWidth * (i + 1),
        position[1] - 0.02 + explodedOffset[1],
        position[2] + size[2]/2 + 0.03
      ]);
      // Top pins
      pinsArray.push([
        position[0] - size[0]/2 + pinWidth * (i + 1),
        position[1] - 0.02 + explodedOffset[1],
        position[2] - size[2]/2 - 0.03
      ]);
    }
    return pinsArray;
  }, [position, size, explodedOffset]);

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

      {/* Instanced Pins - single draw call */}
      <InstancedICPins positions={pins} />

      <ComponentLabel
        position={[finalPosition[0], finalPosition[1] + 0.2, finalPosition[2]]}
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

// Connector Component with instanced pins
const Connector = ({ position, pins = 6, label, description, exploded = false }) => {
  const [hovered, setHovered] = useState(false);

  const explodedOffset = exploded ? [0, 0.5, 0] : [0, 0, 0];
  const finalPosition = [
    position[0] + explodedOffset[0],
    position[1] + explodedOffset[1],
    position[2] + explodedOffset[2]
  ];

  const width = pins * 0.05;

  // Generate pin positions
  const pinPositions = useMemo(() => {
    return Array.from({ length: pins }).map((_, i) => [
      finalPosition[0] - width/2 + 0.025 + i * 0.05,
      finalPosition[1] - 0.06,
      finalPosition[2]
    ]);
  }, [finalPosition, width, pins]);

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

      {/* Instanced Pins */}
      <Instances limit={20} range={pins}>
        <boxGeometry args={[0.02, 0.08, 0.02]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        {pinPositions.map((pos, idx) => (
          <Instance key={idx} position={pos} />
        ))}
      </Instances>

      <ComponentLabel
        position={[finalPosition[0], finalPosition[1] + 0.18, finalPosition[2]]}
        label={label}
        description={description}
        isVisible={hovered}
      />
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

// =====================================================
// MAIN PCB BOARD - Optimized with Instanced Components
// =====================================================

const PCBBoard = ({ exploded = false }) => {
  const boardRef = useRef();
  const [boardHovered, setBoardHovered] = useState(false);

  useFrame((state) => {
    if (boardRef.current && !exploded) {
      boardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // Trace paths
  const traces = useMemo(() => [
    [[-0.6, 0.027, -0.3], [-0.2, 0.027, -0.3], [0, 0.027, -0.25], [0.4, 0.027, -0.25]],
    [[-0.5, 0.027, 0], [-0.1, 0.027, 0], [0.1, 0.027, 0.1], [0.5, 0.027, 0.1]],
    [[-0.4, 0.027, 0.3], [0, 0.027, 0.3], [0.2, 0.027, 0.25], [0.6, 0.027, 0.25]],
    [[-0.3, 0.027, -0.4], [-0.3, 0.027, -0.1], [-0.25, 0.027, 0.1], [-0.25, 0.027, 0.4]],
    [[0.3, 0.027, -0.35], [0.3, 0.027, 0], [0.35, 0.027, 0.2], [0.35, 0.027, 0.35]],
  ], []);

  // Via positions - now using instanced rendering
  const vias = useMemo(() => [
    [-0.2, 0, -0.3], [0.4, 0, -0.25], [-0.1, 0, 0], [0.5, 0, 0.1],
    [0, 0, 0.3], [-0.3, 0, -0.1], [0.3, 0, 0],
    // Additional vias for demonstration
    [-0.4, 0, 0.1], [0.2, 0, -0.15], [-0.15, 0, 0.2],
    [0.45, 0, -0.1], [-0.35, 0, -0.25], [0.1, 0, 0.35]
  ], []);

  // Resistor data - using instanced rendering
  const resistors = useMemo(() => [
    { position: [-0.15, 0.035, -0.35], label: "R1", description: "10kΩ Pull-up" },
    { position: [-0.05, 0.035, -0.35], label: "R2", description: "4.7kΩ" },
    { position: [0.05, 0.035, -0.35], label: "R3", description: "1kΩ LED" },
    { position: [0.15, 0.035, -0.35], label: "R4", description: "100Ω" },
    { position: [-0.35, 0.035, 0.2], label: "R5", description: "22kΩ" },
    { position: [-0.25, 0.035, 0.2], label: "R6", description: "10kΩ" },
  ], []);

  // LED data
  const leds = useMemo(() => [
    { position: [0.65, 0.045, -0.35], color: "#4ade80", label: "PWR LED", description: "Power Indicator" },
    { position: [0.55, 0.045, -0.35], color: "#60a5fa", label: "STS LED", description: "Status Indicator" },
    { position: [0.45, 0.045, -0.35], color: "#f59e0b", label: "ERR LED", description: "Error Indicator" },
  ], []);

  // Mounting hole positions
  const mountingHoles = useMemo(() => [
    [-0.72, 0.026, -0.42],
    [0.72, 0.026, -0.42],
    [-0.72, 0.026, 0.42],
    [0.72, 0.026, 0.42]
  ], []);

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

      {/* INSTANCED Via Holes - Single draw call for all vias */}
      <InstancedVias vias={vias} />

      {/* INSTANCED Resistors - Single draw call for all resistors */}
      <InstancedResistors resistors={resistors} exploded={exploded} />

      {/* INSTANCED LEDs */}
      <InstancedLEDs leds={leds} exploded={exploded} />

      {/* Microchips (fewer instances, individual rendering OK) */}
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

      {/* Capacitors */}
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

      {/* INSTANCED Corner Mounting Holes */}
      <Instances limit={10} range={mountingHoles.length}>
        <ringGeometry args={[0.025, 0.045, 24]} />
        <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.2} />
        {mountingHoles.map((pos, idx) => (
          <Instance key={idx} position={pos} rotation={[-Math.PI / 2, 0, 0]} />
        ))}
      </Instances>

      <Instances limit={10} range={mountingHoles.length}>
        <circleGeometry args={[0.025, 24]} />
        <meshBasicMaterial color="#1a1a1a" />
        {mountingHoles.map((pos, idx) => (
          <Instance key={idx} position={[pos[0], pos[1] + 0.001, pos[2]]} rotation={[-Math.PI / 2, 0, 0]} />
        ))}
      </Instances>
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

// Performance Monitor (development only)
const PerformanceInfo = () => {
  const { gl } = useThree();
  const [info, setInfo] = useState({ calls: 0, triangles: 0 });

  useFrame(() => {
    setInfo({
      calls: gl.info.render.calls,
      triangles: gl.info.render.triangles
    });
  });

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <Html position={[-0.8, 0.8, 0]}>
      <div className="bg-black/80 text-green-400 text-xs font-mono p-2 rounded">
        <div>Draw calls: {info.calls}</div>
        <div>Triangles: {info.triangles}</div>
      </div>
    </Html>
  );
};

// CAD-style Control Buttons Component
const ViewControls = ({ onReset, onTopView, onFrontView, onIsoView }) => {
  return (
    <Html fullscreen style={{ pointerEvents: 'none' }}>
      <div className="absolute top-3 right-3 flex flex-col gap-1 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-1.5 shadow-card" style={{ pointerEvents: 'auto' }}>
        <button
          onClick={onTopView}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs font-mono"
          title="Üst Görünüm"
        >
          T
        </button>
        <button
          onClick={onFrontView}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs font-mono"
          title="Ön Görünüm"
        >
          F
        </button>
        <button
          onClick={onIsoView}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs font-mono"
          title="İzometrik"
        >
          3D
        </button>
        <div className="border-t border-border my-1" />
        <button
          onClick={onReset}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          title="Sıfırla"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
    </Html>
  );
};

// Camera Controller Component with preset views
const CameraController = React.forwardRef((props, ref) => {
  const { camera } = useThree();
  const controlsRef = useRef();

  const setView = (position, target = [0, 0, 0]) => {
    if (controlsRef.current) {
      camera.position.set(...position);
      controlsRef.current.target.set(...target);
      controlsRef.current.update();
    }
  };

  // Expose methods via ref
  React.useImperativeHandle(ref, () => ({
    setTopView: () => setView([0, 3, 0]),
    setFrontView: () => setView([0, 0.5, 3]),
    setIsoView: () => setView([2, 1.5, 2]),
    resetView: () => setView([2, 1.5, 2]),
  }));

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      minDistance={1}
      maxDistance={6}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      autoRotate={props.autoRotate}
      autoRotateSpeed={0.3}
      enableDamping={true}
      dampingFactor={0.1}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
      }}
    />
  );
});

CameraController.displayName = 'CameraController';

// Main Export Component - Professional CAD-style 3D Viewer
const PCB3DScene = ({
  className = '',
  exploded = false,
  showPerf = false,
  autoRotate = false, // Disabled by default for professional CAD experience
  showViewControls = true,
}) => {
  const cameraControllerRef = useRef();

  const handleTopView = () => cameraControllerRef.current?.setTopView?.();
  const handleFrontView = () => cameraControllerRef.current?.setFrontView?.();
  const handleIsoView = () => cameraControllerRef.current?.setIsoView?.();
  const handleReset = () => cameraControllerRef.current?.resetView?.();

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        camera={{ position: [2, 1.5, 2], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<Loader />}>
          <Scene exploded={exploded} />
          {showPerf && <PerformanceInfo />}
          <CameraController ref={cameraControllerRef} autoRotate={autoRotate} />
          {showViewControls && (
            <ViewControls
              onReset={handleReset}
              onTopView={handleTopView}
              onFrontView={handleFrontView}
              onIsoView={handleIsoView}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Bottom Navigation Help */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs text-muted-foreground bg-card/90 backdrop-blur-sm border border-border rounded px-3 py-1.5">
        <span className="font-mono">
          Sol tık: Döndür | Sağ tık: Kaydır | Scroll: Yakınlaştır
        </span>
        <span className="font-mono text-brand-500 font-medium">AICO PCB</span>
      </div>
    </div>
  );
};

export default PCB3DScene;
