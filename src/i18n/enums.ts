export const enumLabels = {
  EvaluationResultStatus: {
    not_started: 'No iniciada',
    in_progress: 'En progreso',
    completed: 'Completada',
    pending_review: 'Pendiente de revisión',
    reviewed: 'Revisada',
  },
  EvaluationAccessStatus: {
    pending: 'Pendiente',
    used: 'Usado',
    revoked: 'Revocado',
    expired: 'Expirado',
  },
  Role: {
    admin: 'Administrador',
    evaluator: 'Evaluador',
    participant: 'Postulante',
  },
} as const;
