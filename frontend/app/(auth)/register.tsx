import React, { useState, useContext } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { ThemeContext } from "../../providers/ThemeProvider";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import GuestOnly from "../../components/GuestOnly";
import { useUser } from "../../hooks/useUser";

export default function RegisterScreen() {
  const colors = useContext(ThemeContext);
  const { register } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [mobile, setMobile] = useState("");   // ✅ FIXED

  const [genderOpen, setGenderOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !dob || !gender || !type || !email || !password || !mobile) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    const success = await register({
      name,
      gender,
      type,
      dateOfBirth: dob,
      email,
      password,
      mobileNumber: mobile,   // ✅ FIXED
    });

    setLoading(false);

    if (success) {
      alert("Registration successful!");
      router.replace("/login");
    } else {
      alert("Registration failed!");
    }
  };

  return (
    <GuestOnly>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
          <ThemeToggleButton />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Register</Text>

          <TextInput
            style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
            placeholder="Full Name"
            placeholderTextColor={colors.placeholder}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
            placeholder="Date of Birth (YYYY-MM-DD)"
            placeholderTextColor={colors.placeholder}
            value={dob}
            onChangeText={setDob}
          />

          {/* Gender */}
          <TouchableOpacity
            style={[styles.input, styles.centerText, { backgroundColor: colors.input }]}
            onPress={() => setGenderOpen(!genderOpen)}
          >
            <Text style={{ color: colors.text }}>{gender || "Select Gender"}</Text>
          </TouchableOpacity>

          {genderOpen && (
            <View style={[styles.dropdown, { backgroundColor: colors.card }]}>
              {["Male", "Female", "Other"].map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => {
                    setGender(g);
                    setGenderOpen(false);
                  }}
                >
                  <Text style={[styles.dropdownItem, { color: colors.text }]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Account Type */}
          <TouchableOpacity
            style={[styles.input, styles.centerText, { backgroundColor: colors.input }]}
            onPress={() => setTypeOpen(!typeOpen)}
          >
            <Text style={{ color: colors.text }}>{type || "Select Account Type"}</Text>
          </TouchableOpacity>

          {typeOpen && (
            <View style={[styles.dropdown, { backgroundColor: colors.card }]}>
              {["Student", "Teacher", "Admin"].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => {
                    setType(t);
                    setTypeOpen(false);
                  }}
                >
                  <Text style={[styles.dropdownItem, { color: colors.text }]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* MOBILE FIELD — FIXED */}
          <TextInput
            style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
            placeholder="Mobile Number"
            placeholderTextColor={colors.placeholder}
            keyboardType="number-pad"
            value={mobile}
            onChangeText={setMobile}
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
            placeholder="Email"
            placeholderTextColor={colors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.placeholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {loading ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <Button title="Register" onPress={handleRegister} />
          )}

          <View style={styles.linkRow}>
            <Text style={{ color: colors.text }}>Already have an account?</Text>
            <Link href="/login">
              <Text style={{ color: colors.link }}> Login</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GuestOnly>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  card: { borderRadius: 16, padding: 20 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", marginBottom: 20 },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  dropdown: { borderRadius: 10, paddingVertical: 6, marginBottom: 12, borderWidth: 1 },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 12, fontSize: 16 },
  centerText: { justifyContent: "center" },
  linkRow: { marginTop: 15, flexDirection: "row", justifyContent: "center" },
});
