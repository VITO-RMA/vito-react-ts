import type { QueryClient } from "@tanstack/react-query";

import {
  createRootRouteWithContext,
  Outlet,
  retainSearchParams,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/styles.css";

import { Spinner } from "@/components/ui/spinner";

import { ThemeProvider } from "@/context/ThemeContext";

export interface RouterContext {
  auth: {
    msalInstance: null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootPage,
  pendingComponent: Spinner,
  search: {
    middlewares: [retainSearchParams(true)],
  },
});

function RootPage() {
  const { hostname } = location;

  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster position="top-right" duration={7000} />
        <Outlet />
        {hostname === "localhost" && <TanStackRouterDevtools />}
      </TooltipProvider>
    </ThemeProvider>
  );
}
