import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/core/database';

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error al obtener los usuarios ' }, { status: 500 });
  }
}
