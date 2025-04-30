import { MoveUpRight, Pencil, Trash2 } from "lucide-react";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import { DeletingBlog } from "../appwrite/Blogs";

export default function UserBlog({ data }) {
  const tags = data?.tags?.split(",") || [];
  const [deleteToggle, setDeleteToggle] = useState(false);
const deleteBLog = async () => {
   const res = await DeletingBlog(data?.$id);
   if (res) window.location.reload();
 };
 
  return (
    <div className="max-w-[384px] overflow-hidden text-white transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg group border border-gray-700 rounded-lg relative">
      {deleteToggle && (
        <DeleteToggle id={data?.$id} setToggle={setDeleteToggle} />
      )}

      <article className="flex flex-col gap-3">
        <Link to={`/viewBlog?id=${data?.$id}`}>
          <img
            src={data?.featured_image}
            className="h-[240px] w-full object-cover rounded-t group-hover:brightness-90"
            alt={data?.title}
          />
        </Link>

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
            <Link
              to={`/blog/${data?.$id}`}
              className="flex items-center gap-2 group"
            >
              <h2 className="text-lg font-semibold">{data?.title}</h2>
              <MoveUpRight className="group-hover:text-purple-400 w-5 h-5 text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <div className="flex gap-2">
              <Link
                to={`/updateBlog?id=${data?.$id}`}
                className="p-1 rounded hover:bg-gray-700"
                title="Edit"
              >
                <Pencil size={18} className="text-blue-400" />
              </Link>

              <button
                className="p-1 rounded hover:bg-gray-700"
                title="Delete"
                onClick={() => deleteBLog()}
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
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
    </div>
  );
}
