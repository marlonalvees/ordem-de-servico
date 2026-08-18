export interface HubPermission {
  module_id: number;
  module_name: string;
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

export function isAdmin(session: HubSession | null): boolean {
  return session?.role === "admin";
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
