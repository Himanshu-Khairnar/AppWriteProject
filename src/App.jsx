import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Page/Home";
export default function App() {
  return (
    <div className="  bg-primaryBg text-primaryText  min-h-screen  px-25 py-12 ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
