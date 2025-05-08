"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  // Hydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { PropsWithChildren } from "react";

interface QueryProviderProps extends PropsWithChildren {
  dehydratedState?: unknown;
}

export default function QueryProvider({
  children,
  dehydratedState,
}: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
