import test from "node:test";
import assert from "node:assert/strict";
import { categories, posts } from "../content/posts.mjs";

test("content library contains the required publication shape", () => {
  assert.equal(categories.length, 15);
  assert.equal(posts.length, 200);
  assert.equal(new Set(categories.map((category) => category.slug)).size, 15);
  for (const category of categories) {
    assert.ok(posts.filter((post) => post.categorySlug === category.slug).length >= 5);
  }
});
