'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Thermometer, Bell, Wifi, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/types';

interface HeatmapDemoProps {
  lang?: Locale;
  className?: string;
}

interface HotSpot {
  id: string;
  name: string;
  nameTr: string;
  x: number;
  y: number;
  baseTemp: number;
  currentTemp: number;
  threshold: number;
  isOverheating: boolean;
}

const initialHotSpots: HotSpot[] = [
  { id: 'mcu', name: 'MCU Core', nameTr: 'MCU Cekirdek', x: 35, y: 40, baseTemp: 45, currentTemp: 45, threshold: 85, isOverheating: false },
  { id: 'power', name: 'Power IC', nameTr: 'Guc IC', x: 65, y: 30, baseTemp: 55, currentTemp: 55, threshold: 90, isOverheating: false },
  { id: 'mosfet', name: 'MOSFET', nameTr: 'MOSFET', x: 75, y: 60, baseTemp: 50, currentTemp: 50, threshold: 100, isOverheating: false },
  { id: 'regulator', name: 'Voltage Reg', nameTr: 'Voltaj Reg', x: 25, y: 70, baseTemp: 40, currentTemp: 40, threshold: 80, isOverheating: false },
  { id: 'connector', name: 'Connector', nameTr: 'Konnector', x: 50, y: 85, baseTemp: 35, currentTemp: 35, threshold: 70, isOverheating: false },
];

export default function HeatmapDemo({ lang = 'tr', className = '' }: HeatmapDemoProps) {
  const [hotSpots, setHotSpots] = useState<HotSpot[]>(initialHotSpots);
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Temperature simulation
  useEffect(() => {
    if (!isSimulating) return;

    intervalRef.current = setInterval(() => {
      setHotSpots(prev => prev.map(spot => {
        // Randomly fluctuate temperature
        const fluctuation = (Math.random() - 0.3) * 5; // Slight upward bias
        let newTemp = spot.currentTemp + fluctuation;

        // Keep within reasonable bounds
        newTemp = Math.max(spot.baseTemp - 5, Math.min(spot.threshold + 15, newTemp));

        const isOverheating = newTemp >= spot.threshold;

        // Trigger alert if crossing threshold
        if (isOverheating && !spot.isOverheating) {
          setAlerts(prev => [...prev, spot.id]);
          setTimeout(() => {
            setAlerts(prev => prev.filter(id => id !== spot.id));
          }, 3000);
        }

        return {
          ...spot,
          currentTemp: Math.round(newTemp * 10) / 10,
          isOverheating,
        };
      }));
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating]);

  // Get temperature color
  const getTempColor = (temp: number, threshold: number) => {
    const ratio = temp / threshold;
    if (ratio >= 1) return '#EF4444'; // Red - danger
    if (ratio >= 0.8) return '#F97316'; // Orange - warning
    if (ratio >= 0.6) return '#EAB308'; // Yellow - caution
    return '#22C55E'; // Green - normal
  };

  // Get thermal gradient for visualization
  const getThermalGradient = (temp: number, threshold: number) => {
    const ratio = Math.min(temp / threshold, 1.2);
    if (ratio >= 1) return 'rgba(239, 68, 68, 0.6)';
    if (ratio >= 0.8) return 'rgba(249, 115, 22, 0.4)';
    if (ratio >= 0.6) return 'rgba(234, 179, 8, 0.3)';
    return 'rgba(34, 197, 94, 0.2)';
  };

  const activeAlerts = hotSpots.filter(s => s.isOverheating);

  return (
    <div className={`relative bg-onyx-900 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-offwhite-400 text-sm font-medium">
            {lang === 'tr' ? 'Termal Izleme Canli' : 'Thermal Monitoring Live'}
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
            : (lang === 'tr' ? 'Simulasyon' : 'Simulate')}
        </button>
      </div>

      {/* PCB Visualization */}
      <div className="relative aspect-[4/3] p-6">
        {/* PCB Background */}
        <div className="absolute inset-6 bg-emerald-900/30 rounded-lg border border-emerald-500/20">
          {/* PCB Traces Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <pattern id="traces" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 10 10 L 10 0" fill="none" stroke="#10B981" strokeWidth="0.5" />
              <path d="M 20 10 L 10 10 L 10 20" fill="none" stroke="#10B981" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#traces)" />
          </svg>

          {/* Component Outlines */}
          <div className="absolute left-[30%] top-[35%] w-16 h-12 border border-emerald-500/30 rounded bg-emerald-900/50" />
          <div className="absolute left-[60%] top-[25%] w-12 h-8 border border-emerald-500/30 rounded bg-emerald-900/50" />
          <div className="absolute left-[70%] top-[55%] w-10 h-10 border border-emerald-500/30 rounded bg-emerald-900/50" />
          <div className="absolute left-[20%] top-[65%] w-14 h-6 border border-emerald-500/30 rounded bg-emerald-900/50" />
          <div className="absolute left-[45%] top-[80%] w-20 h-4 border border-emerald-500/30 rounded bg-emerald-900/50" />
        </div>

        {/* Heat Spots */}
        {hotSpots.map(spot => (
          <motion.div
            key={spot.id}
            className="absolute cursor-pointer"
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredSpot(spot.id)}
            onMouseLeave={() => setHoveredSpot(null)}
          >
            {/* Thermal Glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl"
              animate={{
                scale: spot.isOverheating ? [1, 1.5, 1] : 1,
                opacity: spot.isOverheating ? [0.6, 0.8, 0.6] : 0.4,
              }}
              transition={{ repeat: spot.isOverheating ? Infinity : 0, duration: 1 }}
              style={{
                width: 60,
                height: 60,
                marginLeft: -30,
                marginTop: -30,
                backgroundColor: getThermalGradient(spot.currentTemp, spot.threshold),
              }}
            />

            {/* Hot Spot Indicator */}
            <motion.div
              className="relative w-8 h-8 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: getTempColor(spot.currentTemp, spot.threshold),
                backgroundColor: `${getTempColor(spot.currentTemp, spot.threshold)}20`,
              }}
              whileHover={{ scale: 1.2 }}
              animate={spot.isOverheating ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  `0 0 0 0 ${getTempColor(spot.currentTemp, spot.threshold)}`,
                  `0 0 0 8px ${getTempColor(spot.currentTemp, spot.threshold)}00`,
                ],
              } : {}}
              transition={{ repeat: spot.isOverheating ? Infinity : 0, duration: 1 }}
            >
              <Thermometer size={14} style={{ color: getTempColor(spot.currentTemp, spot.threshold) }} />
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredSpot === spot.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 bg-onyx-800 rounded-lg border border-white/10 shadow-xl z-10 whitespace-nowrap"
                >
                  <div className="text-offwhite-400 font-medium text-sm mb-1">
                    {lang === 'tr' ? spot.nameTr : spot.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-2xl font-mono font-bold"
                      style={{ color: getTempColor(spot.currentTemp, spot.threshold) }}
                    >
                      {spot.currentTemp}°C
                    </span>
                    <span className="text-offwhite-800 text-xs">
                      / {spot.threshold}°C
                    </span>
                  </div>
                  {spot.isOverheating && (
                    <div className="flex items-center gap-1 mt-2 text-red-400 text-xs">
                      <AlertTriangle size={12} />
                      <span>{lang === 'tr' ? 'Esik Asildi!' : 'Threshold Exceeded!'}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Alert Notification */}
        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg"
            >
              <Bell size={16} className="text-red-400 animate-bounce" />
              <span className="text-red-400 text-sm font-medium">
                {lang === 'tr' ? 'Uyari: Sicaklik Alarmi!' : 'Alert: Temperature Warning!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Bar */}
      <div className="p-4 border-t border-white/10 bg-onyx-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wifi size={14} className="text-green-400" />
              <span className="text-offwhite-700 text-xs">
                {lang === 'tr' ? 'Bagli' : 'Connected'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {activeAlerts.length > 0 ? (
                <>
                  <AlertTriangle size={14} className="text-red-400" />
                  <span className="text-red-400 text-xs">
                    {activeAlerts.length} {lang === 'tr' ? 'Uyari' : 'Alert(s)'}
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} className="text-green-400" />
                  <span className="text-green-400 text-xs">
                    {lang === 'tr' ? 'Tum Sistemler Normal' : 'All Systems Normal'}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="text-offwhite-800 text-xs font-mono">
            FireLink v2.1
          </div>
        </div>
      </div>
    </div>
  );
}
