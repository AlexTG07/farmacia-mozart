'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import PolicyModal from '@/components/ui/PolicyModal';

type PolicyType = 'privacy' | 'cookie' | null;

export default function Footer() {
  const year = new Date().getFullYear();
  const [policy, setPolicy] = useState<PolicyType>(null);
  const closePolicy = useCallback(() => setPolicy(null), []);

  const handleResetCookies = useCallback(() => {
    localStorage.removeItem('fm-cookie-consent');
    window.location.reload();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-about">
            <div className="logo">
              <Image src="/img/logo.png" alt="Farmacia Mozart" width={320} height={100} quality={90} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p>
              Da oltre 30 anni un punto di riferimento nel quartiere.
              Salute, benessere e cosmetica con la competenza che meriti.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4>Navigazione</h4>
            <ul>
              <li><a href="#servizi">Servizi</a></li>
              <li><a href="#offerte">Offerte</a></li>
              <li><a href="#catalogo">Catalogo</a></li>
              <li><a href="#galleria">Galleria</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contatti">Contatti</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4>Servizi</h4>
            <ul>
              <li><span>Farmaci con ricetta</span></li>
              <li><span>Cosmetica naturale</span></li>
              <li><span>Prodotti veterinari</span></li>
              <li><span>Consulenza salute</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4>Contatti</h4>
            <ul>
              <li>
                <a href="tel:+390292140862">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  02 9214 0862
                </a>
              </li>
              <li>
                <a href="https://wa.me/390292140862" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li><span>Via Mozart, 41</span></li>
              <li><span>20096 Pioltello MI</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} Farmacia Mozart —{' '}
            <button className="policy-link" onClick={() => setPolicy('privacy')}>Privacy Policy</button> ·{' '}
            <button className="policy-link" onClick={() => setPolicy('cookie')}>Cookie Policy</button> ·{' '}
            <button className="policy-link" onClick={handleResetCookies}>Gestisci Cookie</button>
          </p>
        </div>
      </div>

      <PolicyModal type={policy} onClose={closePolicy} />
    </footer>
  );
}
