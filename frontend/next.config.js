//):/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['api.dicebear.com'],
  },
  // rewrites removed – API calls will use NEXT_PUBLIC_API_URL directly
};

module.exports = nextConfig;