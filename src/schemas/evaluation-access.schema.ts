import { z } from 'zod';

export const evaluationAccessSchema = z.object({
  participantEmail: z.email({ error: 'Email inválido' }).min(2, 'El email es requerido'),
  participantFirstName: z.string().min(2, 'El nombre es requerido'),
  participantLastName: z.string().min(2, 'El apellido es requerido'),
  evaluationIds: z.array(z.uuid()).min(1, 'Selecciona al menos una evaluación'),
  expiresAt: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
    }, 'La fecha de expiración debe ser una fecha válida en el futuro'),
});

export type EvaluationAccessSchema = z.infer<typeof evaluationAccessSchema>;
