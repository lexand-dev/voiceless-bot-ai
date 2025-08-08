import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";

export const WidgetHeader = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "bg-gradient-to-b from-primary to-emerald-300 text-primary-foreground",
        className
      )}
    >
      {children}
    </header>
  );
};
