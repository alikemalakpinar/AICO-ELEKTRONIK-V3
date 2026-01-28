'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {
  Sun,
  Moon,
  Sparkles,
  Film,
  Briefcase,
  Heart,
  Lightbulb,
  Thermometer,
  Wind,
  Blinds,
  Music,
  Shield,
  Wifi,
  Battery,
  Power,
  Home,
} from 'lucide-react';
import type { Locale } from '@/types';

interface SmartLivingLuxuryDemoProps {
  lang: Locale;
}

// Room configuration
interface RoomConfig {
  id: string;
  name: { tr: string; en: string };
  path: string; // SVG path for the room shape
  center: { x: number; y: number };
  lightIntensity: number;
  temperature: number;
  blindsOpen: number;
  occupied: boolean;
}

// Scenario configuration
interface Scenario {
  id: string;
  name: { tr: string; en: string };
  icon: React.ElementType;
  gradient: string;
  description: { tr: string; en: string };
  settings: {
    globalLight: number;
    temperature: number;
    blindsOpen: number;
    ambientColor: string;
  };
}

export default function SmartLivingLuxuryDemo({ lang }: SmartLivingLuxuryDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>('living');
  const [globalLight, setGlobalLight] = useState(70);
  const [ambientColor, setAmbientColor] = useState('#F97316');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Room states
  const [rooms, setRooms] = useState<RoomConfig[]>([
    {
      id: 'living',
      name: { tr: 'Oturma Odasi', en: 'Living Room' },
      path: 'M 10 40 L 10 90 L 50 90 L 50 40 Z',
      center: { x: 30, y: 65 },
      lightIntensity: 80,
      temperature: 22,
      blindsOpen: 70,
      occupied: true,
    },
    {
      id: 'kitchen',
      name: { tr: 'Mutfak', en: 'Kitchen' },
      path: 'M 50 40 L 50 90 L 90 90 L 90 40 Z',
      center: { x: 70, y: 65 },
      lightIntensity: 100,
      temperature: 21,
      blindsOpen: 100,
      occupied: true,
    },
    {
      id: 'master',
      name: { tr: 'Ana Yatak', en: 'Master Bed' },
      path: 'M 10 10 L 10 40 L 40 40 L 40 10 Z',
      center: { x: 25, y: 25 },
      lightIntensity: 0,
      temperature: 20,
      blindsOpen: 30,
      occupied: false,
    },
    {
      id: 'office',
      name: { tr: 'Ofis', en: 'Office' },
      path: 'M 40 10 L 40 40 L 60 40 L 60 10 Z',
      center: { x: 50, y: 25 },
      lightIntensity: 60,
      temperature: 23,
      blindsOpen: 50,
      occupied: false,
    },
    {
      id: 'guest',
      name: { tr: 'Misafir', en: 'Guest Room' },
      path: 'M 60 10 L 60 40 L 90 40 L 90 10 Z',
      center: { x: 75, y: 25 },
      lightIntensity: 0,
      temperature: 21,
      blindsOpen: 0,
      occupied: false,
    },
  ]);

  // Scenarios
  const scenarios: Scenario[] = [
    {
      id: 'morning',
      name: { tr: 'Gunes Dogumu', en: 'Sunrise' },
      icon: Sun,
      gradient: 'from-amber-500 to-orange-600',
      description: { tr: 'Perdeleri ac, yumusak isik', en: 'Open blinds, soft light' },
      settings: { globalLight: 60, temperature: 22, blindsOpen: 100, ambientColor: '#FBBF24' },
    },
    {
      id: 'focus',
      name: { tr: 'Odaklanma', en: 'Focus' },
      icon: Briefcase,
      gradient: 'from-blue-500 to-indigo-600',
      description: { tr: 'Net isik, sessizlik', en: 'Clear light, silence' },
      settings: { globalLight: 100, temperature: 21, blindsOpen: 50, ambientColor: '#3B82F6' },
    },
    {
      id: 'movie',
      name: { tr: 'Sinema', en: 'Cinema' },
      icon: Film,
      gradient: 'from-purple-500 to-pink-600',
      description: { tr: 'Karartma, ambiyans', en: 'Blackout, ambiance' },
      settings: { globalLight: 10, temperature: 22, blindsOpen: 0, ambientColor: '#8B5CF6' },
    },
    {
      id: 'romance',
      name: { tr: 'Romantik', en: 'Romance' },
      icon: Heart,
      gradient: 'from-rose-500 to-red-600',
      description: { tr: 'Mumisigi efekti', en: 'Candlelight effect' },
      settings: { globalLight: 20, temperature: 23, blindsOpen: 20, ambientColor: '#F43F5E' },
    },
    {
      id: 'night',
      name: { tr: 'Gece', en: 'Night' },
      icon: Moon,
      gradient: 'from-slate-600 to-slate-800',
      description: { tr: 'Guvenlik modu', en: 'Security mode' },
      settings: { globalLight: 5, temperature: 19, blindsOpen: 0, ambientColor: '#64748B' },
    },
    {
      id: 'party',
      name: { tr: 'Parti', en: 'Party' },
      icon: Sparkles,
      gradient: 'from-cyan-500 to-teal-600',
      description: { tr: 'Dinamik aydinlatma', en: 'Dynamic lighting' },
      settings: { globalLight: 80, temperature: 22, blindsOpen: 0, ambientColor: '#06B6D4' },
    },
  ];

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle room light change via drag
  const handleLightDrag = useCallback((roomId: string, info: PanInfo) => {
    const delta = -info.delta.y * 0.5;
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        const newIntensity = Math.max(0, Math.min(100, room.lightIntensity + delta));
        return { ...room, lightIntensity: newIntensity };
      }
      return room;
    }));
  }, []);

  // Apply scenario
  const applyScenario = (scenario: Scenario) => {
    setActiveScenario(scenario.id);
    setGlobalLight(scenario.settings.globalLight);
    setAmbientColor(scenario.settings.ambientColor);

    // Apply to all rooms
    setRooms(prev => prev.map(room => ({
      ...room,
      lightIntensity: scenario.settings.globalLight,
      temperature: scenario.settings.temperature,
      blindsOpen: scenario.settings.blindsOpen,
    })));
  };

  // Update individual room
  const updateRoom = useCallback((roomId: string, key: keyof RoomConfig, value: number | boolean) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return { ...room, [key]: value };
      }
      return room;
    }));
    setActiveScenario(null); // Clear scenario when manual override
  }, []);

  const currentRoom = rooms.find(r => r.id === selectedRoom);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A] rounded-3xl overflow-hidden border border-white/5"
      style={{
        boxShadow: `0 0 120px ${ambientColor}10, 0 0 60px ${ambientColor}05`,
      }}
    >
      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${ambientColor}08 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-engineer-500/20 to-engineer-600/20 flex items-center justify-center">
            <Home size={20} className="text-engineer-500" />
          </div>
          <div>
            <div className="text-sm font-semibold text-offwhite-400">AICO Luxury Living</div>
            <div className="flex items-center gap-2 text-xs text-offwhite-700">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                Online
              </span>
              <span className="text-offwhite-800">|</span>
              <span className="font-mono">
                {currentTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
            <Wifi size={12} className="text-success-500" />
            <span className="text-xs text-offwhite-600">Connected</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
            <Battery size={12} className="text-success-500" />
            <span className="text-xs text-offwhite-600">Hub OK</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr,350px] gap-4 p-4">
        {/* Interactive Floor Plan */}
        <div className="relative bg-onyx-900/50 rounded-2xl border border-white/5 p-4 overflow-hidden">
          <h3 className="text-xs font-medium text-offwhite-600 uppercase tracking-wider mb-4">
            {lang === 'tr' ? 'Interaktif Kat Plani' : 'Interactive Floor Plan'}
          </h3>

          <div className="relative aspect-[4/3] max-w-xl mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* House outline */}
              <path
                d="M 5 10 L 5 95 L 95 95 L 95 10 L 50 2 Z"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.3"
              />

              {/* Room shapes with light effect */}
              {rooms.map((room) => (
                <g key={room.id}>
                  {/* Room fill with light intensity */}
                  <motion.path
                    d={room.path}
                    fill={`${ambientColor}`}
                    initial={{ fillOpacity: 0 }}
                    animate={{
                      fillOpacity: room.lightIntensity / 500,
                    }}
                    transition={{ duration: 0.5 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedRoom(room.id)}
                  />

                  {/* Room border */}
                  <path
                    d={room.path}
                    fill="none"
                    stroke={selectedRoom === room.id ? ambientColor : 'rgba(255,255,255,0.15)'}
                    strokeWidth={selectedRoom === room.id ? '0.8' : '0.3'}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedRoom(room.id)}
                  />

                  {/* Room light indicator - draggable */}
                  <motion.g
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0}
                    onDrag={(_, info) => handleLightDrag(room.id, info)}
                    className="cursor-ns-resize"
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    {/* Light glow */}
                    {room.lightIntensity > 0 && (
                      <motion.circle
                        cx={room.center.x}
                        cy={room.center.y}
                        r={8}
                        fill={ambientColor}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: room.lightIntensity / 200,
                          scale: 0.8 + (room.lightIntensity / 200),
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Light bulb icon */}
                    <circle
                      cx={room.center.x}
                      cy={room.center.y}
                      r={4}
                      fill={room.lightIntensity > 0 ? ambientColor : 'rgba(255,255,255,0.2)'}
                      className="transition-colors duration-300"
                    />

                    {/* Intensity text */}
                    <text
                      x={room.center.x}
                      y={room.center.y + 10}
                      textAnchor="middle"
                      fontSize="3"
                      fill="rgba(255,255,255,0.6)"
                      className="pointer-events-none"
                    >
                      {Math.round(room.lightIntensity)}%
                    </text>

                    {/* Room name */}
                    <text
                      x={room.center.x}
                      y={room.center.y - 8}
                      textAnchor="middle"
                      fontSize="3"
                      fill="rgba(255,255,255,0.4)"
                      className="pointer-events-none uppercase tracking-wider"
                    >
                      {room.name[lang]}
                    </text>

                    {/* Occupied indicator */}
                    {room.occupied && (
                      <circle
                        cx={room.center.x + 6}
                        cy={room.center.y - 6}
                        r={1.5}
                        fill="#22C55E"
                      >
                        <animate
                          attributeName="opacity"
                          values="1;0.5;1"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </motion.g>
                </g>
              ))}
            </svg>

            {/* Drag hint */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm">
              <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="w-0.5 h-2 bg-white/50 rounded-full"
                />
              </div>
              <span className="text-[10px] text-offwhite-600">
                {lang === 'tr' ? 'Isigi ayarlamak icin surukle' : 'Drag to dim lights'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Scenario Presets */}
          <div className="bg-onyx-900/50 rounded-2xl border border-white/5 p-4">
            <h3 className="text-xs font-medium text-offwhite-600 uppercase tracking-wider mb-3">
              {lang === 'tr' ? 'Senaryo Modlari' : 'Scenario Modes'}
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {scenarios.map((scenario) => (
                <motion.button
                  key={scenario.id}
                  onClick={() => applyScenario(scenario)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-3 rounded-xl text-center transition-all overflow-hidden ${
                    activeScenario === scenario.id
                      ? 'ring-2 ring-white/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Background gradient when active */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${scenario.gradient} transition-opacity duration-500 ${
                      activeScenario === scenario.id ? 'opacity-30' : 'opacity-0'
                    }`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center mb-2 bg-gradient-to-br ${scenario.gradient} ${
                        activeScenario === scenario.id ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      <scenario.icon size={18} className="text-white" />
                    </div>
                    <div className="text-xs font-medium text-offwhite-400 mb-0.5">
                      {scenario.name[lang]}
                    </div>
                    <div className="text-[9px] text-offwhite-700 truncate">
                      {scenario.description[lang]}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Room Controls */}
          {currentRoom && (
            <div className="bg-onyx-900/50 rounded-2xl border border-white/5 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-offwhite-400">
                  {currentRoom.name[lang]}
                </h3>
                {currentRoom.occupied && (
                  <span className="flex items-center gap-1.5 text-xs text-success-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
                    {lang === 'tr' ? 'Aktif' : 'Occupied'}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {/* Light Intensity Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-offwhite-600">
                      <Lightbulb size={14} />
                      <span>{lang === 'tr' ? 'Isik Yogunlugu' : 'Light Intensity'}</span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: ambientColor }}>
                      {Math.round(currentRoom.lightIntensity)}%
                    </span>
                  </div>

                  {/* Premium slider with glow effect */}
                  <div className="relative h-3 rounded-full bg-onyx-800 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: ambientColor }}
                      animate={{ width: `${currentRoom.lightIntensity}%` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        backgroundColor: ambientColor,
                        filter: 'blur(8px)',
                        opacity: 0.5,
                      }}
                      animate={{ width: `${currentRoom.lightIntensity}%` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentRoom.lightIntensity}
                      onChange={(e) => updateRoom(currentRoom.id, 'lightIntensity', parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-lg border-2"
                      style={{ borderColor: ambientColor }}
                      animate={{ left: `calc(${currentRoom.lightIntensity}% - 10px)` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </div>
                </div>

                {/* Temperature */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-offwhite-600">
                      <Thermometer size={14} />
                      <span>{lang === 'tr' ? 'Sicaklik' : 'Temperature'}</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">
                      {currentRoom.temperature}°C
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateRoom(currentRoom.id, 'temperature', Math.max(16, currentRoom.temperature - 1))}
                      className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                    >
                      -
                    </motion.button>
                    <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 relative">
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg"
                        animate={{ left: `calc(${((currentRoom.temperature - 16) / 14) * 100}% - 8px)` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateRoom(currentRoom.id, 'temperature', Math.min(30, currentRoom.temperature + 1))}
                      className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Blinds */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-offwhite-600">
                      <Blinds size={14} />
                      <span>{lang === 'tr' ? 'Perdeler' : 'Blinds'}</span>
                    </div>
                    <span className="text-xs font-mono text-amber-400">
                      {currentRoom.blindsOpen}%
                    </span>
                  </div>

                  {/* Visual blinds representation */}
                  <div className="relative h-16 rounded-lg overflow-hidden bg-gradient-to-b from-sky-200/20 to-sky-100/10 border border-white/5">
                    <motion.div
                      className="absolute top-0 left-0 bottom-0 bg-amber-800/80"
                      animate={{ width: `${(100 - currentRoom.blindsOpen) / 2}%` }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 bottom-0 bg-amber-800/80"
                      animate={{ width: `${(100 - currentRoom.blindsOpen) / 2}%` }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentRoom.blindsOpen}
                      onChange={(e) => updateRoom(currentRoom.id, 'blindsOpen', parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-onyx-900/50 border border-white/5">
              <Power size={14} className="text-success-500 mb-1" />
              <div className="text-sm font-mono text-offwhite-400">2.1 kW</div>
              <div className="text-[10px] text-offwhite-700">
                {lang === 'tr' ? 'Anlik Tuketim' : 'Current Usage'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-onyx-900/50 border border-white/5">
              <Shield size={14} className="text-success-500 mb-1" />
              <div className="text-sm font-mono text-success-400">
                {lang === 'tr' ? 'Aktif' : 'Active'}
              </div>
              <div className="text-[10px] text-offwhite-700">
                {lang === 'tr' ? 'Guvenlik' : 'Security'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer status */}
      <div className="flex items-center justify-between p-3 border-t border-white/5 text-xs text-offwhite-700">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
          {lang === 'tr' ? 'Tum sistemler aktif' : 'All systems online'}
        </span>
        <span className="font-mono">AICO Smart Living Pro v3.0</span>
      </div>
    </div>
  );
}
