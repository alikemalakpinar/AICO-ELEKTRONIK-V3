'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  AlertTriangle,
  Thermometer,
  Shield,
  Clock,
  MapPin,
  Bell,
  X,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import type { Locale } from '@/types';

interface HeatmapDemoProps {
  lang: Locale;
}

interface Zone {
  id: string;
  name: { tr: string; en: string };
  x: number;
  y: number;
  width: number;
  height: number;
  baseTemp: number;
  currentTemp: number;
  sensors: number;
}

const tactileSpring = { type: 'spring' as const, stiffness: 400, damping: 17 };

export default function HeatmapDemo({ lang }: HeatmapDemoProps) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmZone, setAlarmZone] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Building zones configuration
  const [zones, setZones] = useState<Zone[]>([
    { id: 'warehouse-a', name: { tr: 'Depo A', en: 'Warehouse A' }, x: 5, y: 10, width: 28, height: 35, baseTemp: 22, currentTemp: 23, sensors: 8 },
    { id: 'warehouse-b', name: { tr: 'Depo B', en: 'Warehouse B' }, x: 37, y: 10, width: 28, height: 35, baseTemp: 24, currentTemp: 25, sensors: 8 },
    { id: 'office', name: { tr: 'Ofis', en: 'Office' }, x: 69, y: 10, width: 26, height: 20, baseTemp: 21, currentTemp: 21, sensors: 4 },
    { id: 'production', name: { tr: 'Üretim', en: 'Production' }, x: 5, y: 50, width: 45, height: 40, baseTemp: 28, currentTemp: 29, sensors: 12 },
    { id: 'server-room', name: { tr: 'Sunucu Odası', en: 'Server Room' }, x: 54, y: 50, width: 20, height: 20, baseTemp: 18, currentTemp: 19, sensors: 6 },
    { id: 'electrical', name: { tr: 'Elektrik Odası', en: 'Electrical Room' }, x: 78, y: 35, width: 17, height: 25, baseTemp: 25, currentTemp: 26, sensors: 4 },
    { id: 'lobby', name: { tr: 'Lobi', en: 'Lobby' }, x: 54, y: 75, width: 41, height: 15, baseTemp: 22, currentTemp: 22, sensors: 3 },
  ]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate temperature fluctuations
  useEffect(() => {
    if (alarmActive) return;

    const interval = setInterval(() => {
      setZones(prev => prev.map(zone => ({
        ...zone,
        currentTemp: zone.baseTemp + Math.random() * 3 - 1,
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [alarmActive]);

  // Get temperature color
  const getTempColor = (temp: number, isAlarm: boolean = false) => {
    if (isAlarm) return '#EF4444';
    if (temp >= 35) return '#EF4444'; // Red - danger
    if (temp >= 30) return '#F97316'; // Orange - warning
    if (temp >= 26) return '#EAB308'; // Yellow - elevated
    if (temp >= 22) return '#22C55E'; // Green - normal
    return '#3B82F6'; // Blue - cool
  };

  // Simulate fire alarm
  const triggerAlarm = (zoneId: string) => {
    setAlarmActive(true);
    setAlarmZone(zoneId);

    // Update zone temperature to simulate fire
    setZones(prev => prev.map(zone =>
      zone.id === zoneId
        ? { ...zone, currentTemp: 85 + Math.random() * 20 }
        : zone
    ));
  };

  // Clear alarm
  const clearAlarm = () => {
    setAlarmActive(false);
    setAlarmZone(null);
    setZones(prev => prev.map(zone => ({
      ...zone,
      currentTemp: zone.baseTemp + Math.random() * 2,
    })));
  };

  const activeZone = zones.find(z => z.id === hoveredZone);
  const alarmZoneData = zones.find(z => z.id === alarmZone);

  return (
    <div className={`relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden ${isDark ? 'bg-onyx-900' : 'bg-white'}`}
         style={{
           boxShadow: isDark
             ? '0 20px 40px -10px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
             : '0 20px 40px -10px rgba(0, 0, 0, 0.15)'
         }}>

      {/* Fire Alarm Overlay */}
      <AnimatePresence>
        {alarmActive && alarmZoneData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            {/* Pulsing red overlay */}
            <motion.div
              animate={{ opacity: [0.8, 0.6, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="absolute inset-0 bg-red-600/90"
            />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative text-center text-white p-8 z-10"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <Flame size={80} className="mx-auto mb-4" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-2">
                {lang === 'tr' ? 'YANGIN ALARMI!' : 'FIRE ALARM!'}
              </h3>
              <p className="text-lg opacity-90 mb-2">
                {alarmZoneData.name[lang]}
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-2">
                  <Thermometer size={16} />
                  {Math.round(alarmZoneData.currentTemp)}°C
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {currentTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US')}
                </span>
              </div>
              <motion.button
                onClick={clearAlarm}
                whileTap={{ scale: 0.96 }}
                transition={tactileSpring}
                className="px-6 py-3 bg-white text-red-500 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
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
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Flame size={20} className="text-red-500" />
          </div>
          <div>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>FireLink Thermal Monitor</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {lang === 'tr' ? 'Aktif' : 'Active'}
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {currentTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-green-500" />
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {zones.reduce((acc, z) => acc + z.sensors, 0)} {lang === 'tr' ? 'sensör' : 'sensors'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Floor Plan */}
        <div className="flex-1 p-4 md:p-6">
          <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${isDark ? 'bg-onyx-800/50' : 'bg-gray-100'}`}>
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
                  linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)
                `,
                backgroundSize: '10% 10%',
              }}
            />

            {/* Zones */}
            {zones.map((zone) => {
              const isHovered = hoveredZone === zone.id;
              const isAlarmZone = alarmZone === zone.id;
              const tempColor = getTempColor(zone.currentTemp, isAlarmZone);

              return (
                <motion.div
                  key={zone.id}
                  className="absolute cursor-pointer rounded-lg transition-all duration-300"
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.width}%`,
                    height: `${zone.height}%`,
                    backgroundColor: `${tempColor}${isHovered ? '40' : '25'}`,
                    border: `2px solid ${tempColor}${isHovered ? '' : '60'}`,
                  }}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  whileHover={{ scale: 1.02 }}
                  animate={isAlarmZone ? { opacity: [1, 0.5, 1] } : {}}
                  transition={isAlarmZone ? { repeat: Infinity, duration: 0.5 } : { duration: 0.2 }}
                >
                  {/* Zone Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <span className={`text-[10px] sm:text-xs font-medium text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {zone.name[lang]}
                    </span>
                    <span className="text-sm sm:text-lg font-bold" style={{ color: tempColor }}>
                      {Math.round(zone.currentTemp)}°C
                    </span>
                  </div>

                  {/* Sensor Dots */}
                  {Array.from({ length: Math.min(zone.sensors, 4) }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: tempColor,
                        left: `${20 + (i % 2) * 60}%`,
                        top: `${20 + Math.floor(i / 2) * 60}%`,
                      }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    />
                  ))}
                </motion.div>
              );
            })}

            {/* Hover Tooltip */}
            <AnimatePresence>
              {activeZone && !alarmActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute z-20 p-4 rounded-xl shadow-xl ${isDark ? 'bg-onyx-800 border border-white/10' : 'bg-white border border-gray-200'}`}
                  style={{
                    left: `${Math.min(activeZone.x + activeZone.width / 2, 65)}%`,
                    top: `${Math.min(activeZone.y + activeZone.height, 70)}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-red-500" />
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {activeZone.name[lang]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {lang === 'tr' ? 'Sıcaklık' : 'Temperature'}
                      </div>
                      <div className="font-mono font-bold" style={{ color: getTempColor(activeZone.currentTemp) }}>
                        {activeZone.currentTemp.toFixed(1)}°C
                      </div>
                    </div>
                    <div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {lang === 'tr' ? 'Sensör' : 'Sensors'}
                      </div>
                      <div className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {activeZone.sensors}
                      </div>
                    </div>
                    <div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {lang === 'tr' ? 'Baz' : 'Baseline'}
                      </div>
                      <div className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {activeZone.baseTemp}°C
                      </div>
                    </div>
                    <div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {lang === 'tr' ? 'Durum' : 'Status'}
                      </div>
                      <div className="text-green-500 font-medium">
                        {lang === 'tr' ? 'Normal' : 'Normal'}
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
            {lang === 'tr' ? 'Sıcaklık Skalası' : 'Temperature Scale'}
          </h3>

          {/* Legend */}
          <div className="space-y-2 mb-6">
            {[
              { color: '#EF4444', label: lang === 'tr' ? 'Tehlike (≥35°C)' : 'Danger (≥35°C)' },
              { color: '#F97316', label: lang === 'tr' ? 'Uyarı (30-34°C)' : 'Warning (30-34°C)' },
              { color: '#EAB308', label: lang === 'tr' ? 'Yüksek (26-29°C)' : 'Elevated (26-29°C)' },
              { color: '#22C55E', label: lang === 'tr' ? 'Normal (22-25°C)' : 'Normal (22-25°C)' },
              { color: '#3B82F6', label: lang === 'tr' ? 'Serin (<22°C)' : 'Cool (<22°C)' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Simulate Alarm */}
          <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {lang === 'tr' ? 'Simülasyon' : 'Simulation'}
          </h3>
          <div className="space-y-2">
            {zones.slice(0, 3).map((zone) => (
              <motion.button
                key={zone.id}
                onClick={() => triggerAlarm(zone.id)}
                disabled={alarmActive}
                whileTap={{ scale: 0.96 }}
                transition={tactileSpring}
                className={`w-full p-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                  alarmActive
                    ? 'opacity-50 cursor-not-allowed'
                    : isDark
                      ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                <Bell size={14} />
                {zone.name[lang]} {lang === 'tr' ? 'Alarmı' : 'Alarm'}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className={`flex items-center justify-between p-3 border-t text-xs ${isDark ? 'border-white/10 bg-onyx-800/30 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {lang === 'tr' ? 'Tüm sensörler aktif' : 'All sensors active'}
          </span>
        </div>
        <span className="font-mono">FireLink Pro v3.2</span>
      </div>
    </div>
  );
}
