'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Sun,
  Moon,
  Music,
  Shield,
  Thermometer,
  Lightbulb,
  Wind,
  Camera,
  Lock,
  Blinds,
  Tv,
  Coffee,
  PartyPopper,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ===========================================
// Smart Villa Demo - Interactive Mode Configurator
// Showcases AICO's smart home automation
// ===========================================

type VillaMode = 'home' | 'away' | 'party' | 'focus' | 'night' | 'morning';

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  lights: boolean;
  blinds: 'open' | 'half' | 'closed';
  temperature: number;
  devices: string[];
}

interface ModeConfig {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
  lights: Record<string, boolean>;
  blinds: Record<string, 'open' | 'half' | 'closed'>;
  temperature: number;
  activeDevices: string[];
  ambiance: string;
}

interface SmartVillaDemoProps {
  lang?: 'tr' | 'en';
  className?: string;
}

// Room definitions for villa floor plan
const initialRooms: Room[] = [
  { id: 'living', name: 'Oturma Odasi', x: 5, y: 10, width: 35, height: 40, lights: true, blinds: 'open', temperature: 23, devices: ['tv', 'speaker'] },
  { id: 'kitchen', name: 'Mutfak', x: 45, y: 10, width: 25, height: 25, lights: true, blinds: 'half', temperature: 22, devices: ['coffee'] },
  { id: 'dining', name: 'Yemek Odasi', x: 45, y: 40, width: 25, height: 25, lights: false, blinds: 'open', temperature: 23, devices: [] },
  { id: 'master', name: 'Yatak Odasi', x: 75, y: 10, width: 20, height: 35, lights: false, blinds: 'closed', temperature: 21, devices: ['tv'] },
  { id: 'office', name: 'Calisma', x: 75, y: 50, width: 20, height: 25, lights: true, blinds: 'half', temperature: 22, devices: ['speaker'] },
  { id: 'garden', name: 'Bahce', x: 5, y: 55, width: 35, height: 35, lights: false, blinds: 'open', temperature: 0, devices: ['camera'] },
];

// Mode configurations
const modeConfigs: Record<VillaMode, ModeConfig> = {
  home: {
    icon: <Home className="w-5 h-5" />,
    label: 'Ev Modu',
    description: 'Gunluk konfor ayarlari',
    color: '#3B82F6',
    lights: { living: true, kitchen: true, dining: false, master: false, office: false, garden: false },
    blinds: { living: 'open', kitchen: 'half', dining: 'open', master: 'closed', office: 'half', garden: 'open' },
    temperature: 23,
    activeDevices: ['tv', 'speaker'],
    ambiance: 'Rahat & Dengeli',
  },
  away: {
    icon: <Shield className="w-5 h-5" />,
    label: 'Dis Mekan',
    description: 'Güvenlik modu aktif',
    color: '#EF4444',
    lights: { living: false, kitchen: false, dining: false, master: false, office: false, garden: true },
    blinds: { living: 'closed', kitchen: 'closed', dining: 'closed', master: 'closed', office: 'closed', garden: 'open' },
    temperature: 18,
    activeDevices: ['camera'],
    ambiance: 'Güvenlik Öncelikli',
  },
  party: {
    icon: <PartyPopper className="w-5 h-5" />,
    label: 'Parti Modu',
    description: 'Eglence ayarlari',
    color: '#A855F7',
    lights: { living: true, kitchen: true, dining: true, master: false, office: false, garden: true },
    blinds: { living: 'open', kitchen: 'open', dining: 'open', master: 'closed', office: 'closed', garden: 'open' },
    temperature: 21,
    activeDevices: ['tv', 'speaker', 'coffee'],
    ambiance: 'Canli & Enerjik',
  },
  focus: {
    icon: <BrainCircuit className="w-5 h-5" />,
    label: 'Odaklanma',
    description: 'Calisma ortami',
    color: '#10B981',
    lights: { living: false, kitchen: false, dining: false, master: false, office: true, garden: false },
    blinds: { living: 'half', kitchen: 'closed', dining: 'closed', master: 'closed', office: 'half', garden: 'open' },
    temperature: 22,
    activeDevices: [],
    ambiance: 'Sessiz & Uretken',
  },
  night: {
    icon: <Moon className="w-5 h-5" />,
    label: 'Gece Modu',
    description: 'Uyku hazirligi',
    color: '#6366F1',
    lights: { living: false, kitchen: false, dining: false, master: true, office: false, garden: true },
    blinds: { living: 'closed', kitchen: 'closed', dining: 'closed', master: 'closed', office: 'closed', garden: 'open' },
    temperature: 20,
    activeDevices: ['camera'],
    ambiance: 'Huzurlu & Dinlendirici',
  },
  morning: {
    icon: <Sun className="w-5 h-5" />,
    label: 'Sabah Rutini',
    description: 'Gunaydın senaryosu',
    color: '#F59E0B',
    lights: { living: true, kitchen: true, dining: false, master: true, office: false, garden: false },
    blinds: { living: 'open', kitchen: 'open', dining: 'open', master: 'half', office: 'open', garden: 'open' },
    temperature: 22,
    activeDevices: ['coffee', 'speaker'],
    ambiance: 'Enerjik & Canlandirici',
  },
};

// Translations
const translations = {
  tr: {
    title: 'Akıllı Villa Kontrol',
    subtitle: 'Tek tikla tum ev yonetimi',
    selectMode: 'Mod Sec',
    currentMode: 'Aktif Mod',
    temperature: 'Sicaklik',
    lighting: 'Aydinlatma',
    blinds: 'Perdeler',
    devices: 'Cihazlar',
    security: 'Güvenlik',
    ambiance: 'Atmosfer',
    roomsActive: 'Aktif Oda',
    energySaving: 'Enerji Tasarrufu',
    aiSuggestion: 'AI Onerisi',
  },
  en: {
    title: 'Smart Villa Control',
    subtitle: 'One-click home management',
    selectMode: 'Select Mode',
    currentMode: 'Active Mode',
    temperature: 'Temperature',
    lighting: 'Lighting',
    blinds: 'Blinds',
    devices: 'Devices',
    security: 'Security',
    ambiance: 'Ambiance',
    roomsActive: 'Active Rooms',
    energySaving: 'Energy Saving',
    aiSuggestion: 'AI Suggestion',
  },
};

// Device icons
const deviceIcons: Record<string, React.ReactNode> = {
  tv: <Tv className="w-4 h-4" />,
  speaker: <Music className="w-4 h-4" />,
  coffee: <Coffee className="w-4 h-4" />,
  camera: <Camera className="w-4 h-4" />,
};

export default function SmartVillaDemo({ lang = 'tr', className }: SmartVillaDemoProps) {
  const t = translations[lang];
  const [activeMode, setActiveMode] = useState<VillaMode>('home');
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const config = modeConfigs[activeMode];

  // Apply mode changes
  const applyMode = (mode: VillaMode) => {
    if (mode === activeMode) return;

    setIsTransitioning(true);
    setActiveMode(mode);

    const newConfig = modeConfigs[mode];

    // Animate room changes
    setTimeout(() => {
      setRooms((prev) =>
        prev.map((room) => ({
          ...room,
          lights: newConfig.lights[room.id] ?? false,
          blinds: newConfig.blinds[room.id] ?? 'open',
          temperature: room.id === 'garden' ? 0 : newConfig.temperature,
        }))
      );
      setIsTransitioning(false);
    }, 300);
  };

  // Calculate active rooms
  const activeRooms = rooms.filter((r) => r.lights).length;

  // Calculate energy saving percentage based on mode
  const energySaving = {
    home: 0,
    away: 45,
    party: -20,
    focus: 30,
    night: 35,
    morning: 10,
  }[activeMode];

  return (
    <div className={cn('relative bg-onyx-900 rounded-3xl overflow-hidden', className)}>
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
              animate={{ backgroundColor: `${config.color}20` }}
            >
              <motion.div style={{ color: config.color }}>
                {config.icon}
              </motion.div>
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>

          {/* AI Suggestion badge */}
          <motion.div
            className="px-4 py-2 rounded-full bg-engineer-500/10 flex items-center gap-2"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-4 h-4 text-engineer-500" />
            <span className="text-xs text-engineer-500 font-medium">
              {t.aiSuggestion}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Mode selector */}
      <div className="p-6 border-b border-white/5">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
          {t.selectMode}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(modeConfigs) as VillaMode[]).map((mode) => {
            const modeConfig = modeConfigs[mode];
            const isActive = mode === activeMode;

            return (
              <motion.button
                key={mode}
                onClick={() => applyMode(mode)}
                className={cn(
                  'relative p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden',
                  isActive
                    ? 'border-transparent'
                    : 'border-white/5 hover:border-white/10 bg-white/[0.02]'
                )}
                style={{
                  backgroundColor: isActive ? `${modeConfig.color}15` : undefined,
                  borderColor: isActive ? modeConfig.color : undefined,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glow effect when active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at center, ${modeConfig.color} 0%, transparent 70%)`,
                    }}
                    layoutId="modeGlow"
                  />
                )}

                <div className="relative z-10">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: isActive ? modeConfig.color : 'rgba(255,255,255,0.05)',
                      color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {modeConfig.icon}
                  </div>
                  <div className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {modeConfig.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {modeConfig.description}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Villa floor plan */}
      <div className="p-6">
        <div className="relative aspect-[16/10] bg-onyx-950 rounded-2xl border border-white/5 overflow-hidden">
          {/* Transition overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-onyx-900/50 backdrop-blur-sm z-20 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <Sparkles className="w-8 h-8 text-engineer-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rooms */}
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              className="absolute rounded-xl border-2 transition-all duration-500"
              style={{
                left: `${room.x}%`,
                top: `${room.y}%`,
                width: `${room.width}%`,
                height: `${room.height}%`,
                backgroundColor: room.lights
                  ? `${config.color}20`
                  : 'rgba(255,255,255,0.02)',
                borderColor: room.lights
                  ? config.color
                  : 'rgba(255,255,255,0.1)',
              }}
              animate={{
                boxShadow: room.lights
                  ? `inset 0 0 30px ${config.color}30`
                  : 'none',
              }}
            >
              {/* Room content */}
              <div className="absolute inset-0 p-3 flex flex-col">
                {/* Room name */}
                <div className="text-xs font-medium text-white/80 mb-2">
                  {room.name}
                </div>

                {/* Room status icons */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {/* Light indicator */}
                  <div className={cn(
                    'w-6 h-6 rounded-lg flex items-center justify-center',
                    room.lights ? 'bg-yellow-500/20' : 'bg-white/5'
                  )}>
                    <Lightbulb className={cn(
                      'w-3 h-3',
                      room.lights ? 'text-yellow-400' : 'text-white/30'
                    )} />
                  </div>

                  {/* Blinds indicator */}
                  <div className={cn(
                    'w-6 h-6 rounded-lg flex items-center justify-center',
                    room.blinds === 'open' ? 'bg-blue-500/20' : 'bg-white/5'
                  )}>
                    <Blinds className={cn(
                      'w-3 h-3',
                      room.blinds === 'open' ? 'text-blue-400' : 'text-white/30'
                    )} />
                  </div>

                  {/* Temperature (skip for garden) */}
                  {room.id !== 'garden' && (
                    <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-white/50">
                        {room.temperature}°
                      </span>
                    </div>
                  )}

                  {/* Active devices */}
                  {room.devices.map((device) => (
                    config.activeDevices.includes(device) && (
                      <div
                        key={device}
                        className="w-6 h-6 rounded-lg bg-engineer-500/20 flex items-center justify-center"
                      >
                        <div className="text-engineer-400">
                          {deviceIcons[device]}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-onyx-800/50 rounded-xl p-4 text-center">
            <Thermometer className="w-5 h-5 mx-auto mb-2" style={{ color: config.color }} />
            <div className="text-xs text-muted-foreground">{t.temperature}</div>
            <div className="text-lg font-mono font-bold text-foreground mt-1">
              {config.temperature}°C
            </div>
          </div>
          <div className="bg-onyx-800/50 rounded-xl p-4 text-center">
            <Lightbulb className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">{t.roomsActive}</div>
            <div className="text-lg font-mono font-bold text-foreground mt-1">
              {activeRooms}/6
            </div>
          </div>
          <div className="bg-onyx-800/50 rounded-xl p-4 text-center">
            <Wind className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">{t.energySaving}</div>
            <div className={cn(
              'text-lg font-mono font-bold mt-1',
              energySaving > 0 ? 'text-emerald-500' : energySaving < 0 ? 'text-red-500' : 'text-foreground'
            )}>
              {energySaving > 0 ? '+' : ''}{energySaving}%
            </div>
          </div>
          <div className="bg-onyx-800/50 rounded-xl p-4 text-center">
            <Lock className="w-5 h-5 mx-auto mb-2" style={{ color: config.color }} />
            <div className="text-xs text-muted-foreground">{t.ambiance}</div>
            <div className="text-sm font-medium text-foreground mt-1 truncate">
              {config.ambiance}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
