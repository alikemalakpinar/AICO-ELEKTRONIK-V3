// ===========================================
// Industrial Air Quality - Factory IAQ Parser
// CO2, TVOC, PM2.5 Monitoring System
// ===========================================

/**
 * Industrial Air Quality Thresholds (Factory Standards)
 *
 * CO2 (Carbon Dioxide) - ppm:
 *   - Normal: 400-1000 ppm
 *   - Warning: 1000-1500 ppm
 *   - Critical: >1500 ppm (Ventilation Required)
 *   - Danger: >2500 ppm (Evacuate)
 *
 * TVOC (Total Volatile Organic Compounds) - ppb:
 *   - Normal: 0-250 ppb
 *   - Warning: 250-500 ppb
 *   - Critical: >500 ppb (Toxic Air)
 *
 * PM2.5 (Particulate Matter) - µg/m³:
 *   - Normal: 0-35 µg/m³
 *   - Warning: 35-75 µg/m³
 *   - Critical: >75 µg/m³ (Respirator Required)
 */

export interface IndustrialSensor {
  id: number;
  name: string;
  zone: string;
  co2: number;        // ppm
  tvoc: number;       // ppb
  pm25: number;       // µg/m³
  temperature: number;
  humidity: number;
  status: 'safe' | 'ventilation' | 'evacuate';
  alerts: string[];
}

export interface IndustrialAirQualityPacket {
  isValid: boolean;
  deviceId: string;
  timestamp: Date;
  sensors: IndustrialSensor[];
  overallStatus: 'safe' | 'ventilation' | 'evacuate';
  alertCount: number;
  avgCo2: number;
  avgTvoc: number;
  avgPm25: number;
  ambientTemperature: number;
  ambientHumidity: number;
}

// Factory zone names
const FACTORY_ZONES = {
  tr: [
    'Uretim Hatti A',
    'Uretim Hatti B',
    'Boya Bolumu',
    'Kaynak Alani',
    'Kimyasal Depo',
    'Montaj Alani',
    'Kalite Kontrol',
    'Paketleme',
  ],
  en: [
    'Production Line A',
    'Production Line B',
    'Paint Section',
    'Welding Area',
    'Chemical Storage',
    'Assembly Area',
    'Quality Control',
    'Packaging',
  ],
};

/**
 * Get sensor status based on readings
 */
export function getSensorStatus(sensor: IndustrialSensor): 'safe' | 'ventilation' | 'evacuate' {
  // Evacuation thresholds
  if (sensor.co2 > 2500 || sensor.tvoc > 750 || sensor.pm25 > 150) {
    return 'evacuate';
  }
  // Ventilation required thresholds
  if (sensor.co2 > 1500 || sensor.tvoc > 500 || sensor.pm25 > 75) {
    return 'ventilation';
  }
  return 'safe';
}

/**
 * Get alerts for sensor
 */
export function getSensorAlerts(sensor: IndustrialSensor, lang: 'tr' | 'en'): string[] {
  const alerts: string[] = [];

  if (sensor.co2 > 2500) {
    alerts.push(lang === 'tr' ? 'CO2 TEHLİKELİ SEVİYE' : 'CO2 DANGEROUS LEVEL');
  } else if (sensor.co2 > 1500) {
    alerts.push(lang === 'tr' ? 'CO2 Yuksek' : 'CO2 High');
  }

  if (sensor.tvoc > 750) {
    alerts.push(lang === 'tr' ? 'TVOC TEHLİKELİ' : 'TVOC DANGEROUS');
  } else if (sensor.tvoc > 500) {
    alerts.push(lang === 'tr' ? 'TVOC Yuksek' : 'TVOC High');
  }

  if (sensor.pm25 > 150) {
    alerts.push(lang === 'tr' ? 'PM2.5 TEHLİKELİ' : 'PM2.5 DANGEROUS');
  } else if (sensor.pm25 > 75) {
    alerts.push(lang === 'tr' ? 'PM2.5 Yuksek - Maske' : 'PM2.5 High - Wear Mask');
  }

  return alerts;
}

/**
 * Get color based on air quality level
 */
export function getAirQualityColor(value: number, type: 'co2' | 'tvoc' | 'pm25'): string {
  const thresholds = {
    co2: { warning: 1000, critical: 1500, danger: 2500 },
    tvoc: { warning: 250, critical: 500, danger: 750 },
    pm25: { warning: 35, critical: 75, danger: 150 },
  };

  const t = thresholds[type];

  if (value > t.danger) return '#EF4444'; // Red - Danger
  if (value > t.critical) return '#F97316'; // Orange - Critical
  if (value > t.warning) return '#F59E0B'; // Amber - Warning
  return '#22C55E'; // Green - Safe
}

/**
 * Get status color
 */
export function getStatusColor(status: 'safe' | 'ventilation' | 'evacuate'): string {
  switch (status) {
    case 'evacuate': return '#EF4444';
    case 'ventilation': return '#F59E0B';
    default: return '#22C55E';
  }
}

/**
 * Get status label
 */
export function getStatusLabel(status: 'safe' | 'ventilation' | 'evacuate', lang: 'tr' | 'en'): string {
  const labels = {
    tr: {
      safe: 'GUVENLI',
      ventilation: 'HAVALANDIRMA GEREKLI',
      evacuate: 'TAHLIYE',
    },
    en: {
      safe: 'SAFE',
      ventilation: 'VENTILATION REQUIRED',
      evacuate: 'EVACUATE',
    },
  };
  return labels[lang][status];
}

/**
 * Generate simulated industrial air quality data
 */
export function generateIndustrialPacket(
  scenario: 'normal' | 'warning' | 'critical',
  lang: 'tr' | 'en' = 'en'
): IndustrialAirQualityPacket {
  const zones = FACTORY_ZONES[lang];
  const sensors: IndustrialSensor[] = [];

  // Base values for different scenarios
  const baseValues = {
    normal: { co2: 500, tvoc: 100, pm25: 20 },
    warning: { co2: 1200, tvoc: 350, pm25: 55 },
    critical: { co2: 2000, tvoc: 650, pm25: 100 },
  };

  const base = baseValues[scenario];

  for (let i = 0; i < 8; i++) {
    // Add variation per sensor
    const variation = {
      co2: (Math.random() - 0.5) * 400,
      tvoc: (Math.random() - 0.5) * 150,
      pm25: (Math.random() - 0.5) * 30,
    };

    // Some zones naturally have higher levels
    const zoneMultiplier = [1, 1, 1.3, 1.4, 1.5, 1, 0.8, 0.9][i]; // Paint, Welding, Chemical have higher

    const co2 = Math.max(400, Math.round((base.co2 + variation.co2) * zoneMultiplier));
    const tvoc = Math.max(0, Math.round((base.tvoc + variation.tvoc) * zoneMultiplier));
    const pm25 = Math.max(0, Math.round((base.pm25 + variation.pm25) * zoneMultiplier));

    const sensor: IndustrialSensor = {
      id: i + 1,
      name: `IAQ-${String(i + 1).padStart(2, '0')}`,
      zone: zones[i],
      co2,
      tvoc,
      pm25,
      temperature: 22 + Math.random() * 8,
      humidity: 40 + Math.random() * 20,
      status: 'safe',
      alerts: [],
    };

    sensor.status = getSensorStatus(sensor);
    sensor.alerts = getSensorAlerts(sensor, lang);
    sensors.push(sensor);
  }

  // Calculate averages
  const avgCo2 = Math.round(sensors.reduce((sum, s) => sum + s.co2, 0) / sensors.length);
  const avgTvoc = Math.round(sensors.reduce((sum, s) => sum + s.tvoc, 0) / sensors.length);
  const avgPm25 = Math.round(sensors.reduce((sum, s) => sum + s.pm25, 0) / sensors.length);

  // Determine overall status
  let overallStatus: 'safe' | 'ventilation' | 'evacuate' = 'safe';
  if (sensors.some(s => s.status === 'evacuate')) {
    overallStatus = 'evacuate';
  } else if (sensors.some(s => s.status === 'ventilation')) {
    overallStatus = 'ventilation';
  }

  const alertCount = sensors.reduce((sum, s) => sum + s.alerts.length, 0);

  return {
    isValid: true,
    deviceId: 'IAQ-FACTORY-001',
    timestamp: new Date(),
    sensors,
    overallStatus,
    alertCount,
    avgCo2,
    avgTvoc,
    avgPm25,
    ambientTemperature: 23 + Math.random() * 5,
    ambientHumidity: 45 + Math.random() * 15,
  };
}
