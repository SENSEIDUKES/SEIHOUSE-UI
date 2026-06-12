"use client";

import { Check, ChevronsUpDown, Search } from "lucide-react";
import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";

import { cn } from "../styles/cn";
import { focusRing } from "../styles/variants";
import type { ComboOption } from "../types/behavior";

/**
 * SEIComboboxPreview — searchable, accessible combobox powered by React Aria
 * Components. React Aria provides the input + listbox wiring, type-to-filter,
 * keyboard navigation (arrows / Enter / Escape), and screen-reader labelling.
 * SEIHouse owns the visual surface. Consumers provide the option data.
 */

export interface SEIComboboxPreviewProps {
  label?: string;
  placeholder?: string;
  options?: ComboOption[];
  /** Optional change handler — receives the selected option id. */
  onSelect?: (id: string | null) => void;
  className?: string;
}

export function SEIComboboxPreview({
  label = "Search artists",
  placeholder = "Type to search…",
  options = [],
  onSelect,
  className,
}: SEIComboboxPreviewProps) {
  return (
    <ComboBox
      defaultItems={options}
      menuTrigger="focus"
      onSelectionChange={(key) => onSelect?.(key == null ? null : String(key))}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      <Label className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
        {label}
      </Label>
      <div
        className={cn(
          "group flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5",
          "transition-colors focus-within:border-[rgba(0,122,255,0.45)] focus-within:bg-white/[0.06]",
        )}
      >
        <Search aria-hidden="true" className="size-4 shrink-0 text-[var(--sh-color-mist)]" />
        <Input
          placeholder={placeholder}
          className="h-10 w-full bg-transparent text-sm text-[var(--sh-color-ivory)] placeholder:text-[var(--sh-color-mist)] focus:outline-none"
        />
        <Button
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full text-[var(--sh-color-mist)] hover:text-white",
            focusRing,
          )}
        >
          <ChevronsUpDown aria-hidden="true" className="size-4" />
        </Button>
      </div>

      <Popover
        className={cn(
          "w-[var(--trigger-width)] origin-top rounded-2xl border border-white/12 bg-[rgba(18,20,26,0.98)] p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl",
          "data-[entering]:animate-in data-[entering]:fade-in-0 data-[exiting]:animate-out data-[exiting]:fade-out-0",
        )}
      >
        <ListBox
          className="max-h-64 overflow-y-auto outline-none"
          renderEmptyState={() => (
            <div className="px-3 py-6 text-center text-sm text-[var(--sh-color-mist)]">
              No matches.
            </div>
          )}
        >
          {(item: ComboOption) => (
            <ListBoxItem
              id={item.id}
              textValue={item.label}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-[var(--sh-color-cloud)] outline-none",
                "data-[focused]:bg-white/[0.07] data-[focused]:text-white",
                "data-[selected]:text-white",
              )}
            >
              <span className="flex flex-col">
                <span className="font-medium">{item.label}</span>
                {item.hint ? (
                  <span className="text-xs text-[var(--sh-color-mist)]">{item.hint}</span>
                ) : null}
              </span>
              <Check
                aria-hidden="true"
                className="size-4 shrink-0 opacity-0 group-data-[selected]:opacity-100 data-[selected]:opacity-100"
              />
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}
