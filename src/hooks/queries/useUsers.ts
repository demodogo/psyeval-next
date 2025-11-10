import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('/api/admin/users');
      if (response.status !== 200) {
        toast.error('Error al obtener los usuarios', { toastId: 'error-users' });
      }
      return response.data.users;
    },
  });
};

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { isActive: boolean; id: string }) => {
      return await axios.post(`/api/admin/users/status?status=${data.isActive}`, { id: data.id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuario actualizado correctamente', { toastId: 'user-update-invitation' });
    },
    onError: () => {
      toast.error('Error al actualizar el usuario', { toastId: 'user-update-error' });
    },
  });
};
