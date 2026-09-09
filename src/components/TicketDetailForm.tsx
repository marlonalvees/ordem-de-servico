import { assignTicketToMe, updateTicketStatus } from "@/actions/tickets";
import { TICKET_STATUS_LABELS, Ticket, TicketStatus } from "@/types/ticket";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";

const STATUSES = Object.keys(TICKET_STATUS_LABELS) as TicketStatus[];

export function TicketDetailForm({ ticket }: { ticket: Ticket }) {
  const boundAssign = assignTicketToMe.bind(null, ticket.id);
  const boundUpdate = updateTicketStatus.bind(null, ticket.id);

  return (
    <div className="space-y-4">
      {!ticket.assigned_to_user_id && (
        <form action={boundAssign}>
          <Button type="submit" className="w-full">
            Assumir para mim
          </Button>
        </form>
      )}

      <form
        action={boundUpdate}
        className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
      >
        <div>
          <Label htmlFor="status">Status</Label>
          <div className="mt-1.5">
            <NativeSelect id="status" name="status" defaultValue={ticket.status}>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {TICKET_STATUS_LABELS[status]}
                </option>
              ))}
            </NativeSelect>
          </div>
        </div>

        <div>
          <Label htmlFor="resolution_note">
            Nota de resolução{" "}
            <span className="font-normal text-muted-foreground">(obrigatória para Resolvido)</span>
          </Label>
          <Textarea
            id="resolution_note"
            name="resolution_note"
            rows={4}
            defaultValue={ticket.resolution_note ?? ""}
            className="mt-1.5"
          />
        </div>

        <Button type="submit" variant="secondary" className="w-full">
          Salvar alterações
        </Button>
      </form>
    </div>
  );
}
