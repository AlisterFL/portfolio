import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "TERRA — Semences & Solutions Agricoles",
  description:
    "Enracinés dans l'excellence. Semences, protection des cultures et nutrition des sols depuis 1987.",
};

export default function TerraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} min-h-screen bg-[#f5f0e8] text-[#2c1810]`}>
      {children}
    </div>
  );
}
