import { describe, expect, it } from "vitest";

import { clampProgress } from "../sei-progress-bar";

describe("clampProgress", () => {
  it("passes through in-range values (rounded)", () => {
    expect(clampProgress(0)).toBe(0);
    expect(clampProgress(50)).toBe(50);
    expect(clampProgress(100)).toBe(100);
    expect(clampProgress(33.4)).toBe(33);
    expect(clampProgress(66.6)).toBe(67);
  });

  it("clamps below 0 up to 0", () => {
    expect(clampProgress(-1)).toBe(0);
    expect(clampProgress(-9999)).toBe(0);
  });

  it("clamps above 100 down to 100", () => {
    expect(clampProgress(101)).toBe(100);
    expect(clampProgress(9999)).toBe(100);
  });

  it("treats NaN as 0 (safe default)", () => {
    expect(clampProgress(Number.NaN)).toBe(0);
  });
});
