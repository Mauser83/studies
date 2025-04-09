import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24202e",
    textSecondary: "#586069",
    textWhite: "#ffffff",
    primary: "#0366d6",
  },
  bgColor: {
    primary: "#0366d6",
    lightGray: "#e1e4e8",
    white: "#ffffff",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    })
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  padding: {
    padding: 10,
  },
  noPaddingBottom: {
    paddingBottom: 0,
  },
  textWrap: {
    flexWrap: "wrap",
  },
};

export default theme;
