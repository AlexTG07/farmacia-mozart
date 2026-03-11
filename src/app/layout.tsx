import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

import { TopBar } from '@/components/layout';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { CookieBanner } from '@/components/layout';
import { WhatsAppFloat, ScrollToTop } from '@/components/ui';
import GoogleTranslateInit from '@/components/GoogleTranslateInit';
import JsonLd from '@/components/seo/JsonLd';
import { getOffers, getProducts } from '@/lib/sanity/queries';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.farmaciamozart.com'),
  title: {
    default: 'Farmacia Mozart | Farmacia a Pioltello — Salute, Benessere e Cosmetica',
    template: '%s | Farmacia Mozart Pioltello',
  },
  description:
    'Farmacia Mozart a Pioltello (MI): farmaci con e senza ricetta, cosmetica naturale e biologica, prodotti veterinari, integratori e consulenza personalizzata. Aperti Lun-Sab 8:00-20:30, Dom 9:00-20:00. Contattaci su WhatsApp.',
  keywords: [
    'farmacia pioltello',
    'farmacia mozart',
    'farmacia mozart pioltello',
    'farmacia via mozart pioltello',
    'farmaci pioltello',
    'cosmetica naturale pioltello',
    'prodotti veterinari pioltello',
    'integratori pioltello',
    'parafarmacia pioltello',
    'farmacia aperta domenica pioltello',
  ],
  authors: [{ name: 'Farmacia Mozart' }],
  creator: 'Farmacia Mozart',
  publisher: 'Farmacia Mozart',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Farmacia Mozart | Farmacia a Pioltello',
    description: 'Da oltre 30 anni il punto di riferimento per salute, benessere e cosmetica a Pioltello. Farmaci, cosmetica naturale, veterinaria e consulenza.',
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.farmaciamozart.com',
    siteName: 'Farmacia Mozart',
    images: [
      {
        url: '/img/logo.png',
        width: 400,
        height: 400,
        alt: 'Farmacia Mozart Pioltello',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Farmacia Mozart | Farmacia a Pioltello',
    description: 'Farmaci, cosmetica naturale, veterinaria e consulenza personalizzata. Aperti anche la domenica.',
    images: ['/img/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'INSERISCI_QUI_IL_CODICE_GOOGLE_SEARCH_CONSOLE',
  },
  category: 'health',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [offers, products] = await Promise.all([
    getOffers().catch(() => []),
    getProducts().catch(() => []),
  ]);

  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Vai al contenuto principale
        </a>
        <TopBar />
        <Header hasOffers={offers.length > 0} hasProducts={products.length > 0} />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollToTop />
        <CookieBanner />
        <GoogleTranslateInit />
        <Analytics />
      </body>
    </html>
  );
}
