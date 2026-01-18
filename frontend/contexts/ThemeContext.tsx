'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// ===========================================
// AICO Elektronik - Premium Theme System
// Light/Dark Mode + Product Color Themes
// ===========================================

// Color mode types
export type ColorMode = 'light' | 'dark';

// Product theme definitions
export type ProductTheme = 'default' | 'firelink' | 'mineguard' | 'coldtrack' | 'coffee';

interface ProductColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  gradient: string;
  glow: string;
  selection: string;
}

const productThemes: Record<ProductTheme, ProductColors> = {
  default: {
    primary: '#F97316',
    primaryLight: '#FB923C',
    primaryDark: '#EA580C',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    glow: 'rgba(249, 115, 22, 0.25)',
    selection: 'rgba(249, 115, 22, 0.3)',
  },
  firelink: {
    primary: '#EF4444',
    primaryLight: '#F87171',
    primaryDark: '#DC2626',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    glow: 'rgba(239, 68, 68, 0.25)',
    selection: 'rgba(239, 68, 68, 0.3)',
  },
  mineguard: {
    primary: '#EAB308',
    primaryLight: '#FACC15',
    primaryDark: '#CA8A04',
    gradient: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)',
    glow: 'rgba(234, 179, 8, 0.25)',
    selection: 'rgba(234, 179, 8, 0.3)',
  },
  coldtrack: {
    primary: '#06B6D4',
    primaryLight: '#22D3EE',
    primaryDark: '#0891B2',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    glow: 'rgba(6, 182, 212, 0.25)',
    selection: 'rgba(6, 182, 212, 0.3)',
  },
  coffee: {
    primary: '#A855F7',
    primaryLight: '#C084FC',
    primaryDark: '#9333EA',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
    glow: 'rgba(168, 85, 247, 0.25)',
    selection: 'rgba(168, 85, 247, 0.3)',
  },
};

interface ThemeContextType {
  // Color mode (light/dark)
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
  // Product theme
  theme: ProductTheme;
  colors: ProductColors;
  setTheme: (theme: ProductTheme) => void;
  setThemeByPath: (path: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Storage keys
const MODE_STORAGE_KEY = 'aico-color-mode';
const MODE_COOKIE_KEY = 'aico-color-mode';

// Helper to set cookie
function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

// Helper to get cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ProductTheme>('default');
  const [mode, setModeState] = useState<ColorMode>('dark');
  const [mounted, setMounted] = useState(false);
  const colors = productThemes[theme];

  // Initialize mode from storage/system preference on mount
  useEffect(() => {
    setMounted(true);

    // Check localStorage first
    const storedMode = localStorage.getItem(MODE_STORAGE_KEY) as ColorMode | null;
    if (storedMode && (storedMode === 'light' || storedMode === 'dark')) {
      setModeState(storedMode);
      return;
    }

    // Check cookie
    const cookieMode = getCookie(MODE_COOKIE_KEY) as ColorMode | null;
    if (cookieMode && (cookieMode === 'light' || cookieMode === 'dark')) {
      setModeState(cookieMode);
      localStorage.setItem(MODE_STORAGE_KEY, cookieMode);
      return;
    }

    // Fallback to system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = systemPrefersDark ? 'dark' : 'light';
    setModeState(initialMode);
    localStorage.setItem(MODE_STORAGE_KEY, initialMode);
    setCookie(MODE_COOKIE_KEY, initialMode);
  }, []);

  // Apply dark class to html element and CSS variables when mode changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    // Persist to storage
    localStorage.setItem(MODE_STORAGE_KEY, mode);
    setCookie(MODE_COOKIE_KEY, mode);
  }, [mode, mounted]);

  // Apply product theme CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--product-primary', colors.primary);
    root.style.setProperty('--product-primary-light', colors.primaryLight);
    root.style.setProperty('--product-primary-dark', colors.primaryDark);
    root.style.setProperty('--product-gradient', colors.gradient);
    root.style.setProperty('--product-glow', colors.glow);
    root.style.setProperty('--product-selection', colors.selection);

    // Update scrollbar color
    root.style.setProperty('--scrollbar-thumb', `${colors.primary}40`);
    root.style.setProperty('--scrollbar-thumb-hover', `${colors.primary}60`);
  }, [colors]);

  // Set color mode
  const setMode = useCallback((newMode: ColorMode) => {
    setModeState(newMode);
  }, []);

  // Toggle between light and dark
  const toggleMode = useCallback(() => {
    setModeState(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Set product theme
  const setTheme = useCallback((newTheme: ProductTheme) => {
    setThemeState(newTheme);
  }, []);

  // Set theme based on URL path
  const setThemeByPath = useCallback((path: string) => {
    if (path.includes('fire-safety') || path.includes('firelink')) {
      setThemeState('firelink');
    } else if (path.includes('mining-iot') || path.includes('mineguard')) {
      setThemeState('mineguard');
    } else if (path.includes('cold-chain') || path.includes('coldtrack')) {
      setThemeState('coldtrack');
    } else if (path.includes('coffee')) {
      setThemeState('coffee');
    } else {
      setThemeState('default');
    }
  }, []);

  // Prevent flash on initial render
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          mode: 'dark',
          setMode: () => {},
          toggleMode: () => {},
          theme,
          colors,
          setTheme: () => {},
          setThemeByPath: () => {},
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        theme,
        colors,
        setTheme,
        setThemeByPath,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook to auto-set product theme based on current path
export function useAutoTheme() {
  const { setThemeByPath } = useTheme();

  useEffect(() => {
    setThemeByPath(window.location.pathname);

    // Listen for route changes (Next.js client-side navigation)
    const handleRouteChange = () => {
      setThemeByPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [setThemeByPath]);
}

// Hook to get current color mode
export function useColorMode() {
  const { mode, setMode, toggleMode } = useTheme();
  return { mode, setMode, toggleMode };
}
