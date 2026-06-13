import type { HTMLAttributes, ReactNode } from "react";
import { CheckCircle2, type LucideIcon } from "lucide-react";

import { StateShell, type StateSize } from "./state-shell";

export interface SEISuccessStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: LucideIcon;
  title?: ReactNode;
  description?: ReactNode;
  /** Optional action(s), e.g. a continue button. */
  action?: ReactNode;
  size?: StateSize;
}

export function SEISuccessState({
  icon = CheckCircle2,
  title = "Done",
  description,
  action,
  size = "md",
  className,
  ...props
}: SEISuccessStateProps) {
  return (
    <StateShell
      icon={icon}
      iconTone="success"
      title={title}
      titleAs="h2"
      description={description}
      action={action}
      size={size}
      className={className}
      rootProps={{ role: "status", "aria-live": "polite", ...props }}
    />
  );
}
