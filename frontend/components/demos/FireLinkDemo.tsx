'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  AlertTriangle,
  Bell,
  ThermometerSun,
  Shield,
  Users,
  Phone,
  CheckCircle2,
  XCircle,
  Volume2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ===========================================
// FireLink Demo - Interactive Heat Map Simulation
// Showcases AICO's fire safety monitoring system
// ===========================================

type AlertLevel = 'normal' | 'warning' | 'danger' | 'critical';
type ZoneStatus = 'safe' | 'monitoring' | 'warning' | 'alarm' | 'evacuating';

interface Zone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  temperature: number;
  status: ZoneStatus;
  hasDetector: boolean;
}

interface FireLinkDemoProps {
  lang?: 'tr' | 'en';
  className?: string;
}

// Temperature thresholds
const TEMP_NORMAL = 25;
const TEMP_WARNING = 45;
const TEMP_DANGER = 65;
const TEMP_CRITICAL = 85;

// Status colors
const statusColors: Record<ZoneStatus, string> = {
  safe: 'rgba(34, 197, 94, 0.3)',
  monitoring: 'rgba(59, 130, 246, 0.3)',
  warning: 'rgba(234, 179, 8, 0.4)',
  alarm: 'rgba(239, 68, 68, 0.5)',
  evacuating: 'rgba(239, 68, 68, 0.7)',
};

// Get temperature color
function getTempColor(temp: number): string {
  if (temp < TEMP_WARNING) return 'rgba(34, 197, 94, 0.6)';
  if (temp < TEMP_DANGER) return 'rgba(234, 179, 8, 0.7)';
  if (temp < TEMP_CRITICAL) return 'rgba(249, 115, 22, 0.8)';
  return 'rgba(239, 68, 68, 0.9)';
}

// Get alert level from temperature
function getAlertLevel(temp: number): AlertLevel {
  if (temp < TEMP_WARNING) return 'normal';
  if (temp < TEMP_DANGER) return 'warning';
  if (temp < TEMP_CRITICAL) return 'danger';
  return 'critical';
}

// Initial factory floor zones
const initialZones: Zone[] = [
  { id: 'z1', name: 'Üretim Alanı A', x: 5, y: 10, width: 40, height: 35, temperature: 24, status: 'safe', hasDetector: true },
  { id: 'z2', name: 'Üretim Alanı B', x: 50, y: 10, width: 45, height: 35, temperature: 26, status: 'safe', hasDetector: true },
  { id: 'z3', name: 'Depo', x: 5, y: 50, width: 30, height: 40, temperature: 22, status: 'safe', hasDetector: true },
  { id: 'z4', name: 'Elektrik Odasi', x: 40, y: 50, width: 25, height: 20, temperature: 28, status: 'monitoring', hasDetector: true },
  { id: 'z5', name: 'Ofis Alani', x: 70, y: 50, width: 25, height: 40, temperature: 23, status: 'safe', hasDetector: true },
  { id: 'z6', name: 'Acil Cikis', x: 40, y: 75, width: 25, height: 15, temperature: 21, status: 'safe', hasDetector: false },
];

// Translations
const translations = {
  tr: {
    title: 'FireLink Termal Izleme',
    subtitle: 'Gerçek zamanlı sıcaklık takibi',
    zone: 'Bolge',
    temperature: 'Sicaklik',
    status: 'Durum',
    normal: 'Normal',
    warning: 'Dikkat',
    danger: 'Tehlike',
    critical: 'Kritik',
    evacuate: 'Tahliye Baslat',
    reset: 'Sıfırla',
    safe: 'Guvenli',
    monitoring: 'Izleniyor',
    alarm: 'Alarm',
    evacuating: 'Tahliye',
    clickToHeat: 'Isıtmak için bölgeye tıklayın',
    systemActive: 'Sistem Aktif',
    sensorsOnline: 'Sensörler Çevrimiçi',
    alertsSent: 'Bildirim Gönderildi',
    responseTime: 'Tepki Suresi',
  },
  en: {
    title: 'FireLink Thermal Monitoring',
    subtitle: 'Real-time temperature tracking',
    zone: 'Zone',
    temperature: 'Temperature',
    status: 'Status',
    normal: 'Normal',
    warning: 'Warning',
    danger: 'Danger',
    critical: 'Critical',
    evacuate: 'Start Evacuation',
    reset: 'Reset',
    safe: 'Safe',
    monitoring: 'Monitoring',
    alarm: 'Alarm',
    evacuating: 'Evacuating',
    clickToHeat: 'Click zones to simulate heat',
    systemActive: 'System Active',
    sensorsOnline: 'Sensors Online',
    alertsSent: 'Alerts Sent',
    responseTime: 'Response Time',
  },
};

export default function FireLinkDemo({ lang = 'tr', className }: FireLinkDemoProps) {
  const t = translations[lang];
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [alertCount, setAlertCount] = useState(0);
  const [isEvacuating, setIsEvacuating] = useState(false);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Update zone status based on temperature
  const updateZoneStatus = useCallback((zone: Zone): ZoneStatus => {
    if (isEvacuating) return 'evacuating';
    if (zone.temperature >= TEMP_CRITICAL) return 'alarm';
    if (zone.temperature >= TEMP_DANGER) return 'warning';
    if (zone.temperature >= TEMP_WARNING) return 'monitoring';
    return 'safe';
  }, [isEvacuating]);

  // Handle zone click - increase temperature
  const handleZoneClick = (zoneId: string) => {
    setZones((prev) =>
      prev.map((zone) => {
        if (zone.id === zoneId) {
          const newTemp = Math.min(zone.temperature + 15, 100);
          const newStatus = updateZoneStatus({ ...zone, temperature: newTemp });

          // Trigger alert on status change
          if (newStatus === 'warning' && zone.status !== 'warning') {
            triggerNotification(`${zone.name}: ${t.warning}!`);
            setAlertCount((c) => c + 1);
          } else if (newStatus === 'alarm' && zone.status !== 'alarm') {
            triggerNotification(`${zone.name}: ${t.critical}!`);
            setAlertCount((c) => c + 1);
          }

          return { ...zone, temperature: newTemp, status: newStatus };
        }
        return zone;
      })
    );
  };

  // Trigger notification
  const triggerNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Start evacuation
  const startEvacuation = () => {
    setIsEvacuating(true);
    triggerNotification('TAHLIYE PROTOKOLU BASLATILDI!');
    setZones((prev) =>
      prev.map((zone) => ({ ...zone, status: 'evacuating' }))
    );
  };

  // Reset simulation
  const resetSimulation = () => {
    setZones(initialZones);
    setAlertCount(0);
    setIsEvacuating(false);
    setSelectedZone(null);
  };

  // Auto-cool zones over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isEvacuating) {
        setZones((prev) =>
          prev.map((zone) => {
            const newTemp = Math.max(zone.temperature - 0.5, 22);
            return {
              ...zone,
              temperature: newTemp,
              status: updateZoneStatus({ ...zone, temperature: newTemp }),
            };
          })
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isEvacuating, updateZoneStatus]);

  // Get overall alert level
  const overallAlert = zones.reduce((highest, zone) => {
    const level = getAlertLevel(zone.temperature);
    const levels: AlertLevel[] = ['normal', 'warning', 'danger', 'critical'];
    return levels.indexOf(level) > levels.indexOf(highest) ? level : highest;
  }, 'normal' as AlertLevel);

  return (
    <div className={cn('relative bg-onyx-900 rounded-3xl overflow-hidden', className)}>
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>

          {/* Alert indicator */}
          <motion.div
            className={cn(
              'px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium',
              overallAlert === 'normal' && 'bg-emerald-500/10 text-emerald-500',
              overallAlert === 'warning' && 'bg-yellow-500/10 text-yellow-500',
              overallAlert === 'danger' && 'bg-orange-500/10 text-orange-500',
              overallAlert === 'critical' && 'bg-red-500/10 text-red-500'
            )}
            animate={overallAlert === 'critical' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            {overallAlert === 'critical' && <AlertTriangle className="w-4 h-4" />}
            <span className="uppercase tracking-wider text-xs">
              {t[overallAlert]}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative p-6">
        {/* Factory floor plan */}
        <div className="relative aspect-[16/10] bg-onyx-950 rounded-2xl border border-white/5 overflow-hidden">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Zones */}
          {zones.map((zone) => (
            <motion.div
              key={zone.id}
              className="absolute cursor-pointer transition-all duration-300"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.width}%`,
                height: `${zone.height}%`,
                backgroundColor: statusColors[zone.status],
                borderColor: getTempColor(zone.temperature),
              }}
              onClick={() => handleZoneClick(zone.id)}
              onMouseEnter={() => setSelectedZone(zone)}
              onMouseLeave={() => setSelectedZone(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={zone.status === 'alarm' || zone.status === 'evacuating' ? {
                opacity: [0.5, 1, 0.5],
              } : {}}
              transition={zone.status === 'alarm' ? { repeat: Infinity, duration: 0.5 } : {}}
            >
              {/* Zone border */}
              <div
                className="absolute inset-0 border-2 rounded-lg"
                style={{ borderColor: getTempColor(zone.temperature) }}
              />

              {/* Heat gradient overlay */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: `radial-gradient(circle at center, ${getTempColor(zone.temperature)} 0%, transparent 70%)`,
                  opacity: Math.min((zone.temperature - 20) / 80, 1),
                }}
              />

              {/* Zone label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <span className="text-white text-xs font-medium text-center drop-shadow-lg">
                  {zone.name}
                </span>
                <span className="text-white/80 text-xs font-mono mt-1 drop-shadow-lg">
                  {zone.temperature.toFixed(0)}°C
                </span>
              </div>

              {/* Detector icon */}
              {zone.hasDetector && (
                <div className="absolute top-2 right-2">
                  <ThermometerSun
                    className={cn(
                      'w-4 h-4',
                      zone.temperature >= TEMP_DANGER ? 'text-red-400' : 'text-emerald-400'
                    )}
                  />
                </div>
              )}
            </motion.div>
          ))}

          {/* Selected zone tooltip */}
          <AnimatePresence>
            {selectedZone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-4 bg-onyx-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/10 z-20"
              >
                <div className="text-sm font-medium text-foreground mb-2">
                  {selectedZone.name}
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">{t.temperature}:</span>
                    <span className="ml-2 font-mono text-foreground">
                      {selectedZone.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t.status}:</span>
                    <span className={cn(
                      'ml-2 capitalize',
                      selectedZone.status === 'safe' && 'text-emerald-500',
                      selectedZone.status === 'warning' && 'text-yellow-500',
                      selectedZone.status === 'alarm' && 'text-red-500'
                    )}>
                      {t[selectedZone.status]}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instruction overlay */}
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-onyx-800/50 px-3 py-1.5 rounded-full">
            {t.clickToHeat}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-onyx-800/50 rounded-xl p-4 text-center">
            <Shield className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">{t.systemActive}</div>
            <div className="text-sm font-medium text-emerald-500 mt-1">
              <CheckCircle2 className="w-4 h-4 inline mr-1" />
              Online
            </div>
          </div>
          <div className="bg-onyx-800/50 rounded-xl p-4 text-center">
            <ThermometerSun className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">{t.sensorsOnline}</div>
            <div className="text-lg font-mono font-bold text-foreground mt-1">
              {zones.filter((z) => z.hasDetector).length}
            </div>
          </div>
          <div className="bg-onyx-800/50 rounded-xl p-4 text-center">
            <Bell className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">{t.alertsSent}</div>
            <div className="text-lg font-mono font-bold text-foreground mt-1">
              {alertCount}
            </div>
          </div>
          <div className="bg-onyx-800/50 rounded-xl p-4 text-center">
            <Phone className="w-5 h-5 text-engineer-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">{t.responseTime}</div>
            <div className="text-lg font-mono font-bold text-foreground mt-1">
              0.3s
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={startEvacuation}
            disabled={isEvacuating}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all',
              isEvacuating
                ? 'bg-red-500/20 text-red-500 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            )}
          >
            <Users className="w-5 h-5" />
            {t.evacuate}
          </button>
          <button
            onClick={resetSimulation}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-white/5 text-foreground hover:bg-white/10 transition-all"
          >
            <XCircle className="w-5 h-5" />
            {t.reset}
          </button>
        </div>
      </div>

      {/* Notification toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="absolute top-4 left-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="font-medium">{notificationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Evacuation overlay */}
      <AnimatePresence>
        {isEvacuating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500/10 backdrop-blur-sm z-30 flex items-center justify-center"
          >
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-red-500">
                TAHLIYE PROTOKOLU AKTIF
              </div>
              <div className="text-muted-foreground mt-2">
                Tum personel en yakin cikisa yonlendirilmektedir
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
