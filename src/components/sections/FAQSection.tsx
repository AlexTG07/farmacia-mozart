import SectionHeader from '../ui/SectionHeader';
import Accordion from '../ui/Accordion';
import type { FAQ } from '@/types';

const DEFAULT_FAQS: FAQ[] = [
  {
    _id: '1', question: 'Quali sono gli orari di apertura?',
    answer: 'Siamo aperti dal lunedì al venerdì dalle 8:30 alle 19:30 e il sabato dalle 9:00 alle 13:00. La domenica siamo chiusi.',
  },
  {
    _id: '2', question: 'Posso contattarvi su WhatsApp?',
    answer: 'Sì! È il modo più rapido per raggiungerci. Scrivici al 327 126 2504 per informazioni, disponibilità farmaci o qualsiasi domanda.',
  },
  {
    _id: '3', question: 'Fate consegne a domicilio?',
    answer: 'Attualmente non offriamo un servizio di consegna a domicilio strutturato, ma per urgenze o necessità particolari contattateci su WhatsApp.',
  },
  {
    _id: '4', question: 'Servite anche prodotti veterinari?',
    answer: 'Certamente! Abbiamo un reparto dedicato con farmaci e prodotti per la salute dei vostri animali domestici.',
  },
  {
    _id: '5', question: 'Accettate la tessera sanitaria per i farmaci?',
    answer: 'Sì, accettiamo le ricette del SSN con tessera sanitaria per tutti i farmaci mutuabili.',
  },
  {
    _id: '6', question: 'Dove si trova la farmacia?',
    answer: 'Siamo in Via Mozart 41, 20096 Pioltello (MI). Facilmente raggiungibile con i mezzi pubblici.',
  },
];

interface FAQSectionProps {
  faqs?: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const items = faqs?.length ? faqs : DEFAULT_FAQS;

  return (
    <section id="faq">
      <div className="container">
        <SectionHeader
          badge="Domande Frequenti"
          badgeIcon={<span aria-hidden="true">❓</span>}
          title="Hai bisogno di aiuto?"
          description="Le risposte alle domande più comuni dei nostri clienti."
        />
        <div className="faq-list">
          {items.map(faq => (
            <Accordion key={faq._id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
