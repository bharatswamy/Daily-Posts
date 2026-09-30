# DailyTransPosts.com SEO Blog — Design Specification

## Outcome

Build a production-ready, editorial-style blog for `dailytransposts.com` with 15 categories, exactly 5 useful articles per category (75 total), statically generated SEO routes, fast search, and a responsive publication-grade interface.

## Product direction

DailyTransPosts should feel like a modern independent publication rather than a generic blog template. The visual system uses a deep ink/navy foundation, warm paper surfaces, a bright editorial accent, a serif display face for headlines, and a neutral sans-serif for body/UI text. Layouts deliberately vary between featured editorial blocks, compact grids, split panels, and dense section rails while preserving consistent spacing and interaction patterns.

Success means a visitor can quickly understand the publication, discover useful content, browse by category, search articles, and read comfortably on mobile and desktop. SEO should be an extension of the information architecture rather than visible keyword stuffing.

## Architecture

- Next.js App Router with TypeScript.
- Static generation for the home page, all category pages, all article pages, and legal/information pages.
- Typed content model in `src/lib/content.ts` backed by structured data files in `content/categories` and `content/posts`.
- One shared site configuration for domain, title, description, social defaults, and navigation.
- Reusable presentational components for header, footer, cards, breadcrumbs, article layout, metadata, search, newsletter CTA, and reveal animations.
- No database or CMS dependency in the first version; adding a post means adding one content file and registering it in the content index.

## Content model

Each category contains:

- Stable slug and display name.
- Unique SEO title and description.
- Editorial introduction.
- Related category slugs.

Each post contains:

- Stable unique slug.
- Category slug.
- Unique title, excerpt, meta title, meta description, primary keyword, and secondary keywords.
- Author, published date, optional updated date.
- Image source, dimensions, and descriptive alt text.
- Structured content sections with H2/H3 headings, paragraphs, lists, callouts, and internal links.
- Related article slugs and previous/next links resolved from the index.

The 75 articles will intentionally mix beginner explanations, practical tutorials, comparisons, checklists, mistakes-to-avoid pieces, trend analysis, and FAQs so that each category has distinct search intent.

## Routing and SEO

Routes:

- `/`
- `/category/[slug]`
- `/blog/[slug]`
- `/search`
- `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`, `/sitemap`
- `/sitemap.xml` and `/robots.txt`

Every indexable route receives a canonical URL and unique metadata. Article pages emit Article and BreadcrumbList JSON-LD. The root emits Organization and WebSite JSON-LD. Category pages emit CollectionPage and BreadcrumbList JSON-LD. Article pages remain indexable and are included in the generated sitemap.

Internal linking is built into category cards, article body links, breadcrumbs, related articles, category navigation, and previous/next navigation. Search results are useful for visitors but are not included as indexable sitemap pages.

## UI and interaction system

- Sticky header with responsive navigation and a prominent search action.
- Homepage hero with a compact search field, featured article treatment, and layered editorial background.
- Varied homepage sections for all 15 categories, with featured/latest content and category-specific visual rhythm.
- Article view with breadcrumbs, category label, reading metadata, feature image, table of contents when appropriate, callouts, share actions, related content, previous/next navigation, and newsletter CTA.
- Category view with editorial introduction, lead story, article grid, and related categories.
- Search page with instant filtering and clear empty/loading states.
- IntersectionObserver-powered reveal animation with reduced-motion fallback; hover states on cards and images; no animation required for core usability.
- Keyboard-accessible menus, visible focus rings, semantic landmarks, descriptive labels, and adequate contrast.

## Performance and delivery

- Prefer static HTML and CSS; keep client components limited to navigation, search, share interactions, and reveal behavior.
- Use responsive image dimensions and lazy loading for non-hero imagery.
- Avoid unnecessary dependencies and third-party runtime calls.
- Keep fonts limited to the selected display/body families and load them through the framework's optimized font mechanism.
- Provide `.env.example` only for optional deployment settings; the core site runs without secrets.

## Verification

The implementation will include a validation script covering:

- 15 categories and exactly 75 posts.
- Exactly 5 posts per category.
- Unique slugs and unique SEO metadata.
- Every post assigned to an existing category.
- Every related/internal link resolving to an existing route.

The final verification pass will run the content validator, TypeScript checks, lint, production build, and link/route inspection. The result will be documented in `README.md` with local development and deployment instructions.
