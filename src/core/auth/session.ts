import type { SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'psyeval-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export interface AppSessionData {
  user?: {
    id: string;
    email: string;
    name: string;
    lastName: string;
    role: 'evaluator' | 'participant' | 'admin';
  };
}

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: 'evaluator' | 'participant' | 'admin';
};
