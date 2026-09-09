import { TICKET_STATUS_LABELS, TicketStatus } from "@/types/ticket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";

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
    <form
      method="get"
      action="/painel"
      className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="w-40">
        <Label htmlFor="status" className="text-xs text-muted-foreground">
          Status
        </Label>
        <div className="mt-1.5">
          <NativeSelect id="status" name="status" defaultValue={status ?? ""} size="sm">
            <option value="">Todos</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {TICKET_STATUS_LABELS[s]}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div className="w-40">
        <Label htmlFor="branch" className="text-xs text-muted-foreground">
          Filial
        </Label>
        <Input id="branch" name="branch" type="text" defaultValue={branch ?? ""} className="mt-1.5 h-8" />
      </div>

      <div className="w-40">
        <Label htmlFor="sector" className="text-xs text-muted-foreground">
          Setor
        </Label>
        <Input id="sector" name="sector" type="text" defaultValue={sector ?? ""} className="mt-1.5 h-8" />
      </div>

      <Button type="submit" size="sm">
        Filtrar
      </Button>
      <a href="/painel" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
        Limpar
      </a>
    </form>
  );
}
