import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kosmos Ieper — Menu",
  description: "Carte du Restaurant-Eetcafe Kosmos, Grote Markt 26, Ieper. Tapas, cocktails & more.",
};

export default function KosmosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
