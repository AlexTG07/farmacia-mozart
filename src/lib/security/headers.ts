// ============================================
// Security Headers Configuration
// Applied via next.config.ts and middleware.ts
// ============================================

export const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '0', // Disabilitato — CSP è sufficiente e più sicuro
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
];

/**
 * Genera il Content-Security-Policy con nonce dinamico.
 */
export function buildCSP(nonce: string): string {
  const directives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' https://translate.google.com https://translate.googleapis.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' https://cdn.sanity.io https: data:`,
    `frame-src https://www.google.com https://translate.google.com`,
    `connect-src 'self' https://*.sanity.io https://translate.googleapis.com`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ];
  return directives.join('; ');
}
