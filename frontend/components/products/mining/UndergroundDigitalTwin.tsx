'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardHat,
  AlertTriangle,
  Wind,
  Heart,
  MapPin,
  Radio,
  Users,
  ArrowUp,
  ArrowRight as ArrowExit,
} from 'lucide-react';
import type { Locale } from '@/types';

// ===========================================
// UndergroundDigitalTwin - Mine Cross-Section View
// Workers as dots, hazard zones as gas clouds
// Ruggedized tablet aesthetic (yellow/black)
// ===========================================

interface Worker {
  id: string;
  name: string;
  position: { x: number; y: number };
  zone: string;
  heartRate: number;
  oxygenLevel: number;
  bodyTemp: number;
  proximityToRisk: number;
  depthLayer: number;
  status: 'normal' | 'warning' | 'emergency';
  isMoving: boolean;
}

interface HazardZone {
  id: string;
  type: 'methane' | 'co' | 'h2s' | 'low_o2';
  position: { x: number; y: number };
  radius: number;
  level: number; // 0-100
}

interface Shaft {
  id: string;
  name: string;
  path: { x: number; y: number }[];
  level: number;
}

interface UndergroundDigitalTwinProps {
  lang: Locale;
  className?: string;
}

// Mine structure - cross section data
const SHAFTS: Shaft[] = [
  {
    id: 'main',
    name: 'Main Shaft',
    path: [
      { x: 50, y: 5 },
      { x: 50, y: 30 },
    ],
    level: 0,
  },
  {
    id: 'level1-left',
    name: 'Level 1 - West',
    path: [
      { x: 50, y: 30 },
      { x: 15, y: 30 },
    ],
    level: 1,
  },
  {
    id: 'level1-right',
    name: 'Level 1 - East',
    path: [
      { x: 50, y: 30 },
      { x: 85, y: 30 },
    ],
    level: 1,
  },
  {
    id: 'shaft2',
    name: 'Access Shaft 2',
    path: [
      { x: 50, y: 30 },
      { x: 50, y: 55 },
    ],
    level: 1,
  },
  {
    id: 'level2-left',
    name: 'Level 2 - West',
    path: [
      { x: 50, y: 55 },
      { x: 20, y: 55 },
    ],
    level: 2,
  },
  {
    id: 'level2-right',
    name: 'Level 2 - East',
    path: [
      { x: 50, y: 55 },
      { x: 80, y: 55 },
    ],
    level: 2,
  },
  {
    id: 'shaft3',
    name: 'Access Shaft 3',
    path: [
      { x: 50, y: 55 },
      { x: 50, y: 80 },
    ],
    level: 2,
  },
  {
    id: 'level3-left',
    name: 'Level 3 - West',
    path: [
      { x: 50, y: 80 },
      { x: 25, y: 80 },
    ],
    level: 3,
  },
  {
    id: 'level3-right',
    name: 'Level 3 - East',
    path: [
      { x: 50, y: 80 },
      { x: 75, y: 80 },
    ],
    level: 3,
  },
];

// Theme colors - Ruggedized Industrial (Yellow/Black)
const THEME = {
  background: '#0A0A0A',
  primary: '#EAB308', // Safety Yellow
  secondary: '#1A1A1A',
  border: '#333333',
  danger: '#EF4444',
  warning: '#F97316',
  safe: '#22C55E',
  text: '#FAFAFA',
  muted: '#666666',
};

// Gas type labels
const GAS_LABELS = {
  methane: { en: 'CH₄ (Methane)', tr: 'CH₄ (Metan)', color: '#EF4444' },
  co: { en: 'CO (Carbon Monoxide)', tr: 'CO (Karbon Monoksit)', color: '#F97316' },
  h2s: { en: 'H₂S (Hydrogen Sulfide)', tr: 'H₂S (Hidrojen Sulfur)', color: '#A855F7' },
  low_o2: { en: 'Low O₂', tr: 'Dusuk O₂', color: '#3B82F6' },
};

export default function UndergroundDigitalTwin({ lang, className = '' }: UndergroundDigitalTwinProps) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [hazards, setHazards] = useState<HazardZone[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [evacuationMode, setEvacuationMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize workers
  useEffect(() => {
    const initialWorkers: Worker[] = [
      { id: 'W001', name: 'Ahmet K.', position: { x: 25, y: 30 }, zone: 'Level 1 - West', heartRate: 78, oxygenLevel: 20.8, bodyTemp: 36.5, proximityToRisk: 85, depthLayer: 1, status: 'normal', isMoving: true },
      { id: 'W002', name: 'Mehmet Y.', position: { x: 70, y: 30 }, zone: 'Level 1 - East', heartRate: 82, oxygenLevel: 20.5, bodyTemp: 36.7, proximityToRisk: 72, depthLayer: 1, status: 'normal', isMoving: true },
      { id: 'W003', name: 'Ali D.', position: { x: 35, y: 55 }, zone: 'Level 2 - West', heartRate: 75, oxygenLevel: 20.1, bodyTemp: 36.4, proximityToRisk: 60, depthLayer: 2, status: 'normal', isMoving: false },
      { id: 'W004', name: 'Veli S.', position: { x: 65, y: 55 }, zone: 'Level 2 - East', heartRate: 88, oxygenLevel: 19.5, bodyTemp: 37.1, proximityToRisk: 25, depthLayer: 2, status: 'warning', isMoving: true },
      { id: 'W005', name: 'Hasan B.', position: { x: 40, y: 80 }, zone: 'Level 3 - West', heartRate: 72, oxygenLevel: 19.8, bodyTemp: 36.6, proximityToRisk: 40, depthLayer: 3, status: 'normal', isMoving: true },
      { id: 'W006', name: 'Huseyin A.', position: { x: 60, y: 80 }, zone: 'Level 3 - East', heartRate: 95, oxygenLevel: 19.2, bodyTemp: 37.3, proximityToRisk: 15, depthLayer: 3, status: 'warning', isMoving: false },
    ];
    setWorkers(initialWorkers);

    const initialHazards: HazardZone[] = [
      { id: 'H001', type: 'methane', position: { x: 30, y: 80 }, radius: 12, level: 35 },
      { id: 'H002', type: 'co', position: { x: 75, y: 55 }, radius: 8, level: 25 },
    ];
    setHazards(initialHazards);
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isSimulating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      // Move workers
      setWorkers((prev) =>
        prev.map((worker) => {
          if (!worker.isMoving && !evacuationMode) return worker;

          // Calculate movement
          let newX = worker.position.x;
          let newY = worker.position.y;

          if (evacuationMode) {
            // Move towards exit (top)
            if (worker.position.y > 10) {
              newY -= 0.5;
            }
            if (worker.position.x < 50) {
              newX += 0.3;
            } else if (worker.position.x > 50) {
              newX -= 0.3;
            }
          } else {
            // Random movement within tunnel
            newX += (Math.random() - 0.5) * 2;
            newY += (Math.random() - 0.5) * 0.5;
          }

          // Clamp to bounds
          newX = Math.max(15, Math.min(85, newX));
          newY = Math.max(5, Math.min(85, newY));

          // Update biometrics
          const hrChange = (Math.random() - 0.5) * 5;
          const newHR = Math.max(60, Math.min(120, worker.heartRate + hrChange));
          const o2Change = (Math.random() - 0.5) * 0.3;
          const newO2 = Math.max(18.0, Math.min(21.0, worker.oxygenLevel + o2Change));
          const tempChange = (Math.random() - 0.5) * 0.2;
          const newBodyTemp = Math.max(35.5, Math.min(39.0, worker.bodyTemp + tempChange));

          // Determine depth layer from Y position
          const depthLayer = newY < 40 ? 1 : newY < 65 ? 2 : 3;

          // Check status
          let status: Worker['status'] = 'normal';
          if (newHR > 100 || evacuationMode || newO2 < 19.0 || newBodyTemp > 38.0) status = 'warning';

          // Check if in hazard zone
          hazards.forEach((hazard) => {
            const dx = worker.position.x - hazard.position.x;
            const dy = worker.position.y - hazard.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < hazard.radius && hazard.level > 50) {
              status = 'emergency';
            }
          });

          // Compute proximity to nearest hazard
          let minDist = 100;
          hazards.forEach((hazard) => {
            const dx = newX - hazard.position.x;
            const dy = newY - hazard.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) minDist = dist;
          });
          const proximityToRisk = Math.max(0, Math.min(100, 100 - minDist * 2));

          return {
            ...worker,
            position: { x: newX, y: newY },
            heartRate: Math.round(newHR),
            oxygenLevel: Math.round(newO2 * 10) / 10,
            bodyTemp: Math.round(newBodyTemp * 10) / 10,
            proximityToRisk: Math.round(proximityToRisk),
            depthLayer,
            status,
          };
        })
      );

      // Update hazard levels
      setHazards((prev) =>
        prev.map((hazard) => ({
          ...hazard,
          level: Math.max(0, Math.min(100, hazard.level + (Math.random() - 0.4) * 5)),
          radius: 8 + (hazard.level / 100) * 8,
        }))
      );
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating, evacuationMode, hazards]);

  const selectedWorkerData = workers.find((w) => w.id === selectedWorker);
  const activeAlerts = workers.filter((w) => w.status !== 'normal').length;
  const dangerousHazards = hazards.filter((h) => h.level > 50).length;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        backgroundColor: THEME.background,
        border: `3px solid ${THEME.primary}`,
        boxShadow: `0 0 20px ${THEME.primary}30, inset 0 0 40px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Header - Ruggedized style */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: THEME.primary, color: '#000' }}
      >
        <div className="flex items-center gap-3">
          <HardHat size={20} />
          <span className="font-bold uppercase tracking-wider text-sm">
            MINEGUARD {lang === 'tr' ? 'DIJITAL IKIZ' : 'DIGITAL TWIN'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users size={14} />
            <span className="font-mono">{workers.length}</span>
          </div>
          {activeAlerts > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-red-600 rounded text-white text-xs font-bold">
              <AlertTriangle size={12} />
              {activeAlerts}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 p-4">
        {/* Left: Cross-Section View */}
        <div className="lg:col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
          {/* Ground surface */}
          <div className="absolute top-0 left-0 right-0 h-[5%]" style={{ backgroundColor: '#3D3D3D' }}>
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: THEME.primary }} />
          </div>

          {/* Rock texture background */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, #1a1a1a 1px, transparent 1px),
                radial-gradient(circle at 60% 50%, #1a1a1a 1px, transparent 1px),
                radial-gradient(circle at 80% 70%, #1a1a1a 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Mine shafts */}
          <svg className="absolute inset-0 w-full h-full">
            {SHAFTS.map((shaft) => (
              <g key={shaft.id}>
                {/* Tunnel outline */}
                <line
                  x1={`${shaft.path[0].x}%`}
                  y1={`${shaft.path[0].y}%`}
                  x2={`${shaft.path[1].x}%`}
                  y2={`${shaft.path[1].y}%`}
                  stroke={THEME.primary}
                  strokeWidth="20"
                  strokeLinecap="round"
                  opacity={0.15}
                />
                {/* Tunnel core */}
                <line
                  x1={`${shaft.path[0].x}%`}
                  y1={`${shaft.path[0].y}%`}
                  x2={`${shaft.path[1].x}%`}
                  y2={`${shaft.path[1].y}%`}
                  stroke={THEME.secondary}
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                {/* Center line */}
                <line
                  x1={`${shaft.path[0].x}%`}
                  y1={`${shaft.path[0].y}%`}
                  x2={`${shaft.path[1].x}%`}
                  y2={`${shaft.path[1].y}%`}
                  stroke={THEME.border}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
              </g>
            ))}
          </svg>

          {/* Hazard zones (gas clouds) */}
          {hazards.map((hazard) => (
            <motion.div
              key={hazard.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${hazard.position.x}%`,
                top: `${hazard.position.y}%`,
                transform: 'translate(-50%, -50%)',
                width: `${hazard.radius * 2}%`,
                height: `${hazard.radius * 2}%`,
                background: `radial-gradient(circle, ${GAS_LABELS[hazard.type].color}40 0%, transparent 70%)`,
                boxShadow: hazard.level > 50 ? `0 0 30px ${GAS_LABELS[hazard.type].color}50` : 'none',
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{ repeat: Infinity, duration: 2 + Math.random() }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded text-[10px] font-mono"
                style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: GAS_LABELS[hazard.type].color }}
              >
                <Wind size={10} className="inline mr-1" />
                {hazard.level.toFixed(0)}%
              </div>
            </motion.div>
          ))}

          {/* Workers */}
          {workers.map((worker) => (
            <motion.button
              key={worker.id}
              className="absolute z-10"
              style={{
                left: `${worker.position.x}%`,
                top: `${worker.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => setSelectedWorker(selectedWorker === worker.id ? null : worker.id)}
              animate={{
                scale: selectedWorker === worker.id ? 1.3 : 1,
              }}
            >
              {/* Worker dot */}
              <motion.div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    worker.status === 'emergency'
                      ? THEME.danger
                      : worker.status === 'warning'
                      ? THEME.warning
                      : THEME.safe,
                  boxShadow:
                    worker.status !== 'normal'
                      ? `0 0 10px ${worker.status === 'emergency' ? THEME.danger : THEME.warning}`
                      : 'none',
                }}
                animate={
                  worker.status === 'emergency'
                    ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                    : undefined
                }
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <HardHat size={8} color="#000" />
              </motion.div>

              {/* Worker label (when selected) */}
              {selectedWorker === worker.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-[10px] whitespace-nowrap"
                  style={{ backgroundColor: 'rgba(0,0,0,0.9)', border: `1px solid ${THEME.primary}` }}
                >
                  <span style={{ color: THEME.primary }}>{worker.id}</span>
                  <span className="text-white ml-1">{worker.name}</span>
                </motion.div>
              )}
            </motion.button>
          ))}

          {/* Exit indicator */}
          <div className="absolute top-[2%] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <ArrowUp size={20} style={{ color: THEME.primary }} />
            </motion.div>
            <span className="text-[10px] font-mono" style={{ color: THEME.primary }}>
              {lang === 'tr' ? 'ÇIKIŞ' : 'EXIT'}
            </span>
          </div>

          {/* Tunnel Depth Layer indicators */}
          {[
            { level: 1, y: 30, label: '-100m', layerName: lang === 'tr' ? 'KATMAN 1' : 'LAYER 1' },
            { level: 2, y: 55, label: '-200m', layerName: lang === 'tr' ? 'KATMAN 2' : 'LAYER 2' },
            { level: 3, y: 80, label: '-300m', layerName: lang === 'tr' ? 'KATMAN 3' : 'LAYER 3' },
          ].map((l) => {
            const workersAtLayer = workers.filter((w) => w.depthLayer === l.level).length;
            return (
              <div
                key={l.level}
                className="absolute left-2 flex items-center gap-2"
                style={{ top: `${l.y}%` }}
              >
                <div className="text-[10px] font-mono" style={{ color: THEME.primary }}>{l.layerName}</div>
                <div className="text-[9px] font-mono" style={{ color: THEME.muted }}>{l.label}</div>
                <div className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: `${THEME.primary}20`, color: THEME.primary }}>
                  {workersAtLayer}
                </div>
              </div>
            );
          })}

          {/* Evacuation overlay */}
          <AnimatePresence>
            {evacuationMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(239,68,68,0.1)' }} />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(239,68,68,0.9)' }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-white font-bold">
                    <AlertTriangle size={24} />
                    <span>{lang === 'tr' ? 'ACIL TAHLIYE' : 'EMERGENCY EVACUATION'}</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Info Panel */}
        <div className="flex flex-col gap-3">
          {/* Worker List */}
          <div className="p-3 rounded-xl" style={{ backgroundColor: THEME.secondary, border: `1px solid ${THEME.border}` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase" style={{ color: THEME.primary }}>
                {lang === 'tr' ? 'Aktif Personel' : 'Active Personnel'}
              </span>
              <Users size={12} style={{ color: THEME.muted }} />
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {workers.map((worker) => (
                <button
                  key={worker.id}
                  onClick={() => setSelectedWorker(selectedWorker === worker.id ? null : worker.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                    selectedWorker === worker.id ? 'ring-1' : ''
                  }`}
                  style={{
                    backgroundColor: selectedWorker === worker.id ? `${THEME.primary}15` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          worker.status === 'emergency'
                            ? THEME.danger
                            : worker.status === 'warning'
                            ? THEME.warning
                            : THEME.safe,
                      }}
                    />
                    <span className="text-xs text-white">{worker.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart
                      size={10}
                      style={{
                        color: worker.heartRate > 90 ? THEME.danger : THEME.safe,
                      }}
                    />
                    <span className="text-[10px] font-mono" style={{ color: THEME.muted }}>
                      {worker.heartRate}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bio-Metric & Environment HUD */}
          {selectedWorkerData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 rounded-xl"
              style={{ backgroundColor: THEME.secondary, border: `1px solid ${THEME.primary}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">{selectedWorkerData.name}</span>
                <span className="text-[10px] font-mono" style={{ color: THEME.primary }}>
                  {selectedWorkerData.id}
                </span>
              </div>
              <div className="text-[9px] font-mono uppercase tracking-wider mb-2" style={{ color: THEME.primary }}>
                {lang === 'tr' ? 'BİYOMETRİK & ORTAM HUD' : 'BIO-METRIC & ENVIRONMENT HUD'}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <div className="text-[10px]" style={{ color: THEME.muted }}>
                    <Heart size={8} className="inline mr-1" />
                    {lang === 'tr' ? 'Nabız' : 'Heart Rate'}
                  </div>
                  <div className="font-mono font-bold" style={{ color: selectedWorkerData.heartRate > 100 ? THEME.danger : THEME.primary }}>
                    {selectedWorkerData.heartRate} BPM
                  </div>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <div className="text-[10px]" style={{ color: THEME.muted }}>
                    <Wind size={8} className="inline mr-1" />
                    {lang === 'tr' ? 'O₂ Seviyesi' : 'O₂ Level'}
                  </div>
                  <div className="font-mono font-bold" style={{ color: selectedWorkerData.oxygenLevel < 19.5 ? THEME.danger : THEME.safe }}>
                    {selectedWorkerData.oxygenLevel}%
                  </div>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <div className="text-[10px]" style={{ color: THEME.muted }}>
                    {lang === 'tr' ? 'Vücut Sıcaklığı' : 'Body Temp'}
                  </div>
                  <div className="font-mono font-bold" style={{ color: selectedWorkerData.bodyTemp > 37.5 ? THEME.warning : THEME.safe }}>
                    {selectedWorkerData.bodyTemp}°C
                  </div>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <div className="text-[10px]" style={{ color: THEME.muted }}>
                    {lang === 'tr' ? 'Risk Yakınlığı' : 'Risk Proximity'}
                  </div>
                  <div className="font-mono font-bold" style={{ color: selectedWorkerData.proximityToRisk > 60 ? THEME.danger : selectedWorkerData.proximityToRisk > 30 ? THEME.warning : THEME.safe }}>
                    {selectedWorkerData.proximityToRisk}%
                  </div>
                </div>
                <div className="p-2 rounded col-span-2" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <div className="text-[10px]" style={{ color: THEME.muted }}>
                    <MapPin size={8} className="inline mr-1" />
                    {lang === 'tr' ? 'Konum' : 'Location'}
                  </div>
                  <div className="font-mono text-white">
                    {selectedWorkerData.zone} · {lang === 'tr' ? 'Derinlik' : 'Depth'} {selectedWorkerData.depthLayer === 1 ? '-100m' : selectedWorkerData.depthLayer === 2 ? '-200m' : '-300m'}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Hazard Summary */}
          <div className="p-3 rounded-xl" style={{ backgroundColor: THEME.secondary, border: `1px solid ${THEME.border}` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase" style={{ color: THEME.primary }}>
                {lang === 'tr' ? 'Gaz Seviyeleri' : 'Gas Levels'}
              </span>
              <Wind size={12} style={{ color: THEME.muted }} />
            </div>
            <div className="space-y-2">
              {hazards.map((hazard) => (
                <div key={hazard.id} className="flex items-center justify-between">
                  <span className="text-[10px]" style={{ color: GAS_LABELS[hazard.type].color }}>
                    {GAS_LABELS[hazard.type][lang]}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: THEME.border }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${hazard.level}%`,
                          backgroundColor: GAS_LABELS[hazard.type].color,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono w-8 text-right" style={{ color: THEME.muted }}>
                      {hazard.level.toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="p-3 rounded-xl mt-auto" style={{ backgroundColor: THEME.secondary, border: `1px solid ${THEME.border}` }}>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className="px-3 py-2 rounded-lg font-mono text-xs uppercase transition-colors"
                style={{
                  backgroundColor: isSimulating ? THEME.danger : THEME.primary,
                  color: '#000',
                }}
              >
                {isSimulating ? (lang === 'tr' ? 'DURDUR' : 'STOP') : (lang === 'tr' ? 'BAŞLAT' : 'START')}
              </button>
              <button
                onClick={() => setEvacuationMode(!evacuationMode)}
                className={`px-3 py-2 rounded-lg font-mono text-xs uppercase transition-colors ${
                  evacuationMode ? 'animate-pulse' : ''
                }`}
                style={{
                  backgroundColor: evacuationMode ? THEME.danger : THEME.border,
                  color: evacuationMode ? '#FFF' : THEME.muted,
                }}
              >
                {lang === 'tr' ? 'TAHLİYE' : 'EVACUATE'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Corner hazard stripes */}
      <div
        className="absolute top-0 left-0 w-8 h-8"
        style={{
          background: `repeating-linear-gradient(45deg, ${THEME.primary}, ${THEME.primary} 4px, #000 4px, #000 8px)`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-8 h-8"
        style={{
          background: `repeating-linear-gradient(-45deg, ${THEME.primary}, ${THEME.primary} 4px, #000 4px, #000 8px)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-8 h-8"
        style={{
          background: `repeating-linear-gradient(-45deg, ${THEME.primary}, ${THEME.primary} 4px, #000 4px, #000 8px)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-8 h-8"
        style={{
          background: `repeating-linear-gradient(45deg, ${THEME.primary}, ${THEME.primary} 4px, #000 4px, #000 8px)`,
        }}
      />
    </div>
  );
}
