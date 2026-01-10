import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PROTECTED_MATCHERS = ['/app', '/dashboard'];
const ACCESS_TOKEN_COOKIE = 'accessToken';

const buildCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
});

const redirectToLogin = (req: NextRequest) => {
  const url = new URL('/login', req.url);
  url.searchParams.set('redirectTo', req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
};

const isProtectedPath = (pathname: string) =>
  PROTECTED_MATCHERS.some((prefix) => pathname.startsWith(prefix));

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (accessToken) return NextResponse.next();

  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return redirectToLogin(req);

  const refreshRes = await fetch(`${api}/v2/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!refreshRes.ok) return redirectToLogin(req);

  const data = (await refreshRes.json()) as { accessToken?: string };
  if (!data.accessToken) return redirectToLogin(req);

  const res = NextResponse.next();
  res.cookies.set(ACCESS_TOKEN_COOKIE, data.accessToken, buildCookieOptions());
  return res;
}

export const config = {
  matcher: [],
};
