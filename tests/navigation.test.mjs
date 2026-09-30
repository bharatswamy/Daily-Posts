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

test("primary header includes a dedicated home button", () => {
  const header = fs.readFileSync("src/components/site-header.tsx", "utf8");
  assert.match(header, /nav-home/);
  assert.match(header, /href="\/"/);
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

test("category pages use the premium editorial layout and explicit home link", () => {
  const page = fs.readFileSync("src/app/category/[slug]/page.tsx", "utf8");
  assert.match(page, /category-hero/);
  assert.match(page, /category-featured/);
  assert.match(page, /category-home-link/);
  assert.match(page, /category-meta-strip/);
  assert.match(page, /category-story-row/);
  assert.match(page, /category-switcher/);
  assert.match(page, /Related categories/);
});

test("contact page does not expose the previous email address", () => {
  const page = fs.readFileSync("src/app/contact/page.tsx", "utf8");
  assert.doesNotMatch(page, /hello@dailytransposts\.com/);
});
