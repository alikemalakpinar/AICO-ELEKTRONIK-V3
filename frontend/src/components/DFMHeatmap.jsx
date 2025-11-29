import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Layers,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
} from 'lucide-react';
import GlassCard from './GlassCard';
import { Button } from './ui/button';

// DFM Issue Types with severity levels
const ISSUE_TYPES = {
  trace_spacing: {
    severity: 'error',
    color: '#ef4444',
    label: { tr: 'Hat Aralığı', en: 'Trace Spacing' },
    description: { tr: 'Hatlar arası mesafe çok az', en: 'Trace spacing too small' },
  },
  drill_size: {
    severity: 'error',
    color: '#f97316',
    label: { tr: 'Delik Boyutu', en: 'Drill Size' },
    description: { tr: 'Delik çapı minimum limitin altında', en: 'Drill diameter below minimum' },
  },
  annular_ring: {
    severity: 'warning',
    color: '#eab308',
    label: { tr: 'Annular Ring', en: 'Annular Ring' },
    description: { tr: 'Via halka genişliği yetersiz', en: 'Via ring width insufficient' },
  },
  silkscreen_overlap: {
    severity: 'warning',
    color: '#a855f7',
    label: { tr: 'Silk Çakışma', en: 'Silk Overlap' },
    description: { tr: 'Silkscreen padin üzerinde', en: 'Silkscreen overlaps pad' },
  },
  copper_fill: {
    severity: 'info',
    color: '#3b82f6',
    label: { tr: 'Bakır Dolgu', en: 'Copper Fill' },
    description: { tr: 'Bakır dolgu optimizasyonu önerilir', en: 'Copper fill optimization suggested' },
  },
  solder_mask: {
    severity: 'warning',
    color: '#14b8a6',
    label: { tr: 'Lehim Maskesi', en: 'Solder Mask' },
    description: { tr: 'Lehim maskesi açıklığı dar', en: 'Solder mask opening too narrow' },
  },
};

// Mock DFM issues for demo
const generateMockIssues = () => {
  const issues = [];
  const issueTypes = Object.keys(ISSUE_TYPES);

  // Generate random issues across the board
  for (let i = 0; i < 12; i++) {
    const type = issueTypes[Math.floor(Math.random() * issueTypes.length)];
    issues.push({
      id: i + 1,
      type,
      x: 50 + Math.random() * 300,
      y: 50 + Math.random() * 200,
      radius: 15 + Math.random() * 10,
      details: {
        value: (0.05 + Math.random() * 0.1).toFixed(3),
        limit: '0.150',
        layer: ['Top', 'Bottom', 'Inner1'][Math.floor(Math.random() * 3)],
      },
    });
  }

  return issues;
};

// Issue Marker Component
const IssueMarker = ({ issue, isSelected, onClick, showLabel, lang }) => {
  const issueConfig = ISSUE_TYPES[issue.type];

  return (
    <motion.g
      onClick={() => onClick(issue)}
      style={{ cursor: 'pointer' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: issue.id * 0.05 }}
    >
      {/* Heatmap glow */}
      <defs>
        <radialGradient id={`heatGradient-${issue.id}`}>
          <stop offset="0%" stopColor={issueConfig.color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={issueConfig.color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={issueConfig.color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Heatmap circle */}
      <motion.circle
        cx={issue.x}
        cy={issue.y}
        r={issue.radius * 2}
        fill={`url(#heatGradient-${issue.id})`}
        animate={isSelected ? { r: issue.radius * 2.5 } : { r: issue.radius * 2 }}
      />

      {/* Issue marker */}
      <motion.circle
        cx={issue.x}
        cy={issue.y}
        r={8}
        fill={issueConfig.color}
        stroke="white"
        strokeWidth={2}
        animate={isSelected ? { scale: 1.3 } : { scale: 1 }}
      />

      {/* Pulsing animation for errors */}
      {issueConfig.severity === 'error' && (
        <motion.circle
          cx={issue.x}
          cy={issue.y}
          r={8}
          fill="none"
          stroke={issueConfig.color}
          strokeWidth={2}
          animate={{
            r: [8, 20, 8],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Label */}
      {showLabel && (
        <g transform={`translate(${issue.x + 12}, ${issue.y - 5})`}>
          <rect
            x={0}
            y={-10}
            width={80}
            height={20}
            rx={4}
            fill="rgba(0,0,0,0.8)"
          />
          <text x={5} y={5} fontSize={10} fill="white">
            {issueConfig.label[lang]}
          </text>
        </g>
      )}
    </motion.g>
  );
};

// Issue Details Panel
const IssueDetailsPanel = ({ issue, onClose, lang }) => {
  if (!issue) return null;

  const issueConfig = ISSUE_TYPES[issue.type];
  const severity = issueConfig.severity;

  const SeverityIcon = severity === 'error' ? AlertCircle : severity === 'warning' ? AlertTriangle : Info;
  const severityColor = severity === 'error' ? 'text-red-400' : severity === 'warning' ? 'text-yellow-400' : 'text-blue-400';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute right-4 top-4 w-64 bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SeverityIcon className={`w-5 h-5 ${severityColor}`} />
            <span className="font-semibold text-white">{issueConfig.label[lang]}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4">{issueConfig.description[lang]}</p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{lang === 'tr' ? 'Değer' : 'Value'}</span>
            <span className="text-red-400 font-mono">{issue.details.value} mm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{lang === 'tr' ? 'Limit' : 'Limit'}</span>
            <span className="text-green-400 font-mono">{issue.details.limit} mm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{lang === 'tr' ? 'Katman' : 'Layer'}</span>
            <span className="text-white">{issue.details.layer}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            {lang === 'tr'
              ? 'Tıklayarak konumu görüntüleyin. Çift tıklayarak yakınlaştırın.'
              : 'Click to view location. Double-click to zoom.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Legend Component
const Legend = ({ issues, lang }) => {
  const issueCounts = useMemo(() => {
    const counts = {};
    issues.forEach((issue) => {
      const type = issue.type;
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [issues]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
      <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
        {lang === 'tr' ? 'Sorun Türleri' : 'Issue Types'}
      </h4>
      <div className="space-y-1">
        {Object.entries(ISSUE_TYPES).map(([type, config]) => {
          const count = issueCounts[type] || 0;
          if (count === 0) return null;

          return (
            <div key={type} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-gray-300">{config.label[lang]}</span>
              </div>
              <span className="text-gray-500">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main DFM Heatmap Component
const DFMHeatmap = ({ gerberData = null, lang = 'tr' }) => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showLabels, setShowLabels] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState({
    traces: true,
    errors: true,
    warnings: true,
    info: true,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const svgRef = useRef(null);

  // Simulate DFM analysis
  useEffect(() => {
    runAnalysis();
  }, [gerberData]);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setSelectedIssue(null);

    setTimeout(() => {
      setIssues(generateMockIssues());
      setIsAnalyzing(false);
    }, 1500);
  };

  // Filter visible issues
  const visibleIssues = useMemo(() => {
    return issues.filter((issue) => {
      const severity = ISSUE_TYPES[issue.type].severity;
      if (severity === 'error' && !visibleLayers.errors) return false;
      if (severity === 'warning' && !visibleLayers.warnings) return false;
      if (severity === 'info' && !visibleLayers.info) return false;
      return true;
    });
  }, [issues, visibleLayers]);

  // Calculate DFM score
  const dfmScore = useMemo(() => {
    if (issues.length === 0) return 100;

    let score = 100;
    issues.forEach((issue) => {
      const severity = ISSUE_TYPES[issue.type].severity;
      if (severity === 'error') score -= 10;
      else if (severity === 'warning') score -= 3;
      else score -= 1;
    });

    return Math.max(0, score);
  }, [issues]);

  const getScoreGrade = (score) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-400' };
    if (score >= 80) return { grade: 'A', color: 'text-green-400' };
    if (score >= 70) return { grade: 'B', color: 'text-yellow-400' };
    if (score >= 60) return { grade: 'C', color: 'text-orange-400' };
    return { grade: 'D', color: 'text-red-400' };
  };

  const scoreInfo = getScoreGrade(dfmScore);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Visualization */}
        <div className="lg:col-span-3">
          <GlassCard gradient="blue" className="p-4 relative overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-gray-500 text-sm mx-2">{Math.round(zoom * 100)}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${showLabels ? 'text-blue-400' : 'text-gray-400'} hover:text-white`}
                  onClick={() => setShowLabels(!showLabels)}
                >
                  {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                >
                  <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            {/* SVG Canvas */}
            <div className="relative bg-gray-950 rounded-xl overflow-hidden" style={{ height: '450px' }}>
              {isAnalyzing ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">
                      {lang === 'tr' ? 'DFM analizi yapılıyor...' : 'Running DFM analysis...'}
                    </p>
                  </div>
                </div>
              ) : (
                <svg
                  ref={svgRef}
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {/* PCB Background */}
                  <rect x="20" y="20" width="360" height="260" rx="8" fill="#15803d" />

                  {/* Grid Pattern */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#166534" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect x="20" y="20" width="360" height="260" fill="url(#grid)" opacity="0.5" />

                  {/* Mock Circuit Traces */}
                  {visibleLayers.traces && (
                    <g opacity="0.8">
                      <path d="M40 60 H150 L170 80 H280 L300 60 H360" stroke="#c4b52a" strokeWidth="2" fill="none" />
                      <path d="M40 100 H100 L120 120 H200 L220 100 H360" stroke="#c4b52a" strokeWidth="2" fill="none" />
                      <path d="M40 140 H80 L100 160 H180 L200 140 H360" stroke="#c4b52a" strokeWidth="2" fill="none" />
                      <path d="M40 180 H120 L140 200 H240 L260 180 H360" stroke="#c4b52a" strokeWidth="2" fill="none" />
                      <path d="M40 220 H180 L200 240 H280 L300 220 H360" stroke="#c4b52a" strokeWidth="2" fill="none" />
                      <path d="M80 40 V100 L100 120 V200 L120 220 V260" stroke="#c4b52a" strokeWidth="2" fill="none" />
                      <path d="M160 40 V80 L180 100 V160 L200 180 V260" stroke="#c4b52a" strokeWidth="2" fill="none" />
                      <path d="M240 40 V120 L260 140 V200 L280 220 V260" stroke="#c4b52a" strokeWidth="2" fill="none" />
                      <path d="M320 40 V100 L340 120 V180 L320 200 V260" stroke="#c4b52a" strokeWidth="2" fill="none" />
                    </g>
                  )}

                  {/* Issue Markers */}
                  {visibleIssues.map((issue) => (
                    <IssueMarker
                      key={issue.id}
                      issue={issue}
                      isSelected={selectedIssue?.id === issue.id}
                      onClick={setSelectedIssue}
                      showLabel={showLabels}
                      lang={lang}
                    />
                  ))}
                </svg>
              )}

              {/* Issue Details Panel */}
              <AnimatePresence>
                {selectedIssue && (
                  <IssueDetailsPanel
                    issue={selectedIssue}
                    onClose={() => setSelectedIssue(null)}
                    lang={lang}
                  />
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* DFM Score */}
          <GlassCard gradient={dfmScore >= 70 ? 'green' : dfmScore >= 50 ? 'orange' : 'rose'} className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              {lang === 'tr' ? 'DFM Skoru' : 'DFM Score'}
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-5xl font-bold text-white">{dfmScore}</div>
              <div className={`text-3xl font-bold ${scoreInfo.color}`}>{scoreInfo.grade}</div>
            </div>
            <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${dfmScore >= 70 ? 'bg-green-500' : dfmScore >= 50 ? 'bg-orange-500' : 'bg-red-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${dfmScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </GlassCard>

          {/* Issue Summary */}
          <GlassCard gradient="purple" className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              {lang === 'tr' ? 'Sorun Özeti' : 'Issue Summary'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">{lang === 'tr' ? 'Hatalar' : 'Errors'}</span>
                </div>
                <span className="text-red-400 font-bold">
                  {issues.filter((i) => ISSUE_TYPES[i.type].severity === 'error').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">{lang === 'tr' ? 'Uyarılar' : 'Warnings'}</span>
                </div>
                <span className="text-yellow-400 font-bold">
                  {issues.filter((i) => ISSUE_TYPES[i.type].severity === 'warning').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">{lang === 'tr' ? 'Bilgi' : 'Info'}</span>
                </div>
                <span className="text-blue-400 font-bold">
                  {issues.filter((i) => ISSUE_TYPES[i.type].severity === 'info').length}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Layer Visibility */}
          <GlassCard gradient="cyan" className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
              {lang === 'tr' ? 'Görünürlük' : 'Visibility'}
            </h3>
            <div className="space-y-2">
              {Object.entries(visibleLayers).map(([layer, visible]) => (
                <button
                  key={layer}
                  onClick={() => setVisibleLayers((v) => ({ ...v, [layer]: !v[layer] }))}
                  className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                    visible ? 'bg-white/10' : 'bg-transparent'
                  }`}
                >
                  <span className="text-gray-300 capitalize text-sm">{layer}</span>
                  {visible ? (
                    <Eye className="w-4 h-4 text-blue-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Legend */}
          <Legend issues={issues} lang={lang} />

          {/* Export Button */}
          <Button className="w-full bg-blue-500 hover:bg-blue-600">
            <Download className="w-4 h-4 mr-2" />
            {lang === 'tr' ? 'Rapor İndir' : 'Download Report'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DFMHeatmap;
