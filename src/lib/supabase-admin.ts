import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Client com a service_role key — bypassa RLS. Uso exclusivo em Server
// Components, Server Actions e Route Handlers. NUNCA importar este módulo
// em um arquivo "use client".
//
// Criado sob demanda (não no escopo do módulo) para não quebrar o build
// quando as variáveis de ambiente do Supabase ainda não estão configuradas
// (ex.: coleta de dados de página do `next build` antes do deploy real).
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }
  return client;
}
