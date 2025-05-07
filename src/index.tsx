import React from "react";
import { Box, CircularProgress, CssBaseline, Typography } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { routeTree } from "routeTree.gen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppGlobalStyles } from "config/AppGlobalStyles";
import { bootstrap } from "config/bootstrap";
import { QUERY_STALE_TIME } from "config/constants";
import { theme } from "config/theme";
import { GlobalErrorFallBack } from "components/boundary/GlobalErrorFallBack";

bootstrap();

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
    <Box
      sx={{
        minHeight: "calc(100dvh - 68px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ),
  defaultErrorComponent: ({ error }: { error: Error }) => (
    <Typography>{error.message}</Typography>
  ),
  defaultNotFoundComponent: () => <>404 Not found</>,
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
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  </React.StrictMode>
);
