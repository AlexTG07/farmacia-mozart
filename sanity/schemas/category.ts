// ============================================
// Sanity Schema — Category
// ============================================

const category = {
  name: 'category',
  title: 'Categorie',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nome', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
  ],
};

export default category;
