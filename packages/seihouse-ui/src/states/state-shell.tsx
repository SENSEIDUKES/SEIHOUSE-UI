import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../styles/cn";
import { seiPanelVariants } from "../styles/variants";

/**
 * Internal layout primitive shared by the centered "state" blocks
 * (EmptyState / LoadingState / ErrorState / SuccessState).
 *
 * Not part of the public surface — exported via index only as a private import
 * for the four state components so they stay visually consistent: a tinted
 * rounded-square icon slot, a title, a muted description, and an optional action.
 */

export type StateSize = "sm" | "md" | "lg";

export const stateSizeScale = {
  sm: {
    wrapper: "gap-3 p-6",
    iconBox: "size-10 rounded-[var(--sh-radius-md)]",
    icon: "size-5",
    title: "text-sm",
    description: "text-xs",
    maxText: "max-w-xs",
  },
  md: {
    wrapper: "gap-4 p-8",
    iconBox: "size-12 rounded-[var(--sh-radius-lg)]",
    icon: "size-6",
    title: "text-base",
    description: "text-sm",
    maxText: "max-w-sm",
  },
  lg: {
    wrapper: "gap-5 p-10",
    iconBox: "size-14 rounded-[var(--sh-radius-lg)]",
    icon: "size-7",
    title: "text-lg",
    description: "text-sm",
    maxText: "max-w-md",
  },
} as const;

/** Tone-driven classes for the icon tile. */
export const stateIconTones = {
  neutral: "border-white/10 bg-white/[0.05] text-[var(--sh-color-cloud)]",
  sea: "border-[rgba(0,122,255,0.28)] bg-[rgba(0,122,255,0.12)] text-[#8fc8ff]",
  success: "border-[rgba(52,199,89,0.3)] bg-[rgba(52,199,89,0.12)] text-[#8ff0aa]",
  warning: "border-[rgba(255,159,10,0.3)] bg-[rgba(255,159,10,0.12)] text-[#ffd08a]",
  danger: "border-[rgba(255,69,58,0.3)] bg-[rgba(255,69,58,0.12)] text-[#ff9b94]",
} as const;

export type StateIconTone = keyof typeof stateIconTones;

export interface StateShellProps {
  icon: LucideIcon;
  iconTone: StateIconTone;
  title: ReactNode;
  /** Heading element/level for the title. Defaults to a paragraph-like span. */
  titleAs?: "h2" | "h3" | "p";
  description?: ReactNode;
  action?: ReactNode;
  size: StateSize;
  className?: string;
  /** Spread onto the root (role, aria-live, etc.). */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function StateShell({
  icon: Icon,
  iconTone,
  title,
  titleAs = "p",
  description,
  action,
  size,
  className,
  rootProps,
}: StateShellProps) {
  const scale = stateSizeScale[size];
  const TitleTag = titleAs;

  return (
    <div
      className={cn(
        seiPanelVariants({ variant: "default", padding: "none" }),
        "flex flex-col items-center justify-center text-center",
        scale.wrapper,
        className,
      )}
      {...rootProps}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center border",
          scale.iconBox,
          stateIconTones[iconTone],
        )}
      >
        <Icon className={scale.icon} />
      </span>
      <div className={cn("flex flex-col items-center", scale.maxText)}>
        <TitleTag
          className={cn(
            "font-semibold tracking-[-0.01em] text-[var(--sh-color-ivory)]",
            scale.title,
          )}
        >
          {title}
        </TitleTag>
        {description ? (
          <p
            className={cn("mt-1.5 leading-relaxed text-[var(--sh-color-mist)]", scale.description)}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="mt-1 flex items-center gap-2">{action}</div> : null}
    </div>
  );
}
