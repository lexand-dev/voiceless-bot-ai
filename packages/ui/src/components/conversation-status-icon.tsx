import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface ConversationStatusIconProps {
  status: "unresolved" | "escalated" | "resolved";
  className?: string;
}

const statusConfig = {
  resolved: {
    icon: CheckIcon,
    bgColor: "bg-green-100",
    color: "text-[#016630]"
  },
  unresolved: {
    icon: ArrowRightIcon,
    bgColor: "bg-red-100",
    color: "text-destructive"
  },
  escalated: {
    icon: ArrowUpIcon,
    bgColor: "bg-yellow-100",
    color: "text-[#894B44]"
  }
} as const;

export const ConversationStatusIcon = ({
  status,
  className
}: ConversationStatusIconProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full size-6",
        config.bgColor,
        className
      )}
    >
      <Icon className={cn("size-3 stroke-3", config.color)} />
    </div>
  );
};
