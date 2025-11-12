export function TokenError() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
      <div className="rounded-full bg-red-100 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-red-600">Token inválido o expirado</h1>
      <p className="max-w-sm text-gray-600">Tu enlace ya no es válido o ha caducado. Solicita uno nuevo para continuar.</p>
    </div>
  );
}
