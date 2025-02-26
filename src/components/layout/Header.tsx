import { AppBar, styled, Toolbar, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  console.log(VITE_APP_VERSION);
  return (
    <StyledAppBar component="header">
      <Toolbar>
        <Typography>{t("title")}</Typography> - {/* FIXME: undefined? */}
        {/* <Typography>{VITE_APP_VERSION}</Typography> -{" "}
        <Typography>{VITE_APP_RELEASE_DATE}</Typography> */}
      </Toolbar>
    </StyledAppBar>
  );
}

const StyledAppBar = styled(AppBar)`` as unknown as typeof AppBar;
