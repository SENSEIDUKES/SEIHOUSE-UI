"use client";

import { Check } from "lucide-react";

import type { ComboOption } from "../types/behavior";
import {
  SEICombobox,
  SEIComboboxControl,
  SEIComboboxItem,
  SEIComboboxLabel,
  SEIComboboxList,
  SEIComboboxPopover,
} from "./sei-combobox";

/**
 * SEIComboboxPreview — data-driven convenience built on the compositional
 * SEICombobox parts. Pass an `options` array and an `onSelect` handler for a
 * ready-made searchable single-select.
 *
 * @deprecated Prefer composing `SEICombobox` + parts directly for new code.
 * This convenience is retained for the workbench demos and back-compat.
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
    <SEICombobox
      items={options}
      menuTrigger="focus"
      onSelectionChange={(key) => onSelect?.(key == null ? null : String(key))}
      className={className}
    >
      <SEIComboboxLabel>{label}</SEIComboboxLabel>
      <SEIComboboxControl placeholder={placeholder} />
      <SEIComboboxPopover>
        <SEIComboboxList<ComboOption>>
          {(item) => (
            <SEIComboboxItem id={item.id} textValue={item.label}>
              <span className="flex flex-col">
                <span className="font-medium">{item.label}</span>
                {item.hint ? (
                  <span className="text-xs text-[var(--sh-color-mist)]">{item.hint}</span>
                ) : null}
              </span>
              <Check
                aria-hidden="true"
                className="size-4 shrink-0 opacity-0 data-[selected]:opacity-100"
              />
            </SEIComboboxItem>
          )}
        </SEIComboboxList>
      </SEIComboboxPopover>
    </SEICombobox>
  );
}
