import { NextResponse } from 'next/server';
import { prisma } from '@/core/database';

export async function GET() {
  try {
    const evaluations = await prisma.evaluation.findMany({
      where: { disabled: false },
    });
    return NextResponse.json({ evaluations }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creando invitación.' }, { status: 500 });
  }
}
