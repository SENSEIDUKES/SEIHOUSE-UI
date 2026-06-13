import { describe, expect, it } from "vitest";

import { sortRows } from "../sei-table";

interface Row {
  id: string;
  title: string;
  plays: number | string | null;
  released?: string;
}

const rows: Row[] = [
  { id: "a", title: "Blue Room", plays: 20, released: "2025-02-01" },
  { id: "b", title: "after hours", plays: "7", released: "2024-11-12" },
  { id: "c", title: "Blue Room", plays: 20, released: "2024-08-03" },
  { id: "d", title: "Cycle", plays: null },
];

describe("sortRows", () => {
  it("sorts strings case-insensitively in ascending order", () => {
    expect(sortRows(rows, "title", "asc").map((row) => row.id)).toEqual(["b", "a", "c", "d"]);
  });

  it("sorts numbers and numeric strings in descending order", () => {
    expect(sortRows(rows, "plays", "desc").map((row) => row.id)).toEqual(["a", "c", "b", "d"]);
  });

  it("keeps equal values in their original relative order", () => {
    expect(
      sortRows(rows, "title", "asc")
        .map((row) => row.id)
        .slice(1, 3),
    ).toEqual(["a", "c"]);
  });

  it("does not mutate the original rows", () => {
    const sorted = sortRows(rows, "released", "asc");

    expect(sorted).not.toBe(rows);
    expect(rows.map((row) => row.id)).toEqual(["a", "b", "c", "d"]);
  });
});
