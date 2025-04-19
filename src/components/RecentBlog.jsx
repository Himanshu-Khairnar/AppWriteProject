import React, { useEffect, useState } from "react";
import { getRecentBlog, GettingAllBlog } from "../appwrite/Blogs";
import BlogCard from "./BlogCard";

export default function RecentBlog({ type }) {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const getRecentBlogs = async () => {
      try {
        const res = await getRecentBlog(type); // make sure `type` is passed as prop
        setRecentBlogs(res);
        console.log(res);
        
      } catch (error) {
        console.error("Failed to fetch recent blogs:", error);
      }
    };

    getRecentBlogs();
  }, [type]);

  return (
    <div className="bg-slate-900 text-white p-8">
      <h2 className="text-2xl font-bold mb-8">Recent blog posts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* First row - Large post on left, small post on right */}
        <div className="relative">
          <img
            src={recentBlogs[0].featured_image}
            alt={recentBlogs[0].title}
            className="w-full h-64 object-cover mb-4"
          />
          <div className="mb-2">
            <span className="text-purple-400 text-sm">
              {recentBlogs[0].date}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold">{recentBlogs[0].title}</h3>
            <ArrowUpRight className="text-white" size={20} />
          </div>
          <p className="text-gray-400 mt-2 mb-4">
            {recentBlogs[0].description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {recentBlogs[0].tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 rounded-full bg-white text-gray-800 font-medium border border-gray-700 hover:bg-purple-500 hover:text-white transition"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>

        <div>
          {/* First small post */}
          <div className="flex gap-4 mb-8">
            <img
              src={recentBlogs[1].featured_image}
              alt={recentBlogs[1].title}
              className="w-40 h-32 object-cover"
            />
            <div>
              <div className="mb-1">
                <span className="text-purple-400 text-sm">
                  {recentBlogs[1].date}
                </span>
              </div>
              <h3 className="text-lg font-bold">{recentBlogs[1].title}</h3>
              <p className="text-gray-400 text-sm mt-1 mb-2">
                {recentBlogs[1].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {recentBlogs[0].tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 rounded-full bg-white text-gray-800 font-medium border border-gray-700 hover:bg-purple-500 hover:text-white transition"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Second small post */}
          <div className="flex gap-4">
            <img
              src={recentBlogs[2].featured_image}
              alt={recentBlogs[2].title}
              className="w-40 h-32 object-cover"
            />
            <div>
              <div className="mb-1">
                <span className="text-purple-400 text-sm">
                  {recentBlogs[2].date}
                </span>
              </div>
              <h3 className="text-lg font-bold">{recentBlogs[2].title}</h3>
              <p className="text-gray-400 text-sm mt-1 mb-2">
                {recentBlogs[2].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {recentBlogs[0].tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 rounded-full bg-white text-gray-800 font-medium border border-gray-700 hover:bg-purple-500 hover:text-white transition"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second row - Full width post */}
        <div className="lg:col-span-2 flex gap-4">
          <img
            src={recentBlogs[3].featured_image}
            alt={recentBlogs[3].title}
            className="w-1/2 h-48 object-cover"
          />
          <div className="w-1/2">
            <div className="mb-1">
              <span className="text-purple-400 text-sm">
                {recentBlogs[3].date}
              </span>
            </div>
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold">{recentBlogs[3].title}</h3>
              {recentBlogs[3].hasArrow && (
                <ArrowUpRight className="text-white" size={20} />
              )}
            </div>
            <p className="text-gray-400 mt-2 mb-4 line-clamp-4">
              {recentBlogs[3].description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {recentBlogs[0].tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 rounded-full bg-white text-gray-800 font-medium border border-gray-700 hover:bg-purple-500 hover:text-white transition"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
