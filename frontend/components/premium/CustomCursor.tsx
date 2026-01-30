'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { getTranslations, type Locale } from '@/lib/i18n';

/**
 * CustomCursor - Premium Interactive Cursor
 *
 * Features:
 * - Minimalist dot + ring design
 * - Magnetic hover effect on links/buttons
 * - Expand effect on images with "INCELE" text
 * - Smooth spring animations with framer-motion
 * - Mobile detection (hidden on touch devices)
 */

type CursorVariant = 'default' | 'link' | 'image' | 'text' | 'hidden';

interface CursorState {
  variant: CursorVariant;
  text: string;
}

export default function CustomCursor() {
  const pathname = usePathname();
  const lang: Locale = pathname?.startsWith('/en') ? 'en' : 'tr';
  const t = getTranslations(lang);

  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
    text: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse position with motion values for performance
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring config for smooth movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Ring follows with more lag
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  // Magnetic effect ref
  const magneticRef = useRef<{ x: number; y: number } | null>(null);

  // Check for mobile/touch device
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

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Apply magnetic effect if active
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

  // Handle mouse enter/leave viewport
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  // Setup event listeners
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

  // Setup element detection for cursor variants
  useEffect(() => {
    if (isMobile) return;

    const handleElementDetection = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for images
      if (
        target.tagName === 'IMG' ||
        target.closest('[data-cursor="image"]') ||
        target.closest('.cursor-image')
      ) {
        setCursorState({ variant: 'image', text: t.common.cursorView });
        return;
      }

      // Check for links and buttons
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

      // Check for text inputs
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        setCursorState({ variant: 'text', text: '' });
        return;
      }

      // Default state
      magneticRef.current = null;
      setCursorState({ variant: 'default', text: '' });
    };

    window.addEventListener('mouseover', handleElementDetection);
    return () => window.removeEventListener('mouseover', handleElementDetection);
  }, [isMobile, t.common.cursorView]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  // Cursor variants configuration
  const variants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: '#F97316',
      mixBlendMode: 'difference' as const,
    },
    link: {
      width: 12,
      height: 12,
      backgroundColor: '#F97316',
      mixBlendMode: 'difference' as const,
    },
    image: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(249, 115, 22, 0.9)',
      mixBlendMode: 'normal' as const,
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: '#F97316',
      borderRadius: 2,
      mixBlendMode: 'difference' as const,
    },
    hidden: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
    },
  };

  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      borderColor: 'rgba(249, 115, 22, 0.5)',
      borderWidth: 1,
    },
    link: {
      width: 48,
      height: 48,
      borderColor: 'rgba(249, 115, 22, 0.8)',
      borderWidth: 2,
    },
    image: {
      width: 90,
      height: 90,
      borderColor: 'rgba(249, 115, 22, 0.3)',
      borderWidth: 1,
    },
    text: {
      width: 0,
      height: 0,
      borderColor: 'transparent',
      borderWidth: 0,
    },
    hidden: {
      width: 0,
      height: 0,
      borderColor: 'transparent',
      borderWidth: 0,
    },
  };

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        /* Restore cursor for form elements on focus */
        input:focus,
        textarea:focus,
        select:focus {
          cursor: text !important;
        }
      `}</style>

      {/* Main Cursor Dot */}
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
          borderRadius: cursorState.variant === 'text' ? '2px' : '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          ...variants[cursorState.variant],
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {/* Text inside cursor for image hover */}
        <AnimatePresence>
          {cursorState.variant === 'image' && cursorState.text && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono font-bold text-white tracking-widest uppercase"
            >
              {cursorState.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Outer Ring */}
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
          borderRadius: '50%',
          borderStyle: 'solid',
          backgroundColor: 'transparent',
        }}
        animate={{
          ...ringVariants[cursorState.variant],
          opacity: isVisible && cursorState.variant !== 'text' ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.8,
        }}
      />
    </>
  );
}
