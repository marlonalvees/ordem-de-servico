import { Badge } from "@/components/ui/badge";
import {
  TICKET_STATUS_LABELS,
  TICKET_PRIORITY_LABELS,
  TicketStatus,
  TicketPriority,
} from "@/types/ticket";

const STATUS_CLASSES: Record<TicketStatus, string> = {
  aberto: "border-amber-200 bg-amber-50 text-amber-700",
  em_atendimento: "border-blue-200 bg-blue-50 text-blue-700",
  resolvido: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const PRIORITY_CLASSES: Record<TicketPriority, string> = {
  alta: "border-rose-200 bg-rose-50 text-rose-700",
  normal: "border-amber-200 bg-amber-50 text-amber-700",
  baixa: "border-slate-200 bg-slate-100 text-slate-600",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return (
    <Badge variant="outline" className={STATUS_CLASSES[status]}>
      {TICKET_STATUS_LABELS[status]}
    </Badge>
  );
}

export function TicketPriorityBadge({ priority }: { priority: TicketPriority }) {
  return (
    <Badge variant="outline" className={PRIORITY_CLASSES[priority]}>
      {TICKET_PRIORITY_LABELS[priority]}
    </Badge>
  );
}
