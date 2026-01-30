// ===========================================
// FireLink Pro - MQTT Packet Parser
// 56-byte proprietary electrical fire detection packet
// ===========================================

/**
 * FireLink Packet Structure (56 bytes):
 *
 * Byte 0-1:   Header (0xFB 0x01)
 * Byte 2:     Device ID (high byte)
 * Byte 3:     Device ID (low byte)
 * Byte 4:     Packet Counter
 * Byte 5:     Warning1 Bitmask (8 sensors: S1-S8 fire status)
 * Byte 6:     Warning2 Bitmask (8 sensors: S1-S8 arc status)
 * Byte 7:     Warning3 Bitmask (system warnings)
 * Byte 8-39:  8 Temperature Readings (4 bytes each, IEEE 754 float)
 * Byte 40-47: 8 Arc Activity Readings (1 byte each, 0-255)
 * Byte 48-49: Ambient Temperature (2 bytes, signed int * 100)
 * Byte 50-51: Humidity (2 bytes, unsigned int * 100)
 * Byte 52-53: Battery Voltage (2 bytes, mV)
 * Byte 54:    Status Flags
 * Byte 55:    Checksum (XOR of bytes 2-54)
 */

export interface FireLinkSensor {
  id: number;
  name: string;
  temperature: number;
  arcActivity: number;       // 0-255
  hasFire: boolean;
  hasArc: boolean;
  zone: string;
  cableTemp: number;
  smolderingRisk: number;    // 0-100
}

export interface FireLinkPacket {
  isValid: boolean;
  deviceId: number;
  packetCounter: number;
  warning1: number;  // Fire warnings bitmask
  warning2: number;  // Arc warnings bitmask
  warning3: number;  // System warnings bitmask
  sensors: FireLinkSensor[];
  ambientTemperature: number;
  humidity: number;
  batteryVoltage: number;
  statusFlags: number;
  timestamp: Date;
  // Electrical parameters (enriched for demo)
  currentLoad: number;           // A
  insulationResistance: number;  // MΩ
  harmonicDistortion: number;    // %
  powerFactor: number;           // 0-1
  systemCurrent: number;         // mA
  // Computed
  hasAnyFire: boolean;
  hasAnyArc: boolean;
  criticalSensors: number[];
}

// Zone mapping for sensor locations
const ZONE_NAMES = [
  'Main Panel A',
  'Panel B - Floor 1',
  'Panel C - Floor 2',
  'Panel D - Kitchen',
  'Sub-Panel E',
  'Junction Box F',
  'Distribution G',
  'Emergency Panel H',
];

const ZONE_NAMES_TR = [
  'Ana Pano A',
  'Pano B - Kat 1',
  'Pano C - Kat 2',
  'Pano D - Mutfak',
  'Alt Pano E',
  'Bağlantı Kutusu F',
  'Dağıtım G',
  'Acil Pano H',
];

/**
 * Extract specific bit from a byte
 */
export function getBit(byte: number, bitPosition: number): boolean {
  return ((byte >> bitPosition) & 1) === 1;
}

/**
 * Extract multiple bits from a byte
 */
export function getBits(byte: number, startBit: number, numBits: number): number {
  const mask = (1 << numBits) - 1;
  return (byte >> startBit) & mask;
}

/**
 * Parse IEEE 754 float from 4 bytes (big endian)
 */
function parseFloat32BE(buffer: Uint8Array, offset: number): number {
  const view = new DataView(buffer.buffer, buffer.byteOffset + offset, 4);
  return view.getFloat32(0, false); // Big endian
}

/**
 * Parse signed 16-bit integer from 2 bytes (big endian)
 */
function parseInt16BE(buffer: Uint8Array, offset: number): number {
  const view = new DataView(buffer.buffer, buffer.byteOffset + offset, 2);
  return view.getInt16(0, false); // Big endian
}

/**
 * Parse unsigned 16-bit integer from 2 bytes (big endian)
 */
function parseUint16BE(buffer: Uint8Array, offset: number): number {
  const view = new DataView(buffer.buffer, buffer.byteOffset + offset, 2);
  return view.getUint16(0, false); // Big endian
}

/**
 * Calculate XOR checksum
 */
function calculateChecksum(buffer: Uint8Array, start: number, end: number): number {
  let checksum = 0;
  for (let i = start; i <= end; i++) {
    checksum ^= buffer[i];
  }
  return checksum;
}

/**
 * Parse a 56-byte FireLink packet
 */
export function parseFireLinkPacket(data: Uint8Array | ArrayBuffer, lang: 'tr' | 'en' = 'en'): FireLinkPacket {
  const buffer = data instanceof Uint8Array ? data : new Uint8Array(data);

  // Validate packet length
  if (buffer.length !== 56) {
    return createInvalidPacket('Invalid packet length');
  }

  // Validate header
  if (buffer[0] !== 0xFB || buffer[1] !== 0x01) {
    return createInvalidPacket('Invalid header');
  }

  // Validate checksum
  const calculatedChecksum = calculateChecksum(buffer, 2, 54);
  if (calculatedChecksum !== buffer[55]) {
    return createInvalidPacket('Checksum mismatch');
  }

  const zoneNames = lang === 'tr' ? ZONE_NAMES_TR : ZONE_NAMES;

  // Parse device ID
  const deviceId = parseUint16BE(buffer, 2);
  const packetCounter = buffer[4];

  // Parse warning bitmasks
  const warning1 = buffer[5]; // Fire warnings
  const warning2 = buffer[6]; // Arc warnings
  const warning3 = buffer[7]; // System warnings

  // Parse sensors
  const sensors: FireLinkSensor[] = [];
  for (let i = 0; i < 8; i++) {
    const temperature = parseFloat32BE(buffer, 8 + i * 4);
    const arcActivity = buffer[40 + i];
    const hasFire = getBit(warning1, i);
    const hasArc = getBit(warning2, i);

    sensors.push({
      id: i + 1,
      name: `Sensor ${i + 1}`,
      temperature: Math.round(temperature * 10) / 10,
      arcActivity,
      hasFire,
      hasArc,
      zone: zoneNames[i],
      cableTemp: 0,
      smolderingRisk: 0,
    });
  }

  // Parse environmental data
  const ambientTemperature = parseInt16BE(buffer, 48) / 100;
  const humidity = parseUint16BE(buffer, 50) / 100;
  const batteryVoltage = parseUint16BE(buffer, 52);
  const statusFlags = buffer[54];

  // Compute derived values
  const hasAnyFire = warning1 > 0;
  const hasAnyArc = warning2 > 0;
  const criticalSensors = sensors
    .filter(s => s.hasFire || s.hasArc)
    .map(s => s.id);

  return {
    isValid: true,
    deviceId,
    packetCounter,
    warning1,
    warning2,
    warning3,
    sensors,
    ambientTemperature,
    humidity,
    batteryVoltage,
    statusFlags,
    timestamp: new Date(),
    currentLoad: 0,
    insulationResistance: 0,
    harmonicDistortion: 0,
    powerFactor: 0,
    systemCurrent: 0,
    hasAnyFire,
    hasAnyArc,
    criticalSensors,
  };
}

/**
 * Create an invalid packet result
 */
function createInvalidPacket(reason: string): FireLinkPacket {
  return {
    isValid: false,
    deviceId: 0,
    packetCounter: 0,
    warning1: 0,
    warning2: 0,
    warning3: 0,
    sensors: [],
    ambientTemperature: 0,
    humidity: 0,
    batteryVoltage: 0,
    statusFlags: 0,
    timestamp: new Date(),
    currentLoad: 0,
    insulationResistance: 0,
    harmonicDistortion: 0,
    powerFactor: 0,
    systemCurrent: 0,
    hasAnyFire: false,
    hasAnyArc: false,
    criticalSensors: [],
  };
}

/**
 * Generate a simulated FireLink packet for demo purposes
 */
export function generateSimulatedPacket(scenario: 'normal' | 'warning' | 'critical' = 'normal'): Uint8Array {
  const buffer = new Uint8Array(56);

  // Header
  buffer[0] = 0xFB;
  buffer[1] = 0x01;

  // Device ID (1001)
  buffer[2] = 0x03;
  buffer[3] = 0xE9;

  // Packet counter (random)
  buffer[4] = Math.floor(Math.random() * 256);

  // Warning bitmasks based on scenario
  let warning1 = 0;
  let warning2 = 0;

  if (scenario === 'warning') {
    warning2 = 0b00010000; // Sensor 5 arc detection
  } else if (scenario === 'critical') {
    warning1 = 0b00001000; // Sensor 4 overheating + arc + smoldering
    warning2 = 0b00001100; // Sensors 3 & 4 arc
  }

  buffer[5] = warning1;
  buffer[6] = warning2;
  buffer[7] = 0; // No system warnings

  // Temperature readings (8 sensors, 4 bytes each)
  const baseTemps = [22, 24, 23, 25, 26, 22, 23, 21];
  const view = new DataView(buffer.buffer);

  for (let i = 0; i < 8; i++) {
    let temp = baseTemps[i] + (Math.random() - 0.5) * 4;

    // Elevated temperatures for active sensors
    if (getBit(warning1, i)) {
      temp = 85 + Math.random() * 30; // Fire: 85-115°C
    } else if (getBit(warning2, i)) {
      temp = 45 + Math.random() * 20; // Arc: 45-65°C
    }

    view.setFloat32(8 + i * 4, temp, false);
  }

  // Arc activity readings (8 sensors, 1 byte each)
  for (let i = 0; i < 8; i++) {
    let arc = Math.floor(Math.random() * 20); // Normal: 0-20

    if (getBit(warning1, i)) {
      arc = 200 + Math.floor(Math.random() * 55); // Fire: 200-255
    } else if (getBit(warning2, i)) {
      arc = 80 + Math.floor(Math.random() * 70); // Arc: 80-150
    }

    buffer[40 + i] = arc;
  }

  // Ambient temperature (22.5°C = 2250)
  view.setInt16(48, 2250 + Math.floor(Math.random() * 200 - 100), false);

  // Humidity (45% = 4500)
  view.setUint16(50, 4500 + Math.floor(Math.random() * 1000), false);

  // Battery voltage (3700mV)
  view.setUint16(52, 3700 + Math.floor(Math.random() * 100), false);

  // Status flags (all OK)
  buffer[54] = 0x00;

  // Calculate and set checksum
  buffer[55] = calculateChecksum(buffer, 2, 54);

  return buffer;
}

/**
 * Get warning level from packet
 */
export function getWarningLevel(packet: FireLinkPacket): 'normal' | 'warning' | 'critical' | 'offline' {
  if (!packet.isValid) return 'offline';
  if (packet.hasAnyFire) return 'critical';
  if (packet.hasAnyArc) return 'warning';
  return 'normal';
}

/**
 * Get sensor status color
 */
export function getSensorColor(sensor: FireLinkSensor): string {
  if (sensor.hasFire) return '#EF4444';
  if (sensor.hasArc) return '#F59E0B';
  if (sensor.temperature > 40) return '#F97316';
  return '#22C55E';
}

/**
 * Stable pseudo-random number from a seed (simple hash-based).
 * Returns a value in [0, 1).
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Enrich a parsed packet with realistic electrical demo data.
 * Uses deviceId + packetCounter as seed for stable values that
 * don't jump aggressively between renders.
 */
export function enrichPacketWithEnvironmental(packet: FireLinkPacket): FireLinkPacket {
  const seed = packet.deviceId * 1000 + packet.packetCounter;

  // Enrich sensors with cable temp and smoldering risk
  const enrichedSensors = packet.sensors.map((sensor, i) => {
    const s = seed + i * 137;
    return {
      ...sensor,
      cableTemp: sensor.cableTemp || Math.round((sensor.temperature + 5 + seededRandom(s) * 10) * 10) / 10,
      smolderingRisk: sensor.smolderingRisk || Math.round(seededRandom(s + 1) * (sensor.hasFire ? 90 : sensor.hasArc ? 50 : 15)),
    };
  });

  return {
    ...packet,
    sensors: enrichedSensors,
    currentLoad: packet.currentLoad || Math.round((10 + seededRandom(seed + 10) * 25) * 10) / 10,
    insulationResistance: packet.insulationResistance || Math.round((50 + seededRandom(seed + 11) * 450) * 10) / 10,
    harmonicDistortion: packet.harmonicDistortion || Math.round((2 + seededRandom(seed + 12) * 8) * 10) / 10,
    powerFactor: packet.powerFactor || Math.round((0.85 + seededRandom(seed + 13) * 0.14) * 100) / 100,
    systemCurrent: packet.systemCurrent || Math.round((120 + seededRandom(seed + 15) * 80) * 10) / 10,
  };
}
