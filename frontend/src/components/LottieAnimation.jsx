import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';

// Professional Lottie animation URLs from LottieFiles CDN
export const LOTTIE_ANIMATIONS = {
  // Industrial & IoT
  iot: 'https://lottie.host/a8e9c7d5-7c6e-4f3a-9b8a-2d1e3f4g5h6i/industrial-iot.json',
  mining: 'https://assets2.lottiefiles.com/packages/lf20_tno6cg2w.json', // Mining/Underground
  vibration: 'https://assets5.lottiefiles.com/packages/lf20_vvmkwxwa.json', // Sound waves/vibration
  analytics: 'https://assets3.lottiefiles.com/packages/lf20_kkflmtur.json', // Data analytics

  // Agriculture & Nature
  agriculture: 'https://assets9.lottiefiles.com/packages/lf20_myejiggj.json', // Agriculture/farming
  plant: 'https://assets6.lottiefiles.com/packages/lf20_xlmz9xwm.json', // Growing plant
  tractor: 'https://assets4.lottiefiles.com/packages/lf20_g4wqji2g.json', // Tractor
  greenhouse: 'https://assets2.lottiefiles.com/packages/lf20_ck3msgjg.json', // Greenhouse

  // Fire & Safety
  fire: 'https://assets10.lottiefiles.com/packages/lf20_qxmemvqp.json', // Fire detection
  security: 'https://assets5.lottiefiles.com/packages/lf20_p8bfn5to.json', // Security shield
  alert: 'https://assets1.lottiefiles.com/packages/lf20_rlzw0vis.json', // Alert notification

  // Cold Storage & Temperature
  coldStorage: 'https://assets8.lottiefiles.com/packages/lf20_5ngs2ksb.json', // Cold/snowflake
  temperature: 'https://assets3.lottiefiles.com/packages/lf20_xlkxtmul.json', // Temperature

  // Coffee & Machines
  coffee: 'https://assets7.lottiefiles.com/packages/lf20_4kx2q32n.json', // Coffee machine
  machine: 'https://assets4.lottiefiles.com/packages/lf20_yvlnoyem.json', // Industrial machine

  // PCB & Electronics
  pcb: 'https://assets5.lottiefiles.com/packages/lf20_sxvnyprd.json', // Circuit board
  electronics: 'https://assets2.lottiefiles.com/packages/lf20_vybwn7df.json', // Electronics
  chip: 'https://assets9.lottiefiles.com/packages/lf20_xlmz9xwm.json', // Microchip

  // Contact & Communication
  contact: 'https://assets1.lottiefiles.com/packages/lf20_in4cufsz.json', // Contact/message
  phone: 'https://assets6.lottiefiles.com/packages/lf20_wr41f4fz.json', // Phone ringing
  email: 'https://assets3.lottiefiles.com/packages/lf20_u25cckyh.json', // Email
  location: 'https://assets10.lottiefiles.com/packages/lf20_prjwp0c5.json', // Location pin

  // General
  success: 'https://assets9.lottiefiles.com/packages/lf20_jbrw3hcz.json', // Success checkmark
  loading: 'https://assets4.lottiefiles.com/packages/lf20_x62chJ.json', // Loading spinner
  rocket: 'https://assets2.lottiefiles.com/packages/lf20_mjlh3hcy.json', // Rocket launch
  gear: 'https://assets5.lottiefiles.com/packages/lf20_qzoqflj1.json', // Settings gear

  // Stats & Data
  chart: 'https://assets1.lottiefiles.com/packages/lf20_vnikrcia.json', // Chart/graph
  dashboard: 'https://assets7.lottiefiles.com/packages/lf20_2glqweqs.json', // Dashboard
  quality: 'https://assets8.lottiefiles.com/packages/lf20_cknmliys.json', // Quality badge
};

// Inline Lottie JSON data for reliable animations
const INLINE_ANIMATIONS = {
  pcbCircuit: {
    v: "5.5.7",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "PCB Circuit",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Circuit Lines",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        shapes: [
          {
            ty: "rc",
            d: 1,
            s: { a: 0, k: [160, 160] },
            p: { a: 0, k: [0, 0] },
            r: { a: 0, k: 8 },
            nm: "Board"
          },
          {
            ty: "st",
            c: { a: 0, k: [0.082, 0.329, 0.965, 1] },
            o: { a: 0, k: 100 },
            w: { a: 1, k: [
              { t: 0, s: [2], h: 0 },
              { t: 30, s: [4], h: 0 },
              { t: 60, s: [2], h: 0 }
            ]}
          }
        ]
      }
    ]
  }
};

const LottieAnimation = ({
  animationKey,
  animationData,
  url,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  className = '',
  style = {},
  onComplete,
  speed = 1
}) => {
  const lottieRef = useRef(null);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    // Priority: animationData > INLINE_ANIMATIONS > URL fetch
    if (animationData) {
      setData(animationData);
      return;
    }

    if (animationKey && INLINE_ANIMATIONS[animationKey]) {
      setData(INLINE_ANIMATIONS[animationKey]);
      return;
    }

    const animUrl = url || (animationKey && LOTTIE_ANIMATIONS[animationKey]);
    if (animUrl) {
      fetch(animUrl)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(() => setError(true));
    }
  }, [animationKey, animationData, url]);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  if (error || !data) {
    // Fallback to a simple animated SVG
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1554F6" strokeWidth="2" opacity="0.3" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#1554F6" strokeWidth="2" opacity="0.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#1554F6" strokeWidth="2" opacity="0.7" />
          <circle cx="50" cy="50" r="10" fill="#1554F6" opacity="0.9">
            <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    );
  }

  return (
    <div className={className} style={{ width, height, ...style }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={data}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

// Pre-built animated icons as SVG components
export const AnimatedIcon = ({ type, size = 48, color = '#1554F6', className = '' }) => {
  const icons = {
    pcb: (
      <svg viewBox="0 0 64 64" className={`${className}`} style={{ width: size, height: size }}>
        <rect x="8" y="8" width="48" height="48" rx="4" fill="none" stroke={color} strokeWidth="2">
          <animate attributeName="stroke-dasharray" values="0,200;200,200" dur="2s" fill="freeze" />
        </rect>
        <circle cx="20" cy="20" r="3" fill={color}>
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="0.5s" fill="freeze" />
        </circle>
        <circle cx="44" cy="20" r="3" fill={color}>
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="0.7s" fill="freeze" />
        </circle>
        <circle cx="20" cy="44" r="3" fill={color}>
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="0.9s" fill="freeze" />
        </circle>
        <circle cx="44" cy="44" r="3" fill={color}>
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.1s" fill="freeze" />
        </circle>
        <path d="M20 20 L32 32 L44 20 M20 44 L32 32 L44 44" fill="none" stroke={color} strokeWidth="1.5">
          <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="1s" begin="1.3s" fill="freeze" />
        </path>
      </svg>
    ),
    mining: (
      <svg viewBox="0 0 64 64" className={className} style={{ width: size, height: size }}>
        <path d="M8 56 L32 32 L56 56" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="1.5s" fill="freeze" />
        </path>
        <ellipse cx="32" cy="24" rx="16" ry="8" fill="none" stroke={color} strokeWidth="2">
          <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="1s" begin="0.5s" fill="freeze" />
        </ellipse>
        <circle cx="32" cy="24" r="4" fill={color}>
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        </circle>
        <line x1="32" y1="28" x2="32" y2="40" stroke={color} strokeWidth="2" strokeDasharray="2,2">
          <animate attributeName="y2" values="28;44;28" dur="1.5s" repeatCount="indefinite" />
        </line>
      </svg>
    ),
    vibration: (
      <svg viewBox="0 0 64 64" className={className} style={{ width: size, height: size }}>
        <path d="M8 32 Q16 16 24 32 Q32 48 40 32 Q48 16 56 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
          <animate attributeName="d"
            values="M8 32 Q16 16 24 32 Q32 48 40 32 Q48 16 56 32;M8 32 Q16 48 24 32 Q32 16 40 32 Q48 48 56 32;M8 32 Q16 16 24 32 Q32 48 40 32 Q48 16 56 32"
            dur="1s" repeatCount="indefinite" />
        </path>
        <circle cx="32" cy="32" r="8" fill="none" stroke={color} strokeWidth="2">
          <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    fire: (
      <svg viewBox="0 0 64 64" className={className} style={{ width: size, height: size }}>
        <path d="M32 8 C20 20 16 32 20 44 C24 56 40 56 44 44 C48 32 44 20 32 8" fill="none" stroke="#F97316" strokeWidth="2">
          <animate attributeName="d"
            values="M32 8 C20 20 16 32 20 44 C24 56 40 56 44 44 C48 32 44 20 32 8;M32 12 C22 22 18 32 22 42 C26 52 38 52 42 42 C46 32 42 22 32 12;M32 8 C20 20 16 32 20 44 C24 56 40 56 44 44 C48 32 44 20 32 8"
            dur="0.8s" repeatCount="indefinite" />
        </path>
        <path d="M32 20 C28 28 26 36 30 42 C32 46 36 46 38 42 C40 36 38 28 32 20" fill="#F97316" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="0.6s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    cold: (
      <svg viewBox="0 0 64 64" className={className} style={{ width: size, height: size }}>
        <line x1="32" y1="8" x2="32" y2="56" stroke={color} strokeWidth="2">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="8" y1="32" x2="56" y2="32" stroke={color} strokeWidth="2">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="15" y1="15" x2="49" y2="49" stroke={color} strokeWidth="2">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </line>
        <line x1="49" y1="15" x2="15" y2="49" stroke={color} strokeWidth="2">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </line>
        <circle cx="32" cy="32" r="6" fill={color}>
          <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    agriculture: (
      <svg viewBox="0 0 64 64" className={className} style={{ width: size, height: size }}>
        <path d="M32 56 L32 28" stroke="#16A34A" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0,30;30,30" dur="1s" fill="freeze" />
        </path>
        <ellipse cx="32" cy="20" rx="12" ry="14" fill="none" stroke="#16A34A" strokeWidth="2">
          <animate attributeName="ry" values="10;16;14" dur="2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="20" cy="28" rx="8" ry="10" fill="none" stroke="#16A34A" strokeWidth="2" transform="rotate(-30 20 28)">
          <animate attributeName="rx" values="6;10;8" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="44" cy="28" rx="8" ry="10" fill="none" stroke="#16A34A" strokeWidth="2" transform="rotate(30 44 28)">
          <animate attributeName="rx" values="6;10;8" dur="2s" begin="0.6s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    ),
    contact: (
      <svg viewBox="0 0 64 64" className={className} style={{ width: size, height: size }}>
        <rect x="8" y="16" width="48" height="32" rx="4" fill="none" stroke={color} strokeWidth="2">
          <animate attributeName="stroke-dasharray" values="0,200;200,200" dur="1.5s" fill="freeze" />
        </rect>
        <path d="M8 20 L32 36 L56 20" fill="none" stroke={color} strokeWidth="2">
          <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="1s" begin="0.5s" fill="freeze" />
        </path>
        <circle cx="48" cy="12" r="8" fill="#16A34A">
          <animate attributeName="r" values="6;10;8" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  };

  return icons[type] || icons.pcb;
};

export default LottieAnimation;
