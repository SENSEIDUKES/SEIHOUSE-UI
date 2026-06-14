"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../styles/cn";
import { seiFieldControlVariants, type SEIFieldControlVariantProps } from "./sei-field";

export interface SEIInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, SEIFieldControlVariantProps {
  /** Decorative or interactive node rendered inside the field, before the input. */
  iconLeft?: ReactNode;
  /** Decorative or interactive node rendered inside the field, after the input. */
  iconRight?: ReactNode;
  /** Wrapper className (the bordered surface). The bare input keeps `className`. */
  wrapperClassName?: string;
}

/**
 * SEIInput — styled native `<input>` built on {@link seiFieldControlVariants}.
 *
 * When `iconLeft`/`iconRight` are provided the bordered surface moves to a
 * wrapper so the icons sit inside the field; the input itself becomes a bare,
 * transparent element. Otherwise the input owns the surface directly.
 */
export const SEIInput = forwardRef<HTMLInputElement, SEIInputProps>(function SEIInput(
  { className, wrapperClassName, size, invalid, iconLeft, iconRight, disabled, ...props },
  ref,
) {
  const hasIcons = iconLeft != null || iconRight != null;

  if (!hasIcons) {
    return (
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(seiFieldControlVariants({ size, invalid }), className)}
        {...props}
      />
    );
  }

  return (
    <div
      data-disabled={disabled || undefined}
      className={cn(
        seiFieldControlVariants({ size, invalid }),
        "flex items-center gap-2 px-0",
        "focus-within:ring-2 focus-within:ring-[var(--sh-color-sea)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--sh-color-black)]",
        wrapperClassName,
      )}
    >
      {iconLeft != null ? (
        <span className="grid shrink-0 place-items-center pl-3 text-[var(--sh-color-mist)]">
          {iconLeft}
        </span>
      ) : null}
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-full w-full min-w-0 bg-transparent text-inherit outline-none",
          "placeholder:text-[var(--sh-color-mist)]",
          iconLeft == null && "pl-3.5",
          iconRight == null && "pr-3.5",
          className,
        )}
        {...props}
      />
      {iconRight != null ? (
        <span className="grid shrink-0 place-items-center pr-3 text-[var(--sh-color-mist)]">
          {iconRight}
        </span>
      ) : null}
    </div>
  );
});
