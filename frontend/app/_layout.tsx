import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { smsStore } from "../store/store";
import { UserProvider } from "../context/UserContext";
import ThemeProvider from "../providers/ThemeProvider";

export default function Layout() {
  return (
    <Provider store={smsStore}>
      <UserProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{ headerShown: false }}
            initialRouteName="splash"
          />
        </ThemeProvider>
      </UserProvider>
    </Provider>
  );
}
