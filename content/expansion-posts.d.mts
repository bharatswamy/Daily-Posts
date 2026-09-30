export const categories: Array<{ name: string; slug: string; description: string; seoTitle: string; seoDescription: string }>;
export const posts: Array<{
  slug: string; categorySlug: string; title: string; excerpt: string; searchIntent?: string;
  author: { name: string; role: string }; publishedAt: string; updatedAt?: string;
  seo: { metaTitle: string; metaDescription: string; primaryKeyword: string; secondaryKeywords: string[] };
  image: { src: string; alt: string; width: number; height: number };
  body: Array<Record<string, unknown>>; relatedSlugs: string[];
}>;
