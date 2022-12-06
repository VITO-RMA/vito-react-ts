import { AppBar, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  return (
    <StyledAppBar>
      <Typography>{t("title")}</Typography>
    </StyledAppBar>
  );
}

const StyledAppBar = styled(AppBar)`
  & > *:nth-child(2) {
    margin-left: auto;
  }
`;
