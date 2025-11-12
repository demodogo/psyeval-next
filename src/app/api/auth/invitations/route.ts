import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/core/auth/server-session';
import { prisma } from '@/core/database';
import { randomUUID } from 'crypto';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email obligatorio ' }, { status: 400 });
    }

    const session = await getServerSession();

    if (!session || session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Not enough permissions' }, { status: 401 });
    }

    const existingInvitation = await prisma.userInvitation.findUnique({
      where: { email },
    });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingInvitation || existingUser) {
      return NextResponse.json({ error: 'El usuario ya existe o ha sido invitado' }, { status: 409 });
    }

    const token = randomUUID();

    const invitation = await prisma.userInvitation.create({
      data: {
        email,
        token,
      },
    });

    return NextResponse.json(
      {
        invitation,
        onboardingUrl: `${BASE_URL}/onboarding?token=${token}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creando invitación.' }, { status: 500 });
  }
}
