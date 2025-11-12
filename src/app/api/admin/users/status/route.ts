import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/core/database';

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const searchParams = new URL(req.url).searchParams;
  const status = searchParams.get('status');

  if (!status) {
    return NextResponse.json({ error: 'Status is required' });
  }

  const activate = status && status === 'true' ? true : status && status === 'false' ? false : undefined;
  if (!id) return NextResponse.json({ error: 'ID is required' });
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return NextResponse.json({ error: 'User not found' });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        is_active: activate,
        disabledAt: activate ? null : new Date(),
      },
    });

    const updatedUser = prisma.user.findUnique({
      where: { id: user.id },
    });

    return NextResponse.json({ updatedUser });
  } catch {
    return NextResponse.json({ error: 'Error al obtener los usuarios ' }, { status: 500 });
  }
}
