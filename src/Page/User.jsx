import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../appwrite/User";
import { logOut } from "../redux/authSlice";
import { useForm } from "react-hook-form";
export default function User() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authSlice?.userData);
  const [dialog, setdialog] = useState(false);
  const getLogOut = async () => {
    await logout();
    dispatch(logOut());
  };

   const {
     register,
     handleSubmit,
     getValues,
     formState: { errors },
   } = useForm({
     defaultValues: {
       name: "",
       email: "",
       password: "",
       confirmPassword: "",
     },
   });
   const onSubmit=(data)=>{
    console.log(data);
    
   };
  return (
    <div className="mt-10 px-4 relative">
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

          <div className="flex gap-2">
            <button
              onClick={getLogOut}
              className="py-3 px-6 bg-red-500 text-white rounded-lg w-auto md:w-[350px]  mt-4 hover:opacity-90 transition-all"
            >
              Logout
            </button>
            <button
              onClick={() => setdialog(true)}
              className="py-3 px-6 bg-primaryText text-white rounded-lg w-auto md:w-[350px]  mt-4 hover:opacity-90 transition-all "
            >
              Edit
            </button>
          </div>
        </div>

        {dialog && (
          <div className="absolute bg-black px-10 py-5 flex flex-col items-center justify-center w-2/3 opacity-95 rounded-lg left-50 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 flex-1 md:pr-5 w-full"
            >
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1 font-medium">
                  Full Name*
                </label>
                <input
                  id="name"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Full Name is required",
                    maxLength: {
                      value: 50,
                      message: "Max length is 50 characters",
                    },
                  })}
                  className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
                />
                <p className="text-red-500 text-xs mt-1 h-4">
                  {errors.name?.message && "*" + errors.name?.message}
                </p>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">
                  bio
                </label>
                <input
                  id="email"
                  placeholder="doe@xyz.com"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    maxLength: { value: 100, message: "Email is too long" },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
                />
                <p className="text-red-500 text-xs mt-1 h-4">
                  {errors.email?.message && "*" + errors.email?.message}
                </p>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium">
                  Github
                </label>
                <input
                  id="password"
                  placeholder="*****"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Min length is 8 characters",
                    },
                    validate: {
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter",
                      hasNumber: (value) =>
                        /[0-9]/.test(value) ||
                        "Password must contain at least one number",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain at least one lowercase letter",
                    },
                  })}
                  className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
                />
                <p className="text-red-500 text-xs mt-1 h-4">
                  {errors.password?.message && "*" + errors.password?.message}
                </p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 font-medium"
                >
                  Confirm Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="*****"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 8,
                      message: "Min length is 8 characters",
                    },
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
                />
                <p className="text-red-500 text-xs mt-1 h-4">
                  {errors.confirmPassword?.message &&
                    "*" + errors.confirmPassword.message}
                </p>
              </div>

            <div className="flex gap-2 w-full">
                <button
                  type="submit"
                  className="py-3 px-6 bg-primaryText rounded-lg w-full  font-medium transition-all hover:opacity-90 mt-4"
                >
                  Update
                </button>
                <button
                  onClick={() => setdialog(false)}
                  className="py-3 px-6 bg-red-500  rounded-lg w-full  font-medium transition-all hover:opacity-90 mt-4"
                >
                  {" "}
                  cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Blogs & Projects</h2>
      </div>
    </div>
  );
}
