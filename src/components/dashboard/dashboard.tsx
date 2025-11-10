import { redirect } from 'next/navigation';
import { getServerSession } from '@/core/auth/server-session';

export async function Dashboard() {
  const session = await getServerSession();

  if (!session.user) {
    redirect('/');
  }

  if (session.user.role === 'admin') {
    redirect('/dashboard/usuarios');
  }

  return (
    <main className="">
      <h1>DASHBOARD</h1>
    </main>
  );
}
