import { getServerSession } from '@/core/auth/server-session';
import { Evaluations } from '@components/dashboard/evaluations';

export default async function EvaluacionesPage() {
  const session = await getServerSession();

  return <Evaluations user={session.user || null} />;
}
