import { assignTicketToMe, updateTicketStatus } from "@/actions/tickets";
import { TICKET_STATUS_LABELS, Ticket, TicketStatus } from "@/types/ticket";

const STATUSES = Object.keys(TICKET_STATUS_LABELS) as TicketStatus[];

export function TicketDetailForm({ ticket }: { ticket: Ticket }) {
  const boundAssign = assignTicketToMe.bind(null, ticket.id);
  const boundUpdate = updateTicketStatus.bind(null, ticket.id);

  return (
    <div className="space-y-6">
      {!ticket.assigned_to_user_id && (
        <form action={boundAssign}>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Assumir para mim
          </button>
        </form>
      )}

      <form action={boundUpdate} className="space-y-4 rounded-md border border-gray-200 p-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={ticket.status}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {TICKET_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="resolution_note" className="block text-sm font-medium text-gray-700">
            Nota de resolução {" "}
            <span className="font-normal text-gray-500">(obrigatória para marcar como Resolvido)</span>
          </label>
          <textarea
            id="resolution_note"
            name="resolution_note"
            rows={4}
            defaultValue={ticket.resolution_note ?? ""}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
