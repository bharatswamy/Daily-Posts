import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("homepage includes the redesigned editorial interaction sections", () => {
  const page = fs.readFileSync("src/app/page.tsx", "utf8");
  assert.match(page, /hero-ticker/);
  assert.match(page, /publication-stats/);
  assert.match(page, /editorial desk/);
  assert.match(page, /scroll-cue/);
  assert.match(page, /new-blogs-section/);
  assert.match(page, /New blogs/);
});

test("homepage uses motion-friendly reveal wrappers without rendered article images", () => {
  const page = fs.readFileSync("src/app/page.tsx", "utf8");
  assert.match(page, /<Reveal>/);
  assert.doesNotMatch(page, /next\/image/);
  assert.doesNotMatch(page, /<Image/);
});
