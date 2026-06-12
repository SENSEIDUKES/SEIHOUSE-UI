import type { HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../styles/cn";
import {
  seiBadgeVariants,
  type SEIBadgeVariantProps,
} from "../styles/variants";

export interface SEIBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    SEIBadgeVariantProps {
  icon?: LucideIcon;
  iconLeft?: ReactNode;
}

export function SEIBadge({
  className,
  variant,
  size,
  icon: Icon,
  iconLeft,
  children,
  ...props
}: SEIBadgeProps) {
  return (
    <span className={cn(seiBadgeVariants({ variant, size }), className)} {...props}>
      {iconLeft}
      {Icon ? <Icon aria-hidden="true" className="size-3.5 shrink-0" /> : null}
      {children}
    </span>
  );
}