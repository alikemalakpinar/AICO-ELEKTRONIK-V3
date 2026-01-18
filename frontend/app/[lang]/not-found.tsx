'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Home, Zap, WifiOff } from 'lucide-react';

// Glitch text effect component
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      // Random glitch effect
      if (Math.random() > 0.7) {
        setGlitchOffset({
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 5,
        });
        setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), 50);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Red channel offset */}
      <span
        className="absolute inset-0 text-red-500/80"
        style={{
          transform: `translate(${glitchOffset.x - 2}px, ${glitchOffset.y}px)`,
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Cyan channel offset */}
      <span
        className="absolute inset-0 text-cyan-500/80"
        style={{
          transform: `translate(${glitchOffset.x + 2}px, ${glitchOffset.y}px)`,
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
        }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Main text */}
      <span className="relative text-foreground">{text}</span>
    </div>
  );
}

// Flickering grid background
function FlickeringGrid() {
  const [flickerState, setFlickerState] = useState(Array(100).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setFlickerState(prev =>
        prev.map(() => Math.random() > 0.95)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="grid grid-cols-10 gap-px w-full h-full">
        {flickerState.map((isFlickering, idx) => (
          <motion.div
            key={idx}
            className="bg-engineer-500/50"
            animate={{
              opacity: isFlickering ? 1 : 0.1,
            }}
            transition={{ duration: 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}

// Broken circuit SVG
function BrokenCircuit() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full opacity-10"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Circuit paths */}
      <motion.path
        d="M0,100 L80,100 L100,80 L150,80"
        fill="none"
        stroke="#F97316"
        strokeWidth="2"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M250,80 L300,80 L320,100 L400,100"
        fill="none"
        stroke="#F97316"
        strokeWidth="2"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />

      {/* Broken connection indicator */}
      <motion.g
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <line x1="150" y1="80" x2="180" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
        <line x1="220" y1="80" x2="250" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
        <circle cx="200" cy="80" r="15" fill="none" stroke="#EF4444" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fill="#EF4444" fontSize="12">!</text>
      </motion.g>

      {/* Node points */}
      {[{ x: 100, y: 80 }, { x: 150, y: 80 }, { x: 250, y: 80 }, { x: 300, y: 80 }].map((point, idx) => (
        <motion.circle
          key={idx}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="#F97316"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: idx * 0.2 }}
        />
      ))}
    </svg>
  );
}

// Static noise effect
function StaticNoise() {
  const [noiseOpacity, setNoiseOpacity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setNoiseOpacity(0.1);
        setTimeout(() => setNoiseOpacity(0), 100);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: noiseOpacity }}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Magnetic button effect
function MagneticButton({ children, href, className = '' }: { children: React.ReactNode; href: string; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      <Link
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function NotFound() {
  const [scanlinePos, setScanlinePos] = useState(0);

  // Scanline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePos(prev => (prev + 2) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Flickering grid background */}
      <FlickeringGrid />

      {/* Broken circuit illustration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <BrokenCircuit />
      </div>

      {/* Static noise effect */}
      <StaticNoise />

      {/* Scanline effect */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-engineer-500/30 to-transparent pointer-events-none"
        style={{ top: `${scanlinePos}%` }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 dark:bg-gradient-radial dark:from-transparent dark:via-transparent dark:to-black/60 light:bg-gradient-radial light:from-transparent light:via-transparent light:to-slate-200/60 pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* Error icon */}
        <motion.div
          className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30"
          animate={{
            borderColor: ['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.6)', 'rgba(239, 68, 68, 0.3)'],
            boxShadow: [
              '0 0 20px rgba(239, 68, 68, 0)',
              '0 0 30px rgba(239, 68, 68, 0.3)',
              '0 0 20px rgba(239, 68, 68, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <WifiOff size={36} className="text-red-500" />
        </motion.div>

        {/* 404 with glitch effect */}
        <GlitchText
          text="404"
          className="font-mono text-8xl md:text-9xl font-bold mb-6 tracking-tighter"
        />

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Sinyal Kayboldu
          </h1>
          <p className="text-muted-foreground mb-2 font-mono text-sm">
            [ERROR] Connection_Failed: Page_Not_Found
          </p>
          <p className="text-muted-foreground mb-8 text-lg">
            Aradığınız sayfa mevcut değil veya devre dışı bırakıldı.
          </p>
        </motion.div>

        {/* Error details panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 p-4 dark:bg-onyx-900/50 light:bg-slate-100/80 border dark:border-white/5 light:border-slate-200 rounded-xl font-mono text-xs text-left"
        >
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Zap size={12} className="text-engineer-500" />
            <span>System Diagnostics</span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-red-500">●</span> Route: <span className="text-foreground">Not Found</span>
            </motion.div>
            <div>
              <span className="text-green-500">●</span> System: <span className="text-foreground">Operational</span>
            </div>
            <div>
              <span className="text-yellow-500">●</span> Suggestion: <span className="text-foreground">Return to Home</span>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary: Reboot System (Go Home) */}
          <MagneticButton
            href="/tr"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-engineer-500/25"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            <span>Sistemi Yeniden Başlat</span>
          </MagneticButton>

          {/* Secondary: Go to Home */}
          <MagneticButton
            href="/tr"
            className="group inline-flex items-center gap-2 px-6 py-4 dark:bg-white/5 dark:hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border dark:border-white/10 dark:hover:border-white/20 light:border-slate-200 light:hover:border-slate-300 text-foreground font-medium rounded-xl transition-all"
          >
            <Home size={18} />
            <span>Ana Sayfa</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-red-500/30" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-red-500/30" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-red-500/30" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-red-500/30" />

      {/* Status bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 dark:bg-onyx-800 light:bg-slate-200"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 via-engineer-500 to-red-500"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ width: '50%' }}
        />
      </motion.div>
    </div>
  );
}
