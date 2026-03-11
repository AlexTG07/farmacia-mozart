import SectionHeader from '../ui/SectionHeader';

const REASONS = [
  {
    icon: '�',
    title: 'Esperienza 30+ Anni',
    description: 'Tradizione e conoscenza tramandata nel quartiere.',
  },
  {
    icon: '💬',
    title: 'Consulenza Personalizzata',
    description: 'Farmacisti sempre disponibili per consigli su misura.',
  },
  {
    icon: '🌍',
    title: 'Quartiere Multiculturale',
    description: 'Accoglienza in più lingue per tutta la comunità.',
  },
  {
    icon: '📱',
    title: 'WhatsApp First',
    description: 'Contattaci in tempo reale, risposte rapide garantite.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="why-us">
      <div className="container">
        <SectionHeader
          badge="Perché Sceglierci"
          badgeVariant="gold"
          badgeIcon={<span aria-hidden="true">✨</span>}
          title="La differenza Mozart"
        />
        <div className="why-grid">
          {REASONS.map((r, i) => (
            <div className="why-item" key={i}>
              <i aria-hidden="true">{r.icon}</i>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
