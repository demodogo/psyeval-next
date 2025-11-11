import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/core/auth/server-session';
import { getAllowedPaths } from '@/utils/path-maps';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = await getServerSession();
  const allowedPaths = getAllowedPaths(session?.user?.role || null);

  if (!allowedPaths.includes(pathname)) {
    return Response.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/evaluaciones/:path*'],
};
