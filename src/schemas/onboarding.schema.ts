import { z } from 'zod';

export const onboardingSchema = z
  .object({
    name: z.string().min(2, 'El nombre es requerido'),
    lastName: z.string().min(2, 'El apellido es requerido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    password_repeat: z.string().min(6, 'Mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.password_repeat, {
    message: 'Las contraseñas no coinciden',
    path: ['password_repeat'],
  });

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
