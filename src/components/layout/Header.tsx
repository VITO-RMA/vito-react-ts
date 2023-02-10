import { AppBar, styled, Toolbar, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  return (
    <StyledAppBar component="header">
      <Toolbar>
        <Typography>{t("title")}</Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

const StyledAppBar = styled(AppBar)`` as unknown as typeof AppBar;
