import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    authChecked: false,
    theme: "light",   // <-- added theme field
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.authChecked = true;
    },
    clearUser(state) {
      state.user = null;
      state.authChecked = true;
    },

    // THEME ACTIONS --------------------------------------
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme(state, action) {
      state.theme = action.payload;  // "light" or "dark"
    },
  },
});

export const { setUser, clearUser, toggleTheme, setTheme } = userSlice.actions;
export default userSlice.reducer;
