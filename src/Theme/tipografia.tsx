import { TypographyOptions } from "@mui/material/styles/createTypography";
<link
  href="https://fonts.googleapis.com/css2?family=Nunito&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
  rel="stylesheet"
/>;

const Typography: TypographyOptions = {
  fontFamily: "sans-serif",
  h1: {
    fontFamily: "Nunito",
    fontSize: "40px",
    fontWeight: "300",
    lineHeight: "56px",
    letterSpacing: "-1.5px",
  },
  h2: {
    fontFamily: "Nunito",
    fontSize: "32px",
    fontWeight: "400",
    lineHeight: "38.4px",
    letterSpacing: "-0.5px",
  },
  h3: {
    fontFamily: "Nunito",
    fontSize: "28px",
    fontWeight: "500",
    lineHeight: "33.6px",
    letterSpacing: 0,
  },
  h4: {
    fontFamily: "Nunito",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "20px",
    letterSpacing: "0.25px",
  },
  h5: {
    fontFamily: "Nunito",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "28.8px",
    letterSpacing: 0,
  },
  h6: {
    fontFamily: "Nunito",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "22.4px",
    letterSpacing: "0.15px",
  },
  subtitle1: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "19.6px",
    letterSpacing: "0.15px",
  },
  subtitle2: {
    fontFamily: "Roboto",
    fontSize: "13px",
    fontWeight: "500",
    lineHeight: "15.6px",
    letterSpacing: "0.1px",
  },
  body1: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "18.2px",
    letterSpacing: "0.15px",
  },
  body2: {
    fontFamily: "Roboto",
    fontSize: "13px",
    fontWeight: "400",
    lineHeight: "15.6px",
    letterSpacing: "0.17ox",
  },
  caption: {
    fontFamily: "Roboto",
    fontSize: "11px",
    fontWeight: "400",
    lineHeight: "15.4px",
    letterSpacing: "0.4px",
  },
  overline: {
    fontFamily: "Roboto",
    fontSize: "11px",
    fontWeight: "400",
    lineHeight: "29.26px",
    letterSpacing: "1px",
  },
  button: {
    textTransform: "none",
    minWidth: "unset",
  },
};
export const typography = Typography;
