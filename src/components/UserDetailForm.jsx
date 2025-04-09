import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { getImagePreview } from "../appwrite/User";
import { RefreshCcw } from "lucide-react";

export default function UserDetailForm() {
  const userDetail = useSelector((state) => state.authSlice?.userDetail);
  const userData = useSelector((state) => state.authSlice?.userData);
  console.log(userDetail);

  const [image, setImage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (userDetail) {
      reset({
        username: userDetail?.username,
        bio: userDetail?.bio,
        github: userDetail?.Github,
        docId: userDetail?.$id,
      });
      setImage(getImagePreview(userDetail?.Avatar));
    }
  }, [userDetail]);
  const changeUsername = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const value = `${userData?.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-${randomString}`;
    setValue("username", value);
  };
  const avatarFile = watch("avatar");

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatarFile]);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 flex-1 md:pr-5 w-[90%]"
      >
        <div className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 mb-8">
          <h1 className="text-center">Heyyy, lets fill some details</h1>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium">
            @Username
          </label>
          <div className="flex">
            <input
              id="username"
              placeholder="Himanshu Khairnar"
              type="text"
              {...register("username", {
                required: "username is required",
                minLength: {
                  value: 4,
                  message: "username is below 4 characters",
                },
                maxLength: {
                  value: 100,
                  message: "username should be under 100 character",
                },
              })}
              className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
            />
            <button
              onClick={() => {
                changeUsername();
              }}
            >
              <RefreshCcw />
            </button>
          </div>
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.username?.message && "*" + errors.username?.message}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="avatar" className="block mb-1 font-medium">
            Avatar
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            {...register("avatar")}
            className="bg-secondaryBg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-800 hover:file:bg-gray-400 
    p-2 w-full rounded-lg shadow-sm transition-all duration-200 outline-gray-400"
          />

          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.avatar?.message && "*" + errors.avatar?.message}
          </p>
        </div>
        {image && (
          <img
            src={image}
            className="h-24 w-24 rounded-full border-[1px] border-gray-500 mx-auto"
          />
        )}

        <div className="mb-4">
          <label htmlFor="bio" className="block mb-1 font-medium">
            @bio
          </label>
          <textarea
            id="bio"
            placeholder="Web Dev"
            type="text"
            {...register("bio", {
              required: "bio is required",
              minLength: {
                value: 4,
                message: "bio is below 4 characters",
              },
              maxLength: {
                value: 200,
                message: "bio should be under 100 character",
              },
            })}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.bio?.message && "*" + errors.bio?.message}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="github" className="block mb-1 font-medium">
            Github Username
          </label>
          <input
            id="github"
            placeholder="Himanshu-Khairnar"
            type="text"
            {...register("github", {
              required: "github username is required",
              minLength: {
                value: 4,
                message: "github username is below 4 characters",
              },
              maxLength: {
                value: 100,
                message: "github username should be under 100 character",
              },
            })}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.github?.message && "*" + errors.github?.message}
          </p>
        </div>
        <button
          type="submit"
          className="py-3 px-6 bg-primaryText rounded-lg w-full md:w-auto font-medium transition-all hover:opacity-90 mt-4"
        >
          Let's go
        </button>
      </form>
    </div>
  );
}
