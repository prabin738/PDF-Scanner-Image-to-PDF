import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TYPOGRAPHY } from "../theme";

interface PageWatermarkProps {
  text?: string;
}

export const PageWatermark = ({
  text = "Precision Scan - Unregistered",
}: PageWatermarkProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Repeated lines of text for standard watermark pattern */}
      {[...Array(12)].map((_, index) => (
        <Text key={index} style={styles.watermarkText}>
          {text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Completely fill the parent image container
    padding: wp("5%"),
    justifyContent: "space-between",
    opacity: 0.15, // Light and non-intrusive
  },
  watermarkText: {
    color: "#000",
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: wp("4%"),
    textAlign: "center",
    transform: [{ rotate: "-15deg" }], // Standard angled watermark
    lineHeight: hp("3%"),
  },
});
