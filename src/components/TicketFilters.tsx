import { TICKET_STATUS_LABELS, TicketStatus } from "@/types/ticket";

const STATUSES = Object.keys(TICKET_STATUS_LABELS) as TicketStatus[];

export function TicketFilters({
  status,
  branch,
  sector,
}: {
  status?: string;
  branch?: string;
  sector?: string;
}) {
  return (
    <form method="get" action="/painel" className="mb-6 flex flex-wrap items-end gap-3">
      <div>
        <label htmlFor="status" className="block text-xs font-medium text-gray-600">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status ?? ""}
          className="mt-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        >
          <option value="">Todos</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {TICKET_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="branch" className="block text-xs font-medium text-gray-600">
          Filial
        </label>
        <input
          id="branch"
          name="branch"
          type="text"
          defaultValue={branch ?? ""}
          className="mt-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        />
      </div>

      <div>
        <label htmlFor="sector" className="block text-xs font-medium text-gray-600">
          Setor
        </label>
        <input
          id="sector"
          name="sector"
          type="text"
          defaultValue={sector ?? ""}
          className="mt-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-gray-800 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-900"
      >
        Filtrar
      </button>
      <a href="/painel" className="text-sm text-gray-500 hover:underline">
        Limpar
      </a>
    </form>
  );
}
