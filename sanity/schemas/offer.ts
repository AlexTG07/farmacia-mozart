// ============================================
// Sanity Schema — Offer
// ============================================

const offer = {
  name: 'offer',
  title: 'Offerte',
  type: 'document',
  fields: [
    { name: 'title', title: 'Nome Prodotto', type: 'string', validation: (Rule: any) => Rule.required().max(200) },
    { name: 'description', title: 'Descrizione', type: 'text', validation: (Rule: any) => Rule.max(500) },
    { name: 'originalPrice', title: 'Prezzo Originale (€)', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'discountedPrice', title: 'Prezzo Offerta (€)', type: 'number', validation: (Rule: any) => Rule.min(0) },
    { name: 'image', title: 'Immagine', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Testo alternativo' }] },
    { name: 'badge', title: 'Badge (es. -30%)', type: 'string', validation: (Rule: any) => Rule.max(20) },
    { name: 'active', title: 'Attiva', type: 'boolean', initialValue: true },
    { name: 'order', title: 'Ordine', type: 'number', initialValue: 0 },
  ],
  orderings: [{ title: 'Ordine', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
};

export default offer;
