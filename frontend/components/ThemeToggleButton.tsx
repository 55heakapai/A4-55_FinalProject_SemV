import { Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../store/userSlice";

export default function ThemeToggle() {
  const theme = useSelector((s) => s.user.theme);
  const dispatch = useDispatch();

  return (
    <Switch
      value={theme === "dark"}
      onValueChange={() => {
        dispatch(setTheme(theme === "dark" ? "light" : "dark"));
      }}
    />
  );
}
