import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Farmacia Mozart',
};

export default function PrivacyPage() {
  return (
    <section style={{ padding: '64px 0' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Privacy Policy</h1>
        <p style={{ marginTop: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          Ultimo aggiornamento: Gennaio 2025
        </p>

        <h2 style={{ marginTop: 32 }}>1. Titolare del Trattamento</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          Farmacia Mozart — Via Mozart 41, 20096 Pioltello (MI).
          Email: <a href="mailto:farmamozart@gmail.com">farmamozart@gmail.com</a>
        </p>

        <h2 style={{ marginTop: 32 }}>2. Dati Raccolti</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          Raccogliamo esclusivamente dati di navigazione tramite cookie tecnici necessari
          al funzionamento del sito. Non raccogliamo dati personali identificativi
          senza il tuo consenso esplicito.
        </p>

        <h2 style={{ marginTop: 32 }}>3. Finalità</h2>
        <ul style={{ marginTop: 8, paddingLeft: 24, lineHeight: 2 }}>
          <li>Garantire il funzionamento tecnico del sito</li>
          <li>Analisi anonime del traffico (previo consenso)</li>
          <li>Miglioramento del servizio</li>
        </ul>

        <h2 style={{ marginTop: 32 }}>4. Base Giuridica</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          Il trattamento è basato sul consenso (art. 6.1.a GDPR) per i cookie analitici
          e sull&apos;interesse legittimo (art. 6.1.f GDPR) per i cookie tecnici necessari.
        </p>

        <h2 style={{ marginTop: 32 }}>5. Diritti dell&apos;Utente</h2>
        <p style={{ marginTop: 8, lineHeight: 1.8 }}>
          Hai diritto di accesso, rettifica, cancellazione, portabilità dei tuoi dati
          e di revocare il consenso in qualsiasi momento. Per esercitare i tuoi diritti,
          contattaci a <a href="mailto:farmamozart@gmail.com">farmamozart@gmail.com</a>.
        </p>
      </div>
    </section>
  );
}
