import type { NextConfig } from 'next';

const baseSecurityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const mainCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' cdn.sanity.io data:",
  "font-src 'self'",
  "frame-src www.google.com",
  "connect-src 'self' *.sanity.io vitals.vercel-insights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const studioCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' core.sanity-cdn.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' cdn.sanity.io data: blob:",
  "font-src 'self' data:",
  "frame-src 'self'",
  "connect-src 'self' *.sanity.io *.api.sanity.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          ...baseSecurityHeaders,
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: studioCsp },
        ],
      },
      {
        source: '/((?!studio).*)',
        headers: [
          ...baseSecurityHeaders,
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: mainCsp },
        ],
      },
    ];
  },
};

export default nextConfig;
