import type { HTMLAttributes, ReactNode } from "react";
import { AlertTriangle, type LucideIcon } from "lucide-react";

import { StateShell, type StateSize } from "./state-shell";

export interface SEIErrorStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: LucideIcon;
  title?: ReactNode;
  description?: ReactNode;
  /** Optional action(s), e.g. a retry button. */
  action?: ReactNode;
  tone?: "danger" | "warning";
  size?: StateSize;
}

export function SEIErrorState({
  icon = AlertTriangle,
  title = "Something went wrong",
  description,
  action,
  tone = "danger",
  size = "md",
  className,
  ...props
}: SEIErrorStateProps) {
  return (
    <StateShell
      icon={icon}
      iconTone={tone}
      title={title}
      titleAs="h2"
      description={description}
      action={action}
      size={size}
      className={className}
      rootProps={{ role: "alert", ...props }}
    />
  );
}
