'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { AlertTriangle, Heart, Wind, MapPin, User, Activity, Radio, Compass, Waves, Shield, Zap } from 'lucide-react';
import type { Locale } from '@/types';

interface WorkerTrackerDemoProps {
  lang?: Locale;
  className?: string;
  compact?: boolean;
}

interface Worker {
  id: string;
  name: string;
  x: number;
  y: number;
  heartRate: number;
  gasLevel: number;
  o2Level: number;
  temperature: number;
  status: 'normal' | 'warning' | 'emergency';
  sector: string;
  depth: number;
  lastPing: number;
}

interface TunnelSegment {
  path: string;
  depth: number;
  width: number;
}

const initialWorkers: Worker[] = [
  { id: 'w1', name: 'Ahmet K.', x: 25, y: 30, heartRate: 72, gasLevel: 0.2, o2Level: 20.8, temperature: 22, status: 'normal', sector: 'A', depth: -150, lastPing: Date.now() },
  { id: 'w2', name: 'Mehmet Y.', x: 45, y: 45, heartRate: 85, gasLevel: 0.3, o2Level: 20.5, temperature: 24, status: 'normal', sector: 'B', depth: -200, lastPing: Date.now() },
  { id: 'w3', name: 'Ali D.', x: 70, y: 35, heartRate: 78, gasLevel: 0.5, o2Level: 20.2, temperature: 25, status: 'normal', sector: 'C', depth: -180, lastPing: Date.now() },
  { id: 'w4', name: 'Hasan T.', x: 55, y: 70, heartRate: 92, gasLevel: 0.8, o2Level: 19.8, temperature: 28, status: 'warning', sector: 'D', depth: -250, lastPing: Date.now() },
  { id: 'w5', name: 'Veli S.', x: 30, y: 60, heartRate: 68, gasLevel: 0.1, o2Level: 21.0, temperature: 21, status: 'normal', sector: 'A', depth: -175, lastPing: Date.now() },
];

// More detailed tunnel structure with depth information
const tunnelSegments: TunnelSegment[] = [
  { path: 'M 5,30 L 40,30 L 50,50 L 85,50', depth: -150, width: 8 },
  { path: 'M 50,50 L 50,80', depth: -200, width: 6 },
  { path: 'M 50,80 L 75,80', depth: -250, width: 5 },
  { path: 'M 40,30 L 40,65 L 15,65', depth: -175, width: 6 },
  { path: 'M 85,50 L 85,25 L 60,25', depth: -180, width: 7 },
];

const radarScanLines = Array.from({ length: 8 }).map((_, i) => i * 45);

export default function WorkerTrackerDemo({ lang = 'tr', className = '', compact = false }: WorkerTrackerDemoProps) {
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isSimulating, setIsSimulating] = useState(true);
  const [emergencyPath, setEmergencyPath] = useState<string | null>(null);
  const [radarAngle, setRadarAngle] = useState(0);
  const [showDepthView, setShowDepthView] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const radarRef = useRef<NodeJS.Timeout | null>(null);

  // Radar rotation
  useEffect(() => {
    radarRef.current = setInterval(() => {
      setRadarAngle(prev => (prev + 2) % 360);
    }, 50);
    return () => {
      if (radarRef.current) clearInterval(radarRef.current);
    };
  }, []);

  // Worker simulation
  useEffect(() => {
    if (!isSimulating) return;

    intervalRef.current = setInterval(() => {
      setWorkers(prev => prev.map(worker => {
        // Random movement
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
        let newX = Math.max(10, Math.min(90, worker.x + dx));
        let newY = Math.max(20, Math.min(85, worker.y + dy));

        // Random vital changes
        const hrChange = (Math.random() - 0.5) * 8;
        let newHR = Math.max(55, Math.min(140, worker.heartRate + hrChange));

        const gasChange = (Math.random() - 0.4) * 0.15;
        let newGas = Math.max(0, Math.min(2.5, worker.gasLevel + gasChange));

        const o2Change = (Math.random() - 0.5) * 0.3;
        let newO2 = Math.max(17, Math.min(21, worker.o2Level + o2Change));

        const tempChange = (Math.random() - 0.5) * 1;
        let newTemp = Math.max(18, Math.min(35, worker.temperature + tempChange));

        // Determine status based on multiple factors
        let status: Worker['status'] = 'normal';
        if (newHR > 115 || newGas > 1.5 || newO2 < 18 || newTemp > 32) {
          status = 'emergency';
        } else if (newHR > 100 || newGas > 0.8 || newO2 < 19 || newTemp > 28) {
          status = 'warning';
        }

        return {
          ...worker,
          x: newX,
          y: newY,
          heartRate: Math.round(newHR),
          gasLevel: Math.round(newGas * 100) / 100,
          o2Level: Math.round(newO2 * 10) / 10,
          temperature: Math.round(newTemp),
          status,
          lastPing: Date.now(),
        };
      }));
    }, 1500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating]);

  // Show emergency escape route
  const showEmergencyRoute = (worker: Worker) => {
    // Calculate optimal escape path
    const escapePath = `M ${worker.x},${worker.y} Q ${worker.x - 10},${worker.y - 15} ${(worker.x + 10) / 2},20 L 10,20 L 5,10`;
    setEmergencyPath(escapePath);
    setTimeout(() => setEmergencyPath(null), 8000);
  };

  const getStatusColor = (status: Worker['status']) => {
    switch (status) {
      case 'emergency': return '#EF4444';
      case 'warning': return '#EAB308';
      default: return '#22C55E';
    }
  };

  const emergencyWorkers = workers.filter(w => w.status === 'emergency');
  const warningWorkers = workers.filter(w => w.status === 'warning');

  // Calculate radar ping effect for each worker
  const getWorkerRadarIntensity = (worker: Worker) => {
    const workerAngle = Math.atan2(worker.y - 50, worker.x - 50) * (180 / Math.PI) + 180;
    const diff = Math.abs(((radarAngle - workerAngle + 180 + 360) % 360) - 180);
    return diff < 30 ? 1 - diff / 30 : 0;
  };

  return (
    <div className={`relative bg-onyx-900 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-onyx-800/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Radio size={compact ? 14 : 16} className="text-yellow-500" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-yellow-500/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-offwhite-400 text-xs sm:text-sm font-medium">MineGuard</span>
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30">
            <Zap size={10} className="text-yellow-500" />
            <span className="text-yellow-500 text-[10px] font-mono">{workers.length} ACTIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDepthView(!showDepthView)}
            className={`p-1.5 sm:p-2 rounded-lg text-xs transition-colors ${
              showDepthView ? 'bg-yellow-500/20 text-yellow-400' : 'bg-onyx-700/50 text-offwhite-600 hover:text-offwhite-400'
            }`}
          >
            <Compass size={compact ? 12 : 14} />
          </button>
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
              isSimulating
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-onyx-700 text-offwhite-600 border border-white/10'
            }`}
          >
            {isSimulating ? (lang === 'tr' ? 'CANLI' : 'LIVE') : (lang === 'tr' ? 'DURDURULDU' : 'PAUSED')}
          </button>
        </div>
      </div>

      {/* Radar View */}
      <div className={`relative ${compact ? 'aspect-square' : 'aspect-[4/3]'} p-2 sm:p-4`}>
        {/* Mine Map Background */}
        <div className="absolute inset-2 sm:inset-4 bg-onyx-950 rounded-xl overflow-hidden border border-yellow-500/20">
          {/* Radar sweep effect with glow */}
          <motion.div
            className="absolute inset-0 origin-center"
            style={{ rotate: radarAngle }}
          >
            <div
              className="absolute top-1/2 left-1/2 w-1/2 h-1"
              style={{
                transformOrigin: 'left center',
                background: 'linear-gradient(90deg, rgba(234, 179, 8, 0.6) 0%, transparent 100%)',
                boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)',
              }}
            />
            {/* Radar cone glow */}
            <div
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: '50%',
                height: '100px',
                marginTop: '-50px',
                background: 'conic-gradient(from -5deg, transparent 0deg, rgba(234, 179, 8, 0.15) 5deg, rgba(234, 179, 8, 0.08) 15deg, transparent 30deg)',
                filter: 'blur(2px)',
              }}
            />
          </motion.div>

          {/* SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              {/* Gradient for tunnel depth */}
              <linearGradient id="tunnelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(234, 179, 8, 0.4)" />
                <stop offset="50%" stopColor="rgba(234, 179, 8, 0.2)" />
                <stop offset="100%" stopColor="rgba(234, 179, 8, 0.4)" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Radar scan line gradient */}
              <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(234, 179, 8, 0)" />
                <stop offset="70%" stopColor="rgba(234, 179, 8, 0.1)" />
                <stop offset="100%" stopColor="rgba(234, 179, 8, 0.3)" />
              </radialGradient>
            </defs>

            {/* Concentric radar circles */}
            {[15, 30, 45].map((r, i) => (
              <circle
                key={r}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="rgba(234, 179, 8, 0.15)"
                strokeWidth="0.5"
                strokeDasharray="2,4"
              />
            ))}

            {/* Cross lines */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(234, 179, 8, 0.1)" strokeWidth="0.5" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(234, 179, 8, 0.1)" strokeWidth="0.5" />

            {/* Diagonal lines */}
            <line x1="15" y1="15" x2="85" y2="85" stroke="rgba(234, 179, 8, 0.05)" strokeWidth="0.5" />
            <line x1="85" y1="15" x2="15" y2="85" stroke="rgba(234, 179, 8, 0.05)" strokeWidth="0.5" />

            {/* Tunnel paths with depth-based opacity */}
            {tunnelSegments.map((segment, i) => (
              <g key={i}>
                {/* Tunnel glow */}
                <path
                  d={segment.path}
                  fill="none"
                  stroke="rgba(234, 179, 8, 0.3)"
                  strokeWidth={segment.width + 4}
                  strokeLinecap="round"
                  filter="url(#glow)"
                  opacity={0.3}
                />
                {/* Main tunnel */}
                <path
                  d={segment.path}
                  fill="none"
                  stroke="url(#tunnelGradient)"
                  strokeWidth={segment.width}
                  strokeLinecap="round"
                />
                {/* Tunnel center line */}
                <path
                  d={segment.path}
                  fill="none"
                  stroke="rgba(234, 179, 8, 0.1)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="3,3"
                />
              </g>
            ))}

            {/* Emergency escape route */}
            {emergencyPath && (
              <motion.g>
                {/* Route glow */}
                <motion.path
                  d={emergencyPath}
                  fill="none"
                  stroke="rgba(34, 197, 94, 0.5)"
                  strokeWidth="4"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
                {/* Main route */}
                <motion.path
                  d={emergencyPath}
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  initial={{ pathLength: 0, strokeDashoffset: 0 }}
                  animate={{ pathLength: 1, strokeDashoffset: -100 }}
                  transition={{
                    pathLength: { duration: 1.5 },
                    strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' }
                  }}
                />
                {/* Exit marker */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <circle cx="5" cy="10" r="4" fill="rgba(34, 197, 94, 0.3)" />
                  <text x="5" y="11" textAnchor="middle" fill="#22C55E" fontSize="4" fontWeight="bold">↑</text>
                </motion.g>
              </motion.g>
            )}
          </svg>

          {/* Sector labels */}
          {['A', 'B', 'C', 'D'].map((sector, i) => (
            <div
              key={sector}
              className="absolute text-yellow-500/40 text-[8px] sm:text-[10px] font-mono font-bold"
              style={{
                left: `${15 + (i % 2) * 65}%`,
                top: `${15 + Math.floor(i / 2) * 55}%`,
              }}
            >
              {sector}
            </div>
          ))}

          {/* Workers */}
          {workers.map(worker => {
            const radarIntensity = getWorkerRadarIntensity(worker);
            const isSelected = selectedWorker?.id === worker.id;

            return (
              <motion.div
                key={worker.id}
                className="absolute cursor-pointer z-10"
                style={{
                  left: `${worker.x}%`,
                  top: `${worker.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: worker.status === 'emergency' ? [1, 1.2, 1] : 1,
                }}
                transition={{ repeat: worker.status === 'emergency' ? Infinity : 0, duration: 0.5 }}
                onClick={() => {
                  setSelectedWorker(isSelected ? null : worker);
                  if (worker.status === 'emergency') {
                    showEmergencyRoute(worker);
                  }
                }}
              >
                {/* Radar ping effect */}
                {radarIntensity > 0 && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 40,
                      height: 40,
                      left: -20,
                      top: -20,
                      backgroundColor: getStatusColor(worker.status),
                      opacity: radarIntensity * 0.4,
                      filter: 'blur(8px)',
                    }}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                  />
                )}

                {/* Status pulse rings */}
                {(worker.status !== 'normal' || isSelected) && (
                  <>
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: 32,
                        height: 32,
                        left: -16,
                        top: -16,
                        border: `1px solid ${getStatusColor(worker.status)}`,
                      }}
                      animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: 32,
                        height: 32,
                        left: -16,
                        top: -16,
                        border: `1px solid ${getStatusColor(worker.status)}`,
                      }}
                      animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </>
                )}

                {/* Worker dot with icon */}
                <motion.div
                  className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: getStatusColor(worker.status),
                    border: `2px solid ${isSelected ? 'white' : 'rgba(255,255,255,0.5)'}`,
                    boxShadow: `0 0 ${isSelected ? 15 : 8}px ${getStatusColor(worker.status)}`,
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <User size={compact ? 8 : 10} className="text-white" />
                </motion.div>

                {/* Name label */}
                {!compact && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[8px] sm:text-[10px] text-offwhite-500 whitespace-nowrap font-medium"
                    style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
                  >
                    {worker.name.split(' ')[0]}
                  </div>
                )}

                {/* Mini vital indicator */}
                {isSelected && !compact && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-onyx-800/90 rounded text-[8px] text-offwhite-400 whitespace-nowrap border border-white/10"
                  >
                    <Heart size={8} className="inline mr-1 text-red-400" />
                    {worker.heartRate} bpm
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* Center radar point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full">
            <div className="absolute inset-0 rounded-full bg-yellow-500 animate-ping opacity-50" />
          </div>
        </div>

        {/* Alert Banner */}
        <AnimatePresence>
          {emergencyWorkers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <AlertTriangle size={compact ? 12 : 14} className="text-red-400" />
              </motion.div>
              <span className="text-red-400 text-[10px] sm:text-xs font-bold tracking-wide">
                {lang === 'tr' ? 'ACIL DURUM!' : 'EMERGENCY!'}
              </span>
              <span className="text-red-300 text-[10px] sm:text-xs">
                ({emergencyWorkers.length})
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Depth Scale (Right side) */}
        {showDepthView && !compact && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-6 top-6 bottom-6 w-8 flex flex-col items-center"
          >
            <div className="text-[8px] text-offwhite-600 mb-1">0m</div>
            <div className="flex-1 w-1 bg-gradient-to-b from-green-500 via-yellow-500 to-red-500 rounded-full relative">
              {workers.map(worker => (
                <motion.div
                  key={worker.id}
                  className="absolute w-3 h-1 rounded-full"
                  style={{
                    backgroundColor: getStatusColor(worker.status),
                    top: `${Math.abs(worker.depth) / 3}%`,
                    left: -1,
                    boxShadow: `0 0 6px ${getStatusColor(worker.status)}`,
                  }}
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
            </div>
            <div className="text-[8px] text-offwhite-600 mt-1">-300m</div>
          </motion.div>
        )}
      </div>

      {/* Worker Details Panel */}
      <AnimatePresence>
        {selectedWorker && !compact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-onyx-800/70 backdrop-blur-sm"
          >
            <div className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${getStatusColor(selectedWorker.status)}20`,
                      boxShadow: `0 0 15px ${getStatusColor(selectedWorker.status)}30`,
                    }}
                  >
                    <User size={compact ? 16 : 20} style={{ color: getStatusColor(selectedWorker.status) }} />
                  </div>
                  <div>
                    <div className="text-offwhite-400 text-sm sm:text-base font-medium">{selectedWorker.name}</div>
                    <div className="text-offwhite-700 text-[10px] sm:text-xs flex items-center gap-2">
                      <span>{lang === 'tr' ? 'Sektor' : 'Sector'} {selectedWorker.sector}</span>
                      <span className="text-yellow-500">{selectedWorker.depth}m</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWorker(null)}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-onyx-700 flex items-center justify-center text-offwhite-600 hover:text-offwhite-400 hover:bg-onyx-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {/* Heart Rate */}
                <div className="p-2 sm:p-3 bg-onyx-800 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Heart size={10} className="text-red-400" />
                    <span className="text-offwhite-700 text-[10px]">{lang === 'tr' ? 'Nabız' : 'Heart Rate'}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-mono font-bold text-offwhite-400">
                      {selectedWorker.heartRate}
                    </span>
                    <span className="text-offwhite-700 text-[10px]">bpm</span>
                  </div>
                  {/* Mini ECG */}
                  <div className="mt-1.5 flex items-center h-4 overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 20">
                      <motion.path
                        d="M0,10 L20,10 L25,10 L28,2 L32,18 L36,10 L40,10 L60,10 L65,10 L68,2 L72,18 L76,10 L80,10 L100,10"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Gas Level */}
                <div className="p-2 sm:p-3 bg-onyx-800 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Wind size={10} className="text-cyan-400" />
                    <span className="text-offwhite-700 text-[10px]">{lang === 'tr' ? 'Gaz' : 'Gas'}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-mono font-bold text-offwhite-400">
                      {selectedWorker.gasLevel}
                    </span>
                    <span className="text-offwhite-700 text-[10px]">ppm</span>
                  </div>
                  <div className="mt-1.5 h-1.5 bg-onyx-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: selectedWorker.gasLevel > 1.5 ? '#EF4444' :
                                        selectedWorker.gasLevel > 0.8 ? '#EAB308' : '#06B6D4',
                      }}
                      animate={{ width: `${Math.min(selectedWorker.gasLevel / 2 * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Oxygen */}
                <div className="p-2 sm:p-3 bg-onyx-800 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Waves size={10} className="text-blue-400" />
                    <span className="text-offwhite-700 text-[10px]">O₂</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-mono font-bold text-offwhite-400">
                      {selectedWorker.o2Level}
                    </span>
                    <span className="text-offwhite-700 text-[10px]">%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 bg-onyx-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-blue-400"
                      animate={{ width: `${(selectedWorker.o2Level / 21) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Temperature */}
                <div className="p-2 sm:p-3 bg-onyx-800 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Activity size={10} className="text-orange-400" />
                    <span className="text-offwhite-700 text-[10px]">{lang === 'tr' ? 'Sıcaklık' : 'Temp'}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-mono font-bold text-offwhite-400">
                      {selectedWorker.temperature}
                    </span>
                    <span className="text-offwhite-700 text-[10px]">°C</span>
                  </div>
                  <div className="mt-1.5 h-1.5 bg-onyx-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: selectedWorker.temperature > 30 ? '#EF4444' :
                                        selectedWorker.temperature > 26 ? '#F97316' : '#22C55E',
                      }}
                      animate={{ width: `${((selectedWorker.temperature - 15) / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {selectedWorker.status === 'emergency' && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-3 p-2 sm:p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-500/30 transition-colors"
                  onClick={() => showEmergencyRoute(selectedWorker)}
                >
                  <Shield size={14} />
                  {lang === 'tr' ? 'Kaçış Rotasını Göster' : 'Show Escape Route'}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="p-2 sm:p-3 border-t border-white/10 bg-onyx-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {[
              { status: 'normal', label: lang === 'tr' ? 'Normal' : 'Normal', color: '#22C55E' },
              { status: 'warning', label: lang === 'tr' ? 'Uyarı' : 'Warning', color: '#EAB308' },
              { status: 'emergency', label: lang === 'tr' ? 'Acil' : 'Emergency', color: '#EF4444' },
            ].map(item => (
              <div key={item.status} className="flex items-center gap-1 sm:gap-1.5">
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}50` }}
                />
                <span className="text-offwhite-600 text-[10px] sm:text-xs">
                  {workers.filter(w => w.status === item.status).length}
                </span>
              </div>
            ))}
          </div>
          <div className="text-offwhite-700 text-[10px] font-mono flex items-center gap-2">
            <span className="hidden sm:inline">MineGuard</span>
            <span className="text-yellow-500">v3.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
