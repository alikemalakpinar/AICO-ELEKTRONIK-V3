'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Thermometer,
  MapPin,
  AlertTriangle,
  Package,
  Clock,
  Signal,
  Snowflake,
  TrendingDown,
  TrendingUp,
  Navigation,
  Wifi,
  Battery,
  Bell,
} from 'lucide-react';
import type { Locale } from '@/types';

interface FleetMapDemoProps {
  lang?: Locale;
  className?: string;
  compact?: boolean;
}

interface Vehicle {
  id: string;
  plateNumber: string;
  temperature: number;
  targetTemp: number;
  location: { x: number; y: number };
  route: { from: string; to: string };
  status: 'normal' | 'warning' | 'alert';
  progress: number;
  speed: number;
  batteryLevel: number;
  cargo: string;
  eta: string;
  lastUpdate: number;
  tempHistory: number[];
}

// Simplified Turkey map path for SVG
const turkeyPath = "M 15,45 Q 20,40 25,42 L 35,38 Q 45,35 55,36 L 65,40 Q 75,38 85,42 L 90,48 Q 88,55 80,58 L 70,55 Q 60,58 50,56 L 40,60 Q 30,58 25,55 L 15,52 Q 12,48 15,45 Z";

// City positions on the map (approximate)
const cities: Record<string, { x: number; y: number; name: { tr: string; en: string } }> = {
  istanbul: { x: 28, y: 42, name: { tr: 'İstanbul', en: 'Istanbul' } },
  ankara: { x: 48, y: 47, name: { tr: 'Ankara', en: 'Ankara' } },
  izmir: { x: 27, y: 54, name: { tr: 'İzmir', en: 'Izmir' } },
  antalya: { x: 45, y: 62, name: { tr: 'Antalya', en: 'Antalya' } },
  bursa: { x: 32, y: 45, name: { tr: 'Bursa', en: 'Bursa' } },
  konya: { x: 50, y: 55, name: { tr: 'Konya', en: 'Konya' } },
  adana: { x: 55, y: 58, name: { tr: 'Adana', en: 'Adana' } },
  trabzon: { x: 65, y: 42, name: { tr: 'Trabzon', en: 'Trabzon' } },
};

// Route paths
const routes = [
  { from: 'istanbul', to: 'ankara', path: 'M 28,42 Q 38,44 48,47' },
  { from: 'istanbul', to: 'izmir', path: 'M 28,42 Q 27,48 27,54' },
  { from: 'ankara', to: 'antalya', path: 'M 48,47 Q 46,55 45,62' },
  { from: 'ankara', to: 'konya', path: 'M 48,47 Q 49,51 50,55' },
  { from: 'izmir', to: 'antalya', path: 'M 27,54 Q 36,58 45,62' },
  { from: 'bursa', to: 'ankara', path: 'M 32,45 Q 40,46 48,47' },
  { from: 'konya', to: 'adana', path: 'M 50,55 Q 52,56 55,58' },
  { from: 'ankara', to: 'trabzon', path: 'M 48,47 Q 56,44 65,42' },
];

const initialVehicles: Vehicle[] = [
  {
    id: 'TRK-001',
    plateNumber: '34 ABC 123',
    temperature: -18.2,
    targetTemp: -18,
    location: { x: 38, y: 44 },
    route: { from: 'Istanbul', to: 'Ankara' },
    status: 'normal',
    progress: 65,
    speed: 85,
    batteryLevel: 92,
    cargo: 'Frozen Goods',
    eta: '14:30',
    lastUpdate: Date.now(),
    tempHistory: [-18.1, -18.0, -18.2, -18.1, -18.3, -18.2],
  },
  {
    id: 'TRK-002',
    plateNumber: '35 XYZ 456',
    temperature: 4.1,
    targetTemp: 4,
    location: { x: 27, y: 52 },
    route: { from: 'İzmir', to: 'Antalya' },
    status: 'normal',
    progress: 40,
    speed: 72,
    batteryLevel: 78,
    cargo: 'Fresh Produce',
    eta: '16:45',
    lastUpdate: Date.now(),
    tempHistory: [4.0, 4.1, 4.2, 4.1, 4.0, 4.1],
  },
  {
    id: 'TRK-003',
    plateNumber: '06 DEF 789',
    temperature: -15.8,
    targetTemp: -18,
    location: { x: 33, y: 45 },
    route: { from: 'Bursa', to: 'Ankara' },
    status: 'warning',
    progress: 82,
    speed: 90,
    batteryLevel: 45,
    cargo: 'Pharmaceuticals',
    eta: '12:15',
    lastUpdate: Date.now(),
    tempHistory: [-17.5, -17.2, -16.8, -16.2, -15.9, -15.8],
  },
  {
    id: 'TRK-004',
    plateNumber: '42 GHI 012',
    temperature: 2.3,
    targetTemp: 2,
    location: { x: 49, y: 52 },
    route: { from: 'Ankara', to: 'Konya' },
    status: 'normal',
    progress: 25,
    speed: 78,
    batteryLevel: 88,
    cargo: 'Dairy Products',
    eta: '18:00',
    lastUpdate: Date.now(),
    tempHistory: [2.2, 2.3, 2.2, 2.4, 2.3, 2.3],
  },
];

export default function FleetMapDemo({ lang = 'tr', className = '', compact = false }: FleetMapDemoProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [showAlerts, setShowAlerts] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulation
  useEffect(() => {
    if (!isLive) return;

    intervalRef.current = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => {
        // Temperature fluctuation
        const tempDelta = (Math.random() - 0.5) * 0.4;
        let newTemp = vehicle.temperature + tempDelta;

        // Progress update
        let newProgress = Math.min(100, vehicle.progress + Math.random() * 0.5);
        if (newProgress >= 100) newProgress = 0;

        // Update position based on progress
        const newX = vehicle.location.x + (Math.random() - 0.5) * 0.5;
        const newY = vehicle.location.y + (Math.random() - 0.5) * 0.3;

        // Determine status
        let status: Vehicle['status'] = 'normal';
        const tempDiff = Math.abs(newTemp - vehicle.targetTemp);
        if (tempDiff > 3) {
          status = 'alert';
        } else if (tempDiff > 1.5) {
          status = 'warning';
        }

        // Update history
        const newHistory = [...vehicle.tempHistory.slice(1), newTemp];

        return {
          ...vehicle,
          temperature: Math.round(newTemp * 10) / 10,
          location: { x: newX, y: newY },
          progress: Math.round(newProgress),
          status,
          lastUpdate: Date.now(),
          tempHistory: newHistory,
          speed: Math.round(70 + Math.random() * 30),
        };
      }));
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLive]);

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'alert': return '#EF4444';
      case 'warning': return '#EAB308';
      default: return '#06B6D4';
    }
  };

  const alertVehicles = vehicles.filter(v => v.status === 'alert' || v.status === 'warning');

  return (
    <div className={`relative bg-onyx-900 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-onyx-800/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Snowflake size={compact ? 14 : 16} className="text-cyan-500" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-cyan-500/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-offwhite-400 text-xs sm:text-sm font-medium">ColdTrack</span>
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
            <Truck size={10} className="text-cyan-500" />
            <span className="text-cyan-500 text-[10px] font-mono">{vehicles.length} FLEET</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {alertVehicles.length > 0 && (
            <button
              onClick={() => setShowAlerts(!showAlerts)}
              className={`p-1.5 sm:p-2 rounded-lg text-xs transition-colors ${
                showAlerts ? 'bg-red-500/20 text-red-400' : 'bg-onyx-700/50 text-offwhite-600 hover:text-offwhite-400'
              }`}
            >
              <Bell size={compact ? 12 : 14} />
              {alertVehicles.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center">
                  {alertVehicles.length}
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all flex items-center gap-1 ${
              isLive
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-onyx-700 text-offwhite-600 border border-white/10'
            }`}
          >
            <Wifi size={10} className={isLive ? 'animate-pulse' : ''} />
            {isLive ? (lang === 'tr' ? 'CANLI' : 'LIVE') : (lang === 'tr' ? 'DURDURULDU' : 'PAUSED')}
          </button>
        </div>
      </div>

      {/* Map View */}
      <div className={`relative ${compact ? 'aspect-square' : 'aspect-[16/10]'} p-2 sm:p-4`}>
        <div className="absolute inset-2 sm:inset-4 bg-onyx-950 rounded-xl overflow-hidden border border-cyan-500/20">
          {/* Map SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 70" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Gradient for map */}
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Animated dash */}
              <pattern id="routePattern" patternUnits="userSpaceOnUse" width="10" height="1">
                <line x1="0" y1="0" x2="5" y2="0" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Turkey outline */}
            <path
              d={turkeyPath}
              fill="url(#mapGradient)"
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="0.5"
            />

            {/* Routes */}
            {routes.map((route, i) => (
              <path
                key={i}
                d={route.path}
                fill="none"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
            ))}

            {/* Cities */}
            {Object.entries(cities).map(([key, city]) => (
              <g key={key}>
                {/* City glow */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="2"
                  fill="rgba(6, 182, 212, 0.3)"
                  filter="url(#cityGlow)"
                />
                {/* City dot */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="1"
                  fill="#06B6D4"
                />
                {/* City label */}
                {!compact && (
                  <text
                    x={city.x}
                    y={city.y - 3}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.5)"
                    fontSize="2.5"
                    fontWeight="500"
                  >
                    {city.name[lang]}
                  </text>
                )}
              </g>
            ))}
          </svg>

          {/* Vehicles */}
          {vehicles.map((vehicle) => {
            const isSelected = selectedVehicle?.id === vehicle.id;
            const statusColor = getStatusColor(vehicle.status);

            return (
              <motion.div
                key={vehicle.id}
                className="absolute cursor-pointer z-10"
                style={{
                  left: `${vehicle.location.x}%`,
                  top: `${vehicle.location.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setSelectedVehicle(isSelected ? null : vehicle)}
                whileHover={{ scale: 1.2 }}
              >
                {/* Status ring */}
                {vehicle.status !== 'normal' && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 36,
                      height: 36,
                      left: -18,
                      top: -18,
                      border: `2px solid ${statusColor}`,
                    }}
                    animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Selection ring */}
                {isSelected && (
                  <motion.div
                    className="absolute rounded-full border-2 border-white"
                    style={{ width: 32, height: 32, left: -16, top: -16 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                {/* Truck marker */}
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: statusColor,
                    boxShadow: `0 0 12px ${statusColor}60`,
                  }}
                >
                  <Truck size={compact ? 10 : 12} className="text-white" />
                </div>

                {/* Temperature badge */}
                <div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold whitespace-nowrap"
                  style={{
                    backgroundColor: `${statusColor}20`,
                    color: statusColor,
                    border: `1px solid ${statusColor}40`,
                  }}
                >
                  {vehicle.temperature}°C
                </div>

                {/* ID label */}
                {!compact && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[7px] text-offwhite-600 whitespace-nowrap font-mono">
                    {vehicle.id}
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
          </div>

          {/* Compass */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-onyx-800/80 border border-white/10 flex items-center justify-center">
            <Navigation size={14} className="text-cyan-500" style={{ transform: 'rotate(-45deg)' }} />
          </div>
        </div>

        {/* Alert overlay */}
        <AnimatePresence>
          {alertVehicles.length > 0 && showAlerts && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 sm:w-64 bg-onyx-800/95 backdrop-blur-sm rounded-xl border border-red-500/30 overflow-hidden"
            >
              <div className="p-3 border-b border-white/10 flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-400" />
                <span className="text-red-400 text-xs font-medium">
                  {lang === 'tr' ? 'Aktif Uyarılar' : 'Active Alerts'}
                </span>
              </div>
              <div className="max-h-32 overflow-y-auto">
                {alertVehicles.map(vehicle => (
                  <div
                    key={vehicle.id}
                    className="p-2 border-b border-white/5 last:border-0 flex items-center justify-between hover:bg-white/5 cursor-pointer"
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getStatusColor(vehicle.status) }}
                      />
                      <span className="text-offwhite-400 text-xs">{vehicle.id}</span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: getStatusColor(vehicle.status) }}>
                      {vehicle.temperature}°C
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vehicle Details Panel */}
      <AnimatePresence>
        {selectedVehicle && !compact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-onyx-800/70 backdrop-blur-sm"
          >
            <div className="p-3 sm:p-4">
              {/* Vehicle Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${getStatusColor(selectedVehicle.status)}20`,
                      boxShadow: `0 0 15px ${getStatusColor(selectedVehicle.status)}30`,
                    }}
                  >
                    <Truck size={20} style={{ color: getStatusColor(selectedVehicle.status) }} />
                  </div>
                  <div>
                    <div className="text-offwhite-400 font-medium">{selectedVehicle.id}</div>
                    <div className="text-offwhite-700 text-xs">{selectedVehicle.plateNumber}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="w-8 h-8 rounded-full bg-onyx-700 flex items-center justify-center text-offwhite-600 hover:text-offwhite-400 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Route Info */}
              <div className="flex items-center gap-3 mb-3 p-2 bg-onyx-800 rounded-lg">
                <MapPin size={14} className="text-cyan-400" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-offwhite-400">{selectedVehicle.route.from}</span>
                    <span className="text-offwhite-700">→</span>
                    <span className="text-offwhite-400">{selectedVehicle.route.to}</span>
                  </div>
                  <div className="mt-1 h-1.5 bg-onyx-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-cyan-500"
                      animate={{ width: `${selectedVehicle.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 text-xs font-mono">{selectedVehicle.progress}%</div>
                  <div className="text-offwhite-700 text-[10px]">ETA: {selectedVehicle.eta}</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-2">
                {/* Temperature */}
                <div className="p-2 bg-onyx-800 rounded-lg">
                  <div className="flex items-center gap-1 mb-1">
                    <Thermometer size={10} style={{ color: getStatusColor(selectedVehicle.status) }} />
                    <span className="text-offwhite-700 text-[9px]">{lang === 'tr' ? 'Sıcaklık' : 'Temp'}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-mono font-bold" style={{ color: getStatusColor(selectedVehicle.status) }}>
                      {selectedVehicle.temperature}
                    </span>
                    <span className="text-offwhite-700 text-[10px]">°C</span>
                  </div>
                  {/* Mini temp chart */}
                  <div className="mt-1 flex items-end gap-0.5 h-4">
                    {selectedVehicle.tempHistory.map((temp, i) => {
                      const height = Math.abs(temp - selectedVehicle.targetTemp) * 20;
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-t transition-all"
                          style={{
                            height: `${Math.min(height + 20, 100)}%`,
                            backgroundColor: `${getStatusColor(selectedVehicle.status)}60`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Speed */}
                <div className="p-2 bg-onyx-800 rounded-lg">
                  <div className="flex items-center gap-1 mb-1">
                    <Navigation size={10} className="text-blue-400" />
                    <span className="text-offwhite-700 text-[9px]">{lang === 'tr' ? 'Hız' : 'Speed'}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-mono font-bold text-offwhite-400">
                      {selectedVehicle.speed}
                    </span>
                    <span className="text-offwhite-700 text-[10px]">km/h</span>
                  </div>
                </div>

                {/* Battery */}
                <div className="p-2 bg-onyx-800 rounded-lg">
                  <div className="flex items-center gap-1 mb-1">
                    <Battery size={10} className={selectedVehicle.batteryLevel < 30 ? 'text-red-400' : 'text-green-400'} />
                    <span className="text-offwhite-700 text-[9px]">{lang === 'tr' ? 'Pil' : 'Battery'}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-lg font-mono font-bold ${selectedVehicle.batteryLevel < 30 ? 'text-red-400' : 'text-green-400'}`}>
                      {selectedVehicle.batteryLevel}
                    </span>
                    <span className="text-offwhite-700 text-[10px]">%</span>
                  </div>
                </div>

                {/* Cargo */}
                <div className="p-2 bg-onyx-800 rounded-lg">
                  <div className="flex items-center gap-1 mb-1">
                    <Package size={10} className="text-purple-400" />
                    <span className="text-offwhite-700 text-[9px]">{lang === 'tr' ? 'Yük' : 'Cargo'}</span>
                  </div>
                  <div className="text-offwhite-400 text-[10px] font-medium leading-tight">
                    {selectedVehicle.cargo}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="p-2 sm:p-3 border-t border-white/10 bg-onyx-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {[
              { status: 'normal', color: '#06B6D4' },
              { status: 'warning', color: '#EAB308' },
              { status: 'alert', color: '#EF4444' },
            ].map(item => (
              <div key={item.status} className="flex items-center gap-1 sm:gap-1.5">
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}50` }}
                />
                <span className="text-offwhite-600 text-[10px] sm:text-xs">
                  {vehicles.filter(v => v.status === item.status).length}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-offwhite-700 text-[10px] font-mono">
            <Signal size={10} className="text-cyan-500" />
            <span className="hidden sm:inline">ColdTrack</span>
            <span className="text-cyan-500">v2.8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
