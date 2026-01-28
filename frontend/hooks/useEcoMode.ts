'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * useEcoMode - Energy-saving hook for mobile devices
 *
 * Detects:
 * - Mobile device (screen width or touch device)
 * - Low Power Mode (Battery API)
 * - Background tab (Page Visibility API)
 * - Reduced motion preference
 *
 * Returns:
 * - isEcoMode: true if any energy-saving condition is met
 * - isMobile: true if on mobile device
 * - isLowPower: true if device is in low power mode
 * - isBackground: true if tab is in background
 * - batteryLevel: current battery percentage (0-100)
 * - prefersReducedMotion: true if user prefers reduced motion
 */

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => void) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => void) | null;
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => void) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => void) | null;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

interface EcoModeState {
  isEcoMode: boolean;
  isMobile: boolean;
  isLowPower: boolean;
  isBackground: boolean;
  batteryLevel: number | null;
  isCharging: boolean;
  prefersReducedMotion: boolean;
}

const MOBILE_BREAKPOINT = 768;
const LOW_BATTERY_THRESHOLD = 20; // Consider low power below 20%

export function useEcoMode(): EcoModeState {
  const [state, setState] = useState<EcoModeState>({
    isEcoMode: false,
    isMobile: false,
    isLowPower: false,
    isBackground: false,
    batteryLevel: null,
    isCharging: true,
    prefersReducedMotion: false,
  });

  // Check if mobile device
  const checkMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;

    // Check screen width
    const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;

    // Check for touch capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Check user agent for mobile devices
    const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    return isSmallScreen || (isTouchDevice && mobileUserAgent);
  }, []);

  // Check battery status
  const checkBattery = useCallback(async () => {
    if (typeof window === 'undefined') return { level: null, charging: true };

    const nav = navigator as NavigatorWithBattery;
    if (!nav.getBattery) return { level: null, charging: true };

    try {
      const battery = await nav.getBattery();
      return {
        level: Math.round(battery.level * 100),
        charging: battery.charging,
      };
    } catch {
      return { level: null, charging: true };
    }
  }, []);

  // Check visibility state
  const checkBackground = useCallback(() => {
    if (typeof document === 'undefined') return false;
    return document.visibilityState === 'hidden';
  }, []);

  // Check reduced motion preference
  const checkReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Update state
  const updateState = useCallback(async () => {
    const isMobile = checkMobile();
    const battery = await checkBattery();
    const isBackground = checkBackground();
    const prefersReducedMotion = checkReducedMotion();

    // Low power if battery is low and not charging
    const isLowPower =
      battery.level !== null && battery.level <= LOW_BATTERY_THRESHOLD && !battery.charging;

    // Eco mode if any condition is met
    const isEcoMode = isMobile && (isLowPower || isBackground || prefersReducedMotion);

    setState({
      isEcoMode,
      isMobile,
      isLowPower,
      isBackground,
      batteryLevel: battery.level,
      isCharging: battery.charging,
      prefersReducedMotion,
    });
  }, [checkMobile, checkBattery, checkBackground, checkReducedMotion]);

  // Initialize and set up event listeners
  useEffect(() => {
    updateState();

    // Visibility change listener
    const handleVisibilityChange = () => {
      setState(prev => {
        const isBackground = document.visibilityState === 'hidden';
        return {
          ...prev,
          isBackground,
          isEcoMode: prev.isMobile && (prev.isLowPower || isBackground || prev.prefersReducedMotion),
        };
      });
    };

    // Resize listener for mobile detection
    const handleResize = () => {
      const isMobile = checkMobile();
      setState(prev => ({
        ...prev,
        isMobile,
        isEcoMode: isMobile && (prev.isLowPower || prev.isBackground || prev.prefersReducedMotion),
      }));
    };

    // Battery listener
    const setupBatteryListener = async () => {
      const nav = navigator as NavigatorWithBattery;
      if (!nav.getBattery) return;

      try {
        const battery = await nav.getBattery();

        const handleBatteryChange = () => {
          const level = Math.round(battery.level * 100);
          const charging = battery.charging;
          const isLowPower = level <= LOW_BATTERY_THRESHOLD && !charging;

          setState(prev => ({
            ...prev,
            batteryLevel: level,
            isCharging: charging,
            isLowPower,
            isEcoMode: prev.isMobile && (isLowPower || prev.isBackground || prev.prefersReducedMotion),
          }));
        };

        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);

        return () => {
          battery.removeEventListener('levelchange', handleBatteryChange);
          battery.removeEventListener('chargingchange', handleBatteryChange);
        };
      } catch {
        // Battery API not supported
      }
    };

    // Reduced motion listener
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setState(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        isEcoMode: prev.isMobile && (prev.isLowPower || prev.isBackground || e.matches),
      }));
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    const cleanupBattery = setupBatteryListener();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
      cleanupBattery?.then(cleanup => cleanup?.());
    };
  }, [updateState, checkMobile]);

  return state;
}

/**
 * useEcoCanvas - Returns canvas settings based on eco mode
 *
 * Use this for React Three Fiber Canvas components
 */
export function useEcoCanvas() {
  const { isEcoMode, isBackground, prefersReducedMotion } = useEcoMode();

  return {
    // Pause rendering when in background
    frameloop: isBackground ? 'never' : 'always',
    // Reduce pixel ratio on eco mode
    dpr: isEcoMode ? 1 : Math.min(window?.devicePixelRatio || 1, 2),
    // Disable shadows on eco mode
    shadows: !isEcoMode,
    // Reduce antialiasing on eco mode
    gl: {
      antialias: !isEcoMode,
      powerPreference: isEcoMode ? 'low-power' : 'high-performance',
    },
    // Whether to show static fallback
    shouldShowStatic: isEcoMode && prefersReducedMotion,
  } as const;
}

export default useEcoMode;
