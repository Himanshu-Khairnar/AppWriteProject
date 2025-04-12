import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "../components/RichTextEditor";
import { useSelector } from "react-redux";
import { CreateBlogDoc } from "../appwrite/Blogs";

export default function CreateBlog() {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "wwvdd",
      heroImage: "",
      content: "",
      type: "blog",
      tags: "wvdvd",
      userId: "",
    },
  });

  const userData = useSelector((state) => state.authSlice.userData);
  console.log(userData);

  useEffect(() => {
    setValue("userId", userData?.$id);
  }, [userData]);
  const submit = async (data) => {
    console.log(data);

    const res = await CreateBlogDoc(data);
    console.log(res);
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-2 font-medium text-sm">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 50,
                message: "Title length can't be more than 50 characters",
              },
              minLength: {
                value: 5,
                message: "Title length can't be less than 5 characters",
              },
            })}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300"
            placeholder="Enter your blog title"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.title?.message && "*" + errors.title?.message}
          </p>
        </div>

        {/* Hero Image */}
        <div>
          <label htmlFor="heroImage" className="block mb-2 font-medium text-sm">
            Hero Image
          </label>
          <div className="bg-secondaryBg rounded-lg shadow-sm p-4 border-dashed border-2 border-gray-300">
            <input
              id="heroImage"
              type="file"
              {...register("heroImage", {
                required: "Hero image is required",
              })}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-800 hover:file:bg-gray-400 
              w-full transition-all duration-200 outline-gray-400"
            />
          </div>
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.heroImage?.message && "*" + errors.heroImage?.message}
          </p>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="textEditor"
            className="block mb-2 font-medium text-sm"
          >
            Content
          </label>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <RichTextEditor
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.content?.message && "*" + errors.content?.message}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type */}
          <div>
            <label htmlFor="type" className="block mb-2 font-medium text-sm">
              Post Type
            </label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm appearance-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="">Select...</option>
              <option value="blog">Blog</option>
              <option value="project">Project</option>
              <option value="other">Other</option>
            </select>
            <p className="text-red-500 text-xs mt-1 h-4">
              {errors.type?.message && "*" + errors.type?.message}
            </p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block mb-2 font-medium text-sm">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              {...register("tags", {
                required: "Tags are required",
                maxLength: {
                  value: 100,
                  message: "Tags length can't be more than 100 characters",
                },
                minLength: {
                  value: 4,
                  message: "Tags length can't be less than 4 characters",
                },
              })}
              className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300"
              placeholder="e.g., react, nextjs"
            />
            <p className="text-red-500 text-xs mt-1 h-4">
              {errors.tags?.message && "*" + errors.tags?.message}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-secondaryBg text-white px-6 py-3 rounded-lg hover:opacity-80 transition-all duration-200 font-medium"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
}
