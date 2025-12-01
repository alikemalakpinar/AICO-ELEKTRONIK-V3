import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Ruler,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Share2,
  RotateCcw,
  ArrowRight,
  Package,
  Sparkles,
} from 'lucide-react';
import GlassCard from '../GlassCard';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

// Cable cross-section database (mm²)
const CABLE_SIZES = [0.5, 0.75, 1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0, 120.0];

// Material properties
const MATERIALS = {
  copper: {
    name: 'Bakır',
    nameEn: 'Copper',
    resistivity: 0.0175, // Ω·mm²/m at 20°C
    tempCoeff: 0.00393, // per °C
    maxTemp: 70, // °C for PVC insulation
    color: '#B87333',
    ampacityFactor: 1.0,
  },
  aluminum: {
    name: 'Alüminyum',
    nameEn: 'Aluminum',
    resistivity: 0.0283,
    tempCoeff: 0.00403,
    maxTemp: 70,
    color: '#C0C0C0',
    ampacityFactor: 0.78,
  },
};

// Visual Cable Component
const VisualCable = ({ crossSection, current, maxCurrent, temperature, material }) => {
  // Calculate visual properties
  const baseWidth = 10; // Base width for 1mm² cable
  const scaleFactor = Math.sqrt(crossSection); // Scale by sqrt for visual proportion
  const cableWidth = baseWidth + scaleFactor * 5;

  // Calculate heat level (0-1)
  const heatLevel = Math.min(1, Math.max(0, (current / maxCurrent)));

  // Temperature-based color gradient
  const getHeatColor = (level) => {
    if (level < 0.5) {
      // Cool to warm
      return `rgb(${Math.round(level * 2 * 255)}, ${Math.round(180 - level * 100)}, ${Math.round(100 - level * 100)})`;
    } else {
      // Warm to hot
      const hotLevel = (level - 0.5) * 2;
      return `rgb(255, ${Math.round(180 - hotLevel * 180)}, ${Math.round(50 - hotLevel * 50)})`;
    }
  };

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Background glow for overheating */}
      <AnimatePresence>
        {heatLevel > 0.7 && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle, ${getHeatColor(heatLevel)} 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Cable SVG */}
      <svg viewBox="0 0 300 100" className="w-full max-w-md">
        {/* Cable insulation */}
        <motion.rect
          x={50}
          y={50 - cableWidth / 2 - 4}
          width={200}
          height={cableWidth + 8}
          rx={4}
          fill="#2a2a2a"
          animate={{ height: cableWidth + 8, y: 50 - cableWidth / 2 - 4 }}
          transition={{ type: 'spring', stiffness: 100 }}
        />

        {/* Cable conductor */}
        <motion.rect
          x={50}
          y={50 - cableWidth / 2}
          width={200}
          height={cableWidth}
          rx={2}
          fill={MATERIALS[material].color}
          animate={{
            height: cableWidth,
            y: 50 - cableWidth / 2,
            fill: heatLevel > 0.6 ? getHeatColor(heatLevel) : MATERIALS[material].color,
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        />

        {/* Heat waves animation for overheating */}
        {heatLevel > 0.6 && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M ${80 + i * 50} ${48 - cableWidth / 2 - 5} Q ${90 + i * 50} ${38 - cableWidth / 2 - 5}, ${100 + i * 50} ${48 - cableWidth / 2 - 5}`}
                stroke={getHeatColor(heatLevel)}
                strokeWidth={2}
                fill="none"
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  y: [-5, -20, -25],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}

        {/* Current flow animation */}
        <motion.circle
          r={3}
          fill="#60a5fa"
          animate={{
            cx: [50, 250],
            opacity: current > 0 ? [0, 1, 1, 0] : 0,
          }}
          transition={{
            duration: Math.max(0.5, 2 - (current / 50) * 1.5),
            repeat: Infinity,
            ease: 'linear',
          }}
          cy={50}
        />
        <motion.circle
          r={3}
          fill="#60a5fa"
          animate={{
            cx: [50, 250],
            opacity: current > 0 ? [0, 1, 1, 0] : 0,
          }}
          transition={{
            duration: Math.max(0.5, 2 - (current / 50) * 1.5),
            repeat: Infinity,
            ease: 'linear',
            delay: 0.5,
          }}
          cy={50}
        />

        {/* Connector ends */}
        <rect x={40} y={35} width={15} height={30} rx={2} fill="#d4af37" />
        <rect x={245} y={35} width={15} height={30} rx={2} fill="#d4af37" />

        {/* Cross-section indicator */}
        <text x={150} y={90} textAnchor="middle" fill="#888" fontSize={12}>
          {crossSection} mm²
        </text>
      </svg>

      {/* Temperature indicator */}
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <Thermometer className={`w-5 h-5 ${heatLevel > 0.7 ? 'text-red-500' : 'text-gray-400'}`} />
        <span className={`font-mono ${heatLevel > 0.7 ? 'text-red-400' : 'text-gray-400'}`}>
          {temperature.toFixed(1)}°C
        </span>
      </div>
    </div>
  );
};

// Results Panel
const ResultsPanel = ({ results, lang }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'safe':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'danger':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <GlassCard gradient={results.status === 'safe' ? 'green' : results.status === 'warning' ? 'orange' : 'rose'} className="p-6">
      <div className="flex items-center gap-3 mb-4">
        {getStatusIcon(results.status)}
        <h3 className={`text-lg font-semibold ${getStatusColor(results.status)}`}>
          {results.status === 'safe'
            ? (lang === 'tr' ? 'Güvenli Seçim' : 'Safe Selection')
            : results.status === 'warning'
            ? (lang === 'tr' ? 'Dikkat Gerekli' : 'Caution Required')
            : (lang === 'tr' ? 'Tehlike! Uygun Değil' : 'Danger! Not Suitable')}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-sm">{lang === 'tr' ? 'Önerilen Kesit' : 'Recommended Size'}</p>
          <p className="text-2xl font-bold text-white">{results.recommendedSize} mm²</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">{lang === 'tr' ? 'Voltaj Düşümü' : 'Voltage Drop'}</p>
          <p className="text-2xl font-bold text-white">{results.voltageDrop.toFixed(2)} V</p>
          <p className="text-xs text-gray-500">({results.voltageDropPercent.toFixed(2)}%)</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">{lang === 'tr' ? 'Güç Kaybı' : 'Power Loss'}</p>
          <p className="text-xl font-semibold text-white">{results.powerLoss.toFixed(2)} W</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">{lang === 'tr' ? 'Kablo Sıcaklığı' : 'Cable Temp'}</p>
          <p className={`text-xl font-semibold ${results.temperature > 60 ? 'text-red-400' : 'text-white'}`}>
            {results.temperature.toFixed(1)}°C
          </p>
        </div>
      </div>

      {results.warnings.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-yellow-400 text-sm font-medium mb-2">
            {lang === 'tr' ? 'Uyarılar:' : 'Warnings:'}
          </p>
          <ul className="space-y-1">
            {results.warnings.map((warning, idx) => (
              <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassCard>
  );
};

// Quote CTA Component
const QuoteCTA = ({ lang, results, specifications }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    // Navigate to quote page with pre-filled cable specs
    navigate(`/${lang}/instant-quote`, {
      state: {
        fromCalculator: 'cable',
        specifications: {
          cableSize: results.recommendedSize,
          ...specifications
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <GlassCard gradient="amber" className="p-6 mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'tr'
                  ? 'Bu özelliklerde üretim yaptırmak ister misiniz?'
                  : 'Want to manufacture with these specifications?'}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === 'tr'
                  ? `Önerilen kesit: ${results.recommendedSize} mm² - Profesyonel kablo çözümleri için teklif alın`
                  : `Recommended size: ${results.recommendedSize} mm² - Get a quote for professional cable solutions`}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleGetQuote}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 shadow-lg"
            >
              <Package className="mr-2 h-4 w-4" />
              {lang === 'tr' ? 'Teklif Al' : 'Get Quote'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{results.recommendedSize}</p>
            <p className="text-xs text-gray-400">{lang === 'tr' ? 'mm² Kesit' : 'mm² Size'}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{results.voltageDropPercent.toFixed(1)}%</p>
            <p className="text-xs text-gray-400">{lang === 'tr' ? 'V. Düşümü' : 'V. Drop'}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {results.status === 'safe' ? '✓' : results.status === 'warning' ? '!' : '✗'}
            </p>
            <p className="text-xs text-gray-400">{lang === 'tr' ? 'Durum' : 'Status'}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// Main Calculator Component
const VisualCableCalculator = ({ lang = 'tr' }) => {
  const [current, setCurrent] = useState(10); // Amperes
  const [distance, setDistance] = useState(10); // Meters (one-way)
  const [voltage, setVoltage] = useState(12); // Volts
  const [material, setMaterial] = useState('copper');
  const [maxVoltageDrop, setMaxVoltageDrop] = useState(3); // Percentage
  const [ambientTemp, setAmbientTemp] = useState(25); // °C
  const [selectedSize, setSelectedSize] = useState(2.5); // mm²

  // Calculate results
  const results = useMemo(() => {
    const mat = MATERIALS[material];
    const totalDistance = distance * 2; // Round trip

    // Calculate resistance
    const resistance = (mat.resistivity * totalDistance) / selectedSize;

    // Voltage drop
    const voltageDrop = current * resistance;
    const voltageDropPercent = (voltageDrop / voltage) * 100;

    // Power loss
    const powerLoss = current * current * resistance;

    // Temperature rise (simplified model)
    const tempRise = (powerLoss / (selectedSize * 0.5)) * 2; // Simplified
    const temperature = ambientTemp + tempRise;

    // Find recommended size
    let recommendedSize = CABLE_SIZES[0];
    for (const size of CABLE_SIZES) {
      const sizeResistance = (mat.resistivity * totalDistance) / size;
      const sizeVoltageDrop = current * sizeResistance;
      const sizeVoltageDropPercent = (sizeVoltageDrop / voltage) * 100;

      if (sizeVoltageDropPercent <= maxVoltageDrop) {
        recommendedSize = size;
        break;
      }
    }

    // Determine status
    let status = 'safe';
    const warnings = [];

    if (voltageDropPercent > maxVoltageDrop) {
      status = 'danger';
      warnings.push(lang === 'tr'
        ? `Voltaj düşümü çok yüksek (${voltageDropPercent.toFixed(1)}% > ${maxVoltageDrop}%)`
        : `Voltage drop too high (${voltageDropPercent.toFixed(1)}% > ${maxVoltageDrop}%)`
      );
    }

    if (temperature > mat.maxTemp) {
      status = 'danger';
      warnings.push(lang === 'tr'
        ? `Kablo sıcaklığı izin verilen maksimumu aşıyor (${temperature.toFixed(1)}°C > ${mat.maxTemp}°C)`
        : `Cable temperature exceeds maximum allowed (${temperature.toFixed(1)}°C > ${mat.maxTemp}°C)`
      );
    } else if (temperature > mat.maxTemp * 0.8) {
      if (status !== 'danger') status = 'warning';
      warnings.push(lang === 'tr'
        ? 'Kablo sıcaklığı güvenli limitlere yaklaşıyor'
        : 'Cable temperature approaching safe limits'
      );
    }

    if (selectedSize < recommendedSize) {
      if (status !== 'danger') status = 'warning';
      warnings.push(lang === 'tr'
        ? `Daha büyük kesit önerilir (${recommendedSize} mm²)`
        : `Larger cross-section recommended (${recommendedSize} mm²)`
      );
    }

    // Calculate max current for selected size (simplified ampacity)
    const maxCurrent = Math.sqrt((mat.maxTemp - ambientTemp) * selectedSize * 0.5 / (mat.resistivity * totalDistance)) || 100;

    return {
      resistance,
      voltageDrop,
      voltageDropPercent,
      powerLoss,
      temperature,
      recommendedSize,
      status,
      warnings,
      maxCurrent,
    };
  }, [current, distance, voltage, material, maxVoltageDrop, ambientTemp, selectedSize, lang]);

  const handleReset = () => {
    setCurrent(10);
    setDistance(10);
    setVoltage(12);
    setMaterial('copper');
    setMaxVoltageDrop(3);
    setAmbientTemp(25);
    setSelectedSize(2.5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {lang === 'tr' ? 'Görsel Kablo Hesaplayıcı' : 'Visual Cable Calculator'}
          </h1>
          <p className="text-gray-400">
            {lang === 'tr'
              ? 'Gerçek zamanlı simülasyon ile doğru kablo kesiti seçin'
              : 'Select the right cable size with real-time simulation'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard gradient="blue" className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                {lang === 'tr' ? 'Parametreler' : 'Parameters'}
              </h2>

              {/* Current */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-gray-400 text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {lang === 'tr' ? 'Akım' : 'Current'}
                  </label>
                  <span className="text-white font-mono">{current} A</span>
                </div>
                <Slider
                  value={[current]}
                  onValueChange={([val]) => setCurrent(val)}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Distance */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-gray-400 text-sm flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    {lang === 'tr' ? 'Mesafe (tek yön)' : 'Distance (one-way)'}
                  </label>
                  <span className="text-white font-mono">{distance} m</span>
                </div>
                <Slider
                  value={[distance]}
                  onValueChange={([val]) => setDistance(val)}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Voltage */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-gray-400 text-sm">
                    {lang === 'tr' ? 'Gerilim' : 'Voltage'}
                  </label>
                  <span className="text-white font-mono">{voltage} V</span>
                </div>
                <Slider
                  value={[voltage]}
                  onValueChange={([val]) => setVoltage(val)}
                  min={5}
                  max={400}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Cable Size */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm block mb-2">
                  {lang === 'tr' ? 'Kablo Kesiti' : 'Cable Size'}
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(parseFloat(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                >
                  {CABLE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size} mm²
                    </option>
                  ))}
                </select>
              </div>

              {/* Material */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm block mb-2">
                  {lang === 'tr' ? 'Malzeme' : 'Material'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(MATERIALS).map(([key, mat]) => (
                    <button
                      key={key}
                      onClick={() => setMaterial(key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        material === key
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {lang === 'tr' ? mat.name : mat.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Voltage Drop */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-gray-400 text-sm">
                    {lang === 'tr' ? 'Max Voltaj Düşümü' : 'Max Voltage Drop'}
                  </label>
                  <span className="text-white font-mono">{maxVoltageDrop}%</span>
                </div>
                <Slider
                  value={[maxVoltageDrop]}
                  onValueChange={([val]) => setMaxVoltageDrop(val)}
                  min={1}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={handleReset}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {lang === 'tr' ? 'Sıfırla' : 'Reset'}
              </Button>
            </GlassCard>
          </div>

          {/* Visualization & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Cable */}
            <GlassCard gradient="purple" className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {lang === 'tr' ? 'Kablo Simülasyonu' : 'Cable Simulation'}
              </h2>
              <VisualCable
                crossSection={selectedSize}
                current={current}
                maxCurrent={results.maxCurrent}
                temperature={results.temperature}
                material={material}
              />
            </GlassCard>

            {/* Results */}
            <ResultsPanel results={results} lang={lang} />

            {/* Quote CTA */}
            <QuoteCTA
              lang={lang}
              results={results}
              specifications={{
                current,
                distance,
                voltage,
                material,
                selectedSize
              }}
            />

            {/* Quick Reference */}
            <GlassCard gradient="cyan" className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {lang === 'tr' ? 'Hızlı Referans Tablosu' : 'Quick Reference Table'}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="text-left py-2">mm²</th>
                      <th className="text-right py-2">{lang === 'tr' ? 'Direnç (Ω/m)' : 'Resistance (Ω/m)'}</th>
                      <th className="text-right py-2">{lang === 'tr' ? 'V Düşümü' : 'V Drop'}</th>
                      <th className="text-right py-2">{lang === 'tr' ? 'Durum' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CABLE_SIZES.slice(0, 8).map((size) => {
                      const resistance = (MATERIALS[material].resistivity * distance * 2) / size;
                      const vDrop = (current * resistance / voltage) * 100;
                      const isRecommended = size === results.recommendedSize;
                      const isCurrent = size === selectedSize;

                      return (
                        <tr
                          key={size}
                          className={`border-b border-gray-800 ${isCurrent ? 'bg-blue-500/20' : ''}`}
                        >
                          <td className={`py-2 ${isRecommended ? 'text-green-400 font-bold' : 'text-white'}`}>
                            {size} {isRecommended && '✓'}
                          </td>
                          <td className="text-right text-gray-400">{(resistance / (distance * 2)).toFixed(4)}</td>
                          <td className={`text-right ${vDrop > maxVoltageDrop ? 'text-red-400' : 'text-gray-400'}`}>
                            {vDrop.toFixed(1)}%
                          </td>
                          <td className="text-right">
                            {vDrop <= maxVoltageDrop ? (
                              <CheckCircle className="w-4 h-4 text-green-400 inline" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-red-400 inline" />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* Export Actions */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                <Download className="w-4 h-4 mr-2" />
                {lang === 'tr' ? 'PDF İndir' : 'Download PDF'}
              </Button>
              <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800">
                <Share2 className="w-4 h-4 mr-2" />
                {lang === 'tr' ? 'Paylaş' : 'Share'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualCableCalculator;
