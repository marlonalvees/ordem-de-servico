import { Inbox, Clock3, CheckCircle2, TicketCheck } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { TicketFilters } from "@/components/TicketFilters";
import { TicketList } from "@/components/TicketList";
import { StatCard } from "@/components/StatCard";
import { Ticket, TicketStatus } from "@/types/ticket";

export default async function PainelPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; branch?: string; sector?: string }>;
}) {
  const { status, branch, sector } = await searchParams;

  const { data, error } = await getSupabaseAdmin()
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });

  const allTickets = (data ?? []) as Ticket[];

  const filtered = allTickets.filter(
    (ticket) =>
      (!status || ticket.status === (status as TicketStatus)) &&
      (!branch || ticket.branch.toLowerCase().includes(branch.toLowerCase())) &&
      (!sector || ticket.sector.toLowerCase().includes(sector.toLowerCase()))
  );

  const stats = [
    {
      label: "Abertos",
      value: allTickets.filter((t) => t.status === "aberto").length,
      icon: Inbox,
      tone: "amber" as const,
    },
    {
      label: "Em atendimento",
      value: allTickets.filter((t) => t.status === "em_atendimento").length,
      icon: Clock3,
      tone: "blue" as const,
    },
    {
      label: "Resolvidos",
      value: allTickets.filter((t) => t.status === "resolvido").length,
      icon: CheckCircle2,
      tone: "green" as const,
    },
    {
      label: "Total de chamados",
      value: allTickets.length,
      icon: TicketCheck,
      tone: "teal" as const,
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-foreground">Visão geral</h1>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <div className="mt-8">
        <TicketFilters status={status} branch={branch} sector={sector} />
        {error ? (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            Erro ao carregar chamados: {error.message}
          </div>
        ) : (
          <TicketList tickets={filtered} />
        )}
      </div>
    </div>
  );
}
