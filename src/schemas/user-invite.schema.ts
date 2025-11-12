import { z } from 'zod';

export const userInviteSchema = z.object({
  email: z.email({ error: 'Email inválido' }).min(2, 'El email es requerido'),
});

export type UserInviteSchema = z.infer<typeof userInviteSchema>;
