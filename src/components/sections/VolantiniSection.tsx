'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionHeader from '../ui/SectionHeader';
import { urlFor } from '@/lib/sanity/client';
import type { Flyer } from '@/types';

interface VolantiniSectionProps {
  flyers: Flyer[];
}

export default function VolantiniSection({ flyers }: VolantiniSectionProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!flyers.length) return null;

  const today = new Date().toISOString().slice(0, 10);
  const activeFlyers = flyers.filter(f => {
    if (f.endDate && f.endDate < today) return false;
    return true;
  });

  if (!activeFlyers.length) return null;

  return (
    <>
      <section className="volantini" id="volantini">
        <div className="container">
          <SectionHeader
            badge="Volantini"
            badgeIcon={<span aria-hidden="true">📄</span>}
            title="I nostri volantini"
            description="Scopri le promozioni in corso: sfoglia i volantini e le locandine della farmacia."
          />
          <div className="volantini-grid">
            {activeFlyers.map((flyer) => {
              const imgUrl = flyer.image?.asset
                ? urlFor(flyer.image).width(600).height(850).fit('crop').url()
                : null;

              return (
                <button
                  key={flyer._id}
                  className="volantino-card"
                  onClick={() => imgUrl && setLightbox(imgUrl)}
                  aria-label={`Apri volantino: ${flyer.title}`}
                  type="button"
                >
                  <div className="volantino-img">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={flyer.image?.alt || flyer.title}
                        width={600}
                        height={850}
                        quality={90}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                      />
                    ) : (
                      <span aria-hidden="true">📄</span>
                    )}
                  </div>
                  <div className="volantino-info">
                    <h3>{flyer.title}</h3>
                    {flyer.startDate && flyer.endDate && (
                      <p className="volantino-dates">
                        Dal {new Date(flyer.startDate).toLocaleDateString('it-IT')} al{' '}
                        {new Date(flyer.endDate).toLocaleDateString('it-IT')}
                      </p>
                    )}
                  </div>
                  <span className="volantino-zoom" aria-hidden="true">🔍</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="volantini-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Volantino ingrandito"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Chiudi"
            type="button"
          >
            ✕
          </button>
          <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox}
              alt="Volantino ingrandito"
              width={900}
              height={1275}
              quality={95}
              sizes="90vw"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
