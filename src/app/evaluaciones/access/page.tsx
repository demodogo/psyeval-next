import { ParticipantAccess } from '@components/auth/participant-access/participant-access';

export default async function AccessPage({ searchParams }: { searchParams: { token: string } }) {
  const { token } = await searchParams;

  return (
    <div>
      <h1>Página de Acceso</h1>
      {token ? <ParticipantAccess token={token} /> : <p>Token inválido</p>}
    </div>
  );
}
