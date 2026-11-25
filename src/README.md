# CITY FOOD — Deployment Snapshot

This folder preserves the production-served CITY FOOD build recovered from Vercel deployment `dpl_7sdfZ19vwqdCRrZbNXbLE4keh6sh`.

- The deployable browser bundle and stylesheet are preserved under `public/assets/`.
- `index.html`, PWA manifest, service worker, icon, and Vite configuration are preserved.
- The original unbundled `src/main.js` and `src/style.css` were not fully retrievable from the deployment source endpoint. This snapshot therefore preserves the exact served build rather than inventing or silently reconstructing those source files.
- Supabase client configuration is embedded in the public browser bundle as it was in the live deployment. It is a publishable client key, not a service-role secret; database security must rely on RLS and server-side authorization.

Build from this directory with `npm run build`.