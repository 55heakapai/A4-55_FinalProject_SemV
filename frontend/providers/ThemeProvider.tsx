import React, { createContext, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../theme/colors";

export const ThemeContext = createContext(lightTheme);

export default function ThemeProvider({ children }: PropsWithChildren<any>) {
  // Access redux theme from user slice
  const theme = useSelector((state: any) => state.user.theme);

  const themeColors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={themeColors}>
      {children}
    </ThemeContext.Provider>
  );
}
