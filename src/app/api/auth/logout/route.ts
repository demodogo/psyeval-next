import { NextRequest, NextResponse } from 'next/server';
import { AuthError } from '@/core/auth/login';
import { getServerSession } from '@/core/auth/server-session';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    session.destroy();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status ?? 401 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
