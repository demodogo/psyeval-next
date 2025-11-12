import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { QueryCallbackOptions } from '@/types/query.type';

export const useParticipantAccess = (options?: QueryCallbackOptions) => {
  return useMutation({
    mutationFn: async (token: string | null) => await axios.get(`/api/participant-access/${token}`),
    onSuccess: async (res) => {
      toast.success('¡Bienvenid@!', { toastId: 'participant-access-success' });
      options?.onSuccess?.(res);
    },
    onError: (res) => {
      options?.onError?.(res);
    },
  });
};

export const useParticipantEvaluations = () => {
  return useQuery({
    queryKey: ['participant-evaluations'],
    queryFn: async () => {
      const response = await axios.get('/api/participant-access/evaluations');
      if (response.status !== 200) {
        toast.error('Error al obtener las evaluaciones', { toastId: 'error-users' });
      }
      return response.data;
    },
  });
};
