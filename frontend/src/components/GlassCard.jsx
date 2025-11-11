import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '',
  hover = true,
  glow = false,
  gradient = 'blue'
}) => {
  const gradients = {
    blue: 'from-blue-500/10 to-slate-500/10',
    purple: 'from-blue-500/10 to-slate-600/10',
    green: 'from-green-500/10 to-emerald-500/10',
    orange: 'from-blue-500/10 to-slate-500/10'
  };

  return (
    <motion.div
      whileHover={hover ? { 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      } : {}}
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${gradients[gradient]}
        backdrop-blur-xl backdrop-saturate-150
        border border-white/20
        shadow-xl shadow-black/5
        transition-all duration-300
        ${glow ? 'hover:shadow-2xl hover:shadow-primary/20' : ''}
        ${className}
      `}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow effect */}
      {glow && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-slate-500/20 to-blue-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      )}
    </motion.div>
  );
};

export default GlassCard;
