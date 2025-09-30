import { atomWithStorage } from "jotai/utils";
import { Doc } from "@workspace/backend/_generated/dataModel";

export const conversationStatusAtom = atomWithStorage<
  Doc<"conversations">["status"] | "all"
>("conversationStatus", "all");
