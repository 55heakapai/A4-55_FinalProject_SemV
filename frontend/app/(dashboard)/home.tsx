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
// import { useSelector } from "react-redux";
// import { selectCount } from "../../store/counterSlice";
// const home = () => {
//   const count = useSelector(selectCount);
//   return (
//     <View style={styles.myview}>
//       <Text> Home Tab Count:{count}</Text>
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
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../../lib/api";

export default function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/teacher/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err.response?.data || err.message));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Students:</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}
