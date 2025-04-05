import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userData: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.userData = null;
    },
  },
});

export const { login,logOut } = auth.actions;

export default auth.reducer;
