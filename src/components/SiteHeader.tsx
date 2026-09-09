import Link from "next/link";
import { LogOut } from "lucide-react";
import { getHubBaseUrl } from "@/lib/hub-auth";
import { initials } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SiteHeader({
  userName,
  current,
}: {
  userName: string;
  current: "abrir" | "meus";
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-2 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo compact />
          <span className="hidden font-semibold text-foreground sm:inline">Chamados T.I.</span>
        </Link>

        <nav className="ml-2 flex items-center gap-1 text-sm font-semibold">
          <Link
            href="/"
            className={`rounded-lg px-3 py-1.5 ${
              current === "abrir"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
            }`}
          >
            Abrir chamado
          </Link>
          <Link
            href="/meus-chamados"
            className={`rounded-lg px-3 py-1.5 ${
              current === "meus"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
            }`}
          >
            Meus chamados
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-accent text-accent-foreground">
              {initials(userName)}
            </AvatarFallback>
          </Avatar>
          <a
            href={getHubBaseUrl()}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-destructive hover:bg-destructive/10"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Voltar ao hub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
