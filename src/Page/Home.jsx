import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import NewsLetter from "./NewsLetter";
import { GettingAllBlog } from "../appwrite/Blogs";
import { AllBlogsData } from "../redux/blogSlice";
import BlogCard from "../components/BlogCard";
import RecentBlog from "../components/RecentBlog";

export default function Home() {
  const blogData = useSelector((state) => state.blogSlice.allBlogs);

  const dispatch = useDispatch();
  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await GettingAllBlog("blog");
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
        <div className="mt-10">
        <RecentBlog type="blog"/>
      </div>
      <div className="mt-10 flex gap-10">
        {blogData?.map((post) => (
          <BlogCard key={post.$id} data={post} />
        ))}
      </div>
      <NewsLetter />
    </div>
  );
}
