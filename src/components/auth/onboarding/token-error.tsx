export function TokenError() {
  return (
    <div className={'bg-slate-100 border border-gray-400 p-8 rounded-md shadow-md'}>
      <h1 className="text-2xl font-bold mb-4 text-red-400">Token inválido o expirado</h1>
      <p className="text-gray-600">Por favor solicita un nuevo token</p>
    </div>
  );
}
