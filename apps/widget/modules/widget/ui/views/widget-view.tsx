"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    error: <WidgetErrorScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    auth: <WidgetAuthScreen />,
    voice: <p>Voice view</p>,
    inbox: <p>Inbox view</p>,
    selection: <p>Select an option</p>,
    chat: <p>Chat view</p>,
    contact: <p>Contact view</p>
  };
  return (
    <main className="flex flex-col min-h-screen min-w-screen size-full overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen] || <p>Unknown screen</p>}
    </main>
  );
};
