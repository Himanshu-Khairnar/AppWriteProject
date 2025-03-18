import React, { useEffect } from "react";
// import "./App.css";
import { useDispatch } from "react-redux";
import AuthService from "./appwrite/auth";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    AuthService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 ">
      <div className="w-full block">
        <Header />
        <main>
          {/* <Outlet></Outlet> */}
          dd
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}
