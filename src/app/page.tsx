import { getHubSession } from "@/lib/hub-auth";
import { TicketForm } from "@/components/TicketForm";

export default async function AbrirChamadoPage() {
  const session = await getHubSession();

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Abrir chamado de T.I.</h1>
      <p className="mt-1 text-sm text-gray-500">
        Preencha os dados abaixo para registrar sua solicitação de suporte.
      </p>

      <div className="mt-8">
        <TicketForm branchs={session?.branchs ?? []} />
      </div>
    </main>
  );
}
