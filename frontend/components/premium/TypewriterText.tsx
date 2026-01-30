'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 30,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const prevTextRef = useRef(text);

  useEffect(() => {
    // Reset when text changes
    if (prevTextRef.current !== text) {
      setDisplayed('');
      prevTextRef.current = text;
    }

    if (displayed.length >= text.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [text, displayed, speed, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse text-engineer-500">▌</span>
      )}
    </span>
  );
}
