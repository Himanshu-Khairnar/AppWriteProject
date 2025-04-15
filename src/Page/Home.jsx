import React, { useEffect } from "react";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import NewsLetter from "./NewsLetter";
import { GettingAllBlog } from "../appwrite/Blogs";
import { AllBlogsData } from "../redux/blogSlice";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const blogData = useSelector((state) => state.blogSlice.allBlogs);
  console.log(blogData);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.authSlice?.userData);
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await GettingAllBlog();
      dispatch(AllBlogsData(res.documents));
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
      <div className="mt-10 flex gap-10">
        {blogData?.map((post) => (
          <BlogCard key={post.$id} data={post} />
        ))}
      </div>
      <NewsLetter />
    </div>
  );
}
