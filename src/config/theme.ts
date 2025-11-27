import {
  createTheme,
  type CommonColors,
  type PaletteOptions,
  type SimplePaletteColorOptions,
  type ThemeOptions,
} from "@mui/material/styles";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    small: true;
  }
}

declare module "@mui/material/Toolbar" {
  interface ToolbarPropsVariantOverrides {
    small: true;
  }
}

export const setTheme = (mode: "dark" | "light") => {
  const sansFont =
    "Avenir LT Std, avenir next, avenir,-apple-system, BlinkMacSystemFont, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif";

  const borderRadius: number = 4;
  const commonColors: CommonColors = {
    black: "#000",
    white: "#fff",
  };

  const themeColors: SimplePaletteColorOptions = {
    main: "#ddf7ff",
  };
  const success: SimplePaletteColorOptions = {
    main: "rgb(75 ,161 ,68)",
  };
  const error: SimplePaletteColorOptions = {
    main: "#ff9292",
  };
  const warning: SimplePaletteColorOptions = {
    light: "rgb(183 ,171 ,31)",
    main: "rgb(150 ,140 ,25)",
    dark: "rgb(108 ,101 ,18)",
    contrastText: commonColors.white,
  };

  const lightMode: PaletteOptions = {
    mode: "light",
    primary: {
      main: "#e6ebee",
    },
    secondary: {
      main: "#11af58ff",
    },
    text: {
      primary: "#002E56",
      secondary: "#002E56",
      disabled: "#002e567a",
    },
    success,
    warning,
    error,
    background: {
      default: "#f4f6f8",
      paper: commonColors.white,
    },
    common: commonColors,
  };

  const darkMode: PaletteOptions = {
    mode: "dark",
    primary: {
      main: "#002E56",
    },
    secondary: {
      main: "#15EA75",
    },
    text: {
      primary: "#ddf7ff",
      secondary: "#cdf3ffff",
      disabled: "#ddf7ff62",
    },
    success,
    warning,
    error,
    background: {
      default: "#0056a1ff",
      paper: "#002E56",
    },
    common: commonColors,
  };

  const defaultTheme = createTheme({
    palette: mode === "dark" ? darkMode : lightMode,
    typography: {
      fontFamily: sansFont,
    },
  });

  const overrides: ThemeOptions = {
    palette: mode === "dark" ? darkMode : lightMode,
    typography: {
      fontFamily: sansFont,
    },
    shape: {
      borderRadius: borderRadius,
    },
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.main,
            transform: "scale(1, 1)",
          },
        },
      },
    },
  };

  return createTheme(defaultTheme, overrides);
};
