'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertTriangle, BatteryWarning, Cuboid, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Adaptive3DFallbackReason } from '@/hooks/useAdaptive3DFallback';

interface PremiumSceneFallbackProps {
  className?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  videoSrc?: string;
  reason?: Adaptive3DFallbackReason;
}

function getReasonMeta(reason: Adaptive3DFallbackReason) {
  if (reason === 'webgl-context-lost') {
    return {
      label: 'WebGL recovery mode',
      icon: AlertTriangle,
      badgeClass: 'text-red-300 border-red-400/30 bg-red-500/10',
      iconClass: 'text-red-300',
    };
  }

  if (reason === 'webgl-unavailable') {
    return {
      label: 'WebGL unavailable',
      icon: AlertTriangle,
      badgeClass: 'text-rose-200 border-rose-400/30 bg-rose-500/10',
      iconClass: 'text-rose-200',
    };
  }

  if (reason === 'low-battery') {
    return {
      label: 'Low battery optimization',
      icon: BatteryWarning,
      badgeClass: 'text-amber-200 border-amber-400/30 bg-amber-500/10',
      iconClass: 'text-amber-200',
    };
  }

  if (reason === 'low-end-device') {
    return {
      label: 'Lite device rendering',
      icon: Smartphone,
      badgeClass: 'text-emerald-200 border-emerald-400/30 bg-emerald-500/10',
      iconClass: 'text-emerald-200',
    };
  }

  if (reason === 'eco-mode') {
    return {
      label: 'Eco rendering mode',
      icon: Cuboid,
      badgeClass: 'text-sky-200 border-sky-400/30 bg-sky-500/10',
      iconClass: 'text-sky-200',
    };
  }

  return {
    label: 'Adaptive rendering mode',
    icon: Cuboid,
    badgeClass: 'text-offwhite-400 border-white/15 bg-white/5',
    iconClass: 'text-offwhite-400',
  };
}

export default function PremiumSceneFallback({
  className,
  title = 'Adaptive 3D Preview',
  description = 'Interactive scene paused to keep performance smooth and stable.',
  imageSrc,
  videoSrc,
  reason = null,
}: PremiumSceneFallbackProps) {
  const meta = getReasonMeta(reason);
  const ReasonIcon = meta.icon;

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-onyx-900',
        className
      )}
    >
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSrc} />
        </video>
      ) : imageSrc ? (
        <Image src={imageSrc} alt={title} fill className="object-cover opacity-80" sizes="100vw" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(249,115,22,0.25),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.18),transparent_45%),linear-gradient(135deg,#08090e_0%,#0e1119_100%)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/95 via-onyx-950/55 to-onyx-900/20" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.08]" />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.75), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8">
        <div
          className={cn(
            'mb-3 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur-md',
            meta.badgeClass
          )}
        >
          <ReasonIcon className={cn('h-4 w-4', meta.iconClass)} />
          <span>{meta.label}</span>
        </div>

        <h3 className="max-w-xl text-xl font-semibold tracking-tight text-offwhite-400 sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 max-w-xl text-sm text-offwhite-700 sm:text-base">{description}</p>
      </div>
    </div>
  );
}
