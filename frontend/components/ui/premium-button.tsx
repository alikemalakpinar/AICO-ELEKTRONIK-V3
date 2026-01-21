'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ===========================================
// Premium Button System
// World-class button with magnetic effect, glow, and micro-interactions
// ===========================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  glow?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

// Variant styles with Onyx palette
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-engineer-500 text-white
    hover:bg-engineer-600
    active:bg-engineer-700
    shadow-lg shadow-engineer-500/20
    hover:shadow-xl hover:shadow-engineer-500/30
    focus-visible:ring-engineer-500/50
  `,
  secondary: `
    bg-white/5 text-foreground
    hover:bg-white/10
    active:bg-white/15
    border border-white/10
    hover:border-white/20
    focus-visible:ring-white/20
  `,
  ghost: `
    bg-transparent text-muted-foreground
    hover:bg-white/5 hover:text-foreground
    active:bg-white/10
    focus-visible:ring-white/10
  `,
  outline: `
    bg-transparent text-engineer-500
    border-2 border-engineer-500/50
    hover:border-engineer-500 hover:bg-engineer-500/5
    active:bg-engineer-500/10
    focus-visible:ring-engineer-500/30
  `,
  danger: `
    bg-red-500 text-white
    hover:bg-red-600
    active:bg-red-700
    shadow-lg shadow-red-500/20
    hover:shadow-xl hover:shadow-red-500/30
    focus-visible:ring-red-500/50
  `,
  success: `
    bg-emerald-500 text-white
    hover:bg-emerald-600
    active:bg-emerald-700
    shadow-lg shadow-emerald-500/20
    hover:shadow-xl hover:shadow-emerald-500/30
    focus-visible:ring-emerald-500/50
  `,
};

// Size styles
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-3',
};

// Icon size mapping
const iconSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export function PremiumButton({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  glow = true,
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: PremiumButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for magnetic effect
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Glow position for gradient effect
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !magnetic || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate magnetic pull (subtle, max 4px movement)
    const deltaX = (e.clientX - centerX) * 0.08;
    const deltaY = (e.clientY - centerY) * 0.08;

    x.set(deltaX);
    y.set(deltaY);

    // Update glow position
    const glowPosX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowPosY = ((e.clientY - rect.top) / rect.height) * 100;
    glowX.set(glowPosX);
    glowY.set(glowPosY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Dynamic glow gradient
  const glowGradient = useTransform(
    [glowX, glowY],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`
  );

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={buttonRef}
      style={{
        x: magnetic ? xSpring : 0,
        y: magnetic ? ySpring : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      disabled={isDisabled}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center font-medium',
        'transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:opacity-50 disabled:pointer-events-none',
        // Variant and size
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {/* Glow overlay for primary/danger/success variants */}
      {glow && (variant === 'primary' || variant === 'danger' || variant === 'success') && (
        <motion.div
          className="absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: glowGradient,
            opacity: isHovered ? 1 : 0,
            borderRadius: 'inherit',
          }}
        />
      )}

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none"
        style={{ borderRadius: 'inherit' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered && !isDisabled ? '100%' : '-100%' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Content wrapper */}
      <span className="relative z-10 flex items-center justify-center gap-inherit">
        {/* Loading spinner */}
        {loading && (
          <Loader2 className="animate-spin" size={iconSizes[size]} />
        )}

        {/* Left icon */}
        {!loading && icon && iconPosition === 'left' && (
          <motion.span
            animate={{ x: isHovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}

        {/* Button text */}
        <span>{children}</span>

        {/* Right icon */}
        {!loading && icon && iconPosition === 'right' && (
          <motion.span
            animate={{ x: isHovered ? 2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}

// ===========================================
// Premium Icon Button
// ===========================================

interface PremiumIconButtonProps extends Omit<PremiumButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export function PremiumIconButton({
  icon,
  size = 'md',
  ...props
}: PremiumIconButtonProps) {
  const iconButtonSizes: Record<ButtonSize, string> = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  return (
    <PremiumButton
      size={size}
      className={cn(iconButtonSizes[size], 'p-0')}
      {...props}
    >
      {icon}
    </PremiumButton>
  );
}

// ===========================================
// Premium Link Button (for navigation)
// ===========================================

interface PremiumLinkProps {
  href: string;
  variant?: 'default' | 'muted' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  underline?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PremiumLink({
  href,
  variant = 'default',
  size = 'md',
  external = false,
  underline = false,
  icon,
  children,
  className,
}: PremiumLinkProps) {
  const linkVariants = {
    default: 'text-foreground hover:text-engineer-500',
    muted: 'text-muted-foreground hover:text-foreground',
    accent: 'text-engineer-500 hover:text-engineer-400',
  };

  const linkSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 font-medium transition-colors duration-200',
        linkVariants[variant],
        linkSizes[size],
        underline && 'underline underline-offset-4 decoration-current/30 hover:decoration-current',
        className
      )}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {icon && (
        <motion.span
          initial={{ x: 0, opacity: 0.7 }}
          whileHover={{ x: 3, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.a>
  );
}

export default PremiumButton;
