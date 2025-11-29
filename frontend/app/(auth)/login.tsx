import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { Link, router } from "expo-router";
import { useUser } from "../../hooks/useUser";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { ThemeContext } from "../../providers/ThemeProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const [loading, setLoading] = useState(false);

  const colors = useContext(ThemeContext);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const user = await login(email.trim(), password.trim());

      if (!user) {
        Alert.alert("Invalid Credentials", "Email or password incorrect");
        return;
      }

      const type = user.type?.toLowerCase();

      if (type === "admin") {
        router.replace("/(admin_dashboard)/admin_home");
      } else if (type === "teacher") {
        router.replace("/(teacher_dashboard)/home");
      } else {
        router.replace("/(dashboard)/home");
      }

    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Login Failed", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.myview, { backgroundColor: colors.background }]}
    >
      {/* Theme Toggle */}
      <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
        <ThemeToggleButton />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>Login</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        secureTextEntry
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Password"
        placeholderTextColor={colors.placeholder}
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <Link href="/register" style={{ marginTop: 20 }}>
        <Text style={{ color: colors.link, textAlign: "center" }}>
          Register Instead?
        </Text>
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  myview: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    marginVertical: 8,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
});
