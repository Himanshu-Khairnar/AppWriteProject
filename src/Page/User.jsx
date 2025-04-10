import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagePreview, logout } from "../appwrite/User";
import { logOut } from "../redux/authSlice";
import { Link } from "react-router-dom";
import {
  MoveUpRight,
  Github,
  User as UserIcon,
  Edit,
  BookOpen,
} from "lucide-react";

export default function User() {
  const [Image, setImage] = useState("");

  const data = useSelector((state) => state.authSlice?.userData);
  const detail = useSelector((state) => state.authSlice?.userDetail);

  useEffect(() => {
    const getPreview = async (fileId) => {
      try {
        const imageUrl = await getImagePreview(fileId);
        setImage(imageUrl);
      } catch (error) {
        console.error("Failed to fetch image preview:", error);
      }
    };

    if (detail?.Avatar) {
      getPreview(detail.Avatar);
    }
  }, [detail?.Avatar]);

  return (
    <div className="mt-10  ">
      <div className="bg-opacity-20 shadow-lg flex justify-center">
        <div className="flex flex-col items-center bg-blue-900 p-10 bg-opacity-20  backdrop-blur-sm border border-opacity-20 border-blue-300 rounded-xl  shadow-lg text-center md:flex-row md:items-start md:text-left gap-10">
          <div className="w-full md:w-auto  flex  items-center md:justify-start">
            {Image ? (
              <div className="relative group">
                <img
                  src={Image}
                  alt="User avatar"
                  className="rounded-full w-36 h-36 object-cover border-4 border-gray-300 shadow-lg transition-transform duration-300"
                />
              </div>
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
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{data?.name}</h1>
              <h2 className="text-lg text-gray-300">@{detail?.username}</h2>
            </div>

            {detail?.bio && (
              <div className="mt-2">
                <p className="text-gray-400 leading-relaxed border-l-4 border-gray-700 pl-3 py-1 italic">
                  {detail.bio}
                </p>
              </div>
            )}

            {detail?.Github && (
              <Link
                to={`https://github.com/${detail?.Github}`}
                target="_blank"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2 w-fit mt-1 group transition-all duration-200"
              >
                <Github size={18} />
                <span className="group-hover:underline">{detail?.Github}</span>
                <MoveUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            )}

            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <Link
                to="/updateUserDetail"
                className="py-3 px-6 bg-primaryText text-center text-white rounded-lg hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90"
              >
                <Edit size={16} />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-3 flex items-center gap-2">
          <BookOpen size={24} className="text-primaryText" />
          Blogs & Projects
        </h2>

        {/* Empty state for projects */}
        <div className="bg-opacity-10  backdrop-blur-sm  rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-gray-800 rounded-full mb-4">
            <BookOpen size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300">
            No blogs or projects yet
          </h3>
          <p className="text-gray-400 mt-2 max-w-md">
            Share your work with the community. Create a new blog post or add a
            project to your profile.
          </p>
          <Link
            to="/createBlog"
            className="mt-6 py-3 px-6 bg-primaryText text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:opacity-90"
          >
            Create New Content
          </Link>
        </div>
      </div>
    </div>
  );
}
