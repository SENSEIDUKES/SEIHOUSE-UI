import { describe, expect, it } from "vitest";

import { cn } from "../cn";

describe("cn", () => {
  it("merges plain class strings", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("lets later Tailwind classes win conflicts (tailwind-merge)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm text-white", "text-lg")).toBe("text-white text-lg");
  });

  it("drops falsy values from conditional class objects (clsx)", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("flattens arrays of class values", () => {
    expect(cn(["px-2", false, "py-1"], undefined, null)).toBe("px-2 py-1");
  });

  it("returns an empty string when given nothing", () => {
    expect(cn()).toBe("");
  });
});
