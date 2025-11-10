import { getServerSession } from '@/core/auth/server-session';
import { AppShell } from '@components/ui/AppShell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return <AppShell user={session.user}>{children}</AppShell>;
}
