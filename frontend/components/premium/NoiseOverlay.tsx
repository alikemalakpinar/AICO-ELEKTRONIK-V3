'use client';

// ===========================================
// NoiseOverlay v3.2 — 3-Layer Noise System
// Layer 1: Film grain (feTurbulence)
// Layer 2: Horizontal scanlines
// Layer 3: Vignette (radial gradient)
// ===========================================

export default function NoiseOverlay() {
  return (
    <>
      {/* SVG Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Film Grain */}
      <div
        className="noise-overlay"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.03,
          mixBlendMode: 'overlay',
        }}
      >
        <div
          className="noise-animation"
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            filter: 'url(#noise-filter)',
            animation: 'noise-shift 0.2s steps(10) infinite',
          }}
        />
      </div>

      {/* Layer 2: Horizontal Scanlines */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.015,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          )`,
        }}
      />

      {/* Layer 3: Vignette */}
      <div
        className="vignette-overlay"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 9997,
          background: `
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.2) 100%
            )
          `,
        }}
      />

      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes noise-shift {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
      `}</style>
    </>
  );
}
