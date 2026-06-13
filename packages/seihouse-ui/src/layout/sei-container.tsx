import type { ElementType, HTMLAttributes } from "react";

import { cn } from "../styles/cn";

type SEIContainerElement = "div" | "section" | "article" | "main" | "header" | "footer";

type SEIContainerSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeClasses: Record<SEIContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
};

export interface SEIContainerProps extends HTMLAttributes<HTMLElement> {
  /** Responsive max-width clamp. */
  size?: SEIContainerSize;
  /**
   * Horizontal padding. `true` applies the default responsive gutter,
   * `false`/omitted applies none, or pass a scale for a fixed gutter.
   */
  padding?: boolean | "sm" | "md" | "lg";
  /** Polymorphic root element. */
  as?: SEIContainerElement;
}

const paddingClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "px-4",
  md: "px-4 sm:px-6",
  lg: "px-6 sm:px-8",
};

export function SEIContainer({
  as = "div",
  size = "xl",
  padding = false,
  className,
  ...props
}: SEIContainerProps) {
  const Component = as as ElementType;

  const paddingClass =
    padding === true ? paddingClasses.md : padding === false ? "" : paddingClasses[padding];

  return (
    <Component
      className={cn("mx-auto w-full", sizeClasses[size], paddingClass, className)}
      {...props}
    />
  );
}
