import { AppBar, styled, Toolbar, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  console.log(APP_VERSION);
  return (
    <StyledAppBar component="header">
      <Toolbar>
        <Typography>{t("title.globalTitle")}</Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

const StyledAppBar = styled(AppBar)`` as unknown as typeof AppBar;
