import { Headphones } from "lucide-react";
import { getHubBaseUrl } from "@/lib/hub-auth";
import { initials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AdminNav } from "./AdminNav";

export function AdminShell({
  userName,
  children,
}: {
  userName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col border-r border-primary bg-primary text-white lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-white/20 px-5">
          <span className="grid size-9 place-items-center rounded-xl bg-white text-primary">
            <Headphones size={18} />
          </span>
          <div className="text-sm font-bold leading-tight">
            Chamados
            <br />
            de T.I.
          </div>
        </div>

        <AdminNav />

        <div className="mx-4 mt-auto mb-4 rounded-2xl bg-white/15 p-3">
          <div className="flex items-center gap-2.5">
            <Avatar>
              <AvatarFallback className="bg-white font-bold text-primary">
                {initials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{userName}</div>
              <a href={getHubBaseUrl()} className="text-xs text-white/75 hover:underline">
                Voltar ao hub
              </a>
            </div>
          </div>
        </div>
      </aside>

      <header className="flex h-16 items-center gap-3 border-b border-border bg-white px-4 lg:hidden">
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Headphones size={18} />
        </span>
        <span className="font-bold text-foreground">Chamados de T.I.</span>
        <a href={getHubBaseUrl()} className="ml-auto text-sm text-primary hover:underline">
          Hub
        </a>
      </header>
      <AdminNav variant="mobile" />

      <main className="lg:ml-[240px]">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
      </main>
    </div>
  );
}
