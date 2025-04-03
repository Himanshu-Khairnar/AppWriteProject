import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Page/Home";
import Footer from "./components/Footer";
import Project from "./Page/Project";
import NewsLetter from "./Page/NewsLetter";
export default function App() {
  return (
    <div className="  bg-primaryBg text-white  min-h-screen  px-25 py-12 ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/news_letter" element={<NewsLetter />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
