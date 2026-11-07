import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "@/lib/contrast";

// Reads the real tokens from global.css so a colour change cannot silently break AA.
const css = readFileSync(new URL("./global.css", import.meta.url), "utf8");
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, name, hex]) => [name, hex]),
);
const color = (name: string) => {
  if (name === "white") return "#ffffff";
  const hex = tokens[name];
  if (!hex) throw new Error(`Token --color-${name} missing in global.css`);
  return hex;
};

const TEXT = 4.5; // WCAG 1.4.3, normal text
const UI = 3; // WCAG 1.4.11, focus rings and graphics

const pairs: [fg: string, bg: string, min: number, usage: string][] = [
  ["ink", "white", TEXT, "body text"],
  ["ink-muted", "white", TEXT, "secondary text"],
  ["ink", "surface", TEXT, "text in cards and info boxes"],
  ["brand", "white", TEXT, "headings, links, secondary buttons"],
  ["brand", "surface", TEXT, "headings in cards"],
  ["white", "brand", TEXT, "header/footer text on green"],
  ["white", "brand-strong", TEXT, "text on hovered green"],
  ["ink", "accent", TEXT, "primary CTA"],
  ["ink", "accent-strong", TEXT, "primary CTA hover"],
  ["ink", "white", UI, "focus ring on white"],
  ["accent", "brand", UI, "focus ring on green"],
  ["step-build", "white", UI, "learning-step graphic"],
  ["step-think", "white", UI, "learning-step graphic"],
  ["step-control", "white", UI, "learning-step graphic"],
  ["step-automate", "white", UI, "learning-step graphic"],
  ["step-innovate", "white", UI, "learning-step graphic"],
];

describe("design token contrast", () => {
  it.each(pairs)("%s on %s reaches %d:1 (%s)", (fg, bg, min) => {
    expect(contrastRatio(color(fg), color(bg))).toBeGreaterThanOrEqual(min);
  });

  it("white on accent is rejected, so the CTA must keep dark text", () => {
    expect(contrastRatio(color("white"), color("accent"))).toBeLessThan(TEXT);
  });
});
