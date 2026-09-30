import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("article reading layout places the article body before the table of contents rail", () => {
  const page = fs.readFileSync("src/app/blog/[slug]/page.tsx", "utf8");
  const bodyIndex = page.indexOf("<ArticleBody sections={post.body}/>");
  const tocIndex = page.indexOf("className=\"toc\"");
  assert.ok(bodyIndex >= 0 && tocIndex >= 0 && bodyIndex < tocIndex);
});
