'use client';

import React from 'react';

// ===========================================
// TechnicalOverlay — Military HUD Corner Brackets + Scanlines
// Adds an engineering-grade kadraj to the viewport
// ===========================================

export default function TechnicalOverlay() {
  return (
    <>
      {/* Corner Brackets */}
      <div className="technical-overlay" aria-hidden="true">
        <div className="corner-bracket corner-bracket--tl" />
        <div className="corner-bracket corner-bracket--tr" />
        <div className="corner-bracket corner-bracket--bl" />
        <div className="corner-bracket corner-bracket--br" />

        {/* Technical spec labels in corners */}
        <div className="absolute top-[18px] left-[46px] mono-badge text-engineer-500/20 select-none">
          AICO_UNIT_v3.2
        </div>
        <div className="absolute top-[18px] right-[46px] mono-badge text-engineer-500/20 select-none">
          SYS::NOMINAL
        </div>
        <div className="absolute bottom-[18px] left-[46px] mono-badge text-engineer-500/20 select-none">
          MIL-STD-810H
        </div>
        <div className="absolute bottom-[18px] right-[46px] mono-badge text-engineer-500/20 select-none">
          REV.3.2.1
        </div>
      </div>

      {/* Scanlines */}
      <div className="scanlines" aria-hidden="true" />
    </>
  );
}
