'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EvaluationAccessSchema, evaluationAccessSchema } from '@/schemas/evaluation-access.schema';
import { Button, Checkbox, TextField } from '@components/ui';
import { useEvaluations } from '@/hooks/queries/useEvaluations';
import { useCreateEvaluationAccess } from '@/hooks/queries/useEvaluationAccess';
import { EvaluationType } from '@/types/evaluation.type';
import { DateInput } from '@components/ui/DateInput';

export function EvaluationAccessForm() {
  const { data: evaluations, isLoading: loadingData } = useEvaluations();
  const { mutate: createEvaluationAccess } = useCreateEvaluationAccess();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<EvaluationAccessSchema>({
    defaultValues: {
      evaluationIds: [],
    },
    resolver: zodResolver(evaluationAccessSchema),
  });

  async function onSubmit(data: EvaluationAccessSchema) {
    createEvaluationAccess(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'grid grid-cols-1 lg:grid-cols-2 mx-auto px-4 py-8  border border-gray-300 rounded-md gap-4'}>
      <TextField label={'Correo del postulante'} {...register('participantEmail')} error={errors.participantEmail?.message} />
      <TextField label={'Nombre'} {...register('participantFirstName')} error={errors.participantFirstName?.message} />
      <TextField label={'Apellido'} {...register('participantLastName')} error={errors.participantLastName?.message} />
      <DateInput label={'Fecha de expiración'} id={'expiresAt'} {...register('expiresAt')} error={errors.expiresAt?.message} helperText={'(Opcional)'} />
      <div className={'col-span-1 lg:col-span-2 flex flex-col gap-4'}>
        <span className={'text-sm text-primary'}>Selecciona las evaluaciones a las que quieres dar acceso:</span>
        {loadingData ? (
          <p>Cargando evaluaciones...</p>
        ) : (
          <>
            {evaluations?.map((evaluation: EvaluationType) => (
              <Checkbox key={evaluation.id} id={evaluation.id} value={evaluation.id} label={evaluation.label} {...register('evaluationIds')} />
            ))}
          </>
        )}
      </div>
      {errors.evaluationIds && <p className="text-red-500 text-sm mt-1">{errors.evaluationIds.message}</p>}
      <div className={'col-span-1 lg:col-span-2'}>
        <Button type={'submit'} loading={isSubmitting || isLoading}>
          Enviar invitación
        </Button>
      </div>
    </form>
  );
}
