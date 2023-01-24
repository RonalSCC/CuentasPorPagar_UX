import { Components } from "@mui/material";

// CONFIGURACION COMPONENTES

// INPUTS
export const Componentes: Components = {
  // AUTOCOMPLETE
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        "& .MuiAutocomplete-endAdornment	": {
          paddingTop: 5,
        },
        "& .MuiInputLabel-root": {
          marginTop: 3,
          fontSize: 100,
          "&.Mui-focused": { marginTop: 0 },
        },
        "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input":
          { height: 23, fontSize: 13 },
      },
      tagSizeMedium: {
        root: { "& .MuiAutocomplete-inputRoot": { height: 46 } },
      },
    },
  },

  // APP BAR
  MuiAppBar: {
    styleOverrides: {
      root: {
        fontFamily: "Nunito",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "22px",
        letterSpacing: "0.15px",
      },
    },
  },

  // BUTTON
  MuiButton: {
    styleOverrides: {
      sizeSmall: {
        fontSize: 13,
        lineHeight: "18px",
        letterSpacing: ".2px",
        fontStyle: "normal",
        fontWeight: "400",
        "& .MuiButton-startIcon>*:nth-of-type(1)": {
          fontSize: "14px",
        },
      },
      sizeMedium: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: "0.46px",
        "& .MuiButton-startIcon>*:nth-of-type(1)": {
          fontSize: "18px",
        },
      },
      sizeLarge: {
        fontSize: 15,
        fontWeight: 600,
        lineHeight: 1.7,
        letterSpacing: ".46px",
      },
      root: {
        textTransform: "none",
        minWidth: "unset",
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // BUTTON GROUP
  MuiButtonGroup: {
    styleOverrides: {
      root: {
        fontSize: "13px",
        fontWeight: 400,
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // ICON BUTTON
  MuiIconButton: {
    styleOverrides: {
      sizeSmall: {
        width: "13.33px",
        height: "12.67px",
      },
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: {
        ".MuiFormControlLabel-label": {
          fontSize: "13px",
        },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        padding: 6,
        fontSize: "13px",
        inputProps: {
          fontSize: "13px",
        },
        "& .MuiFormControlLabel-label": {
          fontSize: "13px",
        },
        ".MuiSvgIcon-fontSizeSmall": {
          fontSize: 16,
        },
        ".MuiSvgIcon-fontSizeMedium": {
          fontSize: 20,
        },
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // FLOATING ACTION BUTTON
  MuiFab: {
    styleOverrides: {
      sizeSmall: {
        "&.MuiButtonBase-root.MuiFab-circular": {
          height: 36,
          width: 36,
          "& .MuiSvgIcon-fontSizeSmall ": {
            fontSize: 14,
          },
        },
        "&.MuiButtonBase-root.MuiFab-extended": {
          height: 32,
          width: 72,
          fontSize: 13,
        },
      },
      sizeMedium: {
        "&.MuiButtonBase-root.MuiFab-circular": {
          height: 48,
          width: 48,
        },
        "& .MuiSvgIcon-root": {
          fontSize: 18,
        },
        "&.MuiButtonBase-root.MuiFab-extended": {
          height: 38,
          width: 86,
          fontSize: 14,
        },
      },

      root: {
        "&.MuiButtonBase-root.MuiFab-circular": {
          height: 56,
          width: 56,
        },
        "& .MuiSvgIcon-root": {
          fontSize: 22,
        },
        "&.MuiButtonBase-root.MuiFab-extended": {
          height: 48,
          width: 88,
          fontSize: 15,
        },
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // RADIOGROUP
  MuiRadio: {
    styleOverrides: {
      root: {
        "& .MuiSvgIcon-fontSizeSmall": {
          fontSize: 16,
        },
        "& .MuiSvgIcon-fontSizeMedium": {
          fontSize: 20,
        },
        padding: "4px",
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // RATING
  MuiRating: {
    styleOverrides: {
      sizeSmall: {
        width: "15px",
        height: "14.25px",
        fontSize: "14px",
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // SLIDER
  MuiSlider: {
    styleOverrides: {
      sizeSmall: {
        width: "146px",
        height: "2px",
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // SWITCH
  MuiSwitch: {
    defaultProps: {
      size: "small",
    },
  },

  // TEXTFIELD INPUT BASE
  MuiTextField: {
    defaultProps: {
      InputProps: {
        sx: {
          width: "",
        },
      },
      size: "small",
    },
  },

  // INPUT LABEL
  MuiInputLabel: {
    styleOverrides: {
      filled: {
        "&.Mui-focused": {
          top: -4,
        },
      },
      standard: {
        "&.Mui-focused": {
          top: 3,
        },
      },
      outlined: {
        "&.MuiInputLabel-outlined": {
          top: -6,
        },
        "&.Mui-focused": {
          top: 3,
        },
      },
      root: {
        "&.MuiInputLabel-root": {
          top: 0,
        },
      },
      sizeSmall: {
        fontSize: 13,
        "&.MuiInputLabel-root": {
          top: -1,
          "&.Mui-focused": {
            top: 0,
          },
          "&.MuiInputLabel-outlined": {
            top: 0,
            "&.Mui-focused": {
              top: 3,
            },
          },
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "&.MuiInputBase-root": {
          "& fieldset": {
            borderColor: "rgba(16, 24, 64, 0.23)",
          },
        },
      },
    },
  },
  // INPUT BASE
  MuiInputBase: {
    styleOverrides: {
      root: {
        "& .MuiFilledInput-input": {
          height: 14,
        },
        "& .MuiOutlinedInput-input": {
          height: 5,
        },
      },
      sizeSmall: {
        fontSize: 13,
        ".MuiInputBase-inputSizeSmall	": {
          height: 13,
        },
        "& .MuiFilledInput-input": {
          height: 13,
        },
        "& .MuiOutlinedInput-input": {
          height: 15,
        },
      },
    },
  },

  // FORM CONTROL
  MuiFormControl: {
    styleOverrides: {
      root: {
        "&. MuiFormControlLabel-label": {
          fontSize: "13px",
        },
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // TOGGLE BUTTON
  MuiToggleButton: {
    defaultProps: {
      size: "small",
    },
  },

  //TOGGLE BUTTON GROUP
  MuiToggleButtonGroup: {
    defaultProps: {
      size: "small",
    },
  },

  // SNACKBAR
  MuiSnackbar: {
    styleOverrides: {
      root: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "143%",
        letterSpacing: "0.17px",
      },
    },
  },

  // AVATAR
  MuiAvatar: {
    styleOverrides: {
      root: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: " 13px",
        lineHeight: "18px",
        letterSpacing: "0.14px",
        width: "32px",
        height: "32px",
      },
    },
    defaultProps: {
      sizes: "small",
    },
  },

  // CHIP
  MuiChip: {
    styleOverrides: {
      sizeSmall: {
        fontSize: 12,
      },
      sizeMedium: {
        fontSize: 13,
      },
      root: {
        borderRadius: 4,
        "&.MuiChip-colorError": {
          backgroundColor: "#B51E1E",
        },
        "&.MuiChip-outlinedError": {
          backgroundColor: "#fff",
        },
        "& .MuiChip-avatarColorError": {
          backgroundColor: "#D14343",
          color: "#fff",
        },
        "&.MuiChip-outlinedInfo": {
          backgroundColor: "#fff",
        },
        "& .MuiChip-avatarColorInfo": {
          backgroundColor: "#1172A3",
          color: "#fff",
        },

        "&.MuiChip-outlinedSuccess": {
          backgroundColor: "#fff",
        },
        "& .MuiChip-avatarColorSuccess": {
          backgroundColor: "#60A918",
          color: "#fff",
        },
        "&.MuiChip-outlinedWarning": {
          backgroundColor: "#fff",
        },
        "& .MuiChip-avatarColorWarning": {
          backgroundColor: "#F85500",
          color: "#fff",
        },
      },
    },
    defaultProps: {
      size: "small",
    },
  },

  // ICON
  MuiIcon: {
    defaultProps: {
      fontSize: "small",
    },
  },

  // LIST
  MuiListSubheader: {
    styleOverrides: {
      root: {
        fontSize: 12,
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      dense: {
        "&.MuiListItemButton-dense": {
          height: 36,
        },
      },
      root: {
        fontSize: 14,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        "& .MuiTypography-body2": {
          fontSize: 14,
        },
      },
    },
  },

  // SVG ICON
  MuiSvgIcon: {
    styleOverrides: {
      fontSizeSmall: {
        fontSize: "14px",
      },
    },
    defaultProps: {
      fontSize: "small",
    },
  },

  // TABLE ROW
  MuiTableHead: {
    styleOverrides: {
      root: {
        fontSize: 13,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      sizeSmall: {
        fontSize: 13,
      },
    },
  },
  MuiTableFooter: {
    styleOverrides: {
      root: {
        fontSize: 12,
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        sx: {
          heigth: 28,
        },
      },
    },
  },

  // FEEDBACK.
  MuiBadge: {
    styleOverrides: {
      badge: {
        fontWeight: 500,
        lineHeight: 0,
        height: 14.4,
        width: 14,
        fontSize: "10px",
        borderRadius: "100%",
        minWidth: "10px",
      },

      root: {
        fontWeight: 500,
        lineHeight: 0,
        height: 14.4,
        width: 14,
        fontSize: "10px",
        borderRadius: "100%",
        minWidth: "10px",
      },
    },
  },

  // ALERT
  MuiAlert: {
    styleOverrides: {
      root: {
        fontSize: "13px",
        fontWeight: "400",
        lineHeight: "15.6px",
        letterSpacing: "0.17px",
      },
    },
  },

  // ALERT TITLE
  MuiAlertTitle: {
    styleOverrides: {
      root: {
        fontSize: "14px",
        paddingBottom: 0,
        lineHeight: "14px",
        letterSpacing: "0.15px",
      },
    },
  },
  MuiBottomNavigation: {
    styleOverrides: {
      root: {
        "&.css-11p4tlo-MuiBottomNavigationAction-label.Mui-selected": {
          fontWeight: 400,
          fontSize: "13",
          lineHeight: "13px",
          letterSpacing: "0.4px",
        },
        fontWeight: 400,
        fontSize: "13",
        lineHeight: "13px",
        letterSpacing: "0.4px",
      },
    },
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      label: {
        "&.MuiBottomNavigationAction-label.Mui-selected ": {
          fontWeight: 400,
          fontSize: "13px",
          lineHeight: "13px",
          letterSpacing: "0.4px",
        },
      },
    },
  },

  // BACKDROP
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(16, 24, 64, 0.5)",
      },
    },
  },

  // MENU
  MuiMenuItem: {
    styleOverrides: {
      dense: {
        height: "28px",
        width: "106px",
      },
    },
  },

  // TAB
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },

  // CARD
  MuiCardHeader: {
    styleOverrides: {
      root: {
        fontFamily: "Nunito",
        fontSize: "16px",
        letterSpacing: "0.15px",
        lineHeight: "140%",
        fontWeight: 600,
      },
      subheader: {
        fontfamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "140%",
        letterspacing: "0.15px",
      },
    },
  },

  // BREADCRUMBS
  MuiBreadcrumbs: {
    styleOverrides: {
      li: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "14.4px",
        letterSpacing: 0.15,
      },
    },
  },

  // DIALOG
  MuiDialog: {
    styleOverrides: {
      root: {
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "18.2px",
        letterSpacing: "0.15px",
      },
    },
  },

  // MUI DIALOG TITLE
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontFamily: "Nunito",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "22px",
        letterSpacing: "0.15px",
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.15px",
      },
    },
  },

  // PAPER
  MuiPaper: {
    styleOverrides: {
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
};

export const components = Componentes;
