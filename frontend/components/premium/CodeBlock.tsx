'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check, Code2, Terminal } from 'lucide-react';
import { useAudio } from './AudioProvider';

/**
 * CodeBlock - Premium Syntax Highlighted Code Display
 *
 * Features:
 * - Beautiful syntax highlighting with prism-react-renderer
 * - Copy to clipboard functionality
 * - Multiple language support (C++, Python, TypeScript, etc.)
 * - Hover-activated copy button
 * - Line numbers option
 * - Dark theme optimized for engineering aesthetics
 */

interface CodeBlockProps {
  code: string;
  language: 'cpp' | 'python' | 'typescript' | 'javascript' | 'rust' | 'go' | 'bash';
  title?: string;
  description?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

// Custom dark theme optimized for AICO brand
const aicoTheme = {
  ...themes.nightOwl,
  plain: {
    color: '#E2E8F0',
    backgroundColor: '#0A0A0A',
  },
  styles: [
    ...themes.nightOwl.styles,
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#637777', fontStyle: 'italic' as const },
    },
    {
      types: ['keyword', 'operator'],
      style: { color: '#F97316' },
    },
    {
      types: ['function', 'method'],
      style: { color: '#82AAFF' },
    },
    {
      types: ['string', 'char'],
      style: { color: '#ADDB67' },
    },
    {
      types: ['number', 'boolean'],
      style: { color: '#F78C6C' },
    },
    {
      types: ['class-name', 'type'],
      style: { color: '#FFCB6B' },
    },
    {
      types: ['variable', 'constant'],
      style: { color: '#E2E8F0' },
    },
  ],
};

// Language icons and labels
const languageConfig: Record<string, { icon: React.ReactNode; label: string }> = {
  cpp: { icon: <Code2 size={14} />, label: 'C++' },
  python: { icon: <Terminal size={14} />, label: 'Python' },
  typescript: { icon: <Code2 size={14} />, label: 'TypeScript' },
  javascript: { icon: <Code2 size={14} />, label: 'JavaScript' },
  rust: { icon: <Code2 size={14} />, label: 'Rust' },
  go: { icon: <Code2 size={14} />, label: 'Go' },
  bash: { icon: <Terminal size={14} />, label: 'Bash' },
};

export default function CodeBlock({
  code,
  language,
  title,
  description,
  showLineNumbers = true,
  highlightLines = [],
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { playClick, playSuccess } = useAudio();

  const handleCopy = async () => {
    playClick();
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      playSuccess();
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const langConfig = languageConfig[language] || { icon: <Code2 size={14} />, label: language };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden border border-white/10 bg-onyx-900/50 backdrop-blur-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-onyx-800/50 border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Traffic lights decoration */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>

          {/* Title or Language */}
          <div className="flex items-center gap-2 text-offwhite-600">
            {langConfig.icon}
            <span className="text-xs font-mono">{title || langConfig.label}</span>
          </div>
        </div>

        {/* Copy Button */}
        <AnimatePresence mode="wait">
          <motion.button
            key={isCopied ? 'copied' : 'copy'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered || isCopied ? 1 : 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                      transition-colors ${
                        isCopied
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/5 hover:bg-white/10 text-offwhite-600 hover:text-offwhite-400'
                      }`}
          >
            {isCopied ? (
              <>
                <Check size={12} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Description */}
      {description && (
        <div className="px-4 py-2 bg-onyx-800/30 border-b border-white/5">
          <p className="text-xs text-offwhite-700">{description}</p>
        </div>
      )}

      {/* Code Content */}
      <Highlight theme={aicoTheme} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4 text-sm leading-relaxed`}
            style={{ ...style, margin: 0, background: 'transparent' }}
          >
            <code>
              {tokens.map((line, lineIndex) => {
                const lineNumber = lineIndex + 1;
                const isHighlighted = highlightLines.includes(lineNumber);

                return (
                  <div
                    key={lineIndex}
                    {...getLineProps({ line })}
                    className={`table-row ${
                      isHighlighted ? 'bg-engineer-500/10' : ''
                    }`}
                  >
                    {showLineNumbers && (
                      <span
                        className={`table-cell pr-4 text-right select-none ${
                          isHighlighted ? 'text-engineer-500' : 'text-offwhite-800'
                        }`}
                        style={{ minWidth: '2.5rem' }}
                      >
                        {lineNumber}
                      </span>
                    )}
                    <span className="table-cell">
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </motion.div>
  );
}

// Pre-defined code examples for AICO projects
export const codeExamples = {
  smartVillaController: {
    language: 'cpp' as const,
    title: 'smart_villa_controller.cpp',
    description: 'Predictive climate control algorithm using sensor fusion',
    code: `// AICO Smart Villa - Predictive Climate Controller
// Uses Kalman filtering for temperature prediction

#include <vector>
#include <cmath>

class PredictiveClimateController {
private:
    double currentTemp;
    double targetTemp;
    double kalmanGain;
    std::vector<double> sensorReadings;

public:
    PredictiveClimateController(double target = 22.0)
        : targetTemp(target), kalmanGain(0.1) {}

    // Kalman filter for noise reduction
    double filterReading(double measurement) {
        double prediction = currentTemp;
        double innovation = measurement - prediction;
        currentTemp = prediction + kalmanGain * innovation;
        return currentTemp;
    }

    // Predictive control output
    double calculateOutput() {
        double error = targetTemp - currentTemp;
        double derivative = getTemperatureDerivative();

        // PID-like control with predictive component
        double output = 0.8 * error + 0.2 * derivative;
        return std::clamp(output, -1.0, 1.0);
    }

    double getTemperatureDerivative() {
        if (sensorReadings.size() < 2) return 0.0;
        return sensorReadings.back() - sensorReadings[sensorReadings.size() - 2];
    }
};`,
  },

  energyOptimizer: {
    language: 'python' as const,
    title: 'energy_optimizer.py',
    description: 'Machine learning based energy consumption optimization',
    code: `# AICO Energy Optimizer - Consumption Prediction
# Neural network for optimal energy scheduling

import numpy as np
from typing import List, Tuple

class EnergyPredictor:
    """Predictive energy management system."""

    def __init__(self, learning_rate: float = 0.01):
        self.weights = np.random.randn(24, 1) * 0.1
        self.bias = 0.0
        self.lr = learning_rate
        self.history: List[float] = []

    def predict_hourly_consumption(
        self, hour: int,
        temperature: float,
        occupancy: bool
    ) -> float:
        """Predict energy consumption for given conditions."""
        features = self._extract_features(hour, temperature, occupancy)
        prediction = np.dot(features, self.weights) + self.bias
        return max(0, float(prediction[0]))

    def _extract_features(
        self, hour: int, temp: float, occupied: bool
    ) -> np.ndarray:
        """Create feature vector from inputs."""
        features = np.zeros(24)
        features[hour] = 1.0  # One-hot hour encoding
        features = np.append(features, [temp / 40.0, float(occupied)])
        return features.reshape(1, -1)

    def optimize_schedule(self) -> List[Tuple[int, float]]:
        """Generate optimal energy usage schedule."""
        schedule = []
        for hour in range(24):
            consumption = self.predict_hourly_consumption(hour, 22.0, True)
            schedule.append((hour, consumption))
        return sorted(schedule, key=lambda x: x[1])`,
  },

  sensorFusion: {
    language: 'typescript' as const,
    title: 'sensor_fusion.ts',
    description: 'Real-time sensor data aggregation and analysis',
    code: `// AICO Sensor Fusion Engine
// Aggregates and analyzes multi-sensor data

interface SensorReading {
  sensorId: string;
  type: 'temperature' | 'humidity' | 'motion' | 'light';
  value: number;
  timestamp: number;
  confidence: number;
}

interface FusedState {
  temperature: number;
  humidity: number;
  occupancy: boolean;
  lightLevel: number;
  lastUpdated: number;
}

class SensorFusionEngine {
  private state: FusedState;
  private weights: Map<string, number>;

  constructor() {
    this.state = this.initializeState();
    this.weights = new Map();
  }

  processReading(reading: SensorReading): FusedState {
    const weight = this.calculateWeight(reading);
    this.weights.set(reading.sensorId, weight);

    switch (reading.type) {
      case 'temperature':
        this.state.temperature = this.weightedAverage(
          this.state.temperature,
          reading.value,
          weight
        );
        break;
      case 'humidity':
        this.state.humidity = this.weightedAverage(
          this.state.humidity,
          reading.value,
          weight
        );
        break;
      case 'motion':
        this.state.occupancy = reading.value > 0.5;
        break;
    }

    this.state.lastUpdated = Date.now();
    return { ...this.state };
  }

  private weightedAverage(
    current: number,
    newVal: number,
    weight: number
  ): number {
    return current * (1 - weight) + newVal * weight;
  }
}`,
  },
};
