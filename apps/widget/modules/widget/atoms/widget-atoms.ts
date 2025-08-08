import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

import { WidgetScreen } from "@/modules/widget/types";
import { CONTACT_SESSION_KEY } from "@/modules/widget/constants";
import { Id } from "@workspace/backend/_generated/dataModel";

// widget state management atoms
export const screenAtom = atom<WidgetScreen>("loading");
export const organizationIdAtom = atom<string | null>(null);

// This atom is used to store the contact session ID for a specific organization
export const contactSessionIdAtomFamily = atomFamily(
  (organizationId: string) => {
    return atomWithStorage<Id<"contactSessions"> | null>(
      `${CONTACT_SESSION_KEY}_${organizationId}`,
      null
    );
  }
);
export const errorMessageAtom = atom<string | null>(null);
export const loadingMessageAtom = atom<string | null>(null);
