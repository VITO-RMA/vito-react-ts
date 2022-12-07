import { Header } from "components/layout/Header";
import { ReactNode } from "react";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
