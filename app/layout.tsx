import type { Metadata } from "next";
import "./globals.css";

import { LanguageProvider } from "../context/LanguageContext";

export const metadata: Metadata = {
  title: "Alister Flandrinck · Developer",
  description: "Créateur de site web pour entreprise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`h-full bg-[#121212]`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
