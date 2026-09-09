import "server-only";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {
  HUB_TOKEN_COOKIE,
  HubSession,
  isAdmin,
  parseHubPayload,
} from "@/types/hub-session";

// Usado em Server Components e Server Actions. A verificação de sessão no
// proxy.ts (raiz do projeto) duplica essa lógica localmente — ver comentário
// lá — porque o Next.js recomenda não depender de módulos compartilhados no
// Proxy por questões de deploy/otimização.
export async function getHubSession(): Promise<HubSession | null> {
  const store = await cookies();
  const token = store.get(HUB_TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as Record<
      string,
      unknown
    >;
    return parseHubPayload(payload);
  } catch {
    return null;
  }
}

export async function requireHubSession(): Promise<HubSession> {
  const session = await getHubSession();
  if (!session) {
    throw new Error("Sessão do hub ausente ou inválida.");
  }
  return session;
}

export async function requireAdminSession(): Promise<HubSession> {
  const session = await requireHubSession();
  if (!isAdmin(session)) {
    throw new Error("Usuário não tem permissão de T.I. para essa ação.");
  }
  return session;
}

export function getHubBaseUrl(): string {
  return (process.env.HUB_LOGIN_URL ?? "https://hub.lojanovamix.com.br/login").replace(
    /\/login\/?$/,
    ""
  );
}
