import React, { useEffect } from "react";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import NewsLetter from "./NewsLetter";
import { GettingAllBlog } from "../appwrite/Blogs";
import { AllBlogsData } from "../redux/blogSlice";

export default function Home() {
  const blogData = useSelector((state) => state.blogSlice.allBlogs);
  console.log(blogData);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.authSlice?.userData);
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await GettingAllBlog();
      dispatch(AllBlogsData(res.documents[0]));
    };
    getAllBlogs();
    return () => {
      getAllBlogs();
    };
  }, []);
  return (
    <div className="mt-10">
      <Heading data={"THE BLOG"} />
      {/*
       */}
      { blogData && Object.keys(blogData).map(([key,value]) => (<p>{key} {value}</p>))}
      <p className="text-white text-2xl">{data?.name}</p>
      <NewsLetter />
    </div>
  );
}
