// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   StatusBar,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { COLORS, TYPOGRAPHY, SPACING } from "../theme";
// import { ActionCard } from "../components/ActionCard";
// import { DocumentRow } from "../components/DocumentRow";
// import { SafeAreaView } from "react-native-safe-area-context";

// export const HomeScreen = () => {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Feather name="search" size={wp("6%")} color={COLORS.secondary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>PDF Professional</Text>
//         <TouchableOpacity>
//           <Feather name="sliders" size={wp("6%")} color={COLORS.secondary} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* DUO SLIDER HERO SECTION */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.heroScroll}
//         >
//           <TouchableOpacity
//             style={[styles.heroCard, { backgroundColor: COLORS.primary }]}
//           >
//             <Feather
//               name="maximize"
//               size={wp("8%")}
//               color={COLORS.white}
//               style={styles.heroIcon}
//             />
//             <Text style={[styles.heroText, { color: COLORS.white }]}>
//               Barcode to PDF
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.heroCard, { backgroundColor: "#E2E8F0" }]}
//           >
//             <Feather
//               name="image"
//               size={wp("8%")}
//               color={COLORS.primary}
//               style={styles.heroIcon}
//             />
//             <Text style={[styles.heroText, { color: COLORS.secondary }]}>
//               Image to PDF
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>

//         {/* Pagination Dots */}
//         <View style={styles.pagination}>
//           <View style={[styles.dot, styles.activeDot]} />
//           <View style={styles.dot} />
//           <View style={styles.dot} />
//           <View style={styles.dot} />
//         </View>

//         {/* QUICK TOOLS */}
//         <Text style={styles.sectionTitle}>QUICK TOOLS</Text>
//         <View style={styles.gridContainer}>
//           <ActionCard
//             title="Merge PDF"
//             iconName="git-merge"
//             onPress={() => {}}
//           />
//           <ActionCard title="To Word" iconName="file-text" onPress={() => {}} />
//           <ActionCard title="OCR Text" iconName="type" onPress={() => {}} />
//           <ActionCard title="E-Sign" iconName="edit-2" onPress={() => {}} />
//           <ActionCard
//             title="Split PDF"
//             iconName="scissors"
//             onPress={() => {}}
//           />
//           <ActionCard title="PDF to JPG" iconName="image" onPress={() => {}} />
//           <ActionCard title="Watermark" iconName="droplet" onPress={() => {}} />
//           <ActionCard title="Compress" iconName="minimize" onPress={() => {}} />
//         </View>

//         {/* YOUR FAVORITES */}
//         <Text style={styles.sectionTitle}>YOUR FAVORITES</Text>
//         <View style={styles.gridContainer}>
//           <ActionCard
//             title="Edit PDF"
//             iconName="edit"
//             isFavorite
//             onPress={() => {}}
//           />
//           <ActionCard
//             title="Protect"
//             iconName="lock"
//             isFavorite
//             onPress={() => {}}
//           />
//           <ActionCard
//             title="Rotate"
//             iconName="refresh-cw"
//             isFavorite
//             onPress={() => {}}
//           />
//           <ActionCard
//             title="Extract"
//             iconName="layout"
//             isFavorite
//             onPress={() => {}}
//           />
//         </View>

//         {/* RECENT DOCUMENTS */}
//         <View style={styles.sectionHeaderRow}>
//           <Text style={styles.sectionTitle}>RECENT DOCUMENTS</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See All</Text>
//           </TouchableOpacity>
//         </View>

//         <DocumentRow
//           title="Q3_Financial_Report_Final.pdf"
//           date="Today, 10:42 AM"
//           size="2.4 MB"
//           type="pdf"
//         />
//         <DocumentRow
//           title="Scanned_ID_Passport.pdf"
//           date="Yesterday"
//           size="856 KB"
//           type="scanned"
//         />
//         <DocumentRow
//           title="Whiteboard_Notes_Meeting.pdf"
//           date="Oct 12"
//           size="1.1 MB"
//           type="converted"
//         />

//         {/* Spacer for bottom nav */}
//         <View style={{ height: hp("10%") }} />
//       </ScrollView>

//       {/* MOCK BOTTOM TAB NAVIGATION */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="home" size={wp("6%")} color={COLORS.primary} />
//           <Text style={[styles.navText, { color: COLORS.primary }]}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="file" size={wp("6%")} color={COLORS.neutral} />
//           <Text style={styles.navText}>Files</Text>
//         </TouchableOpacity>

//         {/* Floating Action Button */}
//         <TouchableOpacity style={styles.fab}>
//           <Feather name="camera" size={wp("7%")} color={COLORS.white} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="tool" size={wp("6%")} color={COLORS.neutral} />
//           <Text style={styles.navText}>Tools</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Feather name="user" size={wp("6%")} color={COLORS.neutral} />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.tertiary,
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: SPACING.md,
//     paddingVertical: SPACING.md,
//     backgroundColor: COLORS.white,
//   },
//   headerTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.bold,
//     fontSize: wp("5%"),
//     color: COLORS.primary,
//   },
//   scrollContent: {
//     padding: SPACING.md,
//   },
//   heroScroll: {
//     gap: wp("3%"),
//     paddingBottom: wp("2%"),
//   },
//   heroCard: {
//     width: wp("60%"),
//     height: hp("18%"),
//     borderRadius: wp("4%"),
//     padding: wp("5%"),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heroIcon: {
//     marginBottom: wp("3%"),
//   },
//   heroText: {
//     fontFamily: TYPOGRAPHY.fontFamily.bold,
//     fontSize: wp("4.5%"),
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: SPACING.lg,
//   },
//   dot: {
//     width: wp("2%"),
//     height: wp("2%"),
//     borderRadius: wp("1%"),
//     backgroundColor: "#CBD5E1",
//     marginHorizontal: wp("1%"),
//   },
//   activeDot: {
//     backgroundColor: COLORS.primary,
//   },
//   sectionHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: SPACING.lg,
//     marginBottom: SPACING.sm,
//   },
//   sectionTitle: {
//     fontFamily: TYPOGRAPHY.fontFamily.bold,
//     fontSize: wp("3.5%"),
//     color: COLORS.neutral,
//     marginTop: SPACING.lg,
//     marginBottom: SPACING.sm,
//   },
//   seeAllText: {
//     fontFamily: TYPOGRAPHY.fontFamily.medium,
//     fontSize: wp("3.5%"),
//     color: COLORS.primary,
//   },
//   gridContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: wp("2%"),
//   },
//   bottomNav: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     height: hp("10%"),
//     backgroundColor: COLORS.white,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderTopColor: "#E2E8F0",
//     paddingBottom: Platform.OS === "ios" ? hp("2%") : 0,
//   },
//   navItem: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: wp("15%"),
//   },
//   navText: {
//     fontFamily: TYPOGRAPHY.fontFamily.medium,
//     fontSize: wp("2.5%"),
//     color: COLORS.neutral,
//     marginTop: wp("1%"),
//   },
//   fab: {
//     width: wp("16%"),
//     height: wp("16%"),
//     backgroundColor: COLORS.primary,
//     borderRadius: wp("4%"),
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: hp("4%"), // Pushes it up out of the nav bar
//     shadowColor: COLORS.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TYPOGRAPHY, SPACING } from "../theme";
import { ActionCard } from "../components/ActionCard";
import { DocumentRow } from "../components/DocumentRow";
import { SafeAreaView } from "react-native-safe-area-context";

// NEW IMPORTS FOR NAVIGATION
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

export const HomeScreen = () => {
  // INITIALIZE NAVIGATION HOOK
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="search" size={wp("6%")} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PDF Professional</Text>
        <TouchableOpacity>
          <Feather name="sliders" size={wp("6%")} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* DUO SLIDER HERO SECTION */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.heroScroll}
        >
          <TouchableOpacity
            style={[styles.heroCard, { backgroundColor: COLORS.primary }]}
          >
            <Feather
              name="maximize"
              size={wp("8%")}
              color={COLORS.white}
              style={styles.heroIcon}
            />
            <Text style={[styles.heroText, { color: COLORS.white }]}>
              Barcode to PDF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.heroCard, { backgroundColor: "#E2E8F0" }]}
          >
            <Feather
              name="image"
              size={wp("8%")}
              color={COLORS.primary}
              style={styles.heroIcon}
            />
            <Text style={[styles.heroText, { color: COLORS.secondary }]}>
              Image to PDF
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* QUICK TOOLS */}
        <Text style={styles.sectionTitle}>QUICK TOOLS</Text>
        <View style={styles.gridContainer}>
          <ActionCard
            title="Merge PDF"
            iconName="git-merge"
            onPress={() => {}}
          />
          <ActionCard title="To Word" iconName="file-text" onPress={() => {}} />
          <ActionCard title="OCR Text" iconName="type" onPress={() => {}} />
          <ActionCard title="E-Sign" iconName="edit-2" onPress={() => {}} />
          <ActionCard
            title="Split PDF"
            iconName="scissors"
            onPress={() => {}}
          />
          <ActionCard title="PDF to JPG" iconName="image" onPress={() => {}} />
          <ActionCard title="Watermark" iconName="droplet" onPress={() => {}} />
          <ActionCard title="Compress" iconName="minimize" onPress={() => {}} />
        </View>

        {/* YOUR FAVORITES */}
        <Text style={styles.sectionTitle}>YOUR FAVORITES</Text>
        <View style={styles.gridContainer}>
          <ActionCard
            title="Edit PDF"
            iconName="edit"
            isFavorite
            onPress={() => {}}
          />
          <ActionCard
            title="Protect"
            iconName="lock"
            isFavorite
            onPress={() => {}}
          />
          <ActionCard
            title="Rotate"
            iconName="refresh-cw"
            isFavorite
            onPress={() => {}}
          />
          <ActionCard
            title="Extract"
            iconName="layout"
            isFavorite
            onPress={() => {}}
          />
        </View>

        {/* RECENT DOCUMENTS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>RECENT DOCUMENTS</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <DocumentRow
          title="Q3_Financial_Report_Final.pdf"
          date="Today, 10:42 AM"
          size="2.4 MB"
          type="pdf"
        />
        <DocumentRow
          title="Scanned_ID_Passport.pdf"
          date="Yesterday"
          size="856 KB"
          type="scanned"
        />
        <DocumentRow
          title="Whiteboard_Notes_Meeting.pdf"
          date="Oct 12"
          size="1.1 MB"
          type="converted"
        />

        {/* Spacer for bottom nav */}
        <View style={{ height: hp("10%") }} />
      </ScrollView>

      {/* MOCK BOTTOM TAB NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={wp("6%")} color={COLORS.primary} />
          <Text style={[styles.navText, { color: COLORS.primary }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="file" size={wp("6%")} color={COLORS.neutral} />
          <Text style={styles.navText}>Files</Text>
        </TouchableOpacity>

        {/* FLOATING ACTION BUTTON (UPDATED) */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("Camera")}
        >
          <Feather name="camera" size={wp("7%")} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="tool" size={wp("6%")} color={COLORS.neutral} />
          <Text style={styles.navText}>Tools</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={wp("6%")} color={COLORS.neutral} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: wp("5%"),
    color: COLORS.primary,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  heroScroll: {
    gap: wp("3%"),
    paddingBottom: wp("2%"),
  },
  heroCard: {
    width: wp("60%"),
    height: hp("18%"),
    borderRadius: wp("4%"),
    padding: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  heroIcon: {
    marginBottom: wp("3%"),
  },
  heroText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: wp("4.5%"),
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },
  dot: {
    width: wp("2%"),
    height: wp("2%"),
    borderRadius: wp("1%"),
    backgroundColor: "#CBD5E1",
    marginHorizontal: wp("1%"),
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: wp("3.5%"),
    color: COLORS.neutral,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  seeAllText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: wp("3.5%"),
    color: COLORS.primary,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: wp("2%"),
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: hp("10%"),
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingBottom: Platform.OS === "ios" ? hp("2%") : 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("15%"),
  },
  navText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: wp("2.5%"),
    color: COLORS.neutral,
    marginTop: wp("1%"),
  },
  fab: {
    width: wp("16%"),
    height: wp("16%"),
    backgroundColor: COLORS.primary,
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("4%"), // Pushes it up out of the nav bar
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
