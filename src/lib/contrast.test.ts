import { describe, expect, it } from "vitest";
import { contrastRatio } from "@/lib/contrast";

describe("contrastRatio", () => {
  it("returns 21 for black on white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
  });

  it("is symmetric", () => {
    expect(contrastRatio("#346d57", "#ffffff")).toBe(contrastRatio("#ffffff", "#346d57"));
  });

  it("rejects colours that are not #rrggbb", () => {
    expect(() => contrastRatio("#fff", "#000000")).toThrow(/#rrggbb/);
  });
});
