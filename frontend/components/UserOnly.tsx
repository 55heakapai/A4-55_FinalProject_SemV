import React, { useEffect } from "react";
import { Text, Alert } from "react-native";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";

export default function UserOnly({ children }) {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!authChecked) return;

    // Not logged in → redirect to login
    if (!user) {
      router.replace("/(auth)/login");
      return;
    }

    // Role check
    if (user.type!== "student") {
      Alert.alert("Access denied");
      router.replace("/(dashboard)/home");
      return;
    }

  }, [authChecked, user]);

  if (!authChecked) return <Text>Loading...</Text>;

  return children;
}
