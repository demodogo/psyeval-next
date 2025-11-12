'use client';
import { Column, Table } from '@components/ui/Table';
import { useInvitations, useRevokeInvitation } from '@/hooks/queries/useInvitations';
import { Dropdown } from '@components/ui/Dropdown';
import { Badge } from '@components/ui';
import { toast } from 'react-toastify';

type Invitation = {
  id: string;
  email: string;
  createdAt: string;
  expiresAt?: string;
  didCreateAccount: boolean;
  token: string;
};

const INVITATION_BASE_URL = process.env.NEXT_PUBLIC_INVITATION_BASE_URL;

export function InvitationList() {
  const { data: invitations, isPending, isLoading } = useInvitations();
  const { mutate: revokeInvitation } = useRevokeInvitation();

  if (isLoading || isPending) {
    return null;
  }

  function copyToClipboard(text: string) {
    try {
      navigator.clipboard.writeText(`${INVITATION_BASE_URL}${text}`).then(() => {
        toast.success('Enlace copiado al portapapeles', { toastId: 'copy-invitation' });
      });
    } catch {
      toast.error('Error al copiar el enlace', { toastId: 'copy-invitation-error' });
    }
  }

  const columnas: Column<Invitation>[] = [
    { key: 'email', header: 'Correo' },
    { key: 'createdAt', header: 'Fecha invitación', render: (row) => new Date(row.createdAt).toLocaleDateString() },
    { key: 'expiresAt', header: 'Fecha expiración', render: (row) => (row.expiresAt ? new Date(row.expiresAt).toLocaleDateString() : 'Sin expiración') },
    {
      key: 'didCreateAccount',
      header: 'Estado',
      render: (row) => <Badge variant={row.didCreateAccount ? 'success' : 'warning'}>{row.didCreateAccount ? 'Aceptado' : 'Pendiente'}</Badge>,
    },

    {
      key: 'acciones',
      header: 'Acciones',
      align: 'right',
      render: (row) => {
        const items = [
          { label: 'Copiar enlace', onClick: () => copyToClipboard(row.token) },
          { label: 'Revocar', onClick: () => revokeInvitation(row.id), danger: true },
        ].filter(Boolean);
        return <Dropdown items={items} />;
      },
    },
  ];

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'text-gray-600'}>Invitaciones </h3>
      <Table columns={columnas} data={invitations} rowKey={(row) => row.id} emptyText={'Sin resultados'} />
    </div>
  );
}
