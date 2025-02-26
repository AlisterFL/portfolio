import type { Metadata } from "next";
import { Anek_Telugu } from "next/font/google";
import { Bokor } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { LanguageProvider } from "../context/LanguageContext";

const BokorFont = Bokor({
  subsets: ["latin"],
  weight: "400"
});

const AnekTelugu = Anek_Telugu({
  variable: "--font-caption",
  subsets: ["latin"],
});;

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
    <html lang="en">
      <body className={`${GeistSans.variable} ${AnekTelugu.variable} ${BokorFont.className}antialiased h-full bg-[#121212] mx-4`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
