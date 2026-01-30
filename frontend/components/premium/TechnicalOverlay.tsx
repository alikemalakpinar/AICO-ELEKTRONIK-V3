'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ===========================================
// TechnicalOverlay — Defense-Grade HUD
// Grid-scanner with framer-motion, glassmorphism brackets, monospace spec labels
// ===========================================

export default function TechnicalOverlay() {
  return (
    <>
      {/* Corner Brackets with glassmorphism */}
      <div className="technical-overlay" aria-hidden="true">
        <div className="corner-bracket corner-bracket--tl" />
        <div className="corner-bracket corner-bracket--tr" />
        <div className="corner-bracket corner-bracket--bl" />
        <div className="corner-bracket corner-bracket--br" />

        {/* Technical spec labels — monospace enforced */}
        <div className="absolute top-[18px] left-[46px] font-mono text-[10px] tracking-widest text-engineer-500/25 select-none uppercase">
          AICO_UNIT_v3.2
        </div>
        <div className="absolute top-[18px] right-[46px] font-mono text-[10px] tracking-widest text-engineer-500/25 select-none uppercase">
          SYS::NOMINAL
        </div>
        <div className="absolute bottom-[18px] left-[46px] font-mono text-[10px] tracking-widest text-engineer-500/25 select-none uppercase">
          MIL-STD-810H
        </div>
        <div className="absolute bottom-[18px] right-[46px] font-mono text-[10px] tracking-widest text-engineer-500/25 select-none uppercase">
          REV.3.2.1
        </div>
      </div>

      {/* Scanlines */}
      <div className="scanlines" aria-hidden="true" />

      {/* Grid Scanner — framer-motion horizontal sweep */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ mixBlendMode: 'screen' }}
      >
        <motion.div
          className="absolute top-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--product-primary, #F97316) 30%, var(--product-primary, #F97316) 70%, transparent 100%)',
          }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Grid Scanner — vertical sweep (top to bottom) — thin green/blue laser */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ mixBlendMode: 'screen' }}
      >
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent 0%, #22d3ee 20%, #22d3ee 80%, transparent 100%)',
          }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </>
  );
}
