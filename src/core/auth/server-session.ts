import { cookies } from 'next/headers';
import type { IronSession, IronSessionData } from 'iron-session';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/core/auth/session';

export async function getServerSession(): Promise<IronSession<IronSessionData>> {
  return getIronSession<IronSessionData>(await cookies(), sessionOptions);
}
