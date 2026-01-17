'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[9999]">
      {/* Ambient background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Primary glow pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.05) 30%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary ambient glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </motion.div>

      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Logo container */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* AICO Logo with heartbeat effect */}
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Logo glow backdrop */}
          <motion.div
            className="absolute inset-0 blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Logo */}
          <Image
            src="/assets/logos/aicoelektroniklogo.png"
            alt="AICO Elektronik"
            width={160}
            height={60}
            className="relative z-10 brightness-0 invert opacity-90"
            priority
          />
        </motion.div>

        {/* Loading indicator - ECG-like pulse line */}
        <div className="relative w-48 h-8 overflow-hidden">
          <svg
            viewBox="0 0 200 40"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Static base line */}
            <line
              x1="0"
              y1="20"
              x2="200"
              y2="20"
              stroke="rgba(249, 115, 22, 0.2)"
              strokeWidth="1"
            />

            {/* Animated pulse path */}
            <motion.path
              d="M0,20 L40,20 L50,20 L55,5 L60,35 L65,15 L70,25 L75,20 L90,20 L100,20 L105,5 L110,35 L115,15 L120,25 L125,20 L160,20 L200,20"
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Pulse dot */}
            <motion.circle
              r="3"
              fill="#F97316"
              initial={{ cx: 0, cy: 20 }}
              animate={{
                cx: [0, 200],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </motion.circle>
          </svg>

          {/* Gradient overlay for fade effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        {/* Loading text */}
        <motion.div
          className="flex items-center gap-2 text-offwhite-700 text-xs font-mono tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Sistem Yukleniyor
          </motion.span>
          <motion.div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                .
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-engineer-500/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-engineer-500/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-engineer-500/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-engineer-500/30" />
    </div>
  );
}
