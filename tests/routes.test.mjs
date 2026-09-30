import test from "node:test";
import assert from "node:assert/strict";
import { categories, posts } from "../content/posts.mjs";

test("the generated route inputs cover every indexable category and article", () => {
  assert.equal(categories.length, 15);
  assert.equal(posts.length, 200);
  assert.equal(new Set(posts.map((post) => post.slug)).size, 200);
  for (const post of posts) {
    assert.match(`/blog/${post.slug}`, /^\/blog\/[a-z0-9-]+$/);
    assert.match(`/category/${post.categorySlug}`, /^\/category\/[a-z0-9-]+$/);
    assert.ok(post.seo.metaTitle && post.seo.metaDescription);
  }
});
