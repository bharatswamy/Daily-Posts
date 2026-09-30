import test from "node:test";
import assert from "node:assert/strict";
import { categories as existingCategories, posts as existingPosts } from "../content/posts.mjs";
import { categories as newCategories, posts as newPosts } from "../content/new-posts.mjs";

test("new content adds exactly ten non-conflicting posts per existing category", () => {
  assert.equal(newCategories.length, 15);
  assert.equal(newPosts.length, 150);

  const existingSlugs = new Set(existingPosts.map((post) => post.slug));
  const newSlugs = new Set(newPosts.map((post) => post.slug));
  const existingTitles = new Set(existingPosts.map((post) => post.title.toLowerCase()));

  assert.equal(newSlugs.size, newPosts.length);
  assert.equal(newPosts.filter((post) => existingSlugs.has(post.slug)).length, 0);
  assert.equal(newPosts.filter((post) => existingTitles.has(post.title.toLowerCase())).length, 0);

  for (const category of existingCategories) {
    const categoryPosts = newPosts.filter((post) => post.categorySlug === category.slug);
    assert.equal(categoryPosts.length, 10, `expected ten new posts for ${category.name}`);
  }
});

test("new articles have complete SEO fields and substantial original content", () => {
  for (const post of newPosts) {
    assert.ok(post.title.length >= 30);
    assert.ok(post.slug.length >= 12);
    assert.ok(post.excerpt.length >= 100);
    assert.ok(post.seo.metaTitle.length >= 30);
    assert.ok(post.seo.metaDescription.length >= 120);
    assert.ok(post.seo.primaryKeyword.length >= 4);
    assert.ok(post.seo.secondaryKeywords.length >= 3);
    assert.ok(post.image.alt.length >= 20);
    assert.ok(post.relatedSlugs.length >= 2);
    assert.ok(post.body.length >= 12);
    assert.ok(post.body.some((section) => section.type === "heading" && section.level === 3), `${post.slug} needs an H3 section`);
    assert.ok(post.body.some((section) => section.type === "heading" && section.text === "Frequently Asked Questions"), `${post.slug} needs an FAQ section`);

    const words = post.body
      .map((section) => "text" in section ? section.text : "items" in section ? section.items.join(" ") : "")
      .join(" ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    assert.ok(words.length >= 650, `${post.slug} has only ${words.length} words`);
  }
});
