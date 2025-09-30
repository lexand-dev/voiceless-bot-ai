"use client";

import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeftIcon,
  ListIcon
} from "lucide-react";
import { usePaginatedQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";

import {
  getCountryFromTimezone,
  getFlagByCountryCode
} from "@/lib/country-utils";
import { cn } from "@workspace/ui/lib/utils";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@workspace/ui/components/select";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { conversationStatusAtom } from "@/modules/dashboard/atoms/conversation-status";

export const ConversationPanel = () => {
  const conversationStatus = useAtomValue(conversationStatusAtom);
  const setConversationStatus = useSetAtom(conversationStatusAtom);

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: conversationStatus === "all" ? undefined : conversationStatus },
    {
      initialNumItems: 10
    }
  );

  const { canLoadMore, handleLoadMore, isLoadingMore, isLoadingFirstPage } =
    useInfiniteScroll({
      status: conversations.status,
      loadMore: conversations.loadMore,
      loadSize: 10
    });

  if (isLoadingFirstPage) {
    return <ConversationPanelSkeleton />;
  }

  return (
    <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b p-2">
        <Select
          defaultValue={conversationStatus}
          onValueChange={(value) =>
            setConversationStatus(
              value as Doc<"conversations">["status"] | "all"
            )
          }
          value={conversationStatus}
        >
          <SelectTrigger className="h-8 shadow-none border-none px-1.5 ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-0">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <ListIcon className="mr-2 inline h-4 w-4" />
              All
            </SelectItem>
            <SelectItem value="unresolved">
              <ArrowDownIcon className="mr-2 inline h-4 w-4" />
              Unresolved
            </SelectItem>
            <SelectItem value="escalated">
              <ArrowUpIcon className="mr-2 inline h-4 w-4" />
              Escalated
            </SelectItem>
            <SelectItem value="resolved">
              <CheckIcon className="mr-2 inline h-4 w-4" />
              Resolved
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="max-h-[calc(100vh-53px)]">
        <div className="flex flex-col w-full flex-1 text-sm">
          {conversations.results.map((conv) => {
            const role = conv.lastMessage?.message?.role;
            const isLastMessageFromOperator = role !== "user";

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
                    {isLastMessageFromOperator && (
                      <CornerUpLeftIcon className="mr-1 inline h-3 w-3" />
                    )}
                    <span
                      className={cn(
                        !isLastMessageFromOperator && "font-bold text-black"
                      )}
                    >
                      {conv.lastMessage?.text}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
          <InfiniteScrollTrigger
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
            className={cn(
              (isLoadingFirstPage || conversations.results.length === 0) &&
                "hidden"
            )}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

const ConversationPanelSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b p-2">
        <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
      </div>
      <ScrollArea className="max-h-[calc(100vh-53px)]">
        <div className="flex flex-col w-full flex-1 text-sm">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col border-b p-3 hover:bg-accent hover:text-accent-foreground"
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="flex gap-x-1.5">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
                  <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
                </div>
                <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="h-3 w-48 animate-pulse rounded-md bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
