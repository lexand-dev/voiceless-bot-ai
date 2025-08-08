import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

import { WidgetScreen } from "@/modules/widget/types";
import { CONTACT_SESSION_KEY } from "@/modules/widget/constants";
import { Id } from "@workspace/backend/_generated/dataModel";

// widget state management atoms
export const screenAtom = atom<WidgetScreen>("auth");
