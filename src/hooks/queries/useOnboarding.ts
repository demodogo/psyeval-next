import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OnboardingSchema } from '@/schemas/onboarding.schema';

export const useProcessOnboarding = () => {
  return useMutation({
    mutationFn: async (data: { data: OnboardingSchema; token: string }) =>
      await axios.post('/api/auth/invitations/onboarding', {
        ...data.data,
        token: data.token,
      }),
    onSuccess: async () => {
      toast.success('¡Bienvenid@!', { toastId: 'onboarding-sucess' });
    },
    onError: (error) => {
      toast.error('Error al aceptar la invitación', { toastId: 'onboarding-error' });
      return error;
    },
  });
};
