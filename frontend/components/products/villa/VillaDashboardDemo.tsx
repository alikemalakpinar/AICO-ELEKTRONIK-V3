'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  Sofa,
  ChefHat,
  Bed,
  Trees,
  Blinds,
  Thermometer,
  Flame,
  Droplets,
  Refrigerator,
  Power,
  AlertTriangle,
  Shield,
  CheckCircle,
  X,
  Lightbulb,
  Volume2,
  Wifi,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import type { Locale } from '@/types';

interface VillaDashboardDemoProps {
  lang: Locale;
}

type RoomType = 'living' | 'kitchen' | 'bedroom' | 'garden';

interface RoomState {
  curtainOpen: number;
  temperature: number;
  lightsOn: boolean;
  lightBrightness: number;
}

// Tactile button spring config
const tactileSpring = { type: 'spring' as const, stiffness: 400, damping: 17 };

export default function VillaDashboardDemo({ lang }: VillaDashboardDemoProps) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [selectedRoom, setSelectedRoom] = useState<RoomType>('living');
  const [gasValveOpen, setGasValveOpen] = useState(true);
  const [waterLeakAlert, setWaterLeakAlert] = useState(false);
  const [fridgeTemp, setFridgeTemp] = useState(4);
  const [fridgeDoorOpen, setFridgeDoorOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Room-specific states
  const [roomStates, setRoomStates] = useState<Record<RoomType, RoomState>>({
    living: { curtainOpen: 70, temperature: 22, lightsOn: true, lightBrightness: 80 },
    kitchen: { curtainOpen: 100, temperature: 21, lightsOn: true, lightBrightness: 100 },
    bedroom: { curtainOpen: 30, temperature: 20, lightsOn: false, lightBrightness: 40 },
    garden: { curtainOpen: 100, temperature: 26, lightsOn: false, lightBrightness: 60 },
  });

  const currentRoomState = roomStates[selectedRoom];

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Update room state helper
  const updateRoomState = useCallback((key: keyof RoomState, value: number | boolean) => {
    setRoomStates(prev => ({
      ...prev,
      [selectedRoom]: { ...prev[selectedRoom], [key]: value }
    }));
  }, [selectedRoom]);

  // Simulate water leak
  const simulateWaterLeak = () => {
    setWaterLeakAlert(true);
    setTimeout(() => setWaterLeakAlert(false), 5000);
  };

  // Rooms config
  const rooms = [
    { id: 'living' as RoomType, icon: Sofa, label: lang === 'tr' ? 'Oturma Odası' : 'Living Room' },
    { id: 'kitchen' as RoomType, icon: ChefHat, label: lang === 'tr' ? 'Mutfak' : 'Kitchen' },
    { id: 'bedroom' as RoomType, icon: Bed, label: lang === 'tr' ? 'Yatak Odası' : 'Bedroom' },
    { id: 'garden' as RoomType, icon: Trees, label: lang === 'tr' ? 'Bahçe' : 'Garden' },
  ];

  // Get temperature color
  const getTempColor = (temp: number) => {
    if (temp <= 18) return '#3B82F6'; // Blue
    if (temp <= 22) return '#10B981'; // Green
    if (temp <= 26) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const tempColor = getTempColor(currentRoomState.temperature);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden ${isDark ? 'bg-onyx-900' : 'bg-white'}`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Premium shadow layer */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow: isDark
            ? '0 20px 40px -10px rgba(0, 0, 0, 0.35), 0 40px 80px -20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 40px 80px -20px rgba(0, 0, 0, 0.1)'
        }}
      />

      {/* Water Leak Alert Overlay */}
      <AnimatePresence>
        {waterLeakAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.95)' }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-center text-white p-8"
            >
              <AlertTriangle size={80} className="mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">
                {lang === 'tr' ? 'SU SIZINTISI TESPİT EDİLDİ!' : 'WATER LEAK DETECTED!'}
              </h3>
              <p className="text-lg opacity-80 mb-6">
                {lang === 'tr' ? 'Mutfak - Bulaşık makinesi altı' : 'Kitchen - Under dishwasher'}
              </p>
              <motion.button
                onClick={() => setWaterLeakAlert(false)}
                whileTap={{ scale: 0.96 }}
                transition={tactileSpring}
                className="px-6 py-3 bg-white text-red-500 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                {lang === 'tr' ? 'Uyarıyı Kapat' : 'Dismiss Alert'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-white/10 bg-onyx-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-engineer-500/10 flex items-center justify-center">
            <Shield size={20} className="text-engineer-500" />
          </div>
          <div>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>AICO Smart Villa</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Online
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {currentTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-green-500" />
          <Volume2 size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
        </div>
      </div>

      {/* Mobile Room Selection - Horizontal scroll */}
      <div className={`md:hidden overflow-x-auto border-b ${isDark ? 'border-white/10 bg-onyx-800/30' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex p-2 gap-2 min-w-max">
          {rooms.map((room) => {
            const isActive = selectedRoom === room.id;
            return (
              <motion.button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                whileTap={{ scale: 0.96 }}
                transition={tactileSpring}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-engineer-500 text-white'
                    : isDark
                      ? 'text-gray-400 bg-white/5 hover:bg-white/10'
                      : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <room.icon size={18} />
                <span className="text-xs font-medium">
                  {room.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex">
        {/* Desktop Room Selection Sidebar */}
        <div className={`hidden md:block w-20 lg:w-24 flex-shrink-0 border-r ${isDark ? 'border-white/10 bg-onyx-800/30' : 'border-gray-200 bg-gray-50'}`}>
          <div className="py-4 space-y-2">
            {rooms.map((room) => {
              const isActive = selectedRoom === room.id;
              return (
                <motion.button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  whileTap={{ scale: 0.96 }}
                  transition={tactileSpring}
                  className={`w-full flex flex-col items-center gap-1 p-3 transition-all ${
                    isActive
                      ? 'bg-engineer-500 text-white'
                      : isDark
                        ? 'text-gray-400 hover:bg-white/5'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <room.icon size={24} />
                  <span className="text-[10px] lg:text-xs font-medium text-center leading-tight">
                    {room.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Main Control Area */}
        <div className="flex-1 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRoom}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Room Title */}
              <div className="flex items-center justify-between">
                <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {rooms.find(r => r.id === selectedRoom)?.label}
                </h2>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => updateRoomState('lightsOn', !currentRoomState.lightsOn)}
                    whileTap={{ scale: 0.96 }}
                    transition={tactileSpring}
                    className={`p-2 rounded-lg transition-colors ${
                      currentRoomState.lightsOn
                        ? 'bg-amber-500/20 text-amber-500'
                        : isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Lightbulb size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => updateRoomState('lightsOn', !currentRoomState.lightsOn)}
                    whileTap={{ scale: 0.96 }}
                    transition={tactileSpring}
                    className={`p-2 rounded-lg transition-colors ${
                      currentRoomState.lightsOn
                        ? 'bg-green-500/20 text-green-500'
                        : isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Power size={20} />
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Curtain Control */}
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-onyx-800/50 border border-white/5' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Blinds size={20} className="text-engineer-500" />
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'tr' ? 'Perdeler' : 'Curtains'}
                      </span>
                    </div>
                    <span className="text-engineer-500 font-mono text-sm">
                      {currentRoomState.curtainOpen}%
                    </span>
                  </div>

                  {/* Visual Curtain Representation */}
                  <div className="relative h-24 mb-4 rounded-lg overflow-hidden bg-gradient-to-b from-sky-200 to-sky-100 dark:from-sky-900/50 dark:to-sky-800/30">
                    {/* Window */}
                    <div className="absolute inset-2 border-4 border-white/50 dark:border-white/20 rounded" />
                    {/* Curtains */}
                    <motion.div
                      className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-amber-800 to-amber-700"
                      animate={{ width: `${(100 - currentRoomState.curtainOpen) / 2}%` }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 bottom-0 bg-gradient-to-l from-amber-800 to-amber-700"
                      animate={{ width: `${(100 - currentRoomState.curtainOpen) / 2}%` }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    />
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentRoomState.curtainOpen}
                    onChange={(e) => updateRoomState('curtainOpen', parseInt(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #F97316 0%, #F97316 ${currentRoomState.curtainOpen}%, ${isDark ? '#374151' : '#E5E7EB'} ${currentRoomState.curtainOpen}%, ${isDark ? '#374151' : '#E5E7EB'} 100%)`
                    }}
                  />
                </div>

                {/* Thermostat */}
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-onyx-800/50 border border-white/5' : 'bg-gray-50 border border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Thermometer size={20} className="text-engineer-500" />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {lang === 'tr' ? 'Termostat' : 'Thermostat'}
                    </span>
                  </div>

                  {/* Circular Dial */}
                  <div className="relative w-32 h-32 mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Background Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={isDark ? '#374151' : '#E5E7EB'}
                        strokeWidth="8"
                      />
                      {/* Progress Circle */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={tempColor}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${((currentRoomState.temperature - 16) / 14) * 251.2} 251.2`}
                        initial={false}
                        animate={{ strokeDasharray: `${((currentRoomState.temperature - 16) / 14) * 251.2} 251.2` }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {currentRoomState.temperature}°
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Celsius</span>
                    </div>
                  </div>

                  {/* Temperature Controls */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <motion.button
                      onClick={() => updateRoomState('temperature', Math.max(16, currentRoomState.temperature - 1))}
                      whileTap={{ scale: 0.96 }}
                      transition={tactileSpring}
                      className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xl font-bold hover:bg-blue-500/30 transition-colors"
                    >
                      -
                    </motion.button>
                    <motion.button
                      onClick={() => updateRoomState('temperature', Math.min(30, currentRoomState.temperature + 1))}
                      whileTap={{ scale: 0.96 }}
                      transition={tactileSpring}
                      className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xl font-bold hover:bg-red-500/30 transition-colors"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Kitchen-specific Controls */}
                {selectedRoom === 'kitchen' && (
                  <>
                    {/* Gas Valve Control */}
                    <div className={`p-4 rounded-2xl ${isDark ? 'bg-onyx-800/50 border border-white/5' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Flame size={20} className={gasValveOpen ? 'text-orange-500' : 'text-gray-400'} />
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'tr' ? 'Gaz Vanası' : 'Gas Valve'}
                          </span>
                        </div>
                        <motion.div
                          animate={{ color: gasValveOpen ? '#22C55E' : '#EF4444' }}
                          className="text-sm font-medium"
                        >
                          {gasValveOpen
                            ? (lang === 'tr' ? 'AÇIK' : 'OPEN')
                            : (lang === 'tr' ? 'KAPALI' : 'CLOSED')
                          }
                        </motion.div>
                      </div>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => setGasValveOpen(!gasValveOpen)}
                        className={`relative w-full h-14 rounded-xl transition-colors ${
                          gasValveOpen
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-1/2 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center"
                          animate={{ left: gasValveOpen ? 'calc(50% - 4px)' : '4px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <span className={`text-sm font-bold ${gasValveOpen ? 'text-green-500' : 'text-red-500'}`}>
                            {gasValveOpen ? 'ON' : 'OFF'}
                          </span>
                        </motion.div>

                        {/* Gas Cut Animation */}
                        <AnimatePresence>
                          {!gasValveOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <div className="absolute inset-0 bg-red-500/20 rounded-xl" />
                              <X size={24} className="text-white relative z-10" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>

                    {/* Water Leak Detector */}
                    <div className={`p-4 rounded-2xl ${isDark ? 'bg-onyx-800/50 border border-white/5' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Droplets size={20} className="text-blue-500" />
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'tr' ? 'Su Sızıntı Sensörü' : 'Water Leak Sensor'}
                          </span>
                        </div>
                        <CheckCircle size={18} className="text-green-500" />
                      </div>

                      <div className={`p-3 rounded-lg mb-3 ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-green-500 text-sm">
                            {lang === 'tr' ? 'Sızıntı yok' : 'No leak detected'}
                          </span>
                        </div>
                      </div>

                      <motion.button
                        onClick={simulateWaterLeak}
                        whileTap={{ scale: 0.96 }}
                        transition={tactileSpring}
                        className="w-full py-2 px-4 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors"
                      >
                        {lang === 'tr' ? '⚡ Sızıntı Simüle Et' : '⚡ Simulate Leak'}
                      </motion.button>
                    </div>

                    {/* Smart Fridge */}
                    <div className={`p-4 rounded-2xl sm:col-span-2 ${isDark ? 'bg-onyx-800/50 border border-white/5' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Refrigerator size={20} className="text-cyan-500" />
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'tr' ? 'Akıllı Buzdolabı' : 'Smart Fridge'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Fridge Visual */}
                        <div className="relative w-20 h-28 rounded-lg bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 overflow-hidden">
                          <div className={`absolute top-0 left-0 right-0 h-1/2 border-b ${isDark ? 'border-gray-500' : 'border-gray-400'}`}>
                            <motion.div
                              className="absolute inset-1 rounded bg-cyan-500/20"
                              animate={{ opacity: fridgeDoorOpen ? 0.8 : 0.3 }}
                            />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-1/2">
                            <motion.div
                              className="absolute inset-1 rounded bg-blue-500/20"
                              animate={{ opacity: fridgeDoorOpen ? 0.8 : 0.3 }}
                            />
                          </div>
                          {/* Door open indicator */}
                          {fridgeDoorOpen && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-yellow-500/30"
                            />
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {lang === 'tr' ? 'İç Sıcaklık' : 'Internal Temp'}
                            </span>
                            <span className="text-cyan-500 font-mono font-bold">{fridgeTemp}°C</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {lang === 'tr' ? 'Dondurucu' : 'Freezer'}
                            </span>
                            <span className="text-blue-500 font-mono font-bold">-18°C</span>
                          </div>

                          {/* Door Status */}
                          <motion.button
                            onClick={() => setFridgeDoorOpen(!fridgeDoorOpen)}
                            whileTap={{ scale: 0.96 }}
                            transition={tactileSpring}
                            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                              fridgeDoorOpen
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {fridgeDoorOpen
                              ? (lang === 'tr' ? '⚠️ Kapı Açık!' : '⚠️ Door Open!')
                              : (lang === 'tr' ? '✓ Kapı Kapalı' : '✓ Door Closed')
                            }
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Living Room - Music Control */}
                {selectedRoom === 'living' && (
                  <div className={`p-4 rounded-2xl sm:col-span-2 ${isDark ? 'bg-onyx-800/50 border border-white/5' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                        <Volume2 size={28} className="text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {lang === 'tr' ? 'Şimdi Çalıyor' : 'Now Playing'}
                        </div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Ambient Relaxation
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Home Playlist
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          transition={tactileSpring}
                          className={`p-2 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                          </svg>
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          transition={tactileSpring}
                          className={`p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bedroom - Sleep Mode */}
                {selectedRoom === 'bedroom' && (
                  <div className={`p-4 rounded-2xl sm:col-span-2 ${isDark ? 'bg-onyx-800/50 border border-white/5' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {lang === 'tr' ? 'Uyku Modu' : 'Sleep Mode'}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {lang === 'tr' ? 'Işıkları kapat, sıcaklığı düşür' : 'Turn off lights, lower temperature'}
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        transition={tactileSpring}
                        className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
                      >
                        {lang === 'tr' ? 'Etkinleştir' : 'Activate'}
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Garden - Irrigation */}
                {selectedRoom === 'garden' && (
                  <div className={`p-4 rounded-2xl sm:col-span-2 ${isDark ? 'bg-onyx-800/50 border border-white/5' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                          <Droplets size={24} className="text-green-500" />
                        </div>
                        <div>
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'tr' ? 'Sulama Sistemi' : 'Irrigation System'}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lang === 'tr' ? 'Sonraki: 18:00' : 'Next: 6:00 PM'}
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        transition={tactileSpring}
                        className="px-4 py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
                      >
                        {lang === 'tr' ? 'Şimdi Sula' : 'Water Now'}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Status Bar */}
      <div className={`flex items-center justify-between p-3 border-t text-xs ${isDark ? 'border-white/10 bg-onyx-800/30 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {lang === 'tr' ? 'Tüm sistemler aktif' : 'All systems online'}
          </span>
        </div>
        <span className="font-mono">AICO Villa Pro v2.4</span>
      </div>
    </motion.div>
  );
}
