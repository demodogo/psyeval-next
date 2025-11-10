import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/core/database';
import { hashPassword } from '@/core/auth/helpers';

export async function POST(req: NextRequest) {
  try {
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;
    const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD!;

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: 'Macarena',
        lastName: 'Muñoz',
        email: email,
        password_hash: hashedPassword,
        role: 'admin',
      },
    });
    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creando invitación.' }, { status: 500 });
  }
}
