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
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
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
    ];
  },

  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
