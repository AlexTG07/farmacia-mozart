'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { CookieConsent } from '@/types';

const STORAGE_KEY = 'fm-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (consent: CookieConsent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  const handleAcceptAll = () => {
    accept({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });
  };

  const handleRejectOptional = () => {
    accept({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });
  };

  return (
    <div className={`cookie-banner ${visible ? 'visible' : ''}`} role="dialog" aria-label="Banner cookie">
      <div className="cookie-content">
        <div className="cookie-text">
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 8v4M12 16h.01" /></svg>
            Utilizziamo i cookie
          </h3>
          <p>
            Usiamo cookie tecnici necessari e, con il tuo consenso,
            cookie analitici per migliorare il servizio.{' '}
            <Link href="/cookie-policy">Scopri di più</Link>
          </p>
        </div>
        <div className="cookie-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleRejectOptional}>
            Solo necessari
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleAcceptAll}>
            Accetta tutto
          </button>
        </div>
      </div>
    </div>
  );
}
