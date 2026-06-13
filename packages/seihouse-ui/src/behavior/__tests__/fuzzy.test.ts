import { describe, expect, it } from "vitest";

import { fuzzyMatch, highlightSegments } from "../fuzzy";

describe("fuzzyMatch", () => {
  it("matches a subsequence across word boundaries", () => {
    const result = fuzzyMatch("Open Vault Fragments", "ovf");
    expect(result.matched).toBe(true);
    // O(0), V(5), F(11)
    expect(result.indices).toEqual([0, 5, 11]);
  });

  it("does not match when characters are out of order", () => {
    expect(fuzzyMatch("Open Vault Fragments", "fvo").matched).toBe(false);
  });

  it("does not match when a character is missing", () => {
    expect(fuzzyMatch("Albums", "zzz").matched).toBe(false);
  });

  it("treats an empty query as a match with no indices", () => {
    const result = fuzzyMatch("anything", "   ");
    expect(result.matched).toBe(true);
    expect(result.indices).toEqual([]);
    expect(result.score).toBe(0);
  });

  it("is case-insensitive", () => {
    expect(fuzzyMatch("Registry Panel", "RP").matched).toBe(true);
  });

  it("scores consecutive and word-boundary matches higher than scattered ones", () => {
    const consecutive = fuzzyMatch("Register", "reg").score;
    const scattered = fuzzyMatch("rxexg", "reg").score;
    expect(consecutive).toBeGreaterThan(scattered);
  });

  it("clears indices and score when the match fails", () => {
    const result = fuzzyMatch("abc", "abz");
    expect(result.matched).toBe(false);
    expect(result.indices).toEqual([]);
    expect(result.score).toBe(0);
  });
});

describe("highlightSegments", () => {
  it("splits text into highlighted and plain runs", () => {
    const segments = highlightSegments("Open", [0]);
    expect(segments).toEqual([
      { value: "O", highlight: true },
      { value: "pen", highlight: false },
    ]);
  });

  it("returns a single plain segment when there are no indices", () => {
    expect(highlightSegments("Open", [])).toEqual([{ value: "Open", highlight: false }]);
  });

  it("merges adjacent highlighted indices into one run", () => {
    const segments = highlightSegments("Open", [0, 1]);
    expect(segments).toEqual([
      { value: "Op", highlight: true },
      { value: "en", highlight: false },
    ]);
  });
});
