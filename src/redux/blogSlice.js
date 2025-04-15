import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allBlogs: null,
  userBlogs: null,
  recentBlogs: null,
};
export const blogs = createSlice({
  name: "blog",
  initialState,
  reducers: {
    AllBlogsData: (state, action) => {
      state.allBlogs = action.payload;
    },
    AllBlogsOfUser: (state, action) => {
      state.allBlogs = action.payload;
    },
    AllRecentBlogs: (state, action) => {
      state.recentBlogs = action.payload;
    },
  },
});

export const { AllBlogsData, AllBlogsOfUser, AllRecentBlogs } = blogs.actions;

export default blogs.reducer;
