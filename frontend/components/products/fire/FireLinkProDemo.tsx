'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Thermometer,
  AlertTriangle,
  Activity,
  Power,
  Wind,
  Gauge,
  Zap,
  Cable,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';
import DashboardShell, { StatusChip, TacticalButton } from '@/components/premium/DashboardShell';
import {
  parseFireLinkPacket,
  generateSimulatedPacket,
  getWarningLevel,
  getSensorColor,
  enrichPacketWithEnvironmental,
  type FireLinkPacket,
  type FireLinkSensor,
} from '@/lib/utils/firelink-parser';
import type { Locale } from '@/types';

// Dynamically import the 3D component
const HeatStressHouse = dynamic(
  () => import('./HeatStressHouse'),
  { ssr: false, loading: () => <div className="w-full h-full bg-card animate-pulse rounded-lg" /> }
);

// ===========================================
// FireLink Pro Dashboard - Magma Theme
// AAA Quality Electrical Fire Early Warning
// ===========================================

interface FireLinkProDemoProps {
  lang: Locale;
  className?: string;
}

// Magma theme colors (kept for accent-specific inline styles only)
const MAGMA = {
  accent: '#FF4500',
  warning: '#FF6B00',
  danger: '#FF0000',
  safe: '#22C55E',
};

export default function FireLinkProDemo({ lang, className = '' }: FireLinkProDemoProps) {
  const [packet, setPacket] = useState<FireLinkPacket | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [scenario, setScenario] = useState<'normal' | 'warning' | 'critical'>('normal');
  const [selectedSensor, setSelectedSensor] = useState<number | null>(null);
  const [history, setHistory] = useState<{ time: Date; level: string }[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

      setHistory(prev => [
        { time: new Date(), level: getWarningLevel(parsed) },
        ...prev.slice(0, 49),
      ]);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating, scenario, lang]);

  const warningLevel = packet ? getWarningLevel(packet) : 'offline';

  // Enrich packet with electrical demo data
  const richPacket = useMemo(
    () => (packet ? enrichPacketWithEnvironmental(packet) : null),
    [packet]
  );

  const systemStatuses = useMemo(() => {
    if (!packet) return [];
    return [
      {
        label: lang === 'tr' ? 'Durum' : 'Status',
        value: warningLevel === 'critical' ? (lang === 'tr' ? 'KRİTİK' : 'CRITICAL') :
               warningLevel === 'warning' ? (lang === 'tr' ? 'UYARI' : 'WARNING') :
               (lang === 'tr' ? 'NORMAL' : 'NORMAL'),
        status: warningLevel as 'normal' | 'warning' | 'critical' | 'offline',
      },
      {
        label: lang === 'tr' ? 'Aktif Sensör' : 'Active Sensors',
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

  // Build metrics array from enriched packet
  const metrics = useMemo(() => {
    if (!richPacket) return [];
    const avgSensor = richPacket.sensors.length > 0
      ? richPacket.sensors.reduce(
          (acc, s) => ({
            cableTemp: acc.cableTemp + s.cableTemp,
            arcActivity: acc.arcActivity + s.arcActivity,
            smoldering: acc.smoldering + s.smolderingRisk,
          }),
          { cableTemp: 0, arcActivity: 0, smoldering: 0 }
        )
      : { cableTemp: 0, arcActivity: 0, smoldering: 0 };
    const n = richPacket.sensors.length || 1;

    return [
      { icon: Thermometer, label: lang === 'tr' ? 'Kablo Sıcaklığı' : 'Cable Temp', value: (avgSensor.cableTemp / n).toFixed(1), unit: '°C' },
      { icon: Zap, label: lang === 'tr' ? 'Ark Aktivitesi' : 'Arc Activity', value: Math.round(avgSensor.arcActivity / n).toString(), unit: '' },
      { icon: Flame, label: lang === 'tr' ? 'İçten Yanma Riski' : 'Smoldering Risk', value: Math.round(avgSensor.smoldering / n).toString(), unit: '%' },
      { icon: Activity, label: lang === 'tr' ? 'Yük Akımı' : 'Current Load', value: richPacket.currentLoad.toFixed(1), unit: 'A' },
      { icon: ShieldCheck, label: lang === 'tr' ? 'Yalıtım Direnci' : 'Insulation Resistance', value: richPacket.insulationResistance.toFixed(1), unit: 'MΩ' },
      { icon: BarChart3, label: lang === 'tr' ? 'Harmonik Bozulma' : 'Harmonic Distortion', value: richPacket.harmonicDistortion.toFixed(1), unit: '%' },
      { icon: Gauge, label: lang === 'tr' ? 'Güç Faktörü' : 'Power Factor', value: richPacket.powerFactor.toFixed(2), unit: '' },
      { icon: Wind, label: lang === 'tr' ? 'Ortam Sıcaklığı' : 'Ambient Temp', value: richPacket.ambientTemperature.toFixed(1), unit: '°C' },
      { icon: Wind, label: lang === 'tr' ? 'Nem' : 'Humidity', value: richPacket.humidity.toFixed(1), unit: '%' },
      { icon: Power, label: lang === 'tr' ? 'Pil' : 'Battery', value: (richPacket.batteryVoltage / 1000).toFixed(2), unit: 'V' },
      { icon: Zap, label: lang === 'tr' ? 'Sistem Akımı' : 'System Current', value: richPacket.systemCurrent.toFixed(1), unit: 'mA' },
    ];
  }, [richPacket, lang]);

  return (
    <DashboardShell
      lang={lang}
      title={lang === 'tr' ? 'ELEKTRİKSEL YANGIN ERKEN UYARI' : 'ELECTRICAL FIRE EARLY WARNING'}
      subtitle={lang === 'tr' ? 'Kablo İçi Isınma & Ark Tespiti' : 'In-Cable Heating & Arc Detection'}
      brandName="FIRELINK"
      brandVersion="3.0"
      accentColor={MAGMA.accent}
      systemStatuses={systemStatuses}
      isConnected={isSimulating}
      className={className}
    >
      <div className="grid lg:grid-cols-2 gap-4 p-4 overflow-x-hidden">
        {/* Left: 3D Visualization */}
        <div className="relative aspect-square lg:aspect-auto min-h-[300px] lg:h-[500px] rounded-xl overflow-hidden border border-border bg-card">
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
            <div className="text-[10px] text-muted-foreground font-mono">
              {lang === 'tr' ? '3D TERMAL GÖRÜNTÜLEME' : '3D THERMAL VISUALIZATION'}
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-background/70 backdrop-blur-sm rounded text-[10px]">
                <div className="w-2 h-2 rounded-full bg-green-500" aria-hidden />
                <span className="text-muted-foreground">{lang === 'tr' ? 'Normal' : 'Normal'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-background/70 backdrop-blur-sm rounded text-[10px]">
                <div className="w-2 h-2 rounded-full bg-orange-500" aria-hidden />
                <span className="text-muted-foreground">{lang === 'tr' ? 'Uyarı' : 'Warning'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-background/70 backdrop-blur-sm rounded text-[10px]">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden />
                <span className="text-muted-foreground">{lang === 'tr' ? 'Kritik' : 'Critical'}</span>
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
          <div className="p-3 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-muted-foreground text-xs font-mono uppercase">
                {lang === 'tr' ? 'Olay Geçmişi' : 'Event History'}
              </h2>
              <Activity size={12} className="text-muted-foreground" aria-hidden />
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-muted-foreground text-xs">
                  {lang === 'tr' ? 'Simülasyonu başlatın...' : 'Start simulation...'}
                </p>
              ) : (
                history.slice(0, 5).map((event, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-mono">
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
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-muted-foreground text-xs font-mono uppercase">
                {lang === 'tr' ? 'Simülasyon Kontrolü' : 'Simulation Control'}
              </h2>
              <div
                className={`w-2 h-2 rounded-full ${
                  isSimulating ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
                }`}
                aria-hidden
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
                {lang === 'tr' ? 'Ark Tespiti' : 'Arc Detect'}
              </TacticalButton>
              <TacticalButton
                onClick={() => setScenario('critical')}
                variant={scenario === 'critical' ? 'primary' : 'secondary'}
                accentColor={MAGMA.danger}
                size="sm"
              >
                {lang === 'tr' ? 'İçten Yanma' : 'Smoldering'}
              </TacticalButton>
            </div>

            <TacticalButton
              onClick={() => setIsSimulating(!isSimulating)}
              variant={isSimulating ? 'danger' : 'primary'}
              accentColor={MAGMA.accent}
              size="md"
              className="w-full min-h-[44px]"
            >
              <div className="flex items-center justify-center gap-2">
                <Power size={14} aria-hidden />
                <span>
                  {isSimulating
                    ? (lang === 'tr' ? 'DURDUR' : 'STOP')
                    : (lang === 'tr' ? 'BAŞLAT' : 'START')}
                </span>
              </div>
            </TacticalButton>
          </div>
        </div>
      </div>

      {/* Electrical Parameters Grid */}
      {richPacket && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-muted-foreground text-xs font-mono uppercase">
              {lang === 'tr' ? 'Elektriksel Parametreler' : 'Electrical Parameters'}
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              {lang === 'tr' ? 'Son güncelleme' : 'Last updated'}: {richPacket.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="p-3 bg-card border border-border rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <m.icon size={14} className="text-muted-foreground" aria-hidden />
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-foreground font-mono text-lg font-semibold">{m.value}</span>
                  <span className="text-muted-foreground text-xs">{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
                <AlertTriangle size={48} className="text-red-500" aria-hidden />
                <span className="text-red-500 font-mono text-xl font-bold">
                  {lang === 'tr' ? 'ELEKTRİKSEL YANGIN RİSKİ!' : 'ELECTRICAL FIRE RISK!'}
                </span>
                <span className="text-red-400 text-sm text-center">
                  {lang === 'tr'
                    ? `Pano ${packet.sensors.find(s => s.hasFire)?.zone} - Aşırı ısınma ve ark tespiti`
                    : `Panel ${packet.sensors.find(s => s.hasFire)?.zone} - Overheating and arc detected`}
                </span>
                <span className="text-red-400/70 text-xs">
                  Sensor {packet.criticalSensors.join(', ')}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
  const isWarning = sensor.hasArc && !sensor.hasFire;

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative p-3 rounded-lg border text-left transition-all min-h-[44px]
        bg-card border-border
        ${isSelected ? 'ring-2' : ''}
      `}
      style={{
        backgroundColor: isCritical ? `${color}15` : isWarning ? `${color}10` : undefined,
        borderColor: isSelected ? color : isCritical ? `${color}50` : undefined,
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
        <span className="text-[10px] text-muted-foreground font-mono">S{sensor.id}</span>
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={isCritical ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : undefined}
          transition={{ repeat: Infinity, duration: 0.5 }}
          aria-hidden
        />
      </div>

      {/* Temperature */}
      <div className="flex items-baseline gap-1 mb-1">
        <span
          className="text-xl font-mono font-bold text-foreground"
          style={{ color: isCritical || isWarning ? color : undefined }}
        >
          {sensor.temperature.toFixed(1)}
        </span>
        <span className="text-muted-foreground text-xs">°C</span>
      </div>

      {/* Zone */}
      <div className="text-[10px] text-muted-foreground truncate">
        {sensor.zone}
      </div>

      {/* Cable Temp */}
      {sensor.cableTemp > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <Thermometer size={10} className="text-muted-foreground" aria-hidden />
          <span className="text-[10px] font-mono text-muted-foreground">
            {sensor.cableTemp.toFixed(1)}°C
          </span>
        </div>
      )}

      {/* Arc activity indicator */}
      {sensor.arcActivity > 50 && (
        <div className="flex items-center gap-1 mt-1">
          <Zap size={10} style={{ color }} aria-hidden />
          <span className="text-[10px] font-mono" style={{ color }}>
            {sensor.arcActivity}
          </span>
        </div>
      )}

      {/* Smoldering risk */}
      {sensor.smolderingRisk > 20 && (
        <div className="flex items-center gap-1 mt-1">
          <Flame size={10} style={{ color }} aria-hidden />
          <span className="text-[10px] font-mono" style={{ color }}>
            {sensor.smolderingRisk}%
          </span>
        </div>
      )}

      {/* Alert badge */}
      {(isCritical || isWarning) && (
        <div
          className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold"
          style={{ backgroundColor: color, color: '#000' }}
        >
          {isCritical ? 'FIRE' : 'ARC'}
        </div>
      )}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-px" style={{ backgroundColor: color }} aria-hidden />
      <div className="absolute top-0 left-0 w-px h-2" style={{ backgroundColor: color }} aria-hidden />
      <div className="absolute bottom-0 right-0 w-2 h-px" style={{ backgroundColor: color }} aria-hidden />
      <div className="absolute bottom-0 right-0 w-px h-2" style={{ backgroundColor: color }} aria-hidden />
    </motion.button>
  );
}
