import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice.js";
import blog from "./blogSlice.js";
export const store = configureStore({
  reducer: {
    authSlice: auth,
    blogSlice: blog,
  },
});
