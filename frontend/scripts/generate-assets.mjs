#!/usr/bin/env node
/**
 * Generate missing static assets for AICO Elektronik
 * - favicon.ico (32x32)
 * - favicon-16x16.png
 * - apple-touch-icon.png (180x180)
 * - og-image.jpg (1200x630)
 * - placeholder.png (800x600)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

// AICO brand colors
const ORANGE = '#F97316';
const DARK_BG = '#050507';
const DARK_SURFACE = '#0A0A0F';
const WHITE = '#FEFEFE';
const GRAY = '#64748B';

// SVG for AICO logo mark (stylized "A" icon)
function createLogoSVG(size, bgColor = DARK_BG, fgColor = ORANGE) {
  return Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${bgColor}"/>
      <g transform="translate(${size * 0.15}, ${size * 0.15}) scale(${size * 0.007})">
        <path d="M50 10 L90 90 L75 90 L65 70 L35 70 L25 90 L10 90 L50 10Z M50 30 L38 62 L62 62 L50 30Z" fill="${fgColor}"/>
        <rect x="42" y="75" width="16" height="4" rx="2" fill="${fgColor}" opacity="0.6"/>
      </g>
    </svg>
  `);
}

// OG Image SVG
function createOGImageSVG() {
  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#050507"/>
          <stop offset="50%" stop-color="#0A0A12"/>
          <stop offset="100%" stop-color="#050507"/>
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#F97316"/>
          <stop offset="100%" stop-color="#EA580C"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0%" stop-color="#F97316" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#F97316" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect width="1200" height="630" fill="url(#grid)"/>
      <rect width="1200" height="630" fill="url(#glow)"/>

      <!-- Corner accents -->
      <line x1="40" y1="40" x2="120" y2="40" stroke="${ORANGE}" stroke-width="2" opacity="0.6"/>
      <line x1="40" y1="40" x2="40" y2="120" stroke="${ORANGE}" stroke-width="2" opacity="0.6"/>
      <line x1="1160" y1="40" x2="1080" y2="40" stroke="${ORANGE}" stroke-width="2" opacity="0.6"/>
      <line x1="1160" y1="40" x2="1160" y2="120" stroke="${ORANGE}" stroke-width="2" opacity="0.6"/>
      <line x1="40" y1="590" x2="120" y2="590" stroke="${ORANGE}" stroke-width="2" opacity="0.6"/>
      <line x1="40" y1="590" x2="40" y2="510" stroke="${ORANGE}" stroke-width="2" opacity="0.6"/>
      <line x1="1160" y1="590" x2="1080" y2="590" stroke="${ORANGE}" stroke-width="2" opacity="0.6"/>
      <line x1="1160" y1="590" x2="1160" y2="510" stroke="${ORANGE}" stroke-width="2" opacity="0.6"/>

      <!-- Status badge -->
      <rect x="80" y="180" width="180" height="32" rx="16" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.3)" stroke-width="1"/>
      <circle cx="100" cy="196" r="4" fill="${ORANGE}"/>
      <text x="115" y="201" font-family="monospace" font-size="11" fill="${GRAY}" letter-spacing="2">AICO_UNIT_v3.2</text>

      <!-- Main title -->
      <text x="80" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="900" fill="${WHITE}" letter-spacing="-2">AICO Elektronik</text>

      <!-- Subtitle -->
      <text x="80" y="330" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="700" fill="${ORANGE}">Engineering the Future</text>

      <!-- Description -->
      <text x="80" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${GRAY}">Industrial IoT • Smart Living • Predictive Maintenance</text>

      <!-- Stats bar -->
      <rect x="80" y="440" width="1040" height="1" fill="rgba(255,255,255,0.1)"/>

      <text x="80" y="490" font-family="monospace" font-size="11" fill="${GRAY}" letter-spacing="1">RT_SPEC</text>
      <text x="80" y="515" font-family="monospace" font-size="28" font-weight="700" fill="${ORANGE}">&lt;50ms</text>
      <text x="80" y="540" font-family="system-ui, sans-serif" font-size="13" fill="${GRAY}">Response Time</text>

      <text x="350" y="490" font-family="monospace" font-size="11" fill="${GRAY}" letter-spacing="1">SLA_TIER</text>
      <text x="350" y="515" font-family="monospace" font-size="28" font-weight="700" fill="${ORANGE}">99.97%</text>
      <text x="350" y="540" font-family="system-ui, sans-serif" font-size="13" fill="${GRAY}">Uptime</text>

      <text x="620" y="490" font-family="monospace" font-size="11" fill="${GRAY}" letter-spacing="1">EFF_GAIN</text>
      <text x="620" y="515" font-family="monospace" font-size="28" font-weight="700" fill="${ORANGE}">78%</text>
      <text x="620" y="540" font-family="system-ui, sans-serif" font-size="13" fill="${GRAY}">Downtime Cut</text>

      <text x="890" y="490" font-family="monospace" font-size="11" fill="${GRAY}" letter-spacing="1">DEPLOY_CT</text>
      <text x="890" y="515" font-family="monospace" font-size="28" font-weight="700" fill="${ORANGE}">100+</text>
      <text x="890" y="540" font-family="system-ui, sans-serif" font-size="13" fill="${GRAY}">Installations</text>

      <!-- Bottom accent line -->
      <rect x="0" y="625" width="1200" height="5" fill="url(#accent)"/>
    </svg>
  `);
}

// Placeholder image SVG
function createPlaceholderSVG(width = 800, height = 600) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0A0A0F"/>
          <stop offset="100%" stop-color="#121218"/>
        </linearGradient>
        <pattern id="pgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#pbg)"/>
      <rect width="${width}" height="${height}" fill="url(#pgrid)"/>
      <g transform="translate(${width / 2}, ${height / 2})">
        <rect x="-40" y="-30" width="80" height="60" rx="8" fill="none" stroke="rgba(249,115,22,0.3)" stroke-width="2"/>
        <circle cx="0" cy="-5" r="10" fill="none" stroke="rgba(249,115,22,0.4)" stroke-width="1.5"/>
        <path d="M-25 20 L-10 5 L0 15 L15 -5 L25 10 L25 20Z" fill="rgba(249,115,22,0.2)" stroke="rgba(249,115,22,0.4)" stroke-width="1"/>
      </g>
      <text x="${width / 2}" y="${height / 2 + 60}" font-family="monospace" font-size="12" fill="${GRAY}" text-anchor="middle">${width} x ${height}</text>
    </svg>
  `);
}

async function generateAssets() {
  console.log('Generating missing assets...\n');

  // 1. Favicon ICO (32x32 PNG, saved as .ico)
  const favicon32 = await sharp(createLogoSVG(32))
    .resize(32, 32)
    .png()
    .toBuffer();

  // Create ICO file (simplified - just a 32x32 PNG wrapped in ICO header)
  // For broader compatibility, we'll create a PNG and also an ICO
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // ICO type
  icoHeader.writeUInt16LE(1, 4); // 1 image

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0); // width
  icoEntry.writeUInt8(32, 1); // height
  icoEntry.writeUInt8(0, 2); // color palette
  icoEntry.writeUInt8(0, 3); // reserved
  icoEntry.writeUInt16LE(1, 4); // color planes
  icoEntry.writeUInt16LE(32, 6); // bits per pixel
  icoEntry.writeUInt32LE(favicon32.length, 8); // image size
  icoEntry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

  const icoBuffer = Buffer.concat([icoHeader, icoEntry, favicon32]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('  ✓ favicon.ico (32x32)');

  // 2. Favicon 16x16
  await sharp(createLogoSVG(64))
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('  ✓ favicon-16x16.png');

  // 3. Favicon 32x32 (PNG)
  await sharp(createLogoSVG(64))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('  ✓ favicon-32x32.png');

  // 4. Apple Touch Icon (180x180)
  await sharp(createLogoSVG(180))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('  ✓ apple-touch-icon.png (180x180)');

  // 5. Android Chrome icons
  await sharp(createLogoSVG(192))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  console.log('  ✓ android-chrome-192x192.png');

  await sharp(createLogoSVG(512))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('  ✓ android-chrome-512x512.png');

  // 6. OG Image (1200x630)
  const assetsDir = path.join(publicDir, 'assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  await sharp(createOGImageSVG())
    .resize(1200, 630)
    .jpeg({ quality: 90 })
    .toFile(path.join(assetsDir, 'og-image.jpg'));
  console.log('  ✓ assets/og-image.jpg (1200x630)');

  // 7. Placeholder image
  await sharp(createPlaceholderSVG(800, 600))
    .resize(800, 600)
    .png()
    .toFile(path.join(assetsDir, 'placeholder.png'));
  console.log('  ✓ assets/placeholder.png (800x600)');

  // 8. Additional placeholder sizes
  await sharp(createPlaceholderSVG(400, 300))
    .resize(400, 300)
    .png()
    .toFile(path.join(assetsDir, 'placeholder-sm.png'));
  console.log('  ✓ assets/placeholder-sm.png (400x300)');

  await sharp(createPlaceholderSVG(1200, 800))
    .resize(1200, 800)
    .png()
    .toFile(path.join(assetsDir, 'placeholder-lg.png'));
  console.log('  ✓ assets/placeholder-lg.png (1200x800)');

  // 9. SVG Favicon (modern browsers)
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#050507"/>
  <path d="M16 5L26 27H22L19 21H13L10 27H6L16 5Z" fill="#F97316"/>
  <path d="M16 11L12.5 19H19.5L16 11Z" fill="#050507"/>
  <rect x="13" y="23" width="6" height="2" rx="1" fill="#F97316" opacity="0.6"/>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon);
  console.log('  ✓ favicon.svg');

  console.log('\n✅ All assets generated successfully!');
}

generateAssets().catch(console.error);
