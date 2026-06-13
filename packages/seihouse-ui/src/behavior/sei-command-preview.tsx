"use client";

import { useFilter } from "react-aria-components";

import type { CommandGroup } from "../types/behavior";
import {
  SEICommand,
  SEICommandGroup,
  SEICommandInput,
  SEICommandItem,
  SEICommandList,
  SEICommandShortcut,
} from "./sei-command";

/**
 * SEICommandPreview — data-driven convenience built on the compositional
 * SEICommand parts. Pass grouped `groups` data for a ready-made command menu.
 * Selecting an item calls `onCommand`; nothing is executed.
 *
 * @deprecated Prefer composing `SEICommand` + parts directly for new code.
 * This convenience is retained for the workbench demos and back-compat.
 */

export interface SEICommandPreviewProps {
  groups?: CommandGroup[];
  placeholder?: string;
  /** Mock action handler — receives the selected command id. */
  onCommand?: (id: string) => void;
  className?: string;
}

export function SEICommandPreview({
  groups = [],
  placeholder = "Type a command or search…",
  onCommand,
  className,
}: SEICommandPreviewProps) {
  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <SEICommand filter={contains} className={className}>
      <SEICommandInput placeholder={placeholder} />
      <SEICommandList
        onAction={(key) => onCommand?.(String(key))}
        emptyMessage="No commands match. (Mock palette — nothing is executed.)"
      >
        {groups.map((group) => (
          <SEICommandGroup key={group.id} label={group.label} icon={group.icon}>
            {group.items.map((item) => (
              <SEICommandItem
                key={item.id}
                id={item.id}
                textValue={`${group.label} ${item.label} ${item.hint ?? ""}`}
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
                {item.shortcut ? <SEICommandShortcut>{item.shortcut}</SEICommandShortcut> : null}
              </SEICommandItem>
            ))}
          </SEICommandGroup>
        ))}
      </SEICommandList>
    </SEICommand>
  );
}
