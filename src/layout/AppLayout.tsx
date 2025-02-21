import { Outlet } from "react-router-dom";

import { Header } from "components/layout/Header";
import { styled } from "@mui/material";

export function AppLayout() {
  return (
    <>
      <Header />
      <Styles>
        <Outlet />
      </Styles>
    </>
  );
}

const Styles = styled("main")`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 1fr;
background-color: pink;

`