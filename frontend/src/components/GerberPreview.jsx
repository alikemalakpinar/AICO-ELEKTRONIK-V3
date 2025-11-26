import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Eye, EyeOff, Grid3X3, CircuitBoard } from 'lucide-react';

// Mock Gerber layer data for visualization
const mockLayers = [
  { id: 'top_copper', name: 'Top Copper', color: '#c4b52a', visible: true },
  { id: 'top_mask', name: 'Top Solder Mask', color: '#15803d', visible: true },
  { id: 'top_silk', name: 'Top Silkscreen', color: '#ffffff', visible: true },
  { id: 'bottom_copper', name: 'Bottom Copper', color: '#c4b52a', visible: false },
  { id: 'bottom_mask', name: 'Bottom Solder Mask', color: '#15803d', visible: false },
  { id: 'outline', name: 'Board Outline', color: '#60a5fa', visible: true },
  { id: 'drill', name: 'Drill Holes', color: '#f59e0b', visible: true },
];

const GerberPreview = ({
  fileName = null,
  lang = 'tr',
  showControls = true,
  interactive = true
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [layers, setLayers] = useState(mockLayers);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const content = {
    tr: {
      preview: 'Gerber Önizleme',
      noFile: 'Dosya yüklendiğinde burada önizleme görünecek',
      layers: 'Katmanlar',
      zoom: 'Yakınlaştır',
      reset: 'Sıfırla',
      showGrid: 'Izgara',
      processing: 'İşleniyor...'
    },
    en: {
      preview: 'Gerber Preview',
      noFile: 'Preview will appear here when file is uploaded',
      layers: 'Layers',
      zoom: 'Zoom',
      reset: 'Reset',
      showGrid: 'Grid',
      processing: 'Processing...'
    }
  };

  const t = content[lang] || content.tr;

  const toggleLayer = (layerId) => {
    setLayers(prev => prev.map(l =>
      l.id === layerId ? { ...l, visible: !l.visible } : l
    ));
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  // Stop animation after initial render for performance
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <CircuitBoard className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-white">{t.preview}</span>
          {fileName && (
            <span className="text-xs text-slate-400 ml-2">({fileName})</span>
          )}
        </div>

        {showControls && (
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-700/50 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs text-slate-300 px-2 min-w-[40px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
              title={t.reset}
            >
              <RotateCcw size={16} />
            </button>

            {/* Layer Toggle */}
            <button
              onClick={() => setShowLayerPanel(!showLayerPanel)}
              className={`p-1.5 rounded transition-colors ${
                showLayerPanel ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
              title={t.layers}
            >
              <Layers size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Main Preview Area */}
      <div className="relative h-64 overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #334155 1px, transparent 1px),
              linear-gradient(to bottom, #334155 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* PCB Visualization */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: zoom,
            rotate: rotation,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* PCB Board */}
          <div className="relative w-48 h-36">
            {/* Board Base (Solder Mask) */}
            <AnimatePresence>
              {layers.find(l => l.id === 'top_mask')?.visible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-lg shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #15803d 0%, #166534 50%, #14532d 100%)',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.5)',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Copper Traces */}
            <AnimatePresence>
              {layers.find(l => l.id === 'top_copper')?.visible && (
                <motion.svg
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 192 144"
                >
                  {/* Main traces */}
                  <motion.path
                    d="M20 30 H80 L90 40 H150"
                    stroke="#c4b52a"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isAnimating ? [0, 1] : 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M20 60 H50 L60 70 H100 L110 60 H170"
                    stroke="#c4b52a"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isAnimating ? [0, 1] : 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M30 90 H70 L80 100 H140 L150 90 H180"
                    stroke="#c4b52a"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isAnimating ? [0, 1] : 1 }}
                    transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M20 120 H100 L110 110 H160"
                    stroke="#c4b52a"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isAnimating ? [0, 1] : 1 }}
                    transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
                  />

                  {/* Vertical traces */}
                  <motion.path
                    d="M50 20 V50 L60 60 V90"
                    stroke="#c4b52a"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isAnimating ? [0, 1] : 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M120 25 V60 L130 70 V110"
                    stroke="#c4b52a"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isAnimating ? [0, 1] : 1 }}
                    transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* Drill Holes / Vias */}
            <AnimatePresence>
              {layers.find(l => l.id === 'drill')?.visible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  {/* Via positions */}
                  {[
                    { x: 50, y: 50 },
                    { x: 80, y: 40 },
                    { x: 120, y: 60 },
                    { x: 100, y: 90 },
                    { x: 140, y: 100 },
                    { x: 60, y: 70 },
                    { x: 150, y: 45 },
                    { x: 35, y: 85 },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${(pos.x / 192) * 100}%`,
                        top: `${(pos.y / 144) * 100}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.05, type: 'spring' }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-amber-600 shadow-sm" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Silkscreen Text */}
            <AnimatePresence>
              {layers.find(l => l.id === 'top_silk')?.visible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Component outlines */}
                  <div
                    className="absolute border border-white/60 rounded-sm"
                    style={{ top: '15%', left: '10%', width: '25%', height: '20%' }}
                  />
                  <div
                    className="absolute border border-white/60 rounded-full"
                    style={{ top: '45%', right: '15%', width: '18%', height: '25%' }}
                  />
                  <div
                    className="absolute border border-white/60 rounded-sm"
                    style={{ bottom: '20%', left: '30%', width: '35%', height: '15%' }}
                  />

                  {/* Reference designators */}
                  <span className="absolute text-[6px] text-white/80 font-mono" style={{ top: '12%', left: '12%' }}>U1</span>
                  <span className="absolute text-[6px] text-white/80 font-mono" style={{ top: '42%', right: '18%' }}>C1</span>
                  <span className="absolute text-[6px] text-white/80 font-mono" style={{ bottom: '28%', left: '45%' }}>J1</span>

                  {/* Board label */}
                  <span className="absolute bottom-2 right-2 text-[5px] text-white/60 font-mono">REV 1.0</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Board Outline */}
            <AnimatePresence>
              {layers.find(l => l.id === 'outline')?.visible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 border-2 border-blue-400/50 rounded-lg pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Corner Mounting Holes */}
            {[
              { top: '5%', left: '5%' },
              { top: '5%', right: '5%' },
              { bottom: '5%', left: '5%' },
              { bottom: '5%', right: '5%' },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-slate-800 border border-slate-600"
                style={pos}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1, type: 'spring' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Layer Panel */}
        <AnimatePresence>
          {showLayerPanel && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-2 right-2 bg-slate-800/95 backdrop-blur-sm rounded-lg border border-slate-600 p-3 w-48"
            >
              <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <Layers size={14} />
                {t.layers}
              </h4>
              <div className="space-y-1">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50 transition-colors text-left"
                  >
                    <div
                      className="w-3 h-3 rounded-sm border border-slate-500"
                      style={{ backgroundColor: layer.visible ? layer.color : 'transparent' }}
                    />
                    <span className={`text-xs flex-1 ${layer.visible ? 'text-white' : 'text-slate-500'}`}>
                      {layer.name}
                    </span>
                    {layer.visible ? (
                      <Eye size={12} className="text-slate-400" />
                    ) : (
                      <EyeOff size={12} className="text-slate-500" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No File Placeholder Text */}
        {!fileName && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-xs text-slate-400">{t.noFile}</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-slate-800/30 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
        <span>100mm x 80mm</span>
        <span>4 {lang === 'tr' ? 'Katman' : 'Layers'}</span>
        <span>8 {lang === 'tr' ? 'Via' : 'Vias'}</span>
      </div>
    </div>
  );
};

export default GerberPreview;
