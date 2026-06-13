import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../styles/cn";
import { seiButtonVariants, type SEIButtonVariantProps } from "../styles/variants";

export interface SEIButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, SEIButtonVariantProps {
  icon?: LucideIcon;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
}

export function SEIButton({
  className,
  variant,
  size,
  fullWidth,
  icon: Icon,
  iconLeft,
  iconRight,
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: SEIButtonProps) {
  const iconOnly = !children && (Icon || iconLeft || iconRight);

  return (
    <button
      type={type}
      className={cn(seiButtonVariants({ variant, size, fullWidth }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-icon-only={iconOnly ? "true" : undefined}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        iconLeft
      )}
      {!loading && Icon ? <Icon aria-hidden="true" className="size-4 shrink-0" /> : null}
      {children}
      {iconRight}
    </button>
  );
}
