'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import Badge from '../ui/Badge';
import type { Product, Category, Offer } from '@/types';
import { sanitizeText, sanitizePrice } from '@/lib/security/sanitize';
import { urlFor } from '@/lib/sanity/client';

const PER_PAGE_OPTIONS = [5, 15, 30];
const DEFAULT_PER_PAGE = 5;

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
  offers: Offer[];
}

export default function CatalogClient({ products, categories, offers }: CatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get('cerca') ?? '';
  const category = searchParams.get('categoria') ?? '';
  const page = Math.max(1, Number(searchParams.get('pagina') ?? 1));
  const perPage = PER_PAGE_OPTIONS.includes(Number(searchParams.get('perPagina')))
    ? Number(searchParams.get('perPagina'))
    : DEFAULT_PER_PAGE;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch =
        !search || p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !category ||
        (typeof p.categorySlug === 'string' && p.categorySlug === category) ||
        (typeof p.category?.slug === 'string' && p.category?.slug === category);
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalPages = Math.ceil(filteredProducts.length / perPage) || 1;
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );

  return (
    <>
      {/* Debug: logga quanti prodotti vengono renderizzati */}
      {console.log('Prodotti renderizzati:', paginatedProducts.length, paginatedProducts.map(p => p.name))}
      {/* Barra di ricerca */}
      <div className="catalog-search">
        <input
          type="search"
          className="catalog-search-input"
          placeholder="Cerca un prodotto..."
          style={{ padding: '10px' }}
          value={search}
          onChange={e =>
            updateParams({ cerca: e.target.value || null, pagina: null })
          }
          aria-label="Cerca prodotto"
        />
        {search && (
          <button
            className="catalog-search-clear"
            onClick={() => updateParams({ cerca: null, pagina: null })}
            aria-label="Cancella ricerca"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtri per categoria */}
      {categories.length > 0 && (
        <div className="catalog-filters">
          <button
            className={`filter-chip${!category ? ' active' : ''}`}
            onClick={() => updateParams({ categoria: null, pagina: null })}
          >
            Tutti i prodotti
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              className={`filter-chip${category === cat.slug ? ' active' : ''}`}
              onClick={() => updateParams({ categoria: cat.slug, pagina: null })}
            >
              {cat.icon && <span aria-hidden="true">{cat.icon} </span>}
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Prodotti per pagina (solo se totale > 5) */}
      {products.length > 5 && (
        <div className="catalog-per-page">
          <span className="catalog-per-page-label">Mostra:</span>
          {PER_PAGE_OPTIONS.map(n => (
            <button
              key={n}
              className={`catalog-per-page-btn${perPage === n ? ' active' : ''}`}
              onClick={() => updateParams({ perPagina: String(n), pagina: null })}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {/* Griglia prodotti */}
      <div className="catalog-grid">
        {/* Debug: mostra il numero di prodotti e un messaggio se la lista è vuota */}
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => {
            // ...existing code...
            const offer = offers.find(
              o => o.product && o.product.name === product.name
            );
            const hasOffer = !!offer;
            const price = hasOffer ? offer!.discountedPrice : product.price;
            const badge = hasOffer ? offer!.badge : undefined;
            return (
              <div className="product-card visible" key={product._id}>
                {/* ...existing code... */}
                {product.requiresPrescription && (
                  <div className="product-badge">
                    <Badge variant="prescription">🩺 Ricetta</Badge>
                  </div>
                )}
                {hasOffer && (
                  <div
                    className="product-badge"
                    style={{ top: '36px', right: '12px' }}
                  >
                    <Badge variant="offer">{badge ?? 'Offerta'}</Badge>
                  </div>
                )}
                <div className="product-img">
                  {product.image?.asset ? (
                    <img
                      src={urlFor(product.image)
                        .width(300)
                        .height(300)
                        .fit('crop')
                        .url()}
                      alt={product.image.alt || product.name}
                      width={300}
                      height={300}
                      loading="lazy"
                    />
                  ) : (
                    <span aria-hidden="true" style={{ fontSize: '3rem' }}>
                      📦
                    </span>
                  )}
                </div>
                <div className="product-body">
                  {product.category?.name && (
                    <div className="product-category">
                      {sanitizeText(product.category.name)}
                    </div>
                  )}
                  <h3>{sanitizeText(product.name)}</h3>
                  {product.description && (
                    <p className="product-desc">
                      {sanitizeText(product.description)}
                    </p>
                  )}
                  <div className="product-price">
                    {hasOffer ? (
                      <>
                        <span className="offer-price-old">
                          €{sanitizePrice(product.price)}
                        </span>
                        <span className="offer-price-new">
                          €{sanitizePrice(price)}
                        </span>
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
            <p>Nessun prodotto trovato. ({paginatedProducts.length})</p>
          </div>
        )}
      </div>

      {/* Paginazione */}
      {totalPages > 1 && (
        <div className="catalog-pagination">
          <button
            className="catalog-pagination-btn"
            disabled={safePage <= 1}
            onClick={() => updateParams({ pagina: String(safePage - 1) })}
            aria-label="Pagina precedente"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`catalog-pagination-btn${p === safePage ? ' active' : ''}`}
              onClick={() => updateParams({ pagina: String(p) })}
              aria-label={`Pagina ${p}`}
              aria-current={p === safePage ? 'page' : undefined}
            >
              {p}
            </button>
          ))}
          <button
            className="catalog-pagination-btn"
            disabled={safePage >= totalPages}
            onClick={() => updateParams({ pagina: String(safePage + 1) })}
            aria-label="Pagina successiva"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
