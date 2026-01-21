'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ===========================================
// Typography System
// Premium type scale for AICO Engineering
// Based on modern engineering aesthetics with Satoshi font
// ===========================================

// ===== DISPLAY HEADINGS (Hero sections) =====
interface DisplayProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  animate?: boolean;
  as?: 'h1' | 'h2' | 'div' | 'span';
}

export function Display({
  children,
  className,
  gradient = false,
  animate = false,
  as: Component = 'h1',
}: DisplayProps) {
  const baseClasses = cn(
    'font-bold tracking-tight leading-[1.1]',
    'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    gradient
      ? 'bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent'
      : 'text-foreground',
    className
  );

  if (animate) {
    return (
      <motion.h1
        className={baseClasses}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.h1>
    );
  }

  return <Component className={baseClasses}>{children}</Component>;
}

// ===== HEADLINE (Section headers) =====
interface HeadlineProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  balance?: boolean;
}

const headlineSizes = {
  sm: 'text-xl md:text-2xl',
  md: 'text-2xl md:text-3xl',
  lg: 'text-3xl md:text-4xl lg:text-5xl',
  xl: 'text-4xl md:text-5xl lg:text-6xl',
};

export function Headline({
  children,
  className,
  size = 'lg',
  as: Component = 'h2',
  balance = true,
}: HeadlineProps) {
  return (
    <Component
      className={cn(
        'font-semibold tracking-tight text-foreground',
        headlineSizes[size],
        balance && 'text-balance',
        className
      )}
    >
      {children}
    </Component>
  );
}

// ===== TITLE (Card headers, smaller sections) =====
interface TitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  as?: 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

const titleSizes = {
  sm: 'text-base',
  md: 'text-lg md:text-xl',
  lg: 'text-xl md:text-2xl',
};

export function Title({
  children,
  className,
  size = 'md',
  as: Component = 'h3',
}: TitleProps) {
  return (
    <Component
      className={cn(
        'font-semibold tracking-tight text-foreground',
        titleSizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

// ===== SUBTITLE (Secondary text under headings) =====
interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const subtitleSizes = {
  sm: 'text-sm',
  md: 'text-base md:text-lg',
  lg: 'text-lg md:text-xl',
};

export function Subtitle({
  children,
  className,
  size = 'md',
}: SubtitleProps) {
  return (
    <p
      className={cn(
        'text-muted-foreground leading-relaxed',
        subtitleSizes[size],
        className
      )}
    >
      {children}
    </p>
  );
}

// ===== BODY TEXT =====
interface BodyProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  muted?: boolean;
}

const bodySizes = {
  sm: 'text-sm leading-relaxed',
  md: 'text-base leading-relaxed',
  lg: 'text-lg leading-relaxed',
};

export function Body({
  children,
  className,
  size = 'md',
  muted = false,
}: BodyProps) {
  return (
    <p
      className={cn(
        bodySizes[size],
        muted ? 'text-muted-foreground' : 'text-foreground',
        className
      )}
    >
      {children}
    </p>
  );
}

// ===== CAPTION (Small text, labels) =====
interface CaptionProps {
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
}

export function Caption({
  children,
  className,
  uppercase = false,
}: CaptionProps) {
  return (
    <span
      className={cn(
        'text-xs text-muted-foreground',
        uppercase && 'uppercase tracking-widest',
        className
      )}
    >
      {children}
    </span>
  );
}

// ===== OVERLINE (Label above headings) =====
interface OverlineProps {
  children: React.ReactNode;
  className?: string;
  color?: 'default' | 'accent' | 'muted';
}

export function Overline({
  children,
  className,
  color = 'accent',
}: OverlineProps) {
  const colorClasses = {
    default: 'text-foreground',
    accent: 'text-engineer-500',
    muted: 'text-muted-foreground',
  };

  return (
    <span
      className={cn(
        'text-xs font-mono uppercase tracking-[0.2em] font-medium',
        colorClasses[color],
        className
      )}
    >
      {children}
    </span>
  );
}

// ===== LABEL (Form labels, tags) =====
interface LabelProps {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  htmlFor?: string;
}

export function Label({
  children,
  className,
  required = false,
  htmlFor,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-sm font-medium text-foreground',
        className
      )}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

// ===== CODE (Inline code) =====
interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  return (
    <code
      className={cn(
        'font-mono text-sm bg-onyx-800/50 px-1.5 py-0.5 rounded-md',
        'text-engineer-400 border border-white/5',
        className
      )}
    >
      {children}
    </code>
  );
}

// ===== QUOTE =====
interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
  className?: string;
}

export function Quote({
  children,
  author,
  role,
  className,
}: QuoteProps) {
  return (
    <blockquote
      className={cn(
        'relative pl-6 border-l-2 border-engineer-500/50',
        className
      )}
    >
      <p className="text-lg md:text-xl text-foreground italic leading-relaxed">
        "{children}"
      </p>
      {(author || role) && (
        <footer className="mt-4 text-sm text-muted-foreground">
          {author && <span className="font-medium text-foreground">{author}</span>}
          {author && role && <span className="mx-2">·</span>}
          {role && <span>{role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

// ===== GRADIENT TEXT =====
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export function GradientText({
  children,
  className,
  from = '#F97316',
  via,
  to = '#FB923C',
}: GradientTextProps) {
  return (
    <span
      className={cn('bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: via
          ? `linear-gradient(to right, ${from}, ${via}, ${to})`
          : `linear-gradient(to right, ${from}, ${to})`,
      }}
    >
      {children}
    </span>
  );
}

// ===== BADGE (Tags, status indicators) =====
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

const badgeVariants = {
  default: 'bg-white/5 text-muted-foreground border-white/10',
  outline: 'bg-transparent border-white/20 text-foreground',
  accent: 'bg-engineer-500/10 text-engineer-500 border-engineer-500/20',
  success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  danger: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const badgeSizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-3 py-1',
};

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// ===== SECTION HEADER (Complete section header with overline + headline + subtitle) =====
interface SectionHeaderProps {
  overline?: string;
  headline: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  overline,
  headline,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={cn('max-w-3xl mb-12 md:mb-16', alignClasses[align], className)}>
      {overline && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <Overline>{overline}</Overline>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <Headline size="lg">{headline}</Headline>
      </motion.div>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <Subtitle size="lg">{subtitle}</Subtitle>
        </motion.div>
      )}
    </div>
  );
}
