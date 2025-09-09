import { styled } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

import { mixinTransform } from "utils/CSSUtil";
import { Header } from "components/layout/Header";

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
  ${({ theme }) =>
    mixinTransform(theme.mixins.toolbar, "minHeight", "marginTop")};
  ${({ theme }) =>
    mixinTransform(theme.mixins.toolbar, "minHeight", "height", (l) => {
      return `calc(100dvh - ${l}px);`;
    })};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;
