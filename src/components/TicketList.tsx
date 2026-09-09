import Link from "next/link";
import { TICKET_CATEGORY_LABELS, Ticket } from "@/types/ticket";
import { TicketStatusBadge, TicketPriorityBadge } from "./TicketBadges";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR");
}

export function TicketList({
  tickets,
  linkToDetail = true,
}: {
  tickets: Ticket[];
  linkToDetail?: boolean;
}) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        Nenhum chamado encontrado.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead className="bg-muted text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Data</th>
              <th className="px-5 py-3">Solicitante</th>
              <th className="px-5 py-3">Filial / Setor</th>
              <th className="px-5 py-3">Categoria</th>
              <th className="px-5 py-3">Prioridade</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Atribuído a</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-accent/40">
                <td className="px-5 py-4 whitespace-nowrap">
                  {linkToDetail ? (
                    <Link href={`/painel/${ticket.id}`} className="font-medium text-primary hover:underline">
                      {formatDate(ticket.created_at)}
                    </Link>
                  ) : (
                    formatDate(ticket.created_at)
                  )}
                </td>
                <td className="px-5 py-4">{ticket.requester_name}</td>
                <td className="px-5 py-4">
                  <div>{ticket.branch}</div>
                  <div className="text-xs text-muted-foreground">{ticket.sector}</div>
                </td>
                <td className="px-5 py-4">{TICKET_CATEGORY_LABELS[ticket.category]}</td>
                <td className="px-5 py-4">
                  <TicketPriorityBadge priority={ticket.priority} />
                </td>
                <td className="px-5 py-4">
                  <TicketStatusBadge status={ticket.status} />
                </td>
                <td className="px-5 py-4">{ticket.assigned_to_name ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
