import React, { ReactNode, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";
import { Alert, Text } from "react-native";

const AdminUserOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!authChecked) return;

    if (!user) {
      router.replace("/(auth)/login");
      return;
    }

    if (user.type !== "admin") {
      Alert.alert("Access denied");
      router.replace("/(dashboard)/home");
    }
  }, [authChecked, user]);

  if (!authChecked) return <Text>Loading...</Text>;

  return children;
};

export default AdminUserOnly;
