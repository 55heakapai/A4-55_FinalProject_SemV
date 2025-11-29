import React, { useEffect } from "react";
import { View } from "react-native";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";

export default function GuestOnly({ children }) {
  const router = useRouter();

const { user, authChecked } = useUser();

useEffect(() => {
  if (!authChecked) return;   // Wait for login check

  if (user) {
    router.replace("/(dashboard)/home");
  }
}, [authChecked, user]);

  return <View style={{ flex: 1 }}>{children}</View>;
}
