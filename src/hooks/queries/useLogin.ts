import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthSchema } from '@/schemas/auth.schema';
import { QueryCallbackOptions } from '@/types/query.type';

export const useLogin = (options?: QueryCallbackOptions) => {
  return useMutation({
    mutationFn: async (data: AuthSchema) => await axios.post('/api/auth/login', data),
    onSuccess: async (res) => {
      toast.success('¡Bienvenid@!', { toastId: 'login-success' });
      options?.onSuccess?.(res);
    },
    onError: () => {
      return toast.error('Error en el inicio de sesión', { toastId: 'login-error' });
    },
  });
};
