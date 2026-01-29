'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Thermometer,
  Lightbulb,
  Shield,
  Wifi,
  Battery,
  Sun,
  Moon,
  Wind,
} from 'lucide-react';

/**
 * VillaStatus - Real-time Villa Control Panel
 *
 * Shows live-like status of smart home systems
 */

interface StatusItem {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  status: 'active' | 'standby' | 'warning';
}

interface VillaStatusProps {
  lang: string;
}

export default function VillaStatus({ lang }: VillaStatusProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState(22.4);
  const [humidity, setHumidity] = useState(45);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Slight random fluctuation in values for realism
      setTemperature((prev) => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
      setHumidity((prev) => Math.min(60, Math.max(40, prev + Math.floor((Math.random() - 0.5) * 2))));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const isNight = currentTime.getHours() >= 20 || currentTime.getHours() < 6;

  const statusItems: StatusItem[] = [
    {
      id: 'climate',
      label: lang === 'tr' ? 'Ic Sicaklik' : 'Indoor Temp',
      value: temperature,
      unit: '°C',
      icon: <Thermometer size={18} />,
      status: 'active',
    },
    {
      id: 'lighting',
      label: lang === 'tr' ? 'Aydınlatma' : 'Lighting',
      value: isNight ? (lang === 'tr' ? 'Gece Modu' : 'Night Mode') : (lang === 'tr' ? 'Otomatik' : 'Auto'),
      icon: isNight ? <Moon size={18} /> : <Sun size={18} />,
      status: 'active',
    },
    {
      id: 'security',
      label: lang === 'tr' ? 'Guvenlik' : 'Security',
      value: lang === 'tr' ? 'Korumada' : 'Armed',
      icon: <Shield size={18} />,
      status: 'active',
    },
    {
      id: 'hvac',
      label: 'HVAC',
      value: lang === 'tr' ? 'Calisıyor' : 'Running',
      icon: <Wind size={18} />,
      status: 'active',
    },
    {
      id: 'network',
      label: lang === 'tr' ? 'Ag Durumu' : 'Network',
      value: '847 Mbps',
      icon: <Wifi size={18} />,
      status: 'active',
    },
    {
      id: 'battery',
      label: lang === 'tr' ? 'UPS Yedek' : 'UPS Backup',
      value: '98%',
      icon: <Battery size={18} />,
      status: 'active',
    },
  ];

  return (
    <div className="bg-onyx-800/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-engineer-500/10 border border-engineer-500/20
                          flex items-center justify-center">
              <Home size={20} className="text-engineer-500" />
            </div>
            <div>
              <h3 className="font-semibold text-offwhite-400">Villa AICO-01</h3>
              <p className="text-xs text-offwhite-800">Istanbul, Bebek</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm text-offwhite-400">
              {currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xs text-offwhite-800">
              {currentTime.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Status Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {statusItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 bg-onyx-900/50 rounded-xl border border-white/5 hover:border-white/10
                     transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-offwhite-700 group-hover:text-offwhite-500 transition-colors">
                {item.icon}
              </div>
              <div className={`w-2 h-2 rounded-full ${
                item.status === 'active' ? 'bg-green-500 animate-pulse' :
                item.status === 'warning' ? 'bg-yellow-500' : 'bg-offwhite-800'
              }`} />
            </div>
            <div className="font-mono text-lg text-offwhite-400">
              {item.value}
              {item.unit && <span className="text-xs text-offwhite-700 ml-1">{item.unit}</span>}
            </div>
            <div className="text-xs text-offwhite-800 mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <button className="flex-1 py-2 px-3 bg-engineer-500/10 hover:bg-engineer-500/20
                           border border-engineer-500/20 rounded-lg text-xs font-medium
                           text-engineer-500 transition-colors">
            {lang === 'tr' ? 'Tüm Işıklar' : 'All Lights'}
          </button>
          <button className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10
                           border border-white/10 rounded-lg text-xs font-medium
                           text-offwhite-600 transition-colors">
            {lang === 'tr' ? 'Senaryo' : 'Scene'}
          </button>
        </div>
      </div>
    </div>
  );
}
