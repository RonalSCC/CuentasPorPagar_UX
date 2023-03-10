import { Tune } from "@mui/icons-material";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#1e62a1",
      light: "#5a8fd3",
      dark: "#003972",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0CBBE2",
      light: "#67eeff",
      dark: "#008bb0",
      contrastText: "#ffffff",
    },
    text: {
      primary: "rgba(16,24,64,0.87)",
      secondary: "rgba(16,24,64,0.6)",
      disabled: "rgba(16,24,64,0.38)",
    },
    error: {
      main: "#D14343",
      light: "#d85f5f",
      dark: "#b51e1e",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fb8500",
      light: "#fc9726",
      dark: "#f85500",
      contrastText: "#ffffff",
    },
    info: {
      main: "#2d9fc5",
      light: "#4dadce",
      dark: "#1172a3",
      contrastText: "#ffffff",
    },
    success: {
      main: "#8fc93a",
      dark: "#60a918",
      light: "#a0d158",
      contrastText: "#ffffff",
    },
    grey: {
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
    },

    action: {
      active: "rgba(16, 24, 64, 0.54)",
      hover: "rgba(16, 24, 64, 0.04)",
      selected: "rgba(16, 24, 64, 0.08)",
      disabled: "rgba(16, 24, 64, 0.26)",
      disabledBackground: "rgba(16, 24, 64, 0.12)",
      focus: "rgba(16, 24, 64, 0.12)",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    divider: "rgba(16,24,64,0.12)",
  },
  typography: {
    fontSize: 11,
    h6: {
      fontFamily: "Nunito",
      fontSize: "1.1rem",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "Nunito",
      fontSize: "1.3rem",
    },
    h4: {
      fontFamily: "Nunito",
      fontSize: "1.8rem",
    },
    h3: {
      fontFamily: "Nunito",
      fontSize: "2.4rem",
    },
    h2: {
      fontFamily: "Nunito",
      fontSize: "3.2rem",
    },
    h1: {
      fontFamily: "Nunito",
      fontSize: "5rem",
    },
    fontWeightLight: 300,
    subtitle2: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
  },
  spacing: 8,
  components: {
    MuiAlert:{
      styleOverrides: {
        root: {
          zIndex: 10000
        }
      }
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCard:{
      styleOverrides:{
        root:{
          overflow: "visible"        
        },
      }
    },
    MuiCardContent: {
      styleOverrides:{
        root:{
          gap:1,
          padding: 1.5
        }
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiDialogContent:{
      styleOverrides:{
        root:{
          padding: "16px 24px !important",
        }
      }
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "none",
        size: "small",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(16, 24, 64, 0.23)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        sizeSmall: {
          "& .MuiOutlinedInput-input": {
            padding: "7px 13px",
          },
        },
      },
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.label#demo-multiple-name-label": {
            top: 3.5,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        sizeSmall: {
          lineHeight: "14px",
        },
        outlined: {
          "&.Mui-focused ": {
            top: 4.5,
          },
        },
      },
      defaultProps: {
        margin: "dense",
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "none",
        size: "small",
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiPaper: {
      styleOverrides: {
        root:{
         backgroundColor: "background.default",
        },
        elevation0: "none",
        elevation1: {
          boxShadow:
            "0px 1px 3px rgba(24, 39, 75, 0.12), 0px 1px 1px -1px rgba(24, 39, 75, 0.14), 0px 2px 1px -2px rgba(24, 39, 75, 0.2)",
        },
        elevation2: {
          boxShadow:
            "0px 1px 5px rgba(24, 39, 75, 0.12), 0px 2px 2px rgba(24, 39, 75, 0.14), 0px 3px 1px -2px rgba(24, 39, 75, 0.2)",
        },
        elevation3: {
          boxShadow:
            "0px 1px 8px rgba(24, 39, 75, 0.12), 0px 3px 4px rgba(24, 39, 75, 0.14), 0px 3px 3px -2px rgba(24, 39, 75, 0.2)",
        },
        elevation4: {
          boxShadow:
            "0px 2px 4px -1px rgba(24, 39, 75, 0.2), 0px 4px 5px rgba(24, 39, 75, 0.14), 0px 1px 10px rgba(24, 39, 75, 0.12)",
        },
        elevation5: {
          boxShadow:
            "0px 3px 5px -1px rgba(24, 39, 75, 0.2), 0px 5px 8px rgba(24, 39, 75, 0.14), 0px 1px 14px rgba(24, 39, 75, 0.12)",
        },
        elevation6: {
          boxShadow:
            "0px 3px 5px -1px rgba(24, 39, 75, 0.2), 0px 6px 10px rgba(24, 39, 75, 0.14), 0px 1px 18px rgba(24, 39, 75, 0.12)",
        },
        elevation7: {
          boxShadow:
            "0px 4px 5px -2px rgba(24, 39, 75, 0.2), 0px 7px 10px 1px rgba(24, 39, 75, 0.14), 0px 2px 16px 1px rgba(24, 39, 75, 0.12)",
        },
        elevation8: {
          boxShadow:
            "0px 5px 5px -3px rgba(24, 39, 75, 0.2), 0px 8px 10px 1px rgba(24, 39, 75, 0.14), 0px 3px 14px 2px rgba(24, 39, 75, 0.12)",
        },
        elevation9: {
          boxShadow:
            "0px 5px 6px -3px rgba(24, 39, 75, 0.2), 0px 9px 12px 1px rgba(24, 39, 75, 0.14), 0px 3px 16px 2px rgba(24, 39, 75, 0.12)",
        },
        elevation10: {
          boxShadow:
            "0px 6px 6px -3px rgba(24, 39, 75, 0.2), 0px 10px 14px 1px rgba(24, 39, 75, 0.14), 0px 4px 18px 3px rgba(24, 39, 75, 0.12)",
        },
        elevation11: {
          boxShadow:
            "0px 6px 7px -4px rgba(24, 39, 75, 0.2), 0px 11px 15px 1px rgba(24, 39, 75, 0.14), 0px 4px 20px 3px rgba(24, 39, 75, 0.12)",
        },
        elevation12: {
          boxShadow:
            "0px 7px 8px -4px rgba(24, 39, 75, 0.2), 0px 12px 17px 2px rgba(24, 39, 75, 0.14), 0px 5px 22px 4px rgba(24, 39, 75, 0.12)",
        },
        elevation13: {
          boxShadow:
            "0px 7px 8px -4px rgba(24, 39, 75, 0.2), 0px 13px 19px 2px rgba(24, 39, 75, 0.14), 0px 5px 24px 4px rgba(24, 39, 75, 0.12)",
        },
        elevation14: {
          boxShadow:
            "0px 7px 9px -4px rgba(24, 39, 75, 0.2), 0px 14px 21px 2px rgba(24, 39, 75, 0.14), 0px 5px 26px 4px rgba(24, 39, 75, 0.12)",
        },
        elevation15: {
          boxShadow:
            "0px 8px 9px -5px rgba(24, 39, 75, 0.2), 0px 15px 22px 2px rgba(24, 39, 75, 0.14), 0px 6px 28px 5px rgba(24, 39, 75, 0.12)",
        },
        elevation16: {
          boxShadow:
            "0px 8px 10px -5px rgba(24, 39, 75, 0.2), 0px 16px 24px 2px rgba(24, 39, 75, 0.14), 0px 6px 30px 5px rgba(24, 39, 75, 0.12)",
        },
        elevation17: {
          boxShadow:
            "0px 8px 11px -5px rgba(24, 39, 75, 0.2), 0px 17px 26px 2px rgba(24, 39, 75, 0.14), 0px 6px 32px 5px rgba(24, 39, 75, 0.12)",
        },
        elevation18: {
          boxShadow:
            "0px 9px 11px -5px rgba(24, 39, 75, 0.2), 0px 18px 28px 2px rgba(24, 39, 75, 0.14), 0px 7px 34px 6px rgba(24, 39, 75, 0.12)",
        },
        elevation19: {
          boxShadow:
            "0px 9px 12px -6px rgba(24, 39, 75, 0.2), 0px 19px 29px 2px rgba(24, 39, 75, 0.14), 0px 7px 36px 6px rgba(24, 39, 75, 0.12)",
        },
        elevation20: {
          boxShadow:
            "0px 10px 13px -6px rgba(24, 39, 75, 0.2), 0px 20px 31px 3px rgba(24, 39, 75, 0.14), 0px 8px 38px 7px rgba(24, 39, 75, 0.12)",
        },
        elevation21: {
          boxShadow:
            "0px 10px 13px -6px rgba(24, 39, 75, 0.2), 0px 21px 33px 3px rgba(24, 39, 75, 0.14), 0px 8px 40px 7px rgba(24, 39, 75, 0.12)",
        },
        elevation22: {
          boxShadow:
            "0px 10px 14px -6px rgba(24, 39, 75, 0.2), 0px 22px 35px 3px rgba(24, 39, 75, 0.14), 0px 8px 42px 7px rgba(24, 39, 75, 0.12)",
        },
        elevation23: {
          boxShadow:
            "0px 11px 14px -7px rgba(24, 39, 75, 0.2), 0px 23px 36px 3px rgba(24, 39, 75, 0.14), 0px 9px 44px 8px rgba(24, 39, 75, 0.12)",
        },
        elevation24: {
          boxShadow:
            "0px 11px 15px -7px rgba(24, 39, 75, 0.2), 0px 24px 38px 3px rgba(24, 39, 75, 0.14), 0px 9px 46px 8px rgba(24, 39, 75, 0.12)",
        },
      },
    },
  },
};
