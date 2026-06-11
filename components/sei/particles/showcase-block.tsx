import type { ReactNode } from "react";

import { SEIPanel } from "@/components/sei/primitives/sei-panel";
import { cn } from "@/components/sei/styles/cn";
import type { SEIPanelVariantProps } from "@/components/sei/styles/variants";

export interface ShowcaseBlockProps extends SEIPanelVariantProps {
  title?: ReactNode;
  description?: ReactNode;
  note?: ReactNode;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

export function ShowcaseBlock({
  title,
  description,
  note,
  actions,
  className,
  contentClassName,
  children,
  variant = "default",
  padding = "md",
  interactive,
}: ShowcaseBlockProps) {
  return (
    <SEIPanel
      as="article"
      variant={variant}
      padding={padding}
      interactive={interactive}
      className={className}
    >
      {(title || description || note || actions) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            {title ? (
              <h3 className="text-base font-semibold tracking-[-0.03em] text-current">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--sh-color-mist)]">
                {description}
              </p>
            ) : null}
            {note ? (
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--sh-color-sea)]">
                {note}
              </p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      )}
      <div className={cn("relative", contentClassName)}>{children}</div>
    </SEIPanel>
  );
}