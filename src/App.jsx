import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Project,
  NewsLetter,
  About,
  SignUp,
  Login,
  NotFoundPage,
  User,
  UserDetails,
  CreateBlog,
  Account,
  UpdateBlog,
  BlogPage,
  SearchPage,
} from './Page/index.js'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { logOut, userDetails } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import { getAccount, getUserDetails } from "./appwrite/User";
import { login } from "./redux/authSlice";
import { useEffect } from "react";

export default function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const getAccountDetails = async () => {
      try {
        const res = await getAccount();

        await dispatch(login(res));
        const res2 = await getUserDetails(res.$id);

        await dispatch(userDetails(res2.documents[0]));

      } catch (error) {
        await dispatch(logOut());
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/myblogs`} element={<User />} />
          <Route path={`/viewBlog`} element={<BlogPage />} />
          <Route path={`/searchBlog`} element={<SearchPage/>} />
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
