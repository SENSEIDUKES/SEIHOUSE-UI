import { describe, expect, it } from "vitest";

import { pushRecent } from "../recent";

describe("pushRecent", () => {
  it("adds a new id to the front", () => {
    expect(pushRecent(["a", "b"], "c")).toEqual(["c", "a", "b"]);
  });

  it("moves an existing id to the front without duplicating it", () => {
    expect(pushRecent(["a", "b", "c"], "c")).toEqual(["c", "a", "b"]);
  });

  it("caps the list to the most recent N entries", () => {
    expect(pushRecent(["a", "b", "c", "d", "e", "f"], "g", 6)).toEqual([
      "g",
      "a",
      "b",
      "c",
      "d",
      "e",
    ]);
  });

  it("does not mutate the input array", () => {
    const input = ["a", "b"];
    pushRecent(input, "c");
    expect(input).toEqual(["a", "b"]);
  });

  it("returns the full de-duplicated list when cap is non-positive", () => {
    expect(pushRecent(["a", "b"], "c", 0)).toEqual(["c", "a", "b"]);
  });
});
