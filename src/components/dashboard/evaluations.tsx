import { SessionUser } from '@/core/auth/session';

type EvaluationsProps = {
  user: SessionUser | null;
};
export function Evaluations({ user }: EvaluationsProps) {
  if (user?.role === 'evaluator') {
    return <h1>ADMINISTRAR EVALUACIONES</h1>;
  }
  if (user?.role === 'participant') {
    return <h1>EVALUACIONES POR COMPLETAR</h1>;
  }
}
