'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { mode, toggleMode } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  return (
    <motion.button
      onClick={toggleMode}
      className={`
        relative flex items-center justify-center
        ${sizeClasses[size]}
        rounded-xl
        transition-all duration-300
        hover:bg-white/10 dark:hover:bg-white/5
        light:hover:bg-gray-100
        focus:outline-none focus:ring-2 focus:ring-engineer-500/50 focus:ring-offset-2
        focus:ring-offset-background
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mode === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Sun
              size={iconSizes[size]}
              className="text-offwhite-500 hover:text-engineer-400 transition-colors"
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Moon
              size={iconSizes[size]}
              className="text-gray-600 hover:text-engineer-500 transition-colors"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        style={{
          background: mode === 'dark'
            ? 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}

// Compact inline version for navbar
export function ThemeToggleInline({ className = '' }: { className?: string }) {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      onClick={toggleMode}
      className={`
        flex items-center gap-1.5 px-3 py-2
        text-xs font-mono rounded-lg
        transition-colors duration-200
        dark:text-offwhite-600 dark:hover:text-offwhite-300 dark:hover:bg-white/5
        light:text-gray-500 light:hover:text-gray-800 light:hover:bg-gray-100
        ${className}
      `}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mode === 'dark' ? (
        <>
          <Sun size={14} />
          <span className="uppercase">Light</span>
        </>
      ) : (
        <>
          <Moon size={14} />
          <span className="uppercase">Dark</span>
        </>
      )}
    </button>
  );
}
