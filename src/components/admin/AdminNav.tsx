"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Inbox, Clock3, CheckCircle2, LayoutDashboard, type LucideIcon } from "lucide-react";

const ITEMS: { label: string; href: string; status?: string; icon: LucideIcon }[] = [
  { label: "Visão geral", href: "/painel", icon: LayoutDashboard },
  { label: "Abertos", href: "/painel?status=aberto", status: "aberto", icon: Inbox },
  { label: "Em atendimento", href: "/painel?status=em_atendimento", status: "em_atendimento", icon: Clock3 },
  { label: "Resolvidos", href: "/painel?status=resolvido", status: "resolvido", icon: CheckCircle2 },
];

export function AdminNav({ variant = "sidebar" }: { variant?: "sidebar" | "mobile" }) {
  const pathname = usePathname();
  const status = useSearchParams().get("status") ?? "";

  if (variant === "mobile") {
    return (
      <nav className="flex gap-2 overflow-x-auto border-b border-border bg-white px-4 py-2 lg:hidden">
        {ITEMS.map((item) => {
          const active = pathname === "/painel" && status === (item.status ?? "");
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="space-y-1 p-4">
      {ITEMS.map((item) => {
        const active = pathname === "/painel" && status === (item.status ?? "");
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
              active ? "bg-white text-primary shadow-sm" : "text-white/90 hover:bg-white/15"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
