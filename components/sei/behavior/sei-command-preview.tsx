"use client";

import { Search } from "lucide-react";
import {
  Autocomplete,
  Header,
  Input,
  Menu,
  MenuItem,
  MenuSection,
  SearchField,
  useFilter,
} from "react-aria-components";

import { cn } from "@/components/sei/styles/cn";
import {
  seiCommandGroupHeader,
  seiInteractiveItemVariants,
} from "@/components/sei/styles/variants";
import { mockCommandGroups, type CommandGroup } from "./behavior-mock";

/**
 * SEICommandPreview — command-palette preview powered by React Aria Components.
 *
 * `Autocomplete` wires the search field to the menu: it filters grouped
 * commands as you type and forwards keyboard navigation (arrows / Enter /
 * Escape) into the menu while focus stays in the input. SEIHouse styles the
 * surface. Commands are mocked — selecting one only calls `onCommand`.
 */

export interface SEICommandPreviewProps {
  groups?: CommandGroup[];
  placeholder?: string;
  /** Mock action handler — receives the selected command id. */
  onCommand?: (id: string) => void;
  className?: string;
}

export function SEICommandPreview({
  groups = mockCommandGroups,
  placeholder = "Type a command or search…",
  onCommand,
  className,
}: SEICommandPreviewProps) {
  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/12 bg-[rgba(14,16,22,0.96)] shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl",
        className,
      )}
    >
      <Autocomplete filter={contains}>
        <SearchField
          aria-label="Command search"
          className="flex items-center gap-2.5 border-b border-white/10 px-4"
        >
          <Search aria-hidden="true" className="size-4 shrink-0 text-[var(--sh-color-mist)]" />
          <Input
            placeholder={placeholder}
            className="h-12 w-full bg-transparent text-sm text-[var(--sh-color-ivory)] placeholder:text-[var(--sh-color-mist)] focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          />
        </SearchField>

        <Menu
          aria-label="Commands"
          onAction={(key) => onCommand?.(String(key))}
          className="max-h-72 overflow-y-auto p-1.5 outline-none"
          renderEmptyState={() => (
            <div className="px-3 py-8 text-center text-sm text-[var(--sh-color-mist)]">
              No commands match. (Mock palette — nothing is executed.)
            </div>
          )}
        >
          {groups.map((group) => (
            <MenuSection key={group.id} className="mb-1 last:mb-0">
              <Header className={seiCommandGroupHeader}>
                <group.icon aria-hidden="true" className="size-3.5" />
                {group.label}
              </Header>
              {group.items.map((item) => (
                <MenuItem
                  key={item.id}
                  id={item.id}
                  textValue={`${group.label} ${item.label} ${item.hint ?? ""}`}
                  className={seiInteractiveItemVariants()}
                >
                  <item.icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[var(--sh-color-mist)]"
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium">{item.label}</span>
                    {item.hint ? (
                      <span className="truncate text-xs text-[var(--sh-color-mist)]">
                        {item.hint}
                      </span>
                    ) : null}
                  </span>
                  {item.shortcut ? (
                    <kbd className="rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--sh-color-mist)]">
                      {item.shortcut}
                    </kbd>
                  ) : null}
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </Menu>
      </Autocomplete>
    </div>
  );
}
