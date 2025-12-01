import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

const STORAGE_KEY = 'aico-theme';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Theme preference (light, dark, or system)
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return THEMES.SYSTEM;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && Object.values(THEMES).includes(saved) ? saved : THEMES.SYSTEM;
  });

  // Resolved theme (actual light or dark)
  const [resolvedTheme, setResolvedTheme] = useState(THEMES.LIGHT);

  // Get system preference
  const getSystemTheme = useCallback(() => {
    if (typeof window === 'undefined') return THEMES.LIGHT;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  }, []);

  // Apply theme to DOM
  const applyTheme = useCallback((newTheme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    root.style.colorScheme = newTheme;

    // Update meta theme-color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', newTheme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }, []);

  // Set theme with persistence
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  // Toggle between light and dark (ignores system)
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      if (theme === THEMES.SYSTEM) {
        const newResolved = e.matches ? THEMES.DARK : THEMES.LIGHT;
        setResolvedTheme(newResolved);
        applyTheme(newResolved);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  // Apply theme on mount and preference change
  useEffect(() => {
    const resolved = theme === THEMES.SYSTEM ? getSystemTheme() : theme;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, [theme, getSystemTheme, applyTheme]);

  const value = {
    theme,           // User preference (light, dark, system)
    setTheme,        // Set preference
    resolvedTheme,   // Actual applied theme (light or dark)
    toggleTheme,     // Quick toggle
    isDark: resolvedTheme === THEMES.DARK,
    isLight: resolvedTheme === THEMES.LIGHT,
    isSystem: theme === THEMES.SYSTEM,
    THEMES
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme toggle button component
export const ThemeToggle = ({ className = '', showLabels = false }) => {
  const { theme, setTheme, THEMES } = useTheme();

  const options = [
    { value: THEMES.LIGHT, icon: 'sun', label: 'Light' },
    { value: THEMES.SYSTEM, icon: 'monitor', label: 'System' },
    { value: THEMES.DARK, icon: 'moon', label: 'Dark' }
  ];

  return (
    <div className={`flex items-center gap-1 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg ${className}`}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm transition-all ${
            theme === opt.value
              ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
          title={opt.label}
        >
          {opt.icon === 'sun' && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
          {opt.icon === 'monitor' && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
          {opt.icon === 'moon' && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
          {showLabels && <span>{opt.label}</span>}
        </button>
      ))}
    </div>
  );
};

// Simple toggle button (light/dark only)
export const SimpleThemeToggle = ({ className = '' }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 ${className}`}
      title={isDark ? 'Aydınlık Mod' : 'Karanlık Mod'}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};
