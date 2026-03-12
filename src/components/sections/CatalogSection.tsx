'use client';

import { useState, useMemo } from 'react';
import SectionHeader from '../ui/SectionHeader';
import FilterChip from '../ui/FilterChip';
import Badge from '../ui/Badge';
import type { Product, Category } from '@/types';
import { sanitizeText, sanitizePrice } from '@/lib/security/sanitize';
import { urlFor } from '@/lib/sanity/client';

const MAX_SEARCH_LEN = 100;

/** Normalizza una stringa per confronto: lowercase, rimuove accenti e tag HTML */
function normalize(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

interface CatalogSectionProps {
  products?: Product[];
  categories?: Category[];
  offers?: Offer[];
}

export default function CatalogSection({ products = [], categories = [] }: CatalogSectionProps) {
  const cats: Category[] = [{ _id: 'all', name: 'Tutti', slug: 'tutti' }, ...categories];
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    // Limita lunghezza e rimuove tag HTML
    const clean = value.replace(/<[^>]*>/g, '').slice(0, MAX_SEARCH_LEN);
    setSearch(clean);
  };

  const filtered = useMemo(() => {
    let result = active === 'all'
      ? products
      : products.filter(p => p.categorySlug === active);

    const q = normalize(search);
    if (q.length > 0) {
      result = result.filter(p =>
        normalize(p.name).includes(q) ||
        (p.description && normalize(p.description).includes(q)) ||
        (p.category?.name && normalize(p.category.name).includes(q))
      );
    }

    return result;
  }, [products, active, search]);

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
        <div className="catalog-search">
          <svg className="catalog-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            className="catalog-search-input"
            placeholder="Cerca un prodotto..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            maxLength={MAX_SEARCH_LEN}
            autoComplete="off"
            spellCheck={false}
          />
          {search && (
            <button
              className="catalog-search-clear"
              onClick={() => setSearch('')}
              aria-label="Cancella ricerca"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
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
            filtered.map(product => {
              // Cerca offerta attiva collegata (match per id prodotto)
              const offer = offers?.find(o => o.product && o.product.name === product.name);
              const hasOffer = !!offer;
              const price = hasOffer ? offer.discountedPrice : product.price;
              const badge = hasOffer ? offer.badge : undefined;
              return (
                <div className="product-card" key={product._id}>
                  {product.requiresPrescription && (
                    <div className="product-badge">
                      <Badge variant="prescription">🩺 Ricetta</Badge>
                    </div>
                  )}
                  {hasOffer && (
                    <div className="product-badge" style={{ top: '36px', right: '12px' }}>
                      <Badge variant="offer">{badge ?? 'Offerta'}</Badge>
                    </div>
                  )}
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
                    {product.category?.name && (
                      <div className="product-category">{sanitizeText(product.category.name)}</div>
                    )}
                    <h3>{sanitizeText(product.name)}</h3>
                    {product.description && (
                      <p className="product-desc">{sanitizeText(product.description)}</p>
                    )}
                    <div className="product-price">
                      {hasOffer ? (
                        <>
                          <span className="offer-price-old">€{sanitizePrice(product.price)}</span>
                          <span className="offer-price-new">€{sanitizePrice(price)}</span>
                        </>
                      ) : (
                        <>€{sanitizePrice(product.price)}</>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <p>Nessun prodotto trovato{search ? ` per "${sanitizeText(search)}"` : ' in questa categoria'}.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
