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
        // Add patterns for external content
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
                "default-src 'self'",
                "img-src 'self' https://cdn.bsky.app https://*.bsky.app https://*.bsky.social https://bravenewcoin.com https://cryptdd.com https://www.borsahub.com https://infoexist.com data: blob:",
                "media-src 'self' https://video.bsky.app",
                "frame-src 'self' https://bsky.app",
                "connect-src 'self' https://bsky.social https://*.bsky.app https://*.bsky.social",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                "style-src 'self' 'unsafe-inline'",
              ].join('; '),
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;