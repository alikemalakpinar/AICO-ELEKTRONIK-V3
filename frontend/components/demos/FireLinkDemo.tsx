'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  AlertTriangle,
  Activity,
  Shield,
  ShieldAlert,
  ShieldOff,
  Gauge,
  CircuitBoard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ===========================================
// FireLink Demo — Electrical Fire Early Warning
// Arc Detection & Cable Insulation Monitoring
// Defense-grade HUD simulation
// ===========================================

// --- Types ---

type SystemActionState = 'MONITORING' | 'VERIFY' | 'PREEMPTIVE_CUTOFF' | 'LOCKOUT';
type AlertLevel = 'NORMAL' | 'ELEVATED' | 'CRITICAL' | 'LOCKOUT';

interface CabinetMetrics {
  cabinetId: string;
  cableTemp: number;
  insulationDegradation: number;
  microArcCount: number;
  arcSignatureConfidence: number;
  smolderingRisk: number;
  busCurrent: number;
  groundLeakage: number;
  harmonicDistortionTHD: number;
  actionState: SystemActionState;
  breakerTripProbability: number;
  energyCutoffETA: number;
}

interface FireLinkDemoProps {
  lang?: 'tr' | 'en';
  className?: string;
}

// --- Constants ---

const ESCALATION_STAGES = [
  { key: 'heating', labelTr: 'Kablo Izolasyon Isinmasi', labelEn: 'Cable Insulation Heating' },
  { key: 'arc', labelTr: 'Mikro-Ark Aktivitesi', labelEn: 'Micro-Arc Activity' },
  { key: 'smolder', labelTr: 'Icten Yanma Evresi', labelEn: 'Smoldering Stage' },
  { key: 'prevent', labelTr: 'Proaktif Onleme', labelEn: 'Proactive Prevention' },
] as const;

const ACTION_STATE_META: Record<SystemActionState, { color: string; labelTr: string; labelEn: string }> = {
  MONITORING: { color: 'text-emerald-400', labelTr: 'Izleme', labelEn: 'Monitoring' },
  VERIFY: { color: 'text-yellow-400', labelTr: 'Dogrulama', labelEn: 'Verify' },
  PREEMPTIVE_CUTOFF: { color: 'text-orange-400', labelTr: 'Onleyici Kesinti', labelEn: 'Preemptive Cutoff' },
  LOCKOUT: { color: 'text-red-400', labelTr: 'Kilitleme', labelEn: 'Lockout' },
};

const ALERT_LEVEL_STYLE: Record<AlertLevel, { bg: string; text: string; border: string }> = {
  NORMAL: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  ELEVATED: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  CRITICAL: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  LOCKOUT: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

// --- Translations ---

const translations = {
  tr: {
    title: 'FireLink Elektriksel Yangin Erken Uyari',
    subtitle: 'Ark Tespiti & Kablo Izolasyon Izleme Sistemi',
    cableTemp: 'Kablo Sic.',
    insulationDeg: 'Izolasyon Bozulma',
    microArc: 'Mikro-Ark',
    arcConfidence: 'Ark Guven',
    smolderRisk: 'Icten Yanma',
    busCurrent: 'Bara Akimi',
    groundLeak: 'Toprak Kacagi',
    thd: 'THD',
    systemDirective: 'Sistem Direktifi',
    breakerTrip: 'Sigorta Atma Olasiligi',
    cutoffETA: 'Kesinti ETA',
    escalation: 'Eskalasyon Hatti',
    resetSim: 'Simülasyonu Sifirla',
    advanceStage: 'Evre Ilerlet',
    eventsPerMin: 'olay/dk',
  },
  en: {
    title: 'FireLink Electrical Fire Early Warning',
    subtitle: 'Arc Detection & Cable Insulation Monitoring System',
    cableTemp: 'Cable Temp',
    insulationDeg: 'Insulation Deg.',
    microArc: 'Micro-Arc',
    arcConfidence: 'Arc Confidence',
    smolderRisk: 'Smolder Risk',
    busCurrent: 'Bus Current',
    groundLeak: 'Ground Leakage',
    thd: 'THD',
    systemDirective: 'System Directive',
    breakerTrip: 'Breaker Trip Probability',
    cutoffETA: 'Cutoff ETA',
    escalation: 'Escalation Pipeline',
    resetSim: 'Reset Simulation',
    advanceStage: 'Advance Stage',
    eventsPerMin: 'events/min',
  },
};

// --- Deterministic Risk Model ---

function computeMetrics(stage: number, tick: number): CabinetMetrics {
  // stage 0..3 maps to the 4 escalation phases
  const s = Math.min(stage, 3);
  const jitter = Math.sin(tick * 0.3) * 2;

  const cableTemp = [28, 52, 78, 94][s] + jitter;
  const insulationDegradation = [2, 18, 56, 89][s] + jitter * 0.5;
  const microArcCount = [0, 4, 23, 61][s] + Math.round(jitter);
  const arcSignatureConfidence = [5, 42, 78, 97][s] + jitter * 0.3;
  const smolderingRisk = [0, 12, 64, 92][s] + jitter * 0.4;
  const busCurrent = [12.4, 18.7, 28.3, 34.1][s] + jitter * 0.1;
  const groundLeakage = [0.8, 3.2, 12.6, 28.4][s] + jitter * 0.2;
  const harmonicDistortionTHD = [2.1, 5.8, 14.3, 22.7][s] + jitter * 0.1;
  const breakerTripProbability = [0, 8, 54, 96][s] + jitter * 0.3;
  const energyCutoffETA = [0, 0, 1200, 340][s];

  const actionState: SystemActionState = (['MONITORING', 'VERIFY', 'PREEMPTIVE_CUTOFF', 'LOCKOUT'] as const)[s];

  return {
    cabinetId: 'Cabinet 04',
    cableTemp: Math.max(0, cableTemp),
    insulationDegradation: clamp(insulationDegradation, 0, 100),
    microArcCount: Math.max(0, Math.round(microArcCount)),
    arcSignatureConfidence: clamp(arcSignatureConfidence, 0, 100),
    smolderingRisk: clamp(smolderingRisk, 0, 100),
    busCurrent: Math.max(0, busCurrent),
    groundLeakage: Math.max(0, groundLeakage),
    harmonicDistortionTHD: clamp(harmonicDistortionTHD, 0, 100),
    actionState,
    breakerTripProbability: clamp(breakerTripProbability, 0, 100),
    energyCutoffETA: Math.max(0, energyCutoffETA),
  };
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function getAlertLevel(m: CabinetMetrics): AlertLevel {
  if (m.actionState === 'LOCKOUT') return 'LOCKOUT';
  if (m.actionState === 'PREEMPTIVE_CUTOFF') return 'CRITICAL';
  if (m.actionState === 'VERIFY') return 'ELEVATED';
  return 'NORMAL';
}

function getDirective(m: CabinetMetrics, lang: 'tr' | 'en'): string {
  const directives: Record<SystemActionState, { tr: string; en: string }> = {
    MONITORING: {
      tr: `${m.cabinetId}: Risk stabilize. Yukseltilmis ornekleme altinda izleme devam ediyor.`,
      en: `${m.cabinetId}: Risk stabilized. Monitoring resumed under elevated sampling.`,
    },
    VERIFY: {
      tr: `${m.cabinetId}: Izolasyon bozulmasi hizlaniyor. Ark imza guveni %${m.arcSignatureConfidence.toFixed(0)}. Dogrulama dongusu basladi.`,
      en: `${m.cabinetId}: Insulation degradation accelerating. Arc signature confidence ${m.arcSignatureConfidence.toFixed(0)}%. Verification cycle engaged.`,
    },
    PREEMPTIVE_CUTOFF: {
      tr: `${m.cabinetId}: Kritik ark aktivitesi. Icten yanma riski %${m.smolderingRisk.toFixed(0)}. Otomatik enerji kesintisi baslatildi.`,
      en: `${m.cabinetId}: Critical arc activity detected. Smoldering risk ${m.smolderingRisk.toFixed(0)}%. Automated energy cutoff initiated.`,
    },
    LOCKOUT: {
      tr: `${m.cabinetId}: Enerji kesildi. Pano kilitlendi. Manuel muayene gerekli.`,
      en: `${m.cabinetId}: Energy severed. Cabinet locked out. Manual inspection required.`,
    },
  };
  return directives[m.actionState][lang];
}

// --- Component ---

export default function FireLinkDemo({ lang = 'tr', className }: FireLinkDemoProps) {
  const t = translations[lang];
  const [stage, setStage] = useState(0);
  const [tick, setTick] = useState(0);

  // Advance tick for jitter animation
  useEffect(() => {
    const interval = setInterval(() => setTick((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const metrics = useMemo(() => computeMetrics(stage, tick), [stage, tick]);
  const alertLevel = getAlertLevel(metrics);
  const directive = getDirective(metrics, lang);
  const levelStyle = ALERT_LEVEL_STYLE[alertLevel];

  const advanceStage = useCallback(() => {
    setStage((s) => Math.min(s + 1, 3));
  }, []);

  const resetSimulation = useCallback(() => {
    setStage(0);
    setTick(0);
  }, []);

  return (
    <div className={cn('relative bg-onyx-900 rounded-3xl overflow-hidden', className)}>
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">{t.title}</h3>
              <p className="text-sm text-muted-foreground font-mono">{t.subtitle}</p>
            </div>
          </div>

          {/* Status chip */}
          <motion.div
            className={cn(
              'px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest border',
              levelStyle.bg, levelStyle.text, levelStyle.border,
            )}
            animate={alertLevel === 'LOCKOUT' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            {alertLevel === 'LOCKOUT' && <ShieldOff className="w-4 h-4" />}
            {alertLevel === 'CRITICAL' && <ShieldAlert className="w-4 h-4" />}
            {alertLevel === 'ELEVATED' && <AlertTriangle className="w-4 h-4" />}
            {alertLevel === 'NORMAL' && <Shield className="w-4 h-4" />}
            {alertLevel}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative p-6 space-y-6">

        {/* Escalation Pipeline */}
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">{t.escalation}</div>
          <div className="grid grid-cols-4 gap-2">
            {ESCALATION_STAGES.map((es, i) => (
              <div
                key={es.key}
                className={cn(
                  'rounded-lg px-3 py-2.5 text-center text-xs font-mono border transition-all duration-300',
                  i <= stage
                    ? i === stage
                      ? 'bg-red-500/15 border-red-500/40 text-red-400'
                      : 'bg-white/5 border-white/10 text-offwhite-400'
                    : 'bg-onyx-950 border-white/5 text-muted-foreground/40',
                )}
              >
                <div className="font-semibold mb-0.5">{String(i + 1).padStart(2, '0')}</div>
                <div className="leading-tight">{lang === 'tr' ? es.labelTr : es.labelEn}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-3">
          <MetricCard label={t.cableTemp} value={`${metrics.cableTemp.toFixed(1)}°C`} alert={metrics.cableTemp > 70} />
          <MetricCard label={t.insulationDeg} value={`${metrics.insulationDegradation.toFixed(1)}%`} alert={metrics.insulationDegradation > 40} />
          <MetricCard label={t.microArc} value={`${metrics.microArcCount}`} unit={t.eventsPerMin} alert={metrics.microArcCount > 10} />
          <MetricCard label={t.arcConfidence} value={`${metrics.arcSignatureConfidence.toFixed(1)}%`} alert={metrics.arcSignatureConfidence > 60} />
          <MetricCard label={t.smolderRisk} value={`${metrics.smolderingRisk.toFixed(1)}%`} alert={metrics.smolderingRisk > 50} />
          <MetricCard label={t.busCurrent} value={`${metrics.busCurrent.toFixed(1)} A`} alert={metrics.busCurrent > 25} />
          <MetricCard label={t.groundLeak} value={`${metrics.groundLeakage.toFixed(1)} mA`} alert={metrics.groundLeakage > 10} />
          <MetricCard label={t.thd} value={`${metrics.harmonicDistortionTHD.toFixed(1)}%`} alert={metrics.harmonicDistortionTHD > 10} />
        </div>

        {/* Supplementary row */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label={t.breakerTrip} value={`${metrics.breakerTripProbability.toFixed(0)}%`} alert={metrics.breakerTripProbability > 30} />
          {metrics.energyCutoffETA > 0 && (
            <MetricCard label={t.cutoffETA} value={`${metrics.energyCutoffETA} ms`} alert />
          )}
        </div>

        {/* System Directive */}
        <div className={cn('rounded-xl border p-4', levelStyle.border, levelStyle.bg)}>
          <div className="flex items-center gap-2 mb-2">
            <Activity className={cn('w-4 h-4', levelStyle.text)} />
            <span className={cn('text-xs font-mono uppercase tracking-widest', levelStyle.text)}>
              {t.systemDirective} — {ACTION_STATE_META[metrics.actionState][lang === 'tr' ? 'labelTr' : 'labelEn']}
            </span>
          </div>
          <p className="text-sm text-foreground/80 font-mono leading-relaxed">{directive}</p>
        </div>

        {/* Cabinet ID badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-onyx-800/60 rounded-lg px-3 py-2 border border-white/5">
            <CircuitBoard className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground">{metrics.cabinetId}</span>
          </div>
          <div className="flex items-center gap-2 bg-onyx-800/60 rounded-lg px-3 py-2 border border-white/5">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground">
              {lang === 'tr' ? 'Sensorler Cevrimici' : 'Sensors Online'}: 8/8
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={advanceStage}
            disabled={stage >= 3}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm font-medium transition-all',
              stage >= 3
                ? 'bg-white/5 text-muted-foreground cursor-not-allowed'
                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20',
            )}
          >
            <Zap className="w-4 h-4" />
            {t.advanceStage}
          </button>
          <button
            onClick={resetSimulation}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm font-medium bg-white/5 text-foreground hover:bg-white/10 transition-all border border-white/5"
          >
            {t.resetSim}
          </button>
        </div>
      </div>

      {/* Lockout overlay */}
      <AnimatePresence>
        {alertLevel === 'LOCKOUT' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500/5 backdrop-blur-[2px] z-30 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ShieldOff className="w-16 h-16 text-red-500/60 mx-auto mb-4" />
              <div className="text-xl font-mono font-bold text-red-500 tracking-wider">
                {lang === 'tr' ? 'PANO KILITLENDİ — ENERJİ KESİLDİ' : 'CABINET LOCKED OUT — ENERGY SEVERED'}
              </div>
              <div className="text-sm text-muted-foreground mt-2 font-mono">
                {lang === 'tr' ? 'Manuel muayene gerekli' : 'Manual inspection required'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-components ---

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  alert?: boolean;
}

function MetricCard({ label, value, unit, alert }: MetricCardProps) {
  return (
    <div className={cn(
      'bg-onyx-800/50 rounded-xl p-3 border transition-colors duration-300',
      alert ? 'border-red-500/20' : 'border-white/5',
    )}>
      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
      <div className={cn(
        'text-base font-mono font-bold',
        alert ? 'text-red-400' : 'text-foreground',
      )}>
        {value}
      </div>
      {unit && <div className="text-[9px] font-mono text-muted-foreground mt-0.5">{unit}</div>}
    </div>
  );
}
