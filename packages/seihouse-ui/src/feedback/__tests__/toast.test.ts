import { describe, expect, it } from "vitest";

import { toastReducer } from "../sei-toast";
import type { SEIToastRecord } from "../sei-toast";

const baseToast: SEIToastRecord = {
  id: "toast-a",
  title: "Vault saved",
  tone: "default",
  duration: 4000,
};

describe("toastReducer", () => {
  it("adds new toasts to the front of the queue", () => {
    const state = toastReducer([], {
      type: "add",
      toast: baseToast,
      limit: 3,
    });

    expect(state).toEqual([baseToast]);
  });

  it("dedupes by id while keeping the newest content", () => {
    const state = toastReducer([baseToast], {
      type: "add",
      toast: { ...baseToast, title: "Vault updated", tone: "success" },
      limit: 3,
    });

    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({ id: "toast-a", title: "Vault updated", tone: "success" });
  });

  it("caps the queue at the provided limit", () => {
    const state = toastReducer(
      [baseToast, { ...baseToast, id: "toast-b" }, { ...baseToast, id: "toast-c" }],
      {
        type: "add",
        toast: { ...baseToast, id: "toast-d" },
        limit: 2,
      },
    );

    expect(state.map((toast) => toast.id)).toEqual(["toast-d", "toast-a"]);
  });

  it("dismisses a toast by id", () => {
    const state = toastReducer([baseToast, { ...baseToast, id: "toast-b" }], {
      type: "dismiss",
      id: "toast-a",
    });

    expect(state.map((toast) => toast.id)).toEqual(["toast-b"]);
  });

  it("clears the queue", () => {
    const state = toastReducer([baseToast], { type: "clear" });

    expect(state).toEqual([]);
  });
});
