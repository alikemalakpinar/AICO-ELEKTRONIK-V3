'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Zap, TrendingUp, TrendingDown, Activity } from 'lucide-react';

/**
 * EnergyChart - Real-time Energy Consumption Dashboard
 *
 * Live-updating chart showing power usage over time
 * Uses Recharts for beautiful, responsive visualization
 */

interface EnergyChartProps {
  lang: string;
}

interface DataPoint {
  time: string;
  consumption: number;
  solar: number;
  grid: number;
}

// Generate initial data
const generateInitialData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();

  for (let i = 59; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const hour = time.getHours();

    // Simulate realistic consumption patterns
    const baseLoad = 2.5; // kW base load
    const timeMultiplier = hour >= 18 && hour <= 22 ? 1.8 : hour >= 7 && hour <= 9 ? 1.5 : 1;
    const randomVariation = (Math.random() - 0.5) * 0.8;

    const consumption = +(baseLoad * timeMultiplier + randomVariation).toFixed(2);
    const solar = hour >= 6 && hour <= 18 ? +(Math.sin((hour - 6) / 12 * Math.PI) * 3 + Math.random() * 0.5).toFixed(2) : 0;
    const grid = Math.max(0, +(consumption - solar).toFixed(2));

    data.push({
      time: time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      consumption,
      solar,
      grid,
    });
  }

  return data;
};

export default function EnergyChart({ lang }: EnergyChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize data on client only
  useEffect(() => {
    setIsClient(true);
    setData(generateInitialData());
  }, []);

  // Update data every 3 seconds with new point
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        const hour = now.getHours();

        const baseLoad = 2.5;
        const timeMultiplier = hour >= 18 && hour <= 22 ? 1.8 : hour >= 7 && hour <= 9 ? 1.5 : 1;
        const randomVariation = (Math.random() - 0.5) * 0.8;

        const consumption = +(baseLoad * timeMultiplier + randomVariation).toFixed(2);
        const solar = hour >= 6 && hour <= 18 ? +(Math.sin((hour - 6) / 12 * Math.PI) * 3 + Math.random() * 0.5).toFixed(2) : 0;
        const grid = Math.max(0, +(consumption - solar).toFixed(2));

        newData.push({
          time: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          consumption,
          solar,
          grid,
        });

        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isClient]);

  // Calculate stats
  const stats = useMemo(() => {
    if (data.length === 0) return { current: 0, avg: 0, max: 0, trend: 0 };

    const consumptions = data.map((d) => d.consumption);
    const current = consumptions[consumptions.length - 1] || 0;
    const avg = +(consumptions.reduce((a, b) => a + b, 0) / consumptions.length).toFixed(2);
    const max = Math.max(...consumptions);

    // Calculate trend (last 10 vs previous 10)
    const recent = consumptions.slice(-10);
    const previous = consumptions.slice(-20, -10);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const previousAvg = previous.length > 0 ? previous.reduce((a, b) => a + b, 0) / previous.length : recentAvg;
    const trend = +((recentAvg - previousAvg) / previousAvg * 100).toFixed(1);

    return { current, avg, max, trend };
  }, [data]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-onyx-800/95 backdrop-blur-xl border border-white/10 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-offwhite-700 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-offwhite-600">{entry.name}:</span>
              <span className="font-mono text-offwhite-400">{entry.value} kW</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!isClient) {
    return (
      <div className="bg-onyx-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 h-[400px]
                    flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-engineer-500/30 border-t-engineer-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-onyx-800/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20
                          flex items-center justify-center">
              <Zap size={20} className="text-yellow-500" />
            </div>
            <div>
              <h3 className="font-semibold text-offwhite-400">
                {lang === 'tr' ? 'Anlik Enerji Tuketimi' : 'Real-time Energy'}
              </h3>
              <p className="text-xs text-offwhite-800">
                {lang === 'tr' ? 'Son 60 dakika' : 'Last 60 minutes'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={14} className="text-green-500 animate-pulse" />
            <span className="text-xs text-green-500 font-mono">LIVE</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-5 py-3 grid grid-cols-4 gap-4 border-b border-white/5">
        <div>
          <div className="text-xs text-offwhite-800 mb-1">
            {lang === 'tr' ? 'Anlik' : 'Current'}
          </div>
          <div className="font-mono text-xl text-offwhite-400">
            {stats.current}
            <span className="text-xs text-offwhite-700 ml-1">kW</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-offwhite-800 mb-1">
            {lang === 'tr' ? 'Ortalama' : 'Average'}
          </div>
          <div className="font-mono text-xl text-offwhite-400">
            {stats.avg}
            <span className="text-xs text-offwhite-700 ml-1">kW</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-offwhite-800 mb-1">
            {lang === 'tr' ? 'Maksimum' : 'Peak'}
          </div>
          <div className="font-mono text-xl text-offwhite-400">
            {stats.max}
            <span className="text-xs text-offwhite-700 ml-1">kW</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-offwhite-800 mb-1">
            {lang === 'tr' ? 'Trend' : 'Trend'}
          </div>
          <div className={`flex items-center gap-1 font-mono text-xl ${
            stats.trend > 0 ? 'text-red-400' : stats.trend < 0 ? 'text-green-400' : 'text-offwhite-400'
          }`}>
            {stats.trend > 0 ? <TrendingUp size={16} /> : stats.trend < 0 ? <TrendingDown size={16} /> : null}
            {Math.abs(stats.trend)}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="time"
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={9}
            />
            <YAxis
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={stats.avg} stroke="#F97316" strokeDasharray="5 5" strokeOpacity={0.5} />
            <Area
              type="monotone"
              dataKey="consumption"
              name={lang === 'tr' ? 'Tuketim' : 'Consumption'}
              stroke="#F97316"
              strokeWidth={2}
              fill="url(#consumptionGradient)"
              animationDuration={300}
            />
            <Area
              type="monotone"
              dataKey="solar"
              name={lang === 'tr' ? 'Gunes' : 'Solar'}
              stroke="#22C55E"
              strokeWidth={2}
              fill="url(#solarGradient)"
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="px-5 py-3 border-t border-white/5 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-engineer-500" />
          <span className="text-xs text-offwhite-700">
            {lang === 'tr' ? 'Toplam Tuketim' : 'Total Consumption'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-offwhite-700">
            {lang === 'tr' ? 'Gunes Enerjisi' : 'Solar Energy'}
          </span>
        </div>
      </div>
    </div>
  );
}
