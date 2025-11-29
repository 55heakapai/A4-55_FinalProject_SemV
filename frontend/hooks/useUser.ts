// import axios from "axios";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_ROUTES } from "../config/config";

// export function useUser() {
//   const [user, setUser] = useState<any>(null);
//   const [authChecked, setAuthChecked] = useState(false);

//   // Load user on startup
//   useEffect(() => {
//     async function load() {
//       try {
//         const saved = await AsyncStorage.getItem("user");
//         if (saved) setUser(JSON.parse(saved));
//       } catch (e) {
//         console.log("Load user error:", e);
//       }
//       setAuthChecked(true);
//     }
//     load();
//   }, []);

//   // REGISTER
//   async function register(userData: any) {
//     try {
//       await axios.post(API_ROUTES.REGISTER, userData);
//       return true;
//     } catch (e) {
//       console.log("Register error:", e);
//       return false;
//     }
//   }

//   // LOGIN
//   async function login(email: string, password: string) {
//     try {
//       const res = await axios.post(API_ROUTES.LOGIN, { email, password });

//       const userData = res.data.user;
//       const token = res.data.token;

//       await AsyncStorage.setItem("user", JSON.stringify(userData));
//       await AsyncStorage.setItem("token", token);

//       setUser(userData);
//       return userData;
//     } catch (e) {
//       console.log("Login error:", e);
//       return null;
//     }
//   }

//   // LOGOUT
//   async function logout() {
//     await AsyncStorage.removeItem("user");
//     await AsyncStorage.removeItem("token");
//     setUser(null);
//   }

//   return { user, authChecked, register, login, logout };
// }
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function useUser() {
  return useContext(UserContext);
}
