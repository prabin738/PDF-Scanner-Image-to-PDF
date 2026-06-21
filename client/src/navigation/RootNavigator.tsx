// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { HomeScreen } from "../screens/HomeScreen";
// import { CameraScreen } from "../screens/CameraScreen";
// import { EditScreen } from "../screens/EditScreen";

// export type RootStackParamList = {
//   Home: undefined;
//   // NEW: Camera now accepts optional params for the Retake flow
//   Camera: { replaceIndex?: number; existingImages?: string[] } | undefined;
//   Edit: { images: string[] };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export const RootNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Camera" component={CameraScreen} />
//       <Stack.Screen name="Edit" component={EditScreen} />
//     </Stack.Navigator>
//   );
// };

// src/navigation/RootNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { CameraScreen } from "../screens/CameraScreen";
import { EditScreen } from "../screens/EditScreen";

export type RootStackParamList = {
  Home: undefined;
  Camera:
    | {
        replaceIndex?: number;
        existingImages?: string[];
        appendMode?: boolean; // NEW: Tells camera to add to existing batch
      }
    | undefined;
  Edit: {
    images: string[];
    initialIndex?: number; // NEW: Tells Edit Screen which page to focus
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
};
