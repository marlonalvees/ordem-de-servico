import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { TicketDetailForm } from "@/components/TicketDetailForm";
import { TicketStatusBadge, TicketPriorityBadge } from "@/components/TicketBadges";
import { TICKET_CATEGORY_LABELS, Ticket } from "@/types/ticket";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR");
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold text-foreground">{value}</div>
    </div>
  );
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await getSupabaseAdmin()
    .from("tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const ticket = data as Ticket;

  return (
    <div>
      <Link href="/painel" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <ArrowLeft size={15} />
        Voltar para a lista
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-primary">#{ticket.id.slice(0, 8)}</span>
          <h1 className="mt-0.5 text-xl font-bold text-foreground">
            {TICKET_CATEGORY_LABELS[ticket.category]} — {ticket.sector}
          </h1>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[1fr_280px]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-bold text-foreground">Descrição</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
            {ticket.description}
          </p>

          {ticket.resolution_note && (
            <div className="mt-5 rounded-xl bg-emerald-50 p-4">
              <h3 className="text-sm font-bold text-emerald-800">Nota de resolução</h3>
              <p className="mt-1 whitespace-pre-wrap text-sm text-emerald-700">
                {ticket.resolution_note}
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <Info label="Solicitante" value={ticket.requester_name} />
            <Info label="Aberto em" value={formatDate(ticket.created_at)} />
            <Info label="Filial" value={ticket.branch} />
            <Info label="Setor" value={ticket.sector} />
            <div className="mb-4">
              <div className="text-xs text-muted-foreground">Prioridade</div>
              <div className="mt-1.5">
                <TicketPriorityBadge priority={ticket.priority} />
              </div>
            </div>
            <Info label="Atribuído a" value={ticket.assigned_to_name ?? "Ninguém ainda"} />
          </div>

          <TicketDetailForm ticket={ticket} />
        </aside>
      </div>
    </div>
  );
}
