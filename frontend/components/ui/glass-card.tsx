'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { appleSpring, hoverScale as hoverScaleConfig, tapScale } from '@/lib/motion';

// ===========================================
// Glassmorphism Card System
// Premium Apple-style glass cards with 3D tilt, glow, and hover effects
// ===========================================

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'gradient' | 'glow' | 'frosted';
  tilt?: boolean;
  glow?: boolean;
  glowColor?: string;
  hoverScale?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

// Apple-style glass effects with saturate and proper blur
const variantStyles = {
  default: `
    bg-white/[0.02] dark:bg-white/[0.02]
    backdrop-blur-xl backdrop-saturate-150
    border border-white/[0.05]
  `,
  elevated: `
    bg-white/[0.03] dark:bg-onyx-800/60
    backdrop-blur-2xl backdrop-saturate-180
    border border-white/[0.08]
    shadow-2xl shadow-black/20
  `,
  bordered: `
    bg-transparent
    backdrop-blur-sm backdrop-saturate-150
    border-2 border-white/[0.1]
  `,
  gradient: `
    bg-gradient-to-br from-white/[0.05] to-transparent
    backdrop-blur-xl backdrop-saturate-150
    border border-white/[0.08]
  `,
  glow: `
    bg-white/[0.02] dark:bg-onyx-800/40
    backdrop-blur-xl backdrop-saturate-150
    border border-white/[0.05]
    shadow-lg
  `,
  // Premium frosted glass effect (Apple-style)
  frosted: `
    bg-white/[0.04] dark:bg-white/[0.03]
    backdrop-blur-[20px] backdrop-saturate-[180%]
    border border-white/[0.1]
    shadow-[0_8px_32px_rgba(0,0,0,0.12)]
  `,
};

export function GlassCard({
  children,
  className,
  variant = 'default',
  tilt = false,
  glow = false,
  glowColor = 'rgba(249, 115, 22, 0.15)',
  hoverScale = true,
  padding = 'md',
  onClick,
  as: Component = 'div',
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  // Apple-style spring for smooth tilt
  const springConfig = { damping: appleSpring.damping, stiffness: appleSpring.stiffness };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate tilt (max 5 degrees)
    if (tilt) {
      const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -5;
      const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
      rotateX.set(tiltX);
      rotateY.set(tiltY);
    }

    // Calculate glow position
    if (glow) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glowX.set(x);
      glowY.set(y);
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Dynamic glow gradient
  const glowGradient = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${glowColor} 0%, transparent 60%)`
  );

  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: tilt ? rotateXSpring : 0,
        rotateY: tilt ? rotateYSpring : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={hoverScale ? hoverScaleConfig : undefined}
      whileTap={onClick ? tapScale : undefined}
      transition={appleSpring}
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Glow effect overlay */}
      {glow && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit z-0"
          style={{
            background: glowGradient,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            borderRadius: 'inherit',
          }}
        />
      )}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          borderRadius: 'inherit',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Border shine effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          borderRadius: 'inherit',
        }}
      />
    </MotionComponent>
  );
}

// ===========================================
// Feature Card - For showcasing features/services
// ===========================================

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: string;
  className?: string;
  onClick?: () => void;
}

export function FeatureCard({
  icon,
  title,
  description,
  accentColor = '#F97316',
  className,
  onClick,
}: FeatureCardProps) {
  return (
    <GlassCard
      variant="elevated"
      tilt
      glow
      glowColor={`${accentColor}20`}
      onClick={onClick}
      className={className}
    >
      {/* Icon container */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <div style={{ color: accentColor }}>{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: accentColor }}
      />
    </GlassCard>
  );
}

// ===========================================
// Stat Card - For displaying metrics
// ===========================================

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

export function StatCard({
  value,
  label,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <GlassCard variant="default" padding="lg" className={className}>
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-engineer-500/10 flex items-center justify-center text-engineer-500">
            {icon}
          </div>
        )}
        {trend && (
          <span
            className={cn(
              'text-xs font-medium px-2 py-1 rounded-full',
              trend.isPositive
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'bg-red-500/10 text-red-500'
            )}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>

      <div className="font-mono text-4xl font-bold text-foreground mb-2 tracking-tight">
        {value}
      </div>

      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </GlassCard>
  );
}

// ===========================================
// Bento Card - For bento grid layouts
// ===========================================

interface BentoCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  span?: 'default' | 'wide' | 'tall' | 'large';
  className?: string;
}

export function BentoCard({
  title,
  description,
  icon,
  children,
  span = 'default',
  className,
}: BentoCardProps) {
  const spanStyles = {
    default: '',
    wide: 'md:col-span-2',
    tall: 'md:row-span-2',
    large: 'md:col-span-2 md:row-span-2',
  };

  return (
    <GlassCard
      variant="elevated"
      tilt
      hoverScale
      padding="lg"
      className={cn(spanStyles[span], 'group', className)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-engineer-500 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-engineer-500 group-hover:bg-engineer-500/10 transition-all">
            {icon}
          </div>
        )}
      </div>

      {/* Content */}
      {children && <div className="mt-4">{children}</div>}
    </GlassCard>
  );
}

export default GlassCard;
