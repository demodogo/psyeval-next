import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OnboardingSchema } from '@/schemas/onboarding.schema';
import { QueryCallbackOptions } from '@/types/query.type';

export const useProcessOnboarding = (options?: QueryCallbackOptions) => {
  return useMutation({
    mutationFn: async (data: { data: OnboardingSchema; token: string }) =>
      await axios.post('/api/auth/invitations/onboarding', {
        ...data.data,
        token: data.token,
      }),
    onSuccess: async (res) => {
      toast.success('¡Bienvenid@!', { toastId: 'onboarding-sucess' });
      options?.onSuccess?.(res);
    },
    onError: (error) => {
      toast.error('Error al aceptar la invitación', { toastId: 'onboarding-error' });
      options?.onError?.(error);
    },
  });
};
