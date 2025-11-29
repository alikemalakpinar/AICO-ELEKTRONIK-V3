import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Upload,
  Search,
  Cpu,
  Factory,
  CheckCircle,
  Truck,
  Sparkles,
} from 'lucide-react';

// PCB Manufacturing Stages Visual Component
const PCBStageVisual = ({ stage, progress }) => {
  // Different visual states for each manufacturing stage
  const stages = {
    upload: {
      soldermask: '#15803d',
      traces: 'opacity-30',
      components: false,
      solder: false,
      tested: false,
      glow: 'blue',
    },
    dfm: {
      soldermask: '#15803d',
      traces: 'opacity-60',
      components: false,
      solder: false,
      tested: false,
      glow: 'yellow',
      scanline: true,
    },
    manufacturing: {
      soldermask: '#15803d',
      traces: 'opacity-100',
      components: false,
      solder: false,
      tested: false,
      glow: 'green',
    },
    assembly: {
      soldermask: '#15803d',
      traces: 'opacity-100',
      components: true,
      solder: false,
      tested: false,
      glow: 'purple',
    },
    soldering: {
      soldermask: '#15803d',
      traces: 'opacity-100',
      components: true,
      solder: true,
      tested: false,
      glow: 'orange',
      heating: true,
    },
    testing: {
      soldermask: '#15803d',
      traces: 'opacity-100',
      components: true,
      solder: true,
      tested: true,
      glow: 'cyan',
      probes: true,
    },
    shipping: {
      soldermask: '#15803d',
      traces: 'opacity-100',
      components: true,
      solder: true,
      tested: true,
      glow: 'green',
      complete: true,
    },
  };

  const currentStage = stages[stage] || stages.upload;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-3xl blur-3xl opacity-30`}
        style={{
          background: `radial-gradient(circle, var(--tw-gradient-from) 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* PCB Board */}
      <div className="relative w-full h-full">
        {/* Main Board */}
        <motion.div
          className="absolute inset-4 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${currentStage.soldermask} 0%, #166534 50%, #14532d 100%)`,
          }}
          animate={{
            boxShadow: currentStage.complete
              ? '0 0 60px rgba(34, 197, 94, 0.4)'
              : `0 0 40px rgba(${currentStage.glow === 'blue' ? '59, 130, 246' : currentStage.glow === 'yellow' ? '234, 179, 8' : currentStage.glow === 'green' ? '34, 197, 94' : currentStage.glow === 'purple' ? '168, 85, 247' : currentStage.glow === 'orange' ? '249, 115, 22' : '6, 182, 212'}, 0.3)`,
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Circuit Traces */}
          <svg className={`absolute inset-0 w-full h-full ${currentStage.traces}`} viewBox="0 0 400 300">
            {/* Horizontal traces */}
            <motion.path
              d="M30 60 H150 L170 80 H280"
              stroke="#c4b52a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.path
              d="M30 120 H100 L120 140 H200 L220 120 H370"
              stroke="#c4b52a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            <motion.path
              d="M60 180 H140 L160 200 H260 L280 180 H370"
              stroke="#c4b52a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
            <motion.path
              d="M30 240 H220 L240 220 H340"
              stroke="#c4b52a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />

            {/* Vertical traces */}
            <motion.path
              d="M100 30 V100 L120 120 V200"
              stroke="#c4b52a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.path
              d="M220 50 V130 L240 150 V250"
              stroke="#c4b52a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M320 40 V160 L300 180 V270"
              stroke="#c4b52a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />

            {/* Via holes */}
            {[[100, 100], [220, 130], [320, 160], [160, 200], [280, 180]].map(([cx, cy], idx) => (
              <motion.circle
                key={idx}
                cx={cx}
                cy={cy}
                r="6"
                fill="#c4b52a"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + idx * 0.1 }}
              />
            ))}
          </svg>

          {/* DFM Scan Line */}
          {currentStage.scanline && (
            <motion.div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Components */}
          {currentStage.components && (
            <>
              {/* Main IC */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-12 bg-gray-900 rounded-sm shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <div className="absolute inset-1 border border-gray-700 rounded-sm" />
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gray-600" />
              </motion.div>

              {/* Secondary IC */}
              <motion.div
                className="absolute top-1/2 right-1/4 w-12 h-10 bg-gray-800 rounded-sm shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 0.4 }}
              />

              {/* Capacitors */}
              {[[70, 60], [85, 60], [280, 45]].map(([left, top], idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-4 h-3 bg-gray-900 rounded-sm"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                />
              ))}

              {/* Resistors */}
              {[[30, 75], [40, 75], [50, 75]].map(([left, top], idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-6 h-2 bg-gray-800 rounded-sm"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                />
              ))}

              {/* LEDs */}
              <motion.div
                className="absolute top-[15%] right-[15%] w-3 h-3 rounded-full bg-green-400"
                animate={currentStage.tested ? {
                  opacity: [0.3, 1, 0.3],
                  boxShadow: ['0 0 5px #4ade80', '0 0 15px #4ade80', '0 0 5px #4ade80']
                } : { opacity: 0.5 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-[15%] right-[22%] w-3 h-3 rounded-full bg-blue-400"
                animate={currentStage.tested ? {
                  opacity: [1, 0.3, 1],
                  boxShadow: ['0 0 5px #60a5fa', '0 0 15px #60a5fa', '0 0 5px #60a5fa']
                } : { opacity: 0.5 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Connector */}
              <motion.div
                className="absolute bottom-[15%] left-[20%] w-20 h-6 bg-gray-100 rounded-sm shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex justify-around items-center h-full px-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 h-4 bg-yellow-600" />
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {/* Soldering Effect */}
          {currentStage.heating && (
            <>
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-2 h-2 rounded-full bg-orange-400"
                  style={{
                    left: `${20 + idx * 15}%`,
                    top: `${30 + (idx % 2) * 20}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                />
              ))}
            </>
          )}

          {/* Test Probes */}
          {currentStage.probes && (
            <>
              <motion.div
                className="absolute top-1/4 left-1/4 w-1 h-8 bg-cyan-400 rounded-full origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transform: 'translateX(-50%)' }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-1 h-8 bg-cyan-400 rounded-full origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                style={{ transform: 'translateX(50%)' }}
              />
            </>
          )}

          {/* Complete Badge */}
          {currentStage.complete && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
            >
              <div className="bg-green-500/90 backdrop-blur-sm rounded-full p-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          )}

          {/* Corner Mounting Holes */}
          {[[8, 8], [92, 8], [8, 92], [92, 92]].map(([left, top], idx) => (
            <div
              key={idx}
              className="absolute w-4 h-4"
              style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-full h-full rounded-full border-2 border-yellow-600 bg-gray-900" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Timeline Step Component
const TimelineStep = ({ step, index, isActive, isComplete }) => {
  return (
    <motion.div
      className={`relative flex items-center gap-6 py-8 px-6 rounded-2xl transition-all duration-500 ${
        isActive ? 'bg-blue-500/10 border border-blue-500/30 scale-105' : isComplete ? 'opacity-70' : 'opacity-40'
      }`}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: isActive ? 1 : isComplete ? 0.7 : 0.4, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Step Number/Icon */}
      <motion.div
        className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
            : isComplete
            ? 'bg-green-500 text-white'
            : 'bg-gray-800 text-gray-500'
        }`}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isComplete ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <step.icon className="w-6 h-6" />
        )}
      </motion.div>

      {/* Step Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
            ADIM {index + 1}
          </span>
          {isActive && (
            <motion.span
              className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Aktif
            </motion.span>
          )}
        </div>
        <h3 className={`text-lg font-semibold mb-1 ${isActive ? 'text-white' : 'text-gray-400'}`}>
          {step.title}
        </h3>
        <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
          {step.description}
        </p>
        {isActive && step.duration && (
          <motion.p
            className="text-xs text-blue-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Tahmini Süre: {step.duration}
          </motion.p>
        )}
      </div>

      {/* Progress Indicator */}
      {isActive && (
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full" />
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Scrollytelling Timeline Component
const ScrollytellingTimeline = ({ lang = 'tr' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const content = {
    tr: {
      title: 'Üretim Süreci',
      subtitle: 'Tasarımdan teslimata, her adımda yanınızdayız',
      steps: [
        {
          id: 'upload',
          icon: Upload,
          title: 'Dosya Yükleme',
          description: 'Gerber, BOM ve Pick & Place dosyalarınızı güvenli şekilde yükleyin.',
          duration: '< 1 dakika',
        },
        {
          id: 'dfm',
          icon: Search,
          title: 'DFM Analizi',
          description: 'AI destekli sistem tasarımınızı analiz eder ve potansiyel sorunları tespit eder.',
          duration: '30 saniye',
        },
        {
          id: 'manufacturing',
          icon: Factory,
          title: 'PCB Üretimi',
          description: 'Çok katmanlı PCB\'niz yüksek hassasiyetli makinelerde üretilir.',
          duration: '24-72 saat',
        },
        {
          id: 'assembly',
          icon: Cpu,
          title: 'SMT Montaj',
          description: 'Bileşenler hassas Pick & Place makineleri ile yerleştirilir.',
          duration: '1-3 gün',
        },
        {
          id: 'soldering',
          icon: Sparkles,
          title: 'Reflow Lehimleme',
          description: 'Kontrollü sıcaklık profili ile profesyonel lehimleme işlemi.',
          duration: '2-4 saat',
        },
        {
          id: 'testing',
          icon: CheckCircle,
          title: 'Kalite Testi',
          description: 'AOI, X-Ray ve fonksiyonel testler ile %100 kalite güvencesi.',
          duration: '1-2 gün',
        },
        {
          id: 'shipping',
          icon: Truck,
          title: 'Kargo & Teslimat',
          description: 'Güvenli paketleme ve hızlı kargo ile kapınıza teslim.',
          duration: '1-5 gün',
        },
      ],
    },
    en: {
      title: 'Production Process',
      subtitle: 'From design to delivery, we are with you every step of the way',
      steps: [
        {
          id: 'upload',
          icon: Upload,
          title: 'File Upload',
          description: 'Securely upload your Gerber, BOM and Pick & Place files.',
          duration: '< 1 minute',
        },
        {
          id: 'dfm',
          icon: Search,
          title: 'DFM Analysis',
          description: 'AI-powered system analyzes your design and identifies potential issues.',
          duration: '30 seconds',
        },
        {
          id: 'manufacturing',
          icon: Factory,
          title: 'PCB Manufacturing',
          description: 'Your multi-layer PCB is manufactured on high-precision machines.',
          duration: '24-72 hours',
        },
        {
          id: 'assembly',
          icon: Cpu,
          title: 'SMT Assembly',
          description: 'Components are placed with precision Pick & Place machines.',
          duration: '1-3 days',
        },
        {
          id: 'soldering',
          icon: Sparkles,
          title: 'Reflow Soldering',
          description: 'Professional soldering with controlled temperature profile.',
          duration: '2-4 hours',
        },
        {
          id: 'testing',
          icon: CheckCircle,
          title: 'Quality Testing',
          description: '100% quality assurance with AOI, X-Ray and functional tests.',
          duration: '1-2 days',
        },
        {
          id: 'shipping',
          icon: Truck,
          title: 'Shipping & Delivery',
          description: 'Secure packaging and fast shipping to your door.',
          duration: '1-5 days',
        },
      ],
    },
  };

  const t = content[lang] || content.tr;
  const stepCount = t.steps.length;

  // Calculate current active step based on scroll progress
  const activeStepIndex = useTransform(smoothProgress, [0, 1], [0, stepCount - 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[400vh] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.title}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {t.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: PCB Visualization */}
            <div className="order-2 lg:order-1">
              <motion.div style={{ opacity: smoothProgress }}>
                <PCBStageVisual
                  stage={t.steps[Math.round(activeStepIndex.get())]?.id || 'upload'}
                  progress={smoothProgress}
                />
              </motion.div>

              {/* Progress Bar */}
              <div className="mt-8 max-w-md mx-auto">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ width: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{lang === 'tr' ? 'Başlangıç' : 'Start'}</span>
                  <span>{lang === 'tr' ? 'Tamamlandı' : 'Complete'}</span>
                </div>
              </div>
            </div>

            {/* Right: Steps List */}
            <div className="order-1 lg:order-2 space-y-4 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
              {t.steps.map((step, index) => {
                const stepProgress = index / (stepCount - 1);
                const isActive = Math.abs(activeStepIndex.get() - index) < 0.5;
                const isComplete = activeStepIndex.get() > index + 0.5;

                return (
                  <TimelineStep
                    key={step.id}
                    step={step}
                    index={index}
                    isActive={isActive}
                    isComplete={isComplete}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollytellingTimeline;
