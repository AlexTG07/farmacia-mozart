import SectionHeader from '../ui/SectionHeader';
import ReviewCard from '../ui/ReviewCard';
import type { Review } from '@/types';

const DEFAULT_REVIEWS: Review[] = [
  { author: 'Giulia R.', rating: 5, text: 'Personale gentilissimo e molto competente. Mi hanno consigliato il prodotto perfetto per la mia pelle.', date: '2 mesi fa' },
  { author: 'Marco B.', rating: 5, text: 'Farmacia storica del quartiere. Sempre disponibili anche per consigli telefonici.', date: '3 mesi fa' },
  { author: 'Aisha M.', rating: 4, text: 'Ottima farmacia, molto fornita. A volte c\'è un po\' di attesa ma ne vale la pena.', date: '1 mese fa' },
  { author: 'Paolo T.', rating: 5, text: 'Prezzi onesti e grande assortimento di prodotti naturali. La consiglio!', date: '2 settimane fa' },
  { author: 'Carmen S.', rating: 4, text: 'Buona farmacia, personale cordiale. WhatsApp molto comodo per chiedere informazioni.', date: '1 mese fa' },
  { author: 'Luca G.', rating: 5, text: 'Da 20 anni la mia farmacia di fiducia. Come una famiglia!', date: '3 settimane fa' },
];

interface ReviewsSectionProps {
  reviews?: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const items = reviews?.length ? reviews : DEFAULT_REVIEWS;
  const avg = items.length
    ? (items.reduce((sum, r) => sum + r.rating, 0) / items.length).toFixed(1)
    : '4.3';

  return (
    <section className="reviews" id="recensioni">
      <div className="container">
        <SectionHeader
          badge="Recensioni"
          badgeVariant="gold"
          badgeIcon={<span aria-hidden="true">⭐</span>}
          title="Cosa dicono i nostri clienti"
        />
        <div className="reviews-header-rating">
          <span className="reviews-score">{avg}</span>
          <div>
            <div className="reviews-stars" aria-label={`${avg} stelle su 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < Math.round(Number(avg)) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="reviews-count">Basato su {items.length} recensioni</span>
          </div>
        </div>
        <div className="reviews-grid">
          {items.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
