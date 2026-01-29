'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// ===========================================
// CustomCursor v3.2 — HUD Crosshair + Lock-On
// Crosshair (+) default, corner brackets on link hover
// Lock-on scale animation on interactive elements
// ===========================================

type CursorVariant = 'default' | 'link' | 'image' | 'text' | 'hidden';

interface CursorState {
  variant: CursorVariant;
  text: string;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
    text: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  const magneticRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(hasTouchScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (magneticRef.current) {
        const magnetStrength = 0.3;
        const newX = clientX + (magneticRef.current.x - clientX) * magnetStrength;
        const newY = clientY + (magneticRef.current.y - clientY) * magnetStrength;
        cursorX.set(newX);
        cursorY.set(newY);
      } else {
        cursorX.set(clientX);
        cursorY.set(clientY);
      }

      setIsVisible(true);
    },
    [cursorX, cursorY]
  );

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    if (isMobile) return;

    const handleElementDetection = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === 'IMG' ||
        target.closest('[data-cursor="image"]') ||
        target.closest('.cursor-image')
      ) {
        setCursorState({ variant: 'image', text: 'INCELE' });
        return;
      }

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="link"]') ||
        target.closest('.cursor-link')
      ) {
        const element = target.closest('a, button, [data-cursor="link"]') || target;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        magneticRef.current = { x: centerX, y: centerY };
        setCursorState({ variant: 'link', text: '' });
        return;
      }

      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        setCursorState({ variant: 'text', text: '' });
        return;
      }

      magneticRef.current = null;
      setCursorState({ variant: 'default', text: '' });
    };

    window.addEventListener('mouseover', handleElementDetection);
    return () => window.removeEventListener('mouseover', handleElementDetection);
  }, [isMobile]);

  if (isMobile) return null;

  const isLink = cursorState.variant === 'link';
  const isImage = cursorState.variant === 'image';
  const isText = cursorState.variant === 'text';

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        input:focus,
        textarea:focus,
        select:focus {
          cursor: text !important;
        }
      `}</style>

      {/* HUD Crosshair Center — the + shape */}
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isLink ? 1.5 : isImage ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {/* Crosshair + shape */}
        {!isText && !isImage && (
          <>
            {/* Horizontal line */}
            <div
              style={{
                position: 'absolute',
                width: isLink ? '14px' : '10px',
                height: '1px',
                backgroundColor: '#F97316',
                opacity: 0.9,
              }}
            />
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                width: '1px',
                height: isLink ? '14px' : '10px',
                backgroundColor: '#F97316',
                opacity: 0.9,
              }}
            />
          </>
        )}

        {/* Text cursor for inputs */}
        {isText && (
          <div
            style={{
              width: '2px',
              height: '20px',
              backgroundColor: '#F97316',
              opacity: 0.9,
            }}
          />
        )}
      </motion.div>

      {/* Outer Ring — becomes corner brackets on link hover */}
      <motion.div
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          width: isLink ? 44 : isImage ? 80 : isText ? 0 : 28,
          height: isLink ? 44 : isImage ? 80 : isText ? 0 : 28,
          opacity: isVisible && !isText ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.8,
        }}
      >
        {/* Default: circle ring */}
        {!isLink && !isImage && (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '1px solid rgba(249, 115, 22, 0.35)',
            }}
          />
        )}

        {/* Link hover: corner brackets (lock-on) */}
        {isLink && (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, borderLeft: '1.5px solid rgba(249, 115, 22, 0.8)', borderTop: '1.5px solid rgba(249, 115, 22, 0.8)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderRight: '1.5px solid rgba(249, 115, 22, 0.8)', borderTop: '1.5px solid rgba(249, 115, 22, 0.8)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10, borderLeft: '1.5px solid rgba(249, 115, 22, 0.8)', borderBottom: '1.5px solid rgba(249, 115, 22, 0.8)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRight: '1.5px solid rgba(249, 115, 22, 0.8)', borderBottom: '1.5px solid rgba(249, 115, 22, 0.8)' }} />
          </div>
        )}

        {/* Image hover: expanded circle with text */}
        {isImage && (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'rgba(249, 115, 22, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence>
              {cursorState.text && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                  className="text-[9px] font-mono font-bold text-white tracking-[0.2em] uppercase"
                >
                  {cursorState.text}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </>
  );
}
