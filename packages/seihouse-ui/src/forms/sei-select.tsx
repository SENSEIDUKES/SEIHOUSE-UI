"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "../styles/cn";
import { seiFieldControlVariants, type SEIFieldControlVariantProps } from "./sei-field";

export interface SEISelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    SEIFieldControlVariantProps {
  /** Wrapper className (the positioned container holding the chevron overlay). */
  wrapperClassName?: string;
}

/**
 * SEISelect — styled native `<select>` with a chevron overlay.
 *
 * Native is deliberate: the OS popup is reliable, accessible, and keyboard /
 * touch friendly out of the box. SEIHouse only owns the closed-state surface
 * (via {@link seiFieldControlVariants}) and the trailing chevron glyph.
 */
export const SEISelect = forwardRef<HTMLSelectElement, SEISelectProps>(function SEISelect(
  { className, wrapperClassName, size, invalid, disabled, children, ...props },
  ref,
) {
  return (
    <div className={cn("relative w-full", wrapperClassName)} data-disabled={disabled || undefined}>
      <select
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          seiFieldControlVariants({ size, invalid }),
          // Room for the chevron + native appearance reset.
          "cursor-pointer appearance-none pr-10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronsUpDown
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--sh-color-mist)]",
          disabled && "opacity-45",
        )}
      />
    </div>
  );
});
