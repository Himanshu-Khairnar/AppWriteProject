import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../appwrite/User";
import { logOut } from "../redux/authSlice";

export default function User() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authSlice?.userData);
  const getLogOut = async () => {
    await logout();
    await dispatch(logOut());
  };
  return (
    <div className="mt-10">
      Welcome, {data?.name}
      <button
        className="py-3 px-4 bg-primaryText rounded-lg w-full sm:w-auto"
        onClick={() => getLogOut()}
      >
        Logout
      </button>
    </div>
  );
}
