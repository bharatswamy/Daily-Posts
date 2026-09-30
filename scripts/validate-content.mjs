import { categories, posts } from "../content/posts.mjs";

const errors = [];
const categorySlugs = new Set(categories.map((category) => category.slug));
const postSlugs = new Set(posts.map((post) => post.slug));
const checkUnique = (label, values) => { const seen = new Set(); values.forEach((value, index) => { if (!value || seen.has(value)) errors.push(`${label} duplicate/empty at ${index}: ${value}`); seen.add(value); }); };
if (categories.length !== 15) errors.push(`Expected 15 categories, got ${categories.length}`);
if (posts.length !== 200) errors.push(`Expected 200 posts, got ${posts.length}`);
checkUnique("category slug", categories.map((category) => category.slug));
checkUnique("post slug", posts.map((post) => post.slug));
for (const category of categories) if (posts.filter((post) => post.categorySlug === category.slug).length < 5) errors.push(`${category.slug} must have at least 5 posts`);
for (const post of posts) {
  if (!categorySlugs.has(post.categorySlug)) errors.push(`${post.slug} has invalid category`);
  if (!post.title || !post.excerpt || !post.body?.length || !post.image?.alt) errors.push(`${post.slug} is missing core content`);
  if (!post.seo?.metaTitle || !post.seo?.metaDescription || !post.seo?.primaryKeyword) errors.push(`${post.slug} is missing SEO metadata`);
  post.relatedSlugs.forEach((slug) => { if (!postSlugs.has(slug)) errors.push(`${post.slug} links to missing ${slug}`); });
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Validated ${categories.length} categories and ${posts.length} posts.`);
