import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "../components/RichTextEditor";
import { useSelector } from "react-redux";
import { CreateBlogDoc, UpdateBlogs } from "../appwrite/Blogs";

export default function BlogForm({ data, type }) {
  const userData = useSelector((state) => state.authSlice.userData);

  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title || "",
      heroImage: "",
      content: data?.content || "",
      type: data?.type || "blog",
      tags: data?.tags || "",
      userId: data?.userId || "",
    },
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (data) {
      setValue("title", data.title || "");
      setValue("content", data.content || "");
      setValue("type", data.type || "blog");
      setValue("tags", data.tags || "");
      setValue("userId", data.userId || "");
          if (data.featured_image) {
        setImage(data.featured_image);
      }
      setValue("image", data.featured_image);
      setValue("id",data?.$id)
    }
  }, [data, setValue]);

  useEffect(() => {
    setValue("userId", userData?.$id || "");
  }, [userData, setValue]);

  const heroImage = watch("heroImage");
  useEffect(() => {
    if (heroImage instanceof FileList && heroImage.length > 0) {
      const file = heroImage[0];
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof heroImage === "string") {
      setImage(heroImage); 
    }
  }, [heroImage]);

  const submit = async (formData) => {
    if (type === "create") {
      const res = await CreateBlogDoc(formData);
    } else {
      const res = await UpdateBlogs(formData);
    }
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {type === "edit" ? "Update Blog Post" : "Create New Blog Post"}
      </h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium text-sm">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 50, message: "Max 50 characters" },
              minLength: { value: 5, message: "Min 5 characters" },
            })}
            className="bg-secondaryBg p-3 w-full rounded-lg"
            placeholder="Enter your blog title"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.title?.message && "*" + errors.title?.message}
          </p>
        </div>

        <div>
          <label htmlFor="heroImage" className="block mb-2 font-medium text-sm">
            Hero Image
          </label>
          <div className="bg-secondaryBg rounded-lg shadow-sm p-4 border-dashed border-2 border-gray-300 mt-2 ">
            <input
              id="heroImage"
              type="file"
              accept="image/*"
              {...register("heroImage", {
                validate: (value) =>
                  value instanceof FileList ||
                  typeof value === "string" ||
                  "Hero image is required",
              })}
              className="file:py-2 file:px-4 file:rounded-lg file:bg-primaryBg w-full"
            />
          </div>
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.heroImage?.message && "*" + errors.heroImage?.message}
          </p>
        </div>

        {/* Image Preview */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-full border border-gray-500 rounded-md shadow-sm"
          />
        )}

        {/* Content */}
        <div>
          <label htmlFor="content" className="block mb-2 font-medium text-sm">
            Content
          </label>
          <RichTextEditor
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.content?.message && "*" + errors.content?.message}
          </p>
        </div>

        {/* Post Type */}
        <div>
          <label htmlFor="type" className="block mb-2 font-medium text-sm">
            Post Type
          </label>
          <select
            id="type"
            {...register("type", { required: "Type is required" })}
            className="bg-secondaryBg p-3 w-full rounded-lg"
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
              minLength: { value: 4, message: "Min 4 characters" },
              maxLength: { value: 100, message: "Max 100 characters" },
            })}
            className="bg-secondaryBg p-3 w-full rounded-lg"
            placeholder="e.g., react, nextjs"
          />
          <p className="text-red-500 text-xs mt-1 h-4">
            {errors.tags?.message && "*" + errors.tags?.message}
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-secondaryBg text-white px-6 py-3 rounded-lg hover:opacity-80 transition-all"
          >
            {type === "edit" ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
