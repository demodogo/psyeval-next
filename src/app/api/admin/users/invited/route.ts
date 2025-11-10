import { NextResponse } from 'next/server';
import { prisma } from '@/core/database';

export async function GET() {
  try {
    const invitations = await prisma.userInvitation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ invitations });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error al obtener las invitaciones' }, { status: 500 });
  }
}
