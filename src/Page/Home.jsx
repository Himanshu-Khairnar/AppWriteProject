import React, { useEffect } from "react";
import Heading from "../components/Heading";
import {  useSelector } from "react-redux";

export default function Home() {
  const data = useSelector((state) => state.authSlice?.userData);

  return (
    <div className="mt-10">
      <Heading data={"THE BLOG"} />
      <p className="text-white text-2xl">{data?.name}</p>
    </div>
  );
}
