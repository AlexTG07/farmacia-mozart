import SectionHeader from '../ui/SectionHeader';

const HOURS = [
  { day: 'Lunedì', time: '8:00 – 20:30', id: 1 },
  { day: 'Martedì', time: '8:00 – 20:30', id: 2 },
  { day: 'Mercoledì', time: '8:00 – 20:30', id: 3 },
  { day: 'Giovedì', time: '8:00 – 20:30', id: 4 },
  { day: 'Venerdì', time: '8:00 – 20:30', id: 5 },
  { day: 'Sabato', time: '8:00 – 20:30', id: 6 },
  { day: 'Domenica', time: '9:00 – 20:00', id: 0 },
];

function getTodayId(): number {
  return new Date().getDay();
}

export default function HoursMapSection() {
  const todayId = getTodayId();

  return (
    <section id="orari">
      <div className="container">
        <SectionHeader
          badge="Orari e Mappa"
          badgeIcon={<span aria-hidden="true">🕐</span>}
          title="Quando e dove trovarci"
        />
        <div className="info-grid">
          <div className="hours-card">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              Orari di Apertura
            </h3>
            {HOURS.map(h => (
              <div
                className={`hours-row ${h.id === todayId ? 'today' : ''}`}
                key={h.id}
              >
                <span className="day">{h.day}</span>
                <span className="time">{h.time}</span>
              </div>
            ))}
          </div>
          <div className="map-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.3!2d9.205!3d45.455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFarmacia+Mozart!5e0!3m2!1sit!2sit!4v1"
              title="Mappa Farmacia Mozart - Via Mozart, Pioltello"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
