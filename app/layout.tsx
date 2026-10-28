import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL('https://alisterflandrinck.com'),
  title: "Alister Flandrinck · Développeur Web",
  description: "Portfolio de Alister Flandrinck, développeur web spécialisé en React, Next.js et applications modernes. Création de sites web performants et applications web sur mesure pour entreprises.",
  keywords: ["développeur web", "react", "next.js", "front-end", "développeur javascript", "création site web", "application web", "portfolio développeur"],
  authors: [{ name: "Alister Flandrinck" }],
  creator: "Alister Flandrinck",
  publisher: "Alister Flandrinck",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://alisterflandrinck.com',
    siteName: 'Alister Flandrinck - Développeur Web',
    title: 'Alister Flandrinck · Développeur Web',
    description: 'Portfolio de Alister Flandrinck, développeur web spécialisé en React, Next.js et applications modernes.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alister Flandrinck - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alister Flandrinck · Développeur Web',
    description: 'Portfolio de Alister Flandrinck, développeur web spécialisé en React, Next.js et applications modernes.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alisterflandrinck.com',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification=3x2CZXnuR6Xb3erUezaSqwtBrxM7OMF1uft0n-q1SxQ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr">
      <body className={`${inter.variable} ${geist.variable} ${bricolage.variable} ${instrumentSerif.variable} font-sans h-full bg-[#121212]`}>
        <LanguageProvider>
          {/* Structure sémantique pour améliorer le SEO */}
          <main>
            {children}
          </main>
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Alister Flandrinck',
                url: 'https://alisterflandrinck.com',
                jobTitle: 'Développeur Web',
                knowsAbout: ['React', 'Next.js', 'JavaScript', 'Front-end Development'],
                sameAs: [
                  'https://github.com/AlisterFL',
                  'https://linkedin.com/in/alisterflandrinck',
                ],
                image: 'https://alisterflandrinck.com/images/alisterface1.png',
              }),
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}