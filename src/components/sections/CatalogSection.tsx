import { Suspense } from 'react';
import SectionHeader from '../ui/SectionHeader';
import CatalogClient from './CatalogClient';
import type { Product, Category, Offer } from '@/types';

interface CatalogSectionProps {
  products?: Product[];
  categories?: Category[];
  offers?: Offer[];
}

export default function CatalogSection({
  products = [],
  categories = [],
  offers = [],
}: CatalogSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="catalog" id="catalogo">
      <div className="container">
        <SectionHeader
          badge="Catalogo"
          badgeVariant="gold"
          badgeIcon={<span aria-hidden="true">📋</span>}
          title="I nostri prodotti"
          description="Tutti i prodotti disponibili."
        />
        <Suspense fallback={<div className="catalog-grid" />}>
          <CatalogClient
            products={products}
            categories={categories}
            offers={offers}
          />
        </Suspense>
      </div>
    </section>
  );
}
