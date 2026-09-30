# DailyTransPosts.com

DailyTransPosts is a fast, editorial-style Next.js publication with 15 categories and 200 structured SEO articles.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify and build

```bash
npm run validate:content
npm test
npm run typecheck
npm run build
npm start
```

The content validator checks the 15-category / 200-post contract, unique slugs, category membership, SEO fields, image alt text, and related article links.

## Content architecture

- `content/posts.mjs` is the content source of truth.
- `content/posts.d.mts` provides TypeScript declarations for the content source.
- `src/lib/content.ts` exposes typed lookup functions used by every route.
- `src/app/category/[slug]` and `src/app/blog/[slug]` statically generate category and article pages.
- `src/app/sitemap.ts` and `src/app/robots.ts` generate technical SEO routes.

To add an article, add a complete record to `content/posts.mjs`, keep the category count at five unless intentionally expanding the content contract, and run the validator.

## Deployment

The app can deploy to any Next.js-compatible host. Set `NEXT_PUBLIC_SITE_URL` only if a future deployment needs an environment-specific domain; the current production domain is configured in `src/lib/site.ts`.
