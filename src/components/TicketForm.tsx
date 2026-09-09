import { createTicket } from "@/actions/tickets";
import {
  TICKET_CATEGORY_LABELS,
  TICKET_PRIORITY_LABELS,
  TicketCategory,
  TicketPriority,
} from "@/types/ticket";
import { HubBranch } from "@/types/hub-session";

const CATEGORIES = Object.keys(TICKET_CATEGORY_LABELS) as TicketCategory[];
const PRIORITIES = Object.keys(TICKET_PRIORITY_LABELS) as TicketPriority[];

export function TicketForm({
  branchs,
  requesterName,
}: {
  branchs: HubBranch[];
  requesterName: string;
}) {
  return (
    <form action={createTicket} className="space-y-5">
      <div>
        <span className="block text-sm font-medium text-gray-700">Abrindo como</span>
        <p className="mt-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700">
          {requesterName}
        </p>
      </div>

      <div>
        <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
          Filial
        </label>
        {branchs.length > 0 ? (
          <select
            id="branch"
            name="branch"
            required
            defaultValue={branchs.length === 1 ? branchs[0].name : ""}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecione a filial
            </option>
            {branchs.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            id="branch"
            name="branch"
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        )}
      </div>

      <div>
        <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
          Setor
        </label>
        <input
          id="sector"
          name="sector"
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="" disabled>
            Selecione a categoria
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {TICKET_CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Prioridade
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue="normal"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {TICKET_PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descreva o problema
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
      >
        Abrir chamado
      </button>
    </form>
  );
}
