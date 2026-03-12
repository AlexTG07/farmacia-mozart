import SectionHeader from '../ui/SectionHeader';

const IMAGES = [
  { src: '/img/farmacia-esterno-1.jpg', alt: 'Farmacia Mozart — Vista esterna con insegna', label: 'Esterno' },
  { src: '/img/farmacia-interno-1.jpg', alt: 'Farmacia Mozart — Interno con scaffali prodotti', label: 'Interno' },
  { src: '/img/farmacia-esterno-2.jpg', alt: 'Farmacia Mozart — Ingresso principale', label: 'Ingresso' },
  { src: '/img/farmacia-interno-2.jpg', alt: 'Farmacia Mozart — Reparti e corsie prodotti', label: 'Prodotti' },
];

export default function GallerySection() {
  return (
    <section className="gallery" id="galleria">
      <div className="container">
        <SectionHeader
          badge="La Nostra Farmacia"
          badgeIcon={<span aria-hidden="true">📸</span>}
          title="Scopri i nostri spazi"
          description="Esterno e interno della Farmacia Mozart a Pioltello."
        />
        <div className="gallery-grid">
          {IMAGES.map((img, i) => (
            <div className="gallery-item" key={i}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                width={600}
                height={400}
              />
              <div className="gallery-overlay">
                <span className="gallery-label">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
