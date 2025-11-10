'use client';
import { Column, Table } from '@components/ui/Table';
import { Dropdown } from '@components/ui/Dropdown';
import { useToggleUserStatus, useUsers } from '@/hooks/queries/useUsers';
import { Badge } from '@components/ui';
import { enumLabels } from '@/i18n/enums';

type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: 'evaluator' | 'participant' | 'admin';
  is_active: boolean;
};
export function UsersList() {
  const { data: users, isLoading, isPending } = useUsers();
  const { mutate: toggleUserStatus } = useToggleUserStatus();

  if (isLoading || isPending) {
    return null;
  }

  function onAction(isActive: boolean, id: string) {
    toggleUserStatus({ id: id, isActive: isActive });
  }
  const columnas: Column<User>[] = [
    { key: 'name', header: 'Nombre' },
    { key: 'lastName', header: 'Apellido' },
    { key: 'email', header: 'Correo' },
    { key: 'role', header: 'Rol', render: (row) => <>{enumLabels.Role[row.role]}</> },
    { key: 'is_active', header: 'Estado', render: (row) => <Badge variant={row.is_active ? 'success' : 'warning'}>{row.is_active ? 'Activo' : 'Inhabilitado'}</Badge> },
    {
      key: 'acciones',
      header: 'Acciones',
      align: 'right',
      render: (row) => <Dropdown items={[{ label: row.is_active ? 'Inhabilitar' : 'Habilitar', onClick: () => onAction(!row.is_active, row.id), danger: true }]} />,
    },
  ];

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'text-gray-600'}>Usuarios activos</h3>
      <Table columns={columnas} data={users} rowKey={(row) => row.id} emptyText={'Sin resultados'} />
    </div>
  );
}
