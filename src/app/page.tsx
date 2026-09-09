import { requireHubSession } from "@/lib/hub-auth";
import { resolveDisplayName } from "@/lib/hub-users";
import { SiteHeader } from "@/components/SiteHeader";
import { TicketForm } from "@/components/TicketForm";

export default async function AbrirChamadoPage() {
  const session = await requireHubSession();
  const requesterName = await resolveDisplayName(session);

  return (
    <div>
      <SiteHeader userName={requesterName} current="abrir" />

      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-2xl font-bold text-foreground">Abrir chamado de T.I.</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha os dados abaixo para registrar sua solicitação de suporte.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <TicketForm branchs={session.branchs} requesterName={requesterName} />
        </div>
      </main>
    </div>
  );
}
