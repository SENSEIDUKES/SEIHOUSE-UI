import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";

type SEIAspectRatioElement = "div" | "figure" | "section";

export interface SEIAspectRatioProps extends HTMLAttributes<HTMLElement> {
  /**
   * Intrinsic aspect ratio. A number (e.g. `16 / 9`) or a CSS ratio string
   * (e.g. `"16/9"`). Defaults to `1` (square).
   */
  ratio?: number | string;
  /** Content — fills the box absolutely. */
  children?: ReactNode;
  /** Polymorphic root element. */
  as?: SEIAspectRatioElement;
}

function ratioValue(ratio: number | string): string {
  return typeof ratio === "number" ? `${ratio}` : ratio.replace(/\s+/g, "");
}

/**
 * Intrinsic ratio box. Children are absolutely positioned to fill the frame, so
 * pass a single fill child (image, video, placeholder).
 */
export function SEIAspectRatio({
  ratio = 1,
  as = "div",
  className,
  style,
  children,
  ...props
}: SEIAspectRatioProps) {
  const Component = as as ElementType;

  return (
    <Component
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: ratioValue(ratio), ...style }}
      {...props}
    >
      <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full">{children}</div>
    </Component>
  );
}
