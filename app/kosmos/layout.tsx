// app/kosmos/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kosmos Ieper — Menu",
  description: "Carte du Restaurant-Eetcafé Kosmos, Grote Markt 26, Ieper. Tapas, cocktails & more.",
};

export default function KosmosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {children}
    </div>
  );
}
