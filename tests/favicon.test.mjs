import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("DailyTransPosts has a branded favicon", () => {
  const icon = fs.readFileSync("src/app/icon.svg", "utf8");
  assert.match(icon, /DailyTransPosts/);
  assert.match(icon, /DT/);
  assert.match(icon, /#13232d/);
  assert.match(icon, /#e75d3f/);
});
