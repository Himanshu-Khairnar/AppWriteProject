import { Search } from "lucide-react";
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";

export default function Header() {
  const data = [
    { name: "Blog", link: "/" },
    { name: "Projects", link: "/project" },
    { name: "About Us", link: "/about" },
    { name: "Newsletter", link: "/news_letter" },
  ];
  const [searchData, setSearchData] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const search = (e) => {
    if (e.key === "Enter") {
      navigate(`/searchBlog?q=${searchData}`);
      setSearchData("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between ">
      <div className="flex justify-between w-full lg:w-auto items-center">
        <Link to={"/"}>
          <img src="blogger.png" className="h-12 w-12" />
        </Link>
        <button 
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12"></path> 
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            )}
          </svg>
        </button>
      </div>

      <div className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row w-full lg:w-auto gap-5 items-center justify-center mt-4 lg:mt-0`}>
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
        <img src="avatar.png" alt="" className="mt-4 lg:mt-0" />
      </div>
    </div>
  );
}