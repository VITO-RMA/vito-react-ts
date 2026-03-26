import { useContext } from "react";
import { type PaletteMode, useMediaQuery } from "@mui/material";

import { useLocalStorage } from "usehooks-ts";

import { ThemeContext } from "@/context/ThemeContext";

export function useCurrentThemeMode() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeColorMode] = useLocalStorage<PaletteMode>(
    "guppy-admin-color-scheme",
    prefersDarkMode ? "dark" : "light"
  );

  return themeColorMode;
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function useCurrentDomain() {
  const parts = [window.location.protocol, "//", window.location.hostname];
  if (["443", "80"].indexOf(window.location.port) === -1)
    parts.push(":", window.location.port);
  return parts.join("");
}
