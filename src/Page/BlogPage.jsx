import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkLike, GettingBlog } from "../appwrite/Blogs";
import { Binoculars, ThumbsUp } from "lucide-react";
import { disLike, addLike, addView } from "../appwrite/Blogs";
import { useSelector } from "react-redux";

export default function BlogPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [blogData, setBlogData] = useState(null);
  const [liked, setLiked] = useState(false);
  const userData = useSelector((state) => state.authSlice.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function addingView() {
      const res = await addView(id);
      setBlogData(res);
      const isLiked = await checkLike(userData?.$id, id);
      setLiked(isLiked);
      setLoading(false);
    }
    if (userData) addingView();
    return () => {
      addingView();
    };
  }, [location.pathname]);

  useEffect(() => {
    const getData = async () => {
      const res = await GettingBlog(id);
      setBlogData(res);
      setLoading(false);
    };
    getData();
  }, []);

  const toggleLike = async () => {
    if (!userData || !blogData) return;

    const isLiked = await checkLike(userData.$id, blogData.$id);

    if (!isLiked) {
      await addLike(blogData?.$id, userData?.$id);
      setLiked(true);
    } else {
      await disLike(blogData?.$id, userData?.$id);
      setLiked(false);
    }

    const updated = await GettingBlog(blogData.$id);
    setBlogData(updated);
  };

  const tags = blogData?.tags?.split(",") || [];

  if (loading) {
    return (
      <div className="min-h-screen text-white px-6 md:px-16 py-10">
        <div className="space-y-6">
          <div className="w-full h-8 bg-gray-600 animate-pulse rounded-md"></div>
          <div className="w-full h-48 bg-gray-600 animate-pulse rounded-md"></div>
          <div className="flex gap-6 text-sm text-gray-400 mb-6">
            <div className="w-24 h-6 bg-gray-600 animate-pulse rounded-md"></div>
            <div className="w-24 h-6 bg-gray-600 animate-pulse rounded-md"></div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <div className="w-20 h-6 bg-gray-600 animate-pulse rounded-md"></div>
            <div className="w-20 h-6 bg-gray-600 animate-pulse rounded-md"></div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-6 bg-gray-600 animate-pulse rounded-md"></div>
            <div className="w-full h-6 bg-gray-600 animate-pulse rounded-md"></div>
            <div className="w-full h-6 bg-gray-600 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-6 md:px-16 py-10">
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

      <div className="flex gap-6 text-sm text-gray-400 mb-6">
        <p className="flex text-lg items-center gap-1">
          <ThumbsUp
            onClick={() => toggleLike()}
            color={liked ? "white" : "gray"}
            className={`w-6 h-6 cursor-pointer transition ${
              liked ? "text-white" : "text-gray-400 hover:text-purple-400"
            }`}
          />
          {blogData?.likes}
        </p>
        <p className="flex text-lg items-center gap-1">
          <Binoculars /> {blogData?.views + 1}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag, index) => (
          <Link
            to={`/searchBlog?q=${tag.toLowerCase().trim()}`}
            key={index}
            className="text-sm px-3 py-1 rounded-full bg-white text-gray-800 font-medium border border-gray-700 hover:bg-purple-500 hover:text-white transition"
          >
            #{tag.trim()}
          </Link>
        ))}
      </div>

      <div
        className="space-y-1"
        dangerouslySetInnerHTML={{ __html: blogData?.content }}
      />
    </div>
  );
}
