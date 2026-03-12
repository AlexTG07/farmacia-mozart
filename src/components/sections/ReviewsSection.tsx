import SectionHeader from '../ui/SectionHeader';
import ReviewCard from '../ui/ReviewCard';
import type { Review } from '@/types';

const DEFAULT_REVIEWS: Review[] = [
  { author: 'Giulia R.', rating: 5, text: 'Personale gentilissimo e molto competente. Mi hanno consigliato il prodotto perfetto per la mia pelle sensibile. Tornerò sicuramente!', date: '2 settimane fa' },
  { author: 'Marco B.', rating: 5, text: 'Farmacia storica del quartiere. Sempre disponibili anche per consigli telefonici. Il dott. è una persona squisita.', date: '3 settimane fa' },
  { author: 'Aisha M.', rating: 4, text: 'Ottima farmacia, molto fornita. A volte c\'è un po\' di attesa ma ne vale la pena per la qualità del servizio.', date: '1 mese fa' },
  { author: 'Paolo T.', rating: 5, text: 'Prezzi onesti e grande assortimento di prodotti naturali e biologici. La consiglio a tutti!', date: '2 settimane fa' },
  { author: 'Carmen S.', rating: 4, text: 'Buona farmacia, personale cordiale. Il servizio WhatsApp è molto comodo per chiedere informazioni sui prodotti.', date: '1 mese fa' },
  { author: 'Luca G.', rating: 5, text: 'Da 20 anni la mia farmacia di fiducia. Come una famiglia! Non la cambierei per nulla al mondo.', date: '3 settimane fa' },
  { author: 'Francesca D.', rating: 5, text: 'Sono rimasta colpita dalla disponibilità del personale. Mi hanno trovato un farmaco difficile da reperire in meno di 24 ore.', date: '1 mese fa' },
  { author: 'Roberto M.', rating: 5, text: 'Farmacia di riferimento per tutta la famiglia. Anche per i prodotti veterinari sono sempre forniti. Consigliatissima.', date: '2 mesi fa' },
  { author: 'Simona L.', rating: 4, text: 'Ottimo reparto cosmetica con marchi di qualità. Le ragazze al banco sono molto preparate e danno consigli utili.', date: '1 mese fa' },
  { author: 'Alessandro P.', rating: 5, text: 'Rapidi e professionali. Ho chiamato per un\'urgenza e mi hanno preparato tutto in pochi minuti. Grazie!', date: '3 settimane fa' },
  { author: 'Maria Teresa V.', rating: 5, text: 'Frequento questa farmacia da quando mi sono trasferita a Pioltello. Personale educato e sempre pronto ad aiutare.', date: '2 mesi fa' },
  { author: 'Davide C.', rating: 4, text: 'Buona selezione di integratori e prodotti omeopatici. Il farmacista mi ha spiegato tutto con pazienza.', date: '1 mese fa' },
];

const TOTAL_REVIEWS_COUNT = 164;

interface ReviewsSectionProps {
  reviews?: Review[];
  rating?: number;
  totalReviews?: number;
}

export default function ReviewsSection({ reviews, rating, totalReviews }: ReviewsSectionProps) {
  const items = reviews?.length ? reviews : DEFAULT_REVIEWS;
  const avg = rating ? rating.toFixed(1) : (items.reduce((sum, r) => sum + r.rating, 0) / items.length).toFixed(1);
  const count = totalReviews || TOTAL_REVIEWS_COUNT;

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
            <span className="reviews-count">Basato su {count}+ recensioni Google</span>
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
