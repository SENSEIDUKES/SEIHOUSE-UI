"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Clock, CornerDownLeft, Search } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import {
  Autocomplete,
  Header,
  Input,
  Menu,
  MenuItem,
  MenuSection,
  SearchField,
} from "react-aria-components";

import { cn } from "@/components/sei/styles/cn";
import {
  seiCommandGroupHeader,
  seiInteractiveItemVariants,
  seiOverlayVariants,
  seiPopupSurfaceVariants,
} from "@/components/sei/styles/variants";
import {
  mockCommandGroups,
  mockCommandIndex,
  mockRecentCommandIds,
  type CommandGroup,
  type CommandItem,
} from "./behavior-mock";
import { fuzzyMatch, highlightSegments } from "./fuzzy";

/**
 * SEICommandPalette — global command palette preview.
 *
 * - Opens with Cmd+K (Mac) / Ctrl+K (Win/Linux) via a global key listener, or
 *   from any controlled trigger.
 * - Modal behavior (focus trap, Escape, outside-click, focus return) comes from
 *   Base UI Dialog. The search + grouped menu come from React Aria
 *   (`Autocomplete` + `Menu`), which provides keyboard navigation across groups.
 * - Fuzzy subsequence search (see `fuzzy.ts`) with match highlighting.
 * - A "Recent Commands" section recalls recent mock selections (persisted to
 *   localStorage). Nothing executes — selecting a command only calls `onCommand`.
 */

const RECENT_KEY = "sei-lab:recent-commands";
const RECENT_CAP = 6;

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const { indices } = fuzzyMatch(text, query);
  if (indices.length === 0) return <>{text}</>;
  return (
    <>
      {highlightSegments(text, indices).map((seg, i) =>
        seg.highlight ? (
          <mark key={i} className="bg-transparent font-semibold text-[var(--sh-color-sea)]">
            {seg.value}
          </mark>
        ) : (
          <span key={i}>{seg.value}</span>
        ),
      )}
    </>
  );
}

export interface SEICommandPaletteProps {
  groups?: CommandGroup[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  /** Mock action handler — receives the selected command id. */
  onCommand?: (id: string) => void;
  className?: string;
}

export function SEICommandPalette({
  groups = mockCommandGroups,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  onCommand,
  className,
}: SEICommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const [query, setQuery] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>(mockRecentCommandIds);

  // Hydrate recent commands from localStorage (client-only).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RECENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed) && parsed.length) setRecentIds(parsed);
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  // Global Cmd/Ctrl+K shortcut.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  const recentItems = useMemo(
    () => recentIds.map((id) => mockCommandIndex[id]).filter(Boolean),
    [recentIds],
  );

  const handleAction = useCallback(
    (id: string) => {
      const next = [id, ...recentIds.filter((r) => r !== id)].slice(0, RECENT_CAP);
      setRecentIds(next);
      try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      onCommand?.(id);
      setOpen(false);
    },
    [recentIds, onCommand, setOpen],
  );

  const showRecent = query.trim() === "" && recentItems.length > 0;

  const renderItem = (item: CommandItem, groupLabel: string) => (
    <MenuItem
      key={`${groupLabel}::${item.id}`}
      id={`${groupLabel}::${item.id}`}
      textValue={`${groupLabel} ${item.label} ${item.hint ?? ""}`}
      className={cn(seiInteractiveItemVariants(), "group/cmd")}
    >
      <item.icon aria-hidden="true" className="size-4 shrink-0 text-[var(--sh-color-mist)]" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">
          <HighlightedText text={item.label} query={query} />
        </span>
        {item.hint ? (
          <span className="truncate text-xs text-[var(--sh-color-mist)]">{item.hint}</span>
        ) : null}
      </span>
      {item.shortcut ? (
        <kbd className="rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--sh-color-mist)]">
          {item.shortcut}
        </kbd>
      ) : null}
      <CornerDownLeft
        aria-hidden="true"
        className="size-3.5 shrink-0 text-[var(--sh-color-sea)] opacity-0 group-data-[focused]/cmd:opacity-100"
      />
    </MenuItem>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className={seiOverlayVariants({ tone: "heavy" })} />
        <Dialog.Popup
          className={cn(
            seiPopupSurfaceVariants({ tone: "default" }),
            "fixed left-1/2 top-[12vh] z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl",
            "transition-[opacity,transform] duration-200 ease-out",
            "data-[starting-style]:-translate-y-2 data-[starting-style]:opacity-0",
            "data-[ending-style]:-translate-y-2 data-[ending-style]:opacity-0",
            "focus-visible:outline-none",
            className,
          )}
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search and run mock commands. Use arrow keys to navigate, Enter to select, Escape to
            close.
          </Dialog.Description>

          <Autocomplete filter={(textValue, input) => fuzzyMatch(textValue, input).matched} inputValue={query} onInputChange={setQuery}>
            <SearchField
              aria-label="Command search"
              className="flex items-center gap-2.5 border-b border-white/10 px-4"
            >
              <Search aria-hidden="true" className="size-4 shrink-0 text-[var(--sh-color-mist)]" />
              <Input
                autoFocus
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm text-[var(--sh-color-ivory)] placeholder:text-[var(--sh-color-mist)] focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
              />
              <kbd className="hidden rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--sh-color-mist)] sm:block">
                ESC
              </kbd>
            </SearchField>

            <Menu
              aria-label="Commands"
              onAction={(key) => {
                const raw = String(key);
                handleAction(raw.includes("::") ? raw.slice(raw.indexOf("::") + 2) : raw);
              }}
              className="max-h-[min(60vh,28rem)] overflow-y-auto p-1.5 outline-none"
              renderEmptyState={() => (
                <div className="px-3 py-10 text-center text-sm text-[var(--sh-color-mist)]">
                  No commands match. (Mock palette — nothing is executed.)
                </div>
              )}
            >
              {showRecent ? (
                <MenuSection className="mb-1">
                  <Header className={seiCommandGroupHeader}>
                    <Clock aria-hidden="true" className="size-3.5" />
                    Recent Commands
                  </Header>
                  {recentItems.map((item) => renderItem(item, "Recent"))}
                </MenuSection>
              ) : null}

              {groups.map((group) => (
                <MenuSection key={group.id} className="mb-1 last:mb-0">
                  <Header className={seiCommandGroupHeader}>
                    <group.icon aria-hidden="true" className="size-3.5" />
                    {group.label}
                  </Header>
                  {group.items.map((item) => renderItem(item, group.label))}
                </MenuSection>
              ))}
            </Menu>
          </Autocomplete>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
