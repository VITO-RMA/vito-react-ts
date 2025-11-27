import { createContext, ReactNode } from "react";
import { PaletteMode, useMediaQuery } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";

interface ThemeContextValues {
  themeColorMode: PaletteMode;
  changeThemeMode: () => void;
}

interface Props {
  children: ReactNode;
  localStorageKey: string;
}

export const ThemeContext = createContext<ThemeContextValues>({
  themeColorMode: "light",
  changeThemeMode: () => {},
});

export function ThemeContextProvider(props: Props) {
  const { children, localStorageKey } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeColorMode, setThemeColorMode] = useLocalStorage<PaletteMode>(
    localStorageKey,
    prefersDarkMode ? "dark" : "light"
  );

  function changeThemeMode() {
    setThemeColorMode((prevMode) => {
      if (prevMode === "light") {
        localStorage.setItem(localStorageKey, "dark");
        return "dark";
      }
      localStorage.setItem(localStorageKey, "light");
      return "light";
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        themeColorMode,
        changeThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
