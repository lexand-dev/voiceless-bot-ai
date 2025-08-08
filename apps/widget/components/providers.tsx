"use client";

import * as React from "react";
import { Provider } from "jotai";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convexClient}>
      <Provider>{children}</Provider>
    </ConvexProvider>
  );
}
