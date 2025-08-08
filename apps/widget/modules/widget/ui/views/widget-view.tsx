"use client";

import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";

interface Props {
  organizationId: string;
}

/* export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className="flex flex-col min-h-screen min-w-screen size-full overflow-hidden rounded-xl border bg-muted">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">How can we help you today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1">
        Widget View
        <p>Organization ID: {organizationId}</p>
      </div>
      <WidgetFooter />
    </main>
  );
}; */

export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className="flex flex-col min-h-screen min-w-screen size-full overflow-hidden rounded-xl border bg-muted">
      <WidgetAuthScreen />
    </main>
  );
};
