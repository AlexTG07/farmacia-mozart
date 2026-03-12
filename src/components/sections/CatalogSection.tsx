import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import type { Product, Category, Offer } from '@/types';
import { sanitizeText, sanitizePrice } from '@/lib/security/sanitize';
import { urlFor } from '@/lib/sanity/client';

interface CatalogSectionProps {
  products?: Product[];
  categories?: Category[];
  offers?: Offer[];
}

export default function CatalogSection({ products = [], offers = [] }: CatalogSectionProps) {
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
        <div className="catalog-grid">
          {products.length > 0 ? (
            products.map(product => {
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
              <p>Nessun prodotto disponibile.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
