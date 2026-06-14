import type { ElementType, HTMLAttributes, KeyboardEvent, ReactNode } from "react";

import { cn } from "../styles/cn";
import { interactionStates, transitionSurface } from "../styles/variants";

type SEIMediaRowElement = "div" | "li" | "a";

export interface SEIMediaRowProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Leading media slot (e.g. SEIThumbnail or SEIAvatar). */
  thumbnail?: ReactNode;
  /** Primary line. */
  title: ReactNode;
  /** Secondary line below the title. */
  subtitle?: ReactNode;
  /** Trailing slot (metadata, actions). */
  meta?: ReactNode;
  /** Apply hover/focus/active interaction states. */
  interactive?: boolean;
  /** Polymorphic root element. */
  as?: SEIMediaRowElement;
}

/**
 * Compact list row: leading media, stacked title/subtitle, trailing meta.
 *
 * When `interactive` + `onClick` are supplied, the row becomes a focusable,
 * keyboard-activatable control (Enter / Space) with a `button` role unless a
 * different `as` element is provided.
 */
export function SEIMediaRow({
  thumbnail,
  title,
  subtitle,
  meta,
  interactive = false,
  as = "div",
  onClick,
  className,
  onKeyDown,
  ...props
}: SEIMediaRowProps) {
  const Component = as as ElementType;
  const clickable = interactive && Boolean(onClick);
  // An anchor (`as="a"`) is a link, not a button — it has its own native
  // activation, so we skip the synthetic keyboard/role handling for it.
  const isLink = as === "a";

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (!clickable || isLink || event.defaultPrevented) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.(event as unknown as Parameters<NonNullable<typeof onClick>>[0]);
    }
  };

  return (
    <Component
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable && !isLink ? "button" : undefined}
      tabIndex={clickable && !isLink ? 0 : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2 text-left",
        transitionSurface,
        clickable && cn("cursor-pointer", interactionStates),
        className,
      )}
      {...props}
    >
      {thumbnail ? <span className="shrink-0">{thumbnail}</span> : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-white">{title}</span>
        {subtitle ? (
          <span className="truncate text-xs text-[var(--sh-color-cloud)]">{subtitle}</span>
        ) : null}
      </span>
      {meta ? <span className="shrink-0 text-xs text-[var(--sh-color-mist)]">{meta}</span> : null}
    </Component>
  );
}
