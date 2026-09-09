import Link from "next/link";
import { Headphones } from "lucide-react";
import { getHubBaseUrl } from "@/lib/hub-auth";
import { initials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SiteHeader({
  userName,
  current,
}: {
  userName: string;
  current: "abrir" | "meus";
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Headphones size={18} />
          </span>
          <span className="hidden sm:inline">Chamados T.I.</span>
        </Link>

        <nav className="ml-2 flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className={`rounded-lg px-3 py-1.5 ${
              current === "abrir"
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            Abrir chamado
          </Link>
          <Link
            href="/meus-chamados"
            className={`rounded-lg px-3 py-1.5 ${
              current === "meus"
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            Meus chamados
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href={getHubBaseUrl()}
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            Voltar ao hub
          </a>
          <Avatar>
            <AvatarFallback>{initials(userName)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
