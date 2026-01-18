'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Thermometer,
  AlertTriangle,
  MapPin,
  Clock,
  Snowflake,
  Package,
  Battery,
  Signal,
  CheckCircle,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import type { Locale } from '@/types';

interface FleetMapDemoProps {
  lang: Locale;
}

interface Vehicle {
  id: string;
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  temp: number;
  setPoint: number;
  battery: number;
  signal: number;
  cargo: { tr: string; en: string };
  status: 'ok' | 'warning' | 'spoilage';
  speed: number;
}

const tactileSpring = { type: 'spring' as const, stiffness: 400, damping: 17 };

export default function FleetMapDemo({ lang }: FleetMapDemoProps) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const animationRef = useRef<number>();

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [spoilageAlert, setSpoilageAlert] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fleet vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 'TRK-001', name: 'Truck Alpha', x: 15, y: 30, targetX: 75, targetY: 70, temp: -18.5, setPoint: -18, battery: 95, signal: 4, cargo: { tr: 'Dondurulmuş Gıda', en: 'Frozen Food' }, status: 'ok', speed: 0.03 },
    { id: 'TRK-002', name: 'Truck Beta', x: 65, y: 25, targetX: 20, targetY: 65, temp: 4.2, setPoint: 4, battery: 78, signal: 3, cargo: { tr: 'Taze Sebze', en: 'Fresh Vegetables' }, status: 'ok', speed: 0.025 },
    { id: 'TRK-003', name: 'Truck Gamma', x: 40, y: 60, targetX: 80, targetY: 20, temp: 2.1, setPoint: 2, battery: 62, signal: 5, cargo: { tr: 'Süt Ürünleri', en: 'Dairy Products' }, status: 'ok', speed: 0.02 },
    { id: 'VAN-001', name: 'Van Delta', x: 80, y: 45, targetX: 10, targetY: 40, temp: -20.3, setPoint: -20, battery: 88, signal: 4, cargo: { tr: 'İlaç', en: 'Pharmaceuticals' }, status: 'ok', speed: 0.035 },
  ]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate vehicles
  useEffect(() => {
    const animate = () => {
      setVehicles(prev => prev.map(v => {
        const dx = v.targetX - v.x;
        const dy = v.targetY - v.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2) {
          // Swap target with current position (reverse route)
          return {
            ...v,
            targetX: v.x < 50 ? 75 + Math.random() * 15 : 10 + Math.random() * 15,
            targetY: v.y < 50 ? 60 + Math.random() * 20 : 20 + Math.random() * 20,
            // Small temp fluctuation
            temp: v.setPoint + (Math.random() * 1 - 0.5),
          };
        }

        const newX = v.x + (dx / dist) * v.speed * 100;
        const newY = v.y + (dy / dist) * v.speed * 100;

        return {
          ...v,
          x: newX,
          y: newY,
          temp: v.setPoint + (Math.random() * 0.6 - 0.3),
        };
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Simulate spoilage
  const simulateSpoilage = (vehicleId: string) => {
    setSpoilageAlert(vehicleId);
    setVehicles(prev => prev.map(v =>
      v.id === vehicleId
        ? { ...v, temp: v.setPoint + 15, status: 'spoilage' as const }
        : v
    ));
  };

  // Clear spoilage
  const clearSpoilage = () => {
    setSpoilageAlert(null);
    setVehicles(prev => prev.map(v => ({
      ...v,
      temp: v.setPoint + (Math.random() * 0.5 - 0.25),
      status: 'ok' as const,
    })));
  };

  const activeVehicle = vehicles.find(v => v.id === selectedVehicle);
  const spoilageVehicle = vehicles.find(v => v.id === spoilageAlert);

  // Get status color
  const getStatusColor = (v: Vehicle) => {
    if (v.status === 'spoilage') return '#EF4444';
    if (Math.abs(v.temp - v.setPoint) > 2) return '#F97316';
    return '#22C55E';
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden ${isDark ? 'bg-onyx-900' : 'bg-white'}`}
         style={{
           boxShadow: isDark
             ? '0 20px 40px -10px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
             : '0 20px 40px -10px rgba(0, 0, 0, 0.15)'
         }}>

      {/* Spoilage Alert Overlay */}
      <AnimatePresence>
        {spoilageAlert && spoilageVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [0.9, 0.7, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="absolute inset-0 bg-cyan-700/95"
            />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative text-center text-white p-8 z-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <AlertTriangle size={80} className="mx-auto mb-4" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-2">
                {lang === 'tr' ? 'SICAKLIK ALARMI!' : 'TEMPERATURE ALERT!'}
              </h3>
              <p className="text-lg opacity-90 mb-2">
                {spoilageVehicle.id} - {spoilageVehicle.cargo[lang]}
              </p>
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono text-red-300">
                    {spoilageVehicle.temp.toFixed(1)}°C
                  </div>
                  <div className="text-xs opacity-70">{lang === 'tr' ? 'Mevcut' : 'Current'}</div>
                </div>
                <div className="text-2xl opacity-50">→</div>
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono">
                    {spoilageVehicle.setPoint}°C
                  </div>
                  <div className="text-xs opacity-70">{lang === 'tr' ? 'Hedef' : 'Target'}</div>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-6">
                {lang === 'tr'
                  ? 'Ürün bozulma riski! Acil müdahale gerekli.'
                  : 'Spoilage risk! Immediate action required.'}
              </p>
              <motion.button
                onClick={clearSpoilage}
                whileTap={{ scale: 0.96 }}
                transition={tactileSpring}
                className="px-6 py-3 bg-white text-cyan-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                {lang === 'tr' ? 'Alarmı Kapat' : 'Clear Alarm'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-white/10 bg-onyx-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Snowflake size={20} className="text-cyan-500" />
          </div>
          <div>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>ColdTrack Fleet Monitor</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {lang === 'tr' ? 'Canlı İzleme' : 'Live Tracking'}
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {currentTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-cyan-500" />
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {vehicles.length} {lang === 'tr' ? 'araç' : 'vehicles'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Map Area */}
        <div className="flex-1 p-4 md:p-6">
          <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden ${isDark ? 'bg-onyx-800/50' : 'bg-gray-100'}`}>
            {/* Map Background Pattern (simulated road grid) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Roads */}
              <path d="M0,30 L100,30" stroke={isDark ? '#374151' : '#D1D5DB'} strokeWidth="3" fill="none" />
              <path d="M0,70 L100,70" stroke={isDark ? '#374151' : '#D1D5DB'} strokeWidth="3" fill="none" />
              <path d="M25,0 L25,100" stroke={isDark ? '#374151' : '#D1D5DB'} strokeWidth="3" fill="none" />
              <path d="M50,0 L50,100" stroke={isDark ? '#374151' : '#D1D5DB'} strokeWidth="3" fill="none" />
              <path d="M75,0 L75,100" stroke={isDark ? '#374151' : '#D1D5DB'} strokeWidth="3" fill="none" />
              {/* Diagonal */}
              <path d="M10,10 L90,90" stroke={isDark ? '#374151' : '#D1D5DB'} strokeWidth="2" fill="none" strokeDasharray="5,5" />
            </svg>

            {/* Destination Markers */}
            {[
              { x: 10, y: 85, label: lang === 'tr' ? 'Depo A' : 'Depot A' },
              { x: 85, y: 15, label: lang === 'tr' ? 'Depo B' : 'Depot B' },
              { x: 50, y: 50, label: lang === 'tr' ? 'Merkez' : 'Hub' },
            ].map((depot, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: `${depot.x}%`, top: `${depot.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className={`w-6 h-6 rounded-lg ${isDark ? 'bg-cyan-500/30' : 'bg-cyan-500/20'} flex items-center justify-center`}>
                  <Package size={12} className="text-cyan-500" />
                </div>
                <span className={`text-[8px] mt-1 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{depot.label}</span>
              </div>
            ))}

            {/* Vehicles */}
            {vehicles.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              const statusColor = getStatusColor(vehicle);

              return (
                <motion.div
                  key={vehicle.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${vehicle.x}%`, top: `${vehicle.y}%`, transform: 'translate(-50%, -50%)' }}
                  onClick={() => setSelectedVehicle(isSelected ? null : vehicle.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Vehicle Icon */}
                  <motion.div
                    className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{
                      backgroundColor: `${statusColor}20`,
                      // @ts-ignore - Ring colors applied via CSS custom properties
                      '--tw-ring-color': statusColor,
                      '--tw-ring-offset-color': isDark ? '#0f172a' : '#ffffff',
                    } as React.CSSProperties}
                    animate={vehicle.status === 'spoilage' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: vehicle.status === 'spoilage' ? Infinity : 0, duration: 0.5 }}
                  >
                    <Truck size={20} style={{ color: statusColor }} />

                    {/* Status Dot */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ backgroundColor: statusColor }}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  </motion.div>

                  {/* Temperature Label */}
                  <div
                    className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold whitespace-nowrap ${
                      vehicle.status === 'spoilage' ? 'text-red-500' : isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {vehicle.temp.toFixed(1)}°C
                  </div>
                </motion.div>
              );
            })}

            {/* Selected Vehicle Details Popup */}
            <AnimatePresence>
              {activeVehicle && !spoilageAlert && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute z-20 p-4 rounded-xl shadow-xl min-w-[200px] ${isDark ? 'bg-onyx-800 border border-white/10' : 'bg-white border border-gray-200'}`}
                  style={{
                    left: `${Math.min(Math.max(activeVehicle.x, 25), 75)}%`,
                    top: `${Math.min(activeVehicle.y + 12, 70)}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {activeVehicle.id}
                    </span>
                    <CheckCircle size={14} className="text-green-500" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {lang === 'tr' ? 'Kargo' : 'Cargo'}
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {activeVehicle.cargo[lang]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        <Thermometer size={12} className="inline mr-1" />
                        {lang === 'tr' ? 'Sıcaklık' : 'Temp'}
                      </span>
                      <span className="font-mono" style={{ color: getStatusColor(activeVehicle) }}>
                        {activeVehicle.temp.toFixed(1)}°C / {activeVehicle.setPoint}°C
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        <Battery size={12} className="inline mr-1" />
                        {lang === 'tr' ? 'Batarya' : 'Battery'}
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {activeVehicle.battery}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        <Signal size={12} className="inline mr-1" />
                        {lang === 'tr' ? 'Sinyal' : 'Signal'}
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {'●'.repeat(activeVehicle.signal)}{'○'.repeat(5 - activeVehicle.signal)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side Panel */}
        <div className={`w-full md:w-64 p-4 border-t md:border-t-0 md:border-l ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'tr' ? 'Filo Durumu' : 'Fleet Status'}
          </h3>

          {/* Vehicle List */}
          <div className="space-y-2 mb-6">
            {vehicles.map((v) => (
              <motion.button
                key={v.id}
                onClick={() => setSelectedVehicle(v.id === selectedVehicle ? null : v.id)}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  selectedVehicle === v.id
                    ? isDark ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-cyan-50 border border-cyan-200'
                    : isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{v.id}</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(v) }} />
                </div>
                <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {v.cargo[lang]}
                </div>
                <div className="text-xs font-mono mt-1" style={{ color: getStatusColor(v) }}>
                  {v.temp.toFixed(1)}°C
                </div>
              </motion.button>
            ))}
          </div>

          {/* Simulate Spoilage */}
          <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'tr' ? 'Simülasyon' : 'Simulation'}
          </h3>
          <motion.button
            onClick={() => simulateSpoilage(vehicles[0].id)}
            disabled={!!spoilageAlert}
            whileTap={{ scale: 0.96 }}
            transition={tactileSpring}
            className={`w-full p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
              spoilageAlert
                ? 'opacity-50 cursor-not-allowed'
                : isDark
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            <AlertTriangle size={14} />
            {lang === 'tr' ? 'Bozulma Simüle Et' : 'Simulate Spoilage'}
          </motion.button>
        </div>
      </div>

      {/* Status Bar */}
      <div className={`flex items-center justify-between p-3 border-t text-xs ${isDark ? 'border-white/10 bg-onyx-800/30 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {lang === 'tr' ? 'GPS senkronize' : 'GPS synced'}
          </span>
        </div>
        <span className="font-mono">ColdTrack v2.1</span>
      </div>
    </div>
  );
}
