export type Author = { name: string; role: string };
export type ImageMeta = { src: string; alt: string; width: number; height: number };
export type ContentSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "accent" | "muted"; text: string };
export type Category = { name: string; slug: string; description: string; seoTitle: string; seoDescription: string };
export type Post = {
  slug: string; categorySlug: string; title: string; excerpt: string; author: Author; publishedAt: string; updatedAt?: string;
  seo: { metaTitle: string; metaDescription: string; primaryKeyword: string; secondaryKeywords: string[] };
  image: ImageMeta; body: ContentSection[]; relatedSlugs: string[];
};
