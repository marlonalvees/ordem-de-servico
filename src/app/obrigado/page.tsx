import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 size={28} />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Chamado registrado!</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sua solicitação foi enviada para a equipe de T.I.
      </p>
      {id && (
        <p className="mt-4 text-xs text-muted-foreground">
          Protocolo: <span className="font-mono">{id}</span>
        </p>
      )}
      <Button asChild className="mt-8">
        <a href="/">Abrir outro chamado</a>
      </Button>
    </main>
  );
}
