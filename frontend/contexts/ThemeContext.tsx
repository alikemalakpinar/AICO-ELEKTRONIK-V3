'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  theme: ProductTheme;
  colors: ProductColors;
  setTheme: (theme: ProductTheme) => void;
  setThemeByPath: (path: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ProductTheme>('default');
  const colors = productThemes[theme];

  // Apply CSS variables when theme changes
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

  const setTheme = (newTheme: ProductTheme) => {
    setThemeState(newTheme);
  };

  const setThemeByPath = (path: string) => {
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
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, setThemeByPath }}>
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

// Hook to auto-set theme based on current path
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
