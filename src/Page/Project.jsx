import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import NewsLetter from "./NewsLetter";
import { GettingAllBlog } from "../appwrite/Blogs";
import { AllBlogsData } from "../redux/blogSlice";
import BlogCard from "../components/BlogCard";
import RecentBlog from "../components/RecentBlog";
import BlogCardSkeleton from "../components/BlogCardSkeleton";

export default function Home() {
  const blogData = useSelector((state) => state.blogSlice.allBlogs) || []; // ✅ Fix here
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await GettingAllBlog("project");
      dispatch(AllBlogsData(res.documents));
    };
    getAllBlogs();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-12">
      <Heading data={"PROJECTS"} />

      <RecentBlog type={"project"} />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.length === 0 || currentBlogs.length === 0
          ? Array.from({ length: blogsPerPage }).map((_, idx) => (
              <BlogCardSkeleton key={idx} />
            ))
          : currentBlogs.map((post) => <BlogCard key={post.$id} data={post} />)}
      </div>

      {blogData.length > blogsPerPage && (
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

      <NewsLetter />
    </div>
  );
}
