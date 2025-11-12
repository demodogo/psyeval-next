import { NextResponse } from 'next/server';
import { getServerSession } from '@/core/auth/server-session';
import { prisma } from '@/core/database';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not enough permissions' }, { status: 401 });
    }

    const access = await prisma.evaluationAccess.findUnique({
      where: { id: session.user.id },
    });

    if (!access) {
      return NextResponse.json({ error: 'Access not found' }, { status: 404 });
    }
    const evaluations = await prisma.evaluation.findMany({
      where: {
        id: { in: access.evaluationIds },
      },
    });
    return NextResponse.json(evaluations);
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
