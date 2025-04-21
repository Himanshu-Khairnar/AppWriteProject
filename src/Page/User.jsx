import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MoveUpRight,
  Github,
  User as UserIcon,
  Edit,
  BookOpen,
} from "lucide-react";
import Toggle from "../components/Toggle";
import { GetUserBlog } from "../appwrite/Blogs";
import BlogCard from "../components/BlogCard";
import UserBlog from "../components/UserBlog";

export default function User() {
  const [toggle, settoggle] = useState(false);
  const data = useSelector((state) => state.authSlice?.userData);
  const detail = useSelector((state) => state.authSlice?.userDetail);
  const [blogData, setBlogData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  useEffect(() => {
    const userBlog = async () => {
      try {
        const res = await GetUserBlog();
        await setBlogData(res);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };
    userBlog();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="mt-10 relative">
      {toggle && <Toggle toggle={toggle} setToggle={settoggle} />}
      <div className="bg-opacity-20 shadow-lg flex justify-center">
        <div className="flex flex-col items-center p-10 backdrop-blur-sm rounded-xl shadow-lg text-center md:flex-row md:items-start md:text-left gap-10">
          {/* Profile Avatar */}
          <div className="w-full md:w-auto flex items-center md:justify-start">
            {detail?.Avatar ? (
              <img
                src={detail?.Avatar}
                alt="User avatar"
                className="rounded-full w-36 h-36 object-cover border-4 border-gray-300 shadow-lg"
              />
            ) : (
              <div className="relative">
                <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center shadow-lg">
                  <UserIcon size={48} className="text-gray-400" />
                </div>
                <div className="absolute bottom-0 right-0 bg-primaryText p-2 rounded-full">
                  <Edit size={16} className="text-white" />
                </div>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 flex flex-col gap-3 text-center md:text-left">
            <h1 className="text-3xl font-bold">{data?.name}</h1>
            <h2 className="text-lg text-gray-300">@{detail?.username}</h2>

            {detail?.bio && (
              <p className="text-gray-400 leading-relaxed border-l-4 border-gray-700 pl-3 py-1 italic">
                {detail.bio}
              </p>
            )}

            {detail?.Github && (
              <Link
                to={`https://github.com/${detail?.Github}`}
                target="_blank"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2 w-fit mt-1 group"
              >
                <Github size={18} />
                <span className="group-hover:underline">{detail.Github}</span>
                <MoveUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            )}

            <button
              onClick={() => settoggle(true)}
              className="py-3 px-6 bg-primaryText text-white rounded-lg hover:shadow-lg flex items-center gap-2"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-3 flex items-center gap-2">
          <BookOpen size={24} className="text-primaryText" />
          Blogs & Projects
        </h2>

        {blogData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogData?.map((blog) => (
                <UserBlog key={blog.$id} data={blog} />
              ))}
            </div>

            {blogData.length > blogsPerPage && (
              <div className="flex justify-center items-center mt-10 gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
          </>
        ) : (
          <div className="bg-opacity-10 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-gray-800 rounded-full mb-4">
              <BookOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300">
              No blogs or projects yet
            </h3>
            <p className="text-gray-400 mt-2 max-w-md">
              Share your work with the community. Create a new blog post or add
              a project to your profile.
            </p>
            <Link
              to="/createBlog"
              className="mt-6 py-3 px-6 bg-primaryText text-white rounded-lg hover:shadow-lg"
            >
              Create New Content
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
