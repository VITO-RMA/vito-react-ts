import { CircularProgress, styled } from "@mui/material";

import { useTranslation } from "react-i18next";

export function FullScreenLoader() {
  const { t } = useTranslation();
  return (
    <Styles>
      <CircularProgress />
      {t("label.loading")}
    </Styles>
  );
}

const Styles = styled("div")`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;
