/** @type {import('next').NextConfig} */

// Parse allowed image domains from environment variable
// Format: comma-separated list of domains (e.g., "cdn.aicoelektronik.com,images.unsplash.com")
function getImageRemotePatterns() {
  const patterns = [];

  // Development: allow localhost
  if (process.env.NODE_ENV !== 'production') {
    patterns.push({
      protocol: 'http',
      hostname: 'localhost',
      port: '8001',
    });
    patterns.push({
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '8001',
    });
  }

  // Production allowed domains from env var
  const allowedDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS || '';
  if (allowedDomains) {
    allowedDomains.split(',').forEach(domain => {
      const trimmed = domain.trim();
      if (trimmed) {
        patterns.push({
          protocol: 'https',
          hostname: trimmed,
        });
      }
    });
  }

  // Default production domains (known safe CDNs)
  const defaultProductionDomains = [
    'aicoelektronik.com',
    '*.aicoelektronik.com',
    'aico-elektronik.com',
    '*.aico-elektronik.com',
  ];

  defaultProductionDomains.forEach(domain => {
    patterns.push({
      protocol: 'https',
      hostname: domain,
    });
  });

  return patterns;
}

// Build Content-Security-Policy header value
function buildCSP() {
  const isDev = process.env.NODE_ENV !== 'production';
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com';

  // Parse backend URL for CSP
  let backendHost = '';
  try {
    const url = new URL(backendUrl);
    backendHost = url.origin;
  } catch {
    backendHost = isDev ? 'http://localhost:8001' : '';
  }

  const directives = [
    "default-src 'self'",
    // Scripts: self + inline for Next.js hydration (unavoidable with App Router)
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'",
    // Styles: self + inline for Tailwind/CSS-in-JS
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Images: self + data URIs + allowed domains
    `img-src 'self' data: blob: ${siteUrl} ${backendHost} https://*.aicoelektronik.com https://*.aico-elektronik.com`,
    // Fonts
    "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com",
    // Connect (API calls, WebSocket for HMR in dev)
    isDev
      ? `connect-src 'self' ${backendHost} ws://localhost:* http://localhost:*`
      : `connect-src 'self' ${backendHost} /api/`,
    // Media
    "media-src 'self' blob:",
    // Object/embed - none needed
    "object-src 'none'",
    // Frame ancestors - prevent clickjacking
    "frame-ancestors 'none'",
    // Base URI
    "base-uri 'self'",
    // Form actions
    "form-action 'self'",
    // Upgrade insecure in production
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ];

  return directives.join('; ');
}

const nextConfig = {
  // React Strict Mode
  reactStrictMode: true,

  // Transpile packages that need it
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],

  // Webpack configuration for Three.js and shaders
  webpack: (config, { isServer }) => {
    // Handle GLSL shaders
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    // Handle Three.js specific imports
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },

  // Image optimization - NO WILDCARDS (DoS prevention)
  images: {
    remotePatterns: getImageRemotePatterns(),
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001',
  },

  // Redirects for old routes (SEO preservation)
  async redirects() {
    return [
      // Root to Turkish
      {
        source: '/',
        destination: '/tr',
        permanent: true,
      },
      // Old product routes to projects
      {
        source: '/:lang/products/:path*',
        destination: '/:lang/projects',
        permanent: true,
      },
      // Old calculator routes to contact
      {
        source: '/:lang/calculators/:path*',
        destination: '/:lang/contact',
        permanent: true,
      },
      // Old service routes to solutions
      {
        source: '/:lang/pcb-manufacturing',
        destination: '/:lang/solutions',
        permanent: true,
      },
      {
        source: '/:lang/pcb-assembly',
        destination: '/:lang/solutions',
        permanent: true,
      },
      {
        source: '/:lang/fast-prototyping',
        destination: '/:lang/solutions',
        permanent: true,
      },
      {
        source: '/:lang/services',
        destination: '/:lang/solutions',
        permanent: true,
      },
      // Old capability routes to about
      {
        source: '/:lang/pcb-capabilities',
        destination: '/:lang/about',
        permanent: true,
      },
      {
        source: '/:lang/assembly-capabilities',
        destination: '/:lang/about',
        permanent: true,
      },
      {
        source: '/:lang/stackup',
        destination: '/:lang/about',
        permanent: true,
      },
      {
        source: '/:lang/quality',
        destination: '/:lang/about',
        permanent: true,
      },
      // Old IoT product routes to projects
      {
        source: '/:lang/coffee-machine-systems',
        destination: '/:lang/projects',
        permanent: true,
      },
      {
        source: '/:lang/fire-detection',
        destination: '/:lang/projects',
        permanent: true,
      },
      {
        source: '/:lang/cold-storage',
        destination: '/:lang/projects',
        permanent: true,
      },
      {
        source: '/:lang/mining-tracking',
        destination: '/:lang/projects',
        permanent: true,
      },
      {
        source: '/:lang/machine-analysis',
        destination: '/:lang/projects',
        permanent: true,
      },
      // Case studies and support
      {
        source: '/:lang/case-studies',
        destination: '/:lang/projects',
        permanent: true,
      },
      {
        source: '/:lang/support',
        destination: '/:lang/contact',
        permanent: true,
      },
    ];
  },

  // Headers for security and caching
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    const csp = buildCSP();

    return [
      {
        source: '/:path*',
        headers: [
          // DNS Prefetch - off for security (prevents DNS leaks)
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off',
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer policy - balance privacy and functionality
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy - disable sensitive APIs
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          // HSTS - only in production (2 years, include subdomains, preload)
          ...(isDev
            ? []
            : [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
                },
              ]),
          // X-XSS-Protection (legacy, but still useful for older browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      // Cache static assets
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache Next.js static files
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-icons'],
  },

  // Output standalone for Docker deployment (smaller, self-contained)
  output: 'standalone',
};

module.exports = nextConfig;
