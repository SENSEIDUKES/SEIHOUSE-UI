"use client";

import React from "react";
import clsx from "clsx";

type GridColumns = 1 | 2 | 3 | 4 | "auto-fill";
type GridGap = "sm" | "md" | "lg";

interface GridProps {
  columns?: GridColumns;
  gap?: GridGap;
  minChildWidth?: string;
  className?: string;
  children: React.ReactNode;
}

const gapMap: Record<GridGap, string> = {
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-8",
};

const columnsMap: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  "auto-fill": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function Grid({
  columns = 3,
  gap = "md",
  minChildWidth,
  className,
  children,
}: GridProps) {
  const style = minChildWidth
    ? {
        gridTemplateColumns: `repeat(auto-fill, minmax(${minChildWidth}, 1fr))`,
      }
    : undefined;

  return (
    <div
      className={clsx(
        "grid",
        !minChildWidth && columnsMap[columns],
        gapMap[gap],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

/* ---- Simple flex stack layout ---- */
interface StackProps {
  direction?: "vertical" | "horizontal";
  gap?: "sm" | "md" | "lg";
  wrap?: boolean;
  align?: "start" | "center" | "end" | "stretch";
  className?: string;
  children: React.ReactNode;
}

const stackGap: Record<string, string> = {
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-8",
};

const stackAlign: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack({
  direction = "vertical",
  gap = "md",
  wrap = false,
  align = "start",
  className,
  children,
}: StackProps) {
  return (
    <div
      className={clsx(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        stackGap[gap],
        wrap && "flex-wrap",
        stackAlign[align],
        className
      )}
    >
      {children}
    </div>
  );
}