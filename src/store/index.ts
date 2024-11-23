import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import formReducer from "./formSlice";
import stepReducer from "./stepSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    step: stepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
