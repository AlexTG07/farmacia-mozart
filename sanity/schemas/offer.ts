// ============================================
// Sanity Schema — Offer
// ============================================

const offer = {
  name: 'offer',
  title: 'Offerte',
  type: 'document',
  fields: [
    { name: 'product', title: 'Prodotto', type: 'reference', to: [{ type: 'product' }], validation: (Rule: any) => Rule.required() },
    { name: 'discountedPrice', title: 'Prezzo Offerta (€)', type: 'number', validation: (Rule: any) => Rule.required().min(0) },
    { name: 'badge', title: 'Badge (es. -30%)', type: 'string', validation: (Rule: any) => Rule.max(20) },
    { name: 'startDate', title: 'Data Inizio Offerta', type: 'date', description: 'Se impostata, l\'offerta sarà visibile come "Prossimamente" fino a questa data.' },
    { name: 'endDate', title: 'Data Fine Offerta', type: 'date', description: 'L\'offerta scadrà automaticamente dopo questa data.' },
    { name: 'active', title: 'Attiva', type: 'boolean', initialValue: true },
    { name: 'order', title: 'Ordine', type: 'number', initialValue: 0 },
  ],
  preview: {
    select: {
      title: 'product.name',
      subtitle: 'discountedPrice',
      media: 'product.image',
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title: title || 'Prodotto non selezionato',
        subtitle: subtitle ? `€${subtitle}` : '',
        media,
      };
    },
  },
  orderings: [{ title: 'Ordine', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
};

export default offer;
