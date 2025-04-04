import React from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../appwrite/User";
import { useNavigate,Link } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();
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

  const onSubmit = async(data) => {
    const res = await createUser(data.email, data.password, data.name)
    if(res) navigate("/")
      
    
  };

  return (
    <div className="flex flex-col md:flex-row mt-10 gap-5 md:gap-10 px-4 md:px-8 max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 flex-1 md:pr-5 w-full"
      >
        <div className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 mb-8">
          <h1 className="text-center">
            Hello, Welcome to <span className="font-mono"> Blogger</span>
          </h1>
          <img src="blogger.png" alt="Blogger logo" className="h-8 md:h-10" />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Full Name*
          </label>
          <input
            id="name"
            placeholder="John Doe"
            {...register("name", {
              required: "Full Name is required",
              maxLength: { value: 50, message: "Max length is 50 characters" },
            })}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.name?.message && "*" + errors.name?.message}
          </p>
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
            placeholder="*****"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min length is 6 characters" },
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
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">
            Confirm Password*
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="*****"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              minLength: { value: 6, message: "Min length is 6 characters" },
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.confirmPassword?.message &&
              "*" + errors.confirmPassword.message}
          </p>
        </div>

        <button
          type="submit"
          className="py-3 px-6 bg-primaryText rounded-lg w-full md:w-auto font-medium transition-all hover:opacity-90 mt-4"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="#" className="font-medium underline">
            Login
          </a>
        </p>
      </form>

      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src="signin.svg"
          alt="Sign in illustration"
          className="max-h-[550px] object-contain w-full"
        />
      </div>
    </div>
  );
}
