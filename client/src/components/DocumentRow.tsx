import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS, TYPOGRAPHY } from "../theme";

interface DocumentRowProps {
  title: string;
  date: string;
  size: string;
  type: "pdf" | "scanned" | "converted";
}

export const DocumentRow = ({ title, date, size, type }: DocumentRowProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Feather name="file-text" size={wp("6%")} color={COLORS.primary} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle}>
          {date} • {size}
        </Text>
      </View>

      <TouchableOpacity style={styles.moreButton}>
        <Feather
          name="more-vertical"
          size={wp("5%")}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: wp("3.5%"),
    borderRadius: wp("3%"),
    marginBottom: wp("3%"),
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  iconContainer: {
    width: wp("12%"),
    height: wp("12%"),
    backgroundColor: COLORS.tertiary,
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: wp("3.8%"),
    color: COLORS.secondary,
    marginBottom: wp("1%"),
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: wp("3%"),
    color: COLORS.neutral,
  },
  moreButton: {
    padding: wp("2%"),
  },
});
