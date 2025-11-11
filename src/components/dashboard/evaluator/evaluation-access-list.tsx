'use client';
import { useEvaluationAccesses } from '@/hooks/queries/useEvaluationAccess';
import { toast } from 'react-toastify';
import { Column } from '@components/ui/Table';
import { DisplayDropdown, Table } from '@components/ui';
import { Dropdown } from '@components/ui/Dropdown';
import { EvaluationAccessType } from '@/types/evaluation.type';
import { enumLabels } from '@/i18n/enums';

export function EvaluationAccessList() {
  const { data: evaluationAccesses, isLoading } = useEvaluationAccesses();
  if (isLoading) return <p>Cargando...</p>;

  console.log(evaluationAccesses);
  function copyToClipboard(value: string) {
    try {
      navigator.clipboard.writeText(value).then(() => {
        toast.success('Enlace copiado al portapapeles', { toastId: 'copy-invitation' });
      });
    } catch {
      toast.error('Error al copiar el enlace', { toastId: 'copy-invitation-error' });
    }
  }

  const columnas: Column<EvaluationAccessType>[] = [
    { key: 'participantEmail', header: 'Correo' },
    { key: 'participantFirstName', header: 'Nombre' },
    { key: 'participantLastName', header: 'Apellido' },
    { key: 'createdAt', header: 'Fecha invitación', render: (row) => new Date(row.createdAt).toLocaleDateString() },
    { key: 'expiresAt', header: 'Fecha expiración', render: (row) => (row.expiresAt ? new Date(row.expiresAt).toLocaleDateString() : 'Sin expiración') },
    {
      key: 'evaluations',
      header: 'Evaluaciones',
      render: (row) => {
        return <DisplayDropdown items={row.evaluations} />;
      },
    },
    {
      key: 'usedAt',
      header: 'Fecha uso',
      render: (row) => {
        return row.usedAt ? new Date(row.usedAt).toLocaleDateString() : 'No utilizado';
      },
    },
    { key: 'evaluationAccessStatus', header: 'Estado Invitación', render: (row) => <>{enumLabels.EvaluationAccessStatus[row.evaluationAccessStatus]}</> },
    { key: 'evaluationResultStatus', header: 'Estado Evaluación', render: (row) => <>{enumLabels.EvaluationResultStatus[row.evaluationResultStatus]} </> },
    {
      key: 'acciones',
      header: 'Acciones',
      align: 'right',
      render: (row) => {
        const items = [{ label: 'Copiar enlace', onClick: () => copyToClipboard(row.evaluationUrl) }].filter(Boolean);
        return <Dropdown items={items} />;
      },
    },
  ];

  return (
    <div className={'flex flex-col gap-2 mx-12'}>
      <h3 className={'text-sm mx-2 text-gray-600'}>Aquí podrás ver las evaluaciones que has enviado</h3>
      <Table columns={columnas} data={evaluationAccesses || []} rowKey={(row) => row.id} emptyText={'Sin resultados'} />
    </div>
  );
}
