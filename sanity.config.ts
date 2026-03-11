// ============================================
// Sanity Studio Configuration
// ============================================

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'farmacia-mozart',
  title: 'Farmacia Mozart',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b9t6jgo1',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
});
