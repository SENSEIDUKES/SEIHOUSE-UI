import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";

export interface SEIAppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Top app bar — rendered sticky at the top of the shell. */
  header?: ReactNode;
  /** Optional navigation rail — collapses (hidden) on small screens. */
  sidebar?: ReactNode;
  /** Optional footer rendered below the main content. */
  footer?: ReactNode;
  /** Main scrollable content region. */
  children: ReactNode;
  /** Width of the sidebar column at md+ (default "16rem"). */
  sidebarWidth?: string;
  /** Label for the sidebar landmark. */
  sidebarLabel?: string;
}

/**
 * App scaffold built on CSS grid.
 *
 * Layout:
 * - `header` is sticky to the top of the viewport.
 * - `sidebar` (if present) sits in a fixed-width column from md and up, and is
 *   hidden below md (stacking handled by host apps via a drawer if needed).
 * - `main` is the scrollable content region with semantic landmarks.
 */
export function SEIAppShell({
  header,
  sidebar,
  footer,
  children,
  sidebarWidth = "16rem",
  sidebarLabel = "Primary",
  className,
  style,
  ...props
}: SEIAppShellProps) {
  return (
    <div
      className={cn(
        "grid min-h-screen w-full grid-rows-[auto_1fr]",
        sidebar ? "md:grid-cols-[var(--sh-shell-sidebar)_1fr]" : "grid-cols-1",
        "bg-[var(--sh-color-black)] text-[var(--sh-color-ivory)]",
        className,
      )}
      style={{ ["--sh-shell-sidebar" as string]: sidebarWidth, ...style }}
      {...props}
    >
      {header ? (
        <header
          className={cn(
            "sticky top-0 col-span-full",
            seiLayer.sticky,
            "border-b border-white/10 bg-[var(--sh-glass-bg)] backdrop-blur-[var(--sh-blur-md)]",
          )}
        >
          {header}
        </header>
      ) : null}

      {sidebar ? (
        <aside aria-label={sidebarLabel} className="hidden border-r border-white/10 md:block">
          {sidebar}
        </aside>
      ) : null}

      <main className="min-w-0 overflow-y-auto">{children}</main>

      {footer ? <footer className="col-span-full border-t border-white/10">{footer}</footer> : null}
    </div>
  );
}
