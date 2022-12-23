import { blue } from "@mui/material/colors";
import { Shadows, ThemeOptions } from "@mui/material/styles";
import { ColorPartial, PaletteColorOptions } from "@mui/material/styles/createPalette";
import { TypographyOptions } from "@mui/material/styles/createTypography";
declare module '@mui/material/styles' {
  interface Palette {
    blues?: PaletteColorOptions;
  }
  interface PaletteOptions {
    blues?: PaletteColorOptions;
  }
}

const grey: ColorPartial = {
  50: "#FAFBFF",
  100: "#F4F6FA",
  200: "#EDEFF5",
  300: "#E6E8F0",
  400: "#D8DAE5",
  500: "#C1C4D6",
  600: "#8F95B2",
  700: "#696F8C",
  800: "#474D66",
  900: "#101840",
  A100: "#D8DAE5",
  A200: "#C1C4D6",
  A400: "#696F8C",
  A700: "#101840",
};
const shadows: Shadows = [
  "none",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
  "0px 2px 1px -1px rgba(16, 24, 64, 0.1),0px 1px 1px 0px rgba(16, 24, 64, .14),0px 1px 3px 0px rgba(16, 24, 64, .12)",
];
const typography: TypographyOptions = {
  h1: {
    fontFamily: "Nunito",
    fontSize: "96px",
    fontWeight: "300",
    lineHeight:"112.03px",
    letterSpacing:"-1.5px"
  },
  h2: {
    fontFamily: "Nunito",
    fontWeight: "400",
    fontSize: "60px",
    lineHeight:"72px",
    letterSpacing:"-0.5px"
  },
  h3: {
    fontFamily: "Nunito",
    fontSize: "48px",
    fontWeight: "500",
    lineHeight:"56.02px",
    letterSpacing:"0px"
  },
  h4: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: "34px",
    lineHeight:"41.99px",
    letterSpacing:"0.25px"
  },
  h5: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight:"32.02px",
    letterSpacing:"0"
  },
  h6: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight:"32px",
    letterSpacing:"0.15px"
  },
  subtitle1: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight:"28px",
    letterSpacing:"0.15px"
  },
  subtitle2: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight:"21.98px",
    letterSpacing:"0.1px"
  },
  body1: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight:"24px",
    letterSpacing:"0.15px"
  },
  body2: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight:"20.02px",
    letterSpacing:"0.17px"
  },
  button: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight:"24px",
    letterSpacing:"0.4px"
  },
  caption: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight:"19.92px",
    letterSpacing:"0.4px"
  },
  overline:{
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight:"31.92px",
    letterSpacing:"1px"
  },
};

export const light: ThemeOptions = {
  typography,
  shadows,
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
      light: "#5A8FD3"
    },
    secondary: {
      main: "rgba(16, 24, 64, 0.6)",
      dark: "#008BB0",
      light: "#67EEFF",
      contrastText:"#FFFFFF"
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
      paper: "#FBFBFB",
      default: "#F1F0EE",
    },
    blues:{
      main:blue[100],
    },
    divider: "rgba(16, 24, 64, 0.12)",
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          textTransform:"none"
        }
      }
    },
    MuiFab:{
      styleOverrides:{
        root:{
          textTransform:"none"
        }
      }
    }
  }
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