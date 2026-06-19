import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS, TYPOGRAPHY } from "../theme";

interface ActionCardProps {
  title: string;
  iconName: keyof typeof Feather.glyphMap;
  isFavorite?: boolean;
  onPress: () => void;
}

export const ActionCard = ({
  title,
  iconName,
  isFavorite,
  onPress,
}: ActionCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isFavorite && (
        <View style={styles.favoriteBadge}>
          <Feather name="star" size={wp("3%")} color={COLORS.primary} />
        </View>
      )}
      <Feather
        name={iconName}
        size={wp("6%")}
        color={COLORS.primary}
        style={styles.icon}
      />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("21%"), // Fits 4 items across perfectly with gaps
    aspectRatio: 1, // Keeps it perfectly square
    backgroundColor: COLORS.white,
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    padding: wp("2%"),
    borderWidth: 1,
    borderColor: "#E2E8F0", // Light border matching design
  },
  icon: {
    marginBottom: wp("2%"),
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: wp("2.8%"),
    color: COLORS.secondary,
    textAlign: "center",
  },
  favoriteBadge: {
    position: "absolute",
    top: wp("1.5%"),
    right: wp("1.5%"),
  },
});
