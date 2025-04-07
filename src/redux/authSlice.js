import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userData: null,
  userDetail:null
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
    userDetails:(state,actions) =>{
      state.userDetail = actions.payload
    }
  },
});

export const { login,logOut ,userDetails} = auth.actions;

export default auth.reducer;
