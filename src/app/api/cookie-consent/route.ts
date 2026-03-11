import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'fm-cookie-consent';
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { necessary, analytics, marketing } = body as {
    necessary?: boolean;
    analytics?: boolean;
    marketing?: boolean;
  };

  if (typeof necessary !== 'boolean') {
    return NextResponse.json({ error: 'Invalid consent data' }, { status: 400 });
  }

  const consent = {
    necessary: true,
    analytics: !!analytics,
    marketing: !!marketing,
    timestamp: Date.now(),
  };

  const response = NextResponse.json({ ok: true, consent });

  response.cookies.set(COOKIE_NAME, JSON.stringify(consent), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });

  return response;
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie) {
    return NextResponse.json({ consent: null });
  }

  try {
    const consent = JSON.parse(cookie.value);
    return NextResponse.json({ consent });
  } catch {
    return NextResponse.json({ consent: null });
  }
}
