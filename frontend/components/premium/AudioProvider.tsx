'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

/**
 * AudioProvider - Site-wide Sound Management
 *
 * Features:
 * - Global mute/unmute control
 * - Sophisticated UI sounds generated via Web Audio API
 * - No external sound files needed - pure synthesis
 * - Persists preference to localStorage
 * - Default: Sound OFF (non-intrusive)
 */

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playWhoosh: () => void;
  playSuccess: () => void;
  playError: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<globalThis.AudioContext | null>(null);

  // Initialize Web Audio API context
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }
    return audioContextRef.current;
  }, []);

  // Load preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('aico-sound-enabled');
    if (stored !== null) {
      setIsMuted(stored !== 'true');
    }
  }, []);

  // Toggle mute state
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newValue = !prev;
      localStorage.setItem('aico-sound-enabled', String(!newValue));
      return newValue;
    });
  }, []);

  // Metallic click sound - short, crisp, premium feel
  const playClick = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    // Primary click tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);

    // Harmonic for crispness
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(4400, now);
    osc2.frequency.exponentialRampToValueAtTime(1600, now + 0.02);
    gain2.gain.setValueAtTime(0.03, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.03);
  }, [isMuted, getAudioContext]);

  // Deep whoosh sound - smooth scene transition
  const playWhoosh = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    // Create noise buffer for whoosh
    const bufferSize = Math.floor(ctx.sampleRate * 0.35);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Low-pass filter for deep, non-intrusive sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.12);
    filter.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.35);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.08);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.35);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start(ctx.currentTime);
  }, [isMuted, getAudioContext]);

  // Success sound - pleasant ascending tone
  const playSuccess = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.frequency.setValueAtTime(554, ctx.currentTime + 0.08);
    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.16);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.28);
  }, [isMuted, getAudioContext]);

  // Error sound - descending warning tone
  const playError = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.18);

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.22);
  }, [isMuted, getAudioContext]);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        playClick,
        playWhoosh,
        playSuccess,
        playError,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

// Hook to use audio context
export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    // Return no-op functions if used outside provider
    return {
      isMuted: true,
      toggleMute: () => {},
      playClick: () => {},
      playWhoosh: () => {},
      playSuccess: () => {},
      playError: () => {},
    };
  }
  return context;
}

export default AudioProvider;
