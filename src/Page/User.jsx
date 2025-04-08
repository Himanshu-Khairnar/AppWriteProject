import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagePreview, logout } from "../appwrite/User";
import { logOut } from "../redux/authSlice";
import { Link } from "react-router-dom"; // ✅ fixed

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
    const getPreview = (fileId) => {
      try {
        const imageUrl = getImagePreview(fileId);
        setImage(imageUrl.href);
        console.log("Image URL:", imageUrl);
      } catch (error) {
        console.error("Failed to fetch image preview:", error);
      }
    };

    if (detail?.Avatar) {
      getPreview(detail.Avatar);
    }
  }, [detail?.Avatar]); // Add the dependency
  return (
    <div className="mt-10 px-4 relative">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        {/* Avatar Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          {Image && (
            <img
              src={Image}
              alt="User avatar"
              className="rounded-full w-32 h-32 object-cover"
            />
          )}{" "}
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-xl font-bold">{data?.name}</h1>
          <h2 className="text-gray-600">{data?.email}</h2>
          <p className="text-sm text-gray-500">More about the author:</p>
          <p>bio: {detail?.bio}</p>
          <div className="flex gap-2">
            <button
              onClick={getLogOut}
              className="py-3 px-6 bg-red-500 text-white rounded-lg w-auto md:w-[350px] mt-4 hover:opacity-90 transition-all"
            >
              Logout
            </button>
            <Link
              to="/updateUserDetail"
              className="py-3 px-6 bg-primaryText text-white rounded-lg w-auto md:w-[350px] mt-4 hover:opacity-90 transition-all"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Blogs & Projects</h2>
      </div>
    </div>
  );
}
