'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, PanInfo } from 'framer-motion';
import {
  Lock,
  Unlock,
  QrCode,
  Video,
  Phone,
  PhoneOff,
  User,
  Clock,
  ChevronRight,
  Bell,
  Shield,
  Wifi,
  Battery,
  Signal,
  Home,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import type { Locale } from '@/types';

interface ResidenceMobileDemoProps {
  lang: Locale;
}

type ScreenType = 'home' | 'unlock' | 'qr' | 'intercom';

// Generate a simple QR-like pattern
function QRCodePattern({ value }: { value: string }) {
  // Create a deterministic pattern based on the value
  const hash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pattern = [];

  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      // Corner markers (7x7 squares with 3x3 inner)
      const isCorner =
        (row < 7 && col < 7) ||
        (row < 7 && col >= 18) ||
        (row >= 18 && col < 7);

      const isCornerOuter =
        isCorner && (row === 0 || row === 6 || col === 0 || col === 6 ||
                     (row >= 18 && (row === 18 || row === 24)) ||
                     (col >= 18 && (col === 18 || col === 24)));

      const isCornerInner =
        isCorner && (
          (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
          (row >= 2 && row <= 4 && col >= 20 && col <= 22) ||
          (row >= 20 && row <= 22 && col >= 2 && col <= 4)
        );

      // Data area
      const seedValue = (hash * (row + 1) * (col + 1)) % 100;
      const isData = !isCorner && seedValue > 50;

      const isFilled = isCornerOuter || isCornerInner || isData;

      if (isFilled) {
        pattern.push(
          <rect
            key={`${row}-${col}`}
            x={col * 4}
            y={row * 4}
            width={4}
            height={4}
            fill="currentColor"
          />
        );
      }
    }
  }

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {pattern}
    </svg>
  );
}

export default function ResidenceMobileDemo({ lang }: ResidenceMobileDemoProps) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  // Mobile optimization - lighter animations on mobile/low-end devices
  const { shouldUseLiteMode, prefersReducedMotion } = useMobileOptimization();

  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCountdown, setQrCountdown] = useState(0);
  const [hasIncomingCall, setHasIncomingCall] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Slide to unlock motion values with rubber-band physics
  // Use lighter spring config on mobile to reduce CPU usage
  const slideX = useMotionValue(0);
  const springConfig = shouldUseLiteMode
    ? { stiffness: 400, damping: 30, mass: 0.3 } // Snappier, less physics simulation
    : { stiffness: 300, damping: 20, mass: 0.5 }; // Full physics
  const slideXSpring = useSpring(slideX, springConfig);
  const slideProgress = useTransform(slideX, [0, 200], [0, 1]);
  const slideOpacity = useTransform(slideProgress, [0, 1], [1, 0]);
  const slideScale = useTransform(slideProgress, shouldUseLiteMode ? [0, 1] : [0, 0.5, 1], shouldUseLiteMode ? [1, 1] : [1, 1.05, 1]);
  const slideProgressWidth = useTransform(slideProgress, [0, 1], ['0%', '100%']);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // QR Countdown
  useEffect(() => {
    if (qrCountdown > 0) {
      const timer = setTimeout(() => setQrCountdown(qrCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (qrCountdown === 0 && qrCode) {
      setQrCode(null);
    }
  }, [qrCountdown, qrCode]);

  // Generate QR Code
  const generateQR = () => {
    const code = `AICO-GUEST-${Date.now().toString(36).toUpperCase()}`;
    setQrCode(code);
    setQrCountdown(300); // 5 minutes
  };

  // Handle slide to unlock
  const handleSlideDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 180) {
      setIsUnlocked(true);
      setTimeout(() => {
        setIsUnlocked(false);
        slideX.set(0);
      }, 3000);
    } else {
      slideX.set(0);
    }
  };

  // Simulate incoming call
  const simulateCall = () => {
    setHasIncomingCall(true);
    setCurrentScreen('intercom');
  };

  // Format countdown
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center p-8">
      {/* iPhone Mockup */}
      <div className="relative">
        {/* Phone Frame */}
        <div
          className="relative w-[280px] h-[580px] rounded-[45px] p-3"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
              : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            boxShadow: isDark
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          {/* Screen */}
          <div className={`relative w-full h-full rounded-[35px] overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
            {/* Glass Reflection Overlay - Simplified on mobile to reduce GPU load */}
            {!shouldUseLiteMode && (
              <>
                <div
                  className="absolute inset-0 z-30 pointer-events-none rounded-[35px]"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      rgba(255, 255, 255, 0.15) 0%,
                      rgba(255, 255, 255, 0.05) 30%,
                      transparent 50%,
                      rgba(255, 255, 255, 0.02) 70%,
                      rgba(255, 255, 255, 0.08) 100%
                    )`,
                  }}
                />
                {/* Secondary light streak */}
                <div
                  className="absolute -top-20 -left-20 w-40 h-[200%] z-30 pointer-events-none rotate-[30deg]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                  }}
                />
              </>
            )}
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-black rounded-b-2xl z-20" />

            {/* Status Bar */}
            <div className={`absolute top-0 left-0 right-0 h-12 flex items-end justify-between px-6 pb-1 z-10 ${isDark ? 'text-white' : 'text-black'}`}>
              <span className="text-xs font-semibold">
                {currentTime.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="flex items-center gap-1">
                <Signal size={12} />
                <Wifi size={12} />
                <Battery size={14} />
              </div>
            </div>

            {/* Screen Content */}
            <AnimatePresence mode="wait">
              {/* Home Screen */}
              {currentScreen === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pt-14 pb-8 px-4"
                  style={{
                    background: isDark
                      ? 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)'
                      : 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)'
                  }}
                >
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-engineer-500/20 flex items-center justify-center">
                      <Home size={28} className="text-engineer-500" />
                    </div>
                    <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      AICO Residence
                    </h1>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {lang === 'tr' ? 'Hoş geldiniz' : 'Welcome'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setCurrentScreen('unlock')}
                      className="w-full p-4 rounded-2xl bg-engineer-500 text-white flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Lock size={20} />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold">
                          {lang === 'tr' ? 'Ana Kapı' : 'Main Door'}
                        </div>
                        <div className="text-xs opacity-80">
                          {lang === 'tr' ? 'Açmak için kaydır' : 'Slide to unlock'}
                        </div>
                      </div>
                      <ChevronRight size={20} />
                    </button>

                    <button
                      onClick={() => setCurrentScreen('qr')}
                      className={`w-full p-4 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                        <QrCode size={20} className="text-purple-500" />
                      </div>
                      <div className="text-left flex-1">
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {lang === 'tr' ? 'Misafir QR' : 'Guest QR'}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {lang === 'tr' ? 'Tek kullanımlık kod oluştur' : 'Create one-time code'}
                        </div>
                      </div>
                      <ChevronRight size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    </button>

                    <button
                      onClick={simulateCall}
                      className={`w-full p-4 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                        <Video size={20} className="text-green-500" />
                      </div>
                      <div className="text-left flex-1">
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {lang === 'tr' ? 'Kapı Görüntülü' : 'Door Camera'}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {lang === 'tr' ? 'Çağrı simüle et' : 'Simulate incoming call'}
                        </div>
                      </div>
                      <ChevronRight size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    </button>
                  </div>

                  {/* Bottom Nav */}
                  <div className={`absolute bottom-4 left-4 right-4 flex justify-around p-3 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white shadow-lg'}`}>
                    {[
                      { icon: Home, active: true },
                      { icon: Bell, active: false },
                      { icon: MessageSquare, active: false },
                      { icon: Settings, active: false },
                    ].map((item, i) => (
                      <button key={i} className={`p-2 rounded-xl ${item.active ? 'bg-engineer-500 text-white' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <item.icon size={20} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Unlock Screen */}
              {currentScreen === 'unlock' && (
                <motion.div
                  key="unlock"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pt-14 pb-8 px-4 flex flex-col"
                  style={{
                    background: isDark
                      ? 'linear-gradient(180deg, #0f172a 0%, #020617 100%)'
                      : 'linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 100%)'
                  }}
                >
                  {/* Back Button */}
                  <button
                    onClick={() => { setCurrentScreen('home'); setIsUnlocked(false); }}
                    className={`self-start mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    ← {lang === 'tr' ? 'Geri' : 'Back'}
                  </button>

                  <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Lock Icon - Simplified animation on mobile */}
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? { scale: isUnlocked ? 1.1 : 1 }
                          : {
                              scale: isUnlocked ? [1, 1.2, 1] : 1,
                              rotate: isUnlocked ? [0, -10, 10, 0] : 0,
                            }
                      }
                      transition={{ duration: prefersReducedMotion ? 0.2 : 0.5 }}
                      className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 ${
                        isUnlocked ? 'bg-green-500' : isDark ? 'bg-white/10' : 'bg-gray-200'
                      }`}
                    >
                      {isUnlocked ? (
                        <Unlock size={48} className="text-white" />
                      ) : (
                        <Lock size={48} className={isDark ? 'text-white' : 'text-gray-700'} />
                      )}
                    </motion.div>

                    <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {isUnlocked
                        ? (lang === 'tr' ? 'Kapı Açıldı!' : 'Door Unlocked!')
                        : (lang === 'tr' ? 'Ana Giriş Kapısı' : 'Main Entrance')
                      }
                    </h2>
                    <p className={`text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isUnlocked
                        ? (lang === 'tr' ? '3 saniye içinde kapanacak' : 'Will lock in 3 seconds')
                        : (lang === 'tr' ? 'Açmak için kaydırın' : 'Slide to unlock')
                      }
                    </p>

                    {/* Slide to Unlock with Rubber-band Physics */}
                    {!isUnlocked && (
                      <div className={`relative w-full h-16 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                        {/* Progress fill */}
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-engineer-500/20"
                          style={{ width: slideProgressWidth }}
                        />

                        <motion.div
                          className="absolute inset-y-1 left-1 w-14 h-14 rounded-full bg-engineer-500 flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-lg"
                          drag="x"
                          dragConstraints={{ left: 0, right: 200 }}
                          dragElastic={shouldUseLiteMode ? 0.1 : 0.2}
                          style={{ x: slideXSpring, scale: shouldUseLiteMode ? 1 : slideScale }}
                          onDragEnd={handleSlideDragEnd}
                          whileTap={shouldUseLiteMode ? {} : { scale: 0.95 }}
                          whileHover={shouldUseLiteMode ? {} : { scale: 1.02 }}
                        >
                          {/* Arrow animation - simplified or disabled on mobile */}
                          <motion.div
                            animate={prefersReducedMotion ? {} : { x: [0, 5, 0] }}
                            transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                            className="flex items-center"
                          >
                            <ChevronRight size={24} className="text-white" />
                            <ChevronRight size={24} className="text-white -ml-3 opacity-60" />
                          </motion.div>
                        </motion.div>

                        <motion.span
                          style={{ opacity: slideOpacity }}
                          className={`absolute inset-0 flex items-center justify-center font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                          {lang === 'tr' ? '→ Kaydır →' : '→ Slide →'}
                        </motion.span>
                      </div>
                    )}

                    {isUnlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-16 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <span className="text-white font-bold text-lg">✓ {lang === 'tr' ? 'AÇILDI' : 'UNLOCKED'}</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* QR Screen */}
              {currentScreen === 'qr' && (
                <motion.div
                  key="qr"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pt-14 pb-8 px-4 flex flex-col"
                  style={{
                    background: isDark
                      ? 'linear-gradient(180deg, #1e1b4b 0%, #0f0a1f 100%)'
                      : 'linear-gradient(180deg, #f5f3ff 0%, #ddd6fe 100%)'
                  }}
                >
                  {/* Back Button */}
                  <button
                    onClick={() => { setCurrentScreen('home'); setQrCode(null); setQrCountdown(0); }}
                    className={`self-start mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    ← {lang === 'tr' ? 'Geri' : 'Back'}
                  </button>

                  <div className="flex-1 flex flex-col items-center justify-center">
                    <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {lang === 'tr' ? 'Misafir QR Kodu' : 'Guest QR Code'}
                    </h2>
                    <p className={`text-sm mb-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {qrCode
                        ? (lang === 'tr' ? 'Misafirinize gösterin' : 'Show to your guest')
                        : (lang === 'tr' ? 'Tek kullanımlık giriş kodu' : 'One-time entry code')
                      }
                    </p>

                    {qrCode ? (
                      <>
                        {/* QR Code Display */}
                        <div className={`w-48 h-48 p-4 rounded-2xl mb-4 ${isDark ? 'bg-white' : 'bg-white shadow-lg'}`}>
                          <div className="w-full h-full text-black">
                            <QRCodePattern value={qrCode} />
                          </div>
                        </div>

                        {/* Code Text */}
                        <div className={`px-4 py-2 rounded-lg mb-4 font-mono text-sm ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>
                          {qrCode}
                        </div>

                        {/* Countdown */}
                        <div className="flex items-center gap-2 mb-6">
                          <Clock size={16} className="text-purple-500" />
                          <span className={`font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {formatCountdown(qrCountdown)}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lang === 'tr' ? 'kaldı' : 'remaining'}
                          </span>
                        </div>

                        <button
                          onClick={generateQR}
                          className={`px-6 py-3 rounded-xl font-medium ${isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {lang === 'tr' ? 'Yeni Kod Oluştur' : 'Generate New Code'}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={generateQR}
                        className="px-8 py-4 rounded-2xl bg-purple-500 text-white font-semibold flex items-center gap-3"
                      >
                        <QrCode size={24} />
                        {lang === 'tr' ? 'QR Kod Oluştur' : 'Generate QR Code'}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Intercom Screen */}
              {currentScreen === 'intercom' && (
                <motion.div
                  key="intercom"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col"
                  style={{
                    background: 'linear-gradient(180deg, #065f46 0%, #022c22 100%)'
                  }}
                >
                  {/* Video Placeholder */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                          <User size={40} className="text-white" />
                        </div>
                        <div className="text-white font-medium">
                          {lang === 'tr' ? 'Lobi Kapısı' : 'Lobby Door'}
                        </div>
                        <div className="text-white/60 text-sm">
                          {lang === 'tr' ? 'Video bağlantısı...' : 'Video connecting...'}
                        </div>
                      </div>
                    </div>

                    {/* Incoming Call Animation - respects reduced motion */}
                    {hasIncomingCall && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-20 left-0 right-0 text-center"
                      >
                        <motion.div
                          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
                          transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 1 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white"
                        >
                          <Phone size={16} />
                          <span className="text-sm font-medium">
                            {lang === 'tr' ? 'Gelen Çağrı...' : 'Incoming Call...'}
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Call Controls */}
                  <div className="p-6 pb-12">
                    <div className="flex items-center justify-center gap-8">
                      {/* Decline */}
                      <button
                        onClick={() => { setHasIncomingCall(false); setCurrentScreen('home'); }}
                        className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center"
                      >
                        <PhoneOff size={28} className="text-white" />
                      </button>

                      {/* Unlock Door */}
                      <button
                        onClick={() => {
                          setHasIncomingCall(false);
                          setIsUnlocked(true);
                          setTimeout(() => {
                            setIsUnlocked(false);
                            setCurrentScreen('home');
                          }, 2000);
                        }}
                        className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <Unlock size={32} className="text-white" />
                      </button>

                      {/* Accept Video */}
                      <button
                        onClick={() => setHasIncomingCall(false)}
                        className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center"
                      >
                        <Video size={28} className="text-white" />
                      </button>
                    </div>

                    <div className="flex justify-center gap-8 mt-4 text-white/60 text-xs">
                      <span>{lang === 'tr' ? 'Reddet' : 'Decline'}</span>
                      <span>{lang === 'tr' ? 'Kapıyı Aç' : 'Unlock'}</span>
                      <span>{lang === 'tr' ? 'Görüntü' : 'Video'}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
          </div>
        </div>

        {/* Floating Label */}
        <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium ${
          isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
        }`}>
          {lang === 'tr' ? 'AICO Residence Uygulaması' : 'AICO Residence App'}
        </div>
      </div>
    </div>
  );
}
