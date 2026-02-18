/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better debugging and performance
  reactStrictMode: true,

  // ESLint configuration
  eslint: {
    // Only run ESLint on these directories during production build
    dirs: ['src/app', 'src/components', 'src/lib'],
    // Allow production builds to complete with warnings (unused imports)
    // Run `npm run lint` separately to check for issues
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    // Don't fail build on type errors (we run tsc separately)
    ignoreBuildErrors: false,
  },

  // Enable gzip/brotli compression
  compress: true,

  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,

  // Power by header removal for security
  poweredByHeader: false,

  // Image optimization configuration
  images: {
    // Modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for next/image with sizes prop
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Allow images from Indeed Flex domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'indeedflex.com',
      },
      {
        protocol: 'https',
        hostname: '*.indeedflex.com',
      },
    ],
  },

  // Experimental optimizations
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-navigation-menu',
      'date-fns',
      'recharts',
    ],
  },

  // Security and caching headers
  async headers() {
    return [
      // Security headers for all routes
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
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
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
      // Cache fonts
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO (trailing slash normalization, etc.)
  async redirects() {
    return [
      // Redirect www to non-www (handled at DNS/CDN level typically)
      // Remove trailing slashes for consistency
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
