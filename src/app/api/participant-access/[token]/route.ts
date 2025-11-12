import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/core/database';
import { getServerSession } from '@/core/auth/server-session';

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = await params;

  if (!token) return NextResponse.json('Token not provided', { status: 401 });

  try {
    const access = await prisma.evaluationAccess.findUnique({
      where: {
        token,
      },
    });

    const today = new Date();

    if (
      !access ||
      (!access.expiresAt && access.evaluationAccessStatus === 'used') ||
      (access.expiresAt && access.expiresAt < today) ||
      access.evaluationAccessStatus === 'revoked'
    ) {
      return NextResponse.json('Invalid token', { status: 401 });
    }

    await prisma.evaluationAccess.update({
      where: { id: access.id },
      data: {
        evaluationAccessStatus: 'used',
        usedAt: new Date(),
      },
    });

    const session = await getServerSession();

    session.user = {
      id: access.id,
      email: access.participantEmail,
      name: access.participantFirstName,
      lastName: access.participantLastName,
      role: 'participant',
    };

    await session.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json('Error interno', { status: 500 });
  }
}
