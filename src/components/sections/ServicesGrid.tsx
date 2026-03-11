import SectionHeader from '../ui/SectionHeader';
import type { Service } from '@/types';

const DEFAULT_SERVICES: Service[] = [
  {
    _id: '1', icon: '💊', title: 'Farmaci con ricetta',
    description: 'Dispensazione sicura di tutti i farmaci con ricetta medica SSN e bianca.',
  },
  {
    _id: '2', icon: '🧴', title: 'Cosmetica e Dermocosmesi',
    description: 'Linee selezionate di cosmetici naturali, biologici e dermatologicamente testati.',
  },
  {
    _id: '3', icon: '🐾', title: 'Prodotti Veterinari',
    description: 'Farmaci e prodotti per la salute dei tuoi animali domestici.',
  },
  {
    _id: '4', icon: '🌿', title: 'Fitoterapia e Integratori',
    description: 'Soluzioni naturali e integratori alimentari per ogni esigenza.',
  },
  {
    _id: '5', icon: '👶', title: 'Prima Infanzia',
    description: 'Prodotti specializzati per la cura e il benessere dei più piccoli.',
  },
  {
    _id: '6', icon: '💉', title: 'Autoanalisi del Sangue',
    description: 'Servizio rapido di screening per glicemia, colesterolo e trigliceridi.',
  },
];

interface ServicesGridProps {
  services?: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const items = services?.length ? services : DEFAULT_SERVICES;

  return (
    <section className="services" id="servizi">
      <div className="container">
        <SectionHeader
          badge="I Nostri Servizi"
          badgeIcon={<span aria-hidden="true">🏥</span>}
          title="Tutto per la tua salute"
          description="Un team di farmacisti esperti al tuo fianco, ogni giorno."
        />
        <div className="services-grid">
          {items.map(service => (
            <div className="service-card" key={service._id}>
              <div className="service-icon" aria-hidden="true">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
