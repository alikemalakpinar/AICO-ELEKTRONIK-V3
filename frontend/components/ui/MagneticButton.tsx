'use client';

import React, { useRef, useState, ReactNode, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  magneticStrength?: number;
  scaleOnHover?: number;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  accentColor?: string;
  href?: string;
  as?: 'button' | 'a';
  ripple?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  magneticStrength = 0.3,
  scaleOnHover = 1.02,
  onClick,
  disabled = false,
  variant = 'default',
  size = 'md',
  accentColor,
  href,
  as = 'button',
  ripple = true,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Motion values for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform for text movement (moves opposite to button for depth effect)
  const textX = useTransform(x, (value) => -value * 0.5);
  const textY = useTransform(y, (value) => -value * 0.5);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    mouseX.set(deltaX);
    mouseY.set(deltaY);
  }, [magneticStrength, mouseX, mouseY, disabled]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (disabled) return;

    // Add ripple effect
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const rippleX = e.clientX - rect.left;
      const rippleY = e.clientY - rect.top;
      const newRipple = { x: rippleX, y: rippleY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  }, [onClick, ripple, disabled]);

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant styles
  const getVariantStyles = () => {
    const color = accentColor || '#F97316';

    switch (variant) {
      case 'primary':
        return {
          background: color,
          color: 'white',
          border: 'none',
          boxShadow: isHovered ? `0 0 30px ${color}50` : `0 0 0px ${color}00`,
        };
      case 'outline':
        return {
          background: 'transparent',
          color: color,
          border: `2px solid ${color}`,
          boxShadow: isHovered ? `0 0 20px ${color}30, inset 0 0 20px ${color}10` : 'none',
        };
      case 'ghost':
        return {
          background: isHovered ? `${color}15` : 'transparent',
          color: isHovered ? color : 'inherit',
          border: 'none',
        };
      default:
        return {
          background: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
          color: 'inherit',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: isHovered ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
        };
    }
  };

  const variantStyles = getVariantStyles();

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef as any}
      href={as === 'a' ? href : undefined}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-xl font-medium
        transition-colors duration-300 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        x,
        y,
        scale: isHovered && !disabled ? scaleOnHover : 1,
        ...variantStyles,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            backgroundColor: variant === 'primary' ? 'rgba(255,255,255,0.3)' : (accentColor || 'rgba(255,255,255,0.2)'),
          }}
        />
      ))}

      {/* Shine effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />
      )}

      {/* Text content with counter-movement for depth */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        style={{ x: textX, y: textY }}
      >
        {children}
      </motion.span>
    </Component>
  );
}

// Export a simpler version for icon buttons
export function MagneticIconButton({
  children,
  className = '',
  onClick,
  accentColor,
  size = 40,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  accentColor?: string;
  size?: number;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) * 0.4);
    mouseY.set((e.clientY - centerY) * 0.4);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const color = accentColor || '#F97316';

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className={`
        relative rounded-full flex items-center justify-center
        transition-colors duration-300
        ${className}
      `}
      style={{
        x,
        y,
        width: size,
        height: size,
        scale: isHovered ? 1.15 : 1,
        backgroundColor: isHovered ? `${color}20` : 'transparent',
        color: isHovered ? color : 'inherit',
        boxShadow: isHovered ? `0 0 20px ${color}30` : 'none',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
