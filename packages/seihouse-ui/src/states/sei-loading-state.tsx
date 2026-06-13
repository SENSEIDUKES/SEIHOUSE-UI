import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";
import { seiPanelVariants } from "../styles/variants";
import { SEISpinner } from "./sei-spinner";
import { stateSizeScale, type StateSize } from "./state-shell";

export interface SEILoadingStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  size?: StateSize;
}

const spinnerSizeMap = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export function SEILoadingState({
  title = "Loading",
  description,
  size = "md",
  className,
  ...props
}: SEILoadingStateProps) {
  const scale = stateSizeScale[size];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        seiPanelVariants({ variant: "default", padding: "none" }),
        "flex flex-col items-center justify-center text-center",
        scale.wrapper,
        className,
      )}
      {...props}
    >
      <SEISpinner size={spinnerSizeMap[size]} label={typeof title === "string" ? title : "Loading"} />
      <div className={cn("flex flex-col items-center", scale.maxText)}>
        <p
          className={cn(
            "font-semibold tracking-[-0.01em] text-[var(--sh-color-ivory)]",
            scale.title,
          )}
        >
          {title}
        </p>
        {description ? (
          <p
            className={cn(
              "mt-1.5 leading-relaxed text-[var(--sh-color-mist)]",
              scale.description,
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
