import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useEvaluations = () => {
  return useQuery({
    queryKey: ['evaluations'],
    queryFn: async () => {
      const response = await axios.get('/api/evaluations');
      if (response.status !== 200) {
        toast.error('Error al obtener las evaluaciones', { toastId: 'error-users' });
      }
      return response.data.evaluations;
    },
  });
};
