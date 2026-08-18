export type TicketStatus = "aberto" | "em_atendimento" | "resolvido";

export type TicketCategory =
  | "impressora"
  | "rede"
  | "sistema"
  | "acesso"
  | "outro";

export type TicketPriority = "baixa" | "normal" | "alta";

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  aberto: "Aberto",
  em_atendimento: "Em Atendimento",
  resolvido: "Resolvido",
};

export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  impressora: "Impressora",
  rede: "Rede",
  sistema: "Sistema",
  acesso: "Acesso",
  outro: "Outro",
};

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  baixa: "Baixa",
  normal: "Normal",
  alta: "Alta",
};

export interface Ticket {
  id: string;
  created_at: string;
  updated_at: string;
  requester_user_id: number;
  requester_name: string;
  branch: string;
  sector: string;
  category: TicketCategory;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assigned_to_user_id: number | null;
  assigned_to_name: string | null;
  resolution_note: string | null;
  resolved_at: string | null;
}
