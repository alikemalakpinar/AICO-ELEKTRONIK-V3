'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  AlertTriangle,
  Activity,
  Thermometer,
  Droplets,
  Power,
  Factory,
  Shield,
  Bell,
  Gauge,
} from 'lucide-react';
import DashboardShell, { StatusChip, TacticalButton } from '@/components/premium/DashboardShell';
import {
  generateIndustrialPacket,
  getAirQualityColor,
  getStatusColor,
  getStatusLabel,
  type IndustrialSensor,
  type IndustrialAirQualityPacket,
} from '@/lib/utils/industrial-airquality-parser';
import type { Locale } from '@/types';

// ===========================================
// Industrial Air Quality Dashboard
// Factory CO2, TVOC, PM2.5 Monitoring
// ===========================================

interface IndustrialAirQualityDemoProps {
  lang: Locale;
  className?: string;
}

// Industrial theme colors
const THEME = {
  background: '#050505',
  accent: '#06B6D4', // Cyan for industrial
  warning: '#F59E0B',
  danger: '#EF4444',
  safe: '#22C55E',
  toxic: '#84CC16', // Yellow-green for TVOC
  text: '#E5E5E5',
  muted: '#666666',
};

export default function IndustrialAirQualityDemo({ lang, className = '' }: IndustrialAirQualityDemoProps) {
  const [packet, setPacket] = useState<IndustrialAirQualityPacket | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [scenario, setScenario] = useState<'normal' | 'warning' | 'critical'>('normal');
  const [selectedSensor, setSelectedSensor] = useState<number | null>(null);
  const [history, setHistory] = useState<{ time: Date; status: string; avgCo2: number }[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize packet
  useEffect(() => {
    const initialPacket = generateIndustrialPacket('normal', lang);
    setPacket(initialPacket);
  }, [lang]);

  // Simulation loop
  useEffect(() => {
    if (!isSimulating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const newPacket = generateIndustrialPacket(scenario, lang);
      setPacket(newPacket);

      setHistory(prev => [
        { time: new Date(), status: newPacket.overallStatus, avgCo2: newPacket.avgCo2 },
        ...prev.slice(0, 49),
      ]);
    }, 1500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating, scenario, lang]);

  const systemStatuses = useMemo(() => {
    if (!packet) return [];
    const statusColor = packet.overallStatus === 'evacuate' ? 'critical' :
                        packet.overallStatus === 'ventilation' ? 'warning' : 'normal';
    return [
      {
        label: lang === 'tr' ? 'Durum' : 'Status',
        value: getStatusLabel(packet.overallStatus, lang),
        status: statusColor as 'normal' | 'warning' | 'critical',
      },
      {
        label: 'CO₂',
        value: `${packet.avgCo2}`,
        unit: 'ppm',
        status: (packet.avgCo2 > 1500 ? 'critical' : packet.avgCo2 > 1000 ? 'warning' : 'normal') as 'normal' | 'warning' | 'critical',
      },
      {
        label: 'TVOC',
        value: `${packet.avgTvoc}`,
        unit: 'ppb',
        status: (packet.avgTvoc > 500 ? 'critical' : packet.avgTvoc > 250 ? 'warning' : 'normal') as 'normal' | 'warning' | 'critical',
      },
      {
        label: 'PM2.5',
        value: `${packet.avgPm25}`,
        unit: 'µg/m³',
        status: (packet.avgPm25 > 75 ? 'critical' : packet.avgPm25 > 35 ? 'warning' : 'normal') as 'normal' | 'warning' | 'critical',
      },
      {
        label: lang === 'tr' ? 'Uyarilar' : 'Alerts',
        value: `${packet.alertCount}`,
        status: (packet.alertCount > 3 ? 'critical' : packet.alertCount > 0 ? 'warning' : 'normal') as 'normal' | 'warning' | 'critical',
      },
    ];
  }, [packet, lang]);

  const selectedSensorData = packet?.sensors.find(s => s.id === selectedSensor);

  const headerRight = null;

  return (
    <DashboardShell
      lang={lang}
      title={lang === 'tr' ? 'FABRİKA HAVA KALİTESİ' : 'FACTORY AIR QUALITY'}
      subtitle={lang === 'tr' ? 'Endustriyel IAQ Izleme Sistemi' : 'Industrial IAQ Monitoring System'}
      brandName="FIRELINK"
      brandVersion="IAQ"
      accentColor={THEME.accent}
      systemStatuses={systemStatuses}
      isConnected={isSimulating}
      headerRight={headerRight}
      className={className}
    >
      <div className="grid lg:grid-cols-3 gap-4 p-4">
        {/* Left: Factory Visualization */}
        <div className="lg:col-span-2 relative aspect-video lg:aspect-auto lg:h-[450px] rounded-xl overflow-hidden border border-white/5 bg-[#0A0A0A]">
          {/* Factory Floor Map */}
          <svg viewBox="0 0 100 60" className="w-full h-full">
            {/* Background grid */}
            <defs>
              <pattern id="factory-grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.2"/>
              </pattern>
              {/* Toxic haze gradient */}
              <radialGradient id="toxic-haze" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#84CC16" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100" height="60" fill="url(#factory-grid)" />

            {/* Factory zones */}
            {packet?.sensors.map((sensor, i) => {
              const positions = [
                { x: 10, y: 5, w: 20, h: 25 },   // Production Line A
                { x: 35, y: 5, w: 20, h: 25 },   // Production Line B
                { x: 60, y: 5, w: 15, h: 25 },   // Paint Section
                { x: 80, y: 5, w: 15, h: 25 },   // Welding Area
                { x: 10, y: 33, w: 15, h: 22 },  // Chemical Storage
                { x: 30, y: 33, w: 25, h: 22 },  // Assembly Area
                { x: 60, y: 33, w: 17, h: 22 },  // Quality Control
                { x: 82, y: 33, w: 13, h: 22 },  // Packaging
              ];
              const pos = positions[i];
              if (!pos) return null; // Guard against out-of-bounds index
              const statusColor = getStatusColor(sensor.status);
              const isSelected = selectedSensor === sensor.id;

              return (
                <g key={sensor.id} onClick={() => setSelectedSensor(isSelected ? null : sensor.id)} className="cursor-pointer">
                  {/* Zone background */}
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={pos.w}
                    height={pos.h}
                    fill={statusColor}
                    fillOpacity={sensor.status === 'safe' ? 0.05 : sensor.status === 'ventilation' ? 0.15 : 0.25}
                    stroke={isSelected ? statusColor : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isSelected ? 0.5 : 0.2}
                    rx={1}
                  />

                  {/* Toxic haze effect for high TVOC */}
                  {sensor.tvoc > 400 && (
                    <ellipse
                      cx={pos.x + pos.w / 2}
                      cy={pos.y + pos.h / 2}
                      rx={pos.w / 2}
                      ry={pos.h / 2}
                      fill="#84CC16"
                      fillOpacity={Math.min((sensor.tvoc - 400) / 600, 0.4)}
                    >
                      <animate
                        attributeName="fill-opacity"
                        values={`${Math.min((sensor.tvoc - 400) / 600, 0.3)};${Math.min((sensor.tvoc - 400) / 600, 0.5)};${Math.min((sensor.tvoc - 400) / 600, 0.3)}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </ellipse>
                  )}

                  {/* Zone label */}
                  <text
                    x={pos.x + pos.w / 2}
                    y={pos.y + 4}
                    textAnchor="middle"
                    fontSize="2.5"
                    fill="rgba(255,255,255,0.6)"
                    className="uppercase"
                  >
                    {sensor.zone.split(' ').slice(0, 2).join(' ')}
                  </text>

                  {/* CO2 reading */}
                  <text
                    x={pos.x + pos.w / 2}
                    y={pos.y + pos.h / 2}
                    textAnchor="middle"
                    fontSize="4"
                    fontWeight="bold"
                    fill={getAirQualityColor(sensor.co2, 'co2')}
                  >
                    {sensor.co2}
                  </text>
                  <text
                    x={pos.x + pos.w / 2}
                    y={pos.y + pos.h / 2 + 4}
                    textAnchor="middle"
                    fontSize="2"
                    fill="rgba(255,255,255,0.4)"
                  >
                    ppm CO₂
                  </text>

                  {/* Status indicator */}
                  {sensor.status !== 'safe' && (
                    <circle
                      cx={pos.x + pos.w - 3}
                      cy={pos.y + 3}
                      r={1.5}
                      fill={statusColor}
                    >
                      <animate
                        attributeName="opacity"
                        values="1;0.3;1"
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Factory outline */}
            <rect
              x="5"
              y="2"
              width="92"
              height="56"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.3"
              rx={2}
            />

            {/* Factory label */}
            <text x="50" y="59" textAnchor="middle" fontSize="2" fill="rgba(255,255,255,0.3)" className="uppercase">
              {lang === 'tr' ? 'Fabrika Kat Plani - Gercek Zamanli IAQ' : 'Factory Floor Plan - Real-Time IAQ'}
            </text>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            {[
              { color: THEME.safe, label: lang === 'tr' ? 'Guvenli' : 'Safe' },
              { color: THEME.warning, label: lang === 'tr' ? 'Havalandırma' : 'Ventilation' },
              { color: THEME.danger, label: lang === 'tr' ? 'Tahliye' : 'Evacuate' },
              { color: THEME.toxic, label: 'TVOC' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1 px-2 py-1 bg-black/60 rounded text-[9px]">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400 dark:text-offwhite-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sensor Details & Controls */}
        <div className="flex flex-col gap-3">
          {/* Selected Sensor Detail */}
          {selectedSensorData ? (
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-cyan-500/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-gray-400 dark:text-offwhite-400 font-medium">{selectedSensorData.zone}</span>
                  <span className="text-gray-500 dark:text-offwhite-700 text-xs ml-2 font-mono">{selectedSensorData.name}</span>
                </div>
                <span
                  className="px-2 py-1 rounded text-[10px] font-mono font-bold"
                  style={{
                    backgroundColor: `${getStatusColor(selectedSensorData.status)}20`,
                    color: getStatusColor(selectedSensorData.status),
                  }}
                >
                  {getStatusLabel(selectedSensorData.status, lang)}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <MetricCard
                  label="CO₂"
                  value={selectedSensorData.co2}
                  unit="ppm"
                  color={getAirQualityColor(selectedSensorData.co2, 'co2')}
                  maxValue={3000}
                />
                <MetricCard
                  label="TVOC"
                  value={selectedSensorData.tvoc}
                  unit="ppb"
                  color={getAirQualityColor(selectedSensorData.tvoc, 'tvoc')}
                  maxValue={1000}
                />
                <MetricCard
                  label="PM2.5"
                  value={selectedSensorData.pm25}
                  unit="µg/m³"
                  color={getAirQualityColor(selectedSensorData.pm25, 'pm25')}
                  maxValue={200}
                />
              </div>

              {/* Alerts */}
              {selectedSensorData.alerts.length > 0 && (
                <div className="space-y-1">
                  {selectedSensorData.alerts.map((alert, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1.5 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400"
                    >
                      <AlertTriangle size={12} />
                      <span>{alert}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5 text-center">
              <Factory size={32} className="mx-auto mb-2 text-gray-600 dark:text-offwhite-700" />
              <p className="text-gray-500 dark:text-offwhite-600 text-sm">
                {lang === 'tr' ? 'Detay icin bolge secin' : 'Select a zone for details'}
              </p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-[#0A0A0A] border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer size={12} className="text-cyan-400" />
                <span className="text-gray-500 dark:text-offwhite-700 text-xs">{lang === 'tr' ? 'Ortam' : 'Ambient'}</span>
              </div>
              <span className="text-gray-400 dark:text-offwhite-400 font-mono text-lg">
                {packet?.ambientTemperature.toFixed(1)}°C
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0A0A0A] border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Droplets size={12} className="text-blue-400" />
                <span className="text-gray-500 dark:text-offwhite-700 text-xs">{lang === 'tr' ? 'Nem' : 'Humidity'}</span>
              </div>
              <span className="text-gray-400 dark:text-offwhite-400 font-mono text-lg">
                {packet?.ambientHumidity.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Event History */}
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-white/5 flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 dark:text-offwhite-600 text-xs font-mono uppercase">
                {lang === 'tr' ? 'Olay Gecmisi' : 'Event History'}
              </span>
              <Activity size={12} className="text-gray-600 dark:text-offwhite-700" />
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-gray-600 dark:text-offwhite-800 text-xs">
                  {lang === 'tr' ? 'Simulasyonu baslatin...' : 'Start simulation...'}
                </p>
              ) : (
                history.slice(0, 5).map((event, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-offwhite-700 font-mono">
                      {event.time.toLocaleTimeString()}
                    </span>
                    <span className="text-gray-500 dark:text-offwhite-600 font-mono">{event.avgCo2} ppm</span>
                    <span
                      className="uppercase font-mono text-[10px] px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${getStatusColor(event.status as 'safe' | 'ventilation' | 'evacuate')}20`,
                        color: getStatusColor(event.status as 'safe' | 'ventilation' | 'evacuate'),
                      }}
                    >
                      {event.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 dark:text-offwhite-600 text-xs font-mono uppercase">
                {lang === 'tr' ? 'Simulasyon' : 'Simulation'}
              </span>
              <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <TacticalButton
                onClick={() => setScenario('normal')}
                variant={scenario === 'normal' ? 'primary' : 'secondary'}
                accentColor={THEME.safe}
                size="sm"
              >
                {lang === 'tr' ? 'Normal' : 'Normal'}
              </TacticalButton>
              <TacticalButton
                onClick={() => setScenario('warning')}
                variant={scenario === 'warning' ? 'primary' : 'secondary'}
                accentColor={THEME.warning}
                size="sm"
              >
                {lang === 'tr' ? 'Uyari' : 'Warning'}
              </TacticalButton>
              <TacticalButton
                onClick={() => setScenario('critical')}
                variant={scenario === 'critical' ? 'primary' : 'secondary'}
                accentColor={THEME.danger}
                size="sm"
              >
                {lang === 'tr' ? 'Kritik' : 'Critical'}
              </TacticalButton>
            </div>

            <TacticalButton
              onClick={() => setIsSimulating(!isSimulating)}
              variant={isSimulating ? 'danger' : 'primary'}
              accentColor={THEME.accent}
              size="md"
              className="w-full"
            >
              <div className="flex items-center justify-center gap-2">
                <Power size={14} />
                <span>{isSimulating ? (lang === 'tr' ? 'DURDUR' : 'STOP') : (lang === 'tr' ? 'BASLAT' : 'START')}</span>
              </div>
            </TacticalButton>
          </div>
        </div>
      </div>

      {/* Critical Alert Overlay */}
      <AnimatePresence>
        {packet?.overallStatus === 'evacuate' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${THEME.danger}25 0%, transparent 70%)`,
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="flex flex-col items-center gap-3 p-6 bg-red-500/20 border-2 border-red-500 rounded-xl backdrop-blur-sm"
              >
                <AlertTriangle size={48} className="text-red-500" />
                <span className="text-red-500 font-mono text-xl font-bold">
                  {lang === 'tr' ? 'TAHLIYE ALARMI' : 'EVACUATION ALARM'}
                </span>
                <span className="text-red-400 text-sm text-center max-w-xs">
                  {lang === 'tr'
                    ? 'Hava kalitesi tehlikeli seviyelere ulasti. Binadan cikin.'
                    : 'Air quality has reached dangerous levels. Evacuate the building.'}
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
// MetricCard - Visual Metric Display
// ===========================================

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  color: string;
  maxValue: number;
}

function MetricCard({ label, value, unit, color, maxValue }: MetricCardProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="p-2 bg-white/5 rounded-lg">
      <div className="text-gray-500 dark:text-offwhite-700 text-[10px] mb-1">{label}</div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-lg font-mono font-bold" style={{ color }}>{value}</span>
        <span className="text-gray-600 dark:text-offwhite-800 text-[10px]">{unit}</span>
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
