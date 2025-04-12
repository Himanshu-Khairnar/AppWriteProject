import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login as LoginUser } from "../appwrite/User";
import { useDispatch } from "react-redux";
import { login as LoginRedux } from "../redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const user = await LoginUser(data.email, data.password);

    if (user) {
      await dispatch(LoginRedux(user));
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="w-full md:w-1/2 max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold flex items-center justify-center gap-2">
            Welcome Back to <span className="font-mono">Blogger</span>
            <img src="blogger.png" alt="Blogger logo" className="h-8 inline-block" />
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address*
              </label>
              <input
                id="email"
                placeholder="your.email@example.com"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  maxLength: { value: 100, message: "Email is too long" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="bg-secondaryBg p-3 border focus:outline-none focus:ring-2 focus:ring-gray-400 w-full rounded-lg shadow-sm"
              />
              <p className="text-red-500 text-xs mt-1 h-4">
                {errors.email?.message && "*" + errors.email?.message}
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password*
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="bg-secondaryBg p-3 border focus:outline-none focus:ring-2 focus:ring-gray-400 w-full rounded-lg shadow-sm"
              />
              <p className="text-red-500 text-xs mt-1 h-4">
                {errors.password?.message && "*" + errors.password?.message}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-lg text-white bg-primaryText hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryText transition-all duration-200"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium underline text-primaryText">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2 p-12">
        <img
          src="Login.svg"
          alt="Sign in illustration"
          className="max-h-[550px] object-contain w-full"
        />
      </div>
    </div>
  );
}