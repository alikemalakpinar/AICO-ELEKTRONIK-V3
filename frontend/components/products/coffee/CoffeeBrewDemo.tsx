'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Coffee,
  Droplets,
  ThermometerSun,
  Clock,
  Settings,
  Play,
  Pause,
  ChevronRight,
  Wifi,
  Volume2,
  Heart,
} from 'lucide-react';
import type { Locale } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';

interface CoffeeBrewDemoProps {
  lang?: Locale;
  className?: string;
  compact?: boolean;
}

interface Recipe {
  id: string;
  name: string;
  nameTr: string;
  temp: number;
  strength: 'light' | 'medium' | 'strong';
  time: number;
  grindSize: number;
  water: number;
  isFavorite: boolean;
  icon: string;
}

const recipes: Recipe[] = [
  { id: 'espresso', name: 'Espresso', nameTr: 'Espresso', temp: 93, strength: 'strong', time: 25, grindSize: 2, water: 30, isFavorite: true, icon: '☕' },
  { id: 'americano', name: 'Americano', nameTr: 'Americano', temp: 92, strength: 'medium', time: 35, grindSize: 3, water: 150, isFavorite: false, icon: '🥤' },
  { id: 'cappuccino', name: 'Cappuccino', nameTr: 'Kapuçino', temp: 65, strength: 'medium', time: 45, grindSize: 4, water: 180, isFavorite: true, icon: '🥛' },
  { id: 'latte', name: 'Latte', nameTr: 'Latte', temp: 60, strength: 'light', time: 50, grindSize: 5, water: 200, isFavorite: false, icon: '🍵' },
];

// Steam particle component
function SteamParticle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-white/30"
      initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
      animate={{
        y: [-20, -60],
        x: [0, (Math.random() - 0.5) * 20],
        opacity: [0, 0.6, 0],
        scale: [0, 1.5, 0.5],
      }}
      transition={{
        duration: 2 + Math.random(),
        repeat: Infinity,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
}

// Liquid fill animation
function LiquidFill({ progress, color }: { progress: number; color: string }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 rounded-b-xl"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 20px ${color}40`,
      }}
      animate={{ height: `${progress}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Liquid surface ripple */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2"
        style={{
          background: `linear-gradient(to bottom, ${color}00, ${color})`,
        }}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export default function CoffeeBrewDemo({ lang = 'tr', className = '', compact = false }: CoffeeBrewDemoProps) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipes[0]);
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewProgress, setBrwProgress] = useState(0);
  const [showSteam, setShowSteam] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const brewIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Motion values for cup tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  // Start brewing
  const startBrew = () => {
    if (isBrewing) return;
    setIsBrewing(true);
    setIsReady(false);
    setBrwProgress(0);
    setCurrentTemp(20);

    const totalTime = selectedRecipe.time * 1000;
    const interval = 100;
    let elapsed = 0;

    brewIntervalRef.current = setInterval(() => {
      elapsed += interval;
      const progress = Math.min((elapsed / totalTime) * 100, 100);
      setBrwProgress(progress);

      // Temperature simulation
      const tempProgress = Math.min(elapsed / (totalTime * 0.6), 1);
      setCurrentTemp(20 + (selectedRecipe.temp - 20) * tempProgress);

      // Show steam when hot enough
      if (tempProgress > 0.5) {
        setShowSteam(true);
      }

      if (progress >= 100) {
        if (brewIntervalRef.current) {
          clearInterval(brewIntervalRef.current);
        }
        setIsBrewing(false);
        setIsReady(true);
      }
    }, interval);
  };

  // Stop brewing
  const stopBrew = () => {
    if (brewIntervalRef.current) {
      clearInterval(brewIntervalRef.current);
    }
    setIsBrewing(false);
    setBrwProgress(0);
    setShowSteam(false);
    setCurrentTemp(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (brewIntervalRef.current) {
        clearInterval(brewIntervalRef.current);
      }
    };
  }, []);

  // Reset when recipe changes
  useEffect(() => {
    stopBrew();
    setIsReady(false);
  }, [selectedRecipe]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const getStrengthBars = (strength: Recipe['strength']) => {
    return strength === 'light' ? 1 : strength === 'medium' ? 2 : 3;
  };

  const accentColor = '#A855F7';

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-onyx-900' : 'bg-white'} ${className}`}
         style={{ boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}>
      {/* Header */}
      <div className={`flex items-center justify-between p-3 sm:p-4 border-b ${isDark ? 'border-white/10 bg-onyx-800/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Coffee size={compact ? 14 : 16} className="text-purple-500" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-purple-500/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-offwhite-400' : 'text-gray-900'}`}>AICO Coffee</span>
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">
            <Wifi size={10} className="text-purple-500" />
            <span className="text-purple-500 text-[10px] font-mono">CONNECTED</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Volume2 size={12} className={isDark ? 'text-offwhite-600' : 'text-gray-500'} />
          <div className="flex gap-0.5">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-1 rounded-full ${i <= 2 ? 'bg-purple-500' : isDark ? 'bg-onyx-600' : 'bg-gray-300'}`} style={{ height: `${(i + 1) * 4}px` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex gap-4">
          {/* Coffee Cup Visualization */}
          <motion.div
            className="flex-shrink-0 relative"
            style={{ perspective: 500 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            <motion.div
              className="relative"
              style={{ rotateX, rotateY }}
            >
              {/* Cup */}
              <div className="relative w-20 h-28 sm:w-24 sm:h-32">
                {/* Cup body */}
                <div className="absolute inset-0 bg-gradient-to-b from-onyx-600 to-onyx-700 rounded-b-3xl rounded-t-lg overflow-hidden border border-white/10">
                  {/* Coffee fill */}
                  <LiquidFill
                    progress={brewProgress * 0.8}
                    color={selectedRecipe.strength === 'light' ? '#8B4513' : selectedRecipe.strength === 'medium' ? '#5D3A1A' : '#3D2314'}
                  />

                  {/* Cup shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                </div>

                {/* Handle */}
                <div className="absolute right-0 top-1/3 w-4 h-12 sm:w-5 sm:h-14 -mr-3 sm:-mr-4">
                  <div className="w-full h-full rounded-r-full border-4 border-onyx-600" style={{ borderLeft: 'none' }} />
                </div>

                {/* Steam */}
                <AnimatePresence>
                  {showSteam && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <SteamParticle key={i} delay={i * 0.3} />
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Ready indicator */}
                <AnimatePresence>
                  {isReady && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Saucer */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-3 sm:w-28 sm:h-4 bg-gradient-to-b from-onyx-500 to-onyx-600 rounded-full" />
            </motion.div>

            {/* Temperature display */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <ThermometerSun size={12} className="text-orange-400" />
                <span className="text-lg font-mono font-bold text-offwhite-400">
                  {Math.round(currentTemp)}°C
                </span>
              </div>
              <div className="text-[10px] text-offwhite-700">
                {lang === 'tr' ? 'Hedef' : 'Target'}: {selectedRecipe.temp}°C
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex-1 min-w-0">
            {/* Recipe selector */}
            <div className="mb-3">
              <div className="text-[10px] text-offwhite-700 uppercase tracking-wider mb-2">
                {lang === 'tr' ? 'Tarif Seçin' : 'Select Recipe'}
              </div>
              <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {recipes.map(recipe => (
                  <button
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className={`flex-shrink-0 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                      selectedRecipe.id === recipe.id
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                        : 'bg-onyx-800 text-offwhite-600 border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className="mr-1">{recipe.icon}</span>
                    {lang === 'tr' ? recipe.nameTr : recipe.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe details */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 bg-onyx-800 rounded-lg">
                <div className="flex items-center gap-1 text-[10px] text-offwhite-700 mb-1">
                  <Clock size={10} />
                  {lang === 'tr' ? 'Süre' : 'Time'}
                </div>
                <div className="text-sm font-mono font-bold text-offwhite-400">
                  {selectedRecipe.time}s
                </div>
              </div>
              <div className="p-2 bg-onyx-800 rounded-lg">
                <div className="flex items-center gap-1 text-[10px] text-offwhite-700 mb-1">
                  <Settings size={10} />
                  {lang === 'tr' ? 'Güç' : 'Strength'}
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={`w-4 h-2 rounded-full transition-colors ${
                        i <= getStrengthBars(selectedRecipe.strength)
                          ? 'bg-purple-500'
                          : 'bg-onyx-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-2 bg-onyx-800 rounded-lg">
                <div className="flex items-center gap-1 text-[10px] text-offwhite-700 mb-1">
                  <Droplets size={10} />
                  {lang === 'tr' ? 'Su' : 'Water'}
                </div>
                <div className="text-sm font-mono font-bold text-offwhite-400">
                  {selectedRecipe.water}ml
                </div>
              </div>
              <div className="p-2 bg-onyx-800 rounded-lg">
                <div className="flex items-center gap-1 text-[10px] text-offwhite-700 mb-1">
                  <Coffee size={10} />
                  {lang === 'tr' ? 'Öğütme' : 'Grind'}
                </div>
                <div className="text-sm font-mono font-bold text-offwhite-400">
                  {selectedRecipe.grindSize}/15
                </div>
              </div>
            </div>

            {/* Brew button */}
            <motion.button
              onClick={isBrewing ? stopBrew : startBrew}
              disabled={isReady}
              whileHover={{ scale: isReady ? 1 : 1.02 }}
              whileTap={{ scale: isReady ? 1 : 0.98 }}
              className={`w-full p-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                isReady
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : isBrewing
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
              style={!isBrewing && !isReady ? { boxShadow: `0 0 20px ${accentColor}40` } : {}}
            >
              {isReady ? (
                <>
                  <span>✓</span>
                  {lang === 'tr' ? 'Hazır!' : 'Ready!'}
                </>
              ) : isBrewing ? (
                <>
                  <Pause size={16} />
                  {lang === 'tr' ? 'Durdur' : 'Stop'}
                </>
              ) : (
                <>
                  <Play size={16} />
                  {lang === 'tr' ? 'Demlemeyi Başlat' : 'Start Brewing'}
                </>
              )}
            </motion.button>

            {/* Progress bar */}
            {isBrewing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2"
              >
                <div className="h-1.5 bg-onyx-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${brewProgress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-offwhite-700">
                  <span>{lang === 'tr' ? 'Demleniyor...' : 'Brewing...'}</span>
                  <span className="font-mono">{Math.round(brewProgress)}%</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Favorite recipes */}
      {!compact && (
        <div className="p-3 sm:p-4 border-t border-white/10 bg-onyx-800/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs text-offwhite-600">
              <Heart size={12} className="text-red-400" />
              {lang === 'tr' ? 'Favoriler' : 'Favorites'}
            </div>
            <ChevronRight size={14} className="text-offwhite-700" />
          </div>
          <div className="flex gap-2">
            {recipes.filter(r => r.isFavorite).map(recipe => (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] transition-colors ${
                  selectedRecipe.id === recipe.id
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-onyx-700/50 text-offwhite-600 hover:bg-onyx-700'
                }`}
              >
                <span>{recipe.icon}</span>
                {lang === 'tr' ? recipe.nameTr : recipe.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="p-2 border-t border-white/10 bg-onyx-800/50">
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-offwhite-600">{lang === 'tr' ? 'Çevrimiçi' : 'Online'}</span>
            </div>
            <span className="text-offwhite-700">
              {lang === 'tr' ? 'Su Seviyesi: Yeterli' : 'Water Level: OK'}
            </span>
          </div>
          <span className="text-purple-500 font-mono">v1.8</span>
        </div>
      </div>
    </div>
  );
}
