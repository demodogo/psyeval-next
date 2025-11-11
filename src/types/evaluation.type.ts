export type EvaluationType = {
  id: string;
  slug: string;
  label: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  disabled: boolean;
  disabledAt?: Date;
};

export type EvaluationAccessType = {
  id: string;
  token: string;
  createdAt: Date;
  expiresAt?: Date;
  createdBy: string;
  assignedTo: string;
  evaluation: EvaluationType;
  revokedAt?: Date;
  usedAt?: Date;
  metadata?: {
    [key: string]: string;
  };
  participantEmail: string;
  participantFirstName: string;
  participantLastName: string;
  evaluationAccessStatus: 'pending' | 'used' | 'revoked' | 'expired';
  evaluationUrl: string;
  evaluationResultStatus: 'not_started' | 'in_progress' | 'completed' | 'reviewed';
  evaluationIds: string[];
  evaluations: EvaluationType[];
};
