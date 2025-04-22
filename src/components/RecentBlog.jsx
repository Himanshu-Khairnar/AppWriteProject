import React, { useEffect, useState } from "react";
import { getRecentBlog } from "../appwrite/Blogs";
import { ArrowUpRight } from "lucide-react";

export default function RecentBlog({ type }) {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecentBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await getRecentBlog(type);
        setRecentBlogs(res.documents);
      } catch (error) {
        console.error("Failed to fetch recent blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecentBlogs();
  }, [type]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const extractTags = (index) => recentBlogs[index]?.tags?.split(",") || [];

  // Skeletons
  const SkeletonCard = ({ type = "large" }) => {
    const base = "bg-neutral-800 rounded animate-pulse";
    return type === "large" ? (
      <div className="border border-gray-700 rounded-lg w-full overflow-hidden">
        <div className={`${base} h-64 w-full`} />
        <div className="p-5 space-y-2">
          <div className={`${base} h-4 w-1/4`} />
          <div className={`${base} h-6 w-2/3`} />
          <div className={`${base} h-4 w-full`} />
          <div className="flex gap-2 mt-3">
            <div className={`${base} h-6 w-16 rounded-full`} />
            <div className={`${base} h-6 w-16 rounded-full`} />
          </div>
        </div>
      </div>
    ) : type === "medium" ? (
      <div className="border border-gray-700 rounded-lg flex overflow-hidden w-full">
        <div className={`${base} w-1/2 h-auto`} />
        <div className="p-4 w-1/2 space-y-2">
          <div className={`${base} h-4 w-1/3`} />
          <div className={`${base} h-6 w-3/4`} />
          <div className={`${base} h-4 w-full`} />
          <div className="flex gap-2 mt-2">
            <div className={`${base} h-6 w-12 rounded-full`} />
            <div className={`${base} h-6 w-12 rounded-full`} />
          </div>
        </div>
      </div>
    ) : (
      <div className="border border-gray-700 rounded-lg w-full flex flex-col lg:flex-row overflow-hidden">
        <div className={`${base} h-48 w-full lg:w-1/2`} />
        <div className="p-5 space-y-2 lg:w-1/2">
          <div className={`${base} h-4 w-1/4`} />
          <div className={`${base} h-6 w-2/3`} />
          <div className={`${base} h-4 w-full`} />
          <div className="flex gap-2 mt-3">
            <div className={`${base} h-6 w-16 rounded-full`} />
            <div className={`${base} h-6 w-16 rounded-full`} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-white py-10">
      <h2 className="text-3xl font-bold mb-8">Recent Blog Posts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Blog Card */}
        <div className="hover:shadow-md overflow-hidden hover:scale-[1.01] border-gray-700 border rounded-lg transition-all duration-300 group">
          {isLoading || !recentBlogs[0] ? (
            <SkeletonCard type="large" />
          ) : (
            <>  
              <img
                src={recentBlogs[0]?.featured_image}
                alt={recentBlogs[0]?.title}
                className="w-full h-64 object-cover group-hover:brightness-90 transition"
              />
              <div className="p-5">
                <p className="text-purple-400 font-semibold mb-2">
                  {formatDate(recentBlogs[0]?.$createdAt)}
                </p>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold transition">
                    {recentBlogs[0]?.title}
                  </h3>
                  <ArrowUpRight
                    className="text-white group-hover:text-purple-400 transition"
                    size={20}
                  />
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: recentBlogs[0]?.content,
                  }}
                  className="text-sm text-gray-400 mt-2 line-clamp-2"
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  {extractTags(0).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-white text-gray-800 rounded-full border border-gray-700 hover:bg-purple-500 hover:text-white transition"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Two Medium Cards */}
        <div className="flex flex-col gap-8">
          {[1, 2].map((index) => (
            <div
              key={index}
              className="border-gray-700 border rounded-lg flex hover:shadow-md overflow-hidden hover:scale-[1.01] transition-all duration-300 group"
            >
              {isLoading || !recentBlogs[index] ? (
                <SkeletonCard type="medium" />
              ) : (
                <>
                  <img
                    src={recentBlogs[index]?.featured_image}
                    alt={recentBlogs[index]?.title}
                    className="w-1/2 h-full rounded object-cover group-hover:brightness-90 transition"
                  />
                  <div className="p-4">
                    <p className="text-purple-400 font-semibold mb-1">
                      {formatDate(recentBlogs[index]?.$createdAt)}
                    </p>
                    <h3 className="text-lg font-bold transition">
                      {recentBlogs[index]?.title}
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: recentBlogs[index]?.content,
                      }}
                      className="text-[15px] text-gray-400 line-clamp-2 h-[48px]"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {extractTags(index).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-white text-gray-800 rounded-full border border-gray-700 hover:bg-purple-500 hover:text-white transition"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Last Wide Card */}
        <div className="border-gray-700 border rounded-lg lg:col-span-2 hover:shadow-lg overflow-hidden hover:scale-[1.01] transition-all duration-300 group flex flex-col lg:flex-row">
          {isLoading || !recentBlogs[3] ? (
            <SkeletonCard type="wide" />
          ) : (
            <>
              <img
                src={recentBlogs[3]?.featured_image}
                alt={recentBlogs[3]?.title}
                className="w-full lg:w-1/2 h-48 object-cover group-hover:brightness-90 transition"
              />
              <div className="p-5 lg:w-1/2">
                <p className="text-purple-400 font-semibold mb-2">
                  {formatDate(recentBlogs[3]?.$createdAt)}
                </p>
                <h3 className="text-xl font-bold transition">
                  {recentBlogs[3]?.title}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: recentBlogs[3]?.content,
                  }}
                  className="text-[15px] text-gray-400 line-clamp-2 h-[48px]"
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  {extractTags(3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-white text-gray-800 rounded-full border border-gray-700 hover:bg-purple-500 hover:text-white transition"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
