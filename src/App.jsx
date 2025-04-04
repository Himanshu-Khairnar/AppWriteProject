import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Page/Home";
import Footer from "./components/Footer";
import Project from "./Page/Project";
import NewsLetter from "./Page/NewsLetter";
import About from "./Page/About";
import SignUp from "./Page/SignUp";
import Login from "./Page/Login";

export default function App() {
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
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
