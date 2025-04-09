import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagePreview, logout } from "../appwrite/User";
import { logOut } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { MoveUpRight } from "lucide-react";

export default function User() {
  const [Image, setImage] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authSlice?.userData);
  const detail = useSelector((state) => state.authSlice?.userDetail);

  const getLogOut = async () => {
    await logout();
    dispatch(logOut());
  };

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
    <div className="mt-10 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
        {/* Avatar */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          {Image ? (
            <img
              src={Image}
              alt="User avatar"
              className="rounded-full w-32 h-32 object-cover border-4 border-gray-300"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col gap-2 text-left">
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <h2 className="text-base text-white">@{detail?.username}</h2>
          {detail?.bio && (
            <p className="text-sm text-gray-500 leading-relaxed">
              {detail.bio}
            </p>
          )}

          {detail?.Github && (
            <Link
              to={`https://github.com/${detail?.Github}`}
              target="_blank"
              className="text-sm text-blue-600 hover:underline flex items-center "
            >
              GitHub Profile <MoveUpRight className="h-4 " />
            </Link>
          )}

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button
              onClick={getLogOut}
              className="py-3 px-6 bg-red-500 text-white rounded-lg w-auto md:w-[350px] mt-4 hover:opacity-90 transition-all"
            >
              Logout
            </button>
            <Link
              to="/updateUserDetail"
              className="py-3 px-6 bg-primaryText text-center text-white rounded-lg w-auto md:w-[350px] mt-4 hover:opacity-90 transition-all"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Blogs & Projects
        </h2>
        {/* Project list will go here */}
      </div>
    </div>
  );
}
