/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Production optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Temporarily ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'KrishiMitra AI',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
}

module.exports = nextConfig
