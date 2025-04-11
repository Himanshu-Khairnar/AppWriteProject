import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "../components/RichTextEditor";

export default function CreateBlog() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submit = () => {};

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input type="text" {...register("title")} />
          <input
            type="text"
            {...register("title", {
              required: true,
              max: {
                value: 50,
                message: "Title lenght can't be more than 50 characters",
              },
              min: {
                value: 5,
                message: "Title lenght can't be less than 5 characters",
              },
            })}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
            placeholder="Title"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.title?.message && "*" + errors.title?.message}
          </p>{" "}
        </div>
        <div>
          <label htmlFor="heroImage" className="block mb-1 font-medium">
            Hero Image
          </label>
          <input type="text" {...register("heroImage")} />
          <input
            type="file"
            {...register("heroImage")}
            className="bg-secondaryBg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-800 hover:file:bg-gray-400 
    p-2 w-full rounded-lg shadow-sm transition-all duration-200 outline-gray-400"
            placeholder="heroImage"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.heroImage?.message && "*" + errors.heroImage?.message}
          </p>
        </div>
        <div>
          <label htmlFor="textEditor" className="block mb-1 font-medium">
            Content
          </label>

          <RichTextEditor {...register("content")} />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.content?.message && "*" + errors.content?.message}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="type">Select the Type</label>
          <select
            id="type"
            {...register("type")}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
          >
            <option value="blog">Blog</option>
            <option value="project">project</option>
            <option value="other">other</option>
          </select>
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.type?.message && "*" + errors.type?.message}
          </p>
        </div>

        <div>
          <label htmlFor="tags" className="block mb-1 font-medium">
            Tags
          </label>
          <input type="text" {...register("tags")} />
          <input
            type="text"
            {...register("tags", {
              required: true,
              max: {
                value: 100,
                message: "tags lenght can't be more than 50 characters",
              },
              min: {
                value: 4,
                message: "tags lenght can't be less than 5 characters",
              },
            })}
            className="bg-secondaryBg p-3 outline-gray-400 border-none w-full rounded-lg shadow-sm"
            placeholder="Tags"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.tags?.message && "*" + errors.tags?.message}
          </p>{" "}
        </div>
      </form>
    </div>
  );
}
