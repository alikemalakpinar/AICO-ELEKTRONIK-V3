'use client';

import { useEffect, useRef } from 'react';

// ===========================================
// CursorGlow v3.2 — 3D-Reactive Flashlight
// Intensifies to bright orange when hovering over
// 3D canvas elements (NeuralCore, WireframeHouse)
// ===========================================

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Check if mobile (no hover)
    if (window.matchMedia('(hover: none)').matches) {
      glow.style.display = 'none';
      return;
    }

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let isOver3D = false;
    let currentIntensity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Detect if cursor is over a 3D canvas element
      const target = e.target as HTMLElement;
      const canvas = target?.closest?.('canvas');
      isOver3D = !!canvas;
    };

    const updatePosition = () => {
      glow.style.left = `${mouseX}px`;
      glow.style.top = `${mouseY}px`;

      // Smoothly lerp intensity for 3D hover
      const targetIntensity = isOver3D ? 1 : 0;
      currentIntensity += (targetIntensity - currentIntensity) * 0.06;

      // Interpolate glow size and color intensity
      const size = 600 + currentIntensity * 150; // 600px -> 750px
      const orangeAlpha = 0.08 + currentIntensity * 0.12; // 0.08 -> 0.20
      const midAlpha = 0.03 + currentIntensity * 0.06;    // 0.03 -> 0.09

      glow.style.width = `${size}px`;
      glow.style.height = `${size}px`;
      glow.style.background = `radial-gradient(circle, rgba(249, 115, 22, ${orangeAlpha.toFixed(3)}) 0%, rgba(249, 115, 22, ${midAlpha.toFixed(3)}) 30%, transparent 70%)`;

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow hidden md:block" />;
}
