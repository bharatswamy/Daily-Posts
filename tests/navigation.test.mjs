import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("publication navigation exposes categories, blogs, about, and contact", () => {
  const site = fs.readFileSync("src/lib/site.ts", "utf8");
  assert.match(site, /Categories/);
  assert.match(site, /Blogs/);
  assert.match(site, /About Us/);
  assert.match(site, /Contact/);
});

test("text-first cards do not render remote article images", () => {
  const card = fs.readFileSync("src/components/article-card.tsx", "utf8");
  assert.doesNotMatch(card, /next\/image/);
  assert.doesNotMatch(card, /post\.image/);
});

test("categories and blogs discovery pages exist", () => {
  assert.equal(fs.existsSync("src/app/categories/page.tsx"), true);
  assert.equal(fs.existsSync("src/app/blogs/page.tsx"), true);
});
