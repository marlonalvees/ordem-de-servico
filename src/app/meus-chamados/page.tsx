import Link from "next/link";
import { requireHubSession } from "@/lib/hub-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { TicketList } from "@/components/TicketList";
import { Ticket } from "@/types/ticket";

export default async function MeusChamadosPage() {
  const session = await requireHubSession();

  const { data, error } = await getSupabaseAdmin()
    .from("tickets")
    .select("*")
    .eq("requester_user_id", session.userId)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Meus chamados</h1>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          Abrir novo chamado
        </Link>
      </div>

      <div className="mt-8">
        {error ? (
          <p className="text-sm text-red-600">Erro ao carregar chamados: {error.message}</p>
        ) : (
          <TicketList tickets={(data ?? []) as Ticket[]} linkToDetail={false} />
        )}
      </div>
    </main>
  );
}
