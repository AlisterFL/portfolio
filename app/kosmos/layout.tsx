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
  openGraph: {
    title: "Kosmos Ieper — Restaurant & Tapas Bar",
    description:
      "Kwalitatieve verse tapas met Spaanse en Italiaanse specialiteiten, zelf gemaakte cocktails en een unieke sfeer op de Grote Markt van Ieper.",
    images: [
      {
        url: "https://primary.jwwb.nl/public/l/t/s/temp-jwqgqkdwmrnrolcreinv/sero6u/restaurant-kosmos-ieper-1.png",
        width: 1200,
        height: 630,
        alt: "Restaurant Kosmos Ieper",
      },
    ],
    locale: "nl_BE",
    type: "website",
  },
};

export default function KosmosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} min-h-screen scroll-smooth bg-[#faf9f6] text-[#1a1a1a]`}>
      {children}
    </div>
  );
}
