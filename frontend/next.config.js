/** @type {import('next').NextConfig} */
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

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8001',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
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
    // Content Security Policy for production
    // Allows inline styles/scripts for Next.js, external fonts, and API
    const cspHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://calendly.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
      "font-src 'self' https://fonts.gstatic.com https://cdn.fontshare.com data:",
      "img-src 'self' data: blob: https: http:",
      "media-src 'self' data: blob:",
      "connect-src 'self' https://api.aicoelektronik.com http://localhost:8001 https://calendly.com",
      "frame-src 'self' https://calendly.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          // DNS prefetch for performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Prevent XSS attacks
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Permissions Policy (formerly Feature Policy)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          // HTTP Strict Transport Security (1 year, include subdomains)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
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
      // Cache fonts
      {
        source: '/:path*.woff2',
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
};

module.exports = nextConfig;
