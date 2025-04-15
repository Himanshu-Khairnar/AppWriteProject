import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GettingBlog } from "../appwrite/Blogs";
import { Binoculars, ThumbsUp } from "lucide-react";

export default function BlogPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await GettingBlog(id);
      setBlogData(res);
      console.log(res);
    };
    getData();
  }, []);

  const tags = blogData?.tags?.split(",") || [];

  return (
    <div className=" min-h-screen text-white px-6 md:px-16 py-10">
      <div className="flex gap-2 text-purple-400 mb-4 font-semibold">
        <p>
          {new Date(blogData?.$createdAt).toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p>
          {new Date(blogData?.$createdAt).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-6">{blogData?.title}</h1>

      <img
        src={blogData?.featured_image}
        alt="featured"
        className="w-full rounded-lg shadow-lg mb-6"
      />

      <div className="flex gap-6 text-sm text-gray-400 mb-6 ">
        <p className="flex text-lg items-center gap-1   ">
          <ThumbsUp /> {blogData?.likes}
        </p>
        <p className="flex text-lg items-center gap-1">
          <Binoculars /> {blogData?.views}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm px-3 py-1 rounded-full bg-white text-gray-800 font-medium border border-gray-700 hover:bg-purple-500 hover:text-white transition"
          >
            #{tag.trim()}
          </span>
        ))}
      </div>

      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blogData?.content }}
      />
    </div>
  );
}
