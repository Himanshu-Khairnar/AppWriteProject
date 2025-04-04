import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice.js";
export const store = configureStore({
  reducer: {
    authSlice: auth,
  },
});
