import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounce hook - Returns a debounced value that only updates after the specified delay
 * @param {any} value - The value to debounce
 * @param {number} delay - The debounce delay in milliseconds (default: 500ms)
 * @returns {any} The debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounced callback hook - Returns a debounced version of the callback
 * @param {Function} callback - The function to debounce
 * @param {number} delay - The debounce delay in milliseconds (default: 500ms)
 * @returns {Function} The debounced callback
 */
export function useDebouncedCallback(callback, delay = 500) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Throttle hook - Returns a throttled callback that only fires once per delay period
 * @param {Function} callback - The function to throttle
 * @param {number} delay - The throttle delay in milliseconds (default: 500ms)
 * @returns {Function} The throttled callback
 */
export function useThrottledCallback(callback, delay = 500) {
  const lastCallRef = useRef(0);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback((...args) => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callbackRef.current(...args);
    }
  }, [delay]);

  return throttledCallback;
}

export default useDebounce;
