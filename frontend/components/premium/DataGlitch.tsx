'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// ===========================================
// DataGlitch — Millisecond technical distortion on number changes
// Used for dashboard stat counters, metric displays
// ===========================================

interface DataGlitchProps {
  value: string;
  className?: string;
  glitchDuration?: number; // ms, default 150
}

const GLITCH_CHARS = '0123456789%.$#@!&*';

export default function DataGlitch({ value, className, glitchDuration = 150 }: DataGlitchProps) {
  const [display, setDisplay] = useState(value);
  const [isGlitching, setIsGlitching] = useState(false);
  const prevValue = useRef(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (value !== prevValue.current) {
      prevValue.current = value;
      setIsGlitching(true);

      // Rapid glitch frames
      let frame = 0;
      const totalFrames = Math.ceil(glitchDuration / 30);

      intervalRef.current = setInterval(() => {
        frame++;
        const glitched = value
          .split('')
          .map((ch) => {
            if (/\d/.test(ch) && Math.random() > 0.4) {
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
            return ch;
          })
          .join('');
        setDisplay(glitched);

        if (frame >= totalFrames) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplay(value);
          setIsGlitching(false);
        }
      }, 30);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [value, glitchDuration]);

  // Periodic micro-glitch even when value is stable
  useEffect(() => {
    const microGlitch = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        const glitched = value
          .split('')
          .map((ch) => {
            if (/\d/.test(ch) && Math.random() > 0.6) {
              return GLITCH_CHARS[Math.floor(Math.random() * 10)];
            }
            return ch;
          })
          .join('');
        setDisplay(glitched);

        timeoutRef.current = setTimeout(() => {
          setDisplay(value);
          setIsGlitching(false);
        }, 60);
      }
    }, 3000);

    return () => {
      clearInterval(microGlitch);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value]);

  return (
    <span
      className={cn(
        'font-mono transition-colors duration-75',
        isGlitching && 'text-engineer-500',
        className,
      )}
      style={isGlitching ? { textShadow: '1px 0 #F97316, -1px 0 #06B6D4' } : undefined}
    >
      {display}
    </span>
  );
}
