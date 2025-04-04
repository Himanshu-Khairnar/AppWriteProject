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
      console.log(action.payload)
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.userData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login,logOut } = auth.actions;

export default auth.reducer;
