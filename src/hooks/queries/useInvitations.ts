import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserInviteSchema } from '@/schemas/user-invite.schema';

export const useInvitations = () => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: async () => {
      const response = await axios.get('/api/admin/users/invited');
      if (response.status !== 200) {
        toast.error('Error al obtener las invitaciones', { toastId: 'error-users' });
      }
      return response.data.invitations;
    },
  });
};

export const useCreateInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserInviteSchema) => await axios.post('/api/auth/invitations', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['invitations'] });
      toast.success('Usuario invitado correctamente', { toastId: 'success-invitation' });
    },
    onError: (error) => {
      toast.error('Error al invitar al usuario', { toastId: 'error-invitation' });
    },
  });
};

export const useRevokeInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await axios.delete(`/api/admin/users/invited/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['invitations'] });
      toast.success('Invitación revocada correctamente', { toastId: 'success-revoke-invitation' });
    },
    onError: () => {
      toast.error('Error al revocar la invitación', { toastId: 'error-revoke-invitation' });
    },
  });
};
