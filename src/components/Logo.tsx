import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? "py-3" : "px-6 py-6"}`}>
      <Image
        src="/logo-novamix.jpeg"
        alt="Novamix"
        width={compact ? 40 : 96}
        height={compact ? 40 : 96}
        className="rounded-lg bg-white"
        priority
      />
    </div>
  );
}
