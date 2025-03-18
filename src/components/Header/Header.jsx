import React, { act } from "react";
import { Container, Logo, LogOutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
useNavigate;
export default function Header() {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const naItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authState,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authState,
    },
    {
      name: "All post",
      slug: "/all-post",
      active: authState,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authState,
    },
  ];
  return (
    <div className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex ">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {naItems.map((item, index) => {
              return item.active ? (
                <li
                  key={index}
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.active ? <Link to={item.slug}>{item.name}</Link> : null}
                </li>
              ) : null;
            })}
            {authState && (
              <li className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
