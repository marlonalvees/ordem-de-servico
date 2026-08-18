export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Chamado registrado!</h1>
      <p className="mt-2 text-sm text-gray-600">
        Sua solicitação foi enviada para a equipe de T.I.
      </p>
      {id && (
        <p className="mt-4 text-xs text-gray-400">
          Protocolo: <span className="font-mono">{id}</span>
        </p>
      )}
      <a
        href="/"
        className="mt-8 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Abrir outro chamado
      </a>
    </main>
  );
}
