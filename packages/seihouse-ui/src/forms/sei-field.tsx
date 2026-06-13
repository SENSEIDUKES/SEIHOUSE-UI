"use client";

import { useId, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../styles/cn";
import { focusRing, transitionSurface } from "../styles/variants";

/**
 * Shared surface variants for text-like controls (Input / Textarea / Select).
 *
 * Owns the border, background, sizing, focus ring, invalid (danger) styling and
 * disabled treatment so each native control stays visually consistent. Compose
 * with `cn(...)` and layer control-specific tweaks (e.g. textarea auto-height)
 * on top.
 */
export const seiFieldControlVariants = tv({
  base: [
    "w-full rounded-[var(--sh-radius-md)] border bg-white/[0.04] text-[var(--sh-color-ivory)]",
    "placeholder:text-[var(--sh-color-mist)]",
    "outline-none",
    focusRing,
    transitionSurface,
    "disabled:pointer-events-none disabled:opacity-45",
    "aria-disabled:pointer-events-none aria-disabled:opacity-45",
  ],
  variants: {
    size: {
      compact: "h-9 px-3 text-sm",
      comfortable: "h-11 px-3.5 text-sm",
    },
    invalid: {
      true: "border-[rgba(255,69,58,0.5)] focus-visible:ring-[var(--sh-color-danger)]",
      false:
        "border-white/12 hover:border-white/20 focus-within:border-[rgba(0,122,255,0.45)]",
    },
  },
  defaultVariants: {
    size: "comfortable",
    invalid: false,
  },
});

export type SEIFieldControlVariantProps = VariantProps<typeof seiFieldControlVariants>;

export type SEIFieldSize = "compact" | "comfortable";

export interface SEIFieldProps {
  /** Visible label text rendered above the control. */
  label?: ReactNode;
  /**
   * Associates the rendered `<label>` with a control via `htmlFor`. Pass the
   * same value as the control's `id` to wire native label association. When the
   * control also needs the helper/error for `aria-describedby`, use
   * {@link SEIField}'s generated ids (exposed through the render-prop children).
   */
  htmlFor?: string;
  /** Supporting text rendered below the control (hidden when `error` is set). */
  helperText?: ReactNode;
  /** Error message; when present the field renders invalid styling + this text. */
  error?: string;
  /** Show a required marker next to the label. */
  required?: boolean;
  /** Dim the whole field and remove pointer interactions. */
  disabled?: boolean;
  /** Density of the label/helper spacing. */
  size?: SEIFieldSize;
  /**
   * The control. Either a plain node, or a render function receiving the
   * generated accessibility ids so the control can wire `aria-describedby`.
   */
  children?:
    | ReactNode
    | ((ids: { describedBy?: string; helperId: string; errorId: string }) => ReactNode);
  className?: string;
}

/**
 * SEIField — the labelled shell around any form control.
 *
 * Renders a `<label>` (associated via `htmlFor`), the control, and a single
 * helper/error line with stable ids. When `children` is a function it receives
 * `{ describedBy, helperId, errorId }` so the control can set `aria-describedby`
 * for screen readers; otherwise just drop the control in directly.
 */
export function SEIField({
  label,
  htmlFor,
  helperText,
  error,
  required = false,
  disabled = false,
  size = "comfortable",
  children,
  className,
}: SEIFieldProps) {
  const baseId = useId();
  const helperId = `${baseId}-helper`;
  const errorId = `${baseId}-error`;

  const hasError = Boolean(error);
  const hasMessage = hasError || helperText != null;
  const describedBy = hasError ? errorId : helperText != null ? helperId : undefined;

  const control =
    typeof children === "function"
      ? children({ describedBy, helperId, errorId })
      : children;

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1.5",
        disabled && "pointer-events-none opacity-45",
        className,
      )}
      data-disabled={disabled || undefined}
    >
      {label != null ? (
        <label
          htmlFor={htmlFor}
          className={cn(
            "flex items-center gap-1 font-semibold leading-none text-[var(--sh-color-cloud)]",
            size === "compact" ? "text-xs" : "text-sm",
          )}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-[var(--sh-color-danger)]">
              *
            </span>
          ) : null}
          {required ? <span className="sr-only">(required)</span> : null}
        </label>
      ) : null}

      {control}

      {hasMessage ? (
        hasError ? (
          <p id={errorId} className="text-xs font-medium text-[#ff9b94]">
            {error}
          </p>
        ) : (
          <p id={helperId} className="text-xs text-[var(--sh-color-mist)]">
            {helperText}
          </p>
        )
      ) : null}
    </div>
  );
}
