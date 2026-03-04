'use client';

import { useEffect, useMemo, useState } from 'react';

export type TelemetryConnectionStatus = 'connected' | 'degraded' | 'reconnecting';

interface TelemetryStreamOptions {
  intervalMs?: number;
  seed?: number;
  paused?: boolean;
  simulateConnection?: boolean;
  baseLatencyMs?: number;
}

interface TelemetryStreamState {
  tick: number;
  jitter: number;
  waveform: number;
  noise: number;
  timestamp: number;
  status: TelemetryConnectionStatus;
  latencyMs: number;
  packetLossPct: number;
  signalQuality: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Deterministic telemetry pulse for product demos.
 * Gives smooth "live data" movement without requiring a backend socket.
 */
export function useTelemetryStream(options: TelemetryStreamOptions = {}): TelemetryStreamState {
  const {
    intervalMs = 1000,
    seed = 1,
    paused = false,
    simulateConnection = true,
    baseLatencyMs = 28,
  } = options;
  const [tick, setTick] = useState(0);
  const [timestamp, setTimestamp] = useState(() => Date.now());

  useEffect(() => {
    if (paused) return;

    const intervalId = window.setInterval(() => {
      setTick((previous) => previous + 1);
      setTimestamp(Date.now());
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [intervalMs, paused]);

  const waveform = useMemo(() => Math.sin((tick + seed) * 0.37), [seed, tick]);
  const noise = useMemo(
    () => Math.cos((tick + seed) * 0.91) * 0.5 + Math.sin((tick + seed) * 1.31) * 0.5,
    [seed, tick]
  );
  const jitter = useMemo(() => waveform * 0.7 + noise * 0.3, [noise, waveform]);
  const signalQuality = useMemo(() => {
    if (!simulateConnection) return 1;
    const harmonic = 0.74 + Math.sin((tick + seed) * 0.09) * 0.18;
    const drift = Math.cos((tick + seed) * 0.03) * 0.1;
    const turbulence = Math.abs(Math.sin((tick + seed) * 0.27 + Math.cos((tick + seed) * 0.11))) * 0.16;
    return clamp(harmonic + drift - turbulence, 0.08, 0.99);
  }, [seed, simulateConnection, tick]);
  const reconnectPulse = useMemo(() => {
    if (!simulateConnection) return false;
    const pulse = Math.abs(Math.sin((tick + seed) * 0.41 + Math.cos((tick + seed) * 0.13)));
    return pulse > 0.992;
  }, [seed, simulateConnection, tick]);
  const status = useMemo<TelemetryConnectionStatus>(() => {
    if (!simulateConnection) return 'connected';
    if (reconnectPulse || signalQuality < 0.22) return 'reconnecting';
    if (signalQuality < 0.5) return 'degraded';
    return 'connected';
  }, [reconnectPulse, signalQuality, simulateConnection]);
  const latencyMs = useMemo(() => {
    const base = baseLatencyMs + (1 - signalQuality) * 190 + Math.abs(noise) * 42;
    const statusPenalty = status === 'reconnecting' ? 180 : status === 'degraded' ? 35 : 0;
    return Math.max(12, Math.round(base + statusPenalty));
  }, [baseLatencyMs, noise, signalQuality, status]);
  const packetLossPct = useMemo(() => {
    if (!simulateConnection) return 0;
    const baseLoss = (1 - signalQuality) * 2.4;
    const statusPenalty = status === 'reconnecting' ? 8.5 : status === 'degraded' ? 1.8 : 0.2;
    return Math.round((baseLoss + statusPenalty) * 10) / 10;
  }, [signalQuality, simulateConnection, status]);

  return { tick, jitter, waveform, noise, timestamp, status, latencyMs, packetLossPct, signalQuality };
}
