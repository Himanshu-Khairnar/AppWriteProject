import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../appwrite/User";
import { logOut } from "../redux/authSlice";

export default function User() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authSlice?.userData);

  const getLogOut = async () => {
    await logout();
    dispatch(logOut());
  };

  return (
    <div className="mt-10 px-4 ">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        {/* Avatar Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src="avatar.png"
            alt="User avatar"
            className="h-48 md:h-60 lg:h-72 object-contain rounded-full"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-xl font-bold">{data?.name}</h1>
          <h2 className="text-gray-600">{data?.email}</h2>
          <p className="text-sm text-gray-500">More about the author:</p>

          <button
            onClick={getLogOut}
            className="py-3 px-6 bg-primaryText text-white rounded-lg w-auto md:w-[550px]  mt-4 hover:opacity-90 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Blogs & Projects</h2>
      </div>
    </div>
  );
}
