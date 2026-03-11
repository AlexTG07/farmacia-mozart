'use client';

import { useState, useCallback } from 'react';
import PolicyModal from '@/components/ui/PolicyModal';

type PolicyType = 'privacy' | 'cookie' | null;

export default function Footer() {
  const year = new Date().getFullYear();
  const [policy, setPolicy] = useState<PolicyType>(null);
  const closePolicy = useCallback(() => setPolicy(null), []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-about">
            <div className="logo">
              <img src="/img/logo.png" alt="Farmacia Mozart" width={140} height={40} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p>
              Da oltre 30 anni un punto di riferimento nel quartiere.
              Salute, benessere e cosmetica con la competenza che meriti.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/farmaciamozart" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/farmaciamozart" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4>Navigazione</h4>
            <ul>
              <li><a href="#servizi">Servizi</a></li>
              <li><a href="#offerte">Offerte</a></li>
              <li><a href="#catalogo">Catalogo</a></li>
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
                <a href="https://wa.me/393271262504" target="_blank" rel="noopener noreferrer">
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
            &copy; {year} Farmacia Mozart — P.IVA 12345678901 —{' '}
            <button className="policy-link" onClick={() => setPolicy('privacy')}>Privacy Policy</button> ·{' '}
            <button className="policy-link" onClick={() => setPolicy('cookie')}>Cookie Policy</button>
          </p>
        </div>
      </div>

      <PolicyModal type={policy} onClose={closePolicy} />
    </footer>
  );
}
