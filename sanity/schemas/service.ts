// ============================================
// Sanity Schema — Service
// ============================================

const service = {
  name: 'service',
  title: 'Servizi',
  type: 'document',
  fields: [
    { name: 'title', title: 'Nome Servizio', type: 'string', validation: (Rule: any) => Rule.required().max(200) },
    { name: 'description', title: 'Descrizione', type: 'text', validation: (Rule: any) => Rule.required().max(500) },
    { name: 'icon', title: 'Icona (classe FontAwesome)', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'order', title: 'Ordine', type: 'number', initialValue: 0 },
  ],
  orderings: [{ title: 'Ordine', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
};

export default service;
