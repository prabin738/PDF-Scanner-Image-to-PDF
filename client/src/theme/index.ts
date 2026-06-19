import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const COLORS = {
  primary: "#00A884", // Main brand green
  secondary: "#1A1C1E", // Dark charcoal/black
  tertiary: "#F1F5F9", // Light background
  neutral: "#64748B", // Slate gray for labels/inactive icons
  white: "#FFFFFF",
  error: "#DC2626", // Standard error red (for delete actions)
};

export const TYPOGRAPHY = {
  fontFamily: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    bold: "Inter_700Bold",
  },
  // Responsive font sizes using width percentage for cross-device scaling
  size: {
    h1: wp("8%"), // Headlines
    h2: wp("6%"), // Subheaders
    body: wp("4%"), // Standard body text
    label: wp("3%"), // Small labels
  },
};

export const SPACING = {
  xs: wp("1%"),
  sm: wp("2%"),
  md: wp("4%"), // Standard padding
  lg: wp("6%"),
  xl: wp("8%"),
};
