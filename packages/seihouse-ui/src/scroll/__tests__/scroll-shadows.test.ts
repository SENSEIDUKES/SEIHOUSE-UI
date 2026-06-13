import { describe, expect, it } from "vitest";

import { getScrollShadows } from "../sei-scroll-area";

describe("getScrollShadows", () => {
  it("shows no shadows when content fits (no overflow)", () => {
    expect(getScrollShadows({ scrollTop: 0, scrollHeight: 200, clientHeight: 200 })).toEqual({
      top: false,
      bottom: false,
    });
  });

  it("shows only the bottom shadow when scrolled to the top", () => {
    expect(getScrollShadows({ scrollTop: 0, scrollHeight: 600, clientHeight: 200 })).toEqual({
      top: false,
      bottom: true,
    });
  });

  it("shows both shadows when scrolled into the middle", () => {
    expect(getScrollShadows({ scrollTop: 150, scrollHeight: 600, clientHeight: 200 })).toEqual({
      top: true,
      bottom: true,
    });
  });

  it("shows only the top shadow when scrolled to the bottom", () => {
    expect(getScrollShadows({ scrollTop: 400, scrollHeight: 600, clientHeight: 200 })).toEqual({
      top: true,
      bottom: false,
    });
  });
});
