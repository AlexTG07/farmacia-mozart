'use client';

import { useState, useEffect } from 'react';
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

export default function HoursMapSection() {
  const [todayId, setTodayId] = useState<number | null>(null);

  useEffect(() => {
    setTodayId(new Date().getDay());
  }, []);

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
              src="https://www.google.com/maps?q=Farmacia+Mozart,+Via+Wolfgang+Amadeus+Mozart+41,+20096+Pioltello+MI&z=17&output=embed"
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
