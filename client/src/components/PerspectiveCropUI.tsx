// import React, { useState, useRef } from "react";
// import {
//   View,
//   StyleSheet,
//   PanResponder,
//   Image,
//   Dimensions,
// } from "react-native";
// import Svg, { Polygon, Line } from "react-native-svg";
// import { COLORS } from "../theme";

// const { width } = Dimensions.get("window");
// const IMAGE_HEIGHT = (width * 4) / 3; // Standard 3:4 aspect ratio
// const CORNER_SIZE = 40;

// interface Point {
//   x: number;
//   y: number;
// }

// export const PerspectiveCropUI = ({ imageUri }: { imageUri: string }) => {
//   // Initialize the 4 corners slightly inside the image edges
//   const [corners, setCorners] = useState({
//     tl: { x: 40, y: 40 },
//     tr: { x: width - 40, y: 40 },
//     br: { x: width - 40, y: IMAGE_HEIGHT - 40 },
//     bl: { x: 40, y: IMAGE_HEIGHT - 40 },
//   });

//   // Helper to create a PanResponder for a specific corner
//   const createPanResponder = (cornerKey: keyof typeof corners) => {
//     return useRef(
//       PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onPanResponderMove: (evt, gestureState) => {
//           setCorners((prev) => {
//             // Calculate new position based on drag
//             let newX = prev[cornerKey].x + gestureState.dx;
//             let newY = prev[cornerKey].y + gestureState.dy;

//             // Keep corners inside the image bounds
//             newX = Math.max(0, Math.min(newX, width));
//             newY = Math.max(0, Math.min(newY, IMAGE_HEIGHT));

//             return { ...prev, [cornerKey]: { x: newX, y: newY } };
//           });
//         },
//         onPanResponderRelease: () => {
//           // When the user lets go, you would eventually trigger the magnifying glass to hide
//         },
//       }),
//     ).current;
//   };

//   const panResponderTL = createPanResponder("tl");
//   const panResponderTR = createPanResponder("tr");
//   const panResponderBR = createPanResponder("br");
//   const panResponderBL = createPanResponder("bl");

//   // Format the points for the SVG Polygon
//   const pointsString = `${corners.tl.x},${corners.tl.y} ${corners.tr.x},${corners.tr.y} ${corners.br.x},${corners.br.y} ${corners.bl.x},${corners.bl.y}`;

//   return (
//     <View style={styles.container}>
//       <Image
//         source={{ uri: imageUri }}
//         style={styles.image}
//         resizeMode="stretch"
//       />

//       {/* The Translucent Green Overlay */}
//       <View style={StyleSheet.absoluteFill} pointerEvents="none">
//         <Svg height="100%" width="100%">
//           <Polygon
//             points={pointsString}
//             fill="rgba(0, 168, 132, 0.2)" // Your brand primary color, transparent
//             stroke={COLORS.primary}
//             strokeWidth="3"
//           />
//         </Svg>
//       </View>

//       {/* The 4 Draggable Corners */}
//       <Corner point={corners.tl} panHandlers={panResponderTL.panHandlers} />
//       <Corner point={corners.tr} panHandlers={panResponderTR.panHandlers} />
//       <Corner point={corners.br} panHandlers={panResponderBR.panHandlers} />
//       <Corner point={corners.bl} panHandlers={panResponderBL.panHandlers} />
//     </View>
//   );
// };

// // Sub-component for the corner circles
// const Corner = ({ point, panHandlers }: { point: Point; panHandlers: any }) => (
//   <View
//     style={[
//       styles.corner,
//       { left: point.x - CORNER_SIZE / 2, top: point.y - CORNER_SIZE / 2 },
//     ]}
//     {...panHandlers}
//   >
//     <View style={styles.cornerInner} />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     width: width,
//     height: IMAGE_HEIGHT,
//     backgroundColor: "#000",
//     overflow: "hidden",
//   },
//   image: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   corner: {
//     position: "absolute",
//     width: CORNER_SIZE,
//     height: CORNER_SIZE,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//   },
//   cornerInner: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: COLORS.white,
//     borderWidth: 3,
//     borderColor: COLORS.primary,
//   },
// });

import React, { useState, useRef } from "react";
import { View, StyleSheet, PanResponder, Image } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../theme";

// 1. Calculate the EXACT dimensions to match the wrapper in EditScreen.tsx
// EditScreen uses width: wp('80%') and aspect ratio 3/4.
const CROP_WIDTH = wp("80%");
const CROP_HEIGHT = CROP_WIDTH * (4 / 3);

const HIT_SLOP_SIZE = 50; // The invisible draggable area (make it big for fat fingers)
const VISUAL_NODE_SIZE = 16; // The visible white circle (make it sleek like CamScanner)

interface Point {
  x: number;
  y: number;
}

export const PerspectiveCropUI = ({ imageUri }: { imageUri: string }) => {
  // Start the corners slightly inside the image
  const inset = 30;
  const [corners, setCorners] = useState({
    tl: { x: inset, y: inset },
    tr: { x: CROP_WIDTH - inset, y: inset },
    br: { x: CROP_WIDTH - inset, y: CROP_HEIGHT - inset },
    bl: { x: inset, y: CROP_HEIGHT - inset },
  });

  // We use a mutable ref so the PanResponder always has the latest coordinates
  // without triggering stale state bugs.
  const cornersRef = useRef(corners);
  cornersRef.current = corners;

  // 2. The Fixed, Buttery Smooth Drag Logic
  const createPanResponder = (cornerKey: keyof typeof corners) => {
    let startX = 0;
    let startY = 0;

    return useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          // Record exactly where the corner was when the user first touched it
          startX = cornersRef.current[cornerKey].x;
          startY = cornersRef.current[cornerKey].y;
        },
        onPanResponderMove: (evt, gestureState) => {
          // Calculate new position relative to the starting point
          let newX = startX + gestureState.dx;
          let newY = startY + gestureState.dy;

          // Keep the corners strictly inside the image boundaries!
          newX = Math.max(0, Math.min(newX, CROP_WIDTH));
          newY = Math.max(0, Math.min(newY, CROP_HEIGHT));

          setCorners((prev) => ({
            ...prev,
            [cornerKey]: { x: newX, y: newY },
          }));
        },
      }),
    ).current;
  };

  const panResponderTL = createPanResponder("tl");
  const panResponderTR = createPanResponder("tr");
  const panResponderBR = createPanResponder("br");
  const panResponderBL = createPanResponder("bl");

  const pointsString = `${corners.tl.x},${corners.tl.y} ${corners.tr.x},${corners.tr.y} ${corners.br.x},${corners.br.y} ${corners.bl.x},${corners.bl.y}`;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="stretch"
      />

      {/* The Translucent Polygon Overlay */}
      <View style={styles.absoluteLayer} pointerEvents="none">
        <Svg height="100%" width="100%">
          <Polygon
            points={pointsString}
            fill="rgba(0, 168, 132, 0.15)" // Very light primary color fill
            stroke={COLORS.primary} // Sharp border line
            strokeWidth="2"
          />
        </Svg>
      </View>

      {/* The 4 Draggable Nodes */}
      <Corner point={corners.tl} panHandlers={panResponderTL.panHandlers} />
      <Corner point={corners.tr} panHandlers={panResponderTR.panHandlers} />
      <Corner point={corners.br} panHandlers={panResponderBR.panHandlers} />
      <Corner point={corners.bl} panHandlers={panResponderBL.panHandlers} />
    </View>
  );
};

// Sub-component for the corner nodes
const Corner = ({ point, panHandlers }: { point: Point; panHandlers: any }) => (
  <View
    style={[
      styles.hitSlop,
      {
        left: point.x - HIT_SLOP_SIZE / 2,
        top: point.y - HIT_SLOP_SIZE / 2,
      },
    ]}
    {...panHandlers}
  >
    <View style={styles.visualNode} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: CROP_WIDTH,
    height: CROP_HEIGHT,
    backgroundColor: "#000",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absoluteLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hitSlop: {
    position: "absolute",
    width: HIT_SLOP_SIZE,
    height: HIT_SLOP_SIZE,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Keep this transparent, it's just for catching fat fingers!
  },
  visualNode: {
    width: VISUAL_NODE_SIZE,
    height: VISUAL_NODE_SIZE,
    borderRadius: VISUAL_NODE_SIZE / 2,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 4, // Add a tiny shadow so it pops over dark images
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
