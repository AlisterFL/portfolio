import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Kosmos Ieper — Restaurant & Tapas Bar",
  description:
    "Ooit een reisbureau, nu een hippe tapastent op de Grote Markt van Ieper. Tapas, cocktails & meer.",
};

export default function KosmosSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} min-h-screen bg-[#faf9f6] text-[#1a1a1a]`}>
      {children}
    </div>
  );
}
