'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardHat,
  AlertTriangle,
  MapPin,
  Radio,
  Heart,
  Battery,
  Signal,
  Clock,
  Shield,
  CircleAlert,
  PhoneCall,
  Siren,
  Activity,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import type { Locale } from '@/types';

interface WorkerTrackerDemoProps {
  lang: Locale;
}

interface Worker {
  id: string;
  name: string;
  x: number;
  y: number;
  zone: { tr: string; en: string };
  heartRate: number;
  battery: number;
  status: 'ok' | 'warning' | 'sos' | 'fall';
  lastUpdate: number;
}

const tactileSpring = { type: 'spring' as const, stiffness: 400, damping: 17 };

export default function WorkerTrackerDemo({ lang }: WorkerTrackerDemoProps) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const radarRef = useRef<number>(0);

  const [radarAngle, setRadarAngle] = useState(0);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [emergencyActive, setEmergencyActive] = useState<string | null>(null);
  const [emergencyType, setEmergencyType] = useState<'sos' | 'fall' | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Workers
  const [workers, setWorkers] = useState<Worker[]>([
    { id: 'W-001', name: 'Ahmet Y.', x: 30, y: 40, zone: { tr: 'Kazı Bölgesi A', en: 'Excavation Zone A' }, heartRate: 78, battery: 92, status: 'ok', lastUpdate: 0 },
    { id: 'W-002', name: 'Mehmet K.', x: 60, y: 35, zone: { tr: 'Tünel B3', en: 'Tunnel B3' }, heartRate: 85, battery: 76, status: 'ok', lastUpdate: 0 },
    { id: 'W-003', name: 'Ali D.', x: 45, y: 65, zone: { tr: 'Yükleme Alanı', en: 'Loading Area' }, heartRate: 72, battery: 88, status: 'ok', lastUpdate: 0 },
    { id: 'W-004', name: 'Mustafa B.', x: 75, y: 55, zone: { tr: 'Galeri C', en: 'Gallery C' }, heartRate: 68, battery: 45, status: 'warning', lastUpdate: 0 },
    { id: 'W-005', name: 'Hasan Ö.', x: 20, y: 70, zone: { tr: 'Havalandırma', en: 'Ventilation' }, heartRate: 82, battery: 95, status: 'ok', lastUpdate: 0 },
  ]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Radar sweep animation
  useEffect(() => {
    const animate = () => {
      setRadarAngle(prev => (prev + 1.5) % 360);
      radarRef.current = requestAnimationFrame(animate);
    };
    radarRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(radarRef.current);
  }, []);

  // Simulate worker movement and heart rate
  useEffect(() => {
    if (emergencyActive) return;

    const interval = setInterval(() => {
      setWorkers(prev => prev.map(w => ({
        ...w,
        x: Math.max(10, Math.min(90, w.x + (Math.random() * 2 - 1))),
        y: Math.max(20, Math.min(80, w.y + (Math.random() * 2 - 1))),
        heartRate: Math.max(60, Math.min(100, w.heartRate + Math.floor(Math.random() * 6 - 3))),
        lastUpdate: Date.now(),
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [emergencyActive]);

  // Trigger SOS
  const triggerSOS = (workerId: string) => {
    setEmergencyActive(workerId);
    setEmergencyType('sos');
    setWorkers(prev => prev.map(w =>
      w.id === workerId ? { ...w, status: 'sos' as const, heartRate: 110 } : w
    ));
  };

  // Trigger Fall Detection
  const triggerFall = (workerId: string) => {
    setEmergencyActive(workerId);
    setEmergencyType('fall');
    setWorkers(prev => prev.map(w =>
      w.id === workerId ? { ...w, status: 'fall' as const, heartRate: 45 } : w
    ));
  };

  // Clear emergency
  const clearEmergency = () => {
    setEmergencyActive(null);
    setEmergencyType(null);
    setWorkers(prev => prev.map(w => ({
      ...w,
      status: w.battery < 50 ? 'warning' as const : 'ok' as const,
      heartRate: 70 + Math.floor(Math.random() * 15),
    })));
  };

  const activeWorker = workers.find(w => w.id === selectedWorker);
  const emergencyWorker = workers.find(w => w.id === emergencyActive);

  // Get status color
  const getStatusColor = (status: Worker['status']) => {
    switch (status) {
      case 'sos': return '#EF4444';
      case 'fall': return '#F97316';
      case 'warning': return '#EAB308';
      default: return '#22C55E';
    }
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden ${isDark ? 'bg-onyx-900' : 'bg-white'}`}
         style={{
           boxShadow: isDark
             ? '0 20px 40px -10px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
             : '0 20px 40px -10px rgba(0, 0, 0, 0.15)'
         }}>

      {/* Emergency Alert Overlay */}
      <AnimatePresence>
        {emergencyActive && emergencyWorker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [0.9, 0.7, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
              className="absolute inset-0"
              style={{
                backgroundColor: emergencyType === 'sos' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(249, 115, 22, 0.95)'
              }}
            />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative text-center text-white p-8 z-10"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                {emergencyType === 'sos' ? (
                  <Siren size={80} className="mx-auto mb-4" />
                ) : (
                  <CircleAlert size={80} className="mx-auto mb-4" />
                )}
              </motion.div>

              <h3 className="text-3xl font-bold mb-2">
                {emergencyType === 'sos'
                  ? (lang === 'tr' ? 'ACİL DURUM - SOS!' : 'EMERGENCY - SOS!')
                  : (lang === 'tr' ? 'DÜŞME TESPİT EDİLDİ!' : 'FALL DETECTED!')
                }
              </h3>

              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <HardHat size={24} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">{emergencyWorker.name}</div>
                  <div className="text-sm opacity-80">{emergencyWorker.id}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {emergencyWorker.zone[lang]}
                </span>
                <span className="flex items-center gap-2">
                  <Heart size={16} />
                  {emergencyWorker.heartRate} BPM
                </span>
              </div>

              <div className="flex gap-3 justify-center">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  transition={tactileSpring}
                  className="px-6 py-3 bg-white/20 font-semibold rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <PhoneCall size={18} />
                  {lang === 'tr' ? 'Acil Servisi Ara' : 'Call Emergency'}
                </motion.button>
                <motion.button
                  onClick={clearEmergency}
                  whileTap={{ scale: 0.96 }}
                  transition={tactileSpring}
                  className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {lang === 'tr' ? 'Uyarıyı Kapat' : 'Clear Alert'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-white/10 bg-onyx-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <HardHat size={20} className="text-yellow-500" />
          </div>
          <div>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>MineGuard Worker Tracker</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {lang === 'tr' ? 'Canlı Radar' : 'Live Radar'}
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {currentTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-green-500" />
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {workers.length} {lang === 'tr' ? 'işçi aktif' : 'workers active'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Radar Area */}
        <div className="flex-1 p-4 md:p-6">
          <div className={`relative aspect-square max-w-md mx-auto rounded-full overflow-hidden ${isDark ? 'bg-onyx-800/50' : 'bg-gray-100'}`}>
            {/* Radar Grid */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Concentric circles */}
              {[20, 40, 60, 80].map((r) => (
                <circle
                  key={r}
                  cx="50"
                  cy="50"
                  r={r / 2}
                  fill="none"
                  stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
                  strokeWidth="0.5"
                />
              ))}
              {/* Cross lines */}
              <line x1="50" y1="0" x2="50" y2="100" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} strokeWidth="0.5" />
              <line x1="15" y1="15" x2="85" y2="85" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeWidth="0.5" />
              <line x1="85" y1="15" x2="15" y2="85" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeWidth="0.5" />
            </svg>

            {/* Radar Sweep */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1/2 h-1 origin-left"
              style={{
                background: `linear-gradient(90deg, ${isDark ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.6)'}, transparent)`,
                rotate: radarAngle,
                transform: 'translateY(-50%)',
              }}
            />

            {/* Sweep Trail */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `conic-gradient(from ${radarAngle}deg at 50% 50%, transparent 0deg, ${isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)'} 30deg, transparent 60deg)`,
              }}
            />

            {/* Center Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-500/50 border-2 border-yellow-500" />

            {/* Workers */}
            {workers.map((worker) => {
              const isSelected = selectedWorker === worker.id;
              const statusColor = getStatusColor(worker.status);
              // Convert position to radar coordinates (circular)
              const angle = Math.atan2(worker.y - 50, worker.x - 50);
              const distance = Math.sqrt(Math.pow(worker.x - 50, 2) + Math.pow(worker.y - 50, 2));
              const radarX = 50 + Math.cos(angle) * Math.min(distance, 45);
              const radarY = 50 + Math.sin(angle) * Math.min(distance, 45);

              return (
                <motion.div
                  key={worker.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${radarX}%`,
                    top: `${radarY}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedWorker(isSelected ? null : worker.id)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-4 h-4 rounded-full border-2 ${isSelected ? 'ring-2 ring-offset-1' : ''}`}
                    style={{
                      backgroundColor: `${statusColor}40`,
                      borderColor: statusColor,
                      // @ts-ignore - Ring colors applied via CSS custom properties
                      '--tw-ring-color': statusColor,
                      '--tw-ring-offset-color': isDark ? '#0f172a' : '#f3f4f6',
                    } as React.CSSProperties}
                    animate={worker.status !== 'ok' ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ repeat: worker.status !== 'ok' ? Infinity : 0, duration: 0.5 }}
                  />

                  {/* Blip effect on radar sweep */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: statusColor }}
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: (worker.x + worker.y) / 100 }}
                  />
                </motion.div>
              );
            })}

            {/* Selected Worker Details */}
            <AnimatePresence>
              {activeWorker && !emergencyActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`absolute bottom-4 left-4 right-4 p-3 rounded-xl ${isDark ? 'bg-onyx-900/95 border border-white/10' : 'bg-white/95 border border-gray-200'} shadow-xl`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getStatusColor(activeWorker.status)}20` }}>
                      <HardHat size={20} style={{ color: getStatusColor(activeWorker.status) }} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeWorker.name}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{activeWorker.zone[lang]}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs">
                        <Heart size={12} className="text-red-500" />
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{activeWorker.heartRate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Battery size={12} className={activeWorker.battery < 50 ? 'text-yellow-500' : 'text-green-500'} />
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{activeWorker.battery}%</span>
                      </div>
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
            {lang === 'tr' ? 'Aktif İşçiler' : 'Active Workers'}
          </h3>

          {/* Worker List */}
          <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
            {workers.map((w) => (
              <motion.button
                key={w.id}
                onClick={() => setSelectedWorker(w.id === selectedWorker ? null : w.id)}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-2 rounded-xl text-left transition-all flex items-center gap-2 ${
                  selectedWorker === w.id
                    ? isDark ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-yellow-50 border border-yellow-200'
                    : isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(w.status) }} />
                <div className="flex-1">
                  <div className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{w.name}</div>
                  <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{w.id}</div>
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  <Heart size={10} className="text-red-500" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{w.heartRate}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Emergency Simulation */}
          <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'tr' ? 'Acil Durum Simülasyonu' : 'Emergency Simulation'}
          </h3>
          <div className="space-y-2">
            <motion.button
              onClick={() => triggerSOS(workers[0].id)}
              disabled={!!emergencyActive}
              whileTap={{ scale: 0.96 }}
              transition={tactileSpring}
              className={`w-full p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                emergencyActive
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <Siren size={14} />
              {lang === 'tr' ? 'SOS Butonu Simüle Et' : 'Simulate SOS Button'}
            </motion.button>

            <motion.button
              onClick={() => triggerFall(workers[1].id)}
              disabled={!!emergencyActive}
              whileTap={{ scale: 0.96 }}
              transition={tactileSpring}
              className={`w-full p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                emergencyActive
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark
                    ? 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'
                    : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              }`}
            >
              <CircleAlert size={14} />
              {lang === 'tr' ? 'Düşme Tespit Simüle Et' : 'Simulate Fall Detection'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className={`flex items-center justify-between p-3 border-t text-xs ${isDark ? 'border-white/10 bg-onyx-800/30 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Radio size={12} className="text-green-500" />
            {lang === 'tr' ? 'LoRa ağı aktif' : 'LoRa network active'}
          </span>
          <span className="flex items-center gap-1">
            <Shield size={12} className="text-green-500" />
            {lang === 'tr' ? 'Tüm sensörler çalışıyor' : 'All sensors operational'}
          </span>
        </div>
        <span className="font-mono">MineGuard v4.0</span>
      </div>
    </div>
  );
}
