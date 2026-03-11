'use client';

import { useEffect, useRef } from 'react';

type PolicyType = 'privacy' | 'cookie' | null;

interface PolicyModalProps {
  type: PolicyType;
  onClose: () => void;
}

export default function PolicyModal({ type, onClose }: PolicyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [type, onClose]);

  if (!type) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="policy-modal-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label={type === 'privacy' ? 'Privacy Policy' : 'Cookie Policy'}>
      <div className="policy-modal">
        <button className="policy-modal-close" onClick={onClose} aria-label="Chiudi">
          ✕
        </button>
        <div className="policy-modal-body">
          {type === 'privacy' ? <PrivacyContent /> : <CookieContent />}
        </div>
      </div>
    </div>
  );
}

function PrivacyContent() {
  return (
    <>
      <h2>Privacy Policy</h2>
      <p className="policy-date">Ultimo aggiornamento: Gennaio 2025</p>

      <h3>1. Titolare del Trattamento</h3>
      <p>
        Farmacia Mozart — Via Mozart 41, 20096 Pioltello (MI).
        Email: <a href="mailto:farmamozart@gmail.com">farmamozart@gmail.com</a>
      </p>

      <h3>2. Dati Raccolti</h3>
      <p>
        Raccogliamo esclusivamente dati di navigazione tramite cookie tecnici necessari
        al funzionamento del sito. Non raccogliamo dati personali identificativi
        senza il tuo consenso esplicito.
      </p>

      <h3>3. Finalità</h3>
      <ul>
        <li>Garantire il funzionamento tecnico del sito</li>
        <li>Analisi anonime del traffico (previo consenso)</li>
        <li>Miglioramento del servizio</li>
      </ul>

      <h3>4. Base Giuridica</h3>
      <p>
        Il trattamento è basato sul consenso (art. 6.1.a GDPR) per i cookie analitici
        e sull&apos;interesse legittimo (art. 6.1.f GDPR) per i cookie tecnici necessari.
      </p>

      <h3>5. Diritti dell&apos;Utente</h3>
      <p>
        Hai diritto di accesso, rettifica, cancellazione, portabilità dei tuoi dati
        e di revocare il consenso in qualsiasi momento. Per esercitare i tuoi diritti,
        contattaci a <a href="mailto:farmamozart@gmail.com">farmamozart@gmail.com</a>.
      </p>
    </>
  );
}

function CookieContent() {
  return (
    <>
      <h2>Cookie Policy</h2>
      <p className="policy-date">Ultimo aggiornamento: Gennaio 2025</p>

      <h3>1. Cosa sono i Cookie</h3>
      <p>
        I cookie sono piccoli file di testo che il sito salva sul tuo dispositivo
        per migliorare la navigazione e offrire funzionalità avanzate.
      </p>

      <h3>2. Cookie Tecnici (Necessari)</h3>
      <p>
        Questi cookie sono essenziali per il funzionamento del sito e non possono
        essere disattivati. Includono il cookie di preferenza cookie stessa e
        cookie di sessione per la sicurezza.
      </p>

      <h3>3. Cookie Analitici</h3>
      <p>
        Con il tuo consenso, utilizziamo cookie analitici per capire come i
        visitatori interagiscono con il sito. I dati sono raccolti in forma
        anonima e aggregata.
      </p>

      <h3>4. Gestione del Consenso</h3>
      <p>
        Puoi modificare le tue preferenze in qualsiasi momento tramite il banner
        cookie o le impostazioni del browser. La revoca del consenso non pregiudica
        la liceità del trattamento effettuato prima della revoca.
      </p>

      <h3>5. Come Disabilitare i Cookie</h3>
      <p>
        La maggior parte dei browser consente di gestire i cookie tramite le
        impostazioni. Tieni presente che disabilitare i cookie tecnici potrebbe
        compromettere il funzionamento del sito.
      </p>

      <h3>6. Contatti</h3>
      <p>
        Per domande sulla nostra Cookie Policy, contattaci a{' '}
        <a href="mailto:farmamozart@gmail.com">farmamozart@gmail.com</a>.
      </p>
    </>
  );
}
