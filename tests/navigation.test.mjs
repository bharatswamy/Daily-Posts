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

test("categories directory has its own scroll and hover motion system", () => {
  const page = fs.readFileSync("src/app/categories/page.tsx", "utf8");
  const css = fs.readFileSync("src/app/globals.css", "utf8");
  assert.match(page, /category-atlas/);
  assert.match(page, /atlas-tile/);
  assert.match(page, /<Reveal/);
  assert.match(css, /atlas-sweep/);
  assert.match(css, /atlas-float/);
});

test("categories directory has a featured doorway and interactive tile depth", () => {
  const page = fs.readFileSync("src/app/categories/page.tsx", "utf8");
  const css = fs.readFileSync("src/app/globals.css", "utf8");
  assert.match(page, /atlas-spotlight/);
  assert.match(page, /atlas-rail/);
  assert.match(css, /atlas-spotlight/);
  assert.match(css, /atlas-tile-depth/);
});

test("blogs directory has an editorial showcase and animated filters", () => {
  const page = fs.readFileSync("src/app/blogs/page.tsx", "utf8");
  const css = fs.readFileSync("src/app/globals.css", "utf8");
  assert.match(page, /blog-library/);
  assert.match(page, /blog-showcase/);
  assert.match(page, /library-filter/);
  assert.match(page, /<Reveal/);
  assert.match(css, /blog-showcase/);
  assert.match(css, /library-filter/);
});

test("blogs directory progressively reveals the article library", () => {
  const page = fs.readFileSync("src/app/blogs/page.tsx", "utf8");
  const loader = fs.readFileSync("src/components/load-more-posts.tsx", "utf8");
  assert.match(page, /LoadMorePosts/);
  assert.match(page, /initialVisible/);
  assert.match(loader, /useState/);
  assert.match(loader, /Load more articles/);
  assert.match(loader, /remainingPosts/);
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
