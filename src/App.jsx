import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Page/Home";
import Footer from "./components/Footer";
import Project from "./Page/Project";
import NewsLetter from "./Page/NewsLetter";
import About from "./Page/About";
import SignUp from "./Page/SignUp";
import Login from "./Page/Login";
import NotFoundPage from "./Page/NotFound";
import User from "./Page/User";
import { logOut } from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAccount } from "./appwrite/User";
import { login } from "./redux/authSlice";
import { useEffect, useState } from "react";

export default function App() {
  const [data,setData] = useState(null);
const dispatch = useDispatch();

    useEffect(() => {
      const getAccountDetails = async () => {
        try {
          const res = await getAccount();
          await dispatch(login(res));
          setData(res);
        } catch (error) {
          await dispatch(logOut());
          setData(null);
        }
      };
      getAccountDetails();
      return () => {
        getAccountDetails();
      };
    }, [window.location.pathname]);
  
  return (
    <div className="bg-primaryBg text-white min-h-screen px-6 md:px-12 lg:px-24 py-12">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/news_letter" element={<NewsLetter />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/user/`} element={<User />} />
          <Route path="*" element={<NotFoundPage/>} />  
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
