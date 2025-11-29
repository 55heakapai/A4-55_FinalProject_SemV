// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const rank_list = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [rankList, setRankList] = useState<Array<any>>([]);
//   const getRankList = async () => {
//     setLoading(true);
//     try {
//       const response: any = await axios.get("http://localhost:9099/students");
//       setRankList(response.data);
//     } catch (error) {
//       console.log("Error fetching rank list:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getRankList();
//   }, []);
//   return (
//     <View style={styles.myview}>
//       <Text>Rank List</Text>
//       {loading ? (
//         <ActivityIndicator size={"small"}></ActivityIndicator>
//       ) : (
//         <>
//           <FlatList
//             data={rankList}
//             renderItem={({ item }) => (
//               <View>
//                 <Text>{item.name}</Text>
//                 <Text>{item.points}</Text>
//                 <Text>{item.email}</Text>
//               </View>
//             )}
//           ></FlatList>
//         </>
//       )}
//     </View>
//   );
// };

// export default rank_list;

// const styles = StyleSheet.create({
//   myview: {
//     flex: 1,
//     justifyContent: "center",
//     verticalAlign: "middle",
//     alignSelf: "center",
//     alignContent: "center",
//   },
//   myText: {
//     fontWeight: "600",
//     fontSize: 40,
//   },
// });
import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import api from "../../lib/api";


export default function RankList() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    api.get("/teacher/students/ranking")
      .then(r => setStudents(r.data))
      .catch(console.log);
  }, []);
  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={students}
        keyExtractor={s => s.id}
        renderItem={({ item, index }) => (
          <View style={{ padding: 8, borderBottomWidth: 1 }}>
            <Text>{index + 1}. {item.name} — {item.points ?? 0} pts</Text>
          </View>
        )}
      />
    </View>
  );
}
