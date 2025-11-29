// import React, { useContext } from "react";
// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import { Link } from "expo-router";
// import { ThemeContext } from "../providers/ThemeProvider";
// import ThemeToggleButton from "../components/ThemeToggleButton";

// export default function Index() {
//   const theme = useContext(ThemeContext);

//   return (
//     <KeyboardAvoidingView
//       style={[styles.container, { backgroundColor: theme.background }]}
//     >
//       {/* Toggle Button */}
//       <View style={styles.toggleWrapper}>
//         <ThemeToggleButton />
//       </View>

//       {/* Menu Container */}
//       <View style={styles.menuBox}>
//         <Link href="/login" asChild>
//           <TouchableOpacity style={styles.item}>
//             <Text style={[styles.text, { color: theme.text }]}>Login</Text>
//           </TouchableOpacity>
//         </Link>

//         <Link href="/register" asChild>
//           <TouchableOpacity style={styles.item}>
//             <Text style={[styles.text, { color: theme.text }]}>Register</Text>
//           </TouchableOpacity>
//         </Link>

//         <Link href="/profile" asChild>
//           <TouchableOpacity style={styles.item}>
//             <Text style={[styles.text, { color: theme.text }]}>Profile</Text>
//           </TouchableOpacity>
//         </Link>

//         <Link href="/admin_profile" asChild>
//           <TouchableOpacity style={styles.item}>
//             <Text style={[styles.text, { color: theme.text }]}>
//               Admin Profile
//             </Text>
//           </TouchableOpacity>
//         </Link>

//         <Link href="/counter" asChild>
//           <TouchableOpacity style={styles.item}>
//             <Text style={[styles.text, { color: theme.text }]}>Counter</Text>
//           </TouchableOpacity>
//         </Link>

//         <Link href="/rank_list" asChild>
//           <TouchableOpacity style={styles.item}>
//             <Text style={[styles.text, { color: theme.text }]}>Rank List</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 25,
//     justifyContent: "center",
//   },

//   toggleWrapper: {
//     position: "absolute",
//     top: 50,
//     right: 20,
//   },

//   menuBox: {
//     gap: 15,
//   },

//   item: {
//     paddingVertical: 14,
//     borderRadius: 8,
//   },

//   text: {
//     fontSize: 20,
//     fontWeight: "600",
//   },
// });
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/splash" />;
}
