// import React, { useCallback, useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import * as SplashScreen from "expo-splash-screen";
// import * as Font from "expo-font";
// import {
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_700Bold,
// } from "@expo-google-fonts/inter";
// import { COLORS, TYPOGRAPHY } from "./src/theme";
// import { HomeScreen } from "./src/screens/HomeScreen";

// // Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         await Font.loadAsync({
//           Inter_400Regular,
//           Inter_500Medium,
//           Inter_700Bold,
//         });
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//       <HomeScreen />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.tertiary,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontFamily: TYPOGRAPHY.fontFamily.bold,
//     fontSize: TYPOGRAPHY.size.h2,
//     color: COLORS.primary,
//   },
// });

// App.tsx
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context"; // NEW IMPORT
import { NavigationContainer } from "@react-navigation/native"; // NEW IMPORT
import { RootNavigator } from "./src/navigation/RootNavigator"; // We will create this

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Inter_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
