import Link from "next/link";
import { requireHubSession } from "@/lib/hub-auth";
import { resolveDisplayName } from "@/lib/hub-users";
import { TicketForm } from "@/components/TicketForm";

export default async function AbrirChamadoPage() {
  const session = await requireHubSession();
  const requesterName = await resolveDisplayName(session);

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Abrir chamado de T.I.</h1>
          <p className="mt-1 text-sm text-gray-500">
            Preencha os dados abaixo para registrar sua solicitação de suporte.
          </p>
        </div>
        <Link href="/meus-chamados" className="shrink-0 text-sm text-blue-600 hover:underline">
          Meus chamados
        </Link>
      </div>

      <div className="mt-8">
        <TicketForm branchs={session.branchs} requesterName={requesterName} />
      </div>
    </main>
  );
}
