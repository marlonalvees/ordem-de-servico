import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { TicketFilters } from "@/components/TicketFilters";
import { TicketList } from "@/components/TicketList";
import { Ticket, TicketStatus } from "@/types/ticket";

export default async function PainelPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; branch?: string; sector?: string }>;
}) {
  const { status, branch, sector } = await searchParams;

  let query = getSupabaseAdmin()
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status as TicketStatus);
  if (branch) query = query.ilike("branch", `%${branch}%`);
  if (sector) query = query.ilike("sector", `%${sector}%`);

  const { data, error } = await query;

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Chamados</h1>
      <TicketFilters status={status} branch={branch} sector={sector} />
      {error ? (
        <p className="text-sm text-red-600">Erro ao carregar chamados: {error.message}</p>
      ) : (
        <TicketList tickets={(data ?? []) as Ticket[]} />
      )}
    </div>
  );
}
