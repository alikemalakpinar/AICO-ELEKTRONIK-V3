import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Zap, Loader2, Eye, EyeOff } from 'lucide-react';

// Lazy load the heavy 3D component
const PCB3DScene = lazy(() => import('./PCB3DScene'));

// Static PCB Placeholder with CSS animation
const PCBPlaceholder = ({ lang = 'tr' }) => (
  <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden">
    {/* Animated background grid */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }} />
    </div>

    {/* Floating circuit traces animation */}
    <div className="absolute inset-0">
      <svg className="w-full h-full opacity-20" viewBox="0 0 400 300">
        <motion.path
          d="M50,150 L100,150 L120,100 L200,100 L220,150 L350,150"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M50,200 L150,200 L170,170 L250,170 L280,200 L350,200"
          stroke="#60a5fa"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.circle cx="200" cy="150" r="30" stroke="#22d3ee" strokeWidth="2" fill="none"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    </div>

    {/* Static PCB illustration */}
    <div className="relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* PCB Board shape */}
        <div className="w-48 h-32 bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-2xl border-2 border-green-500/30 mx-auto">
          {/* Circuit traces */}
          <div className="absolute inset-2">
            <div className="absolute top-2 left-4 w-24 h-0.5 bg-yellow-500/70 rounded" />
            <div className="absolute top-6 left-8 w-20 h-0.5 bg-yellow-500/50 rounded" />
            <div className="absolute top-10 left-4 w-16 h-0.5 bg-yellow-500/60 rounded" />

            {/* IC chip */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-12 h-8 bg-slate-900 rounded-sm border border-slate-700">
              <div className="absolute top-1 left-1 w-1 h-1 bg-green-400 rounded-full animate-pulse" />
            </div>

            {/* LEDs */}
            <motion.div
              className="absolute bottom-3 right-4 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-3 right-8 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Mounting holes */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-slate-800 rounded-full border border-yellow-600/50" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-slate-800 rounded-full border border-yellow-600/50" />
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-slate-800 rounded-full border border-yellow-600/50" />
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-slate-800 rounded-full border border-yellow-600/50" />
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-gray-400 text-sm"
      >
        {lang === 'tr' ? '3D görselleştirme yükleniyor...' : 'Loading 3D visualization...'}
      </motion.p>
    </div>
  </div>
);

// Loading spinner
const LoadingSpinner = ({ lang = 'tr' }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20">
    <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
    <p className="text-gray-400 text-sm">
      {lang === 'tr' ? '3D sahne hazırlanıyor...' : 'Preparing 3D scene...'}
    </p>
  </div>
);

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Intersection Observer hook
const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once visible, stop observing
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
};

// Main wrapper component with all optimizations
const PCB3DWrapper = ({
  className = '',
  exploded = false,
  lang = 'tr',
  enableMobileToggle = true,
  forceLoad = false
}) => {
  const [containerRef, isVisible] = useIntersectionObserver();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showOn3D, setShowOn3D] = useState(true);
  const isMobile = useIsMobile();

  // Determine if we should show 3D
  const shouldShow3D = (forceLoad || isVisible) && (!isMobile || showOn3D);

  // Handle 3D load complete
  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Mobile toggle button */}
      {isMobile && enableMobileToggle && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={() => setShowOn3D(!showOn3D)}
            className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg px-3 py-2 text-xs text-gray-300 hover:bg-slate-700 transition-colors"
          >
            {showOn3D ? (
              <>
                <Eye className="w-4 h-4" />
                <span>{lang === 'tr' ? '3D Aktif' : '3D Active'}</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                <span>{lang === 'tr' ? '3D Kapalı' : '3D Off'}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Performance mode indicator */}
      {shouldShow3D && (
        <div className="absolute bottom-4 left-4 z-30">
          <div className="flex items-center gap-2 bg-slate-800/70 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] text-gray-400">
            {isMobile ? (
              <>
                <Smartphone className="w-3 h-3" />
                <span>{lang === 'tr' ? 'Mobil Mod' : 'Mobile Mode'}</span>
              </>
            ) : (
              <>
                <Monitor className="w-3 h-3" />
                <span>{lang === 'tr' ? 'Tam Kalite' : 'Full Quality'}</span>
              </>
            )}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!shouldShow3D ? (
          // Show placeholder when not visible or disabled
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <PCBPlaceholder lang={lang} />
            {isMobile && !showOn3D && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <p className="text-gray-500 text-xs">
                  {lang === 'tr'
                    ? 'Pil tasarrufu için 3D devre dışı'
                    : '3D disabled to save battery'}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          // Show 3D scene when ready
          <motion.div
            key="3d-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <Suspense fallback={<LoadingSpinner lang={lang} />}>
              <PCB3DScene
                className="w-full h-full"
                exploded={exploded}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PCB3DWrapper;
