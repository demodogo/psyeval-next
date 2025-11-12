import { ParticipantAccess } from '@components/auth/participant-access/participant-access';
import { getServerSession } from '@/core/auth/server-session';

export default async function AccessPage() {
  const session = await getServerSession();
  return <ParticipantAccess user={session.user ?? null} />;
}
