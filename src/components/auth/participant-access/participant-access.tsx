'use client';
import { useParticipantAccess } from '@/hooks/queries/useParticipantAccess';
import { useEffect, useState } from 'react';
import { TokenError } from '@components/auth/token-error';
import { useSearchParams } from 'next/navigation';
import { ParticipantEvaluations } from '@components/dashboard/participant/participant-evaluations';
import { SessionUser } from '@/core/auth/session';

type ParticipantAccessProps = {
  user: SessionUser | null;
};
export function ParticipantAccess({ user }: ParticipantAccessProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isValidAccess, setIsValidAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { mutate: participantAccess } = useParticipantAccess({
    onSuccess: () => {
      setIsValidAccess(true);
      setIsLoading(false);
    },
    onError: () => {
      setIsValidAccess(false);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    participantAccess(token);
  }, []);

  if (isLoading)
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );

  if (isValidAccess) {
    return (
      <div>
        <ParticipantEvaluations user={user} />
      </div>
    );
  } else {
    return <TokenError />;
  }
}
