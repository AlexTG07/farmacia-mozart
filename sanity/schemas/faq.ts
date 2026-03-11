// ============================================
// Sanity Schema — FAQ
// ============================================

const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Domanda', type: 'string', validation: (Rule: any) => Rule.required().max(300) },
    { name: 'answer', title: 'Risposta', type: 'text', validation: (Rule: any) => Rule.required().max(1000) },
    { name: 'order', title: 'Ordine', type: 'number', initialValue: 0 },
  ],
  orderings: [{ title: 'Ordine', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
};

export default faq;
