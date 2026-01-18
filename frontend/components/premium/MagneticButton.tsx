'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: 'button' | 'div' | 'a';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  radius = 200,
  as = 'button',
  onClick,
  href,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      const factor = 1 - distance / radius;
      setPosition({
        x: distanceX * strength * factor,
        y: distanceY * strength * factor,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const MotionComponent = motion.div;

  const content = (
    <MotionComponent
      ref={ref}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        // Pass mouse position as CSS variables for glow effect
        '--mouse-x': `${position.x + 50}%`,
        '--mouse-y': `${position.y + 50}%`,
      } as React.CSSProperties}
    >
      {/* Glow effect that follows cursor */}
      <span
        className="absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + position.x}% ${50 + position.y}%, var(--product-glow), transparent 60%)`,
          opacity: Math.abs(position.x) > 0 || Math.abs(position.y) > 0 ? 1 : 0,
        }}
      />
      {children}
    </MotionComponent>
  );

  if (as === 'a' && href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  if (as === 'button') {
    return (
      <button onClick={onClick} disabled={disabled} className="inline-block bg-transparent border-0 p-0">
        {content}
      </button>
    );
  }

  return content;
}

// Simplified magnetic wrapper for existing buttons
export function useMagneticEffect(strength = 0.2) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return {
    position,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: 'transform 0.15s ease-out',
    },
  };
}
