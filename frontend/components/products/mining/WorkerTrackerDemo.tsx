'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Heart, Wind, MapPin, User, Activity, Radio } from 'lucide-react';
import type { Locale } from '@/types';

interface WorkerTrackerDemoProps {
  lang?: Locale;
  className?: string;
}

interface Worker {
  id: string;
  name: string;
  x: number;
  y: number;
  heartRate: number;
  gasLevel: number;
  status: 'normal' | 'warning' | 'emergency';
  sector: string;
  depth: number;
}

const initialWorkers: Worker[] = [
  { id: 'w1', name: 'Ahmet K.', x: 25, y: 30, heartRate: 72, gasLevel: 0.2, status: 'normal', sector: 'A', depth: -150 },
  { id: 'w2', name: 'Mehmet Y.', x: 45, y: 45, heartRate: 85, gasLevel: 0.3, status: 'normal', sector: 'B', depth: -200 },
  { id: 'w3', name: 'Ali D.', x: 70, y: 35, heartRate: 78, gasLevel: 0.5, status: 'normal', sector: 'C', depth: -180 },
  { id: 'w4', name: 'Hasan T.', x: 55, y: 70, heartRate: 92, gasLevel: 0.8, status: 'warning', sector: 'D', depth: -250 },
  { id: 'w5', name: 'Veli S.', x: 30, y: 60, heartRate: 68, gasLevel: 0.1, status: 'normal', sector: 'A', depth: -175 },
];

const tunnelPaths = [
  'M 10,30 L 40,30 L 50,50 L 80,50',
  'M 50,50 L 50,75 L 70,75',
  'M 40,30 L 40,60 L 20,60',
  'M 80,50 L 80,30 L 60,30',
];

export default function WorkerTrackerDemo({ lang = 'tr', className = '' }: WorkerTrackerDemoProps) {
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [emergencyPath, setEmergencyPath] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Worker simulation
  useEffect(() => {
    if (!isSimulating) return;

    intervalRef.current = setInterval(() => {
      setWorkers(prev => prev.map(worker => {
        // Random movement
        const dx = (Math.random() - 0.5) * 3;
        const dy = (Math.random() - 0.5) * 3;
        let newX = Math.max(10, Math.min(90, worker.x + dx));
        let newY = Math.max(20, Math.min(80, worker.y + dy));

        // Random vital changes
        const hrChange = (Math.random() - 0.5) * 10;
        let newHR = Math.max(60, Math.min(130, worker.heartRate + hrChange));

        const gasChange = (Math.random() - 0.4) * 0.2;
        let newGas = Math.max(0, Math.min(2, worker.gasLevel + gasChange));

        // Determine status
        let status: Worker['status'] = 'normal';
        if (newHR > 110 || newGas > 1.5) {
          status = 'emergency';
        } else if (newHR > 95 || newGas > 0.8) {
          status = 'warning';
        }

        return {
          ...worker,
          x: newX,
          y: newY,
          heartRate: Math.round(newHR),
          gasLevel: Math.round(newGas * 100) / 100,
          status,
        };
      }));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating]);

  // Show emergency escape route
  const showEmergencyRoute = (worker: Worker) => {
    setEmergencyPath(`M ${worker.x},${worker.y} L ${worker.x},20 L 10,20 L 10,10`);
    setTimeout(() => setEmergencyPath(null), 5000);
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

  return (
    <div className={`relative bg-onyx-900 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Radio size={16} className="text-yellow-500" />
          <span className="text-offwhite-400 text-sm font-medium">
            {lang === 'tr' ? 'MineGuard Radar' : 'MineGuard Radar'}
          </span>
          <span className="text-offwhite-800 text-xs">
            {workers.length} {lang === 'tr' ? 'aktif isci' : 'active workers'}
          </span>
        </div>
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isSimulating
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}
        >
          {isSimulating
            ? (lang === 'tr' ? 'Durdur' : 'Stop')
            : (lang === 'tr' ? 'Canli Mod' : 'Live Mode')}
        </button>
      </div>

      {/* Radar View */}
      <div className="relative aspect-[4/3] p-4">
        {/* Mine Map Background */}
        <div className="absolute inset-4 bg-onyx-950 rounded-xl overflow-hidden">
          {/* Radar sweep effect */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(234, 179, 8, 0.1) 30deg, transparent 60deg)',
            }}
          />

          {/* Grid */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Tunnel paths */}
            {tunnelPaths.map((path, i) => (
              <path
                key={i}
                d={path}
                fill="none"
                stroke="rgba(234, 179, 8, 0.3)"
                strokeWidth="8"
                strokeLinecap="round"
                className="transform scale-[1.1] origin-center"
              />
            ))}

            {/* Emergency escape route */}
            {emergencyPath && (
              <motion.path
                d={emergencyPath}
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                className="transform scale-[1.1] origin-center"
              />
            )}

            {/* Grid circles */}
            {[20, 40, 60, 80].map(r => (
              <circle
                key={r}
                cx="50%"
                cy="50%"
                r={`${r / 2}%`}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            ))}

            {/* Cross lines */}
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.05)" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.05)" />
          </svg>

          {/* Sector labels */}
          {['A', 'B', 'C', 'D'].map((sector, i) => (
            <div
              key={sector}
              className="absolute text-yellow-500/50 text-xs font-mono"
              style={{
                left: `${20 + (i % 2) * 60}%`,
                top: `${20 + Math.floor(i / 2) * 50}%`,
              }}
            >
              {lang === 'tr' ? 'Sektor' : 'Sector'} {sector}
            </div>
          ))}

          {/* Workers */}
          {workers.map(worker => (
            <motion.div
              key={worker.id}
              className="absolute cursor-pointer"
              style={{
                left: `${worker.x}%`,
                top: `${worker.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: worker.status === 'emergency' ? [1, 1.3, 1] : 1,
              }}
              transition={{ repeat: worker.status === 'emergency' ? Infinity : 0, duration: 0.5 }}
              onClick={() => {
                setSelectedWorker(worker);
                if (worker.status === 'emergency') {
                  showEmergencyRoute(worker);
                }
              }}
            >
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: -12,
                  marginTop: -12,
                  backgroundColor: getStatusColor(worker.status),
                }}
              />

              {/* Worker dot */}
              <div
                className="relative w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  backgroundColor: getStatusColor(worker.status),
                  borderColor: 'white',
                }}
              >
                <User size={8} className="text-white" />
              </div>

              {/* Name label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] text-offwhite-600 whitespace-nowrap">
                {worker.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alert Banner */}
        <AnimatePresence>
          {emergencyWorkers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg"
            >
              <AlertTriangle size={16} className="text-red-400 animate-pulse" />
              <span className="text-red-400 text-sm font-medium">
                {lang === 'tr' ? 'ACIL DURUM!' : 'EMERGENCY!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Worker Details Panel */}
      <AnimatePresence>
        {selectedWorker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-onyx-800/50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${getStatusColor(selectedWorker.status)}20` }}
                  >
                    <User size={20} style={{ color: getStatusColor(selectedWorker.status) }} />
                  </div>
                  <div>
                    <div className="text-offwhite-400 font-medium">{selectedWorker.name}</div>
                    <div className="text-offwhite-800 text-xs">
                      {lang === 'tr' ? 'Sektor' : 'Sector'} {selectedWorker.sector} • {selectedWorker.depth}m
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWorker(null)}
                  className="text-offwhite-700 hover:text-offwhite-400"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-onyx-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart size={14} className="text-red-400" />
                    <span className="text-offwhite-700 text-xs">
                      {lang === 'tr' ? 'Nabiz' : 'Heart Rate'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-mono font-bold text-offwhite-400">
                      {selectedWorker.heartRate}
                    </span>
                    <span className="text-offwhite-700 text-xs">bpm</span>
                  </div>
                  {/* Mini heart rate graph */}
                  <div className="mt-2 flex items-end gap-0.5 h-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-red-500/50 rounded-t"
                        animate={{
                          height: `${30 + Math.random() * 70}%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-onyx-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind size={14} className="text-cyan-400" />
                    <span className="text-offwhite-700 text-xs">
                      {lang === 'tr' ? 'Gaz Seviyesi' : 'Gas Level'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-mono font-bold text-offwhite-400">
                      {selectedWorker.gasLevel}
                    </span>
                    <span className="text-offwhite-700 text-xs">ppm</span>
                  </div>
                  <div className="mt-2 h-2 bg-onyx-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: selectedWorker.gasLevel > 1 ? '#EF4444' :
                                        selectedWorker.gasLevel > 0.5 ? '#EAB308' : '#22C55E',
                      }}
                      animate={{ width: `${Math.min(selectedWorker.gasLevel / 2 * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {selectedWorker.status === 'emergency' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full mt-3 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm font-medium flex items-center justify-center gap-2"
                  onClick={() => showEmergencyRoute(selectedWorker)}
                >
                  <MapPin size={16} />
                  {lang === 'tr' ? 'Kacis Rotasini Goster' : 'Show Escape Route'}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="p-4 border-t border-white/10 bg-onyx-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-offwhite-700 text-xs">
                {workers.filter(w => w.status === 'normal').length} {lang === 'tr' ? 'Normal' : 'Normal'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-offwhite-700 text-xs">
                {warningWorkers.length} {lang === 'tr' ? 'Uyari' : 'Warning'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-offwhite-700 text-xs">
                {emergencyWorkers.length} {lang === 'tr' ? 'Acil' : 'Emergency'}
              </span>
            </div>
          </div>
          <div className="text-offwhite-800 text-xs font-mono">
            MineGuard v3.0
          </div>
        </div>
      </div>
    </div>
  );
}
