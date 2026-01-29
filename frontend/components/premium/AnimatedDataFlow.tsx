'use client';

import { motion } from 'framer-motion';

interface AnimatedDataFlowProps {
  variant: 'fire' | 'cold' | 'mining' | 'default';
  className?: string;
}

const variants = {
  fire: {
    color: '#EF4444',
    secondaryColor: '#F97316',
    nodes: ['Sensor', 'Gateway', 'Cloud', 'Alert'],
    title: 'FireLink Data Pipeline',
  },
  cold: {
    color: '#06B6D4',
    secondaryColor: '#3B82F6',
    nodes: ['Probe', 'Logger', 'Cloud', 'Report'],
    title: 'ColdTrack Data Pipeline',
  },
  mining: {
    color: '#EAB308',
    secondaryColor: '#F97316',
    nodes: ['Wearable', 'Relay', 'Server', 'Dashboard'],
    title: 'MineGuard Data Pipeline',
  },
  default: {
    color: '#F97316',
    secondaryColor: '#FB923C',
    nodes: ['Input', 'Process', 'Analyze', 'Output'],
    title: 'Data Pipeline',
  },
};

export default function AnimatedDataFlow({ variant = 'default', className = '' }: AnimatedDataFlowProps) {
  const config = variants[variant];

  return (
    <div className={`w-full ${className}`}>
      <svg viewBox="0 0 600 100" className="w-full h-auto">
        {/* Connection lines */}
        {[0, 1, 2].map((i) => (
          <motion.line
            key={`line-${i}`}
            x1={75 + i * 160}
            y1={50}
            x2={195 + i * 160}
            y2={50}
            stroke={config.color}
            strokeWidth="1.5"
            strokeDasharray="6,4"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
          />
        ))}

        {/* Animated data packets */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`packet-${i}`}
            r="3"
            fill={config.color}
            animate={{
              cx: [75 + i * 160, 195 + i * 160],
              opacity: [1, 0.3],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut',
            }}
            cy={50}
          />
        ))}

        {/* Nodes */}
        {config.nodes.map((label, i) => (
          <g key={`node-${i}`}>
            <motion.rect
              x={20 + i * 160}
              y={25}
              width="100"
              height="50"
              rx="8"
              fill="none"
              stroke={config.color}
              strokeWidth="1.5"
              strokeOpacity={0.6}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: i * 0.15,
              }}
            />
            {/* Inner glow on first and last */}
            {(i === 0 || i === 3) && (
              <motion.rect
                x={22 + i * 160}
                y={27}
                width="96"
                height="46"
                rx="6"
                fill={config.color}
                fillOpacity={0.05}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            )}
            <text
              x={70 + i * 160}
              y={55}
              textAnchor="middle"
              fill="currentColor"
              fontSize="11"
              fontWeight="500"
              fontFamily="monospace"
              className="text-foreground"
            >
              {label}
            </text>
          </g>
        ))}

        {/* Arrow heads on connections */}
        {[0, 1, 2].map((i) => (
          <motion.polygon
            key={`arrow-${i}`}
            points={`${190 + i * 160},45 ${200 + i * 160},50 ${190 + i * 160},55`}
            fill={config.color}
            fillOpacity={0.6}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}
