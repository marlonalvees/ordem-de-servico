import type { LucideIcon } from "lucide-react";

const TONE_CLASSES = {
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  teal: "bg-teal/10 text-teal",
  green: "bg-emerald-50 text-emerald-700",
} as const;

export function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tone: keyof typeof TONE_CLASSES;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`grid size-11 place-items-center rounded-xl ${TONE_CLASSES[tone]}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}
