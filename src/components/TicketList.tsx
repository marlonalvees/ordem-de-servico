import Link from "next/link";
import { TICKET_CATEGORY_LABELS, Ticket } from "@/types/ticket";
import { TicketStatusBadge } from "./TicketStatusBadge";

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
    return <p className="text-sm text-gray-500">Nenhum chamado encontrado.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Data</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Solicitante</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Filial</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Setor</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Categoria</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Atribuído a</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {linkToDetail ? (
                  <Link href={`/painel/${ticket.id}`} className="text-blue-600 hover:underline">
                    {formatDate(ticket.created_at)}
                  </Link>
                ) : (
                  formatDate(ticket.created_at)
                )}
              </td>
              <td className="px-4 py-2">{ticket.requester_name}</td>
              <td className="px-4 py-2">{ticket.branch}</td>
              <td className="px-4 py-2">{ticket.sector}</td>
              <td className="px-4 py-2">{TICKET_CATEGORY_LABELS[ticket.category]}</td>
              <td className="px-4 py-2">
                <TicketStatusBadge status={ticket.status} />
              </td>
              <td className="px-4 py-2">{ticket.assigned_to_name ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
