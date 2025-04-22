import React, { useEffect, useState } from "react";
import { searchBlogs } from "../appwrite/Blogs";
import { useLocation } from "react-router";
import BlogCard from "../components/BlogCard";

export default function SearchPage() {
  const location = useLocation();
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 20;

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  useEffect(() => {
    const getQueryBlog = async () => {
      setLoading(true);
      const res = await searchBlogs(query);
      setBlogData(res || []);
      setCurrentPage(1);
      setLoading(false);
    };

    getQueryBlog();
  }, [query]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData?.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  return (
    <div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(blogsPerPage)
              .fill("")
              .map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse border border-gray-500 p-4 rounded-lg h-[250px]"
                >
                  <div className="h-40 bg-neutral-700 rounded mb-4" />
                  <div className="h-4 bg-neutral-600 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-neutral-600 rounded w-1/2" />
                </div>
              ))
          : currentBlogs.map((post) => <BlogCard key={post.$id} data={post} />)}
      </div>

      {!loading && blogData?.length > blogsPerPage && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-white font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
