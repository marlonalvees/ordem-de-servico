export default function AcessoNegadoPage() {
  const hubUrl = (process.env.HUB_LOGIN_URL ?? "https://hub.lojanovamix.com.br/login").replace(
    /\/login\/?$/,
    ""
  );

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Acesso restrito</h1>
      <p className="mt-2 text-sm text-gray-600">
        Você não tem permissão liberada para este módulo. Se você acha que deveria ter acesso, fale com o time de
        T.I.
      </p>
      <a
        href={hubUrl}
        className="mt-8 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Voltar ao hub
      </a>
    </main>
  );
}
