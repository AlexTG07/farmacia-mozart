import {
  HeroSection,
  ServicesGrid,
  OffersSection,
  CatalogSection,
  WhyUsSection,
  FAQSection,
  ReviewsSection,
  HoursMapSection,
  ContactSection,
} from '@/components/sections';
import { getOffers, getProducts, getCategories } from '@/lib/sanity/queries';

export default async function Home() {
  const [offers, products, categories] = await Promise.all([
    getOffers().catch(() => []),
    getProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  // Map Sanity category reference to flat categorySlug for filtering
  const mappedProducts = products.map(p => ({
    ...p,
    categorySlug: p.category?.slug ?? p.categorySlug ?? '',
  }));

  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <OffersSection offers={offers} />
      <CatalogSection products={mappedProducts} categories={categories} />
      <WhyUsSection />
      <FAQSection />
      <ReviewsSection />
      <HoursMapSection />
      <ContactSection />
    </>
  );
}
