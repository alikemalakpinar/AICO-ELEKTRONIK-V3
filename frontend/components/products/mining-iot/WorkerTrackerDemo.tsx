'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardHat,
  AlertTriangle,
  MapPin,
  Radio,
  Heart,
  Battery,
  Signal,
  Clock,
  Shield,
  CircleAlert,
  PhoneCall,
  Siren,
  Activity,
  Wind,
  Thermometer,
  Gauge,
  ChevronRight,
  ChevronDown,
  Mountain,
  Layers,
} from 'lucide-react';
import DashboardShell, { TacticalButton } from '@/components/premium/DashboardShell';
import type { Locale } from '@/types';

interface WorkerTrackerDemoProps {
  lang: Locale;
}

interface Worker {
  id: string;
  name: string;
  x: number;
  y: number;
  zone: { tr: string; en: string };
  tunnelId: string;
  heartRate: number;
  battery: number;
  status: 'ok' | 'warning' | 'sos' | 'fall';
  lastUpdate: number;
}

interface RiskZone {
  id: string;
  tunnelId: string;
  riskLevel: 'safe' | 'elevated' | 'critical';
  gasLevel: number;
  temperature: number;
  ventilation: 'normal' | 'reduced' | 'failed';
}

interface TunnelNode {
  id: string;
  label: { tr: string; en: string };
  depth: number;
  children: TunnelNode[];
}

interface EnvData {
  ch4: number;
  co: number;
  o2: number;
  groundStability: number;
}

const tactileSpring = { type: 'spring' as const, stiffness: 400, damping: 17 };

const ACCENT = '#EAB308';

const riskColors = {
  safe: '#22C55E',
  elevated: '#EAB308',
  critical: '#EF4444',
};

const tunnelTree: TunnelNode = {
  id: 'main',
  label: { tr: 'Ana Galeri', en: 'Main Gallery' },
  depth: -50,
  children: [
    {
      id: 'b3',
      label: { tr: 'Tunel B3', en: 'Tunnel B3' },
      depth: -100,
      children: [],
    },
    {
      id: 'c',
      label: { tr: 'Galeri C', en: 'Gallery C' },
      depth: -150,
      children: [],
    },
    {
      id: 'vent',
      label: { tr: 'Havalandirma Safti', en: 'Ventilation Shaft' },
      depth: -200,
      children: [],
    },
  ],
};

function flattenTunnels(node: TunnelNode): TunnelNode[] {
  return [node, ...node.children.flatMap(c => flattenTunnels(c))];
}

const allTunnels = flattenTunnels(tunnelTree);

// Map tunnel IDs to SVG path regions for worker placement
const tunnelPaths: Record<string, { x1: number; y1: number; x2: number; y2: number }> = {
  main: { x1: 30, y1: 80, x2: 570, y2: 80 },
  b3:   { x1: 160, y1: 80, x2: 160, y2: 200 },
  c:    { x1: 340, y1: 80, x2: 340, y2: 280 },
  vent: { x1: 500, y1: 80, x2: 500, y2: 340 },
};

export default function WorkerTrackerDemo({ lang }: WorkerTrackerDemoProps) {
  const radarRef = useRef<number>(0);

  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [emergencyActive, setEmergencyActive] = useState<string | null>(null);
  const [emergencyType, setEmergencyType] = useState<'sos' | 'fall' | null>(null);
  const [expandedTunnels, setExpandedTunnels] = useState<Record<string, boolean>>({ main: true });

  const [workers, setWorkers] = useState<Worker[]>([
    { id: 'W-001', name: 'Ahmet Y.', x: 0.3, y: 0.5, zone: { tr: 'Ana Galeri', en: 'Main Gallery' }, tunnelId: 'main', heartRate: 78, battery: 92, status: 'ok', lastUpdate: 0 },
    { id: 'W-002', name: 'Mehmet K.', x: 0.5, y: 0.6, zone: { tr: 'Tunel B3', en: 'Tunnel B3' }, tunnelId: 'b3', heartRate: 85, battery: 76, status: 'ok', lastUpdate: 0 },
    { id: 'W-003', name: 'Ali D.', x: 0.7, y: 0.4, zone: { tr: 'Ana Galeri', en: 'Main Gallery' }, tunnelId: 'main', heartRate: 72, battery: 88, status: 'ok', lastUpdate: 0 },
    { id: 'W-004', name: 'Mustafa B.', x: 0.5, y: 0.7, zone: { tr: 'Galeri C', en: 'Gallery C' }, tunnelId: 'c', heartRate: 68, battery: 45, status: 'warning', lastUpdate: 0 },
    { id: 'W-005', name: 'Hasan O.', x: 0.5, y: 0.8, zone: { tr: 'Havalandirma Safti', en: 'Ventilation Shaft' }, tunnelId: 'vent', heartRate: 82, battery: 95, status: 'ok', lastUpdate: 0 },
  ]);

  const [riskZones, setRiskZones] = useState<RiskZone[]>([
    { id: 'rz-main', tunnelId: 'main', riskLevel: 'safe', gasLevel: 0.3, temperature: 24, ventilation: 'normal' },
    { id: 'rz-b3', tunnelId: 'b3', riskLevel: 'elevated', gasLevel: 1.2, temperature: 29, ventilation: 'reduced' },
    { id: 'rz-c', tunnelId: 'c', riskLevel: 'safe', gasLevel: 0.5, temperature: 26, ventilation: 'normal' },
    { id: 'rz-vent', tunnelId: 'vent', riskLevel: 'safe', gasLevel: 0.2, temperature: 22, ventilation: 'normal' },
  ]);

  const [envData, setEnvData] = useState<EnvData>({
    ch4: 0.4,
    co: 12,
    o2: 20.8,
    groundStability: 94,
  });

  // Simulation interval - update workers, risk zones, env data
  useEffect(() => {
    if (emergencyActive) return;
    const interval = setInterval(() => {
      setWorkers(prev => prev.map(w => ({
        ...w,
        x: Math.max(0.1, Math.min(0.9, w.x + (Math.random() * 0.04 - 0.02))),
        y: Math.max(0.1, Math.min(0.9, w.y + (Math.random() * 0.04 - 0.02))),
        heartRate: Math.max(60, Math.min(100, w.heartRate + Math.floor(Math.random() * 6 - 3))),
        lastUpdate: Date.now(),
      })));

      setRiskZones(prev => prev.map(rz => {
        const newGas = Math.max(0.1, Math.min(3.5, rz.gasLevel + (Math.random() * 0.4 - 0.2)));
        const newTemp = Math.max(18, Math.min(38, rz.temperature + (Math.random() * 2 - 1)));
        let riskLevel: RiskZone['riskLevel'] = 'safe';
        if (newGas > 2.0 || newTemp > 34) riskLevel = 'critical';
        else if (newGas > 1.0 || newTemp > 28) riskLevel = 'elevated';
        const ventOptions: RiskZone['ventilation'][] = ['normal', 'reduced', 'failed'];
        const ventIdx = riskLevel === 'critical' ? (Math.random() > 0.5 ? 2 : 1) : riskLevel === 'elevated' ? (Math.random() > 0.7 ? 1 : 0) : 0;
        return { ...rz, gasLevel: newGas, temperature: newTemp, riskLevel, ventilation: ventOptions[ventIdx] };
      }));

      setEnvData(prev => ({
        ch4: Math.max(0.1, Math.min(3.0, prev.ch4 + (Math.random() * 0.3 - 0.15))),
        co: Math.max(5, Math.min(50, prev.co + (Math.random() * 4 - 2))),
        o2: Math.max(18, Math.min(21, prev.o2 + (Math.random() * 0.4 - 0.2))),
        groundStability: Math.max(70, Math.min(100, prev.groundStability + (Math.random() * 2 - 1))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [emergencyActive]);

  const triggerSOS = (workerId: string) => {
    setEmergencyActive(workerId);
    setEmergencyType('sos');
    setWorkers(prev => prev.map(w =>
      w.id === workerId ? { ...w, status: 'sos' as const, heartRate: 110 } : w
    ));
  };

  const triggerFall = (workerId: string) => {
    setEmergencyActive(workerId);
    setEmergencyType('fall');
    setWorkers(prev => prev.map(w =>
      w.id === workerId ? { ...w, status: 'fall' as const, heartRate: 45 } : w
    ));
  };

  const clearEmergency = () => {
    setEmergencyActive(null);
    setEmergencyType(null);
    setWorkers(prev => prev.map(w => ({
      ...w,
      status: w.battery < 50 ? 'warning' as const : 'ok' as const,
      heartRate: 70 + Math.floor(Math.random() * 15),
    })));
  };

  const activeWorker = workers.find(w => w.id === selectedWorker);
  const emergencyWorker = workers.find(w => w.id === emergencyActive);

  const getStatusColor = (status: Worker['status']) => {
    switch (status) {
      case 'sos': return '#EF4444';
      case 'fall': return '#F97316';
      case 'warning': return '#EAB308';
      default: return '#22C55E';
    }
  };

  const getRiskForTunnel = (tunnelId: string) => riskZones.find(rz => rz.tunnelId === tunnelId);

  const getWorkerPosition = (worker: Worker): { cx: number; cy: number } => {
    const path = tunnelPaths[worker.tunnelId] || tunnelPaths.main;
    const cx = path.x1 + (path.x2 - path.x1) * worker.x;
    const cy = path.y1 + (path.y2 - path.y1) * worker.y;
    return { cx, cy };
  };

  const workersInTunnel = (tunnelId: string) => workers.filter(w => w.tunnelId === tunnelId).length;

  const activeAlerts = riskZones.filter(rz => rz.riskLevel !== 'safe').length;
  const maxGas = Math.max(...riskZones.map(rz => rz.gasLevel));

  const systemStatuses = [
    {
      label: lang === 'tr' ? 'Isci' : 'Workers',
      value: workers.length,
      status: 'normal' as const,
    },
    {
      label: lang === 'tr' ? 'Aktif Uyari' : 'Active Alerts',
      value: activeAlerts,
      status: activeAlerts > 0 ? 'warning' as const : 'normal' as const,
    },
    {
      label: lang === 'tr' ? 'Gaz Seviyesi' : 'Gas Level',
      value: maxGas.toFixed(1),
      unit: '%',
      status: maxGas > 2.0 ? 'critical' as const : maxGas > 1.0 ? 'warning' as const : 'normal' as const,
    },
  ];

  // Tunnel Hierarchy component
  const renderTunnelNode = (node: TunnelNode, level: number = 0) => {
    const risk = getRiskForTunnel(node.id);
    const wCount = workersInTunnel(node.id);
    const isExpanded = expandedTunnels[node.id] ?? false;
    const hasChildren = node.children.length > 0;

    return (
      <div key={node.id} style={{ marginLeft: level * 12 }}>
        <button
          onClick={() => setExpandedTunnels(prev => ({ ...prev, [node.id]: !prev[node.id] }))}
          className="w-full flex items-center gap-1.5 py-1 px-1 rounded hover:bg-white/5 transition-colors text-left group"
        >
          {/* connecting line */}
          {level > 0 && (
            <span className="inline-block w-3 border-b border-offwhite-800 mr-0.5" />
          )}
          {hasChildren ? (
            isExpanded ? <ChevronDown size={10} className="text-offwhite-600 shrink-0" /> : <ChevronRight size={10} className="text-offwhite-600 shrink-0" />
          ) : (
            <span className="w-[10px] shrink-0" />
          )}
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: risk ? riskColors[risk.riskLevel] : '#22C55E' }}
          />
          <span className="text-[11px] text-offwhite-400 truncate flex-1 font-mono">{node.label[lang]}</span>
          <span className="text-[10px] text-offwhite-700 font-mono">{node.depth}m</span>
          <span className="text-[10px] text-offwhite-600 font-mono ml-1">{wCount}<HardHat size={8} className="inline ml-0.5" /></span>
        </button>
        {hasChildren && isExpanded && (
          <div className="border-l border-offwhite-800/50 ml-2">
            {node.children.map(c => renderTunnelNode(c, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Gas bar helper
  const GasBar = ({ label, value, max, unit, thresholds }: { label: string; value: number; max: number; unit: string; thresholds: [number, number] }) => {
    const pct = Math.min(100, (value / max) * 100);
    const color = value > thresholds[1] ? '#EF4444' : value > thresholds[0] ? '#EAB308' : '#22C55E';
    return (
      <div className="mb-2">
        <div className="flex justify-between text-[10px] mb-0.5">
          <span className="text-offwhite-500 font-mono">{label}</span>
          <span className="font-mono" style={{ color }}>{value.toFixed(1)} {unit}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color, width: `${pct}%` }}
            layout
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  };

  return (
    <DashboardShell
      lang={lang}
      title={lang === 'tr' ? 'Isci Takip Sistemi' : 'Worker Tracking System'}
      subtitle={lang === 'tr' ? 'Canli Tunel Haritasi' : 'Live Tunnel Map'}
      brandName="MINEGUARD"
      brandVersion="4.0"
      accentColor={ACCENT}
      systemStatuses={systemStatuses}
    >
      {/* Emergency Alert Overlay */}
      <AnimatePresence>
        {emergencyActive && emergencyWorker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [0.9, 0.7, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
              className="absolute inset-0"
              style={{
                backgroundColor: emergencyType === 'sos' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(249, 115, 22, 0.95)'
              }}
            />
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative text-center text-white p-8 z-10"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                {emergencyType === 'sos' ? (
                  <Siren size={80} className="mx-auto mb-4" />
                ) : (
                  <CircleAlert size={80} className="mx-auto mb-4" />
                )}
              </motion.div>
              <h3 className="text-3xl font-bold mb-2">
                {emergencyType === 'sos'
                  ? (lang === 'tr' ? 'ACIL DURUM - SOS!' : 'EMERGENCY - SOS!')
                  : (lang === 'tr' ? 'DUSME TESPIT EDILDI!' : 'FALL DETECTED!')
                }
              </h3>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <HardHat size={24} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">{emergencyWorker.name}</div>
                  <div className="text-sm opacity-80">{emergencyWorker.id}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {emergencyWorker.zone[lang]}
                </span>
                <span className="flex items-center gap-2">
                  <Heart size={16} />
                  {emergencyWorker.heartRate} BPM
                </span>
              </div>
              <div className="flex gap-3 justify-center">
                <TacticalButton variant="secondary" onClick={() => {}}>
                  <span className="flex items-center gap-2">
                    <PhoneCall size={14} />
                    {lang === 'tr' ? 'Acil Servisi Ara' : 'Call Emergency'}
                  </span>
                </TacticalButton>
                <TacticalButton variant="danger" onClick={clearEmergency}>
                  {lang === 'tr' ? 'Uyariyi Kapat' : 'Clear Alert'}
                </TacticalButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Tunnel Hierarchy */}
        <div className="w-full lg:w-56 p-3 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20">
          <h3 className="text-[11px] font-mono text-offwhite-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers size={12} />
            {lang === 'tr' ? 'Tunel Hiyerarsisi' : 'Tunnel Hierarchy'}
          </h3>
          {renderTunnelNode(tunnelTree)}

          {/* Ventilation Status per tunnel */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <h4 className="text-[10px] font-mono text-offwhite-600 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Wind size={10} />
              {lang === 'tr' ? 'Havalandirma' : 'Ventilation'}
            </h4>
            {riskZones.map(rz => {
              const tunnel = allTunnels.find(t => t.id === rz.tunnelId);
              const ventColor = rz.ventilation === 'failed' ? '#EF4444' : rz.ventilation === 'reduced' ? '#EAB308' : '#22C55E';
              const ventLabel = rz.ventilation === 'failed'
                ? (lang === 'tr' ? 'Ariza' : 'Failed')
                : rz.ventilation === 'reduced'
                ? (lang === 'tr' ? 'Dusuk' : 'Reduced')
                : (lang === 'tr' ? 'Normal' : 'Normal');
              return (
                <div key={rz.id} className="flex items-center justify-between text-[10px] py-0.5">
                  <span className="text-offwhite-600 font-mono truncate">{tunnel?.label[lang]}</span>
                  <span className="font-mono" style={{ color: ventColor }}>{ventLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center - Tunnel Map */}
        <div className="flex-1 p-3 md:p-4">
          <div className="relative w-full" style={{ aspectRatio: '600/400' }}>
            <svg viewBox="0 0 600 400" className="w-full h-full" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
              {/* Depth indicators */}
              {[
                { y: 80, label: '-50m' },
                { y: 200, label: '-100m' },
                { y: 280, label: '-150m' },
                { y: 340, label: '-200m' },
              ].map(d => (
                <g key={d.label}>
                  <line x1="10" y1={d.y} x2="590" y2={d.y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4,6" />
                  <text x="8" y={d.y - 4} fontSize="9" fill="rgba(255,255,255,0.25)" fontFamily="monospace">{d.label}</text>
                </g>
              ))}

              {/* Risk zone overlays */}
              {riskZones.map(rz => {
                const p = tunnelPaths[rz.tunnelId];
                if (!p) return null;
                const isHoriz = Math.abs(p.y2 - p.y1) < 10;
                const color = riskColors[rz.riskLevel];
                const opacity = rz.riskLevel === 'critical' ? 0.15 : rz.riskLevel === 'elevated' ? 0.08 : 0.03;
                if (isHoriz) {
                  return (
                    <rect key={rz.id} x={p.x1} y={p.y1 - 20} width={p.x2 - p.x1} height={40} rx="6"
                      fill={color} opacity={opacity} />
                  );
                }
                return (
                  <rect key={rz.id} x={p.x1 - 20} y={Math.min(p.y1, p.y2)} width={40} height={Math.abs(p.y2 - p.y1)} rx="6"
                    fill={color} opacity={opacity} />
                );
              })}

              {/* Main Gallery - horizontal */}
              <line x1="30" y1="80" x2="570" y2="80" stroke="rgba(234,179,8,0.5)" strokeWidth="16" strokeLinecap="round" />
              <text x="290" y="70" textAnchor="middle" fontSize="10" fill="rgba(234,179,8,0.8)" fontFamily="monospace">
                {lang === 'tr' ? 'Ana Galeri' : 'Main Gallery'}
              </text>

              {/* Tunnel B3 - branch going down */}
              <line x1="160" y1="80" x2="160" y2="200" stroke="rgba(59,130,246,0.5)" strokeWidth="12" strokeLinecap="round" />
              <text x="180" y="150" fontSize="9" fill="rgba(59,130,246,0.8)" fontFamily="monospace">
                {lang === 'tr' ? 'Tunel B3' : 'Tunnel B3'}
              </text>

              {/* Gallery C - branch going deeper */}
              <line x1="340" y1="80" x2="340" y2="280" stroke="rgba(168,85,247,0.5)" strokeWidth="12" strokeLinecap="round" />
              <text x="360" y="190" fontSize="9" fill="rgba(168,85,247,0.8)" fontFamily="monospace">
                {lang === 'tr' ? 'Galeri C' : 'Gallery C'}
              </text>

              {/* Ventilation Shaft - deepest */}
              <line x1="500" y1="80" x2="500" y2="340" stroke="rgba(34,197,94,0.5)" strokeWidth="12" strokeLinecap="round" />
              <text x="520" y="220" fontSize="9" fill="rgba(34,197,94,0.8)" fontFamily="monospace">
                {lang === 'tr' ? 'Hav. Safti' : 'Vent. Shaft'}
              </text>

              {/* Junction circles */}
              <circle cx="160" cy="80" r="6" fill="rgba(234,179,8,0.3)" stroke="rgba(234,179,8,0.6)" strokeWidth="1" />
              <circle cx="340" cy="80" r="6" fill="rgba(234,179,8,0.3)" stroke="rgba(234,179,8,0.6)" strokeWidth="1" />
              <circle cx="500" cy="80" r="6" fill="rgba(234,179,8,0.3)" stroke="rgba(234,179,8,0.6)" strokeWidth="1" />

              {/* Workers */}
              {workers.map(worker => {
                const { cx, cy } = getWorkerPosition(worker);
                const statusColor = getStatusColor(worker.status);
                const isSelected = selectedWorker === worker.id;
                return (
                  <g key={worker.id} onClick={() => setSelectedWorker(isSelected ? null : worker.id)} style={{ cursor: 'pointer' }}>
                    {/* Pulse ring for non-ok status */}
                    {worker.status !== 'ok' && (
                      <circle cx={cx} cy={cy} r="10" fill="none" stroke={statusColor} strokeWidth="1" opacity="0.5">
                        <animate attributeName="r" values="6;14;6" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Selection ring */}
                    {isSelected && (
                      <circle cx={cx} cy={cy} r="10" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="3,2">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Worker dot */}
                    <circle cx={cx} cy={cy} r="5" fill={`${statusColor}80`} stroke={statusColor} strokeWidth="1.5" />
                    {/* Label */}
                    <text x={cx} y={cy - 9} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.7)" fontFamily="monospace">
                      {worker.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Selected Worker Tooltip */}
            <AnimatePresence>
              {activeWorker && !emergencyActive && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/80 border border-white/10 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getStatusColor(activeWorker.status)}20` }}>
                      <HardHat size={16} style={{ color: getStatusColor(activeWorker.status) }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-offwhite-300 text-xs font-semibold">{activeWorker.name} <span className="text-offwhite-600">({activeWorker.id})</span></div>
                      <div className="text-offwhite-600 text-[10px]">{activeWorker.zone[lang]}</div>
                    </div>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="flex items-center gap-1">
                        <Heart size={10} className="text-red-500" />
                        <span className="text-offwhite-400 font-mono">{activeWorker.heartRate}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Battery size={10} className={activeWorker.battery < 50 ? 'text-yellow-500' : 'text-green-500'} />
                        <span className="text-offwhite-400 font-mono">{activeWorker.battery}%</span>
                      </span>
                      {(() => {
                        const zoneRisk = getRiskForTunnel(activeWorker.tunnelId);
                        if (!zoneRisk) return null;
                        return (
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: riskColors[zoneRisk.riskLevel] }} />
                            <span className="font-mono" style={{ color: riskColors[zoneRisk.riskLevel] }}>
                              {lang === 'tr' ? 'Bolge' : 'Zone'}
                            </span>
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Environmental Monitoring Panel */}
          <div className="mt-3 p-3 rounded-lg bg-black/20 border border-white/5">
            <h4 className="text-[10px] font-mono text-offwhite-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Gauge size={10} />
              {lang === 'tr' ? 'Cevre Izleme' : 'Environmental Monitoring'}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <GasBar label="CH4" value={envData.ch4} max={3.0} unit="%" thresholds={[1.0, 2.0]} />
              </div>
              <div>
                <GasBar label="CO" value={envData.co} max={50} unit="ppm" thresholds={[20, 35]} />
              </div>
              <div>
                <GasBar label="O2" value={envData.o2} max={21} unit="%" thresholds={[19.5, 18.0]} />
              </div>
              <div>
                <div className="mb-2">
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-offwhite-500 font-mono flex items-center gap-1">
                      <Mountain size={8} />
                      {lang === 'tr' ? 'Zemin' : 'Ground'}
                    </span>
                    <span className="font-mono" style={{ color: envData.groundStability > 85 ? '#22C55E' : envData.groundStability > 75 ? '#EAB308' : '#EF4444' }}>
                      {envData.groundStability.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: envData.groundStability > 85 ? '#22C55E' : envData.groundStability > 75 ? '#EAB308' : '#EF4444',
                        width: `${envData.groundStability}%`,
                      }}
                      layout
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Workers + Emergency */}
        <div className="w-full lg:w-56 p-3 border-t lg:border-t-0 lg:border-l border-white/5 bg-black/20">
          <h3 className="text-[11px] font-mono text-offwhite-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <HardHat size={12} />
            {lang === 'tr' ? 'Aktif Isciler' : 'Active Workers'}
          </h3>

          <div className="space-y-1.5 mb-4 max-h-48 overflow-y-auto">
            {workers.map((w) => {
              const zoneRisk = getRiskForTunnel(w.tunnelId);
              return (
                <motion.button
                  key={w.id}
                  onClick={() => setSelectedWorker(w.id === selectedWorker ? null : w.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-2 rounded-lg text-left transition-all flex items-center gap-2 ${
                    selectedWorker === w.id
                      ? 'bg-yellow-500/10 border border-yellow-500/30'
                      : 'bg-white/[0.02] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getStatusColor(w.status) }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium text-offwhite-400">{w.name}</div>
                    <div className="text-[9px] text-offwhite-700 font-mono">{w.id} / {w.zone[lang]}</div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1 text-[9px]">
                      <Heart size={8} className="text-red-500" />
                      <span className="text-offwhite-500 font-mono">{w.heartRate}</span>
                    </div>
                    {/* Zone Risk indicator */}
                    {zoneRisk && (
                      <div className="flex items-center gap-1 text-[8px]">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: riskColors[zoneRisk.riskLevel] }} />
                        <span className="text-offwhite-700 font-mono">{lang === 'tr' ? 'Bolge Riski' : 'Zone Risk'}</span>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Emergency Simulation */}
          <h3 className="text-[11px] font-mono text-offwhite-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Siren size={12} />
            {lang === 'tr' ? 'Acil Durum Simulasyonu' : 'Emergency Simulation'}
          </h3>
          <div className="space-y-2">
            <TacticalButton
              variant="danger"
              size="sm"
              onClick={() => triggerSOS(workers[0].id)}
              disabled={!!emergencyActive}
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <Siren size={12} />
                {lang === 'tr' ? 'SOS Simule Et' : 'Simulate SOS'}
              </span>
            </TacticalButton>

            <TacticalButton
              variant="secondary"
              size="sm"
              accentColor="#F97316"
              onClick={() => triggerFall(workers[1].id)}
              disabled={!!emergencyActive}
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <CircleAlert size={12} />
                {lang === 'tr' ? 'Dusme Tespit Simule Et' : 'Simulate Fall Detection'}
              </span>
            </TacticalButton>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
