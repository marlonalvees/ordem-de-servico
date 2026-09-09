import Link from "next/link";
import { getHubSession } from "@/lib/hub-auth";
import { resolveDisplayName } from "@/lib/hub-users";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getHubSession();
  const name = session ? await resolveDisplayName(session) : null;

  return (
    <div>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/painel" className="font-semibold text-gray-900">
            Painel de Chamados — T.I.
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {name && <span>{name}</span>}
            <a
              href={(process.env.HUB_LOGIN_URL ?? "https://hub.lojanovamix.com.br/login").replace(/\/login\/?$/, "")}
              className="text-blue-600 hover:underline"
            >
              Voltar ao hub
            </a>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
