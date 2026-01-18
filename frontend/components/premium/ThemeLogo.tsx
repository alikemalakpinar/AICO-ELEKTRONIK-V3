'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeLogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: 'default' | 'symbol' | 'wordmark';
  priority?: boolean;
}

/**
 * ThemeLogo - Intelligent logo component that switches variants based on theme
 *
 * Available variants:
 * - default: Full AICO Elektronik logo (word + symbol)
 * - symbol: Just the AICO symbol/emblem
 * - wordmark: Just the text logo
 *
 * Uses native logo assets instead of CSS filters for crisp, professional appearance
 */
export default function ThemeLogo({
  width = 82,
  height = 34,
  className = '',
  variant = 'default',
  priority = false,
}: ThemeLogoProps) {
  const { mode } = useTheme();

  // Map variant + theme to correct logo file
  const getLogoSrc = () => {
    switch (variant) {
      case 'symbol':
        // Use emblem/symbol variants
        return mode === 'dark'
          ? '/assets/logos/amblem-beyaz.png'  // White symbol for dark mode
          : '/assets/logos/amblem-mavi.png';   // Blue symbol for light mode

      case 'wordmark':
        // Use text-only logo variants
        return mode === 'dark'
          ? '/assets/logos/logo-beyaz.png'    // White text for dark mode
          : '/assets/logos/logo-mavi.png';     // Blue text for light mode

      case 'default':
      default:
        // Use full AICO Elektronik logo
        // The main logo works well in both modes with proper styling
        return mode === 'dark'
          ? '/assets/logos/logo-beyaz.png'    // White version for dark mode
          : '/assets/logos/aicoelektroniklogo.png'; // Original for light mode (has good contrast)
    }
  };

  // Calculate responsive dimensions based on variant
  const getDimensions = () => {
    switch (variant) {
      case 'symbol':
        return { w: height * 1.2, h: height }; // Square-ish for symbol
      case 'wordmark':
        return { w: width, h: height };
      default:
        return { w: width, h: height };
    }
  };

  const { w, h } = getDimensions();

  return (
    <Image
      src={getLogoSrc()}
      alt="AICO Elektronik"
      width={w}
      height={h}
      className={`transition-opacity duration-300 ${className}`}
      priority={priority}
    />
  );
}

/**
 * Hook for getting logo URL directly (for backgrounds, etc.)
 */
export function useThemeLogoUrl(variant: 'default' | 'symbol' | 'wordmark' = 'default') {
  const { mode } = useTheme();

  switch (variant) {
    case 'symbol':
      return mode === 'dark'
        ? '/assets/logos/amblem-beyaz.png'
        : '/assets/logos/amblem-mavi.png';

    case 'wordmark':
      return mode === 'dark'
        ? '/assets/logos/logo-beyaz.png'
        : '/assets/logos/logo-mavi.png';

    default:
      return mode === 'dark'
        ? '/assets/logos/logo-beyaz.png'
        : '/assets/logos/aicoelektroniklogo.png';
  }
}
