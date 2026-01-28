'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle,
  Wifi,
  WifiOff,
  Clock,
  Settings,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { Locale } from '@/types';

// ===========================================
// DashboardShell - Premium Industrial Dashboard Layout
// AAA Game Quality Industrial IoT Interface
// ===========================================

interface SystemStatus {
  label: string;
  value: string | number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  unit?: string;
}

interface DashboardShellProps {
  children: ReactNode;
  lang: Locale;
  title: string;
  subtitle?: string;
  brandName: string;
  brandVersion?: string;
  accentColor: string;
  systemStatuses?: SystemStatus[];
  isConnected?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  className?: string;
  headerRight?: ReactNode;
  showTimestamp?: boolean;
}

const statusColors = {
  normal: '#22C55E',
  warning: '#F59E0B',
  critical: '#EF4444',
  offline: '#6B7280',
};

export default function DashboardShell({
  children,
  lang,
  title,
  subtitle,
  brandName,
  brandVersion = '3.0',
  accentColor,
  systemStatuses = [],
  isConnected = true,
  isFullscreen = false,
  onToggleFullscreen,
  className = '',
  headerRight,
  showTimestamp = true,
}: DashboardShellProps) {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusIcon = (status: SystemStatus['status']) => {
    switch (status) {
      case 'normal':
        return <CheckCircle size={12} />;
      case 'warning':
        return <AlertTriangle size={12} />;
      case 'critical':
        return <AlertTriangle size={12} className="animate-pulse" />;
      case 'offline':
        return <WifiOff size={12} />;
    }
  };

  return (
    <div
      className={`relative bg-[#050505] rounded-2xl overflow-hidden border border-white/5 ${className}`}
      style={{
        boxShadow: `0 0 40px ${accentColor}10, inset 0 0 60px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse at top, ${accentColor}15 0%, transparent 60%)`,
        }}
      />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/40 backdrop-blur-sm">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isConnected ? '#22C55E' : '#EF4444' }}
              animate={{
                scale: isConnected ? [1, 1.2, 1] : 1,
                opacity: isConnected ? [1, 0.7, 1] : 0.5,
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <span className="font-mono text-xs text-offwhite-600 uppercase tracking-wider">
              {brandName}
            </span>
            <span className="text-offwhite-800 text-[10px] font-mono">
              v{brandVersion}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-white/10">
            {isConnected ? (
              <div className="flex items-center gap-1.5 text-green-400 text-xs">
                <Wifi size={12} />
                <span className="font-mono">{lang === 'tr' ? 'BAGLI' : 'CONNECTED'}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-red-400 text-xs">
                <WifiOff size={12} />
                <span className="font-mono">{lang === 'tr' ? 'BAGLANTI YOK' : 'DISCONNECTED'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Center: Title */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="text-center">
            <h1 className="text-offwhite-400 font-semibold text-sm tracking-wide">{title}</h1>
            {subtitle && (
              <p className="text-offwhite-700 text-[10px] font-mono">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: Time & Controls */}
        <div className="flex items-center gap-4">
          {showTimestamp && (
            <div className="hidden md:flex items-center gap-3 text-offwhite-600">
              <Clock size={12} className="text-offwhite-700" />
              <div className="text-right">
                <div className="font-mono text-xs">{formatTime(currentTime)}</div>
                <div className="text-[10px] text-offwhite-800">{formatDate(currentTime)}</div>
              </div>
            </div>
          )}

          {headerRight}

          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-2 rounded-lg hover:bg-white/5 text-offwhite-600 hover:text-offwhite-400 transition-colors"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* System Status Bar (if statuses provided) */}
      {systemStatuses.length > 0 && (
        <div className="relative z-10 flex items-center gap-4 px-4 py-2 border-b border-white/5 bg-black/20 overflow-x-auto">
          {systemStatuses.map((status, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 rounded-full text-xs whitespace-nowrap"
              style={{
                backgroundColor: `${statusColors[status.status]}10`,
                border: `1px solid ${statusColors[status.status]}30`,
              }}
            >
              <span style={{ color: statusColors[status.status] }}>
                {getStatusIcon(status.status)}
              </span>
              <span className="text-offwhite-600">{status.label}:</span>
              <span
                className="font-mono font-medium"
                style={{ color: statusColors[status.status] }}
              >
                {status.value}{status.unit && <span className="text-offwhite-700 ml-0.5">{status.unit}</span>}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2 border-t border-white/5 bg-black/40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-offwhite-700" />
            <span className="text-offwhite-700 text-[10px] font-mono">
              {lang === 'tr' ? 'Sistem Aktif' : 'System Active'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-offwhite-800 text-[10px] font-mono">
            AICO ELEKTRONIK
          </span>
          <span className="text-offwhite-800 text-[10px]">|</span>
          <span className="text-offwhite-800 text-[10px] font-mono" style={{ color: accentColor }}>
            {brandName} PRO
          </span>
        </div>
      </div>

      {/* Corner accent lines */}
      <div
        className="absolute top-0 left-0 w-16 h-px"
        style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
      />
      <div
        className="absolute top-0 left-0 w-px h-16"
        style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}
      />
      <div
        className="absolute top-0 right-0 w-16 h-px"
        style={{ background: `linear-gradient(to left, ${accentColor}, transparent)` }}
      />
      <div
        className="absolute top-0 right-0 w-px h-16"
        style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-16 h-px"
        style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-px h-16"
        style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }}
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-px"
        style={{ background: `linear-gradient(to left, ${accentColor}, transparent)` }}
      />
      <div
        className="absolute bottom-0 right-0 w-px h-16"
        style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }}
      />
    </div>
  );
}

// ===========================================
// StatusChip - Tactical HUD Element
// ===========================================

interface StatusChipProps {
  label: string;
  value: string | number;
  unit?: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  icon?: ReactNode;
  pulsing?: boolean;
  className?: string;
}

export function StatusChip({
  label,
  value,
  unit,
  status,
  icon,
  pulsing = false,
  className = '',
}: StatusChipProps) {
  const color = statusColors[status];

  return (
    <motion.div
      className={`relative px-3 py-2 rounded-lg border backdrop-blur-sm ${className}`}
      style={{
        backgroundColor: `${color}08`,
        borderColor: `${color}30`,
        boxShadow: status === 'critical' ? `0 0 20px ${color}30` : undefined,
      }}
      animate={pulsing || status === 'critical' ? {
        boxShadow: [`0 0 10px ${color}20`, `0 0 20px ${color}40`, `0 0 10px ${color}20`],
      } : undefined}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span style={{ color }}>
            {icon}
          </span>
        )}
        <div>
          <div className="text-[10px] text-offwhite-700 uppercase tracking-wider">{label}</div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-lg font-mono font-bold"
              style={{ color }}
            >
              {value}
            </span>
            {unit && (
              <span className="text-xs text-offwhite-600">{unit}</span>
            )}
          </div>
        </div>
      </div>

      {/* Corner accents for tactical look */}
      <div
        className="absolute top-0 left-0 w-2 h-px"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute top-0 left-0 w-px h-2"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute bottom-0 right-0 w-2 h-px"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute bottom-0 right-0 w-px h-2"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

// ===========================================
// TacticalButton - Military HUD Style Button
// ===========================================

interface TacticalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  accentColor?: string;
  disabled?: boolean;
  className?: string;
}

export function TacticalButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  accentColor = '#F97316',
  disabled = false,
  className = '',
}: TacticalButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantStyles = {
    primary: {
      bg: `${accentColor}20`,
      border: `${accentColor}50`,
      text: accentColor,
      hoverBg: `${accentColor}30`,
    },
    secondary: {
      bg: 'rgba(255,255,255,0.05)',
      border: 'rgba(255,255,255,0.20)',
      text: '#A0A0A0',
      hoverBg: 'rgba(255,255,255,0.10)',
    },
    danger: {
      bg: 'rgba(239,68,68,0.20)',
      border: 'rgba(239,68,68,0.50)',
      text: '#EF4444',
      hoverBg: 'rgba(239,68,68,0.30)',
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative font-mono uppercase tracking-wider rounded
        border transition-colors ${sizeClasses[size]} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
    >
      {children}

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-2 h-px"
        style={{ backgroundColor: style.text }}
      />
      <div
        className="absolute top-0 left-0 w-px h-2"
        style={{ backgroundColor: style.text }}
      />
      <div
        className="absolute bottom-0 right-0 w-2 h-px"
        style={{ backgroundColor: style.text }}
      />
      <div
        className="absolute bottom-0 right-0 w-px h-2"
        style={{ backgroundColor: style.text }}
      />
    </motion.button>
  );
}
