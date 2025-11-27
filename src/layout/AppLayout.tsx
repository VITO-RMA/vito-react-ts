import { Outlet } from "@tanstack/react-router";

import { Header } from "components/layout/Header";

export function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}