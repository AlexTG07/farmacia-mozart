// ============================================
// Sanity Schema — Product
// ============================================

const product = {
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nome Prodotto', type: 'string', validation: (Rule: any) => Rule.required().max(200) },
    { name: 'description', title: 'Descrizione', type: 'text', validation: (Rule: any) => Rule.max(500) },
    { name: 'price', title: 'Prezzo (€)', type: 'number', validation: (Rule: any) => Rule.required().min(0) },
    { name: 'category', title: 'Categoria', type: 'reference', to: [{ type: 'category' }], validation: (Rule: any) => Rule.required() },
    { name: 'image', title: 'Immagine', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Testo alternativo' }] },
    { name: 'active', title: 'Attivo', type: 'boolean', initialValue: true },
    { name: 'order', title: 'Ordine', type: 'number', initialValue: 0 },
  ],
};

export default product;
