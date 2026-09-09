import "server-only";
import { cookies } from "next/headers";
import { HUB_TOKEN_COOKIE, HubSession } from "@/types/hub-session";

// Busca o nome real do usuário logado via GET /users/me do hub, repassando
// o mesmo token da sessão atual como Bearer. Se HUB_API_URL não estiver
// configurada ou a chamada falhar, retorna null e quem chamou deve cair
// para um fallback (ex.: "Usuário #<id>").
export async function fetchHubUserName(): Promise<string | null> {
  const apiUrl = process.env.HUB_API_URL;
  if (!apiUrl) return null;

  const store = await cookies();
  const token = store.get(HUB_TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { name?: string };
    return data.name ?? null;
  } catch {
    return null;
  }
}

// Nome real do hub quando disponível, senão um fallback estável a partir do id.
export async function resolveDisplayName(session: HubSession): Promise<string> {
  return (await fetchHubUserName()) ?? `Usuário #${session.userId}`;
}
