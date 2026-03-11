'use client';

import { useState, useEffect } from 'react';
import Badge from '../ui/Badge';

/** Calcola se la farmacia è aperta in base a giorno/ora correnti.
 *  Lun-Sab 8:00-20:30 | Dom 9:00-20:00 */
function checkIsOpen(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0=Dom
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day === 0) return minutes >= 540 && minutes < 1200; // Domenica 9:00-20:00
  return minutes >= 480 && minutes < 1230;                // Lun-Sab 8:00-20:30
}

export default function TopBar() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setIsOpen(checkIsOpen());
    const id = setInterval(() => setIsOpen(checkIsOpen()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-left">
          <a href="tel:+390292140862" aria-label="Chiama la farmacia">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            02 9214 0862
          </a>
          <a href="https://www.google.com/maps/search/Farmacia+Mozart,+Via+Wolfgang+Amadeus+Mozart+41,+20096+Pioltello+MI" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Via Mozart 41, Pioltello
          </a>
        </div>
        <div className="topbar-right">
          {isOpen !== null && (
            <Badge variant={isOpen ? 'open' : 'closed'}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: isOpen ? '#22c55e' : '#dc2626' }} />
              {isOpen ? 'Aperta Ora' : 'Chiusa'}
            </Badge>
          )}
          <div id="google_translate_element" />
        </div>
      </div>
    </div>
  );
}
