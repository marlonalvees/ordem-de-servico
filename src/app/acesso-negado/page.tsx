import { ShieldAlert } from "lucide-react";
import { getHubBaseUrl } from "@/lib/hub-auth";
import { Button } from "@/components/ui/button";

export default function AcessoNegadoPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-amber-50 text-amber-600">
        <ShieldAlert size={28} />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Acesso restrito</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Você não tem permissão liberada para este módulo. Se você acha que deveria ter acesso, fale com o time de
        T.I.
      </p>
      <Button asChild className="mt-8">
        <a href={getHubBaseUrl()}>Voltar ao hub</a>
      </Button>
    </main>
  );
}
