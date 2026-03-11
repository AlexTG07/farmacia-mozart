'use client';

import { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import FilterChip from '../ui/FilterChip';
import type { Product, Category } from '@/types';
import { sanitizeText, sanitizePrice } from '@/lib/security/sanitize';
import { urlFor } from '@/lib/sanity/client';

interface CatalogSectionProps {
  products?: Product[];
  categories?: Category[];
}

export default function CatalogSection({ products = [], categories = [] }: CatalogSectionProps) {
  const cats: Category[] = [{ _id: 'all', name: 'Tutti', slug: 'tutti' }, ...categories];
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? products
    : products.filter(p => p.categorySlug === active);

  if (products.length === 0) return null;

  return (
    <section className="catalog" id="catalogo">
      <div className="container">
        <SectionHeader
          badge="Catalogo"
          badgeVariant="gold"
          badgeIcon={<span aria-hidden="true">📋</span>}
          title="I nostri prodotti"
          description="Sfoglia le nostre categorie e trova ciò che cerchi."
        />
        <div className="catalog-filters">
          {cats.map(cat => (
            <FilterChip
              key={cat._id}
              label={cat.name}
              active={active === (cat.slug === 'tutti' ? 'all' : cat.slug)}
              onClick={() => setActive(cat.slug === 'tutti' ? 'all' : cat.slug)}
            />
          ))}
        </div>
        <div className="catalog-grid">
          {filtered.length > 0 ? (
            filtered.map(product => (
              <div className="product-card" key={product._id}>
                <div className="product-img">
                  {product.image?.asset ? (
                    <img
                      src={urlFor(product.image).width(300).height(300).fit('crop').url()}
                      alt={product.image.alt || product.name}
                      width={300}
                      height={300}
                      loading="lazy"
                    />
                  ) : (
                    <span aria-hidden="true" style={{ fontSize: '3rem' }}>📦</span>
                  )}
                </div>
                <div className="product-body">
                  {product.categorySlug && (
                    <div className="product-category">{sanitizeText(product.categorySlug)}</div>
                  )}
                  <h3>{sanitizeText(product.name)}</h3>
                  {product.description && (
                    <p className="product-desc">{sanitizeText(product.description)}</p>
                  )}
                  <div className="product-price">€{sanitizePrice(product.price)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Nessun prodotto in questa categoria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
