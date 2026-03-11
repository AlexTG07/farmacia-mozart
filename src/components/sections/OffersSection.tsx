import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import type { Offer } from '@/types';
import { sanitizeText, sanitizePrice } from '@/lib/security/sanitize';
import { urlFor } from '@/lib/sanity/client';

interface OffersSectionProps {
  offers?: Offer[];
}

export default function OffersSection({ offers = [] }: OffersSectionProps) {
  if (offers.length === 0) return null;

  /** Calcola badge e prezzi derivati automaticamente.
   *  - originalPrice + discountedPrice → badge auto (es. -42%)
   *  - originalPrice + badge (es. "-30%") → discountedPrice auto
   *  - discountedPrice + badge → originalPrice auto */
  function resolveOffer(offer: Offer) {
    let { originalPrice, discountedPrice, badge } = offer;
    const pct = badge ? parseFloat(badge.replace(/[^0-9.]/g, '')) : null;

    if (originalPrice && discountedPrice) {
      if (!badge) badge = `-${Math.round((1 - discountedPrice / originalPrice) * 100)}%`;
    } else if (originalPrice && pct && !discountedPrice) {
      discountedPrice = Math.round(originalPrice * (1 - pct / 100) * 100) / 100;
    } else if (discountedPrice && pct && !originalPrice) {
      originalPrice = Math.round(discountedPrice / (1 - pct / 100) * 100) / 100;
    }

    return { originalPrice, discountedPrice, badge };
  }

  return (
    <section id="offerte">
      <div className="container">
        <SectionHeader
          badge="Offerte del Mese"
          badgeVariant="accent"
          badgeIcon={<span aria-hidden="true">🔥</span>}
          title="Risparmia sulla tua salute"
          description="Promozioni selezionate, aggiornate ogni mese."
        />
        <div className="offers-grid">
          {offers.map(offer => {
            const { originalPrice, discountedPrice, badge } = resolveOffer(offer);
            return (
            <div className="offer-card" key={offer._id}>
              {badge && (
                <div className="offer-badge">
                  <Badge variant="offer">{badge}</Badge>
                </div>
              )}
              <div className="offer-img">
                {offer.image?.asset ? (
                  <img
                    src={urlFor(offer.image).width(400).height(300).fit('crop').url()}
                    alt={offer.image.alt || offer.title}
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                ) : (
                  <span aria-hidden="true" style={{ fontSize: '3rem' }}>📦</span>
                )}
              </div>
              <div className="offer-body">
                <h3>{sanitizeText(offer.title)}</h3>
                {offer.description && (
                  <p className="offer-desc">{sanitizeText(offer.description)}</p>
                )}
                <div className="offer-prices">
                  {originalPrice && discountedPrice ? (
                    <>
                      <span className="offer-price-old">€{sanitizePrice(originalPrice)}</span>
                      <span className="offer-price-new">€{sanitizePrice(discountedPrice)}</span>
                    </>
                  ) : (
                    <span className="offer-price-only">
                      €{sanitizePrice(discountedPrice ?? originalPrice ?? 0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
