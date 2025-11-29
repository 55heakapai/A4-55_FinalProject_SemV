// import { Stack } from "expo-router";
// import UserOnly from "../../components/UserOnly";

// export default function Layout() {
//   return (
//     <UserOnly>
//       <Stack />
//     </UserOnly>
//   );
// }
import { Tabs } from "expo-router";
import UserOnly from "../../components/UserOnly";

export default function Layout() {
  return (
    <UserOnly>
      <Tabs>
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        <Tabs.Screen name="rank_list" options={{ title: "Rank List" }} />
      </Tabs>
    </UserOnly>
  );
}
