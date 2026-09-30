import test from "node:test";
import assert from "node:assert/strict";
import { posts as existingPosts } from "../content/posts.mjs";
import { posts as firstExpansion } from "../content/new-posts.mjs";
import { categories as expansionCategories, posts as expansionPosts } from "../content/expansion-posts.mjs";

test("SEO expansion adds four new categories and twelve articles per category", () => {
  assert.equal(expansionCategories.length, 19);
  assert.equal(expansionPosts.length, 48);
  const counts = Object.fromEntries(expansionCategories.slice(15).map((category) => [category.slug, expansionPosts.filter((post) => post.categorySlug === category.slug).length]));
  assert.deepEqual(Object.values(counts), [12, 12, 12, 12]);
});

test("SEO expansion remains additive and each article is substantial", () => {
  const existingSlugs = new Set([...existingPosts, ...firstExpansion].map((post) => post.slug));
  const expansionSlugs = new Set(expansionPosts.map((post) => post.slug));
  assert.equal(expansionSlugs.size, expansionPosts.length);
  assert.equal(expansionPosts.filter((post) => existingSlugs.has(post.slug)).length, 0);
  for (const post of expansionPosts) {
    assert.ok(post.title.length >= 30);
    assert.ok(post.excerpt.length >= 100);
    assert.ok(post.seo.metaTitle && post.seo.metaDescription && post.seo.primaryKeyword);
    assert.ok(post.image.alt.length >= 20);
    assert.ok(post.relatedSlugs.length >= 2);
    assert.ok(post.body.some((section) => section.type === "heading" && section.level === 3));
    assert.ok(post.body.some((section) => section.type === "heading" && section.text === "Frequently Asked Questions"));
    const words = post.body.map((section) => "text" in section ? section.text : "items" in section ? section.items.join(" ") : "").join(" ").split(/\s+/).filter(Boolean);
    assert.ok(words.length >= 900, `${post.slug} has only ${words.length} words`);
  }
});
