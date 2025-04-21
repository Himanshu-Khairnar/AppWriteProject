import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GettingBlog } from "../appwrite/Blogs";
import BlogForm from "../components/BlogForm";

export default function UpdateBlog() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [blogData, setBlogData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await GettingBlog(id);
      setBlogData(res);
    };
    getData();
  }, []);

  return (
    <div>
      <BlogForm data={blogData} type="update" />
    </div>
  );
}
