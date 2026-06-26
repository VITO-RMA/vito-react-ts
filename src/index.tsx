import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { t } from "i18next";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

import { bootstrap } from "@/config/bootstrap";
import { QUERY_STALE_TIME } from "@/config/constants";
import { NotFoundPage } from "@/pages/base/NotFoundPage";
import { PageBase } from "@/pages/base/PageBase";
import { GlobalErrorFallBack } from "@/components/boundary/GlobalErrorFallBack";
import { Spinner } from "@/components/ui/spinner";
import { TooltipProvider } from "@/components/ui/tooltip";

import type { RouterContext } from "@/routes/__root";
import { routeTree } from "@/routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: QUERY_STALE_TIME,
    },
    mutations: {
      onError: (err) => {
        toast.error(t("error.failedToSave", { defaultValue: err.message }));
      },
    },
  },
});
const router = createRouter({
  routeTree,
  context: {
    // Auth context will be provided by AuthRouterProvider
    auth: {
      msalInstance: null,
      isAuthenticated: false,
      isLoading: false,
    },
    queryClient,
  } as RouterContext,
  defaultPendingComponent: () => (
    <PageBase>
      <div className="min-h-auto flex justify-center items-center">
        <Spinner />
      </div>
    </PageBase>
  ),
  defaultErrorComponent: ({ error }: { error: Error }) => (
    <PageBase>
      <h1>{error.message}</h1>
    </PageBase>
  ),
  defaultNotFoundComponent: NotFoundPage,
  notFoundMode: "fuzzy",
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
async function prepare() {
  await bootstrap();
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ErrorBoundary FallbackComponent={GlobalErrorFallBack}>
            <RouterProvider
              router={router}
              defaultPreload="intent"
              defaultPendingMs={1000}
              defaultPendingMinMs={500}
            />
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
prepare();
