export interface HubPermission {
  module: string;
  access: string;
}

export interface HubBranch {
  id: number;
  name: string;
}

export interface HubSession {
  userId: number;
  role: string;
  permissions: HubPermission[];
  branchs: HubBranch[];
}

export const HUB_TOKEN_COOKIE = "token";

// Slug do módulo deste app no hub — usado para achar a permissão certa
// dentro de session.permissions (um usuário pode ter acesso a vários módulos).
export const OS_MODULE_SLUG = "os";

const ADMIN_ACCESS = "admin";

// Acesso ao /painel é por permissão do módulo "os", não pelo role global do
// hub (um mesmo usuário pode ser admin de outro módulo e não deste).
export function isAdmin(session: HubSession | null): boolean {
  return (
    session?.permissions.find((p) => p.module === OS_MODULE_SLUG)?.access ===
    ADMIN_ACCESS
  );
}

// Qualquer acesso ao módulo "os" (slug "admin" ou "user") — sem isso o
// usuário não usa este app de forma alguma, nem pra abrir chamado.
export function hasOsAccess(session: HubSession | null): boolean {
  return session?.permissions.some((p) => p.module === OS_MODULE_SLUG) ?? false;
}

export function parseHubPayload(payload: Record<string, unknown>): HubSession {
  return {
    userId: Number(payload.sub),
    role: String(payload.role ?? ""),
    permissions: Array.isArray(payload.permissions)
      ? (payload.permissions as HubPermission[])
      : [],
    branchs: Array.isArray(payload.branchs)
      ? (payload.branchs as HubBranch[])
      : [],
  };
}
