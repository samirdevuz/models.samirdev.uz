# models.samirdev.uz

The source for [models.samirdev.uz](https://models.samirdev.uz), Samir’s Blockbench and voxel-model archive.

## What it includes

- 15 Sketchfab-sourced model pages with search and category filters
- visible source and attribution information for every model
- a strict redistribution-rights gate before `.bbmodel` downloads become available
- private Supabase Storage files delivered through short-lived signed URLs
- a Supabase-authenticated admin area for provenance, licensing, and file management

## Local development

1. Install the pinned dependencies:

   ```bash
   npm ci
   ```

2. Copy `.env.example` to `.env.local` and provide the project-specific Supabase values.

3. Start the app:

   ```bash
   npm run dev
   ```

## Verification

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Database

The reproducible schema and policies live in `supabase/migrations/`. Seed data for the 15 catalog records is in `supabase/seed.sql`.

Downloads remain locked until the original creator, source, license, and redistribution permission have been verified for the individual model.
