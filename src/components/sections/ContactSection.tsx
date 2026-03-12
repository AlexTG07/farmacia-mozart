import SectionHeader from '../ui/SectionHeader';

export default function ContactSection() {
  return (
    <section id="contatti">
      <div className="container">
        <SectionHeader
          badge="Contatti"
          badgeIcon={<span aria-hidden="true">📞</span>}
          title="Parliamo!"
          description="Scegli il canale che preferisci — WhatsApp è il più veloce!"
        />
        <div className="contact-grid">
          <a
            href="https://wa.me/390292140862"
            className="contact-card whatsapp-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i aria-hidden="true">💬</i>
            <h3>WhatsApp</h3>
            <p>02 9214 0862<br /><strong>Risposta rapida</strong></p>
          </a>
          <a href="tel:+390292140862" className="contact-card">
            <i aria-hidden="true">📞</i>
            <h3>Telefono</h3>
            <p>02 9214 0862</p>
          </a>
          <a
            href="https://www.google.com/maps/search/Farmacia+Mozart,+Via+Wolfgang+Amadeus+Mozart+41,+20096+Pioltello+MI"
            className="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i aria-hidden="true">📍</i>
            <h3>Indirizzo</h3>
            <p>Via Mozart, 41<br />20096 Pioltello (MI)</p>
          </a>
          <a href="mailto:farmaciamozart@gmail.com" className="contact-card">
            <i aria-hidden="true">✉️</i>
            <h3>Email</h3>
            <p>farmaciamozart@gmail.com</p>
          </a>
        </div>
        <p className="contact-hint">
          💡 Preferisci <strong>WhatsApp</strong>? È il modo più rapido per ricevere assistenza!
        </p>
      </div>
    </section>
  );
}
