import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { TicketDetailForm } from "@/components/TicketDetailForm";
import { TicketStatusBadge } from "@/components/TicketStatusBadge";
import { TICKET_CATEGORY_LABELS, TICKET_PRIORITY_LABELS, Ticket } from "@/types/ticket";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR");
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
      <Link href="/painel" className="text-sm text-blue-600 hover:underline">
        ← Voltar para a lista
      </Link>

      <div className="mt-4 flex items-start justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Chamado #{ticket.id.slice(0, 8)}</h1>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-md border border-gray-200 bg-white p-4 text-sm">
        <div>
          <dt className="text-gray-500">Solicitante</dt>
          <dd className="font-medium">{ticket.requester_name}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Aberto em</dt>
          <dd className="font-medium">{formatDate(ticket.created_at)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Filial</dt>
          <dd className="font-medium">{ticket.branch}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Setor</dt>
          <dd className="font-medium">{ticket.sector}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Categoria</dt>
          <dd className="font-medium">{TICKET_CATEGORY_LABELS[ticket.category]}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Prioridade</dt>
          <dd className="font-medium">{TICKET_PRIORITY_LABELS[ticket.priority]}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Atribuído a</dt>
          <dd className="font-medium">{ticket.assigned_to_name ?? "Ninguém ainda"}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-gray-500">Descrição</dt>
          <dd className="mt-1 whitespace-pre-wrap font-medium">{ticket.description}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <TicketDetailForm ticket={ticket} />
      </div>
    </div>
  );
}
