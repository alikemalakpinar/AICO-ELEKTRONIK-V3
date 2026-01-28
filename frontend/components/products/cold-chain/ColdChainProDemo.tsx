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
      setTrucks((prev) =>
        prev.map((truck) => {
          // Update position
          let newPosition = truck.currentPosition + 0.002;
          if (newPosition >= 1) newPosition = 0;

          // Fluctuate temperature
          const tempDrift = (Math.random() - 0.5) * 0.3;
          const newTemp = truck.temperature + tempDrift;

          // Determine status
          const tempDiff = Math.abs(newTemp - truck.targetTemp);
          let status: TruckData['status'] = 'normal';
          if (tempDiff > 3) status = 'critical';
          else if (tempDiff > 1.5) status = 'warning';

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
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating]);

  const selectedTruckData = trucks.find((t) => t.id === selectedTruck);

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
    ],
    [trucks, lang]
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
              </motion.div>
            )}
          </AnimatePresence>

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
