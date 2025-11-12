import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/core/database';

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const invitation = await prisma.userInvitation.findUnique({
      where: { id },
    });

    if (!invitation || invitation.didCreateAccount) {
      return NextResponse.json({ error: 'Error al revocar la invitación' }, { status: 400 });
    }

    await prisma.userInvitation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error al revocar la invitación' }, { status: 500 });
  }
}
