import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Button, Alert } from "react-native";
import api from "../../lib/api";

export default function TeacherHome() {
  const [students, setStudents] = useState([]);

  const load = async () => {
    const res = await api.get("/teacher/ranklist") ;    // returns students ordered by points (descending)
    setStudents(res.data);
  };

  useEffect(() => { load(); }, []);

  const addPoints = async (studentId) => {
    try {
      const resp = await api.post(`/teacher/students/${studentId}/points`, {
        points: 5,
        reason: "Class activity"
      });
      Alert.alert("OK");
      load();
    } catch (e) {
      Alert.alert("Error");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={students}
        keyExtractor={s => s.id}
        renderItem={({ item, index }) => (
          <View style={{ borderWidth: 1, marginVertical: 6, padding: 8 }}>
            <Text>{index + 1}. {item.name} — {item.email}</Text>
            <Text>Points: {item.points ?? 0}</Text>
            <Button title="Add 5 pts" onPress={() => addPoints(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
