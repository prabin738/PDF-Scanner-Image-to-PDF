// import * as FileSystem from "expo-file-system/legacy";
// import { PerspectiveCropUI } from "../components/PerspectiveCropUI";
// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Feather } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { RootStackParamList } from "../navigation/RootNavigator";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { COLORS, TYPOGRAPHY } from "../theme";
// import * as ImageManipulator from "expo-image-manipulator";

// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";

// const { width } = Dimensions.get("window");
// type EditScreenRouteProp = RouteProp<RootStackParamList, "Edit">;

// export const EditScreen = () => {
//   const route = useRoute<EditScreenRouteProp>();
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const flatListRef = useRef<FlatList>(null);

//   const [images, setImages] = useState<string[]>(route.params.images || []);
//   const initialIndex = route.params.initialIndex || 0;
//   const [activeIndex, setActiveIndex] = useState(initialIndex);
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     if (route.params?.images) {
//       setImages(route.params.images);
//       const newInitial = route.params.initialIndex || 0;
//       setActiveIndex(newInitial);
//       setTimeout(() => {
//         try {
//           flatListRef.current?.scrollToIndex({
//             index: newInitial,
//             animated: false,
//           });
//         } catch (e) {}
//       }, 100);
//     }
//   }, [route.params]);

//   const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
//     if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index);
//   }).current;

//   const carouselData = [...images, "ADD_PAGE"];

//   const handleRotate = async () => {
//     if (activeIndex === images.length) return;
//     setIsProcessing(true);
//     try {
//       const currentUri = images[activeIndex];
//       const result = await ImageManipulator.manipulateAsync(
//         currentUri,
//         [{ rotate: 90 }],
//         { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
//       );
//       const updatedImages = [...images];
//       updatedImages[activeIndex] = result.uri;
//       setImages(updatedImages);
//     } catch (error) {
//       Alert.alert("Error", "Could not rotate the image.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // --- THE BULLETPROOF IN-MEMORY PDF GENERATOR ---
//   // const generatePDF = async () => {
//   //   const validImages = images.filter((uri) => uri !== "ADD_PAGE");

//   //   if (validImages.length === 0) {
//   //     Alert.alert("No Images", "Please take a picture first.");
//   //     return;
//   //   }

//   //   setIsProcessing(true);
//   //   console.log("========== PDF GENERATION START ==========");

//   //   try {
//   //     // STEP 1: Resize and Compress
//   //     console.log(
//   //       `1. Resizing & Compressing ${validImages.length} image(s)...`,
//   //     );
//   //     const compressedUris = await Promise.all(
//   //       validImages.map(async (uri) => {
//   //         const manipResult = await ImageManipulator.manipulateAsync(
//   //           uri,
//   //           [{ resize: { width: 1600 } }], // Resize to prevent memory crash
//   //           { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG },
//   //         );
//   //         return manipResult.uri;
//   //       }),
//   //     );

//   //     // STEP 2: Base64 Conversion for HTML
//   //     console.log("2. Converting compressed images to Base64...");
//   //     const base64Images = await Promise.all(
//   //       compressedUris.map(async (uri) => {
//   //         const base64 = await FileSystem.readAsStringAsync(uri, {
//   //           encoding: FileSystem.EncodingType.Base64,
//   //         });
//   //         return `data:image/jpeg;base64,${base64}`;
//   //       }),
//   //     );

//   //     // STEP 3: HTML Construction
//   //     console.log("3. Building HTML string...");
//   //     const htmlContent = `
//   //       <html>
//   //         <head>
//   //           <style>
//   //             body { margin: 0; padding: 0; background-color: white; }
//   //             .page {
//   //               display: flex;
//   //               justify-content: center;
//   //               align-items: center;
//   //               height: 100vh;
//   //               width: 100vw;
//   //               page-break-after: always;
//   //             }
//   //             img { max-width: 100%; max-height: 100%; object-fit: contain; }
//   //           </style>
//   //         </head>
//   //         <body>
//   //           ${base64Images.map((base64Data) => `<div class="page"><img src="${base64Data}" /></div>`).join("")}
//   //         </body>
//   //       </html>
//   //     `;

//   //     // STEP 4: Print directly to Base64 (Bypasses Android cache entirely!)
//   //     console.log("4. Generating PDF directly in memory...");
//   //     const { base64 } = await Print.printToFileAsync({
//   //       html: htmlContent,
//   //       base64: true, // MAGIC TRICK: We don't want a file URI, we want the raw data!
//   //     });

//   //     if (!base64) throw new Error("Failed to generate Base64 PDF data.");

//   //     // STEP 5: Write the data directly to the safe Document Directory
//   //     console.log("5. Writing raw data to safe Document Directory...");
//   //     const pdfName = `Precision_Scan_${Date.now()}.pdf`;
//   //     const finalUri = `${FileSystem.documentDirectory}${pdfName}`;

//   //     await FileSystem.writeAsStringAsync(finalUri, base64, {
//   //       encoding: FileSystem.EncodingType.Base64,
//   //     });

//   //     console.log(`   -> File written successfully to: ${finalUri}`);

//   //     // STEP 6: Sharing
//   //     console.log("6. Opening Share Menu...");
//   //     if (await Sharing.isAvailableAsync()) {
//   //       await Sharing.shareAsync(finalUri, {
//   //         mimeType: "application/pdf",
//   //         dialogTitle: "Save your PDF",
//   //         UTI: "com.adobe.pdf",
//   //       });
//   //       console.log("========== PDF GENERATION SUCCESS ==========");
//   //     } else {
//   //       Alert.alert("Error", "Sharing is not available on this device.");
//   //     }
//   //   } catch (error) {
//   //     console.log("!!! PDF GENERATION FAILED !!!");
//   //     console.error(error);
//   //     Alert.alert("Debug Error", String(error));
//   //   } finally {
//   //     setIsProcessing(false);
//   //   }
//   // };

//   // --- UPDATED PDF GENERATOR (WITH BRANDING & WATERMARK) ---
//   const generatePDF = async () => {
//     const validImages = images.filter((uri) => uri !== "ADD_PAGE");

//     if (validImages.length === 0) {
//       Alert.alert("No Images", "Please take a picture first.");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       // 1. Resize and Compress
//       const compressedUris = await Promise.all(
//         validImages.map(async (uri) => {
//           const manipResult = await ImageManipulator.manipulateAsync(
//             uri,
//             [{ resize: { width: 1600 } }], // High resolution
//             { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG },
//           );
//           return manipResult.uri;
//         }),
//       );

//       // 2. Base64 Conversion
//       const base64Images = await Promise.all(
//         compressedUris.map(async (uri) => {
//           const base64 = await FileSystem.readAsStringAsync(uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
//           return `data:image/jpeg;base64,${base64}`;
//         }),
//       );

//       // 3. HTML Construction with Watermark CSS
//       const htmlContent = `
//         <html>
//           <head>
//             <style>
//               body { margin: 0; padding: 0; background-color: white; }
//               .page {
//                 position: relative; /* Required for absolute positioning of watermark */
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 height: 100vh;
//                 width: 100vw;
//                 page-break-after: always;
//               }
//               img { max-width: 100%; max-height: 100%; object-fit: contain; }

//               /* NEW WATERMARK STYLES */
//               .watermark {
//                 position: absolute;
//                 bottom: 30px;
//                 right: 30px;
//                 color: rgba(100, 116, 139, 0.6); /* Slate gray, semi-transparent */
//                 font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
//                 font-size: 20px;
//                 font-weight: bold;
//                 letter-spacing: 1px;
//                 background-color: rgba(255, 255, 255, 0.8);
//                 padding: 8px 16px;
//                 border-radius: 20px;
//                 z-index: 1000;
//               }
//             </style>
//           </head>
//           <body>
//             ${base64Images
//               .map(
//                 (base64Data) => `
//               <div class="page">
//                 <img src="${base64Data}" />
//                 <div class="watermark">Scanned with PDF-Scanner</div>
//               </div>
//             `,
//               )
//               .join("")}
//           </body>
//         </html>
//       `;

//       // 4. Generate PDF in memory
//       const { base64 } = await Print.printToFileAsync({
//         html: htmlContent,
//         base64: true,
//       });

//       if (!base64) throw new Error("Failed to generate Base64 PDF data.");

//       // 5. NEW FILENAME BRANDING
//       const pdfName = `pdf-scanner_${Date.now()}.pdf`;
//       const finalUri = `${FileSystem.documentDirectory}${pdfName}`;

//       await FileSystem.writeAsStringAsync(finalUri, base64, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       // 6. Sharing
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(finalUri, {
//           mimeType: "application/pdf",
//           dialogTitle: "Save your PDF",
//           UTI: "com.adobe.pdf",
//         });
//       } else {
//         Alert.alert("Error", "Sharing is not available on this device.");
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Failed to generate PDF.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleToolPress = (toolId: string) => {
//     switch (toolId) {
//       case "add":
//         navigation.navigate("Camera", {
//           appendMode: true,
//           existingImages: images,
//         });
//         break;
//       case "rotate":
//         handleRotate();
//         break;
//       case "crop":
//         Alert.alert(
//           "Coming Soon",
//           "Crop UI requires an interactive bounding box.",
//         );
//         break;
//       default:
//         Alert.alert("Feature", `${toolId} is in development.`);
//     }
//   };

//   const handleDeletePress = () => {
//     Alert.alert("Manage Image", "What would you like to do with this page?", [
//       {
//         text: "Retake",
//         onPress: () =>
//           navigation.navigate("Camera", {
//             replaceIndex: activeIndex,
//             existingImages: images,
//           }),
//       },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => removeCurrentImage(),
//       },
//       { text: "Cancel", style: "cancel" },
//     ]);
//   };

//   const removeCurrentImage = () => {
//     const updatedImages = images.filter((_, index) => index !== activeIndex);
//     if (updatedImages.length === 0) navigation.goBack();
//     else setImages(updatedImages);
//   };

//   const renderImage = ({ item }: { item: string }) => {
//     if (item === "ADD_PAGE") {
//       return (
//         <View style={styles.imageContainer}>
//           <TouchableOpacity
//             style={styles.addPageCard}
//             onPress={() =>
//               navigation.navigate("Camera", {
//                 appendMode: true,
//                 existingImages: images,
//               })
//             }
//           >
//             <Feather
//               name="plus-circle"
//               size={wp("15%")}
//               color={COLORS.neutral}
//             />
//             <Text style={styles.addPageText}>Add Page</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return (
//       <View style={styles.imageContainer}>
//         <View style={styles.imageWrapper}>
//           {/* NEW INTERACTIVE CROP UI */}
//           <PerspectiveCropUI imageUri={item} />
//           {isProcessing && (
//             <View style={styles.processingOverlay}>
//               <ActivityIndicator size="large" color={COLORS.primary} />
//             </View>
//           )}
//         </View>
//         <TouchableOpacity style={styles.deleteFab} onPress={handleDeletePress}>
//           <Feather name="trash-2" size={wp("5%")} color="white" />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate("Home")}>
//           <Feather name="arrow-left" size={wp("7%")} color="white" />
//         </TouchableOpacity>

//         <Text style={styles.headerText}>
//           {activeIndex === images.length
//             ? "Add Page"
//             : `${activeIndex + 1} / ${images.length}`}
//         </Text>

//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={generatePDF}
//           disabled={isProcessing}
//         >
//           <Text style={styles.saveText}>
//             {isProcessing ? "Saving..." : "Save PDF"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         ref={flatListRef}
//         data={carouselData}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderImage}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
//         bounces={false}
//         initialScrollIndex={initialIndex}
//         getItemLayout={(data, index) => ({
//           length: width,
//           offset: width * index,
//           index,
//         })}
//       />

//       <View style={styles.bottomToolbarContainer}>
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.toolbarScrollContent}
//           data={[
//             { id: "add", icon: "plus-square", label: "Add" },
//             { id: "crop", icon: "crop", label: "Crop" },
//             { id: "rotate", icon: "rotate-cw", label: "Rotate" },
//             { id: "extract", icon: "file-text", label: "Extract Text" },
//             { id: "sign", icon: "pen-tool", label: "Sign" },
//             { id: "protect", icon: "lock", label: "Protect" },
//           ]}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.toolBtn}
//               onPress={() => handleToolPress(item.id)}
//             >
//               <Feather name={item.icon as any} size={wp("6%")} color="white" />
//               <Text style={styles.toolLabel}>{item.label}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.secondary },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: wp("5%"),
//     paddingVertical: hp("2%"),
//   },
//   headerText: {
//     color: "white",
//     fontFamily: TYPOGRAPHY.fontFamily.bold,
//     fontSize: wp("4.5%"),
//   },
//   saveButton: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: wp("4%"),
//     paddingVertical: wp("2%"),
//     borderRadius: wp("5%"),
//   },
//   saveText: {
//     color: "white",
//     fontFamily: TYPOGRAPHY.fontFamily.bold,
//     fontSize: wp("3.5%"),
//   },

//   imageContainer: {
//     width: width,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: wp("5%"),
//   },
//   imageWrapper: {
//     width: wp("80%"),
//     aspectRatio: 3 / 4,
//     borderRadius: wp("3%"),
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   image: { width: "100%", height: "100%" },

//   processingOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(255,255,255,0.7)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   addPageCard: {
//     width: wp("80%"),
//     aspectRatio: 3 / 4,
//     borderRadius: wp("3%"),
//     backgroundColor: "#2A2D32",
//     borderWidth: 2,
//     borderColor: "#3A3D42",
//     borderStyle: "dashed",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   addPageText: {
//     color: COLORS.neutral,
//     fontFamily: TYPOGRAPHY.fontFamily.medium,
//     fontSize: wp("5%"),
//     marginTop: hp("2%"),
//   },

//   deleteFab: {
//     position: "absolute",
//     bottom: hp("3%"),
//     right: wp("8%"),
//     backgroundColor: COLORS.error,
//     width: wp("12%"),
//     height: wp("12%"),
//     borderRadius: wp("6%"),
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   bottomToolbarContainer: {
//     height: hp("12%"),
//     backgroundColor: "#111",
//     borderTopWidth: 1,
//     borderTopColor: "#333",
//     justifyContent: "center",
//   },
//   toolbarScrollContent: {
//     paddingHorizontal: wp("5%"),
//     alignItems: "center",
//     gap: wp("8%"),
//   },
//   toolBtn: {
//     alignItems: "center",
//     justifyContent: "center",
//     minWidth: wp("15%"),
//   },
//   toolLabel: {
//     color: "white",
//     fontFamily: TYPOGRAPHY.fontFamily.medium,
//     fontSize: wp("3%"),
//     marginTop: hp("1%"),
//   },
// });

import * as FileSystem from "expo-file-system/legacy";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/RootNavigator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TYPOGRAPHY } from "../theme";
import * as ImageManipulator from "expo-image-manipulator";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

// Import our new UI component
import { PerspectiveCropUI } from "../components/PerspectiveCropUI";

const { width } = Dimensions.get("window");
type EditScreenRouteProp = RouteProp<RootStackParamList, "Edit">;

export const EditScreen = () => {
  const route = useRoute<EditScreenRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const flatListRef = useRef<FlatList>(null);

  const [images, setImages] = useState<string[]>(route.params.images || []);
  const initialIndex = route.params.initialIndex || 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isProcessing, setIsProcessing] = useState(false);

  // NEW: State to track if we are currently cropping
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    if (route.params?.images) {
      setImages(route.params.images);
      const newInitial = route.params.initialIndex || 0;
      setActiveIndex(newInitial);
      setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({
            index: newInitial,
            animated: false,
          });
        } catch (e) {}
      }, 100);
    }
  }, [route.params]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index);
  }).current;

  const carouselData = [...images, "ADD_PAGE"];

  const handleRotate = async () => {
    if (activeIndex === images.length) return;
    setIsProcessing(true);
    try {
      const currentUri = images[activeIndex];
      const result = await ImageManipulator.manipulateAsync(
        currentUri,
        [{ rotate: 90 }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );
      const updatedImages = [...images];
      updatedImages[activeIndex] = result.uri;
      setImages(updatedImages);
    } catch (error) {
      Alert.alert("Error", "Could not rotate the image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePDF = async () => {
    const validImages = images.filter((uri) => uri !== "ADD_PAGE");

    if (validImages.length === 0) {
      Alert.alert("No Images", "Please take a picture first.");
      return;
    }

    setIsProcessing(true);
    console.log("========== PDF GENERATION START ==========");

    try {
      console.log(
        `1. Resizing & Compressing ${validImages.length} image(s)...`,
      );
      const compressedUris = await Promise.all(
        validImages.map(async (uri) => {
          const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1600 } }],
            { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG },
          );
          return manipResult.uri;
        }),
      );

      console.log("2. Converting compressed images to Base64...");
      const base64Images = await Promise.all(
        compressedUris.map(async (uri) => {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return `data:image/jpeg;base64,${base64}`;
        }),
      );

      console.log("3. Building HTML string...");
      const htmlContent = `
        <html>
          <head>
            <style>
              body { margin: 0; padding: 0; background-color: white; }
              .page { 
                position: relative;
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh;
                width: 100vw; 
                page-break-after: always; 
              }
              img { max-width: 100%; max-height: 100%; object-fit: contain; }
              .watermark {
                position: absolute;
                bottom: 30px;
                right: 30px;
                color: rgba(100, 116, 139, 0.6);
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 1px;
                background-color: rgba(255, 255, 255, 0.8);
                padding: 8px 16px;
                border-radius: 20px;
                z-index: 1000;
              }
            </style>
          </head>
          <body>
            ${base64Images
              .map(
                (base64Data) => `
              <div class="page">
                <img src="${base64Data}" />
                <div class="watermark">Scanned with PDF-Scanner</div>
              </div>
            `,
              )
              .join("")}
          </body>
        </html>
      `;

      console.log("4. Generating PDF directly in memory...");
      const { base64 } = await Print.printToFileAsync({
        html: htmlContent,
        base64: true,
      });

      if (!base64) throw new Error("Failed to generate Base64 PDF data.");

      console.log("5. Writing raw data to safe Document Directory...");
      const pdfName = `pdf-scanner_${Date.now()}.pdf`;
      const finalUri = `${FileSystem.documentDirectory}${pdfName}`;

      await FileSystem.writeAsStringAsync(finalUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(`   -> File written successfully to: ${finalUri}`);

      console.log("6. Opening Share Menu...");
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(finalUri, {
          mimeType: "application/pdf",
          dialogTitle: "Save your PDF",
          UTI: "com.adobe.pdf",
        });
        console.log("========== PDF GENERATION SUCCESS ==========");
      } else {
        Alert.alert("Error", "Sharing is not available on this device.");
      }
    } catch (error) {
      console.log("!!! PDF GENERATION FAILED !!!");
      console.error(error);
      Alert.alert("Debug Error", String(error));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToolPress = (toolId: string) => {
    switch (toolId) {
      case "add":
        navigation.navigate("Camera", {
          appendMode: true,
          existingImages: images,
        });
        break;
      case "rotate":
        handleRotate();
        break;
      case "crop":
        // NEW: Turn on Crop Mode instead of showing the Alert
        setIsCropping(true);
        break;
      default:
        Alert.alert("Feature", `${toolId} is in development.`);
    }
  };

  const handleDeletePress = () => {
    Alert.alert("Manage Image", "What would you like to do with this page?", [
      {
        text: "Retake",
        onPress: () =>
          navigation.navigate("Camera", {
            replaceIndex: activeIndex,
            existingImages: images,
          }),
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeCurrentImage(),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const removeCurrentImage = () => {
    const updatedImages = images.filter((_, index) => index !== activeIndex);
    if (updatedImages.length === 0) navigation.goBack();
    else setImages(updatedImages);
  };

  // Notice we added 'index' here to check which image is currently active
  const renderImage = ({ item, index }: { item: string; index: number }) => {
    if (item === "ADD_PAGE") {
      return (
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.addPageCard}
            onPress={() =>
              navigation.navigate("Camera", {
                appendMode: true,
                existingImages: images,
              })
            }
          >
            <Feather
              name="plus-circle"
              size={wp("15%")}
              color={COLORS.neutral}
            />
            <Text style={styles.addPageText}>Add Page</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          {/* NEW: Conditionally render the Crop UI or the Standard Image */}
          {isCropping && index === activeIndex ? (
            <PerspectiveCropUI imageUri={item} />
          ) : (
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          {isProcessing && (
            <View style={styles.processingOverlay}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          )}
        </View>

        {/* Hide the delete button if we are currently cropping */}
        {!isCropping && (
          <TouchableOpacity
            style={styles.deleteFab}
            onPress={handleDeletePress}
          >
            <Feather name="trash-2" size={wp("5%")} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* DYNAMIC HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            isCropping ? setIsCropping(false) : navigation.navigate("Home")
          }
        >
          <Feather
            name={isCropping ? "x" : "arrow-left"}
            size={wp("7%")}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          {isCropping
            ? "Crop Page"
            : activeIndex === images.length
              ? "Add Page"
              : `${activeIndex + 1} / ${images.length}`}
        </Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={isCropping ? () => setIsCropping(false) : generatePDF}
          disabled={isProcessing}
        >
          <Text style={styles.saveText}>
            {isCropping ? "Done" : isProcessing ? "Saving..." : "Save PDF"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={carouselData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // Disable scrolling when cropping so the user doesn't accidentally swipe pages while adjusting corners
        scrollEnabled={!isCropping}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        bounces={false}
        initialScrollIndex={initialIndex}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* DYNAMIC BOTTOM TOOLBAR (Hides during crop mode) */}
      {!isCropping && (
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
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.toolBtn}
                onPress={() => handleToolPress(item.id)}
              >
                <Feather
                  name={item.icon as any}
                  size={wp("6%")}
                  color="white"
                />
                <Text style={styles.toolLabel}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
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
    width: width,
    justifyContent: "center",
    alignItems: "center",
    padding: wp("5%"),
  },
  imageWrapper: {
    width: wp("80%"),
    aspectRatio: 3 / 4,
    borderRadius: wp("3%"),
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  processingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  addPageCard: {
    width: wp("80%"),
    aspectRatio: 3 / 4,
    borderRadius: wp("3%"),
    backgroundColor: "#2A2D32",
    borderWidth: 2,
    borderColor: "#3A3D42",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addPageText: {
    color: COLORS.neutral,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: wp("5%"),
    marginTop: hp("2%"),
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
    gap: wp("8%"),
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
