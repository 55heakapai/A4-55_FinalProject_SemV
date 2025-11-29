// import {
//   ActivityIndicator,
//   Button,
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import { Link, useRouter } from "expo-router";
// import axios from "axios";
// import { useUser } from "../../hooks/useUser";
// const home = () => {
//   return (
//     <View style={styles.myview}>
//       <Text> Home Tab</Text>
//     </View>
//   );
// };

// export default home;

// const styles = StyleSheet.create({
//   myview: {
//     marginHorizontal: 20,
//     flex: 1,
//     justifyContent: "center",
//   },
//   input: {
//     marginVertical: 4,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 4,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
// });
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import api from "../../lib/api";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function AdminCreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [seats, setSeats] = useState("");

  const handleCreate = async () => {
    try {
      const userJson = await SecureStore.getItemAsync("user");
      const user = userJson ? JSON.parse(userJson) : null;
      const resp = await api.post("/courses", {
        title,
        description,
        seats: seats ? parseInt(seats, 10) : null,
        createdBy: user?.id,
      });
      Alert.alert("Success", "Course created");
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Could not create course");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Seats (optional)" value={seats} onChangeText={setSeats} keyboardType="number-pad" />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <Button title="Create Course" onPress={handleCreate} />
    </View>
  );
}
