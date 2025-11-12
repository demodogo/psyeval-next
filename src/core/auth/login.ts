import { SessionUser } from '@/core/auth/session';
import { prisma } from '@/core/database';
import { verifyPassword } from '@/core/auth/helpers';

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: 401) {
    super(message);
    this.status = status;
  }
}

export async function authenticateUser(email: string, password: string): Promise<SessionUser> {
  if (!email || !password) {
    throw new AuthError('Email and password are required', 401);
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AuthError('Invalid email or password', 401);
  }

  const valid = await verifyPassword(password, user.password_hash);

  if (!valid) {
    throw new AuthError('Invalid email or password', 401);
  }

  if (!user.is_active) {
    throw new AuthError('User is not active', 401);
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? '',
    lastName: user.lastName ?? '',
    role: user.role,
  };
}
