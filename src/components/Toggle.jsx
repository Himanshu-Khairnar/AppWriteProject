import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {  updateUserDetails } from "../appwrite/User";
import { RefreshCcw } from "lucide-react";

export default function Toggle({ toggle, setToggle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();
  const [image, setImage] = useState("");

  const data = useSelector((state) => state.authSlice?.userDetail);

  const userData = useSelector((state) => state.authSlice?.userData);
  const avatarFile = watch("avatar");

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatarFile]);
  useEffect(() => {
    reset({
      username: data?.username,
      bio: data?.bio,
      github: data?.Github,
      id: data?.$id,
      userId: data?.userId,
      avatarId: data?.Avatar,
    });

   
  }, [data]);

  const changeName = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const value = `${userData?.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-${randomString}`;
    setValue("username", value);
  };
  const onSubmit = async (data) => {
    
    const res = await updateUserDetails(data);
  
    window.location.reload();
  };

  return (
    <div>
      <div
        className={`${
          toggle ? "block" : "hidden"
        } overflow-y-scroll left-[26%] top-20 fixed z-10 justify-center items-center w-full h-full`}
      >
        <div className="p-4 w-full max-w-2xl max-h-full">
          <div className="bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update Profile
              </h3>
              <button
                type="button"
                onClick={() => setToggle(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 md:p-5 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Username
                </label>
                <div className="flex bg-gray-800 rounded-lg px-3 py-2 ">
                  <input
                    type="text"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="w-full"
                  />
                  <button type="button" onClick={() => changeName()}>
                    {" "}
                    <RefreshCcw />{" "}
                  </button>
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Upload Image
                </label>
                <div className="bg-gray-800 rounded-lg shadow-sm p-4 border-dashed border-2 border-gray-300 mt-2 ">
                  <input
                    id="avatar"
                    accept="image/*"
                    type="file"
                    {...register("avatar")}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-800 hover:file:bg-gray-400 
              w-full transition-all duration-200 outline-gray-400"
                  />
                </div>
                {errors.avatar && (
                  <p className="text-red-500 text-sm">{errors.avatar.message}</p>
                )}
              </div>
              {image && (
                <img
                  src={image}
                  className="h-24 w-24 rounded-full border-[1px] border-gray-500 mx-auto"
                />
              )}

              {/* GitHub Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  GitHub Username
                </label>
                <input
                  type="text"
                  {...register("github")}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t pt-4 border-gray-200 dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
                <button
                  onClick={() => setToggle(false)}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
