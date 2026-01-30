'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Truck,
  MapPin,
  Battery,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Clock,
  Power,
  Snowflake,
  Zap,
  Shield,
  Activity,
  LogOut,
} from 'lucide-react';
import DashboardShell, { StatusChip, TacticalButton } from '@/components/premium/DashboardShell';
import type { Locale } from '@/types';

// Dynamic import for the 3D globe
const GlobalFleetGlobe = dynamic(() => import('./GlobalFleetGlobe'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A0A0A] animate-pulse rounded-lg" />,
});

// ===========================================
// ColdChainProDemo - Global Fleet Tracking
// 3D Globe with glass panel fleet UI
// ===========================================

interface ColdChainProDemoProps {
  lang: Locale;
  className?: string;
}

// Cold chain theme colors
const THEME = {
  background: '#050505',
  accent: '#06B6D4', // Cyan
  warning: '#F59E0B',
  danger: '#EF4444',
  safe: '#22C55E',
  text: '#E5E5E5',
  muted: '#666666',
};

// Truck data interface
interface TruckData {
  id: string;
  name: string | { tr: string; en: string };
  route: { lat: number; lng: number }[];
  currentPosition: number;
  temperature: number;
  targetTemp: number;
  humidity: number;
  battery: number;
  speed: number;
  eta: string;
  cargo: string | { tr: string; en: string };
  status: 'normal' | 'warning' | 'critical';
}

// Fate moment interface — critical events along the route
interface FateMoment {
  id: string;
  truckId: string;
  type: 'door_open' | 'temp_spike' | 'temp_drop' | 'route_deviation' | 'power_loss';
  timestamp: Date;
  description: { tr: string; en: string };
  severity: 'info' | 'warning' | 'critical';
  temperatureDelta?: number;
  duration?: number;
}

const SEVERITY_COLORS: Record<FateMoment['severity'], string> = {
  info: '#06B6D4',
  warning: '#F59E0B',
  critical: '#EF4444',
};

// Predefined routes
const ROUTES = {
  europe: [
    { lat: 41.0, lng: 29.0 }, // Istanbul
    { lat: 45.4, lng: 9.2 }, // Milan
    { lat: 48.9, lng: 2.3 }, // Paris
    { lat: 51.5, lng: -0.1 }, // London
  ],
  middleEast: [
    { lat: 41.0, lng: 29.0 }, // Istanbul
    { lat: 36.2, lng: 36.2 }, // Antakya
    { lat: 33.5, lng: 36.3 }, // Damascus
    { lat: 25.2, lng: 55.3 }, // Dubai
  ],
  asia: [
    { lat: 41.0, lng: 29.0 }, // Istanbul
    { lat: 35.7, lng: 51.4 }, // Tehran
    { lat: 31.2, lng: 121.5 }, // Shanghai
    { lat: 35.7, lng: 139.7 }, // Tokyo
  ],
};

// Initial truck data
const INITIAL_TRUCKS: TruckData[] = [
  {
    id: 'TR-001',
    name: { tr: 'Ilac Tasiyici Alpha', en: 'Pharma Carrier Alpha' },
    route: ROUTES.europe,
    currentPosition: 0.3,
    temperature: -18.5,
    targetTemp: -20,
    humidity: 45,
    battery: 87,
    speed: 78,
    eta: '6h 24m',
    cargo: { tr: 'Insulin & Asilar', en: 'Insulin & Vaccines' },
    status: 'normal',
  },
  {
    id: 'TR-002',
    name: { tr: 'Gida Lojistik Beta', en: 'Food Logistics Beta' },
    route: ROUTES.middleEast,
    currentPosition: 0.55,
    temperature: -2.3,
    targetTemp: -4,
    humidity: 52,
    battery: 72,
    speed: 85,
    eta: '4h 15m',
    cargo: { tr: 'Dondurulmus Gida', en: 'Frozen Foods' },
    status: 'warning',
  },
  {
    id: 'TR-003',
    name: { tr: 'Biyomedikal Gamma', en: 'Biomedical Gamma' },
    route: ROUTES.asia,
    currentPosition: 0.72,
    temperature: 4.2,
    targetTemp: 4,
    humidity: 38,
    battery: 45,
    speed: 92,
    eta: '12h 48m',
    cargo: { tr: 'Kan Urunleri', en: 'Blood Products' },
    status: 'normal',
  },
];

// Helper to get localized string
const getLocalizedString = (value: string | { tr: string; en: string }, lang: Locale): string => {
  if (typeof value === 'string') return value;
  return value[lang] || value.en;
};

export default function ColdChainProDemo({ lang, className = '' }: ColdChainProDemoProps) {
  const [trucks, setTrucks] = useState<TruckData[]>(INITIAL_TRUCKS);
  const [fateMoments, setFateMoments] = useState<FateMoment[]>([]);
  const [tempHistory, setTempHistory] = useState<Record<string, number[]>>(() => {
    const init: Record<string, number[]> = {};
    INITIAL_TRUCKS.forEach((t) => {
      init[t.id] = [t.temperature];
    });
    return init;
  });
  const fateMomentCounter = useRef(0);

  // Process trucks with localized strings for the 3D Globe component
  const processedTrucksForGlobe = useMemo(
    () =>
      trucks.map((t) => ({
        id: t.id,
        name: getLocalizedString(t.name, lang),
        route: t.route,
        currentPosition: t.currentPosition,
        temperature: t.temperature,
        status: t.status,
      })),
    [trucks, lang]
  );
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulation loop
  useEffect(() => {
    if (!isSimulating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const newMoments: FateMoment[] = [];

      setTrucks((prev) =>
        prev.map((truck) => {
          // Update position
          let newPosition = truck.currentPosition + 0.002;
          if (newPosition >= 1) newPosition = 0;

          // Fluctuate temperature
          const tempDrift = (Math.random() - 0.5) * 0.3;
          const newTemp = truck.temperature + tempDrift;
          const tempDiff = Math.abs(newTemp - truck.targetTemp);

          // Determine status
          let status: TruckData['status'] = 'normal';
          if (tempDiff > 3) status = 'critical';
          else if (tempDiff > 1.5) status = 'warning';

          // Generate fate moments
          const delta = Math.round((newTemp - truck.temperature) * 10) / 10;

          // Temperature spike/drop events with automated intervention
          if (tempDiff > 2 && Math.random() < 0.05) {
            fateMomentCounter.current++;
            const isSpike = newTemp > truck.targetTemp;
            newMoments.push({
              id: `fm-${fateMomentCounter.current}`,
              truckId: truck.id,
              type: isSpike ? 'temp_spike' : 'temp_drop',
              timestamp: new Date(),
              description: {
                tr: isSpike
                  ? `Sıcaklık hedefin ${tempDiff.toFixed(1)}°C üstüne çıktı`
                  : `Sıcaklık hedefin ${tempDiff.toFixed(1)}°C altına düştü`,
                en: isSpike
                  ? `Temperature ${tempDiff.toFixed(1)}°C above target`
                  : `Temperature ${tempDiff.toFixed(1)}°C below target`,
              },
              severity: tempDiff > 3 ? 'critical' : 'warning',
              temperatureDelta: Math.round(delta * 10) / 10,
            });

            // Automated intervention log entry
            if (tempDiff > 3) {
              fateMomentCounter.current++;
              newMoments.push({
                id: `fm-${fateMomentCounter.current}`,
                truckId: truck.id,
                type: 'temp_spike',
                timestamp: new Date(),
                description: {
                  tr: `Otomatik müdahale: Kompresör gücü %${Math.min(100, Math.round(tempDiff * 15))} artırıldı. Gözetim kaydı güncellendi.`,
                  en: `Automated intervention: Compressor power increased by ${Math.min(100, Math.round(tempDiff * 15))}%. Custody log updated.`,
                },
                severity: 'info',
              });
            }
          }

          // Random door open events
          if (Math.random() < 0.008) {
            fateMomentCounter.current++;
            const doorDuration = Math.floor(Math.random() * 25) + 5;
            newMoments.push({
              id: `fm-${fateMomentCounter.current}`,
              truckId: truck.id,
              type: 'door_open',
              timestamp: new Date(),
              description: {
                tr: `Kapı ${doorDuration} saniye açık kaldı`,
                en: `Door open for ${doorDuration} seconds`,
              },
              severity: doorDuration > 15 ? 'warning' : 'info',
              duration: doorDuration,
            });
          }

          // Power loss events
          if (truck.battery < 30 && Math.random() < 0.02) {
            fateMomentCounter.current++;
            newMoments.push({
              id: `fm-${fateMomentCounter.current}`,
              truckId: truck.id,
              type: 'power_loss',
              timestamp: new Date(),
              description: {
                tr: `Düşük güç uyarısı — %${truck.battery.toFixed(0)} batarya`,
                en: `Low power warning — ${truck.battery.toFixed(0)}% battery`,
              },
              severity: truck.battery < 20 ? 'critical' : 'warning',
            });
          }

          return {
            ...truck,
            currentPosition: newPosition,
            temperature: Math.round(newTemp * 10) / 10,
            speed: 70 + Math.random() * 30,
            battery: Math.max(10, truck.battery - Math.random() * 0.1),
            status,
          };
        })
      );

      // Update temperature history
      setTempHistory((prev) => {
        const next = { ...prev };
        INITIAL_TRUCKS.forEach((t) => {
          // We read from the trucks state via closure — use setTrucks callback instead
        });
        return next;
      });

      // We need trucks for temp history, so use a separate approach
      setTrucks((current) => {
        setTempHistory((prev) => {
          const next = { ...prev };
          current.forEach((t) => {
            const arr = [...(next[t.id] || []), t.temperature];
            next[t.id] = arr.slice(-30);
          });
          return next;
        });
        return current; // no mutation
      });

      if (newMoments.length > 0) {
        setFateMoments((prev) => [...newMoments, ...prev].slice(0, 50));
      }
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating]);

  const selectedTruckData = trucks.find((t) => t.id === selectedTruck);

  // Chain integrity score based on fate moments severity
  const chainIntegrity = useMemo(() => {
    const penalties = fateMoments.reduce((sum, fm) => {
      if (fm.severity === 'critical') return sum + 5;
      if (fm.severity === 'warning') return sum + 2;
      return sum + 0.5;
    }, 0);
    return Math.max(0, Math.round(100 - penalties));
  }, [fateMoments]);

  const systemStatuses = useMemo(
    () => [
      {
        label: lang === 'tr' ? 'Filo' : 'Fleet',
        value: `${trucks.length}`,
        unit: lang === 'tr' ? 'Araç' : 'Vehicles',
        status: 'normal' as const,
      },
      {
        label: lang === 'tr' ? 'Uyarilar' : 'Alerts',
        value: trucks.filter((t) => t.status !== 'normal').length,
        status:
          trucks.some((t) => t.status === 'critical')
            ? ('critical' as const)
            : trucks.some((t) => t.status === 'warning')
            ? ('warning' as const)
            : ('normal' as const),
      },
      {
        label: lang === 'tr' ? 'Ortalama Sicaklik' : 'Avg. Temp',
        value: (trucks.reduce((sum, t) => sum + t.temperature, 0) / trucks.length).toFixed(1),
        unit: '°C',
        status: 'normal' as const,
      },
      {
        label: lang === 'tr' ? 'Zincir Bütünlüğü' : 'Chain Integrity',
        value: `${chainIntegrity}`,
        unit: '%',
        status:
          chainIntegrity < 50
            ? ('critical' as const)
            : chainIntegrity < 80
            ? ('warning' as const)
            : ('normal' as const),
      },
    ],
    [trucks, lang, chainIntegrity]
  );

  return (
    <DashboardShell
      lang={lang}
      title={lang === 'tr' ? 'GLOBAL FILO TAKIBI' : 'GLOBAL FLEET TRACKING'}
      subtitle={lang === 'tr' ? 'Soguk Zincir Izleme Sistemi' : 'Cold Chain Monitoring System'}
      brandName="COLDTRACK"
      brandVersion="3.0"
      accentColor={THEME.accent}
      systemStatuses={systemStatuses}
      isConnected={isSimulating}
      className={className}
    >
      <div className="grid lg:grid-cols-3 gap-4 p-4">
        {/* Left: 3D Globe */}
        <div className="lg:col-span-2 relative aspect-square lg:aspect-auto lg:h-[500px] rounded-xl overflow-hidden border border-white/5 bg-[#0A0A0A]">
          <GlobalFleetGlobe
            trucks={processedTrucksForGlobe}
            selectedTruck={selectedTruck}
            onSelectTruck={setSelectedTruck}
            accentColor={THEME.accent}
          />

          {/* Globe overlay legend */}
          <div className="absolute bottom-4 left-4 flex gap-2 pointer-events-none">
            {[
              { color: THEME.safe, label: lang === 'tr' ? 'Normal' : 'Normal' },
              { color: THEME.warning, label: lang === 'tr' ? 'Uyarı' : 'Warning' },
              { color: THEME.danger, label: lang === 'tr' ? 'Kritik' : 'Critical' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 px-2 py-1 bg-black/60 rounded text-[10px] backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-offwhite-600">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Click instruction */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 rounded-lg backdrop-blur-sm">
            <span className="text-offwhite-600 text-[10px]">
              {lang === 'tr' ? 'Araç ikonuna tıklayarak detay görün' : 'Click vehicle icon for details'}
            </span>
          </div>
        </div>

        {/* Right: Fleet Panel & Controls */}
        <div className="flex flex-col gap-4">
          {/* Fleet List */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-offwhite-600 text-xs font-mono uppercase">
                {lang === 'tr' ? 'Aktif Araçlar' : 'Active Vehicles'}
              </span>
              <Truck size={12} className="text-offwhite-700" />
            </div>

            {trucks.map((truck) => (
              <TruckCard
                key={truck.id}
                truck={truck}
                lang={lang}
                isSelected={selectedTruck === truck.id}
                onClick={() => setSelectedTruck(selectedTruck === truck.id ? null : truck.id)}
                accentColor={THEME.accent}
              />
            ))}
          </div>

          {/* Selected Truck Detail */}
          <AnimatePresence>
            {selectedTruckData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-xl bg-[#0A0A0A] border border-cyan-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-offwhite-400 font-medium text-sm">{getLocalizedString(selectedTruckData.name, lang)}</span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${
                        selectedTruckData.status === 'critical'
                          ? THEME.danger
                          : selectedTruckData.status === 'warning'
                          ? THEME.warning
                          : THEME.safe
                      }20`,
                      color:
                        selectedTruckData.status === 'critical'
                          ? THEME.danger
                          : selectedTruckData.status === 'warning'
                          ? THEME.warning
                          : THEME.safe,
                    }}
                  >
                    {selectedTruckData.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <div className="text-offwhite-700 text-[10px] mb-1">
                      {lang === 'tr' ? 'Sıcaklık' : 'Temperature'}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-lg font-mono font-bold"
                        style={{
                          color:
                            selectedTruckData.status === 'critical'
                              ? THEME.danger
                              : selectedTruckData.status === 'warning'
                              ? THEME.warning
                              : THEME.accent,
                        }}
                      >
                        {selectedTruckData.temperature}
                      </span>
                      <span className="text-offwhite-600">°C</span>
                    </div>
                    <div className="text-offwhite-800 text-[10px]">
                      {lang === 'tr' ? 'Hedef:' : 'Target:'} {selectedTruckData.targetTemp}°C
                    </div>
                  </div>

                  <div className="p-2 bg-white/5 rounded-lg">
                    <div className="text-offwhite-700 text-[10px] mb-1">
                      {lang === 'tr' ? 'Tahmini Varış' : 'ETA'}
                    </div>
                    <div className="text-lg font-mono font-bold text-cyan-400">
                      {selectedTruckData.eta}
                    </div>
                    <div className="text-offwhite-800 text-[10px]">
                      {selectedTruckData.speed.toFixed(0)} km/h
                    </div>
                  </div>

                  <div className="p-2 bg-white/5 rounded-lg">
                    <div className="text-offwhite-700 text-[10px] mb-1">
                      {lang === 'tr' ? 'Yük' : 'Cargo'}
                    </div>
                    <div className="text-offwhite-400 text-sm">{getLocalizedString(selectedTruckData.cargo, lang)}</div>
                  </div>

                  <div className="p-2 bg-white/5 rounded-lg">
                    <div className="text-offwhite-700 text-[10px] mb-1">
                      {lang === 'tr' ? 'Batarya' : 'Battery'}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-mono font-bold text-green-400">
                        {selectedTruckData.battery.toFixed(0)}
                      </span>
                      <span className="text-offwhite-600">%</span>
                    </div>
                  </div>
                </div>

                {/* Temperature History Sparkline */}
                <TemperatureSparkline
                  history={tempHistory[selectedTruckData.id] || []}
                  targetTemp={selectedTruckData.targetTemp}
                  lang={lang}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fate Moments Timeline */}
          <FateMomentsTimeline
            moments={fateMoments}
            lang={lang}
            selectedTruckId={selectedTruck}
          />

          {/* Control Panel */}
          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-offwhite-600 text-xs font-mono uppercase">
                {lang === 'tr' ? 'Simülasyon' : 'Simulation'}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}
              />
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
                <span>
                  {isSimulating
                    ? lang === 'tr'
                      ? 'DURDUR'
                      : 'STOP'
                    : lang === 'tr'
                    ? 'BAŞLAT'
                    : 'START'}
                </span>
              </div>
            </TacticalButton>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

// ===========================================
// TruckCard - Glass Panel Truck Status
// ===========================================

interface TruckCardProps {
  truck: TruckData;
  lang: Locale;
  isSelected: boolean;
  onClick: () => void;
  accentColor: string;
}

function TruckCard({ truck, lang, isSelected, onClick, accentColor }: TruckCardProps) {
  const statusColor =
    truck.status === 'critical' ? '#EF4444' : truck.status === 'warning' ? '#F59E0B' : '#22C55E';

  return (
    <motion.button
      onClick={onClick}
      className={`
        w-full relative p-3 rounded-xl border text-left transition-all backdrop-blur-sm
        ${isSelected ? 'ring-2' : ''}
      `}
      style={{
        backgroundColor: isSelected ? `${accentColor}10` : 'rgba(10,10,10,0.8)',
        borderColor: isSelected ? `${accentColor}50` : 'rgba(255,255,255,0.05)',
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Glass effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Truck size={14} style={{ color: statusColor }} />
            <span className="text-offwhite-400 font-medium text-sm">{getLocalizedString(truck.name, lang)}</span>
          </div>
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColor }}
            animate={
              truck.status !== 'normal'
                ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                : undefined
            }
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Snowflake size={10} className="text-cyan-400" />
              <span
                className="font-mono font-medium"
                style={{
                  color:
                    truck.status === 'critical'
                      ? '#EF4444'
                      : truck.status === 'warning'
                      ? '#F59E0B'
                      : accentColor,
                }}
              >
                {truck.temperature}°C
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Battery size={10} className="text-green-400" />
              <span className="text-offwhite-600 font-mono">{truck.battery.toFixed(0)}%</span>
            </div>
          </div>
          <span className="text-offwhite-700 font-mono">{truck.id}</span>
        </div>
      </div>
    </motion.button>
  );
}

// ===========================================
// TemperatureSparkline — SVG line chart
// ===========================================

function TemperatureSparkline({
  history,
  targetTemp,
  lang,
}: {
  history: number[];
  targetTemp: number;
  lang: Locale;
}) {
  if (history.length < 2) return null;

  const W = 200;
  const H = 50;
  const padding = 4;
  const min = Math.min(...history, targetTemp) - 1;
  const max = Math.max(...history, targetTemp) + 1;
  const range = max - min || 1;

  const points = history.map((val, i) => {
    const x = padding + (i / (history.length - 1)) * (W - padding * 2);
    const y = H - padding - ((val - min) / range) * (H - padding * 2);
    return `${x},${y}`;
  });

  const targetY = H - padding - ((targetTemp - min) / range) * (H - padding * 2);

  // Color based on latest reading distance from target
  const latestDiff = Math.abs(history[history.length - 1] - targetTemp);
  const lineColor = latestDiff > 3 ? '#EF4444' : latestDiff > 1.5 ? '#F59E0B' : '#22C55E';

  return (
    <div className="mt-3 p-2 bg-white/5 rounded-lg">
      <div className="text-offwhite-700 text-[10px] mb-1 flex items-center gap-1">
        <Activity size={10} />
        {lang === 'tr' ? 'Sıcaklık Geçmişi' : 'Temperature History'}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-12">
        {/* Target temp dashed line */}
        <line
          x1={padding}
          y1={targetY}
          x2={W - padding}
          y2={targetY}
          stroke="#06B6D4"
          strokeWidth="0.5"
          strokeDasharray="3,3"
          opacity={0.5}
        />
        <text x={W - padding - 1} y={targetY - 2} fill="#06B6D4" fontSize="5" textAnchor="end" opacity={0.6}>
          {targetTemp}°
        </text>
        {/* Temperature line */}
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Latest point dot */}
        {history.length > 0 && (
          <circle
            cx={padding + ((history.length - 1) / (history.length - 1)) * (W - padding * 2)}
            cy={H - padding - ((history[history.length - 1] - min) / range) * (H - padding * 2)}
            r="2"
            fill={lineColor}
          />
        )}
      </svg>
    </div>
  );
}

// ===========================================
// FateMomentsTimeline — Critical events list
// ===========================================

function FateMomentsTimeline({
  moments,
  lang,
  selectedTruckId,
}: {
  moments: FateMoment[];
  lang: Locale;
  selectedTruckId: string | null;
}) {
  // Filter to selected truck if one is selected, otherwise show all
  const filtered = selectedTruckId
    ? moments.filter((m) => m.truckId === selectedTruckId)
    : moments;

  const typeIcon = (type: FateMoment['type']) => {
    switch (type) {
      case 'door_open': return <LogOut size={10} />;
      case 'temp_spike': return <Thermometer size={10} />;
      case 'temp_drop': return <Snowflake size={10} />;
      case 'power_loss': return <Zap size={10} />;
      case 'route_deviation': return <Navigation size={10} />;
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-3 max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-offwhite-600 text-xs font-mono uppercase flex items-center gap-1.5">
          <Shield size={12} className="text-cyan-400" />
          {lang === 'tr' ? 'Gözetim Zinciri Kaydı' : 'Chain of Custody Log'}
        </span>
        <span className="text-offwhite-800 text-[10px] font-mono">
          {filtered.length} {lang === 'tr' ? 'olay' : 'events'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-offwhite-800 text-[10px] text-center py-4 font-mono">
          {lang === 'tr' ? 'Henüz kritik olay yok' : 'No critical events yet'}
        </div>
      ) : (
        <div className="space-y-1">
          <AnimatePresence initial={false}>
            {filtered.slice(0, 20).map((moment) => (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                {/* Severity dot */}
                <div className="flex flex-col items-center mt-0.5">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: SEVERITY_COLORS[moment.severity] }}
                  />
                  <div className="w-px h-full bg-white/10 mt-1" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] text-offwhite-700 font-mono">
                    <span style={{ color: SEVERITY_COLORS[moment.severity] }}>
                      {typeIcon(moment.type)}
                    </span>
                    <span>{moment.truckId}</span>
                    <span className="ml-auto">
                      {moment.timestamp.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="text-offwhite-500 text-[11px] leading-tight">
                    {moment.description[lang]}
                  </div>
                  {moment.temperatureDelta !== undefined && (
                    <span
                      className="text-[9px] font-mono"
                      style={{ color: SEVERITY_COLORS[moment.severity] }}
                    >
                      {moment.temperatureDelta > 0 ? '+' : ''}
                      {moment.temperatureDelta}°C
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
