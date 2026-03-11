import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

import { TopBar } from '@/components/layout';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { CookieBanner } from '@/components/layout';
import { WhatsAppFloat, ScrollToTop } from '@/components/ui';
import GoogleTranslateInit from '@/components/GoogleTranslateInit';
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
  title: 'Farmacia Mozart | Salute, Benessere e Cosmetica — Pioltello',
  description:
    'Farmacia Mozart a Pioltello: farmaci, cosmetica naturale, prodotti veterinari e consulenza personalizzata. Contattaci su WhatsApp per risposte rapide.',
  keywords: [
    'farmacia pioltello',
    'farmacia mozart',
    'via mozart pioltello',
    'cosmetica naturale',
    'prodotti veterinari',
    'integratori',
  ],
  openGraph: {
    title: 'Farmacia Mozart | Pioltello',
    description: 'La tua salute, la nostra missione. Da oltre 30 anni a Pioltello.',
    type: 'website',
    locale: 'it_IT',
  },
  robots: { index: true, follow: true },
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
      </body>
    </html>
  );
}
