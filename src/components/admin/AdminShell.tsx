import { LogOut } from "lucide-react";
import { getHubBaseUrl } from "@/lib/hub-auth";
import { Logo } from "@/components/Logo";
import { AdminNav } from "./AdminNav";

export function AdminShell({
  userName,
  children,
}: {
  userName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-white lg:flex">
        <Logo compact />

        <AdminNav />

        <a
          href={getHubBaseUrl()}
          className="mx-4 mb-6 mt-auto flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-destructive/90"
        >
          <LogOut size={16} />
          Voltar ao hub
        </a>
      </aside>

      <header className="flex h-16 w-full items-center gap-3 border-b border-border bg-white px-4 lg:hidden">
        <Logo compact />
        <span className="font-semibold text-foreground">{userName}</span>
        <a href={getHubBaseUrl()} className="ml-auto text-sm font-semibold text-destructive">
          Sair
        </a>
      </header>

      <div className="flex w-full flex-col lg:ml-64">
        <AdminNav variant="mobile" />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
