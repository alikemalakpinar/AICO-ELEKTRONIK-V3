'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Waves,
  BarChart3,
  Power,
  Settings,
  Zap,
  Thermometer,
  Volume2,
  TrendingUp,
  Shield,
  Clock,
  Wrench,
} from 'lucide-react';
import DashboardShell, { StatusChip, TacticalButton } from '@/components/premium/DashboardShell';
import type { Locale } from '@/types';

// Dynamically import the 3D motor component
const IndustrialMotor3D = dynamic(
  () => import('./IndustrialMotor3D'),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#0A0A0A] animate-pulse rounded-lg" /> }
);

// ===========================================
// VibrationGuard Demo - Predictive Maintenance
// FFT Spectrum, Waveform & RPM Visualization
// ===========================================

interface VibrationGuardDemoProps {
  lang: Locale;
  className?: string;
}

// Vibration theme colors
const THEME = {
  background: '#050505',
  accent: '#00D4FF', // Electric Blue
  warning: '#F59E0B',
  danger: '#EF4444',
  safe: '#22C55E',
  text: '#E5E5E5',
  muted: '#666666',
};

// Simulated motor data
interface MotorData {
  rpm: number;
  vibrationLevel: number; // mm/s RMS
  temperature: number;
  bearingCondition: number; // 0-100%
  fftData: number[];
  waveformData: number[];
  status: 'normal' | 'warning' | 'critical';
}

// FFT frequency bins (Hz)
const FFT_FREQUENCIES = [
  10, 20, 30, 50, 100, 150, 200, 300, 500, 750,
  1000, 1500, 2000, 2500, 3000, 4000, 5000,
];

export default function VibrationGuardDemo({ lang, className = '' }: VibrationGuardDemoProps) {
  const [motorData, setMotorData] = useState<MotorData>({
    rpm: 1450,
    vibrationLevel: 2.5,
    temperature: 45,
    bearingCondition: 92,
    fftData: FFT_FREQUENCIES.map(() => Math.random() * 0.5),
    waveformData: Array(100).fill(0).map((_, i) => Math.sin(i * 0.2) * 0.5),
    status: 'normal',
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [scenario, setScenario] = useState<'normal' | 'warning' | 'critical'>('normal');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [vibrationHistory, setVibrationHistory] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);

  // Simulation loop
  useEffect(() => {
    if (!isSimulating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      timeRef.current += 0.05;

      setMotorData((prev) => {
        // Base values based on scenario
        const baseVibration = scenario === 'critical' ? 8 : scenario === 'warning' ? 4.5 : 2.5;
        const baseRPM = scenario === 'critical' ? 1200 + Math.random() * 200 : 1450;
        const baseTemp = scenario === 'critical' ? 75 : scenario === 'warning' ? 55 : 45;
        const baseBearing = scenario === 'critical' ? 45 : scenario === 'warning' ? 70 : 92;

        // Generate FFT data with characteristic fault frequencies
        const fftData = FFT_FREQUENCIES.map((freq, i) => {
          let base = Math.random() * 0.3;

          // Normal harmonics
          if (freq === 50 || freq === 100) base += 0.4;

          // Warning: bearing defect at ~150Hz
          if (scenario === 'warning' && (freq === 150 || freq === 300)) {
            base += 1.5 + Math.sin(timeRef.current * 5) * 0.3;
          }

          // Critical: multiple fault frequencies
          if (scenario === 'critical') {
            if (freq === 100 || freq === 200 || freq === 500) {
              base += 2.5 + Math.sin(timeRef.current * 8) * 0.5;
            }
          }

          return base;
        });

        // Generate waveform data
        const waveformData = Array(100)
          .fill(0)
          .map((_, i) => {
            let signal = Math.sin(i * 0.2 + timeRef.current * 10) * baseVibration * 0.3;

            // Add noise based on condition
            signal += (Math.random() - 0.5) * baseVibration * 0.2;

            // Add impulses for bearing defects
            if (scenario !== 'normal' && i % 20 < 3) {
              signal += (scenario === 'critical' ? 2 : 1) * Math.sin(i * 2);
            }

            return signal;
          });

        const newVibLevel = baseVibration + (Math.random() - 0.5) * 0.5;

        return {
          rpm: baseRPM + (Math.random() - 0.5) * 20,
          vibrationLevel: newVibLevel,
          temperature: baseTemp + (Math.random() - 0.5) * 2,
          bearingCondition: baseBearing + (Math.random() - 0.5) * 2,
          fftData,
          waveformData,
          status: scenario,
        };
      });
    }, 50);

    // Track vibration history at a slower rate (every 500ms)
    const historyInterval = setInterval(() => {
      setMotorData((prev) => {
        setVibrationHistory((hist) => {
          const next = [...hist, prev.vibrationLevel];
          return next.slice(-20);
        });
        return prev;
      });
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(historyInterval);
    };
  }, [isSimulating, scenario]);

  const systemStatuses = useMemo(
    () => [
      {
        label: lang === 'tr' ? 'Durum' : 'Status',
        value:
          motorData.status === 'critical'
            ? lang === 'tr'
              ? 'KRITIK'
              : 'CRITICAL'
            : motorData.status === 'warning'
            ? lang === 'tr'
              ? 'UYARI'
              : 'WARNING'
            : lang === 'tr'
            ? 'NORMAL'
            : 'NORMAL',
        status: motorData.status as 'normal' | 'warning' | 'critical',
      },
      {
        label: 'RPM',
        value: Math.round(motorData.rpm),
        status: 'normal' as const,
      },
      {
        label: lang === 'tr' ? 'Titresim' : 'Vibration',
        value: motorData.vibrationLevel.toFixed(1),
        unit: 'mm/s',
        status:
          motorData.vibrationLevel > 7
            ? ('critical' as const)
            : motorData.vibrationLevel > 4
            ? ('warning' as const)
            : ('normal' as const),
      },
      {
        label: lang === 'tr' ? 'Sicaklik' : 'Temp',
        value: Math.round(motorData.temperature),
        unit: '°C',
        status:
          motorData.temperature > 70
            ? ('critical' as const)
            : motorData.temperature > 50
            ? ('warning' as const)
            : ('normal' as const),
      },
      {
        label: lang === 'tr' ? 'Rulman' : 'Bearing',
        value: Math.round(motorData.bearingCondition),
        unit: '%',
        status:
          motorData.bearingCondition < 50
            ? ('critical' as const)
            : motorData.bearingCondition < 75
            ? ('warning' as const)
            : ('normal' as const),
      },
    ],
    [motorData, lang]
  );

  return (
    <DashboardShell
      lang={lang}
      title={lang === 'tr' ? 'KESTIRIMCI BAKIM SISTEMI' : 'PREDICTIVE MAINTENANCE SYSTEM'}
      subtitle={lang === 'tr' ? 'Titresim Analizi & Ariza Tahmini' : 'Vibration Analysis & Fault Prediction'}
      brandName="VIBRATIONGUARD"
      brandVersion="2.0"
      accentColor={THEME.accent}
      systemStatuses={systemStatuses}
      isConnected={isSimulating}
      className={className}
    >
      <div className="grid lg:grid-cols-2 gap-4 p-4">
        {/* Left: 3D Motor Visualization */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-xl overflow-hidden border border-white/5 bg-[#0A0A0A]">
          <IndustrialMotor3D
            rpm={motorData.rpm}
            vibrationLevel={motorData.vibrationLevel}
            status={motorData.status}
            accentColor={THEME.accent}
          />

          {/* 3D View Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
            <div className="text-[10px] text-offwhite-700 font-mono">
              {lang === 'tr' ? '3D MOTOR GORUNTULEME' : '3D MOTOR VISUALIZATION'}
            </div>

            {/* Mini RPM Gauge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-black/70 rounded-lg">
              <Gauge size={14} className="text-cyan-400" />
              <div>
                <div className="text-cyan-400 font-mono text-lg font-bold">
                  {Math.round(motorData.rpm)}
                </div>
                <div className="text-[8px] text-offwhite-700">RPM</div>
              </div>
            </div>
          </div>

          {/* Vibration Alert Overlay */}
          <AnimatePresence>
            {motorData.status === 'critical' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${THEME.danger}15 0%, transparent 70%)`,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right: Data Visualizations */}
        <div className="flex flex-col gap-4">
          {/* FFT Spectrum */}
          <div className="flex-1 p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-cyan-400" />
                <span className="text-offwhite-600 text-xs font-mono uppercase">
                  {lang === 'tr' ? 'FFT Spektrumu' : 'FFT Spectrum'}
                </span>
              </div>
              <span className="text-offwhite-800 text-[10px] font-mono">0-5kHz</span>
            </div>

            <FFTChart data={motorData.fftData} frequencies={FFT_FREQUENCIES} accentColor={THEME.accent} />
          </div>

          {/* Waveform */}
          <div className="flex-1 p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Waves size={14} className="text-cyan-400" />
                <span className="text-offwhite-600 text-xs font-mono uppercase">
                  {lang === 'tr' ? 'Zaman Dalga Formu' : 'Time Waveform'}
                </span>
              </div>
              <span className="text-offwhite-800 text-[10px] font-mono">
                {motorData.vibrationLevel.toFixed(2)} mm/s RMS
              </span>
            </div>

            <WaveformChart data={motorData.waveformData} accentColor={THEME.accent} status={motorData.status} />
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
                {lang === 'tr' ? 'Asinma' : 'Wear'}
              </TacticalButton>
              <TacticalButton
                onClick={() => setScenario('critical')}
                variant={scenario === 'critical' ? 'primary' : 'secondary'}
                accentColor={THEME.danger}
                size="sm"
              >
                {lang === 'tr' ? 'Ariza' : 'Fault'}
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
                <span>
                  {isSimulating
                    ? lang === 'tr'
                      ? 'DURDUR'
                      : 'STOP'
                    : lang === 'tr'
                    ? 'BASLAT'
                    : 'START'}
                </span>
              </div>
            </TacticalButton>
          </div>
        </div>
      </div>

      {/* Diagnostic Panel */}
      {motorData.status !== 'normal' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-4 p-4 rounded-xl border"
          style={{
            backgroundColor: motorData.status === 'critical' ? `${THEME.danger}10` : `${THEME.warning}10`,
            borderColor: motorData.status === 'critical' ? `${THEME.danger}30` : `${THEME.warning}30`,
          }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className={motorData.status === 'critical' ? 'text-red-500' : 'text-yellow-500'}
            />
            <div className="flex-1">
              <h4 className="text-offwhite-400 font-medium mb-1">
                {motorData.status === 'critical'
                  ? lang === 'tr'
                    ? 'Kritik Ariza Tespit Edildi'
                    : 'Critical Fault Detected'
                  : lang === 'tr'
                  ? 'Rulman Asiniasi Tespit Edildi'
                  : 'Bearing Wear Detected'}
              </h4>
              <p className="text-offwhite-700 text-sm">
                {motorData.status === 'critical'
                  ? lang === 'tr'
                    ? 'Motor dengesizligi ve rulman hasari tespit edildi. Acil bakim oneriliyor.'
                    : 'Motor imbalance and bearing damage detected. Immediate maintenance recommended.'
                  : lang === 'tr'
                  ? 'Erken asinma belirtileri mevcut. 2 hafta icinde bakim planlani.'
                  : 'Early wear signs present. Schedule maintenance within 2 weeks.'}
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="text-[10px] text-offwhite-600">
                  <span className="text-offwhite-800">{lang === 'tr' ? 'Ariza Kodu:' : 'Fault Code:'}</span>{' '}
                  <span className="font-mono">
                    {motorData.status === 'critical'
                      ? 'BRG-001 (BPFO), UNB-003 (1X), MSA-007 (Misalignment)'
                      : 'BRG-002 (BPFI Early Stage)'}
                  </span>
                </div>
                <div className="text-[10px] text-offwhite-600">
                  <span className="text-offwhite-800">{lang === 'tr' ? 'Tahmini Sure:' : 'Est. Time:'}</span>{' '}
                  <span className="font-mono">
                    {motorData.status === 'critical' ? '< 24h' : '~14 days'}
                  </span>
                </div>
                <div className="text-[10px] text-offwhite-600">
                  <span className="text-offwhite-800">{lang === 'tr' ? 'Siddet:' : 'Severity:'}</span>{' '}
                  <span className="font-mono">
                    {motorData.status === 'critical' ? 'ISO 10816-3 Zone D' : 'ISO 10816-3 Zone C'}
                  </span>
                </div>
              </div>
              {/* Cost savings estimate */}
              <div className="mt-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[11px]">
                  <Wrench size={12} className={motorData.status === 'critical' ? 'text-red-400' : 'text-yellow-400'} />
                  <span className="text-offwhite-600">
                    {lang === 'tr'
                      ? 'Bu arizayi simdi gidermek:'
                      : 'Fix now:'}
                  </span>
                  <span className="text-green-400 font-mono font-bold">~₺2,500</span>
                  <span className="text-offwhite-800 mx-1">|</span>
                  <span className="text-offwhite-600">
                    {lang === 'tr' ? 'Ariza sonrasi:' : 'After failure:'}
                  </span>
                  <span className="text-red-400 font-mono font-bold">~₺45,000</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Predictive Analytics Panel */}
      {(scenario === 'warning' || scenario === 'critical') && motorData.status !== 'normal' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mx-4 mb-4 p-5 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 ${
            scenario === 'critical' ? 'shadow-[0_0_30px_rgba(239,68,68,0.15)]' : ''
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className={scenario === 'critical' ? 'text-red-400' : 'text-yellow-400'} />
            <span className="text-offwhite-400 text-sm font-mono font-bold uppercase">
              {lang === 'tr' ? 'Kestirimci Analiz' : 'Predictive Analytics'}
            </span>
            {scenario === 'critical' && (
              <span className="ml-auto flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-[10px] font-mono">
                  {lang === 'tr' ? 'ACIL' : 'URGENT'}
                </span>
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Prediction */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className={scenario === 'critical' ? 'text-red-400' : 'text-yellow-400'} />
                <span className="text-offwhite-500 text-xs font-mono">
                  {lang === 'tr' ? 'Ariza Tahmini' : 'Failure Prediction'}
                </span>
              </div>
              <p className="text-offwhite-300 text-sm mb-3">
                {scenario === 'critical'
                  ? lang === 'tr'
                    ? 'Rulman arizasi %96 olasilikla 48 saat icinde gerceklesecek'
                    : 'Bearing failure 96% likely within 48 hours'
                  : lang === 'tr'
                  ? 'Rulman arizasi %87 olasilikla 2 hafta icinde gerceklesecek'
                  : 'Bearing failure 87% likely within 2 weeks'}
              </p>

              {/* Probability bar */}
              <div className="mb-1 flex items-center justify-between text-[10px] font-mono text-offwhite-700">
                <span>{lang === 'tr' ? 'Olasilik' : 'Probability'}</span>
                <span>{scenario === 'critical' ? '96%' : '87%'}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: scenario === 'critical' ? THEME.danger : THEME.warning,
                    boxShadow: `0 0 10px ${scenario === 'critical' ? THEME.danger : THEME.warning}60`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: scenario === 'critical' ? '96%' : '87%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Recommended Action */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-cyan-400" />
                <span className="text-offwhite-500 text-xs font-mono">
                  {lang === 'tr' ? 'Onerilen Aksiyon' : 'Recommended Action'}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <Wrench size={12} className="text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-offwhite-400">
                    {scenario === 'critical'
                      ? lang === 'tr'
                        ? 'Motoru derhal durdurun. Rulman degisimi ve saft hizalama gerekli.'
                        : 'Stop motor immediately. Bearing replacement and shaft alignment required.'
                      : lang === 'tr'
                      ? 'Onumuzdeki 2 hafta icinde planlı bakim zamanlayın. Rulman yaglaması ve muayene.'
                      : 'Schedule planned maintenance within 2 weeks. Bearing lubrication and inspection.'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-offwhite-700">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
                    scenario === 'critical'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    <TrendingUp size={10} />
                    {scenario === 'critical'
                      ? lang === 'tr' ? 'TREND: HIZLI BOZULMA' : 'TREND: RAPID DEGRADATION'
                      : lang === 'tr' ? 'TREND: YAVAS BOZULMA' : 'TREND: GRADUAL DEGRADATION'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Vibration Trend Sparkline */}
      {vibrationHistory.length > 1 && isSimulating && (
        <div className="mx-4 mb-4 p-3 rounded-xl bg-[#0A0A0A] border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp size={12} className="text-cyan-400" />
              <span className="text-offwhite-700 text-[10px] font-mono uppercase">
                {lang === 'tr' ? 'Titresim Trendi (Son 20 Olcum)' : 'Vibration Trend (Last 20 Readings)'}
              </span>
            </div>
            <span className="text-offwhite-800 text-[10px] font-mono">
              {vibrationHistory[vibrationHistory.length - 1]?.toFixed(2)} mm/s
            </span>
          </div>
          <SparklineChart data={vibrationHistory} status={motorData.status} />
        </div>
      )}
    </DashboardShell>
  );
}

// ===========================================
// FFT Chart Component
// ===========================================

interface FFTChartProps {
  data: number[];
  frequencies: number[];
  accentColor: string;
}

function FFTChart({ data, frequencies, accentColor }: FFTChartProps) {
  const maxValue = Math.max(...data, 1);

  return (
    <div className="h-32 flex items-end gap-1">
      {data.map((value, i) => {
        const height = (value / maxValue) * 100;
        const isHigh = value > maxValue * 0.6;

        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t"
              style={{
                backgroundColor: isHigh ? '#EF4444' : accentColor,
                boxShadow: isHigh ? '0 0 10px #EF444440' : undefined,
              }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.1 }}
            />
            {i % 3 === 0 && (
              <span className="text-[8px] text-offwhite-800 font-mono">
                {frequencies[i] >= 1000 ? `${frequencies[i] / 1000}k` : frequencies[i]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ===========================================
// Waveform Chart Component
// ===========================================

interface WaveformChartProps {
  data: number[];
  accentColor: string;
  status: 'normal' | 'warning' | 'critical';
}

// ===========================================
// Sparkline Chart Component
// ===========================================

interface SparklineChartProps {
  data: number[];
  status: 'normal' | 'warning' | 'critical';
}

function SparklineChart({ data, status }: SparklineChartProps) {
  const width = 400;
  const height = 40;
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - minVal) / range) * (height - 6) - 3;
    return `${x},${y}`;
  });

  const polyline = points.join(' ');
  // Area fill path
  const areaPath = `M 0,${height} L ${points.map((p) => p).join(' L ')} L ${width},${height} Z`;

  const color = status === 'critical' ? '#EF4444' : status === 'warning' ? '#F59E0B' : '#00D4FF';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkFill)" />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      {/* Current value dot */}
      {data.length > 0 && (
        <circle
          cx={(data.length - 1) / (data.length - 1) * width}
          cy={height - ((data[data.length - 1] - minVal) / range) * (height - 6) - 3}
          r="3"
          fill={color}
        />
      )}
    </svg>
  );
}

function WaveformChart({ data, accentColor, status }: WaveformChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const path = useMemo(() => {
    const height = 80;
    const width = 400;
    const maxVal = Math.max(...data.map(Math.abs), 1);

    return data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height / 2 - (val / maxVal) * (height / 2 - 5);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [data]);

  const strokeColor = status === 'critical' ? '#EF4444' : status === 'warning' ? '#F59E0B' : accentColor;

  return (
    <div className="h-20 relative">
      <svg
        ref={svgRef}
        viewBox="0 0 400 80"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Center line */}
        <line x1="0" y1="40" x2="400" y2="40" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Waveform */}
        <motion.path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Glow effect */}
        <motion.path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.2}
          filter="blur(4px)"
        />
      </svg>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 right-0 top-0 border-t border-white/5"
          style={{ top: '25%' }}
        />
        <div
          className="absolute left-0 right-0 border-t border-white/5"
          style={{ top: '75%' }}
        />
      </div>
    </div>
  );
}
