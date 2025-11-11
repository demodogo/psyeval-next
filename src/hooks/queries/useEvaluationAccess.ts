import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EvaluationAccessSchema } from '@/schemas/evaluation-access.schema';
import axios from 'axios';
import { toast } from 'react-toastify';
import { EvaluationAccessType } from '@/types/evaluation.type';

export const useCreateEvaluationAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EvaluationAccessSchema) => await axios.post('/api/evaluation-access', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['evaluation-access'] });
      toast.success('Evaluación enviada correctamente', { toastId: 'success-evaluation-access' });
    },
    onError: () => {
      toast.error('Error al enviar evaluación', { toastId: 'error-evaluation-access' });
    },
  });
};

export const useEvaluationAccesses = () => {
  return useQuery<EvaluationAccessType[]>({
    queryKey: ['evaluation-access'],
    queryFn: async () => {
      const res = await axios.get('/api/evaluation-access');
      if (res.status !== 200) {
        toast.error('Error al obtener invitaciones', { toastId: 'error-evaluation-access-get' });
        throw new Error('Estado no OK');
      }
      const data = res.data?.evaluatorEvaluationsWithUrl;
      if (!Array.isArray(data)) {
        throw new Error('Formato inválido');
      }
      return data;
    },
    placeholderData: [],
    retry: (failureCount, error) => failureCount < 3 && !(error as Error).message.includes('Formato'),
  });
};
