'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ===========================================
// TypewriterText with Glitch — Terminal-style typing with micro-glitches
// Characters occasionally distort during typing for defense-grade feel
// ===========================================

const GLITCH_CHARS = '@#$%&*!?=/\\<>';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  glitch?: boolean;
}

export default function TypewriterText({
  text,
  speed = 30,
  className = '',
  onComplete,
  glitch = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [glitchChar, setGlitchChar] = useState<string | null>(null);
  const prevTextRef = useRef(text);

  const doGlitch = useCallback(() => {
    if (!glitch) return;
    // 20% chance of glitch on each character
    if (Math.random() > 0.8) {
      const g = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      setGlitchChar(g);
      setTimeout(() => setGlitchChar(null), 40 + Math.random() * 40);
    }
  }, [glitch]);

  useEffect(() => {
    if (prevTextRef.current !== text) {
      setDisplayed('');
      prevTextRef.current = text;
    }

    if (displayed.length >= text.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      doGlitch();
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [text, displayed, speed, onComplete, doGlitch]);

  const isTyping = displayed.length < text.length;
  const lastChar = glitchChar && isTyping ? glitchChar : null;

  return (
    <span className={`font-mono ${className}`}>
      {lastChar ? displayed.slice(0, -1) + lastChar : displayed}
      {isTyping && (
        <span
          className="animate-pulse text-engineer-500"
          style={glitchChar ? { textShadow: '1px 0 #EF4444, -1px 0 #06B6D4' } : undefined}
        >
          ▌
        </span>
      )}
    </span>
  );
}
