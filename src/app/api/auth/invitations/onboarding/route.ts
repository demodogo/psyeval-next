import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/core/database';
import { hashPassword } from '@/core/auth/helpers';
import { getIronSession } from 'iron-session';
import { AppSessionData, sessionOptions } from '@/core/auth/session';

export async function POST(req: NextRequest) {
  try {
    const { token, name, lastName, password } = await req.json();

    if (!token || !name || !lastName || !password) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const invitation = await prisma.userInvitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      return NextResponse.json({ error: 'Invitación inválida' }, { status: 400 });
    }

    const today = new Date();
    if (invitation.usedAt || invitation.didCreateAccount || (invitation.expiresAt && invitation.expiresAt < today)) {
      return NextResponse.json({ error: 'La invitación ya fue utilizada o ha expirado' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: invitation.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email: invitation.email,
        password_hash: passwordHash,
      },
    });

    await prisma.userInvitation.update({
      where: { token, id: invitation.id },
      data: {
        usedAt: new Date(),
        didCreateAccount: true,
      },
    });

    const res = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name!,
          lastName: user.lastName!,
          role: user.role,
        },
      },
      { status: 200 }
    );

    const session = await getIronSession<AppSessionData>(req, res, sessionOptions);

    session.user = {
      id: user.id,
      email: user.email,
      name: user.name!,
      lastName: user.lastName!,
      role: user.role === 'admin' ? 'admin' : user.role === 'evaluator' ? 'evaluator' : 'participant',
    };

    await session.save();

    return res;
  } catch (error) {
    console.error('Error en onboarding:', error);
    return NextResponse.json({ error: 'Error completando invitación.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
    }
    const valid = await prisma.userInvitation.findUnique({
      where: { token: token, didCreateAccount: false },
    });
    if (valid) return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error al validar el token' }, { status: 500 });
  }
}
