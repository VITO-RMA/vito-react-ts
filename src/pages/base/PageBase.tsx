import type { HTMLAttributes } from "react";
import { styled } from "@mui/material";

import { mixinTransform } from "utils/CSSUtil";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function PageBase(props: Props) {
  const { children, className = "", ...itemProps } = props;

  return (
    <Styles className={className} {...itemProps}>
      {children}
    </Styles>
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
