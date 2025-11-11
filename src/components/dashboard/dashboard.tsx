import { redirect } from 'next/navigation';
import { getServerSession } from '@/core/auth/server-session';
import { Postulantes } from '@components/dashboard/evaluator/postulantes';

export async function Dashboard() {
  const session = await getServerSession();

  if (!session.user) {
    redirect('/');
  }

  if (session.user.role === 'admin') {
    redirect('/dashboard/usuarios');
  }

  if (session.user.role === 'evaluator') {
    return <Postulantes />;
  }
  return (
    <main className="">
      <h1>DASHBOARD</h1>
    </main>
  );
}
