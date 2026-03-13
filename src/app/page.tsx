export const revalidate = 60;

import {
  HeroSection,
  ServicesGrid,
  OffersSection,
  CatalogSection,
  GallerySection,
  WhyUsSection,
  FAQSection,
  ReviewsSection,
  HoursMapSection,
  ContactSection,
  ParallaxDivider,
  VolantiniSection,
} from '@/components/sections';
import { getOffers, getProducts, getCategories, getFlyers } from '@/lib/sanity/queries';

export default async function Home() {
  const [offers, products, categories, flyers] = await Promise.all([
    getOffers().catch(() => []),
    getProducts().catch(() => []),
    getCategories().catch(() => []),
    getFlyers().catch(() => []),
  ]);

  // Map Sanity category reference to flat categorySlug for filtering
  // Fallback: se manca la categoria, imposta categorySlug a ''
  const mappedProducts = products.map(p => ({
    ...p,
    categorySlug: p.category?.slug ?? p.categorySlug ?? '',
  }));

  // Filtra solo offerte attive (non scadute, non upcoming)
  const today = new Date().toISOString().split('T')[0];
  const activeOffers = offers.filter(o => {
    if (o.endDate && o.endDate < today) return false;
    if (o.startDate && o.startDate > today) return false;
    return true;
  });

  return (
    <>
      <HeroSection rating={4.7} totalReviews={164} />
      <ServicesGrid />
      <ParallaxDivider
        alt="Farmacia Mozart"
        text="Da oltre 30 anni al servizio della tua salute"
        variant="azure"
      />
      <OffersSection offers={offers} />
      <VolantiniSection flyers={flyers} />
      <CatalogSection products={mappedProducts} categories={categories} offers={activeOffers} />
      <GallerySection />
      <WhyUsSection />
      <ParallaxDivider
        alt="Farmacia Mozart"
        text="Competenza e cura in ogni consiglio"
        variant="azure"
      />
      <FAQSection />
      <ReviewsSection rating={4.7} totalReviews={164} />
      <HoursMapSection />
      <ContactSection />
    </>
  );
}
