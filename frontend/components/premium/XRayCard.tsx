'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface XRayCardProps {
  children: React.ReactNode;
  wireframeContent?: React.ReactNode;
  className?: string;
}

/**
 * X-Ray Card: On hover, reveals a "wireframe" version of the content,
 * showing the engineering depth beneath the surface.
 */
export default function XRayCard({ children, wireframeContent, className = '' }: XRayCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Normal content */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.15 : 1,
          filter: isHovered ? 'blur(2px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {/* X-Ray wireframe overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {wireframeContent || (
              <div className="w-full h-full p-6 flex flex-col items-center justify-center">
                {/* Default wireframe pattern */}
                <svg viewBox="0 0 200 150" className="w-full max-w-xs opacity-60">
                  {/* PCB-style traces */}
                  <motion.path
                    d="M20,75 L50,75 L50,30 L100,30 L100,75 L150,75 L150,120 L180,120"
                    fill="none" stroke="#F97316" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M20,40 L70,40 L70,100 L130,100 L130,50 L180,50"
                    fill="none" stroke="#F97316" strokeWidth="1" strokeOpacity="0.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
                  />
                  {/* Component nodes */}
                  {[
                    { cx: 50, cy: 30 }, { cx: 100, cy: 30 }, { cx: 100, cy: 75 },
                    { cx: 150, cy: 75 }, { cx: 150, cy: 120 }, { cx: 70, cy: 40 },
                    { cx: 70, cy: 100 }, { cx: 130, cy: 100 }, { cx: 130, cy: 50 },
                  ].map((pos, i) => (
                    <motion.circle
                      key={i} cx={pos.cx} cy={pos.cy} r="4"
                      fill="none" stroke="#F97316" strokeWidth="1.5"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05, type: 'spring', stiffness: 400, damping: 20 }}
                    />
                  ))}
                  {/* IC chip */}
                  <motion.rect
                    x="85" y="60" width="30" height="30" rx="2"
                    fill="none" stroke="#F97316" strokeWidth="1.5"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 25 }}
                  />
                  {/* IC pins */}
                  {[0, 1, 2, 3].map((i) => (
                    <g key={`pin-${i}`}>
                      <motion.line
                        x1={90 + i * 6} y1="60" x2={90 + i * 6} y2="53"
                        stroke="#F97316" strokeWidth="1"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: 1 + i * 0.05 }}
                      />
                      <motion.line
                        x1={90 + i * 6} y1="90" x2={90 + i * 6} y2="97"
                        stroke="#F97316" strokeWidth="1"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: 1 + i * 0.05 }}
                      />
                    </g>
                  ))}
                </svg>
                <motion.p
                  className="text-xs font-mono text-engineer-500 mt-4 tracking-widest uppercase"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Engineering X-Ray View
                </motion.p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
