// ============================================
// Sanity Schema — Volantino (Flyer)
// ============================================

const flyer = {
  name: 'flyer',
  title: 'Volantini',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'image',
      title: 'Immagine Volantino',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Testo alternativo' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Valido dal',
      type: 'date',
      description: 'Data inizio validità del volantino.',
    },
    {
      name: 'endDate',
      title: 'Valido fino al',
      type: 'date',
      description: 'Data fine validità. I volantini scaduti non vengono mostrati.',
    },
    {
      name: 'active',
      title: 'Attivo',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Ordine',
      type: 'number',
      initialValue: 0,
    },
  ],
  orderings: [
    { title: 'Ordine', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
};

export default flyer;
