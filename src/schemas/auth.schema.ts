import { z } from 'zod';

export const authSchema = z.object({ email: z.email({ error: 'Email inválido' }).min(2), password: z.string().min(1, 'Contraseña requerida') });

export type AuthSchema = z.infer<typeof authSchema>;
