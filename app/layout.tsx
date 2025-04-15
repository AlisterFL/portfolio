import type { Metadata } from "next";
import "./globals.css";

import { LanguageProvider } from "../context/LanguageContext";


export const metadata: Metadata = {
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`h-full bg-[#121212]`}>
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
                image: 'https://alisterflandrinck.com/images/alister.jpeg',
              }),
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}