import React from "react";
import { Box, CircularProgress, CssBaseline, Typography } from "@mui/material";
import { DarkModeProvider } from "context/DarkModeProvider";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { routeTree } from "routeTree.gen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter,  RouterProvider } from "@tanstack/react-router";

import { AppGlobalStyles } from "config/AppGlobalStyles";
import { bootstrap } from "config/bootstrap";
import { QUERY_STALE_TIME } from "config/constants";
import { GlobalErrorFallBack } from "components/boundary/GlobalErrorFallBack";
import { PageBase } from "pages/base/PageBase";

await bootstrap();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: QUERY_STALE_TIME,
    },
    mutations: {
      onError: (err) => {
        enqueueSnackbar(
          t("error.failedToSave", { defaultValue: err.message }),
          {
            variant: "error",
          }
        );
      },
    },
  },
});
const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
     <PageBase><Box
      sx={{
        minHeight: "calc(100dvh - 68px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box></PageBase>
  ),
  defaultErrorComponent: ({ error }: { error: Error }) => (
    <PageBase><Typography>{error.message}</Typography></PageBase>
  ),
  defaultNotFoundComponent: () => <PageBase><Typography>404 Page not found</Typography></PageBase>,
  notFoundMode: "fuzzy",
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DarkModeProvider localStorageKey="vpcs">
      <CssBaseline />
      <AppGlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={GlobalErrorFallBack}>
          <RouterProvider
            router={router}
            defaultPreload="intent"
            defaultPendingMs={1000}
            defaultPendingMinMs={500}
          />
        </ErrorBoundary>
      </QueryClientProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
