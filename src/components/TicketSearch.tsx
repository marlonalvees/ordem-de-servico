"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TicketList } from "@/components/TicketList";
import { Ticket } from "@/types/ticket";

export function TicketSearch({ tickets }: { tickets: Ticket[] }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tickets;
    return tickets.filter((ticket) =>
      `${ticket.id} ${ticket.description} ${ticket.branch} ${ticket.sector}`
        .toLowerCase()
        .includes(q)
    );
  }, [tickets, query]);

  return (
    <div>
      <div className="relative mb-4 max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar chamado"
          className="pl-9"
        />
      </div>
      <TicketList tickets={visible} linkToDetail={false} />
    </div>
  );
}
