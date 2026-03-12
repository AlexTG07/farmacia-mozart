import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import type { Offer } from '@/types';
import { sanitizeText, sanitizePrice } from '@/lib/security/sanitize';
import { urlFor } from '@/lib/sanity/client';

interface OffersSectionProps {
  offers?: Offer[];
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
}

function formatDateLong(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

type OfferStatus = 'active' | 'upcoming' | 'expired';

function getOfferStatus(offer: Offer): OfferStatus {
  const today = new Date().toISOString().split('T')[0];
  if (offer.endDate && offer.endDate < today) return 'expired';
  if (offer.startDate && offer.startDate > today) return 'upcoming';
  return 'active';
}

/** Build a date-range key for grouping */
function getDateRangeKey(offer: Offer): string {
  const start = offer.startDate || '';
  const end = offer.endDate || '';
  return `${start}|${end}`;
}

function getDateRangeLabel(key: string): string {
  const [start, end] = key.split('|');
  if (start && end) return `Dal ${formatDateLong(start)} al ${formatDateLong(end)}`;
  if (start) return `Dal ${formatDateLong(start)}`;
  if (end) return `Fino al ${formatDateLong(end)}`;
  return 'Offerte in corso';
}

interface OfferGroup {
  key: string;
  label: string;
  status: OfferStatus;
  offers: Offer[];
}

function groupOffersByDate(offers: Offer[]): OfferGroup[] {
  const map = new Map<string, OfferGroup>();

  for (const offer of offers) {
    const status = getOfferStatus(offer);
    const rangeKey = getDateRangeKey(offer);
    // Use status + rangeKey to separate active from upcoming even if same dates
    const groupKey = `${status}__${rangeKey}`;

    if (!map.has(groupKey)) {
      map.set(groupKey, {
        key: groupKey,
        label: getDateRangeLabel(rangeKey),
        status,
        offers: [],
      });
    }
    map.get(groupKey)!.offers.push(offer);
  }

  // Sort: active first, then upcoming
  const groups = Array.from(map.values());
  groups.sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return 0;
  });

  return groups;
}

export default function OffersSection({ offers = [] }: OffersSectionProps) {
  const visibleOffers = offers.filter(o => getOfferStatus(o) !== 'expired');

  if (visibleOffers.length === 0) return null;

  const groups = groupOffersByDate(visibleOffers);

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

        {groups.map(group => {
          const isUpcomingGroup = group.status === 'upcoming';

          return (
            <div className="offers-date-group" key={group.key}>
              <div className={`offers-date-header${isUpcomingGroup ? ' offers-date-header--upcoming' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span>{group.label}</span>
                {isUpcomingGroup && <span className="offers-date-tag">Prossimamente</span>}
              </div>
              <div className="offers-grid">
                {group.offers.map(offer => {
                  const { originalPrice, discountedPrice, badge } = resolveOffer(offer);
                  const isUpcoming = isUpcomingGroup;

                  return (
                    <div className={`offer-card${isUpcoming ? ' offer-upcoming' : ''}`} key={offer._id}>
                      {isUpcoming && <div className="offer-overlay" />}
                      {isUpcoming ? (
                        <div className="offer-badge">
                          <Badge variant="offer">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: 4 }}>
                              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                            </svg>
                            Prossimamente
                          </Badge>
                        </div>
                      ) : badge ? (
                        <div className="offer-badge">
                          <Badge variant="offer">{badge}</Badge>
                        </div>
                      ) : null}
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
                        {isUpcoming ? (
                          <div className="offer-prices">
                            <span className="offer-upcoming-label">
                              Disponibile dal {formatDateShort(offer.startDate!)}
                            </span>
                          </div>
                        ) : (
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
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
