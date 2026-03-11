// ============================================
// CORS Configuration
// Used in middleware.ts for API route protection
// ============================================

const allowedOrigins = [
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  // Sanity webhook origin
  'https://www.sanity.io',
].filter(Boolean);

const allowedMethods = ['GET', 'POST', 'OPTIONS'];
const allowedHeaders = [
  'Content-Type',
  'Authorization',
  'X-Sanity-Webhook-Signature',
  'X-Requested-With',
];

export function getCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': allowedMethods.join(', '),
    'Access-Control-Allow-Headers': allowedHeaders.join(', '),
    'Access-Control-Max-Age': '86400',
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return allowedOrigins.includes(origin);
}
