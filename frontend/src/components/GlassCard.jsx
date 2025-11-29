import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Premium GlassCard with noise texture, metallic effects, and advanced interactions
const GlassCard = ({
  children,
  className = '',
  hover = true,
  glow = false,
  gradient = 'blue',
  noise = true,
  metallic = false,
  spotlight = true,
  bentoSize = 'default', // 'default', 'large', 'tall', 'wide'
  onClick,
  borderGlow = false,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { damping: 25, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  // Gradient configurations
  const gradients = {
    blue: {
      base: 'from-blue-500/10 via-slate-800/50 to-blue-600/10',
      glow: 'from-blue-500/30 to-cyan-500/30',
      border: 'border-blue-500/20',
      spotlight: 'rgba(59, 130, 246, 0.15)',
    },
    purple: {
      base: 'from-purple-500/10 via-slate-800/50 to-violet-600/10',
      glow: 'from-purple-500/30 to-pink-500/30',
      border: 'border-purple-500/20',
      spotlight: 'rgba(139, 92, 246, 0.15)',
    },
    green: {
      base: 'from-emerald-500/10 via-slate-800/50 to-green-600/10',
      glow: 'from-emerald-500/30 to-teal-500/30',
      border: 'border-emerald-500/20',
      spotlight: 'rgba(16, 185, 129, 0.15)',
    },
    orange: {
      base: 'from-orange-500/10 via-slate-800/50 to-amber-600/10',
      glow: 'from-orange-500/30 to-yellow-500/30',
      border: 'border-orange-500/20',
      spotlight: 'rgba(249, 115, 22, 0.15)',
    },
    cyan: {
      base: 'from-cyan-500/10 via-slate-800/50 to-blue-600/10',
      glow: 'from-cyan-500/30 to-blue-500/30',
      border: 'border-cyan-500/20',
      spotlight: 'rgba(6, 182, 212, 0.15)',
    },
    rose: {
      base: 'from-rose-500/10 via-slate-800/50 to-pink-600/10',
      glow: 'from-rose-500/30 to-pink-500/30',
      border: 'border-rose-500/20',
      spotlight: 'rgba(244, 63, 94, 0.15)',
    },
  };

  // Bento grid size classes
  const bentoSizes = {
    default: '',
    large: 'col-span-2 row-span-2',
    tall: 'row-span-2',
    wide: 'col-span-2',
  };

  const currentGradient = gradients[gradient] || gradients.blue;

  const handleMouseMove = (e) => {
    if (!cardRef.current || !spotlight) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Spotlight gradient
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, ${currentGradient.spotlight}, transparent 40%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -8,
              transition: { duration: 0.3, ease: 'easeOut' },
            }
          : {}
      }
      className={`
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${currentGradient.base}
        backdrop-blur-xl backdrop-saturate-150
        border ${currentGradient.border}
        shadow-xl shadow-black/10
        transition-all duration-500
        ${bentoSizes[bentoSize]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        willChange: 'transform',
      }}
    >
      {/* Noise Texture Overlay */}
      {noise && (
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      )}

      {/* Metallic Sheen */}
      {metallic && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          }}
        />
      )}

      {/* Spotlight Effect */}
      {spotlight && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: spotlightBackground }}
        />
      )}

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full pointer-events-none"
        animate={isHovered ? { x: '200%' } : { x: '-100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Border Glow */}
      {borderGlow && isHovered && (
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 ${currentGradient.border} opacity-0`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `inset 0 0 20px ${currentGradient.spotlight}, 0 0 20px ${currentGradient.spotlight}`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20">{children}</div>

      {/* Glow Effect */}
      {glow && (
        <motion.div
          className={`absolute -inset-2 bg-gradient-to-r ${currentGradient.glow} blur-xl -z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-md" />
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-md" />
      </div>
    </motion.div>
  );
};

// Bento Grid Container
export const BentoGrid = ({ children, className = '', columns = 4 }) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 auto-rows-[180px] ${className}`}>
      {children}
    </div>
  );
};

// Feature Card - Specialized Glass Card for features
export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  gradient = 'blue',
  size = 'default',
  className = '',
}) => {
  const iconColors = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-emerald-400',
    orange: 'text-orange-400',
    cyan: 'text-cyan-400',
    rose: 'text-rose-400',
  };

  return (
    <GlassCard
      gradient={gradient}
      bentoSize={size}
      glow
      spotlight
      noise
      className={`p-6 flex flex-col justify-between ${className}`}
    >
      <div>
        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${gradient}-500/20 to-${gradient}-600/10 flex items-center justify-center mb-4`}
          >
            <Icon className={`w-6 h-6 ${iconColors[gradient]}`} />
          </div>
        )}
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Hover Indicator */}
      <motion.div
        className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors mt-4"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
      >
        <span className="text-xs">Detaylar</span>
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </motion.div>
    </GlassCard>
  );
};

// Stat Card - For displaying statistics
export const StatCard = ({
  value,
  label,
  icon: Icon,
  gradient = 'blue',
  trend,
  className = '',
}) => {
  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-rose-400',
    neutral: 'text-gray-400',
  };

  return (
    <GlassCard gradient={gradient} glow spotlight noise className={`p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trendColors[trend.direction]}`}>
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}{' '}
              {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white/70" />
          </div>
        )}
      </div>
    </GlassCard>
  );
};

// Image Card - For showcasing images
export const ImageCard = ({
  src,
  alt,
  title,
  subtitle,
  gradient = 'blue',
  size = 'default',
  className = '',
}) => {
  return (
    <GlassCard
      gradient={gradient}
      bentoSize={size}
      glow
      spotlight
      className={`overflow-hidden ${className}`}
    >
      <div className="relative w-full h-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        {(title || subtitle) && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {title && <h4 className="text-white font-semibold">{title}</h4>}
            {subtitle && <p className="text-gray-300 text-sm">{subtitle}</p>}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default GlassCard;
