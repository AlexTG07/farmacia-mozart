import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Farmacia Mozart',
};

export default function CookiePolicyPage() {
  return (
    <section style={{ padding: '64px 0' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Cookie Policy</h1>
        <p style={{ marginTop: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          Ultimo aggiornamento: Gennaio 2025
        </p>

        <h2 style={{ marginTop: 32 }}>1. Cosa sono i Cookie</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          I cookie sono piccoli file di testo che il sito salva sul tuo dispositivo
          per migliorare la navigazione e offrire funzionalità avanzate.
        </p>

        <h2 style={{ marginTop: 32 }}>2. Cookie Tecnici (Necessari)</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          Questi cookie sono essenziali per il funzionamento del sito e non possono
          essere disattivati. Includono il cookie di preferenza cookie stessa e
          cookie di sessione per la sicurezza.
        </p>

        <h2 style={{ marginTop: 32 }}>3. Cookie Analitici</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          Con il tuo consenso, utilizziamo cookie analitici per capire come i
          visitatori interagiscono con il sito. I dati sono raccolti in forma
          anonima e aggregata.
        </p>

        <h2 style={{ marginTop: 32 }}>4. Gestione del Consenso</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          Puoi modificare le tue preferenze in qualsiasi momento tramite il banner
          cookie o le impostazioni del browser. La revoca del consenso non pregiudica
          la liceità del trattamento effettuato prima della revoca.
        </p>

        <h2 style={{ marginTop: 32 }}>5. Come Disabilitare i Cookie</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          La maggior parte dei browser consente di gestire i cookie tramite le
          impostazioni. Tieni presente che disabilitare i cookie tecnici potrebbe
          compromettere il funzionamento del sito.
        </p>

        <h2 style={{ marginTop: 32 }}>6. Contatti</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          Per domande sulla nostra Cookie Policy, contattaci a{' '}
          <a href="mailto:farmaciamozart@gmail.com">farmaciamozart@gmail.com</a>.
        </p>
      </div>
    </section>
  );
}
