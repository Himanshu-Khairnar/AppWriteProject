import { MoveUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ data }) {
  const tags = data?.tags?.split(",") || [];

  return (
    <Link
      to={`/viewBlog?id=${data.$id}`}
      className="max-w-[384px]  overflow-hidden   text-white  transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg group"
    >
      <article className="flex flex-col gap-3">
        <img
          src={data?.featured_image}
          className="h-[240px] w-full object-cover"
          alt={data?.title}
        />

        <div className="px-4 pb-4 flex flex-col gap-2">
          <p className="text-sm text-purple-400 font-medium">
            {new Date(data?.$createdAt).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{data.title}</h2>
            <MoveUpRight className="w-5 h-5 text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: data?.content }}
            className="text-[15px] text-gray-400 line-clamp-2 h-[48px]"
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 rounded-full bg-white text-gray-800 font-medium border border-gray-700 hover:bg-purple-500 hover:text-white transition"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
