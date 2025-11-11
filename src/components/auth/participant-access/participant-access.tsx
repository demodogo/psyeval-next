export function ParticipantAccess({ token }: { token: string }) {
  return (
    <div>
      <h1>Tu token es válido</h1>
      <p>Tu token: {token}</p>
    </div>
  );
}
