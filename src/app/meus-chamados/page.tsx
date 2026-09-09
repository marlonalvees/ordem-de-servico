import { requireHubSession } from "@/lib/hub-auth";
import { resolveDisplayName } from "@/lib/hub-users";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { SiteHeader } from "@/components/SiteHeader";
import { TicketSearch } from "@/components/TicketSearch";
import { Ticket } from "@/types/ticket";

export default async function MeusChamadosPage() {
  const session = await requireHubSession();
  const name = await resolveDisplayName(session);

  const { data, error } = await getSupabaseAdmin()
    .from("tickets")
    .select("*")
    .eq("requester_user_id", session.userId)
    .order("created_at", { ascending: false });

  return (
    <div>
      <SiteHeader userName={name} current="meus" />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-foreground">Meus chamados</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe todas as solicitações que você abriu.
        </p>

        <div className="mt-8">
          {error ? (
            <p className="text-sm text-destructive">Erro ao carregar chamados: {error.message}</p>
          ) : (
            <TicketSearch tickets={(data ?? []) as Ticket[]} />
          )}
        </div>
      </main>
    </div>
  );
}
