/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bsky.app',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'bsky.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'video.bsky.app',
        pathname: '/watch/**',
      },
      {
        protocol: 'https',
        hostname: '*.bsky.social',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bravenewcoin.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cryptdd.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.borsahub.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'infoexist.com',
        pathname: '/**',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://bsky.app",
              "img-src 'self' https: data: blob:",
              "media-src 'self' https://video.bsky.app",
              "frame-src 'self' https://bsky.app https://*.bsky.app https://*.bsky.social",
              "connect-src 'self' https://bsky.app https://bsky.social https://*.bsky.app https://*.bsky.social",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://bsky.app https://*.bsky.app",
              "style-src 'self' 'unsafe-inline' https://bsky.app",
              "font-src 'self' data: https://bsky.app",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;