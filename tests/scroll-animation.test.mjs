import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("scroll reveal supports visible entrance motion and stagger delays", () => {
  const reveal = fs.readFileSync("src/components/reveal.tsx", "utf8");
  const css = fs.readFileSync("src/app/globals.css", "utf8");
  assert.match(reveal, /--reveal-delay/);
  assert.match(css, /\.reveal\{[^}]*opacity:0/);
  assert.match(css, /translateY\(44px\)/);
  assert.match(css, /filter:blur\(3px\)/);
  assert.match(css, /\.reveal\.is-visible\{[^}]*opacity:1/);
});
