import { TICKET_STATUS_LABELS, TicketStatus } from "@/types/ticket";

const STYLES: Record<TicketStatus, string> = {
  aberto: "bg-amber-100 text-amber-800",
  em_atendimento: "bg-blue-100 text-blue-800",
  resolvido: "bg-green-100 text-green-800",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}>
      {TICKET_STATUS_LABELS[status]}
    </span>
  );
}
