import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from '@/core/auth/server-session';

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  return NextResponse.json({ user: session.user ?? null });
}
