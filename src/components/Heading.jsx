import React from "react";

export default function Heading({ data }) {
  return (
    <div>
      <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[180px] xl:text-[244px] text-center border-y-2 border-gray-400 w-full ">
        {data}
      </h1>
    </div>
  );
}
