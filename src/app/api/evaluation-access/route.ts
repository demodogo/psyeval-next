import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/core/auth/server-session';
import { prisma } from '@/core/database';
import { randomUUID } from 'crypto';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const { participantEmail, participantFirstName, participantLastName, evaluationIds, expiresAt: expiresAtRaw } = await req.json();

    const session = await getServerSession();

    if (!session || !session.user || session?.user?.role !== 'evaluator') {
      return NextResponse.json({ error: 'Not enough permissions' }, { status: 401 });
    }

    const existingEvaluations = await prisma.evaluation.count({
      where: {
        id: {
          in: evaluationIds,
        },
      },
    });

    if (existingEvaluations !== evaluationIds.length) {
      return NextResponse.json({ error: 'Una o más evaluaciones inválidas' }, { status: 409 });
    }

    let expiresAt: Date | null = null;
    if (expiresAtRaw) {
      const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(expiresAtRaw);
      const isoString = isDateOnly ? `${expiresAtRaw}T23:59:59.999Z` : expiresAtRaw;
      const parsed = new Date(isoString);
      if (isNaN(parsed.getTime())) {
        return NextResponse.json({ error: 'Formato de fecha inválido. Usa ISO-8601 (YYYY-MM-DD o YYYY-MM-DDTHH:mm:ssZ)' }, { status: 400 });
      }
      if (parsed <= new Date()) {
        return NextResponse.json({ error: 'La fecha de expiración debe ser futura.' }, { status: 400 });
      }
      expiresAt = parsed;
    }

    const token = randomUUID();

    const accessInvitation = await prisma.evaluationAccess.create({
      data: {
        token,
        evaluator: {
          connect: { id: session.user.id },
        },
        creator: {
          connect: { id: session.user.id },
        },
        participantFirstName,
        participantLastName,
        participantEmail,
        expiresAt,
        evaluationIds,
      },
    });

    return NextResponse.json(
      {
        accessInvitation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creando invitación.' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user || session?.user?.role !== 'evaluator') {
    return NextResponse.json({ error: 'Not enough permissions' }, { status: 401 });
  }
  try {
    const evaluatorEvaluations = await prisma.evaluationAccess.findMany({
      where: {
        OR: [{ creator: { id: session.user.id } }, { evaluator: { id: session.user.id } }],
      },
    });
    const evaluations = await prisma.evaluation.findMany({
      where: {
        id: {
          in: evaluatorEvaluations.map((evaluation) => evaluation.evaluationIds).flat(),
        },
      },
    });
    const evaluatorEvaluationsWithUrl = evaluatorEvaluations.map((evaluation) => ({
      ...evaluation,
      evaluations: evaluations.filter((e) => evaluation.evaluationIds.includes(e.id)),
      evaluationUrl: `${BASE_URL}/evaluaciones/access?token=${evaluation.token}`,
    }));
    return NextResponse.json({ evaluatorEvaluationsWithUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error obteniendo las invitaciones.' }, { status: 500 });
  }
}
