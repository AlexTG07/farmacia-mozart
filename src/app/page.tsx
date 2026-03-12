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
import { getGoogleReviews } from '@/lib/google-reviews';

export default async function Home() {
  const [offers, products, categories, flyers, googleReviews] = await Promise.all([
    getOffers().catch(() => []),
    getProducts().catch(() => []),
    getCategories().catch(() => []),
    getFlyers().catch(() => []),
    getGoogleReviews(),
  ]);

  // Map Sanity category reference to flat categorySlug for filtering
  const mappedProducts = products.map(p => ({
    ...p,
    categorySlug: p.category?.slug ?? p.categorySlug ?? '',
  }));

  return (
    <>
      <HeroSection rating={googleReviews.rating} totalReviews={googleReviews.totalReviews} />
      <ServicesGrid />
      <ParallaxDivider
        alt="Farmacia Mozart"
        text="Da oltre 30 anni al servizio della tua salute"
        variant="azure"
      />
      <OffersSection offers={offers} />
      <VolantiniSection flyers={flyers} />
      <CatalogSection products={mappedProducts} categories={categories} />
      <GallerySection />
      <WhyUsSection />
      <ParallaxDivider
        alt="Farmacia Mozart"
        text="Competenza e cura in ogni consiglio"
        variant="azure"
      />
      <FAQSection />
      <ReviewsSection rating={googleReviews.rating} totalReviews={googleReviews.totalReviews} />
      <HoursMapSection />
      <ContactSection />
    </>
  );
}
