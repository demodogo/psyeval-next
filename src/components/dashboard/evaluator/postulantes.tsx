import { EvaluationAccessForm } from '@components/dashboard/evaluator/evaluation-access-form';
import { EvaluationAccessList } from '@components/dashboard/evaluator/evaluation-access-list';

export function Postulantes() {
  return (
    <div className={'flex flex-col gap-2'}>
      <EvaluationAccessForm />
      <EvaluationAccessList />
    </div>
  );
}
