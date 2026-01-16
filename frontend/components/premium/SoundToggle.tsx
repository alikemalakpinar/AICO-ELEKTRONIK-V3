'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from './AudioProvider';

/**
 * SoundToggle - Premium Audio Control Button
 *
 * Minimalist toggle for site-wide sound effects
 * Shows muted/unmuted state with smooth animation
 */

export default function SoundToggle() {
  const { isMuted, toggleMute, playClick } = useAudio();

  const handleToggle = () => {
    toggleMute();
    // Play click sound after unmuting
    if (isMuted) {
      setTimeout(() => playClick(), 50);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative flex items-center justify-center w-9 h-9 rounded-full
                 bg-white/5 hover:bg-white/10 border border-white/10
                 transition-colors duration-200 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isMuted ? 'Sesi Ac' : 'Sesi Kapat'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isMuted ? (
          <motion.div
            key="muted"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            <VolumeX
              size={16}
              className="text-offwhite-700 group-hover:text-offwhite-400 transition-colors"
            />
          </motion.div>
        ) : (
          <motion.div
            key="unmuted"
            initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
            transition={{ duration: 0.15 }}
          >
            <Volume2
              size={16}
              className="text-engineer-500 group-hover:text-engineer-400 transition-colors"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active indicator ring */}
      {!isMuted && (
        <motion.div
          className="absolute inset-0 rounded-full border border-engineer-500/30"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: [0.5, 0], scale: [1, 1.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}
    </motion.button>
  );
}
