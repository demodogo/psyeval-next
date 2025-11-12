import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, AuthError } from '@/core/auth/login';
import { getServerSession } from '@/core/auth/server-session';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const sessionUser = await authenticateUser(email, password);

    const session = await getServerSession();
    session.user = sessionUser;
    await session.save();

    return NextResponse.json({ user: sessionUser }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status ?? 401 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
