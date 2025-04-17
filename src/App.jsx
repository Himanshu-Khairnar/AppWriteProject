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
import { logOut, userDetails } from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, getUserDetails } from "./appwrite/User";
import { login } from "./redux/authSlice";
import { useEffect, useState } from "react";
import UserDetails from "./Page/UserDetails";
import CreateBlog from "./Page/CreateBlog";
import Account from "./Page/Account";
import UpdateBlog from "./Page/UpdateBlog";
import BlogPage from "./Page/BlogPage";

export default function App() {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAccountDetails = async () => {
      try {
        const res = await getAccount();

        await dispatch(login(res));
        const res2 = await getUserDetails(res.$id);

        await dispatch(userDetails(res2.documents[0]));

        setData2(res);
      } catch (error) {
        await dispatch(logOut());
        setData(null);
      }
    };
    getAccountDetails();
    return () => {
      getAccountDetails();
    };
  }, [location.pathname]);

  return (
    <div className="bg-primaryBg text-white min-h-screen px-6 md:px-12 lg:px-24 py-12">
      <BrowserRouter>
        <Header />
        <p>{data?.name}</p>
        <p>{data2?.Github}</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/myblogs`} element={<User />} />
          <Route path={`/viewBlog`} element={<BlogPage />} />

          <Route path="/adduserdetails" element={<UserDetails />} />
          <Route path="/updateBlog" element={<UpdateBlog />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="newsletter" element={<NewsLetter />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
