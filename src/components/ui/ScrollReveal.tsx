'use client';

import { useEffect } from 'react';

const SELECTORS = [
  '.service-card',
  '.offer-card',
  '.product-card',
  '.contact-card',
  '.review-card',
  '.why-item',
  '.gallery-item',
  '.faq-item',
  '.volantino-card',
  '.offers-date-header',
  '.section-header',
  '.reviews-header-rating',
  '.hours-map',
  '.parallax-content',
].join(',');

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(SELECTORS);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
