import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCorsHeaders, isAllowedOrigin } from '@/lib/security/cors';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // CORS only on API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin') ?? '';

    // Preflight
    if (request.method === 'OPTIONS') {
      if (!isAllowedOrigin(origin)) {
        return new NextResponse(null, { status: 403 });
      }
      return new NextResponse(null, {
        status: 204,
        headers: {
          ...getCorsHeaders(origin),
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const response = NextResponse.next();
    if (origin && isAllowedOrigin(origin)) {
      const corsHeaders = getCorsHeaders(origin);
      for (const [key, value] of Object.entries(corsHeaders)) {
        response.headers.set(key, value);
      }
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
