import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("homepage exposes the kinetic editorial motion system", () => {
  const page = fs.readFileSync("src/app/page.tsx", "utf8");
  const css = fs.readFileSync("src/app/globals.css", "utf8");
  assert.match(page, /headline-word/);
  assert.match(page, /motion-quote/);
  assert.match(css, /headline-drift/);
  assert.match(css, /editorial-sweep/);
  assert.match(css, /texture-drift/);
  assert.match(css, /tilt-in/);
});
