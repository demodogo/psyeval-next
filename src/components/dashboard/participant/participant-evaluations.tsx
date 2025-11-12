'use client';
import { useParticipantEvaluations } from '@/hooks/queries/useParticipantAccess';
import { Column, Table } from '@components/ui/Table';
import { EvaluationType } from '@/types/evaluation.type';
import { SessionUser } from '@/core/auth/session';
import { Button } from '@components/ui';
import { Eye, LogOut } from 'lucide-react';
import { Modal } from '@components/ui/Modal';
import { useState } from 'react';

type ParticipantEvaluationsProps = {
  user: SessionUser | null;
};
export function ParticipantEvaluations({ user }: ParticipantEvaluationsProps) {
  const { data: participantEvaluations, isLoading } = useParticipantEvaluations();
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationType | null>(null);
  const [showTerminateSessionWarningModal, setShowTerminateSessionWarningModal] = useState(false);
  if (isLoading) return <h1>Cargando evaluaciones...</h1>;
  if (!participantEvaluations) return <h1>No hay información sobre tus evaluaciones.</h1>;

  const columnas: Column<EvaluationType>[] = [
    { key: 'label', header: 'Título' },
    {
      key: 'acciones',
      header: 'Acciones',
      align: 'right',
      render: (row) => {
        return (
          <Button
            size={'sm'}
            RightIcon={Eye}
            onClick={() => {
              setSelectedEvaluation(row);
              setOpenDescriptionModal(true);
            }}
          >
            Ver más
          </Button>
        );
      },
    },
  ];

  return (
    <div className={'flex flex-col gap-2 mx-12'}>
      <h3>
        ¡Bienvenid@, {user?.name} {user?.lastName}
      </h3>
      <h3 className={'text-sm mx-2 text-gray-600'}>Aquí podrás ver tus evaluaciones</h3>
      <Table columns={columnas} data={participantEvaluations || []} rowKey={(row) => row.id} emptyText={'Sin resultados'} />
      <EvaluationDescriptionModal evaluation={selectedEvaluation || ({} as EvaluationType)} open={openDescriptionModal} onClose={() => setOpenDescriptionModal(false)} />

      <Button className={'my-8'} variant={'destroy'} LeftIcon={LogOut} onClick={() => setShowTerminateSessionWarningModal(true)}>
        Terminar sesión
      </Button>
      <TerminateSessionWarningModal open={showTerminateSessionWarningModal} onClose={() => setShowTerminateSessionWarningModal(false)} />
    </div>
  );
}

function EvaluationDescriptionModal({ evaluation, open, onClose }: { evaluation: EvaluationType; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title={evaluation?.label} footer={<EvaluationDescriptionActions />}>
      {evaluation?.description && (
        <>
          <p className={'text-xs my-1 text-gray-500'}>Descripción</p>
          <p className="text-sm text-foreground/90">{evaluation.description}</p>
        </>
      )}
    </Modal>
  );
}
function EvaluationDescriptionActions() {
  return (
    <>
      <Button variant={'outline'}>Tomar evaluación</Button>
      <Button variant={'secondary'}>Ver resultados</Button>
    </>
  );
}

function TerminateSessionWarningModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={'p-4'}>
        <p className={'text-md font-semibold tracking-wide'}>¿Seguro que deseas terminar la sesión?</p>
        <p className={'text-sm'}>Si cierras la sesión no podrás volver a ingresar a tus evaluaciones.</p>

        <div className={'flex justify-between'}>
          <Button className={'mt-4'} variant={'warning'} onClick={onClose}>
            Volver
          </Button>
          <Button className={'mt-4'} variant={'destroy'}>
            Terminar sesión
          </Button>
        </div>
      </div>
    </Modal>
  );
}
