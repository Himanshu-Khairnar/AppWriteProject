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
    <div className="flex flex-col md:flex-row mt-10 gap-5 md:gap-10 px-4 md:px-8 max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 flex-1 md:pr-5 w-full"
      >
        <div className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 mb-8">
          <h1 className="text-center">
            Welcome Back to <span className="font-mono"> Blogger</span>
          </h1>
          <img src="blogger.png" alt="Blogger logo" className="h-8 md:h-10" />
        </div>

    
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email*
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
            Password*
          </label>
          <input
            id="password"
            placeholder="password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.password?.message && "*" + errors.password?.message}
          </p>
        </div>

        <button
          type="submit"
          className="py-3 px-6 bg-primaryText rounded-lg w-full md:w-auto font-medium transition-all hover:opacity-90 mt-4"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium underline">
            Sign Up
          </Link>
        </p>
      </form>

      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src="Login.svg"
          alt="Sign in illustration"
          className="max-h-[550px] object-contain w-full"
        />
      </div>
    </div>
  );
}
