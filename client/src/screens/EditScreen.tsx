// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { Feather } from "@expo/vector-icons";
// import { COLORS } from "../theme";

// export const EditScreen = () => {
//   const route = useRoute<any>();
//   const navigation = useNavigation();
//   const { images } = route.params;

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Feather name="arrow-left" size={28} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Crop Document ({images.length})</Text>
//         <TouchableOpacity>
//           <Text style={styles.saveText}>Save</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Main Image Display */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: images[0] }}
//           style={styles.image}
//           resizeMode="contain"
//         />

//         {/* Placeholder for the 8-point crop box UI */}
//         <View style={styles.cropOverlay}>
//           <Text
//             style={{
//               color: COLORS.primary,
//               textAlign: "center",
//               marginTop: "50%",
//             }}
//           >
//             Crop UI goes here
//           </Text>
//         </View>
//       </View>

//       {/* Bottom Tool Bar matching screenshot */}
//       <View style={styles.bottomToolbar}>
//         <ToolButton icon="rotate-ccw" label="Left" />
//         <ToolButton icon="crop" label="Crop" active />
//         <ToolButton icon="file-text" label="Extract Text" />
//         <View style={styles.confirmBtn}>
//           <Feather name="check" size={24} color="white" />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const ToolButton = ({ icon, label, active }: any) => (
//   <View style={styles.toolBtn}>
//     <Feather name={icon} size={24} color={active ? COLORS.primary : "white"} />
//     <Text style={[styles.toolLabel, active && { color: COLORS.primary }]}>
//       {label}
//     </Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#1A1C1E" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 20,
//   },
//   headerText: { color: "white", fontSize: 18, fontWeight: "bold" },
//   saveText: { color: COLORS.primary, fontSize: 16, fontWeight: "bold" },
//   imageContainer: { flex: 1, padding: 20 },
//   image: { flex: 1, borderRadius: 10 },
//   cropOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//     margin: 40,
//   },
//   bottomToolbar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     padding: 20,
//     paddingBottom: 40,
//   },
//   toolBtn: { alignItems: "center" },
//   toolLabel: { color: "white", fontSize: 12, marginTop: 5 },
//   confirmBtn: {
//     backgroundColor: COLORS.primary,
//     padding: 15,
//     borderRadius: 30,
//   },
// });

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TYPOGRAPHY } from "../theme";

const { width } = Dimensions.get("window");

export const EditScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();

  // State to manage the images and the current visible index
  const [images, setImages] = useState<string[]>(route.params?.images || []);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle swiping through the batch
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  // Handle Delete / Retake options
  const handleDeletePress = () => {
    Alert.alert("Manage Image", "What would you like to do with this page?", [
      {
        text: "Retake",
        onPress: () => {
          // FIX: Pass the current images and the index we want to replace!
          navigation.navigate("Camera", {
            replaceIndex: activeIndex,
            existingImages: images,
          });
        },
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeCurrentImage(),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const removeCurrentImage = () => {
    const updatedImages = images.filter((_, index) => index !== activeIndex);
    if (updatedImages.length === 0) {
      // If all images are deleted, go back to the camera
      navigation.goBack();
    } else {
      setImages(updatedImages);
      // Adjust active index if we deleted the last item
      if (activeIndex >= updatedImages.length) {
        setActiveIndex(updatedImages.length - 1);
      }
    }
  };

  const renderImage = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />

      {/* Floating Delete/Manage Button */}
      <TouchableOpacity style={styles.deleteFab} onPress={handleDeletePress}>
        <Feather name="trash-2" size={wp("5%")} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={wp("7%")} color="white" />
        </TouchableOpacity>

        {/* Shows "1 of 3" for batches, or "Preview" for single */}
        <Text style={styles.headerText}>
          {images.length > 1
            ? `${activeIndex + 1} / ${images.length}`
            : "Preview"}
        </Text>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* IMAGE CAROUSEL */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        bounces={false}
      />

      {/* SCROLLABLE BOTTOM TOOLBAR */}
      <View style={styles.bottomToolbarContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.toolbarScrollContent}
          data={[
            { id: "add", icon: "plus-square", label: "Add" },
            { id: "crop", icon: "crop", label: "Crop" },
            { id: "rotate", icon: "rotate-cw", label: "Rotate" },
            { id: "extract", icon: "file-text", label: "Extract Text" },
            { id: "sign", icon: "pen-tool", label: "Sign" },
            { id: "protect", icon: "lock", label: "Protect" },
            { id: "share", icon: "share-2", label: "Share" },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => {
                /* Handle Tool Action */
              }}
            >
              <Feather name={item.icon as any} size={wp("6%")} color="white" />
              <Text style={styles.toolLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
  },
  headerText: {
    color: "white",
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: wp("4.5%"),
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp("4%"),
    paddingVertical: wp("2%"),
    borderRadius: wp("5%"),
  },
  saveText: {
    color: "white",
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: wp("3.5%"),
  },
  imageContainer: {
    width: width, // Full screen width per item for paging
    justifyContent: "center",
    alignItems: "center",
    padding: wp("5%"),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: wp("3%"),
  },
  deleteFab: {
    position: "absolute",
    bottom: hp("3%"),
    right: wp("8%"),
    backgroundColor: COLORS.error,
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomToolbarContainer: {
    height: hp("12%"),
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#333",
    justifyContent: "center",
  },
  toolbarScrollContent: {
    paddingHorizontal: wp("5%"),
    alignItems: "center",
    gap: wp("8%"), // Native gap for spacing out items
  },
  toolBtn: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: wp("15%"),
  },
  toolLabel: {
    color: "white",
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: wp("3%"),
    marginTop: hp("1%"),
  },
});
