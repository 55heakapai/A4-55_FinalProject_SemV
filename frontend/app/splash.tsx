// import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
// import React, { useEffect } from "react";
// import { useUser } from "../hooks/useUser";
// import { useRouter } from "expo-router";

// export default function Splash() {
//   const { user, authChecked } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (!authChecked) return;

//     if (user) {
//     if (user.type === "admin") {
//   router.replace("/(admin_dashboard)/admin_home");
// } else if (user.type === "teacher") {
//   router.replace("/(teacher_dashboard)/home");
// } else {
//   router.replace("/(dashboard)/home");
// }

//     } else {
//       router.replace("/(auth)/login");
//     }
//   }, [authChecked, user]);

//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" />
//       <Text style={styles.text}>Loading...</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   text: {
//     marginTop: 10,
//     fontSize: 16,
//   },
// });
// splash.tsx (React Native / web)
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";

export default function Splash() {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!authChecked) return;

    if (user) {
      const t = (user.type || "").toString().toLowerCase();

      if (t === "admin") {
        router.replace("/(admin_dashboard)/admin_home");
      } else if (t === "teacher") {
        router.replace("/(teacher_dashboard)/home");
      } else if (t === "student") {
        router.replace("/(dashboard)/home");
      } else {
        // fallback
        router.replace("/(dashboard)/home");
      }
    } else {
      router.replace("/(auth)/login");
    }
  }, [authChecked, user]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  text: { marginTop: 10, fontSize: 16 },
});
