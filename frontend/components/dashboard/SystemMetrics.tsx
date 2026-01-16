'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
} from 'lucide-react';

/**
 * SystemMetrics - Technical System Health Dashboard
 *
 * Displays real-time system health and performance metrics
 */

interface SystemMetricsProps {
  lang: string;
}

interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: 'healthy' | 'warning' | 'critical';
  color: string;
}

export default function SystemMetrics({ lang }: SystemMetricsProps) {
  const [uptime, setUptime] = useState({ days: 127, hours: 14, minutes: 32 });
  const [metrics, setMetrics] = useState<Metric[]>([]);

  // Initialize metrics
  useEffect(() => {
    const initialMetrics: Metric[] = [
      {
        id: 'system',
        label: lang === 'tr' ? 'Sistem Sagligi' : 'System Health',
        value: 99.8,
        unit: '%',
        icon: <Server size={18} />,
        status: 'healthy',
        color: '#22C55E',
      },
      {
        id: 'cpu',
        label: 'CPU',
        value: 23,
        unit: '%',
        icon: <Cpu size={18} />,
        status: 'healthy',
        color: '#3B82F6',
      },
      {
        id: 'memory',
        label: lang === 'tr' ? 'Bellek' : 'Memory',
        value: 41,
        unit: '%',
        icon: <HardDrive size={18} />,
        status: 'healthy',
        color: '#8B5CF6',
      },
      {
        id: 'network',
        label: lang === 'tr' ? 'Ag Gecikme' : 'Latency',
        value: 12,
        unit: 'ms',
        icon: <Wifi size={18} />,
        status: 'healthy',
        color: '#06B6D4',
      },
    ];
    setMetrics(initialMetrics);
  }, [lang]);

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value:
            metric.id === 'system'
              ? +(99.5 + Math.random() * 0.5).toFixed(1)
              : metric.id === 'cpu'
              ? Math.floor(15 + Math.random() * 20)
              : metric.id === 'memory'
              ? Math.floor(38 + Math.random() * 10)
              : Math.floor(8 + Math.random() * 10),
        }))
      );

      // Update uptime
      setUptime((prev) => {
        let { days, hours, minutes } = prev;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
          if (hours >= 24) {
            hours = 0;
            days++;
          }
        }
        return { days, hours, minutes };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Recent events log
  const recentEvents = [
    {
      time: '14:32',
      type: 'success',
      message: lang === 'tr' ? 'Sistem yedeklemesi tamamlandi' : 'System backup completed',
    },
    {
      time: '14:28',
      type: 'info',
      message: lang === 'tr' ? 'Firmware guncellendi v2.4.1' : 'Firmware updated v2.4.1',
    },
    {
      time: '14:15',
      type: 'success',
      message: lang === 'tr' ? 'Tum sensörler aktif' : 'All sensors active',
    },
    {
      time: '13:45',
      type: 'warning',
      message: lang === 'tr' ? 'Dusuk gunes enerjisi' : 'Low solar output',
    },
  ];

  return (
    <div className="space-y-4">
      {/* System Health Overview */}
      <div className="bg-onyx-800/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20
                            flex items-center justify-center">
                <Activity size={20} className="text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-offwhite-400">
                  {lang === 'tr' ? 'Sistem Metrikleri' : 'System Metrics'}
                </h3>
                <p className="text-xs text-offwhite-800">
                  {lang === 'tr' ? 'Canli izleme' : 'Live monitoring'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span className="text-xs text-green-500 font-medium">
                {lang === 'tr' ? 'Tum Sistemler Aktif' : 'All Systems Active'}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-onyx-900/50 rounded-xl border border-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-offwhite-700">{metric.icon}</div>
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: metric.color }}
                />
              </div>
              <div className="font-mono text-2xl text-offwhite-400 mb-1">
                {metric.value}
                <span className="text-sm text-offwhite-700 ml-1">{metric.unit}</span>
              </div>
              <div className="text-xs text-offwhite-800">{metric.label}</div>

              {/* Progress bar */}
              <div className="mt-3 h-1.5 bg-onyx-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: metric.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, metric.value)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Uptime */}
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-offwhite-700">
            <Clock size={14} />
            <span className="text-xs">{lang === 'tr' ? 'Kesintisiz Calisma' : 'Uptime'}</span>
          </div>
          <div className="font-mono text-sm text-offwhite-400">
            {uptime.days}d {uptime.hours}h {uptime.minutes}m
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-onyx-800/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5">
          <h4 className="text-sm font-medium text-offwhite-400">
            {lang === 'tr' ? 'Son Olaylar' : 'Recent Events'}
          </h4>
        </div>
        <div className="divide-y divide-white/5">
          {recentEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-5 py-3 flex items-center gap-3"
            >
              {event.type === 'success' ? (
                <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
              ) : event.type === 'warning' ? (
                <AlertTriangle size={14} className="text-yellow-500 flex-shrink-0" />
              ) : (
                <Activity size={14} className="text-blue-500 flex-shrink-0" />
              )}
              <span className="text-xs text-offwhite-600 flex-1">{event.message}</span>
              <span className="text-xs text-offwhite-800 font-mono">{event.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
