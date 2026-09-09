import { getHubSession } from "@/lib/hub-auth";
import { resolveDisplayName } from "@/lib/hub-users";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getHubSession();
  const name = session ? await resolveDisplayName(session) : "—";

  return <AdminShell userName={name}>{children}</AdminShell>;
}
