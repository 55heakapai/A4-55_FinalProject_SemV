import { useContext, useEffect } from "react";
import { useRouter, Stack } from "expo-router";
import { UserContext } from "../context/UserContext";

export default function RedirectManager() {
  const router = useRouter();
  const userContext = useContext(UserContext);

  if (!userContext) return null;

  const { user, authChecked } = userContext;

  useEffect(() => {
    if (!authChecked) return; // Wait until user is checked

    if (!user) {
      router.replace("/(auth)/login");
    } else if (user.type.toLowerCase() === "admin") {
      router.replace("/(admin_dashboard)/admin_home");
    } else {
      router.replace("/(dashboard)/home");
    }
  }, [authChecked]);

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
