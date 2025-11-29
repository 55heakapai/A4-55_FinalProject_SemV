import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../config/config";
export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const login = async (email, password) => {
  setLoading(true);
  try {
    const response = await axios.post(
      `${BASE_URL}/users/sign-in`,
      { email, password }
    );

    const userData = response.data.user;
    const token = response.data.token;

    setUser(userData);

    await SecureStore.setItemAsync("user", JSON.stringify(userData));
    await SecureStore.setItemAsync("token", token);

    return userData;
  } catch (error) {
    console.log("Login error:", error.response?.data || error.message);
    alert("Error occurred at sign in");
    return null;
  } finally {
    setLoading(false);
  }
};


const register = async (userData) => {
  setLoading(true);
  try {
const response = await axios.post(
  `${BASE_URL}/users`,

      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        type: userData.type,
        gender: userData.gender,
        mobileNumber: userData.mobileNumber,
        dateOfBirth: userData.dateOfBirth,
      }
    );

    // Registration OK
    return true;

  } catch (error) {
    console.log(error.response?.data || error.message);
    return false;
  } finally {
    setLoading(false);
  }
};



  const checkLogin = async () => {
    try {
      let stored = await SecureStore.getItemAsync("user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Error during app load:", error);
    } finally {
      setAuthChecked(true);
    }
  };

const logout = async () => {
  try {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  } catch (e) {
    console.log("Logout error:", e);
  }
};

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
