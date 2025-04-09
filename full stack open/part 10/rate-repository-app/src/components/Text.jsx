import { Text as NativeText, StyleSheet } from "react-native";

import theme from "./theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextWhite: {
    color: theme.colors.textWhite,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  bgStylePrimary: {
    backgroundColor: theme.bgColor.primary,
    color: theme.colors.textWhite,
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 10,
  },
  buttonPrimary: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.bgColor.primary,
    color: theme.colors.textWhite,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  fontSizeSubHeading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  paddingsNotBottom: {
    padding: theme.padding.padding,
    paddingBottom: theme.noPaddingBottom.paddingBottom,
  },
  textWrap: {
    flexWrap: theme.textWrap.flexWrap,
  },
});

const Text = ({
  color,
  bgStyle,
  fontSize,
  fontWeight,
  paddings,
  style,
  textWrap,
  button,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "textWhite" && styles.colorTextWhite,
    color === "primary" && styles.colorPrimary,
    fontSize === "subheading" && styles.fontSizeSubHeading,
    fontWeight === "bold" && styles.fontWeightBold,
    paddings === "paddingsNotBottom" && styles.paddingsNotBottom,
    bgStyle === "primary" && styles.bgStylePrimary,
    textWrap === "flexWrap" && styles.textWrap,
    button === "primary" && styles.buttonPrimary,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
