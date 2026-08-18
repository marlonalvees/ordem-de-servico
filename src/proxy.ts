import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { HUB_TOKEN_COOKIE, parseHubPayload } from "@/types/hub-session";

// Next.js 16 renomeou middleware.ts -> proxy.ts (função `middleware` -> `proxy`).
// Proxy roda em runtime Node.js por padrão, então dá pra usar `jsonwebtoken`
// diretamente aqui, sem precisar de uma variante compatível com Edge Runtime.
export function proxy(request: NextRequest) {
  const token = request.cookies.get(HUB_TOKEN_COOKIE)?.value;
  const session = verifyToken(token);

  if (!session) {
    const hubLoginUrl = process.env.HUB_LOGIN_URL ?? "https://lojanovamix.com.br/login";
    const redirectUrl = new URL(hubLoginUrl);
    redirectUrl.searchParams.set("redirect", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (request.nextUrl.pathname.startsWith("/painel") && session.role !== "admin") {
    return NextResponse.redirect(new URL("/acesso-negado", request.url));
  }

  return NextResponse.next();
}

function verifyToken(token: string | undefined) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as Record<string, unknown>;
    return parseHubPayload(payload);
  } catch {
    return null;
  }
}

export const config = {
  matcher: ["/", "/painel/:path*"],
};
