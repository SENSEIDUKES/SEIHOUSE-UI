"use client";

import { createContext, useContext, type HTMLAttributes, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";
import { SEICheckbox } from "../forms/sei-checkbox";

export type SEISortDirection = "asc" | "desc";
export type SEISortValue = string | number | boolean | Date | null | undefined;
export type SEIRowKey<T> = keyof T | ((row: T) => SEISortValue);

function readSortValue<T>(row: T, key: SEIRowKey<T>): SEISortValue {
  return typeof key === "function" ? key(row) : (row[key] as SEISortValue);
}

function normalizeSortValue(value: SEISortValue): {
  empty: boolean;
  numeric: boolean;
  value: string | number;
} {
  if (value == null || value === "") {
    return { empty: true, numeric: false, value: "" };
  }
  if (value instanceof Date) {
    return { empty: false, numeric: true, value: value.getTime() };
  }
  if (typeof value === "number") {
    return { empty: false, numeric: true, value };
  }
  if (typeof value === "boolean") {
    return { empty: false, numeric: true, value: value ? 1 : 0 };
  }
  const numeric = Number(value);
  if (Number.isFinite(numeric) && String(value).trim() !== "") {
    return { empty: false, numeric: true, value: numeric };
  }
  return { empty: false, numeric: false, value: String(value).toLocaleLowerCase() };
}

export function compareSortValues(a: SEISortValue, b: SEISortValue): number {
  const left = normalizeSortValue(a);
  const right = normalizeSortValue(b);

  if (left.empty || right.empty) {
    if (left.empty && right.empty) return 0;
    return left.empty ? 1 : -1;
  }

  if (left.numeric && right.numeric) {
    return (left.value as number) - (right.value as number);
  }

  return String(left.value).localeCompare(String(right.value), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export function sortRows<T>(
  rows: readonly T[],
  key: SEIRowKey<T>,
  direction: SEISortDirection,
): T[] {
  const multiplier = direction === "asc" ? 1 : -1;
  return rows
    .map((row, index) => ({ row, index }))
    .sort((a, b) => {
      const left = readSortValue(a.row, key);
      const right = readSortValue(b.row, key);
      const leftEmpty = left == null || left === "";
      const rightEmpty = right == null || right === "";
      if (leftEmpty || rightEmpty) {
        if (leftEmpty && rightEmpty) return a.index - b.index;
        return leftEmpty ? 1 : -1;
      }
      const result = compareSortValues(left, right);
      return result === 0 ? a.index - b.index : result * multiplier;
    })
    .map((entry) => entry.row);
}

type SEITableDensity = "comfortable" | "compact";

const SEITableDensityContext = createContext<SEITableDensity>("comfortable");

const densityClasses = {
  comfortable: {
    head: "px-4 py-3 text-xs",
    cell: "px-4 py-3 text-sm",
  },
  compact: {
    head: "px-3 py-2 text-[0.68rem]",
    cell: "px-3 py-2 text-xs",
  },
} as const;

export interface SEITableProps extends HTMLAttributes<HTMLTableElement> {
  density?: SEITableDensity;
}

export function SEITable({
  density = "comfortable",
  className,
  children,
  ...props
}: SEITableProps) {
  return (
    <SEITableDensityContext.Provider value={density}>
      <table
        className={cn(
          "w-full border-separate border-spacing-0 text-left text-[var(--sh-color-cloud)]",
          className,
        )}
        {...props}
      >
        {children}
      </table>
    </SEITableDensityContext.Provider>
  );
}

export type SEITableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

export function SEITableHeader({ className, ...props }: SEITableHeaderProps) {
  return <thead className={cn("text-[var(--sh-color-mist)]", className)} {...props} />;
}

export type SEITableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export function SEITableBody({ className, ...props }: SEITableBodyProps) {
  return <tbody className={cn("[&_tr:last-child_td]:border-b-0", className)} {...props} />;
}

export interface SEITableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  zebra?: boolean;
  hover?: boolean;
}

export function SEITableRow({
  selected = false,
  zebra = false,
  hover = true,
  className,
  ...props
}: SEITableRowProps) {
  return (
    <tr
      aria-selected={selected || undefined}
      className={cn(
        selected && "bg-[rgba(0,122,255,0.1)]",
        zebra && "even:bg-white/[0.025]",
        hover && "hover:bg-white/[0.045]",
        className,
      )}
      {...props}
    />
  );
}

export interface SEITableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SEISortDirection | false;
  onSort?: () => void;
  align?: "left" | "center" | "right";
  sticky?: boolean;
}

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function SEITableHead({
  sortable = false,
  sortDirection = false,
  onSort,
  align = "left",
  sticky = false,
  className,
  children,
  ...props
}: SEITableHeadProps) {
  const density = useContext(SEITableDensityContext);
  const SortIcon =
    sortDirection === "asc" ? ArrowUp : sortDirection === "desc" ? ArrowDown : ChevronsUpDown;

  return (
    <th
      scope="col"
      aria-sort={
        sortable
          ? sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : "none"
          : undefined
      }
      className={cn(
        "border-b border-white/10 bg-[rgba(10,10,12,0.96)] font-bold uppercase tracking-[0.12em]",
        densityClasses[density].head,
        sticky && cn("sticky top-0", seiLayer.sticky),
        alignClasses[align],
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "inline-flex w-full items-center gap-1.5 rounded-lg text-inherit outline-none",
            align === "right" && "justify-end",
            align === "center" && "justify-center",
            "hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]",
          )}
        >
          <span className="truncate">{children}</span>
          <SortIcon aria-hidden="true" className="size-3.5 shrink-0" />
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export interface SEITableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function SEITableCell({ align = "left", className, ...props }: SEITableCellProps) {
  const density = useContext(SEITableDensityContext);
  return (
    <td
      className={cn(
        "border-b border-white/8 align-middle",
        densityClasses[density].cell,
        alignClasses[align],
        className,
      )}
      {...props}
    />
  );
}

export interface SEITableSelectionCellProps extends Omit<SEITableCellProps, "children" | "align"> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
}

export function SEITableSelectionCell({
  checked,
  indeterminate,
  onCheckedChange,
  label,
  className,
  ...props
}: SEITableSelectionCellProps) {
  return (
    <SEITableCell className={cn("w-10", className)} {...props}>
      <SEICheckbox
        aria-label={label}
        isSelected={checked}
        isIndeterminate={indeterminate}
        onChange={onCheckedChange}
      />
    </SEITableCell>
  );
}

export interface SEITableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  children: ReactNode;
}

export function SEITableCaption({ className, ...props }: SEITableCaptionProps) {
  return (
    <caption
      className={cn(
        "caption-bottom px-4 py-3 text-left text-xs text-[var(--sh-color-mist)]",
        className,
      )}
      {...props}
    />
  );
}
