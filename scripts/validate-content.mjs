import { categories, posts as existingPosts } from "../content/posts.mjs";
import { posts as addedPosts } from "../content/new-posts.mjs";

const posts = [...existingPosts, ...addedPosts];

const errors = [];
const categorySlugs = new Set(categories.map((category) => category.slug));
const postSlugs = new Set(posts.map((post) => post.slug));
const checkUnique = (label, values) => { const seen = new Set(); values.forEach((value, index) => { if (!value || seen.has(value)) errors.push(`${label} duplicate/empty at ${index}: ${value}`); seen.add(value); }); };
if (categories.length !== 15) errors.push(`Expected 15 categories, got ${categories.length}`);
if (existingPosts.length !== 200) errors.push(`Existing library changed: expected 200 posts, got ${existingPosts.length}`);
if (addedPosts.length !== 150) errors.push(`Expected 150 new posts, got ${addedPosts.length}`);
if (posts.length !== 350) errors.push(`Expected 350 total posts, got ${posts.length}`);
checkUnique("category slug", categories.map((category) => category.slug));
checkUnique("post slug", posts.map((post) => post.slug));
const existingSlugs = new Set(existingPosts.map((post) => post.slug));
for (const post of addedPosts) if (existingSlugs.has(post.slug)) errors.push(`New post conflicts with existing slug: ${post.slug}`);
for (const category of categories) if (posts.filter((post) => post.categorySlug === category.slug).length < 5) errors.push(`${category.slug} must have at least 5 posts`);
for (const post of posts) {
  if (!categorySlugs.has(post.categorySlug)) errors.push(`${post.slug} has invalid category`);
  if (!post.title || !post.excerpt || !post.body?.length || !post.image?.alt) errors.push(`${post.slug} is missing core content`);
  if (!post.seo?.metaTitle || !post.seo?.metaDescription || !post.seo?.primaryKeyword) errors.push(`${post.slug} is missing SEO metadata`);
  post.relatedSlugs.forEach((slug) => { if (!postSlugs.has(slug)) errors.push(`${post.slug} links to missing ${slug}`); });
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Validated ${categories.length} categories and ${posts.length} posts.`);
