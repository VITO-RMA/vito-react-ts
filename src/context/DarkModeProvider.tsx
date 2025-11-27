import { ReactNode, useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { setTheme } from "config/theme";
import { ThemeContext, ThemeContextProvider } from "../context/ThemeContext";

interface Props {
  localStorageKey: string;
  children: ReactNode;
}
interface DarkmodeConsumerProps {
  children: ReactNode;
}
export function DarkModeProvider(props: Props) {
  const { localStorageKey, children } = props;

  return (
    <ThemeContextProvider localStorageKey={localStorageKey}>
      <DarkmodeConsumer>{children}</DarkmodeConsumer>
    </ThemeContextProvider>
  );
}

function DarkmodeConsumer(props: DarkmodeConsumerProps) {
  const themeModeContext = useContext(ThemeContext);

  return (
    <MuiThemeProvider theme={setTheme(themeModeContext.themeColorMode)}>
      {props.children}
    </MuiThemeProvider>
  );
}
