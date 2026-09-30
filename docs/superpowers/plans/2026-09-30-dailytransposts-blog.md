# DailyTransPosts Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build DailyTransPosts.com as a fast, editorial Next.js blog with 15 categories, exactly 75 useful articles, complete SEO metadata, search, and production-ready responsive UX.

**Architecture:** Use Next.js App Router with typed local content. Content is stored separately from components and resolved through one content library; route files focus on rendering and metadata. Static generation covers every article/category route, while only navigation and search require client-side behavior.

**Tech Stack:** Next.js, React, TypeScript, CSS, local structured content, Node validation scripts.

**Spec:** `docs/superpowers/specs/2026-09-30-dailytransposts-blog-design.md`

## Global Constraints

- Exactly 15 categories and exactly 5 unique posts per category.
- Every post has unique slug, title, excerpt, meta title, meta description, primary keyword, and structured content.
- Article pages are indexable and included in the sitemap.
- No database, CMS, or unnecessary runtime dependency.
- Use semantic HTML, accessible controls, responsive imagery, canonical URLs, Open Graph/Twitter metadata, JSON-LD, breadcrumbs, and internal links.
- Keep client components limited to navigation, search, share interactions, and reveal behavior.

## Review Focus

- Empty and partial search queries must return a useful empty state rather than throwing or showing every post; test in Task 4.
- A malformed or unresolved related-post slug must be caught by validation before build; test in Task 2.
- Missing optional updated dates must not render an invalid metadata field; test in Task 2.
- Mobile navigation must be keyboard operable and close after selecting a route; test in Task 5.
- Reduced-motion users must not receive mandatory animation delays; test in Task 5.

### Task 1: App foundation and typed content library

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`
- Create: `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/lib/site.ts`, `src/lib/content.ts`, `src/lib/types.ts`
- Create: `content/categories.ts`, `content/posts.ts`
- Create: `scripts/validate-content.mjs`
- Test: `tests/content-library.test.mjs`

**Interfaces:**
- Produces `Category`, `Post`, `ContentSection`, `getCategoryBySlug(slug)`, `getPostBySlug(slug)`, `getPostsByCategory(slug)`, `getAllPosts()`, and `getAllCategories()` for later tasks.

- [ ] **Step 1: Write the failing content-library test** asserting the exported collections contain 15 categories, 75 posts, 5 posts per category, and unique slugs.
- [ ] **Step 2: Run `node --test tests/content-library.test.mjs` and verify it fails because the app/content modules do not exist.**
- [ ] **Step 3: Implement the Next.js foundation and typed content interfaces.** Use a single resolver module to expose stable lookup functions and keep raw content separate from components.
- [ ] **Step 4: Add the 15 category records and initial content index shape.** Keep each category slug stable and URL-safe.
- [ ] **Step 5: Run the content test and `npm run typecheck`; verify the collection assertions pass and TypeScript has no errors.**
- [ ] **Step 6: Commit as `feat: add app foundation and content library`.**

### Task 2: Write and validate the 75 SEO articles

**Files:**
- Modify: `content/posts.ts`
- Modify: `src/lib/content.ts`
- Modify: `scripts/validate-content.mjs`
- Modify: `tests/content-library.test.mjs`
- Create: `content/authors.ts`

**Interfaces:**
- Consumes the `Post` and `Category` types from Task 1.
- Produces complete `Post` records with `seo`, `body`, `relatedSlugs`, image metadata, dates, and optional `updatedAt`.

- [ ] **Step 1: Extend the failing validation test** to assert every post has an H1-equivalent title, non-empty body sections, unique SEO fields, valid category, descriptive image alt text, and related slugs that resolve.
- [ ] **Step 2: Run the validator and verify it fails for incomplete records.**
- [ ] **Step 3: Write exactly 5 distinct posts for each of the 15 categories.** Each record must use a distinct search intent and include a useful introduction, multiple H2/H3 sections, lists or callouts where appropriate, internal links, author, dates, keywords, metadata, and image metadata; target roughly 1,000–1,800 words per article.
- [ ] **Step 4: Implement validator rules for counts, uniqueness, category membership, non-empty structured content, related links, canonical-safe slugs, and metadata completeness.**
- [ ] **Step 5: Run `node scripts/validate-content.mjs` and `node --test tests/content-library.test.mjs`; verify 15 categories, 75 posts, and 5 posts per category with zero validation errors.
- [ ] **Step 6: Commit as `feat: add 75 seo-ready articles`.**

### Task 3: Shared publication UI and SEO primitives

**Files:**
- Create: `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/article-card.tsx`
- Create: `src/components/breadcrumbs.tsx`, `src/components/newsletter-cta.tsx`, `src/components/reveal.tsx`
- Create: `src/components/seo-json-ld.tsx`, `src/components/share-actions.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes content types and site configuration from Task 1.
- Produces reusable components with semantic landmarks, visible focus states, and stable class names for route composition.

- [ ] **Step 1: Add component-level tests for breadcrumbs, article-card links, optional updated dates, and accessible labels.**
- [ ] **Step 2: Run the component tests and verify they fail before implementations exist.**
- [ ] **Step 3: Implement the shared UI with the editorial visual system: ink/navy, paper surfaces, warm accent, serif display headlines, sans-serif body copy, varied card density, restrained shadows, and responsive layouts.**
- [ ] **Step 4: Implement JSON-LD helpers for Organization, WebSite, Article, BreadcrumbList, and CollectionPage payloads.**
- [ ] **Step 5: Run component tests and `npm run typecheck`; verify they pass and no invalid optional metadata is emitted.**
- [ ] **Step 6: Commit as `feat: add publication ui primitives`.**

### Task 4: Routes, homepage, categories, articles, legal pages, and search

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/category/[slug]/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/app/search/page.tsx`, `src/components/search-interface.tsx`
- Create: `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`, `src/app/disclaimer/page.tsx`, `src/app/sitemap/page.tsx`
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`
- Create: `tests/routes.test.mjs`

**Interfaces:**
- Consumes all content resolvers and shared UI from Tasks 1–3.
- Produces `generateStaticParams`, `generateMetadata`, and rendered pages for every required route.

- [ ] **Step 1: Write route tests** asserting every category and post has a route, sitemap contains all indexable URLs, robots allows crawling, and metadata exposes canonical/title/description values.
- [ ] **Step 2: Run route tests and verify they fail before route modules exist.**
- [ ] **Step 3: Implement the homepage with hero/search, featured articles, latest articles, all 15 category sections, newsletter, final CTA, and footer using varied editorial layouts rather than repeated identical grids.**
- [ ] **Step 4: Implement category pages with unique introductions, featured post, complete category listing, related categories, metadata, and CollectionPage/BreadcrumbList JSON-LD.**
- [ ] **Step 5: Implement article pages with breadcrumbs, category, H1, excerpt, author/date metadata, feature image, table of contents, structured body, callouts, internal links, related articles, previous/next links, share actions, newsletter CTA, Article/BreadcrumbList JSON-LD, and unique metadata.**
- [ ] **Step 6: Implement static information/legal pages, sitemap page, XML sitemap, and robots route.**
- [ ] **Step 7: Implement search over title, excerpt, category, keywords, and body text with empty-state handling and non-indexable search metadata.**
- [ ] **Step 8: Run route tests and `npm run typecheck`; verify all route and metadata assertions pass.**
- [ ] **Step 9: Commit as `feat: add blog routes and seo surface`.**

### Task 5: Responsive polish, interaction behavior, and accessibility

**Files:**
- Modify: `src/components/site-header.tsx`, `src/components/search-interface.tsx`, `src/components/reveal.tsx`
- Modify: `src/app/globals.css`
- Create: `tests/accessibility-behavior.test.mjs`

**Interfaces:**
- Consumes the complete route/UI surface from Tasks 3–4.
- Produces keyboard-safe navigation, reduced-motion behavior, responsive layout rules, and consistent interaction states.

- [ ] **Step 1: Write behavior tests** for mobile menu toggle/close, focus-visible styles, reduced-motion CSS behavior, and search empty state.
- [ ] **Step 2: Run behavior tests and verify failures identify missing interaction behavior.**
- [ ] **Step 3: Implement responsive navigation, focus management, escape-to-close, scroll reveal with reduced-motion fallback, card hover/image effects, and compact mobile typography/layout.**
- [ ] **Step 4: Run behavior tests and inspect the homepage, category, article, and search routes at mobile/tablet/desktop widths.**
- [ ] **Step 5: Commit as `feat: polish responsive publication interactions`.**

### Task 6: Documentation and production verification

**Files:**
- Create: `README.md`, `.env.example`
- Modify: `package.json`
- Modify: `scripts/validate-content.mjs`

**Interfaces:**
- Consumes all routes/content/scripts from Tasks 1–5.
- Produces documented local/deployment commands and a production verification command sequence.

- [ ] **Step 1: Add scripts for `dev`, `build`, `start`, `lint`, `typecheck`, `test`, and `validate:content`.**
- [ ] **Step 2: Document setup, content authoring, route structure, SEO behavior, build/deployment, and verification in `README.md`; document optional environment variables in `.env.example`.**
- [ ] **Step 3: Run `npm install`, `npm run validate:content`, `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`; read each result and fix any failures.**
- [ ] **Step 4: Run a final route/link audit against all 75 article pages and 15 category pages; verify no missing images or unresolved internal links.**
- [ ] **Step 5: Commit as `chore: document and verify production build`.**
