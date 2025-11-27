import { useRef } from "react";
import { Close } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import {
  createRootRoute,
  Outlet,
  retainSearchParams,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { SnackbarKey, SnackbarProvider } from "notistack";

export const Route = createRootRoute({
  component: RootPage,
  pendingComponent: CircularProgress,
  search: {
    middlewares: [retainSearchParams(true)],
  },
});

function RootPage() {
  const notistackRef = useRef<SnackbarProvider | null>(null);
  const { hostname } = location;
  function onClickDismiss(key: SnackbarKey) {
    if (notistackRef !== null && notistackRef.current !== null) {
      notistackRef.current.closeSnackbar(key);
    }
  }

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      ref={notistackRef}
      autoHideDuration={7000}
      action={(key: SnackbarKey) => (
        <IconButton onClick={() => onClickDismiss(key)} color="inherit">
          <Close />
        </IconButton>
      )}
    >
      <Outlet />
      {hostname === "localhost" && <TanStackRouterDevtools />}
    </SnackbarProvider>
  );
}
