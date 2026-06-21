// import React, { useState, useRef } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { RootStackParamList } from "../navigation/RootNavigator";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { COLORS, TYPOGRAPHY } from "../theme";

// type CameraScreenRouteProp = {
//   params?: {
//     replaceIndex?: number;
//     existingImages?: string[];
//   };
// };

// export const CameraScreen = () => {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [mode, setMode] = useState<"single" | "batch">("single");
//   const [batchImages, setBatchImages] = useState<string[]>([]);
//   const cameraRef = useRef<CameraView>(null);

//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const route = useRoute<CameraScreenRouteProp>();

//   // Extract Retake parameters if they exist
//   const isRetakeMode = route.params?.replaceIndex !== undefined;
//   const replaceIndex = route.params?.replaceIndex;
//   const existingImages = route.params?.existingImages;

//   if (!permission) return <View />;
//   if (!permission.granted) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ marginBottom: 20 }}>
//           We need your permission to show the camera
//         </Text>
//         <TouchableOpacity
//           onPress={requestPermission}
//           style={styles.permissionBtn}
//         >
//           <Text style={{ color: "white" }}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       if (photo?.uri) {
//         // SCENARIO 1: Retaking a specific page
//         if (isRetakeMode && existingImages && replaceIndex !== undefined) {
//           const updatedImages = [...existingImages];
//           updatedImages[replaceIndex] = photo.uri;
//           navigation.navigate("Edit", { images: updatedImages });
//         }
//         // SCENARIO 2: Single Mode
//         else if (mode === "single") {
//           navigation.navigate("Edit", { images: [photo.uri] });
//         }
//         // SCENARIO 3: Batch Mode
//         else {
//           setBatchImages([...batchImages, photo.uri]);
//         }
//       }
//     }
//   };

//   const finishBatch = () => {
//     if (batchImages.length > 0) {
//       navigation.navigate("Edit", { images: batchImages });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* 1. Camera gets flex: 1 to fill the entire screen */}
//       <CameraView style={styles.camera} ref={cameraRef} />

//       {/* 2. UI is placed absolutely OVER the camera */}
//       <SafeAreaView style={styles.absoluteOverlay} pointerEvents="box-none">
//         {/* Top Controls */}
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Feather name="x" size={30} color="white" />
//           </TouchableOpacity>
//           {isRetakeMode && (
//             <View style={styles.retakeBadge}>
//               <Text style={styles.retakeText}>
//                 Retaking Page {replaceIndex! + 1}
//               </Text>
//             </View>
//           )}
//           <Feather name="zap-off" size={24} color="white" />
//           <View style={styles.hdBadge}>
//             <Text style={styles.hdText}>HD</Text>
//           </View>
//         </View>

//         {/* Empty spacer to push bottomBar to the bottom without the blue box */}
//         <View style={{ flex: 1 }} pointerEvents="none" />

//         {/* Bottom Controls */}
//         <View style={styles.bottomBar}>
//           {!isRetakeMode && (
//             <View style={styles.modeSelector}>
//               <TouchableOpacity onPress={() => setMode("single")}>
//                 <Text
//                   style={[
//                     styles.modeText,
//                     mode === "single" && styles.modeTextActive,
//                   ]}
//                 >
//                   Single
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setMode("batch")}>
//                 <Text
//                   style={[
//                     styles.modeText,
//                     mode === "batch" && styles.modeTextActive,
//                   ]}
//                 >
//                   Batch
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           <View style={styles.shutterRow}>
//             <TouchableOpacity style={styles.iconBtn}>
//               <Feather name="image" size={24} color="white" />
//               <Text style={styles.iconText}>Import</Text>
//             </TouchableOpacity>

//             <View style={styles.shutterOuter}>
//               <TouchableOpacity
//                 style={styles.shutterInner}
//                 onPress={takePicture}
//               />
//             </View>

//             {!isRetakeMode && mode === "batch" ? (
//               <TouchableOpacity
//                 style={styles.batchDoneBtn}
//                 onPress={finishBatch}
//               >
//                 <Text style={styles.batchCount}>{batchImages.length}</Text>
//                 <Feather name="check" size={20} color={COLORS.primary} />
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity style={styles.iconBtn}>
//                 <Feather name="file-plus" size={24} color="white" />
//                 <Text style={styles.iconText}>Files</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "black" },
//   camera: { flex: 1 },
//   // absoluteOverlay ensures the UI floats on top of the camera layer
//   absoluteOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "space-between",
//     zIndex: 10,
//   },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   permissionBtn: {
//     backgroundColor: COLORS.primary,
//     padding: 15,
//     borderRadius: 8,
//   },
//   topBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: wp("5%"),
//     paddingTop: hp("2%"),
//   },
//   hdBadge: {
//     borderWidth: 1,
//     borderColor: "white",
//     paddingHorizontal: 6,
//     borderRadius: 4,
//     justifyContent: "center",
//   },
//   hdText: { color: "white", fontSize: 12, fontWeight: "bold" },
//   retakeBadge: {
//     backgroundColor: COLORS.error,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   retakeText: { color: "white", fontSize: 12, fontWeight: "bold" },
//   bottomBar: {
//     backgroundColor: "rgba(0,0,0,0.8)", // slightly darker background to see controls clearly
//     paddingBottom: hp("4%"),
//     paddingTop: hp("2%"),
//   },
//   modeSelector: {
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: wp("8%"),
//     marginBottom: hp("3%"),
//   },
//   modeText: {
//     color: "gray",
//     fontSize: wp("4%"),
//     fontFamily: TYPOGRAPHY.fontFamily.medium,
//   },
//   modeTextActive: {
//     color: "white",
//     backgroundColor: "#333",
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   shutterRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingHorizontal: wp("5%"),
//   },
//   iconBtn: { alignItems: "center", width: 50 },
//   iconText: { color: "white", fontSize: 12, marginTop: 5 },
//   shutterOuter: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     borderWidth: 4,
//     borderColor: COLORS.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   shutterInner: {
//     width: 54,
//     height: 54,
//     borderRadius: 27,
//     backgroundColor: "white",
//   },
//   batchDoneBtn: {
//     width: 50,
//     height: 50,
//     backgroundColor: "white",
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   batchCount: {
//     position: "absolute",
//     top: -10,
//     right: -5,
//     backgroundColor: COLORS.error,
//     color: "white",
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     fontSize: 12,
//     fontWeight: "bold",
//     overflow: "hidden",
//   },
// });

import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"; // Add RouteProp here
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/RootNavigator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TYPOGRAPHY } from "../theme";

// 1. Tell TypeScript this route belongs specifically to the Camera screen
type CameraScreenRouteProp = RouteProp<RootStackParamList, "Camera">;

export const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

  // 2. Use the proper RouteProp type
  const route = useRoute<CameraScreenRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Because route.params can be undefined in RootStackParamList, we add safe checks (?)
  const isRetakeMode = route.params?.replaceIndex !== undefined;
  const replaceIndex = route.params?.replaceIndex;
  const existingImages = route.params?.existingImages || [];
  const isAppendMode = route.params?.appendMode;

  const [mode, setMode] = useState<"single" | "batch">(
    isAppendMode ? "batch" : "single",
  );
  const [batchImages, setBatchImages] = useState<string[]>(
    isAppendMode ? existingImages : [],
  );
  const cameraRef = useRef<CameraView>(null);

  // ... the rest of your CameraScreen code stays exactly the same ...

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 20 }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionBtn}
        >
          <Text style={{ color: "white" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        // SCENARIO 1: Retaking a specific page
        if (isRetakeMode && replaceIndex !== undefined) {
          const updatedImages = [...existingImages];
          updatedImages[replaceIndex] = photo.uri;
          // Navigate back AND tell EditScreen to focus on this exact page
          navigation.navigate("Edit", {
            images: updatedImages,
            initialIndex: replaceIndex,
          });
        }
        // SCENARIO 2: Single Mode
        else if (mode === "single") {
          navigation.navigate("Edit", { images: [photo.uri], initialIndex: 0 });
        }
        // SCENARIO 3: Batch Mode
        else {
          setBatchImages([...batchImages, photo.uri]);
        }
      }
    }
  };

  const finishBatch = () => {
    if (batchImages.length > 0) {
      // Navigate to EditScreen and focus on the very last image taken
      navigation.navigate("Edit", {
        images: batchImages,
        initialIndex: batchImages.length - 1,
      });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} />

      <SafeAreaView style={styles.absoluteOverlay} pointerEvents="box-none">
        {/* Top Controls */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="x" size={30} color="white" />
          </TouchableOpacity>
          {isRetakeMode && (
            <View style={styles.retakeBadge}>
              <Text style={styles.retakeText}>
                Retaking Page {replaceIndex! + 1}
              </Text>
            </View>
          )}
          <Feather name="zap-off" size={24} color="white" />
          <View style={styles.hdBadge}>
            <Text style={styles.hdText}>HD</Text>
          </View>
        </View>

        <View style={{ flex: 1 }} pointerEvents="none" />

        {/* Bottom Controls */}
        <View style={styles.bottomBar}>
          {!isRetakeMode && (
            <View style={styles.modeSelector}>
              <TouchableOpacity onPress={() => setMode("single")}>
                <Text
                  style={[
                    styles.modeText,
                    mode === "single" && styles.modeTextActive,
                  ]}
                >
                  Single
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMode("batch")}>
                <Text
                  style={[
                    styles.modeText,
                    mode === "batch" && styles.modeTextActive,
                  ]}
                >
                  Batch
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.shutterRow}>
            <TouchableOpacity style={styles.iconBtn}>
              <Feather name="image" size={24} color="white" />
              <Text style={styles.iconText}>Import</Text>
            </TouchableOpacity>

            <View style={styles.shutterOuter}>
              <TouchableOpacity
                style={styles.shutterInner}
                onPress={takePicture}
              />
            </View>

            {!isRetakeMode && mode === "batch" ? (
              <TouchableOpacity
                style={styles.batchDoneBtn}
                onPress={finishBatch}
              >
                <Text style={styles.batchCount}>{batchImages.length}</Text>
                <Feather name="check" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.iconBtn}>
                <Feather name="file-plus" size={24} color="white" />
                <Text style={styles.iconText}>Files</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  camera: { flex: 1 },
  absoluteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    zIndex: 10,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  permissionBtn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp("5%"),
    paddingTop: hp("2%"),
  },
  hdBadge: {
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 6,
    borderRadius: 4,
    justifyContent: "center",
  },
  hdText: { color: "white", fontSize: 12, fontWeight: "bold" },
  retakeBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  retakeText: { color: "white", fontSize: 12, fontWeight: "bold" },
  bottomBar: {
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingBottom: hp("4%"),
    paddingTop: hp("2%"),
  },
  modeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("8%"),
    marginBottom: hp("3%"),
  },
  modeText: {
    color: "gray",
    fontSize: wp("4%"),
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  modeTextActive: {
    color: "white",
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  shutterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },
  iconBtn: { alignItems: "center", width: 50 },
  iconText: { color: "white", fontSize: 12, marginTop: 5 },
  shutterOuter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "white",
  },
  batchDoneBtn: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  batchCount: {
    position: "absolute",
    top: -10,
    right: -5,
    backgroundColor: COLORS.error,
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
  },
});
