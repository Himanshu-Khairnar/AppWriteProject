import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router";
import { userDetails } from "../redux/authSlice";
import { getImagePreview } from "../appwrite/User";

export default function Header() {
    const user = useSelector((state) => state.authSlice?.userData);
    const userDetail = useSelector((state) => state.authSlice?.userDetail);
 
  let data = [
    { name: "Blog", link: "/" },
    { name: "Projects", link: "/project" },
    { name: "Create Blog", link: "/createBlog" },
  ];
  if (user) {
    data = [...data, { name: "My Blogs ", link: "/myblogs" }];
  }
  const [searchData, setSearchData] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const search = (e) => {
    if (e.key === "Enter") {
      navigate(`/searchBlog?q=${searchData}`);
      setSearchData("");
    }
  };

 const imgId = userDetail?.Avatar;

  useEffect(() => {
    const getPreview = async (fileId) => {
      try {
        const imageUrl = await getImagePreview(fileId);
        setImage(imageUrl);
      } catch (error) {
        console.error("Failed to fetch image preview:", error);
      }
    };

    if (imgId) {
      getPreview(imgId);
    }
  }, [userDetail]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between ">
      <div className="flex justify-between w-full lg:w-auto items-center">
        <Link to="/">
          <img src="blogger.png" className="h-12 w-12" />
        </Link>
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12"></path>
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            )}
          </svg>
        </button>
      </div>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row w-full lg:w-auto gap-5 items-center justify-center mt-4 lg:mt-0`}
      >
        {data.map((item) => (
          <NavLink
            key={item.name}
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-1 border-white font-bold text-[17px]  "
                  : "text-white"
              } transition-all`
            }
            to={item.link}
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </NavLink>
        ))}
        <div className="flex gap-2 bg-secondaryBg rounded-lg w-full lg:w-auto mt-4 lg:mt-0">
          <input
            type="text"
            className="p-2 outline-none w-full lg:w-auto"
            placeholder="Search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            onKeyDown={(e) => search(e)}
          />
          <Search
            onClick={(e) => {
              navigate(`/searchBlog?q=${searchData}`);
              setSearchData("");
            }}
            className="h-10 w-10 p-2"
          />
        </div>
        {user ? (
          <Link to={`/account`}>
            <img
              src={image ? image : "avatar.png"}
              alt=""
              className="h-9 w-9 border-[1px] rounded-full bg-white"
            />
          </Link>
        ) : (
          <div className="flex gap-2">
            <NavLink
              to={"/login"}
              className=" py-2 px-4  bg-primaryText rounded-lg w-full sm:w-auto"
            >
              Login
            </NavLink>

            <NavLink
              to={"/signup"}
              className=" py-2 px-4  hover:underline rounded-lg w-full sm:w-auto"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
