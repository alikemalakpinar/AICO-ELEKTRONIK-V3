'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Thermometer,
  Bell,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Droplets,
  Battery,
  Radio,
  Power,
  Volume2,
  VolumeX,
} from 'lucide-react';
import DashboardShell, { StatusChip, TacticalButton } from '@/components/premium/DashboardShell';
import {
  parseFireLinkPacket,
  generateSimulatedPacket,
  getWarningLevel,
  getSensorColor,
  type FireLinkPacket,
  type FireLinkSensor,
} from '@/lib/utils/firelink-parser';
import type { Locale } from '@/types';

// Dynamically import the 3D component
const HeatStressHouse = dynamic(
  () => import('./HeatStressHouse'),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#0A0A0A] animate-pulse rounded-lg" /> }
);

// ===========================================
// FireLink Pro Dashboard - Magma Theme
// AAA Quality Fire Safety Monitoring
// ===========================================

interface FireLinkProDemoProps {
  lang: Locale;
  className?: string;
}

// Magma theme colors
const MAGMA = {
  background: '#050505',
  accent: '#FF4500', // Burning Amber
  warning: '#FF6B00',
  danger: '#FF0000',
  safe: '#22C55E',
  text: '#E5E5E5',
  muted: '#666666',
};

export default function FireLinkProDemo({ lang, className = '' }: FireLinkProDemoProps) {
  const [packet, setPacket] = useState<FireLinkPacket | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [scenario, setScenario] = useState<'normal' | 'warning' | 'critical'>('normal');
  const [selectedSensor, setSelectedSensor] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [history, setHistory] = useState<{ time: Date; level: string }[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Parse initial packet
  useEffect(() => {
    const initialPacket = generateSimulatedPacket('normal');
    setPacket(parseFireLinkPacket(initialPacket, lang));
  }, [lang]);

  // Simulation loop
  useEffect(() => {
    if (!isSimulating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const newPacket = generateSimulatedPacket(scenario);
      const parsed = parseFireLinkPacket(newPacket, lang);
      setPacket(parsed);

      // Update history
      setHistory(prev => [
        { time: new Date(), level: getWarningLevel(parsed) },
        ...prev.slice(0, 49),
      ]);

      // Play alarm sound if critical
      if (parsed.hasAnyFire && soundEnabled && audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating, scenario, lang, soundEnabled]);

  const warningLevel = packet ? getWarningLevel(packet) : 'offline';

  const systemStatuses = useMemo(() => {
    if (!packet) return [];
    return [
      {
        label: lang === 'tr' ? 'Durum' : 'Status',
        value: warningLevel === 'critical' ? (lang === 'tr' ? 'KRITIK' : 'CRITICAL') :
               warningLevel === 'warning' ? (lang === 'tr' ? 'UYARI' : 'WARNING') :
               (lang === 'tr' ? 'NORMAL' : 'NORMAL'),
        status: warningLevel as 'normal' | 'warning' | 'critical' | 'offline',
      },
      {
        label: lang === 'tr' ? 'Aktif Sensor' : 'Active Sensors',
        value: `${packet.sensors.length}/8`,
        status: 'normal' as const,
      },
      {
        label: lang === 'tr' ? 'Ortam' : 'Ambient',
        value: `${packet.ambientTemperature.toFixed(1)}`,
        unit: '°C',
        status: 'normal' as const,
      },
      {
        label: lang === 'tr' ? 'Nem' : 'Humidity',
        value: `${packet.humidity.toFixed(0)}`,
        unit: '%',
        status: 'normal' as const,
      },
      {
        label: lang === 'tr' ? 'Pil' : 'Battery',
        value: `${(packet.batteryVoltage / 1000).toFixed(2)}`,
        unit: 'V',
        status: packet.batteryVoltage > 3500 ? 'normal' as const : 'warning' as const,
      },
    ];
  }, [packet, warningLevel, lang]);

  const headerRight = (
    <button
      onClick={() => setSoundEnabled(!soundEnabled)}
      className={`p-2 rounded-lg transition-colors ${
        soundEnabled ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-offwhite-600'
      }`}
    >
      {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );

  return (
    <DashboardShell
      lang={lang}
      title={lang === 'tr' ? 'YANGIN IZLEME SISTEMI' : 'FIRE MONITORING SYSTEM'}
      subtitle={lang === 'tr' ? 'Gercek Zamanli Termal Analiz' : 'Real-Time Thermal Analysis'}
      brandName="FIRELINK"
      brandVersion="3.0"
      accentColor={MAGMA.accent}
      systemStatuses={systemStatuses}
      isConnected={isSimulating}
      headerRight={headerRight}
      className={className}
    >
      <div className="grid lg:grid-cols-2 gap-4 p-4">
        {/* Left: 3D Visualization */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-xl overflow-hidden border border-white/5 bg-[#0A0A0A]">
          {packet && (
            <HeatStressHouse
              sensors={packet.sensors}
              selectedSensor={selectedSensor}
              onSelectSensor={setSelectedSensor}
              accentColor={MAGMA.accent}
            />
          )}

          {/* 3D View Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
            <div className="text-[10px] text-offwhite-700 font-mono">
              {lang === 'tr' ? '3D TERMAL GORUNTULEME' : '3D THERMAL VISUALIZATION'}
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 rounded text-[10px]">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-offwhite-600">{lang === 'tr' ? 'Normal' : 'Normal'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 rounded text-[10px]">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-offwhite-600">{lang === 'tr' ? 'Uyari' : 'Warning'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-black/50 rounded text-[10px]">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-offwhite-600">{lang === 'tr' ? 'Kritik' : 'Critical'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sensor Grid & Controls */}
        <div className="flex flex-col gap-4">
          {/* Sensor Grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
            {packet?.sensors.map((sensor) => (
              <SensorCard
                key={sensor.id}
                sensor={sensor}
                lang={lang}
                isSelected={selectedSensor === sensor.id}
                onClick={() => setSelectedSensor(
                  selectedSensor === sensor.id ? null : sensor.id
                )}
              />
            ))}
          </div>

          {/* Alert History */}
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-offwhite-600 text-xs font-mono uppercase">
                {lang === 'tr' ? 'Olay Gecmisi' : 'Event History'}
              </span>
              <Activity size={12} className="text-offwhite-700" />
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-offwhite-800 text-xs">
                  {lang === 'tr' ? 'Simulasyonu baslatin...' : 'Start simulation...'}
                </p>
              ) : (
                history.slice(0, 5).map((event, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-offwhite-700 font-mono">
                      {event.time.toLocaleTimeString()}
                    </span>
                    <span
                      className="uppercase font-mono"
                      style={{
                        color: event.level === 'critical' ? MAGMA.danger :
                               event.level === 'warning' ? MAGMA.warning :
                               MAGMA.safe,
                      }}
                    >
                      {event.level}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-offwhite-600 text-xs font-mono uppercase">
                {lang === 'tr' ? 'Simulasyon Kontrolu' : 'Simulation Control'}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  isSimulating ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
                }`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <TacticalButton
                onClick={() => setScenario('normal')}
                variant={scenario === 'normal' ? 'primary' : 'secondary'}
                accentColor={MAGMA.safe}
                size="sm"
              >
                {lang === 'tr' ? 'Normal' : 'Normal'}
              </TacticalButton>
              <TacticalButton
                onClick={() => setScenario('warning')}
                variant={scenario === 'warning' ? 'primary' : 'secondary'}
                accentColor={MAGMA.warning}
                size="sm"
              >
                {lang === 'tr' ? 'Uyari' : 'Warning'}
              </TacticalButton>
              <TacticalButton
                onClick={() => setScenario('critical')}
                variant={scenario === 'critical' ? 'primary' : 'secondary'}
                accentColor={MAGMA.danger}
                size="sm"
              >
                {lang === 'tr' ? 'Kritik' : 'Critical'}
              </TacticalButton>
            </div>

            <TacticalButton
              onClick={() => setIsSimulating(!isSimulating)}
              variant={isSimulating ? 'danger' : 'primary'}
              accentColor={MAGMA.accent}
              size="md"
              className="w-full"
            >
              <div className="flex items-center justify-center gap-2">
                <Power size={14} />
                <span>
                  {isSimulating
                    ? (lang === 'tr' ? 'DURDUR' : 'STOP')
                    : (lang === 'tr' ? 'BASLAT' : 'START')}
                </span>
              </div>
            </TacticalButton>
          </div>
        </div>
      </div>

      {/* Critical Alert Overlay */}
      <AnimatePresence>
        {packet?.hasAnyFire && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${MAGMA.danger}20 0%, transparent 70%)`,
                animation: 'pulse 1s ease-in-out infinite',
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="flex flex-col items-center gap-2 p-6 bg-red-500/20 border border-red-500 rounded-xl backdrop-blur-sm"
              >
                <AlertTriangle size={48} className="text-red-500" />
                <span className="text-red-500 font-mono text-xl font-bold">
                  {lang === 'tr' ? 'YANGIN ALARMI' : 'FIRE ALARM'}
                </span>
                <span className="text-red-400 text-sm">
                  {lang === 'tr'
                    ? `Sensor ${packet.criticalSensors.join(', ')}: ${packet.sensors.find(s => s.hasFire)?.zone}`
                    : `Sensor ${packet.criticalSensors.join(', ')}: ${packet.sensors.find(s => s.hasFire)?.zone}`}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden audio element for alarm */}
      <audio
        ref={audioRef}
        src="/sounds/alarm.mp3"
        preload="auto"
        style={{ display: 'none' }}
      />
    </DashboardShell>
  );
}

// ===========================================
// SensorCard - Tactical Sensor Status Display
// ===========================================

interface SensorCardProps {
  sensor: FireLinkSensor;
  lang: Locale;
  isSelected: boolean;
  onClick: () => void;
}

function SensorCard({ sensor, lang, isSelected, onClick }: SensorCardProps) {
  const color = getSensorColor(sensor);
  const isCritical = sensor.hasFire;
  const isWarning = sensor.hasSmoke && !sensor.hasFire;

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative p-3 rounded-lg border text-left transition-all
        ${isSelected ? 'ring-2' : ''}
      `}
      style={{
        backgroundColor: isCritical ? `${color}15` : isWarning ? `${color}10` : '#0A0A0A',
        borderColor: isSelected ? color : isCritical ? `${color}50` : 'rgba(255,255,255,0.05)',
        boxShadow: isCritical ? `0 0 20px ${color}30` : undefined,
      }}
      animate={isCritical ? {
        boxShadow: [`0 0 10px ${color}20`, `0 0 25px ${color}40`, `0 0 10px ${color}20`],
      } : undefined}
      transition={{ repeat: isCritical ? Infinity : 0, duration: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-offwhite-700 font-mono">S{sensor.id}</span>
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={isCritical ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : undefined}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
      </div>

      {/* Temperature */}
      <div className="flex items-baseline gap-1 mb-1">
        <span
          className="text-xl font-mono font-bold"
          style={{ color: isCritical || isWarning ? color : '#E5E5E5' }}
        >
          {sensor.temperature.toFixed(1)}
        </span>
        <span className="text-offwhite-700 text-xs">°C</span>
      </div>

      {/* Zone */}
      <div className="text-[10px] text-offwhite-600 truncate">
        {sensor.zone}
      </div>

      {/* Smoke indicator */}
      {sensor.smokeDensity > 50 && (
        <div className="flex items-center gap-1 mt-2">
          <Droplets size={10} style={{ color }} />
          <span className="text-[10px] font-mono" style={{ color }}>
            {sensor.smokeDensity}
          </span>
        </div>
      )}

      {/* Alert badge */}
      {(isCritical || isWarning) && (
        <div
          className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold"
          style={{ backgroundColor: color, color: '#000' }}
        >
          {isCritical ? 'FIRE' : 'SMOKE'}
        </div>
      )}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-px" style={{ backgroundColor: color }} />
      <div className="absolute top-0 left-0 w-px h-2" style={{ backgroundColor: color }} />
      <div className="absolute bottom-0 right-0 w-2 h-px" style={{ backgroundColor: color }} />
      <div className="absolute bottom-0 right-0 w-px h-2" style={{ backgroundColor: color }} />
    </motion.button>
  );
}
