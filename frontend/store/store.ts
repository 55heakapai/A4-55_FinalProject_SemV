import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";
export const smsStore = configureStore({
    reducer: {
        counter: counterReducer,
            user: userReducer,
    }
})


