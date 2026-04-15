import type { Metadata } from "next";
import { Playfair_Display, Sora } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "JACQUEMARS Immobilier — Achat, Vente & Location | Lille",
  description:
    "L'art de l'immobilier lillois. Achat, vente et location de bel immobilier a Lille et sa metropole. Estimation gratuite.",
};

export default function JacquemarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${sora.variable} min-h-screen`}
      style={{
        "--jqm-burgundy": "#601f27",
        "--jqm-burgundy-light": "#872b37",
        "--jqm-gold": "#c9a84c",
        "--jqm-cream": "#faf6f0",
        "--jqm-noir": "#1a1215",
        "--jqm-gris": "#6b5e62",
        "--jqm-blanc": "#fefcfa",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
