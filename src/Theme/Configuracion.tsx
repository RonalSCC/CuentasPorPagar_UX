import { ThemeOptions } from "@mui/material";
import { components } from "./componentes";
import { typography } from "./tipografia";
import { grey } from "./palettes";

export const light: ThemeOptions = {
  typography,
  components,
  palette: {
    grey,
    text: {
      primary: "rgba(16, 24, 64, 0.87)",
      secondary: "rgba(16, 24, 64, 0.6)",
      disabled: "rgba(16, 24, 64, 0.38)",
    },
    primary: {
      main: "#1E62A1",
      dark: "#003972",
      light: "#5A8FD3",
    },
    secondary: {
      main: "#0CBBE2",
      dark: "#008BB0",
      light: "#67EEFF",
      contrastText: "#FFF",
    },
    action: {
      active: "rgba(16, 24, 64, 0.54)",
      hover: "rgba(16, 24, 64, 0.04)",
      selected: "rgba(16, 24, 64, 0.08)",
      disabled: "rgba(16, 24, 64, 0.26)",
      disabledBackground: "rgba(16, 24, 64, 0.12)",
      focus: "rgba(16, 24, 64, 0.12)",
    },
    error: {
      main: "#D14343",
      dark: "#B51E1E",
      light: "#D85F5F",
    },
    warning: {
      main: "#FB8500",
      dark: "#F85500",
      light: "#FC9726",
      contrastText: "#FFF",
    },
    info: {
      main: "#2D9FC5",
      dark: "#1172A3",
      light: "#4DADCE",
      contrastText: "#FFF",
    },
    success: {
      main: "#8FC93A",
      dark: "#60A918",
      light: "#A0D158",
      contrastText: "#FFF",
    },
    background: {
      paper: "#FFF",
      default: "#000",
    },
    divider: "rgba(16, 24, 64, 0.12)",
  },
};

export const dark: ThemeOptions = {
  typography,
  palette: {
    grey,
    text: {
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    primary: {
      main: "#4DADCE",
      dark: "#2D9FC5",
      light: "#C0E2EE",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#BBC2C9",
      dark: "#8D9AA6",
      light: "#E4E7EA",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    action: {
      active: "rgba(255, 255, 255, 0.56)",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      focus: "rgba(255, 255, 255, 0.12)",
    },
    error: {
      main: "#D14343",
      dark: "#B51E1E",
      light: "#E57373",
      contrastText: "#FFF",
    },
    warning: {
      main: "#FB8500",
      dark: "#F85500",
      light: "#FC9726",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#4DADCE",
      dark: "#2D9FC5",
      light: "#C0E2EE",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success: {
      main: "#8FC93A",
      dark: "#60A918",
      light: "#A0D158",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
};
