import { createTicket } from "@/actions/tickets";
import {
  TICKET_CATEGORY_LABELS,
  TICKET_PRIORITY_LABELS,
  TicketCategory,
  TicketPriority,
} from "@/types/ticket";
import { HubBranch } from "@/types/hub-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";

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
        <Label>Abrindo como</Label>
        <p className="mt-1.5 rounded-md border border-input bg-muted px-3 py-2 text-sm text-foreground">
          {requesterName}
        </p>
      </div>

      <div>
        <Label htmlFor="branch">Filial</Label>
        <div className="mt-1.5">
          {branchs.length > 0 ? (
            <NativeSelect
              id="branch"
              name="branch"
              required
              defaultValue={branchs.length === 1 ? branchs[0].name : ""}
            >
              <option value="" disabled>
                Selecione a filial
              </option>
              {branchs.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </NativeSelect>
          ) : (
            <Input id="branch" name="branch" type="text" required />
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="sector">Setor</Label>
        <Input id="sector" name="sector" type="text" required className="mt-1.5" />
      </div>

      <div>
        <Label htmlFor="category">Categoria</Label>
        <div className="mt-1.5">
          <NativeSelect id="category" name="category" required defaultValue="">
            <option value="" disabled>
              Selecione a categoria
            </option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {TICKET_CATEGORY_LABELS[category]}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div>
        <Label htmlFor="priority">Prioridade</Label>
        <div className="mt-1.5">
          <NativeSelect id="priority" name="priority" defaultValue="normal">
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {TICKET_PRIORITY_LABELS[priority]}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descreva o problema</Label>
        <Textarea id="description" name="description" required rows={5} className="mt-1.5" />
      </div>

      <Button type="submit" className="w-full">
        Abrir chamado
      </Button>
    </form>
  );
}
