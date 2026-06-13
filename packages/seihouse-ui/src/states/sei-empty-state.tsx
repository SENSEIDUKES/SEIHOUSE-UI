import type { HTMLAttributes, ReactNode } from "react";
import { Inbox, type LucideIcon } from "lucide-react";

import { StateShell, type StateSize } from "./state-shell";

export interface SEIEmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  /** Optional action(s), e.g. a button to create the first item. */
  action?: ReactNode;
  size?: StateSize;
}

export function SEIEmptyState({
  icon = Inbox,
  title,
  description,
  action,
  size = "md",
  className,
  ...props
}: SEIEmptyStateProps) {
  return (
    <StateShell
      icon={icon}
      iconTone="neutral"
      title={title}
      titleAs="h2"
      description={description}
      action={action}
      size={size}
      className={className}
      rootProps={props}
    />
  );
}
