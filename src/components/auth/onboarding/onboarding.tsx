'use client';
import { useSearchParams } from 'next/navigation';
import { TokenError } from '@components/auth/token-error';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OnboardingForm } from '@components/auth/onboarding/onboarding-form';

export function Onboarding() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`/api/auth/invitations/onboarding?token=${token}`);
        if (response.status === 200 && response.data.ok) {
          setIsValidToken(true);
        }
      } catch {
        setIsValidToken(false);
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, [token]);

  if (loading) return <h1>Cargando...</h1>;

  return (
    <div>
      {token && isValidToken ? (
        <div className={'flex flex-col gap-2'}>
          <div>
            <p>¡Bienvenido!</p>
            <p className={'text-muted text-sm'}>Rellena los siguientes datos para continuar</p>
          </div>
          <OnboardingForm token={token} />
        </div>
      ) : (
        <TokenError />
      )}
    </div>
  );
}
