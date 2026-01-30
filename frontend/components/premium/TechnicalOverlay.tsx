'use client';

import React from 'react';

// ===========================================
// TechnicalOverlay — Defense-Grade HUD
// Grid-scanner, glassmorphism brackets, monospace spec labels
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

      {/* Vertical Grid Scanner — sweeps left to right */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none"
        aria-hidden="true"
        style={{ mixBlendMode: 'screen' }}
      >
        <div
          className="absolute top-0 bottom-0 w-px opacity-[0.06]"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--product-primary, #F97316), transparent)',
            animation: 'grid-scanner 8s linear infinite',
          }}
        />
      </div>

      {/* Inject scanner keyframes */}
      <style jsx>{`
        @keyframes grid-scanner {
          0% { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
    </>
  );
}
