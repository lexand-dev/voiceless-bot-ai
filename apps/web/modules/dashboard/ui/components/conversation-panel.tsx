"use client";

import { useState } from "react";
import { api } from "@workspace/backend/_generated/api";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@workspace/ui/components/select";
import { usePaginatedQuery } from "convex/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeftIcon,
  ListIcon
} from "lucide-react";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import {
  getCountryFromTimezone,
  getFlagByCountryCode
} from "@/lib/country-utils";
import Link from "next/link";

const STATUS = {
  ALL: "all",
  UNRESOLVED: "unresolved",
  RESOLVED: "resolved",
  ESCALATED: "escalated"
};

export const ConversationPanel = () => {
  const [status, setStatus] = useState<Doc<"conversations">["status"]>();

  const conversation = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: status },
    {
      initialNumItems: 10
    }
  );

  const handleStatusChange = (value: string) => {
    setStatus(
      value === STATUS.ALL
        ? undefined
        : (value as Doc<"conversations">["status"])
    );
  };

  return (
    <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b p-2">
        <Select
          defaultValue={STATUS.ALL}
          onValueChange={handleStatusChange}
          value={status}
        >
          <SelectTrigger className="h-8 shadow-none border-none px-1.5 ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-0">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STATUS.ALL}>
              <ListIcon className="mr-2 inline h-4 w-4" />
              All
            </SelectItem>
            <SelectItem value={STATUS.UNRESOLVED}>
              <ArrowDownIcon className="mr-2 inline h-4 w-4" />
              Unresolved
            </SelectItem>
            <SelectItem value={STATUS.ESCALATED}>
              <ArrowUpIcon className="mr-2 inline h-4 w-4" />
              Escalated
            </SelectItem>
            <SelectItem value={STATUS.RESOLVED}>
              <CheckIcon className="mr-2 inline h-4 w-4" />
              Resolved
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="max-h-[calc(100vh-53px)]">
        <div className="flex flex-col w-full flex-1 text-sm">
          {conversation.results.map((conv) => {
            const role = conv.lastMessage?.message?.role;
            console.log("Last message role:", role);
            const isLastMessageFromAssistant = role === "assistant";

            const flagCode = getCountryFromTimezone(
              conv.contactSession.metadata?.timezone || ""
            );
            const flagUrl = getFlagByCountryCode(flagCode?.code || "");

            return (
              <Link
                key={conv._id.toString()}
                href={`/dashboard/conversations/${conv._id.toString()}`}
              >
                <div className="flex flex-col border-b p-3 hover:bg-accent hover:text-accent-foreground">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex gap-x-1.5">
                      <DicebearAvatar
                        seed={conv.contactSession._id.toString()}
                        size={36}
                        className="mr-2"
                        badgeImageUrl={flagUrl || undefined}
                        badgeClassName="border-white"
                      />
                      <span className="font-medium">
                        {conv.contactSession.name || "Unknown User"}
                      </span>
                    </div>
                    <ConversationStatusIcon status={conv.status} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isLastMessageFromAssistant && (
                      <CornerUpLeftIcon className="mr-1 inline h-3 w-3" />
                    )}
                    <span
                      className={
                        !isLastMessageFromAssistant
                          ? "font-bold text-black"
                          : ""
                      }
                    >
                      {conv.lastMessage?.text}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

// TODO: Add skeleton component
// TODO: Add infinite scroll
// TODO: Add jotat state with storage to save scalated status filter
