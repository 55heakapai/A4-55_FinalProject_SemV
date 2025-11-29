import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:9099"
    : "http://192.168.1.9:9099";   // your system IP
