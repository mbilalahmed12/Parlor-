/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const backendHostPort = process.env.BACKEND_INTERNAL_HOSTPORT;

    if (!backendHostPort) {
      return [];
    }

    return [
      {
        source: '/api/:path*',
        destination: `http://${backendHostPort}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

module.exports = nextConfig
