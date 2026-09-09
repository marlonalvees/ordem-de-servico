import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chamados T.I. — Novamix",
  description: "Sistema de abertura e gestão de chamados de T.I. da Novamix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
