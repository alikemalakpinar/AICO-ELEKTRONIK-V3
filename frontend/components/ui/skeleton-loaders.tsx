'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Base Skeleton Component
 * Premium animated loading placeholder with pulse animation
 */
interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'rounded';
}

export function Skeleton({ className, variant = 'default' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5',
        'bg-[length:200%_100%]',
        variant === 'circular' && 'rounded-full',
        variant === 'rounded' && 'rounded-xl',
        variant === 'default' && 'rounded-md',
        className
      )}
      style={{
        animation: 'skeleton-shimmer 2s ease-in-out infinite',
      }}
    />
  );
}

/**
 * Text Skeleton
 * For loading text content with multiple lines
 */
interface TextSkeletonProps {
  lines?: number;
  lastLineWidth?: string;
  className?: string;
}

export function TextSkeleton({ lines = 3, lastLineWidth = '70%', className }: TextSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 && lastLineWidth !== '100%' ? `w-[${lastLineWidth}]` : 'w-full'
          )}
          style={i === lines - 1 ? { width: lastLineWidth } : undefined}
        />
      ))}
    </div>
  );
}

/**
 * Card Skeleton
 * Premium card loading state
 */
interface CardSkeletonProps {
  hasImage?: boolean;
  imageHeight?: string;
  className?: string;
}

export function CardSkeleton({ hasImage = true, imageHeight = '200px', className }: CardSkeletonProps) {
  return (
    <div
      className={cn(
        'bg-onyx-800/30 rounded-2xl border border-white/5 overflow-hidden',
        className
      )}
    >
      {hasImage && (
        <Skeleton className="w-full rounded-none" style={{ height: imageHeight }} />
      )}
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Project Card Skeleton
 * For project/portfolio cards
 */
export function ProjectCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'group relative bg-onyx-800/30 rounded-3xl border border-white/5 overflow-hidden',
        className
      )}
    >
      {/* Image area */}
      <Skeleton className="aspect-video w-full rounded-none" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-7 w-4/5" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Hero Section Skeleton
 * For main hero/banner areas
 */
export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative min-h-[60vh] flex items-center', className)}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <Skeleton className="h-8 w-40 rounded-full" />

          {/* Title */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-4/5" />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-2/3" />
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-14 w-40 rounded-xl" />
            <Skeleton className="h-14 w-36 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square">
        <Skeleton className="w-full h-full rounded-full opacity-30" />
      </div>
    </div>
  );
}

/**
 * Stats Grid Skeleton
 */
export function StatsGridSkeleton({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="text-center space-y-2">
          <Skeleton className="h-10 w-20 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
        </div>
      ))}
    </div>
  );
}

/**
 * Navigation Skeleton
 */
export function NavSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('h-20 flex items-center justify-between px-6', className)}>
      <Skeleton className="h-8 w-32" />
      <div className="hidden lg:flex items-center gap-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-18" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * List Item Skeleton
 */
export function ListItemSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 p-4', className)}>
      <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
    </div>
  );
}

/**
 * Form Skeleton
 */
export function FormSkeleton({ fields = 4, className }: { fields?: number; className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      ))}
      <Skeleton className="h-12 w-full rounded-xl mt-4" />
    </div>
  );
}

/**
 * Table Skeleton
 */
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 4, className }: TableSkeletonProps) {
  return (
    <div className={cn('rounded-xl border border-white/5 overflow-hidden', className)}>
      {/* Header */}
      <div className="flex gap-4 p-4 bg-onyx-800/30 border-b border-white/5">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 p-4 border-b border-white/5 last:border-0"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-4 flex-1"
              style={{ width: colIndex === 0 ? '40%' : undefined }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Add shimmer animation to global styles
const shimmerStyles = `
@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;

// Export a style injector component
export function SkeletonStyles() {
  return <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />;
}
